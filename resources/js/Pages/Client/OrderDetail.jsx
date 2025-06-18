import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Pages/Client/Components/ClientLayout';
import { useToast } from '@/Components/Toast';
import Button from '@/Components/Button';
import axios from 'axios';

const OrderDetail = ({ order, user, files, messages }) => {
  const { showToast } = useToast();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messagesList, setMessagesList] = useState(messages || []);
  const [currentOrder, setCurrentOrder] = useState(order);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check for return from payment page on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromPayment = urlParams.get('from_payment');

    if (fromPayment === 'true' || localStorage.getItem('checkOrderStatus')) {
      localStorage.removeItem('checkOrderStatus');
      refreshOrderStatus();
    }
  }, []);

  // Refresh order status
  const refreshOrderStatus = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      // If there are pending payments, fetch the latest payment status
      if (order.payments && order.payments.find(p => p.status === 'pending')) {
        const pendingPayment = order.payments.find(p => p.status === 'pending');
        const response = await axios.get(
          `/client/payments/${pendingPayment.id}/enhanced-check`
        );

        if (response.data.success) {
          // If payment status changed, reload the page to get updated order details
          if (response.data.status !== pendingPayment.status) {
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.error('Error refreshing order status:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatRupiah = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSendMessage = async e => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setIsSending(true);

    try {
      const response = await axios.post('/client/messages', {
        recipient_id: order.freelancer_id,
        content: message,
      });

      setMessagesList([...messagesList, response.data.message]);
      setMessage('');
      showToast('Message sent successfully', 'success');
    } catch (error) {
      showToast('Failed to send message', 'error');
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const getStatusBadge = status => {
    const statusMap = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      delivered: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
      pending: 'Pending Freelancer Acceptance',
      in_progress: 'In Progress',
      delivered: 'Delivered (Payment Required)',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusMap[status] || 'bg-gray-100'}`}
      >
        {statusLabels[status] || status}
      </span>
    );
  };

  return (
    <ClientLayout user={user}>
      <Head title={`Order #${order.order_number}`} />
      <div className='container mx-auto py-8 px-4'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Order #{order.order_number}</h1>
          <div>{getStatusBadge(order.status)}</div>
        </div>

        {/* Action Panel - at the top for quick access */}
        <div className='bg-white shadow-md rounded-lg overflow-hidden mb-6'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold mb-4'>Actions</h2>

            {order.status === 'delivered' && (
              <div className='mb-6'>
                <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4'>
                  <p className='font-medium'>Your order has been delivered!</p>
                  <p>
                    The freelancer has completed your order and uploaded the
                    deliverables. Please make payment to access the files.
                  </p>
                </div>

                <Link
                  href={`/client/orders/${order.id}/simple-invoice`}
                  className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold'
                >
                  Make Payment
                </Link>
              </div>
            )}

            {order.status === 'completed' && (
              <div className='mb-6'>
                <div className='bg-green-50 border-l-4 border-green-400 p-4 mb-4'>
                  <p className='font-medium'>Payment Completed!</p>
                  <p>
                    Your payment has been processed successfully. You can now
                    download all deliverables.
                  </p>
                </div>

                {!order.has_review && (
                  <Link
                    href={`/client/orders/${order.id}/review`}
                    className='inline-block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded mr-3'
                  >
                    Leave a Review
                  </Link>
                )}
              </div>
            )}

            {order.status === 'pending' && (
              <div className='bg-blue-50 border-l-4 border-blue-400 p-4 mb-4'>
                <p>
                  Waiting for the freelancer to accept your order. You'll be
                  notified once they accept.
                </p>
              </div>
            )}

            {order.status === 'in_progress' && (
              <div className='bg-blue-50 border-l-4 border-blue-400 p-4 mb-4'>
                <p>
                  The freelancer is working on your order. The expected delivery
                  date is {formatDate(order.expected_delivery_date)}.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className='bg-white shadow-md rounded-lg overflow-hidden mb-6'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold mb-4'>Order Details</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
              <div>
                <p className='text-gray-600'>Service:</p>
                <p className='font-medium'>
                  {order.service?.title || 'Custom Project'}
                </p>
              </div>
              <div>
                <p className='text-gray-600'>Freelancer:</p>
                <p className='font-medium'>
                  {order.freelancer?.name || 'Unknown Freelancer'}
                </p>
              </div>
              <div>
                <p className='text-gray-600'>Created on:</p>
                <p className='font-medium'>{formatDate(order.created_at)}</p>
              </div>
              <div>
                <p className='text-gray-600'>Delivery Due:</p>
                <p className='font-medium'>
                  {formatDate(order.expected_delivery_date)}
                </p>
              </div>
              <div>
                <p className='text-gray-600'>Amount:</p>
                <p className='font-medium'>{formatRupiah(order.amount)}</p>
              </div>
              <div>
                <p className='text-gray-600'>Platform Fee:</p>
                <p className='font-medium'>
                  {formatRupiah(order.platform_fee)}
                </p>
              </div>
              <div>
                <p className='text-gray-600'>Total:</p>
                <p className='font-medium text-primary font-bold'>
                  {formatRupiah(order.total_amount)}
                </p>
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>Your Requirements</h3>
              <div className='bg-gray-50 p-4 rounded-md whitespace-pre-wrap'>
                {order.requirements || 'No specific requirements provided.'}
              </div>
            </div>
          </div>
        </div>

        {/* Files Panel */}
        {files && files.length > 0 && (
          <div className='bg-white shadow-md rounded-lg overflow-hidden mb-6'>
            <div className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Files</h2>

              <div className='overflow-x-auto'>
                <table className='min-w-full bg-white'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Name
                      </th>
                      <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Type
                      </th>
                      <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Size
                      </th>
                      <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {files.map(file => (
                      <tr key={file.id}>
                        <td className='py-3 px-4 whitespace-nowrap'>
                          {file.original_name}
                        </td>
                        <td className='py-3 px-4 whitespace-nowrap'>
                          {file.file_type}
                        </td>
                        <td className='py-3 px-4 whitespace-nowrap'>
                          {(file.file_size / 1024 / 1024).toFixed(2)} MB
                        </td>
                        <td className='py-3 px-4 whitespace-nowrap'>
                          {file.status === 'deliverable' &&
                          order.status !== 'completed' ? (
                            <span className='px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800'>
                              Locked (Payment Required)
                            </span>
                          ) : (
                            <span className='px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800'>
                              Available
                            </span>
                          )}
                        </td>
                        <td className='py-3 px-4 whitespace-nowrap'>
                          {file.can_download ? (
                            <Link
                              href={`/files/download/${file.id}`}
                              className='text-blue-600 hover:underline font-semibold'
                            >
                              Download
                            </Link>
                          ) : (
                            <span className='text-gray-400'>
                              {order.status === 'delivered' ? (
                                <Link
                                  href={`/client/orders/${order.id}/simple-invoice`}
                                  className='text-blue-600 hover:underline'
                                >
                                  Make Payment to Unlock
                                </Link>
                              ) : (
                                'Not Available'
                              )}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Communication */}
        <div className='bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold mb-4'>Communication</h2>
            <Link
              href={`/client/messages/${order.freelancer_id}`}
              className='inline-block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded'
            >
              Message Freelancer
            </Link>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default OrderDetail;
