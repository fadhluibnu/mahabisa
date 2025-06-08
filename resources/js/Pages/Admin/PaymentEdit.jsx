import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from './Components/AdminLayout';

const PaymentEdit = ({ payment }) => {
  // In a real app, payment data would be passed as a prop from the controller
  // For this example, we'll use dummy data
  const dummyPayment = {
    id: 1,
    transactionId: 'TRX-12345',
    orderRef: 'ORD-001',
    amount: '2500000',
    description: 'Payment for Website Landing Page',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'completed',
    payerType: 'client',
    payerId: 1,
    paymentDate: '2023-06-15',
    notes: 'Payment received through Bank BCA',
  };

  const paymentToEdit = payment || dummyPayment;
  
  const { data, setData, put, processing, errors } = useForm({
    transactionId: paymentToEdit.transactionId,
    orderRef: paymentToEdit.orderRef,
    amount: paymentToEdit.amount,
    description: paymentToEdit.description,
    paymentMethod: paymentToEdit.paymentMethod,
    paymentStatus: paymentToEdit.paymentStatus,
    payerType: paymentToEdit.payerType,
    payerId: paymentToEdit.payerId,
    paymentDate: paymentToEdit.paymentDate,
    notes: paymentToEdit.notes,
  });

  // Mock data for dropdowns
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from server
  useEffect(() => {
    // Mock fetch users
    setUsers([
      { id: 1, name: 'Budi Santoso', role: 'client' },
      { id: 2, name: 'Sarah Wijaya', role: 'client' },
      { id: 3, name: 'Ahmad Fadli', role: 'freelancer' },
      { id: 4, name: 'Dewi Putri', role: 'freelancer' },
    ]);

    // Mock fetch orders
    setOrders([
      { id: 'ORD-001', title: 'Website Landing Page', client: 'Budi Santoso', freelancer: 'Ahmad Fadli', totalAmount: 2500000 },
      { id: 'ORD-002', title: 'Mobile App UI Design', client: 'Sarah Wijaya', freelancer: 'Dewi Putri', totalAmount: 3500000 },
      { id: 'ORD-003', title: 'E-commerce Website', client: 'Budi Santoso', freelancer: 'Dewi Putri', totalAmount: 5000000 },
    ]);

    // Simulate API loading time
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/admin/payments/${paymentToEdit.id}`);
  };

  const handleOrderChange = (orderId) => {
    const selectedOrder = orders.find(order => order.id === orderId);
    
    if (selectedOrder) {
      setData({
        ...data,
        orderRef: selectedOrder.id,
        amount: selectedOrder.totalAmount,
        description: `Payment for: ${selectedOrder.title}`,
      });
    }
  };

  return (
    <AdminLayout
      title="Edit Pembayaran"
      subtitle={`Edit informasi pembayaran: ${paymentToEdit.transactionId}`}
    >
      <Head title={`Edit Pembayaran ${paymentToEdit.transactionId} - MahaBisa Admin`} />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Informasi Transaksi
                </h3>
              </div>
              
              {/* Transaction ID */}
              <div className="col-span-1">
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-2">
                  ID Transaksi
                </label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  value={data.transactionId}
                  onChange={e => setData('transactionId', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="TRX-XXXXX"
                  readOnly
                />
                {errors.transactionId && (
                  <p className="mt-1 text-sm text-red-600">{errors.transactionId}</p>
                )}
              </div>
              
              {/* Order Reference */}
              <div className="col-span-1">
                <label htmlFor="orderRef" className="block text-sm font-medium text-gray-700 mb-2">
                  Referensi Proyek
                </label>
                <select
                  id="orderRef"
                  name="orderRef"
                  value={data.orderRef}
                  onChange={e => handleOrderChange(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  disabled={loading}
                >
                  <option value="">Pilih Proyek</option>
                  {orders.map(order => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {order.title}
                    </option>
                  ))}
                </select>
                {errors.orderRef && (
                  <p className="mt-1 text-sm text-red-600">{errors.orderRef}</p>
                )}
              </div>
              
              {/* Payment Method */}
              <div className="col-span-1">
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                  Metode Pembayaran
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={data.paymentMethod}
                  onChange={e => setData('paymentMethod', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="credit_card">Kartu Kredit</option>
                  <option value="e_wallet">E-Wallet</option>
                  <option value="virtual_account">Virtual Account</option>
                  <option value="manual">Pembayaran Manual</option>
                </select>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>
                )}
              </div>
              
              {/* Payment Status */}
              <div className="col-span-1">
                <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-2">
                  Status Pembayaran
                </label>
                <select
                  id="paymentStatus"
                  name="paymentStatus"
                  value={data.paymentStatus}
                  onChange={e => setData('paymentStatus', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="pending">Menunggu Pembayaran</option>
                  <option value="processing">Diproses</option>
                  <option value="completed">Selesai</option>
                  <option value="failed">Gagal</option>
                  <option value="refunded">Dikembalikan</option>
                </select>
                {errors.paymentStatus && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentStatus}</p>
                )}
              </div>
              
              {/* Amount */}
              <div className="col-span-1">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Pembayaran
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">Rp</span>
                  </div>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={data.amount}
                    onChange={e => setData('amount', e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>
              
              {/* Payment Date */}
              <div className="col-span-1">
                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Pembayaran
                </label>
                <input
                  type="date"
                  id="paymentDate"
                  name="paymentDate"
                  value={data.paymentDate}
                  onChange={e => setData('paymentDate', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.paymentDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentDate}</p>
                )}
              </div>
              
              {/* Divider */}
              <div className="col-span-1 md:col-span-2 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Informasi Pembayar
                </h3>
              </div>
              
              {/* Payer Type */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Pembayar
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="payer-client" 
                      name="payerType"
                      value="client"
                      checked={data.payerType === 'client'}
                      onChange={e => setData('payerType', e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="payer-client" className="ml-2 block text-sm text-gray-700">
                      Klien
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="payer-freelancer" 
                      name="payerType"
                      value="freelancer"
                      checked={data.payerType === 'freelancer'}
                      onChange={e => setData('payerType', e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="payer-freelancer" className="ml-2 block text-sm text-gray-700">
                      Freelancer
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="payer-platform" 
                      name="payerType"
                      value="platform"
                      checked={data.payerType === 'platform'}
                      onChange={e => setData('payerType', e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="payer-platform" className="ml-2 block text-sm text-gray-700">
                      Platform
                    </label>
                  </div>
                </div>
                {errors.payerType && (
                  <p className="mt-1 text-sm text-red-600">{errors.payerType}</p>
                )}
              </div>
              
              {/* Payer */}
              {data.payerType !== 'platform' && (
                <div className="col-span-1">
                  <label htmlFor="payerId" className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Pembayar
                  </label>
                  <select
                    id="payerId"
                    name="payerId"
                    value={data.payerId}
                    onChange={e => setData('payerId', e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    disabled={loading}
                  >
                    <option value="">Pilih Pengguna</option>
                    {users
                      .filter(user => data.payerType === 'client' ? user.role === 'client' : user.role === 'freelancer')
                      .map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                  {errors.payerId && (
                    <p className="mt-1 text-sm text-red-600">{errors.payerId}</p>
                  )}
                </div>
              )}
              
              {/* Description */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Pembayaran
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Deskripsi singkat tentang pembayaran ini"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              {/* Notes */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Tambahan
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={data.notes}
                  onChange={e => setData('notes', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Catatan tambahan untuk pembayaran ini (opsional)"
                />
                {errors.notes && (
                  <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                )}
              </div>
              
              {/* Submit Buttons */}
              <div className="col-span-1 md:col-span-2 flex justify-end space-x-3 pt-5">
                <Link
                  href="/admin/payments"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
                >
                  {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentEdit;
