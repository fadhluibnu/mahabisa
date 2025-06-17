// resources/js/Pages/Client/Orders.jsx

import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ClientLayout from '@/Pages/Client/Components/ClientLayout'; // Sesuaikan path layout
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useToast } from '@/Components/Toast';
import Modal from '@/Components/Modal';
import Icon from '@/Components/Icon'; // Import Icon component


const Orders = ({ orders, filters, orderCounts }) => { // Menerima orders, filters, orderCounts
  const { auth } = usePage().props;
  const { showToast } = useToast();
  const [currentTab, setCurrentTab] = useState(filters.status || 'all');
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format currency function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Use direct URL construction instead of route helper
    window.location.href = `/client/orders?status=${currentTab}&search=${searchTerm}`;
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    // Use direct URL construction instead of route helper
    window.location.href = `/client/orders?status=${tab}&search=${searchTerm}`;
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const normalizedStatus = status === 'in-progress' ? 'in_progress' : status;
    const statusMap = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'delivered': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'pending_payment': 'bg-yellow-100 text-yellow-800', // Status baru
      'revision': 'bg-orange-100 text-orange-800', // Status baru
    };

    return statusMap[normalizedStatus] || 'bg-gray-100 text-gray-800';
  };

  // Get status label
  const getStatusLabel = (status) => {
    const normalizedStatus = status === 'in-progress' ? 'in_progress' : status;
    const statusLabels = {
      'pending': 'Menunggu Konfirmasi',
      'in_progress': 'Dalam Proses',
      'delivered': 'Hasil Dikirimkan',
      'completed': 'Selesai',
      'cancelled': 'Dibatalkan',
      'pending_payment': 'Menunggu Pembayaran',
      'revision': 'Perlu Revisi',
    };

    return statusLabels[normalizedStatus] || status;
  };
  
  // Open cancel modal
  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };
  
  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!cancellationReason || cancellationReason.length < 10) {
      showToast('Harap berikan alasan pembatalan yang jelas (minimal 10 karakter)', 'error');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Using direct URL instead of route helper
      await axios.post(`/client/orders/${selectedOrder.id}/cancel`, {
        cancellation_reason: cancellationReason
      });
      
      showToast('Pesanan berhasil dibatalkan', 'success');
      setShowCancelModal(false);
      setCancellationReason('');
      window.location.reload(); // Reload halaman untuk memperbarui daftar order
    } catch (error) {
      showToast('Gagal membatalkan pesanan', 'error');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ClientLayout> {/* Menggunakan ClientLayout */}
      <Head title="Pesanan Saya" />
      
      {/* Cancel Order Modal */}
      <Modal
        show={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setCancellationReason('');
        }}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Batal Pesanan</h3>
          <p className="mb-4 text-red-600">Peringatan: Tindakan ini tidak dapat dibatalkan.</p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alasan Pembatalan
            </label>
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Silakan berikan alasan yang jelas untuk membatalkan pesanan ini..."
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowCancelModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              disabled={isProcessing}
            >
              Kembali
            </button>
            <button
              type="button"
              onClick={handleCancelOrder}
              disabled={isProcessing}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              {isProcessing ? 'Memproses...' : 'Batalkan Pesanan'}
            </button>
          </div>
        </div>
      </Modal>
      
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Pesanan Saya</h1>
        </div>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari nomor pesanan, jasa, atau freelancer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
            >
              Cari
            </button>
          </div>
        </form>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6 overflow-x-auto">
          <nav className="-mb-px flex space-x-1 md:space-x-4">
            <button
              onClick={() => handleTabChange('all')}
              className={'py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap ' +
                (currentTab === 'all'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }
            >
              Semua ({orderCounts.all || 0})
            </button>
            <button
              onClick={() => handleTabChange('pending')}
              className={'py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap ' +
                (currentTab === 'pending'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }
            >
              Menunggu Konfirmasi ({orderCounts.pending || 0})
            </button>
            <button
              onClick={() => handleTabChange('pending_payment')}
              className={'py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap ' +
                (currentTab === 'pending_payment'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }
            >
              Menunggu Pembayaran ({orderCounts.pending_payment || 0})
            </button>
            <button
              onClick={() => handleTabChange('in_progress')}
              className={'py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap ' +
                (currentTab === 'in_progress'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }
            >
              Dalam Proses ({orderCounts['in_progress'] || 0})
            </button>
            <button
              onClick={() => handleTabChange('delivered')}
              className={'py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap ' +
                (currentTab === 'delivered'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }
            >
              Hasil Dikirim ({orderCounts.delivered || 0})
            </button>
             <button
              onClick={() => handleTabChange('revision')}
              className={'py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap ' +
                (currentTab === 'revision'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }
            >
              Perlu Revisi ({orderCounts.revision || 0})
            </button>
            <button
              onClick={() => handleTabChange('completed')}
              className={'py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap ' +
                (currentTab === 'completed'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }
            >
              Selesai ({orderCounts.completed || 0})
            </button>
            <button
              onClick={() => handleTabChange('cancelled')}
              className={'py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap ' +
                (currentTab === 'cancelled'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }
            >
              Dibatalkan ({orderCounts.cancelled || 0})
            </button>
          </nav>
        </div>
        
        {/* Order list */}
        {orders.data && orders.data.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Pesanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jasa/Proyek</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pembayaran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.data.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.freelancer?.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.service?.title || order.project?.title || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatCurrency(order.total_amount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={'px-2 py-1 text-xs font-medium rounded-full ' + getStatusBadge(order.status)}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/client/orders/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        >
                          Detail
                        </Link>
                        
                        {(order.status === 'pending' || order.status === 'in_progress' || order.status === 'delivered' || order.status === 'revision' || order.status === 'pending_payment') && (
                          <button
                            onClick={() => openCancelModal(order)}
                            disabled={isProcessing}
                            className="text-red-600 hover:text-red-800"
                          >
                            Batalkan
                          </button>
                        )}                        {order.status === 'delivered' && !order.is_payment_completed && (
                             <Link
                                href={`/client/orders/${order.id}/simple-invoice`}
                                className="text-green-600 hover:text-green-800"
                            >
                                Bayar
                            </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <Icon name="document" className="w-20 h-20 text-gray-300 mx-auto mb-4" /> {/* Gunakan Icon component */}
            <h3 className="text-xl font-medium text-gray-900 mb-2">Tidak Ada Pesanan</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {currentTab === 'all' ? 'Anda belum memiliki pesanan yang aktif.' : 
               currentTab === 'pending' ? 'Tidak ada pesanan yang menunggu konfirmasi saat ini.' : 
               currentTab === 'in_progress' ? 'Tidak ada pesanan yang sedang dikerjakan saat ini.' :
               currentTab === 'delivered' ? 'Tidak ada pesanan yang sudah terkirim.' :
               currentTab === 'completed' ? 'Tidak ada pesanan yang telah selesai.' :
               currentTab === 'pending_payment' ? 'Tidak ada pesanan yang menunggu pembayaran.' :
               currentTab === 'revision' ? 'Tidak ada pesanan yang perlu direvisi.' :
               'Tidak ada pesanan yang dibatalkan.'}
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {orders.links && orders.links.length > 3 && (
          <div className="mt-6 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {orders.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url || '#'}
                  className={'relative inline-flex items-center px-4 py-2 border text-sm font-medium ' +
                    (link.active
                      ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50') +
                    (!link.url ? ' cursor-not-allowed opacity-50' : '')}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default Orders;