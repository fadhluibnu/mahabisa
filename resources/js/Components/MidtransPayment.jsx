import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * MidtransPayment Component - Handles Midtrans payment integration
 *
 * @param {Object} props
 * @param {number} props.orderId - The order ID to pay for
 * @param {Object} props.paymentSettings - Midtrans settings from the backend
 * @param {Function} props.onSuccess - Callback function when payment is successful
 * @param {Function} props.onPending - Callback function when payment is pending
 * @param {Function} props.onError - Callback function when payment fails
 * @param {Function} props.onClose - Callback function when payment window is closed
 */
const MidtransPayment = ({
  orderId,
  paymentSettings,
  onSuccess = () => {},
  onPending = () => {},
  onError = () => {},
  onClose = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snapToken, setSnapToken] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [error, setError] = useState(null);

  // Load the Midtrans script on component mount
  useEffect(() => {
    // Check if Midtrans is enabled
    if (!paymentSettings.enableMidtrans) {
      return;
    }

    // Load Midtrans script
    const script = document.createElement('script');
    script.src = paymentSettings.midtransSandbox
      ? 'https://app.sandbox.midtrans.com/snap/snap.js'
      : 'https://app.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', paymentSettings.midtransClientKey);
    script.id = 'midtrans-script';
    script.async = true;

    // Only append if it doesn't exist yet
    if (!document.getElementById('midtrans-script')) {
      document.body.appendChild(script);
    }

    return () => {
      // Clean up script on unmount
      const existingScript = document.getElementById('midtrans-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [paymentSettings]);

  // Function to generate Snap token and initiate payment
  const initiatePayment = async () => {
    if (!paymentSettings.enableMidtrans) {
      setError('Payment gateway is currently disabled.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Generate snap token
      const response = await axios.post(
        route('client.orders.process-payment', { id: orderId })
      );

      if (response.data.success) {
        setSnapToken(response.data.token);
        setPaymentId(response.data.payment_id);

        // Open Midtrans Snap
        window.snap.pay(response.data.token, {
          onSuccess: function (result) {
            console.log('Payment success:', result);
            onSuccess(result);
          },
          onPending: function (result) {
            console.log('Payment pending:', result);
            onPending(result);
          },
          onError: function (result) {
            console.log('Payment error:', result);
            setError('Payment failed. Please try again.');
            onError(result);
          },
          onClose: function () {
            console.log('Payment widget closed');
            onClose();
          },
        });
      } else {
        setError('Failed to generate payment token. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('An error occurred while processing payment. Please try again.');
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check payment status
  const checkPaymentStatus = async () => {
    if (!paymentId) {
      return null;
    }

    try {
      const response = await axios.get(
        `/api/payments/${paymentId}/check-status`
      );

      return response.data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return null;
    }
  };

  return {
    initiatePayment,
    checkPaymentStatus,
    isLoading,
    error,
    paymentId,
    snapToken,
  };
};

export default MidtransPayment;
