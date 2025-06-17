import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import FreelancerLayout from '@/Pages/Freelancer/Components/FreelancerLayout';

export default function Withdrawal({ wallet, withdrawalSettings, recentWithdrawals }) {
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank_transfer');
  
  const { data, setData, post, processing, errors, reset } = useForm({
    amount: '',
    payment_method: 'bank_transfer',
    payment_details: {
      account_name: '',
      account_number: '',
      bank_name: '',
      wallet_type: '',
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('freelancer.withdrawals.request'), {
      onSuccess: () => {
        reset();
      }
    });
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const calculateFee = (amount) => {
    const feePercentage = withdrawalSettings.withdrawalFeePercentage || 1;
    const feeFixed = withdrawalSettings.withdrawalFeeFixed || 2500;
    
    return (amount * feePercentage / 100) + feeFixed;
  };
  
  const calculateNetAmount = (amount) => {
    if (!amount) return 0;
    return amount - calculateFee(amount);
  };

  return (
    <FreelancerLayout>
      <Head title="Withdraw Funds" />
      
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Withdraw Funds</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Wallet Information */}
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Wallet Balance</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your current earnings and available funds</p>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Available Balance</dt>
                    <dd className="mt-1 text-2xl font-semibold text-green-600">{formatCurrency(wallet.balance)}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Pending Balance</dt>
                    <dd className="mt-1 text-2xl font-semibold text-yellow-600">{formatCurrency(wallet.pending_balance)}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Total Earned</dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">{formatCurrency(wallet.total_earned)}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Total Withdrawn</dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">{formatCurrency(wallet.total_withdrawn)}</dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Last Withdrawal</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(wallet.last_withdrawal_at)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          {/* Withdrawal Form */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Request Withdrawal</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Minimum withdrawal: {formatCurrency(withdrawalSettings.minimumWithdrawalAmount)}
              </p>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Rp</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        min={withdrawalSettings.minimumWithdrawalAmount}
                        max={wallet.balance}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                      />
                    </div>
                    {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                    
                    {data.amount && (
                      <div className="mt-3 text-sm text-gray-500">
                        <p>Fee: {formatCurrency(calculateFee(data.amount))}</p>
                        <p className="font-semibold">You will receive: {formatCurrency(calculateNetAmount(data.amount))}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Withdrawal Method
                    </label>
                    <div className="mt-2 space-y-2">
                      {withdrawalSettings.availableMethods.bank_transfer && (
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="bank_transfer"
                              name="payment_method"
                              type="radio"
                              checked={data.payment_method === 'bank_transfer'}
                              onChange={() => {
                                setData('payment_method', 'bank_transfer');
                                setWithdrawalMethod('bank_transfer');
                              }}
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="bank_transfer" className="font-medium text-gray-700">Bank Transfer</label>
                            <p className="text-gray-500">Withdraw directly to your bank account.</p>
                          </div>
                        </div>
                      )}
                      
                      {withdrawalSettings.availableMethods.e_wallet && (
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="e_wallet"
                              name="payment_method"
                              type="radio"
                              checked={data.payment_method === 'e_wallet'}
                              onChange={() => {
                                setData('payment_method', 'e_wallet');
                                setWithdrawalMethod('e_wallet');
                              }}
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="e_wallet" className="font-medium text-gray-700">E-Wallet</label>
                            <p className="text-gray-500">Withdraw to your e-wallet (GoPay, OVO, DANA, etc.)</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {errors.payment_method && <p className="mt-1 text-sm text-red-600">{errors.payment_method}</p>}
                  </div>
                  
                  {/* Payment details based on selected method */}
                  {data.payment_method === 'bank_transfer' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="account_name" className="block text-sm font-medium text-gray-700">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          id="account_name"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={data.payment_details.account_name}
                          onChange={(e) => setData('payment_details', {...data.payment_details, account_name: e.target.value})}
                        />
                        {errors['payment_details.account_name'] && (
                          <p className="mt-1 text-sm text-red-600">{errors['payment_details.account_name']}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="account_number" className="block text-sm font-medium text-gray-700">
                          Account Number
                        </label>
                        <input
                          type="text"
                          id="account_number"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={data.payment_details.account_number}
                          onChange={(e) => setData('payment_details', {...data.payment_details, account_number: e.target.value})}
                        />
                        {errors['payment_details.account_number'] && (
                          <p className="mt-1 text-sm text-red-600">{errors['payment_details.account_number']}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          id="bank_name"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={data.payment_details.bank_name}
                          onChange={(e) => setData('payment_details', {...data.payment_details, bank_name: e.target.value})}
                        />
                        {errors['payment_details.bank_name'] && (
                          <p className="mt-1 text-sm text-red-600">{errors['payment_details.bank_name']}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {data.payment_method === 'e_wallet' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="account_name" className="block text-sm font-medium text-gray-700">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          id="account_name"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={data.payment_details.account_name}
                          onChange={(e) => setData('payment_details', {...data.payment_details, account_name: e.target.value})}
                        />
                        {errors['payment_details.account_name'] && (
                          <p className="mt-1 text-sm text-red-600">{errors['payment_details.account_name']}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="account_number" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="account_number"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={data.payment_details.account_number}
                          onChange={(e) => setData('payment_details', {...data.payment_details, account_number: e.target.value})}
                        />
                        {errors['payment_details.account_number'] && (
                          <p className="mt-1 text-sm text-red-600">{errors['payment_details.account_number']}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="wallet_type" className="block text-sm font-medium text-gray-700">
                          E-Wallet Type
                        </label>
                        <select
                          id="wallet_type"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={data.payment_details.wallet_type}
                          onChange={(e) => setData('payment_details', {...data.payment_details, wallet_type: e.target.value})}
                        >
                          <option value="">Select E-Wallet Type</option>
                          <option value="gopay">GoPay</option>
                          <option value="ovo">OVO</option>
                          <option value="dana">DANA</option>
                          <option value="linkaja">LinkAja</option>
                          <option value="shopeepay">ShopeePay</option>
                        </select>
                        {errors['payment_details.wallet_type'] && (
                          <p className="mt-1 text-sm text-red-600">{errors['payment_details.wallet_type']}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <button
                      type="submit"
                      disabled={processing || !data.amount || parseFloat(data.amount) <= 0 || parseFloat(data.amount) > wallet.balance}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        processing || !data.amount || parseFloat(data.amount) <= 0 || parseFloat(data.amount) > wallet.balance
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      }`}
                    >
                      {processing ? 'Processing...' : 'Request Withdrawal'}
                    </button>
                    
                    {parseFloat(data.amount) > wallet.balance && (
                      <p className="mt-2 text-sm text-red-600">
                        Withdrawal amount exceeds available balance
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Recent Withdrawals */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Withdrawals</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">History of your recent withdrawal requests</p>
          </div>
          
          <div className="border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Method
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentWithdrawals.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No withdrawal requests found
                      </td>
                    </tr>
                  ) : (
                    recentWithdrawals.map((withdrawal) => (
                      <tr key={withdrawal.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{withdrawal.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(withdrawal.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(withdrawal.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {withdrawal.payment_method === 'bank_transfer'
                            ? `Bank Transfer (${withdrawal.payment_details?.bank_name || 'Bank'})`
                            : `E-Wallet (${withdrawal.payment_details?.wallet_type || 'E-Wallet'})`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {withdrawal.status === 'pending' && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                          {withdrawal.status === 'approved' && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          )}
                          {withdrawal.status === 'rejected' && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Rejected
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}
