import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from '@/Pages/Client/Components/ClientLayout';
import FileList from '@/Components/FileList';
import { useToast } from '@/Components/Toast';
import axios from 'axios';

const ViewDeliverables = ({ order, files }) => {
  const { showToast } = useToast();
  const [isAccepting, setIsAccepting] = useState(false);
  const [refreshFileList, setRefreshFileList] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const handleAcceptDelivery = async () => {
    if (!confirm('Are you sure you want to accept this delivery? This will mark the order as completed.')) {
      return;
    }
    
    setIsAccepting(true);
    
    try {
      const response = await axios.put(`/client/orders/${order.id}/status`, {
        status: 'completed'
      });
      
      if (response.data.success) {
        showToast('Delivery accepted successfully! The order is now complete.', 'success');
        setShowReviewForm(true);
        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        showToast(response.data.message || 'Failed to accept delivery', 'error');
      }
    } catch (error) {
      console.error('Error accepting delivery:', error);
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setIsAccepting(false);
    }
  };
  
  const handleRevisionRequest = async () => {
    const revisionReason = prompt('Please describe what needs to be revised:');
    if (!revisionReason) return;
    
    try {
      const response = await axios.put(`/client/orders/${order.id}/status`, {
        status: 'revision_requested',
        revision_notes: revisionReason
      });
      
      if (response.data.success) {
        showToast('Revision requested successfully!', 'success');
        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        showToast(response.data.message || 'Failed to request revision', 'error');
      }
    } catch (error) {
      console.error('Error requesting revision:', error);
      showToast('An error occurred. Please try again.', 'error');
    }
  };
  
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`/client/orders/${order.id}/review`, {
        rating,
        content: review
      });
      
      if (response.data.success) {
        showToast('Thank you for your review!', 'success');
        setShowReviewForm(false);
      } else {
        showToast(response.data.message || 'Failed to submit review', 'error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      showToast('An error occurred. Please try again.', 'error');
    }
  };
  
  const isOrderDelivered = order.status === 'delivered';
  const isOrderCompleted = order.status === 'completed';
  const isOrderInRevision = order.status === 'revision_requested';
  const isPendingPayment = order.status === 'pending_payment';
  
  return (
    <ClientLayout>
      <Head title={`Deliverables - Order #${order.order_number}`} />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Deliverables for Order #{order.order_number}
          </h1>
          
          {isPendingPayment && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    You need to complete payment before you can access the deliverables.
                  </p>
                  <div className="mt-2">
                    <a
                      href={`/payment/order/${order.id}`}
                      className="text-sm font-medium text-yellow-700 underline hover:text-yellow-600"
                    >
                      Go to Payment Page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
              <div className="border-b pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Freelancer:</p>
                    <p className="font-medium">{order.freelancer?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date:</p>
                    <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service:</p>
                    <p className="font-medium">{order.service?.title || 'Custom Project'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status:</p>
                    <p className="font-medium capitalize">{order.status.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount Paid:</p>
                    <p className="font-medium">Rp {parseInt(order.total_amount).toLocaleString()}</p>
                  </div>
                  {order.completed_at && (
                    <div>
                      <p className="text-sm text-gray-600">Completion Date:</p>
                      <p className="font-medium">{new Date(order.completed_at).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {isOrderInRevision && order.revision_notes && (
                <div className="bg-orange-50 p-4 rounded-md mb-4">
                  <h3 className="text-md font-medium mb-2">Your Revision Request:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{order.revision_notes}</p>
                </div>
              )}
            </div>
          </div>
          
          <FileList orderId={order.id} refreshTrigger={refreshFileList} />
          
          {isOrderDelivered && (
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Delivery Confirmation</h3>
              <p className="mb-4">
                The freelancer has marked this order as delivered. Please review the deliverables and take one of the following actions:
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAcceptDelivery}
                  disabled={isAccepting}
                  className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                    isAccepting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isAccepting ? 'Processing...' : 'Accept Delivery'}
                </button>
                <button
                  onClick={handleRevisionRequest}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Request Revision
                </button>
              </div>
            </div>
          )}
          
          {showReviewForm && (
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Leave a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Share your experience working with this freelancer..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ViewDeliverables;
