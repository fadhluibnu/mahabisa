import React, { useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';

const Payments = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      project: 'Website E-Commerce Toko Batik',
      client: {
        name: 'PT Batik Nusantara',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      amount: 3500000,
      fee: 350000,
      net: 3150000,
      date: '2025-05-25',
      status: 'paid',
      type: 'project',
    },
    {
      id: 2,
      project: 'Landing Page Aplikasi Kesehatan',
      client: {
        name: 'HealthTech Indonesia',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      amount: 1800000,
      fee: 180000,
      net: 1620000,
      date: '2025-05-15',
      status: 'paid',
      type: 'project',
    },
    {
      id: 3,
      project: 'Redesign Website Universitas',
      client: {
        name: 'Universitas Teknologi',
        avatar:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      amount: 2000000,
      fee: 200000,
      net: 1800000,
      date: '2025-06-10',
      status: 'pending',
      type: 'project',
    },
    {
      id: 4,
      project: 'Penarikan Dana ke Rekening BCA',
      amount: 5000000,
      date: '2025-05-10',
      status: 'completed',
      accountNumber: '1234567890',
      bankName: 'BCA',
      accountHolder: 'Aditya Pratama',
      type: 'withdrawal',
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'bank',
      bankName: 'BCA',
      accountNumber: '1234567890',
      accountHolder: 'Aditya Pratama',
      isDefault: true,
    },
    {
      id: 2,
      type: 'ewallet',
      provider: 'GoPay',
      phoneNumber: '081234567890',
      isDefault: false,
    },
  ]);

  const [activeTab, setActiveTab] = useState('transactions');
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [withdrawalData, setWithdrawalData] = useState({
    amount: '',
    paymentMethodId: paymentMethods.find(m => m.isDefault)?.id || '',
  });

  // Function to handle withdrawal submission
  const handleWithdrawal = () => {
    const amount = parseInt(withdrawalData.amount);
    if (!amount || amount <= 0) {
      alert('Jumlah penarikan harus lebih dari 0');
      return;
    }

    const selectedMethod = paymentMethods.find(
      m => m.id === withdrawalData.paymentMethodId
    );
    if (!selectedMethod) {
      alert('Pilih metode pembayaran');
      return;
    }

    // Create a new withdrawal transaction
    const newTransaction = {
      id: Date.now(),
      project: `Penarikan Dana ke ${selectedMethod.type === 'bank' ? selectedMethod.bankName : selectedMethod.provider}`,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      accountNumber: selectedMethod.accountNumber || selectedMethod.phoneNumber,
      bankName: selectedMethod.bankName || selectedMethod.provider,
      accountHolder: selectedMethod.accountHolder || '',
      type: 'withdrawal',
    };

    setTransactions([newTransaction, ...transactions]);
    setShowWithdrawalForm(false);
    setWithdrawalData({
      amount: '',
      paymentMethodId: paymentMethods.find(m => m.isDefault)?.id || '',
    });
  };

  // Function to add a new payment method
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'bank',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    provider: '',
    phoneNumber: '',
    isDefault: false,
  });

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.type === 'bank') {
      if (
        !newPaymentMethod.bankName ||
        !newPaymentMethod.accountNumber ||
        !newPaymentMethod.accountHolder
      ) {
        alert('Semua field harus diisi');
        return;
      }
    } else if (newPaymentMethod.type === 'ewallet') {
      if (!newPaymentMethod.provider || !newPaymentMethod.phoneNumber) {
        alert('Semua field harus diisi');
        return;
      }
    }

    // If new method is set as default, update all other methods
    let updatedMethods = [...paymentMethods];
    if (newPaymentMethod.isDefault) {
      updatedMethods = updatedMethods.map(m => ({
        ...m,
        isDefault: false,
      }));
    }

    // Add new method
    setPaymentMethods([
      ...updatedMethods,
      {
        id: Date.now(),
        ...newPaymentMethod,
      },
    ]);

    setShowAddPaymentForm(false);
    setNewPaymentMethod({
      type: 'bank',
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      provider: '',
      phoneNumber: '',
      isDefault: false,
    });
  };

  // Format date
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Format price to Rupiah
  const formatRupiah = price => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate available balance
  const calculateBalance = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'project' && transaction.status === 'paid') {
        return total + transaction.net;
      } else if (
        transaction.type === 'withdrawal' &&
        (transaction.status === 'completed' || transaction.status === 'pending')
      ) {
        return total - transaction.amount;
      }
      return total;
    }, 0);
  };

  // Calculate pending balance
  const calculatePendingBalance = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'project' && transaction.status === 'pending') {
        return total + transaction.net;
      }
      return total;
    }, 0);
  };

  // Get status badge
  const getStatusBadge = status => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text
  const getStatusText = status => {
    switch (status) {
      case 'paid':
        return 'Dibayar';
      case 'completed':
        return 'Selesai';
      case 'pending':
        return 'Menunggu';
      case 'failed':
        return 'Gagal';
      default:
        return 'Unknown';
    }
  };

  // Handle withdraw button click
  const handleWithdrawClick = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Tarik Dana button clicked');
    setShowWithdrawalForm(true);
  };

  return (
    <FreelancerLayout
      title='Pembayaran'
      subtitle='Kelola pembayaran dan penarikan dana'
    >
      {/* Balance summary */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6'>
          <h3 className='text-sm font-medium text-gray-500'>Saldo Tersedia</h3>
          <div className='mt-1 flex items-baseline'>
            <div className='text-2xl font-semibold text-gray-900'>
              {formatRupiah(calculateBalance())}
            </div>
          </div>

          {/* Tarik Dana Button - Using DIV as wrapper to ensure higher z-index */}
          <div className='relative z-20'>
            <a
              href='#'
              onClick={handleWithdrawClick}
              className='mt-4 flex items-center justify-center w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'
            >
              <svg
                className='h-4 w-4 mr-1'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
              Tarik Dana
            </a>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6'>
          <h3 className='text-sm font-medium text-gray-500'>Saldo Tertunda</h3>
          <div className='mt-1 flex items-baseline'>
            <div className='text-2xl font-semibold text-gray-900'>
              {formatRupiah(calculatePendingBalance())}
            </div>
          </div>
          <p className='mt-4 text-sm text-gray-500'>
            Saldo ini akan tersedia setelah klien menyelesaikan pembayaran
          </p>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6'>
          <h3 className='text-sm font-medium text-gray-500'>
            Total Penghasilan Bulan Ini
          </h3>
          <div className='mt-1 flex items-baseline'>
            <div className='text-2xl font-semibold text-gray-900'>
              {formatRupiah(5300000)}
            </div>
            <span className='ml-2 text-sm text-green-600'>+12.5%</span>
          </div>
          <p className='mt-4 text-sm text-gray-500'>
            Dibandingkan dengan bulan lalu
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className='mb-6 border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`${
              activeTab === 'transactions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Riwayat Transaksi
          </button>
          <button
            onClick={() => setActiveTab('payment-methods')}
            className={`${
              activeTab === 'payment-methods'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Metode Pembayaran
          </button>
        </nav>
      </div>

      {/* Transaction history */}
      {activeTab === 'transactions' && (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-4 sm:p-6 border-b border-gray-100'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Riwayat Transaksi
            </h3>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Transaksi
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Jumlah
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Tanggal
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        {transaction.type === 'project' &&
                          transaction.client && (
                            <img
                              src={transaction.client.avatar}
                              alt={transaction.client.name}
                              className='h-8 w-8 rounded-full flex-shrink-0 mr-3'
                            />
                          )}
                        {transaction.type === 'withdrawal' && (
                          <div className='h-8 w-8 rounded-full bg-red-100 flex-shrink-0 mr-3 flex items-center justify-center'>
                            <svg
                              className='h-4 w-4 text-red-600'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                              />
                            </svg>
                          </div>
                        )}
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            {transaction.project}
                          </div>
                          {transaction.type === 'project' &&
                            transaction.client && (
                              <div className='text-sm text-gray-500'>
                                {transaction.client.name}
                              </div>
                            )}
                          {transaction.type === 'withdrawal' && (
                            <div className='text-sm text-gray-500'>
                              {transaction.bankName} -{' '}
                              {transaction.accountNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm font-medium ${transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'}`}
                      >
                        {transaction.type === 'withdrawal' ? '-' : '+'}
                        {formatRupiah(
                          transaction.type === 'project'
                            ? transaction.net
                            : transaction.amount
                        )}
                      </div>
                      {transaction.type === 'project' && (
                        <div className='text-xs text-gray-500'>
                          Fee: {formatRupiah(transaction.fee)}
                        </div>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {formatDate(transaction.date)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                          transaction.status
                        )}`}
                      >
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length === 0 && (
            <div className='p-6 text-center'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                />
              </svg>
              <h3 className='mt-2 text-sm font-medium text-gray-900'>
                Tidak ada transaksi
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Belum ada transaksi yang tercatat.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Payment methods */}
      {activeTab === 'payment-methods' && (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Metode Pembayaran
            </h3>
            <button
              type='button'
              onClick={e => {
                e.preventDefault();
                setShowAddPaymentForm(true);
              }}
              className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'
            >
              <svg
                className='h-4 w-4 mr-1'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
              Tambah Metode
            </button>
          </div>

          <div className='p-4 sm:p-6'>
            <div className='space-y-4'>
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className='border border-gray-200 rounded-lg p-4 flex items-center justify-between'
                >
                  <div className='flex items-center'>
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${method.type === 'bank' ? 'bg-blue-100' : 'bg-green-100'}`}
                    >
                      {method.type === 'bank' ? (
                        <svg
                          className='h-6 w-6 text-blue-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                          />
                        </svg>
                      ) : (
                        <svg
                          className='h-6 w-6 text-green-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                          />
                        </svg>
                      )}
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {method.type === 'bank'
                          ? method.bankName
                          : method.provider}
                        {method.isDefault && (
                          <span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                            Default
                          </span>
                        )}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {method.type === 'bank' ? (
                          <>
                            {method.accountNumber} • {method.accountHolder}
                          </>
                        ) : (
                          method.phoneNumber
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      type='button'
                      onClick={e => {
                        e.preventDefault();
                        // Set as default
                        setPaymentMethods(
                          paymentMethods.map(m => ({
                            ...m,
                            isDefault: m.id === method.id,
                          }))
                        );
                      }}
                      disabled={method.isDefault}
                      className={`p-2 rounded-full ${
                        method.isDefault
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-100 cursor-pointer'
                      }`}
                    >
                      <svg
                        className='h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </button>
                    <button
                      type='button'
                      onClick={e => {
                        e.preventDefault();
                        // Delete method
                        if (method.isDefault) {
                          alert(
                            'Tidak dapat menghapus metode pembayaran default'
                          );
                          return;
                        }
                        setPaymentMethods(
                          paymentMethods.filter(m => m.id !== method.id)
                        );
                      }}
                      className='p-2 rounded-full text-red-600 hover:bg-red-50 cursor-pointer'
                    >
                      <svg
                        className='h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {paymentMethods.length === 0 && (
              <div className='text-center py-6'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                  />
                </svg>
                <h3 className='mt-2 text-sm font-medium text-gray-900'>
                  Tidak ada metode pembayaran
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Tambahkan metode pembayaran untuk menerima dana.
                </p>
                <div className='mt-6'>
                  <button
                    type='button'
                    onClick={e => {
                      e.preventDefault();
                      setShowAddPaymentForm(true);
                    }}
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'
                  >
                    <svg
                      className='h-4 w-4 mr-1'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                      />
                    </svg>
                    Tambah Metode Pembayaran
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Withdrawal modal - Completely revamped for better accessibility */}
      {showWithdrawalForm && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            {/* Background overlay */}
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>

            {/* Modal positioning */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>

            {/* Modal content */}
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                    <h3
                      className='text-lg leading-6 font-medium text-gray-900'
                      id='modal-title'
                    >
                      Tarik Dana
                    </h3>
                    <div className='mt-4'>
                      {/* Amount input */}
                      <div className='mb-4'>
                        <label
                          htmlFor='amount'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Jumlah (Rp)
                        </label>
                        <input
                          type='number'
                          id='amount'
                          value={withdrawalData.amount}
                          onChange={e =>
                            setWithdrawalData({
                              ...withdrawalData,
                              amount: e.target.value,
                            })
                          }
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          placeholder='1000000'
                        />
                        <p className='mt-1 text-xs text-gray-500'>
                          Saldo tersedia: {formatRupiah(calculateBalance())}
                        </p>
                      </div>
                      {/* Payment method selection */}
                      <div className='mb-4'>
                        <label
                          htmlFor='paymentMethod'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Metode Pembayaran
                        </label>
                        <select
                          id='paymentMethod'
                          value={withdrawalData.paymentMethodId}
                          onChange={e =>
                            setWithdrawalData({
                              ...withdrawalData,
                              paymentMethodId: e.target.value,
                            })
                          }
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        >
                          <option value=''>Pilih metode pembayaran</option>
                          {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>
                              {method.type === 'bank'
                                ? `${method.bankName} - ${method.accountNumber} (${method.accountHolder})`
                                : `${method.provider} - ${method.phoneNumber}`}
                              {method.isDefault ? ' (Default)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal action buttons */}
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                {/* Submit button */}
                <a
                  href='#'
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Withdraw form submit clicked');
                    handleWithdrawal();
                  }}
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer'
                >
                  Tarik Dana
                </a>
                {/* Cancel button */}
                <a
                  href='#'
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Cancel button clicked');
                    setShowWithdrawalForm(false);
                  }}
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer'
                >
                  Batal
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add payment method modal */}
      {showAddPaymentForm && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>

            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                    <h3
                      className='text-lg leading-6 font-medium text-gray-900'
                      id='modal-title'
                    >
                      Tambah Metode Pembayaran
                    </h3>
                    <div className='mt-4'>
                      <div className='mb-4'>
                        <label
                          htmlFor='paymentType'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Jenis Pembayaran
                        </label>
                        <select
                          id='paymentType'
                          value={newPaymentMethod.type}
                          onChange={e =>
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              type: e.target.value,
                            })
                          }
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        >
                          <option value='bank'>Rekening Bank</option>
                          <option value='ewallet'>E-Wallet</option>
                        </select>
                      </div>

                      {newPaymentMethod.type === 'bank' ? (
                        <>
                          <div className='mb-4'>
                            <label
                              htmlFor='bankName'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Nama Bank
                            </label>
                            <input
                              type='text'
                              id='bankName'
                              value={newPaymentMethod.bankName}
                              onChange={e =>
                                setNewPaymentMethod({
                                  ...newPaymentMethod,
                                  bankName: e.target.value,
                                })
                              }
                              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                              placeholder='BCA, Mandiri, BNI, dll.'
                            />
                          </div>
                          <div className='mb-4'>
                            <label
                              htmlFor='accountNumber'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Nomor Rekening
                            </label>
                            <input
                              type='text'
                              id='accountNumber'
                              value={newPaymentMethod.accountNumber}
                              onChange={e =>
                                setNewPaymentMethod({
                                  ...newPaymentMethod,
                                  accountNumber: e.target.value,
                                })
                              }
                              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                              placeholder='1234567890'
                            />
                          </div>
                          <div className='mb-4'>
                            <label
                              htmlFor='accountHolder'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Nama Pemilik Rekening
                            </label>
                            <input
                              type='text'
                              id='accountHolder'
                              value={newPaymentMethod.accountHolder}
                              onChange={e =>
                                setNewPaymentMethod({
                                  ...newPaymentMethod,
                                  accountHolder: e.target.value,
                                })
                              }
                              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                              placeholder='Nama sesuai rekening'
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className='mb-4'>
                            <label
                              htmlFor='provider'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Provider E-Wallet
                            </label>
                            <select
                              id='provider'
                              value={newPaymentMethod.provider}
                              onChange={e =>
                                setNewPaymentMethod({
                                  ...newPaymentMethod,
                                  provider: e.target.value,
                                })
                              }
                              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            >
                              <option value=''>Pilih Provider</option>
                              <option value='GoPay'>GoPay</option>
                              <option value='OVO'>OVO</option>
                              <option value='DANA'>DANA</option>
                              <option value='LinkAja'>LinkAja</option>
                              <option value='ShopeePay'>ShopeePay</option>
                            </select>
                          </div>
                          <div className='mb-4'>
                            <label
                              htmlFor='phoneNumber'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Nomor Telepon
                            </label>
                            <input
                              type='text'
                              id='phoneNumber'
                              value={newPaymentMethod.phoneNumber}
                              onChange={e =>
                                setNewPaymentMethod({
                                  ...newPaymentMethod,
                                  phoneNumber: e.target.value,
                                })
                              }
                              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                              placeholder='08123456789'
                            />
                          </div>
                        </>
                      )}

                      <div className='flex items-center'>
                        <input
                          id='isDefault'
                          type='checkbox'
                          checked={newPaymentMethod.isDefault}
                          onChange={e =>
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              isDefault: e.target.checked,
                            })
                          }
                          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                        />
                        <label
                          htmlFor='isDefault'
                          className='ml-2 block text-sm text-gray-900'
                        >
                          Jadikan sebagai metode pembayaran default
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <a
                  href='#'
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddPaymentMethod();
                  }}
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer'
                >
                  Simpan
                </a>
                <a
                  href='#'
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAddPaymentForm(false);
                  }}
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer'
                >
                  Batal
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </FreelancerLayout>
  );
};

export default Payments;
