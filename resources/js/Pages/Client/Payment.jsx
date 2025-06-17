import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Pages/Client/Components/ClientLayout';
import { useToast } from '@/Components/Toast';
import MidtransPayment from '@/Components/MidtransPayment';
import axios from 'axios';

const Payment = ({ order, deliverableFiles, paymentSettings, user }) => {
  const { showToast } = useToast();
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(
    order?.status || 'pending_payment'
  );
  const [canDownload, setCanDownload] = useState(false);
  const [pollingActive, setPollingActive] = useState(false);
  const [isCheckingManually, setIsCheckingManually] = useState(false);

  // Initialize MidtransPayment hook
  const midtransPayment = MidtransPayment({
    orderId: order.id,
    paymentSettings,
    onSuccess: result => handlePaymentCallback('success', result),
    onPending: result => handlePaymentCallback('pending', result),
    onError: result => handlePaymentCallback('error', result),
    onClose: () => checkPaymentStatus(),
  });

  // Set up a polling interval to check payment status
  useEffect(() => {
    let interval;

    if (paymentId && !canDownload && pollingActive) {
      interval = setInterval(() => {
        checkPaymentStatus();
      }, 5000); // Check every 5 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [paymentId, canDownload, pollingActive]);

  const handlePayNow = async () => {
    midtransPayment.initiatePayment();
  };

  const handlePaymentCallback = (status, result) => {
    console.log('Payment status:', status, result);

    if (status === 'success') {
      setPaymentStatus('completed');
      setPollingActive(true);
      showToast(
        'Payment successful! Your order has been processed.',
        'success'
      );
      checkPaymentStatus();
    } else if (status === 'pending') {
      setPaymentStatus('pending');
      setPollingActive(true);
      showToast(
        "Your payment is being processed. We will notify you when it's complete.",
        'info'
      );
      checkPaymentStatus();
    } else {
      showToast(
        'Payment failed. Please try again or contact support.',
        'error'
      );
    }
  };

  const checkPaymentStatus = async () => {
    if (!isCheckingManually && !pollingActive) {
      setIsCheckingManually(true);
    }

    setCheckingPayment(true);

    try {
      const status = await midtransPayment.checkPaymentStatus();

      if (status && status.success) {
        setPaymentStatus(status.status);
        setCanDownload(status.can_download);

        if (status.status === 'completed') {
          showToast(
            'Payment has been completed! You can now download your files.',
            'success'
          );
          setPollingActive(false);

          // Redirect to order page after a short delay
          setTimeout(() => {
            window.location.href = `/client/orders/${order.id}`;
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setCheckingPayment(false);
      setIsCheckingManually(false);
    }
  };

  return (
    <ClientLayout>
      <Head title='Payment' />

      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 my-6'>
        <h1 className='text-2xl font-bold mb-6'>Complete Your Payment</h1>

        <div className='mb-6 p-4 bg-gray-50 rounded-md'>
          <h2 className='text-lg font-semibold mb-2'>Order Summary</h2>
          <div className='border-b pb-2 mb-2'>
            <div className='flex justify-between mb-1'>
              <span className='font-medium'>Service:</span>
              <span>{order.service?.title || 'Custom Project'}</span>
            </div>
            <div className='flex justify-between mb-1'>
              <span className='font-medium'>Freelancer:</span>
              <span>{order.freelancer?.name}</span>
            </div>
          </div>
          <div className='flex justify-between mb-1'>
            <span className='font-medium'>Service Amount:</span>
            <span>Rp {order.amount?.toLocaleString()}</span>
          </div>
          <div className='flex justify-between mb-1'>
            <span className='font-medium'>Platform Fee:</span>
            <span>Rp {order.platform_fee?.toLocaleString()}</span>
          </div>
          {order.tax > 0 && (
            <div className='flex justify-between mb-1'>
              <span className='font-medium'>Tax:</span>
              <span>Rp {order.tax?.toLocaleString()}</span>
            </div>
          )}
          <div className='flex justify-between font-bold mt-2 pt-2 border-t'>
            <span>Total Amount:</span>
            <span>Rp {order.total_amount?.toLocaleString()}</span>
          </div>
        </div>

        {(paymentStatus === 'pending_payment' || !paymentStatus) && (
          <div className='text-center'>
            <button
              onClick={handlePayNow}
              disabled={midtransPayment.isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full sm:w-auto ${midtransPayment.isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {midtransPayment.isLoading ? 'Processing...' : 'Pay Now'}
            </button>

            {midtransPayment.error && (
              <div className='mt-3 text-sm text-red-600'>
                {midtransPayment.error}
              </div>
            )}
          </div>
        )}

        {paymentStatus === 'pending' && (
          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-yellow-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-yellow-700'>
                  Your payment is being processed. We will notify you when it's
                  completed.
                </p>
                <button
                  onClick={() => {
                    setIsCheckingManually(true);
                    checkPaymentStatus();
                  }}
                  disabled={checkingPayment}
                  className='mt-2 text-sm font-medium text-yellow-700 underline hover:text-yellow-600'
                >
                  {checkingPayment && isCheckingManually
                    ? 'Checking...'
                    : 'Check Payment Status'}
                </button>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'completed' && (
          <div className='bg-green-50 border-l-4 border-green-400 p-4 mb-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-green-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
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
                  Payment has been successfully completed! You will be
                  redirected to your order details shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Display deliverable files section */}
        {(paymentStatus === 'completed' || canDownload) &&
          deliverableFiles &&
          deliverableFiles.length > 0 && (
            <div className='mt-6 border rounded-lg overflow-hidden'>
              <div className='bg-gray-50 px-4 py-3 border-b'>
                <h2 className='text-base font-semibold text-gray-900'>
                  Available Files for Download
                </h2>
              </div>
              <div className='divide-y divide-gray-200'>
                {deliverableFiles.map(file => (
                  <div
                    key={file.id}
                    className='px-4 py-3 flex items-center justify-between'
                  >
                    <div>
                      <p className='font-medium'>{file.original_name}</p>
                      <p className='text-sm text-gray-500'>
                        {(file.file_size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <a
                      href={`/files/download/${file.id}`}
                      className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm'
                      target='_blank'
                      rel='noopener'
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        {paymentStatus === 'failed' && (
          <div className='bg-red-50 border-l-4 border-red-400 p-4 mb-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
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
                  Payment failed. Please try again or contact our support team
                  for assistance.
                </p>
                <button
                  onClick={handlePayNow}
                  className='mt-2 bg-red-100 px-3 py-1 text-sm font-medium text-red-700 rounded hover:bg-red-200'
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        <div className='mt-8 text-center space-x-4'>
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
    </ClientLayout>
  );
};

export default Payment;
