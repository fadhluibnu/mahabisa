import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Pages/Client/Components/ClientLayout';
import { useToast } from '@/Components/Toast';
import axios from 'axios';

const Invoice = ({
  order,
  payment,
  deliverableFiles,
  midtransToken,
  midtransUrl,
  user,
  paymentSettings,
}) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(
    payment?.status || 'pending'
  );
  const [canDownload, setCanDownload] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [checkingInterval, setCheckingInterval] = useState(null);
  const snapButtonRef = useRef(null);

  // Format date function
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format currency function
  const formatCurrency = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Check for payment status on component mount
  useEffect(() => {
    // Check if we're returning from a Midtrans redirect
    const pendingPaymentOrderId = localStorage.getItem('pendingPaymentOrderId');
    const pendingPaymentId = localStorage.getItem('pendingPaymentId');
    
    // Check for parameters in URL from Midtrans redirect
    const urlParams = new URLSearchParams(window.location.search);
    const statusParam = urlParams.get('status');
    const transactionParam = urlParams.get('transaction_id');
    const orderIdParam = urlParams.get('order_id');
    
    // Log parameters if they exist
    if (statusParam || transactionParam || orderIdParam) {
      console.log('Return URL parameters:', {
        status: statusParam,
        transaction_id: transactionParam,
        order_id: orderIdParam
      });
    }
    
    const isReturningFromMidtrans = (pendingPaymentOrderId && pendingPaymentId && 
        pendingPaymentOrderId === order.id.toString() && 
        pendingPaymentId === payment.id.toString()) || 
        (orderIdParam && orderIdParam === order.order_number);
    
    // If this is our order and we're returning from redirect
    if (isReturningFromMidtrans) {
      // Clear the localStorage variables
      localStorage.removeItem('pendingPaymentOrderId');
      localStorage.removeItem('pendingPaymentId');
      
      // Show appropriate message based on status parameter
      if (statusParam === 'error') {
        showToast('There was an issue with your payment. Checking status...', 'error');
      } else if (statusParam === 'pending') {
        showToast('Your payment is being processed. Checking status...', 'info');
      } else {
        showToast('Payment recorded, verifying status...', 'info');
      }
      
      // Check payment status immediately multiple times with shorter intervals
      // since Midtrans might take a moment to update the status
      checkPaymentStatus(); // First check
      
      // Set up more aggressive polling immediately after returning from Midtrans
      const checkIntervals = [2000, 4000, 8000]; // Check after 2s, 4s, and 8s
      
      checkIntervals.forEach((interval, index) => {
        setTimeout(() => {
          checkPaymentStatus();
          // Start regular polling after the last quick check
          if (index === checkIntervals.length - 1) {
            startPollingPaymentStatus();
          }
        }, interval);
      });
    }
    // Check if there's a pending payment that we should poll for
    else if (payment && payment.status === 'pending') {
      // Start checking payment status
      startPollingPaymentStatus();
    }

    return () => {
      // Clean up interval when component unmounts
      if (checkingInterval) {
        clearInterval(checkingInterval);
      }
    };
  }, []);

  // Start polling for payment status
  const startPollingPaymentStatus = () => {
    // Clear any existing interval
    if (checkingInterval) {
      clearInterval(checkingInterval);
    }

    // Check immediately
    checkPaymentStatus();

    // Then set up interval
    const intervalId = setInterval(() => {
      checkPaymentStatus();
    }, 5000); // Check every 5 seconds

    setCheckingInterval(intervalId);
  };

  // Stop polling
  const stopPollingPaymentStatus = () => {
    if (checkingInterval) {
      clearInterval(checkingInterval);
      setCheckingInterval(null);
    }
  };

  // Check payment status
  const checkPaymentStatus = async () => {
    if (!payment || !payment.id) return;

    try {
      console.log('Checking payment status for payment ID:', payment.id);
      // Using the enhanced check endpoint for better status handling
      const response = await axios.get(
        `/client/payments/${payment.id}/enhanced-check`
      );

      if (response.data.success) {
        const previousStatus = paymentStatus;
        const newStatus = response.data.status;
        console.log('Payment status response:', response.data);
        
        // Display detailed debug info in console
        if (response.data.debug_info) {
          console.log('Payment debug info:', response.data.debug_info);
          
          // If there's Midtrans status info, show it
          if (response.data.debug_info.midtrans_status) {
            console.log('Midtrans status data:', response.data.debug_info.midtrans_status);
          }
        }
        
        setPaymentStatus(newStatus);
        setCanDownload(response.data.can_download);

        // Only show status change messages if status actually changed
        if (previousStatus !== newStatus) {
          if (newStatus === 'completed' || newStatus === 'settlement') {
            showToast('Payment has been completed successfully!', 'success');
            
            // Store a flag in localStorage to trigger status check on order page
            localStorage.setItem('checkOrderStatus', 'true');
            
            // Stop polling and redirect to order page after a delay with query parameter
            stopPollingPaymentStatus();
            setTimeout(() => {
              window.location.href = `/client/orders/${order.id}?from_payment=true`;
            }, 3000);
          } else if (newStatus === 'failed' || newStatus === 'denied') {
            showToast('Payment failed. Please try again or contact support.', 'error');
            stopPollingPaymentStatus();
          } else if (newStatus === 'expired') {
            showToast('Payment session expired. Please try again.', 'error');
            stopPollingPaymentStatus();
          } else if (newStatus === 'pending') {
            // Only show pending message once when status changes to pending
            if (previousStatus !== 'pending') {
              showToast('Your payment is being processed. Please wait...', 'info');
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      // Don't show error toast on every failed check to avoid spamming user
    }
  };

  // Handle payment button click with redirect method
  const handlePaymentClick = () => {
    if (!midtransToken || !midtransUrl) {
      showToast(
        'Payment system is not ready yet. Please try again in a moment.',
        'error'
      );
      return;
    }

    setIsProcessingPayment(true);
    showToast('Preparing secure payment page...', 'info');
    
    // Store order ID and payment ID in localStorage to check status after redirect back
    localStorage.setItem('pendingPaymentOrderId', order.id);
    localStorage.setItem('pendingPaymentId', payment.id);
    
    // Small delay before redirect to show the user something is happening
    setTimeout(() => {
      // Redirect to Midtrans payment page
      window.location.href = midtransUrl;
    }, 800);
  };

  return (
    <ClientLayout>
      <Head title='Invoice Payment' />

      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md my-8'>
        {/* Invoice Header */}
        <div className='p-6 border-b'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Invoice</h1>
              <p className='text-gray-600'>#{order.order_number}</p>
            </div>
            <div className='text-right'>
              <p className='font-semibold'>Invoice Date</p>
              <p>{formatDate(payment?.created_at || order.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Customer & Freelancer Info */}
        <div className='p-6 border-b grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h2 className='text-lg font-semibold mb-2'>Billed To</h2>
            <p className='font-medium'>{user.name}</p>
            <p>{user.email}</p>
            {user.profile?.phone && <p>{user.profile.phone}</p>}
            {user.profile?.address && <p>{user.profile.address}</p>}
          </div>
          <div>
            <h2 className='text-lg font-semibold mb-2'>Service Provider</h2>
            <p className='font-medium'>{order.freelancer?.name}</p>
            <p>{order.freelancer?.email}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className='p-6 border-b'>
          <h2 className='text-lg font-semibold mb-4'>Order Details</h2>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='text-left text-gray-500 text-sm uppercase font-semibold border-b'>
                  <th className='py-3 px-4'>Description</th>
                  <th className='py-3 px-4'>Quantity</th>
                  <th className='py-3 px-4'>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-3 px-4 border-b'>
                    <div>
                      <p className='font-medium'>
                        {order.service?.title || 'Custom Project'}
                      </p>
                      <p className='text-gray-500 text-sm'>
                        {order.requirements
                          ? order.requirements.substr(0, 100) + '...'
                          : 'No specific requirements provided.'}
                      </p>
                    </div>
                  </td>
                  <td className='py-3 px-4 border-b'>1</td>
                  <td className='py-3 px-4 border-b'>
                    {formatCurrency(order.amount)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className='text-gray-600'>
                  <td className='py-3 px-4 text-right' colSpan='2'>
                    Subtotal
                  </td>
                  <td className='py-3 px-4'>{formatCurrency(order.amount)}</td>
                </tr>
                <tr className='text-gray-600'>
                  <td className='py-3 px-4 text-right' colSpan='2'>
                    Platform Fee
                  </td>
                  <td className='py-3 px-4'>
                    {formatCurrency(order.platform_fee || 0)}
                  </td>
                </tr>
                {order.tax > 0 && (
                  <tr className='text-gray-600'>
                    <td className='py-3 px-4 text-right' colSpan='2'>
                      Tax
                    </td>
                    <td className='py-3 px-4'>{formatCurrency(order.tax)}</td>
                  </tr>
                )}
                <tr className='font-bold text-lg'>
                  <td className='py-3 px-4 text-right' colSpan='2'>
                    Total
                  </td>
                  <td className='py-3 px-4'>
                    {formatCurrency(order.total_amount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Payment Status */}
        <div className='p-6 border-b'>
          <h2 className='text-lg font-semibold mb-4'>Payment Status</h2>

          {paymentStatus === 'pending' && (
            <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-yellow-700'>
                    Payment is pending. Please complete your payment to gain
                    access to the deliverable files.
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentStatus === 'completed' && (
            <div className='bg-green-50 border-l-4 border-green-400 p-4 mb-6'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-green-700'>
                    Payment has been successfully completed! You can now
                    download all deliverable files.
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className='bg-red-50 border-l-4 border-red-400 p-4 mb-6'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-red-700'>
                    Payment failed. Please try again or contact our customer
                    support for assistance.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pay Now Button - Only show if payment is not completed */}
          {paymentStatus !== 'completed' && (
            <div className='flex justify-center'>
              <button
                ref={snapButtonRef}
                onClick={handlePaymentClick}
                disabled={isProcessingPayment || !midtransToken || !midtransUrl}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-md ${
                  isProcessingPayment || !midtransToken || !midtransUrl
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isProcessingPayment ? 'Redirecting to Payment...' : 'Pay Now'}
              </button>
            </div>
          )}
        </div>

        {/* Deliverable Files */}
        {(paymentStatus === 'completed' || canDownload) &&
          deliverableFiles &&
          deliverableFiles.length > 0 && (
            <div className='p-6 border-b'>
              <h2 className='text-lg font-semibold mb-4'>Deliverable Files</h2>
              <div className='overflow-x-auto'>
                <table className='min-w-full'>
                  <thead>
                    <tr className='text-left text-gray-500 text-sm uppercase font-semibold border-b'>
                      <th className='py-3 px-4'>File Name</th>
                      <th className='py-3 px-4'>Size</th>
                      <th className='py-3 px-4'>Type</th>
                      <th className='py-3 px-4'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliverableFiles.map(file => (
                      <tr key={file.id} className='border-b'>
                        <td className='py-3 px-4'>{file.original_name}</td>
                        <td className='py-3 px-4'>
                          {(file.file_size / 1024 / 1024).toFixed(2)} MB
                        </td>
                        <td className='py-3 px-4'>
                          {file.file_type || file.mime_type}
                        </td>
                        <td className='py-3 px-4'>
                          <a
                            href={`/files/download/${file.id}`}
                            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm'
                            target='_blank'
                            rel='noopener'
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Footer/Terms */}
        <div className='p-6'>
          <div className='text-sm text-gray-600'>
            <p className='mb-2'>
              <strong>Payment Terms:</strong> Payment must be made before
              deliverable files can be accessed.
            </p>
            <p className='mb-2'>
              <strong>Delivery:</strong> Files will be available for download
              immediately after payment completion.
            </p>
          </div>

          <div className='mt-6 flex justify-between'>
            <Link
              href={`/client/orders/${order.id}`}
              className='text-blue-600 hover:text-blue-800 underline'
            >
              Back to Order Details
            </Link>
            <Link
              href='/client/orders'
              className='text-gray-600 hover:text-gray-800 underline'
            >
              Back to All Orders
            </Link>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Invoice;
