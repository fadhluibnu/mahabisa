import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Pages/Admin/Components/AdminLayout';
import { Dialog, Transition } from '@headlessui/react';

export default function Withdrawals({ pendingWithdrawals, processedWithdrawals }) {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [currentWithdrawal, setCurrentWithdrawal] = useState(null);
  
  const { data, setData, post, processing, errors, reset } = useForm({
    action: 'reject',
    notes: '',
  });
  
  const openRejectModal = (withdrawal) => {
    setCurrentWithdrawal(withdrawal);
    setData('notes', '');
    setIsRejectModalOpen(true);
  };
  
  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setCurrentWithdrawal(null);
  };
  
  const handleApprove = (withdrawal) => {
    if (confirm('Are you sure you want to approve this withdrawal request?')) {
      post(route('admin.withdrawals.process', { id: withdrawal.id }), {
        data: {
          action: 'approve',
          notes: 'Approved by admin',
        },
        onSuccess: () => {
          // The page will be reloaded automatically
        },
      });
    }
  };
  
  const handleReject = (e) => {
    e.preventDefault();
    
    post(route('admin.withdrawals.process', { id: currentWithdrawal.id }), {
      onSuccess: () => {
        closeRejectModal();
      },
    });
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'approved':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  return (
    <AdminLayout>
      <Head title="Withdrawal Management" />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Withdrawal Management</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Withdrawals</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  These withdrawal requests are waiting for your approval
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Net Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requested
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingWithdrawals.data.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                          No pending withdrawals found
                        </td>
                      </tr>
                    ) : (
                      pendingWithdrawals.data.map((withdrawal) => (
                        <tr key={withdrawal.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{withdrawal.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <img className="h-8 w-8 rounded-full" src={withdrawal.user.profile_photo_url} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{withdrawal.user.name}</div>
                                <div className="text-sm text-gray-500">{withdrawal.user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(withdrawal.amount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withdrawal.fee)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(withdrawal.net_amount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {withdrawal.payment_method === 'bank_transfer' 
                              ? `Bank: ${withdrawal.payment_details.bank_name}` 
                              : `E-Wallet: ${withdrawal.payment_details.wallet_type}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(withdrawal.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApprove(withdrawal)}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => openRejectModal(withdrawal)}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination for Pending Withdrawals */}
              {pendingWithdrawals.links && pendingWithdrawals.links.length > 3 && (
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{pendingWithdrawals.from}</span> to{' '}
                        <span className="font-medium">{pendingWithdrawals.to}</span> of{' '}
                        <span className="font-medium">{pendingWithdrawals.total}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {pendingWithdrawals.links.map((link, i) => (
                          <Link
                            key={i}
                            href={link.url}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              link.active
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            } ${!link.url ? 'cursor-not-allowed' : ''}`}
                            preserveScroll
                          >
                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Processed Withdrawals</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Withdrawal requests that have been approved or rejected
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Processed By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Processed At
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processedWithdrawals.data.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                          No processed withdrawals found
                        </td>
                      </tr>
                    ) : (
                      processedWithdrawals.data.map((withdrawal) => (
                        <tr key={withdrawal.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{withdrawal.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <img className="h-8 w-8 rounded-full" src={withdrawal.user.profile_photo_url} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{withdrawal.user.name}</div>
                                <div className="text-sm text-gray-500">{withdrawal.user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(withdrawal.amount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {withdrawal.payment_method === 'bank_transfer' 
                              ? `Bank: ${withdrawal.payment_details.bank_name}` 
                              : `E-Wallet: ${withdrawal.payment_details.wallet_type}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(withdrawal.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {withdrawal.processed_by ? withdrawal.processedBy.name : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(withdrawal.processed_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {withdrawal.notes || '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination for Processed Withdrawals */}
              {processedWithdrawals.links && processedWithdrawals.links.length > 3 && (
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{processedWithdrawals.from}</span> to{' '}
                        <span className="font-medium">{processedWithdrawals.to}</span> of{' '}
                        <span className="font-medium">{processedWithdrawals.total}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {processedWithdrawals.links.map((link, i) => (
                          <Link
                            key={i}
                            href={link.url}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              link.active
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            } ${!link.url ? 'cursor-not-allowed' : ''}`}
                            preserveScroll
                          >
                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reject Modal */}
      <Transition show={isRejectModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeRejectModal}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <form onSubmit={handleReject}>
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Reject Withdrawal Request
                      </Dialog.Title>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-4">
                          Please provide a reason for rejecting this withdrawal request. This information will be shared with the user.
                        </p>
                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Rejection Reason
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter reason for rejection"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                          />
                          {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={processing || !data.notes}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                      !data.notes
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    } sm:ml-3 sm:w-auto sm:text-sm`}
                  >
                    {processing ? 'Processing...' : 'Reject Withdrawal'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeRejectModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </AdminLayout>
  );
}
