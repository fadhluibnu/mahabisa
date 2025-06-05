import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const WithdrawalPage = () => {
  
  // Sample data - in a real app, this would come from your API
  const [availableBalance, setAvailableBalance] = useState(5000000);
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
  
  const [withdrawalData, setWithdrawalData] = useState({
    amount: '',
    paymentMethodId: paymentMethods.find(m => m.isDefault)?.id || '',
    note: '',
  });

  // Format price to Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWithdrawal = (e) => {
    e.preventDefault();
    
    const amount = parseInt(withdrawalData.amount);
    if (!amount || amount <= 0) {
      alert('Jumlah penarikan harus lebih dari 0');
      return;
    }

    if (amount > availableBalance) {
      alert('Jumlah penarikan melebihi saldo tersedia');
      return;
    }

    const selectedMethod = paymentMethods.find(m => m.id === parseInt(withdrawalData.paymentMethodId));
    if (!selectedMethod) {
      alert('Pilih metode pembayaran');
      return;
    }

    // In a real app, this would be an API call to create the withdrawal transaction
    console.log('Creating withdrawal transaction', {
      amount,
      paymentMethod: selectedMethod,
      note: withdrawalData.note
    });    // Show success message
    alert('Permintaan penarikan dana berhasil dikirim. Status penarikan dapat dipantau pada halaman Pembayaran.');
    
    // Navigate back to payments page using Inertia
    router.visit('/freelancer/payments');
  };

  return (
    <FreelancerLayout
      title="Tarik Dana"
      subtitle="Tarik dana dari saldo tersedia ke rekening bank atau e-wallet"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Saldo</h3>
          
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <svg 
                  className="h-6 w-6 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div>
                <span className="text-sm text-indigo-800">Saldo Tersedia</span>
                <p className="text-2xl font-semibold text-indigo-900">{formatRupiah(availableBalance)}</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleWithdrawal}>
            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Penarikan
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={withdrawalData.amount}
                  onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0"
                  aria-describedby="price-currency"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Jumlah minimal penarikan: Rp 50.000
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                Metode Pembayaran
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={withdrawalData.paymentMethodId}
                onChange={(e) => setWithdrawalData({ ...withdrawalData, paymentMethodId: e.target.value })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Pilih metode pembayaran</option>
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.type === 'bank'
                      ? `${method.bankName} - ${method.accountNumber} (${method.accountHolder})`
                      : `${method.provider} - ${method.phoneNumber}`}
                    {method.isDefault ? ' (Default)' : ''}
                  </option>
                ))}
              </select>              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Belum punya metode pembayaran?
                </p>
                <Link
                  href="/freelancer/payments?tab=payment-methods"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Tambah Metode Pembayaran
                </Link>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                Catatan (Opsional)
              </label>
              <textarea
                id="note"
                name="note"
                rows="3"
                value={withdrawalData.note}
                onChange={(e) => setWithdrawalData({ ...withdrawalData, note: e.target.value })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Tambahkan catatan jika diperlukan"
              ></textarea>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Informasi Penting:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Biaya administrasi penarikan: Rp 5.000</li>
                <li>Proses penarikan membutuhkan waktu 1-3 hari kerja</li>
                <li>Pastikan data rekening/e-wallet sudah benar</li>
                <li>Penarikan minimum sebesar Rp 50.000</li>
              </ul>
            </div>
              <div className="flex justify-end space-x-3">
              <Link
                href="/freelancer/payments"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ajukan Penarikan
              </button>
            </div>
          </form>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default WithdrawalPage;