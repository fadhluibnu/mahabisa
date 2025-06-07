import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "./Components/AdminLayout";

const OrderDetail = ({ order }) => {
  // Format the status for display
  const statusMap = {
    'pending': { name: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
    'in-progress': { name: 'Aktif', class: 'bg-green-100 text-green-800' },
    'revision-requested': { name: 'Revisi', class: 'bg-orange-100 text-orange-800' },
    'delivered': { name: 'Terkirim', class: 'bg-blue-100 text-blue-800' },
    'completed': { name: 'Selesai', class: 'bg-purple-100 text-purple-800' },
    'cancelled': { name: 'Dibatalkan', class: 'bg-red-100 text-red-800' },
    'disputed': { name: 'Konflik', class: 'bg-gray-100 text-gray-800' },
  };

  const getStatus = (status) => {
    return statusMap[status] || { name: status, class: 'bg-gray-100 text-gray-800' };
  };

  // Calculate progress based on status
  const getProgress = (status) => {
    switch (status) {
      case 'pending': return 10;
      case 'in-progress': return 50;
      case 'revision-requested': return 75;
      case 'delivered': return 90;
      case 'completed': return 100;
      case 'cancelled': case 'disputed': return 0;
      default: return 0;
    }
  };

  // Format price in Indonesian Rupiah format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const [status, setStatus] = useState(order.status);

  return (
    <AdminLayout
      title={`Order: ${order.order_number}`}
      subtitle="Detail dan manajemen order"
    >
      <Head title={`Order ${order.order_number} - MahaBisa Admin`} />

      {/* Back to orders list */}
      <div className="mb-6">
        <Link
          href={route('admin.orders')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke daftar order
        </Link>
      </div>

      {/* Order header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {order.service ? order.service.title : (order.project ? order.project.title : "Custom Order")}
            </h2>
            <p className="text-gray-500">Order #{order.order_number}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatus(order.status).class}`}>
              {getStatus(order.status).name}
            </span>
            
            <Link
              href={route('admin.orders')}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100"
            >
              Cetak Invoice
            </Link>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{getProgress(order.status)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${getProgress(order.status)}%` }}
            ></div>
          </div>
        </div>

        {/* Order summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Jumlah</p>
              <p className="font-bold text-lg">{formatPrice(order.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Tanggal Dibuat</p>
              <p className="font-medium">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Tenggat Waktu</p>
              <p className="font-medium">{new Date(order.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Klien</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full mr-2 overflow-hidden bg-gray-200">
                  <img
                    src={order.client.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(order.client.name)}`}
                    alt={order.client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{order.client.name}</p>
                  <p className="text-xs text-gray-500">{order.client.email}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Freelancer</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full mr-2 overflow-hidden bg-gray-200">
                  <img
                    src={order.freelancer.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(order.freelancer.name)}`}
                    alt={order.freelancer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{order.freelancer.name}</p>
                  <p className="text-xs text-gray-500">{order.freelancer.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Biaya Platform</p>
              <p className="font-medium">{formatPrice(order.platform_fee)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Pajak</p>
              <p className="font-medium">{formatPrice(order.tax)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total</p>
              <p className="font-bold text-lg">{formatPrice(order.total_amount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order details and requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold mb-4">Spesifikasi Pekerjaan</h3>
            <div className="prose max-w-none">
              <p>{order.requirements || 'Tidak ada spesifikasi pekerjaan yang diberikan.'}</p>
            </div>

            {order.deliverables && (
              <div className="mt-6">
                <h4 className="font-bold mb-2">Deliverables</h4>
                <div className="space-y-2">
                  {Array.isArray(order.deliverables) ? (
                    order.deliverables.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <p>Deliverables tidak tersedia dalam format yang benar.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Update Status</h3>
            <form action={route('admin.orders.update-status', { id: order.id })} method="POST">
              <input type="hidden" name="_method" value="PUT" />
              <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="revision-requested">Revision Requested</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="disputed">Disputed</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                Update Status
              </button>
            </form>
          </div>

          {order.payments && order.payments.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold mb-4">Pembayaran</h3>
              <div className="space-y-3">
                {order.payments.map((payment, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">{formatPrice(payment.amount)}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-500">{payment.payment_method}</p>
                      <p className="text-gray-500">{new Date(payment.paid_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </AdminLayout>
  );
};

export default OrderDetail;
