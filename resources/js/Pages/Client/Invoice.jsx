import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Pages/Client/Components/ClientLayout';
import { useToast } from '@/Components/Toast';
import axios from 'axios';

const Invoice = ({ order, payment, deliverableFiles, midtransToken, user, paymentSettings }) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(payment?.status || 'pending');
  const [canDownload, setCanDownload] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [checkingInterval, setCheckingInterval] = useState(null);
  const snapButtonRef = useRef(null);
  
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
  
  // Load Midtrans script on component mount
  useEffect(() => {
    // Load Midtrans script if not already loaded
    if (!document.getElementById('midtrans-script')) {
      const script = document.createElement('script');
      script.src = paymentSettings.midtransSandbox
        ? 'https://app.sandbox.midtrans.com/snap/snap.js'
        : 'https://app.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', paymentSettings.midtransClientKey);
      script.id = 'midtrans-script';
      script.async = true;
      document.body.appendChild(script);
      
      // Check if there's a token and it's a pending payment
      if (midtransToken && payment && payment.status === 'pending') {
        // Start checking payment status
        startPollingPaymentStatus();
      }
      
      return () => {
        // Clean up interval when component unmounts
        if (checkingInterval) {
          clearInterval(checkingInterval);
        }
      };
    }
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
      const response = await axios.get(`/client/payments/${payment.id}/simple-check`);
      
      if (response.data.success) {
        setPaymentStatus(response.data.status);
        setCanDownload(response.data.can_download);
        
        // If payment is completed, stop polling and redirect after a delay
        if (response.data.status === 'completed' || response.data.status === 'settlement') {
          stopPollingPaymentStatus();
          showToast('Payment has been completed!', 'success');
          
          setTimeout(() => {
            window.location.href = `/client/orders/${order.id}`;
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };
  
  // Handle payment button click
  const handlePaymentClick = () => {
    if (!midtransToken || !window.snap) {
      showToast('Payment system is not ready yet. Please try again in a moment.', 'error');
      return;
    }
    
    setIsProcessingPayment(true);
    
    // Open Midtrans Snap popup
    window.snap.pay(midtransToken, {
      onSuccess: function(result) {
        setPaymentStatus('completed');
        showToast('Payment successful!', 'success');
        checkPaymentStatus();
      },
      onPending: function(result) {
        setPaymentStatus('pending');
        showToast('Payment is being processed', 'info');
        startPollingPaymentStatus();
      },
      onError: function(result) {
        showToast('Payment failed', 'error');
        console.error('Payment error:', result);
      },
      onClose: function() {
        setIsProcessingPayment(false);
        checkPaymentStatus();
      }
    });
  };

  return (
    <ClientLayout>
      <Head title="Invoice Payment" />
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md my-8">
        {/* Invoice Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
              <p className="text-gray-600">#{order.order_number}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Invoice Date</p>
              <p>{formatDate(payment?.created_at || order.created_at)}</p>
            </div>
          </div>
        </div>
        
        {/* Customer & Freelancer Info */}
        <div className="p-6 border-b grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Billed To</h2>
            <p className="font-medium">{user.name}</p>
            <p>{user.email}</p>
            {user.profile?.phone && <p>{user.profile.phone}</p>}
            {user.profile?.address && <p>{user.profile.address}</p>}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Service Provider</h2>
            <p className="font-medium">{order.freelancer?.name}</p>
            <p>{order.freelancer?.email}</p>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm uppercase font-semibold border-b">
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b">
                    <div>
                      <p className="font-medium">{order.service?.title || 'Custom Project'}</p>
                      <p className="text-gray-500 text-sm">{order.requirements ? order.requirements.substr(0, 100) + '...' : 'No specific requirements provided.'}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b">1</td>
                  <td className="py-3 px-4 border-b">{formatCurrency(order.amount)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="text-gray-600">
                  <td className="py-3 px-4 text-right" colSpan="2">Subtotal</td>
                  <td className="py-3 px-4">{formatCurrency(order.amount)}</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-3 px-4 text-right" colSpan="2">Platform Fee</td>
                  <td className="py-3 px-4">{formatCurrency(order.platform_fee || 0)}</td>
                </tr>
                {order.tax > 0 && (
                  <tr className="text-gray-600">
                    <td className="py-3 px-4 text-right" colSpan="2">Tax</td>
                    <td className="py-3 px-4">{formatCurrency(order.tax)}</td>
                  </tr>
                )}
                <tr className="font-bold text-lg">
                  <td className="py-3 px-4 text-right" colSpan="2">Total</td>
                  <td className="py-3 px-4">{formatCurrency(order.total_amount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Payment Status */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Payment Status</h2>
          
          {paymentStatus === 'pending' && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Payment is pending. Please complete your payment to gain access to the deliverable files.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {paymentStatus === 'completed' && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Payment has been successfully completed! You can now download all deliverable files.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {paymentStatus === 'failed' && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Payment failed. Please try again or contact our customer support for assistance.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Pay Now Button - Only show if payment is not completed */}
          {paymentStatus !== 'completed' && (
            <div className="flex justify-center">
              <button
                ref={snapButtonRef}
                onClick={handlePaymentClick}
                disabled={isProcessingPayment || !midtransToken}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-md ${
                  isProcessingPayment || !midtransToken ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessingPayment ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          )}
        </div>
        
        {/* Deliverable Files */}
        {(paymentStatus === 'completed' || canDownload) && deliverableFiles && deliverableFiles.length > 0 && (
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Deliverable Files</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm uppercase font-semibold border-b">
                    <th className="py-3 px-4">File Name</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deliverableFiles.map(file => (
                    <tr key={file.id} className="border-b">
                      <td className="py-3 px-4">{file.original_name}</td>
                      <td className="py-3 px-4">{(file.file_size / 1024 / 1024).toFixed(2)} MB</td>
                      <td className="py-3 px-4">{file.file_type || file.mime_type}</td>
                      <td className="py-3 px-4">
                        <a 
                          href={`/files/download/${file.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                          target="_blank"
                          rel="noopener"
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
        <div className="p-6">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Payment Terms:</strong> Payment must be made before deliverable files can be accessed.
            </p>
            <p className="mb-2">
              <strong>Delivery:</strong> Files will be available for download immediately after payment completion.
            </p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link
              href={`/client/orders/${order.id}`}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Back to Order Details
            </Link>
            <Link
              href="/client/orders"
              className="text-gray-600 hover:text-gray-800 underline"
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
