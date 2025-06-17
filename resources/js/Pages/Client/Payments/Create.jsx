import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { formatCurrency } from '@/utils/format';

const Create = ({ order, paymentSettings }) => {
  const { auth } = usePage().props;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Setup Midtrans if enabled
  useEffect(() => {
    if (paymentSettings.enableMidtrans) {
      const script = document.createElement('script');
      script.src = paymentSettings.midtransSandbox
        ? 'https://app.sandbox.midtrans.com/snap/snap.js'
        : 'https://app.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', paymentSettings.midtransClientKey);
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [paymentSettings.enableMidtrans]);

  // Available payment methods
  const paymentMethods = [
    { id: 'bank_transfer', name: 'Bank Transfer', enabled: paymentSettings.availableMethods.bank_transfer },
    { id: 'credit_card', name: 'Credit Card', enabled: paymentSettings.availableMethods.credit_card },
    { id: 'e_wallet', name: 'E-Wallet', enabled: paymentSettings.availableMethods.e_wallet },
    { id: 'qris', name: 'QRIS', enabled: paymentSettings.availableMethods.qris },
    { id: 'retail', name: 'Retail Store', enabled: paymentSettings.availableMethods.retail },
  ].filter(method => method.enabled);

  const handlePayment = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(`/client/orders/${order.id}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({
          payment_method: selectedMethod,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.snap_token) {
        // Open Midtrans Snap payment page
        window.snap.pay(data.snap_token, {
          onSuccess: function(result) {
            window.location.href = `/client/payments/${result.order_id}`;
          },
          onPending: function(result) {
            window.location.href = `/client/payments/${result.order_id}`;
          },
          onError: function() {
            setError('Payment failed. Please try again.');
            setIsProcessing(false);
          },
          onClose: function() {
            setIsProcessing(false);
          }
        });
      }
    } catch (err) {
      setError('An error occurred while processing your payment. Please try again.');
    }

    setIsProcessing(false);
  };

  return (
    <MainLayout>
      <Head title="Payment" />

      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h1 className="text-2xl font-semibold mb-6">Payment Details</h1>

            <div className="mb-8">
              <h2 className="text-lg font-medium mb-2">Order Summary</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2">
                  <span className="font-medium">Service:</span> {order.service.title}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Freelancer:</span> {order.freelancer.name}
                </p>
                <p className="mb-4">
                  <span className="font-medium">Amount:</span>{' '}
                  {formatCurrency(order.total_amount)}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border rounded-lg text-left ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{method.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handlePayment}
                disabled={isProcessing || !selectedMethod}
                className={`px-6 py-2 text-white font-medium rounded-lg ${
                  isProcessing || !selectedMethod
                    ? 'bg-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Create;
