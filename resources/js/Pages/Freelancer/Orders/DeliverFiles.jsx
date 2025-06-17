import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import FreelancerLayout from '@/Pages/Freelancer/Components/FreelancerLayout';
import FileUploader from '@/Components/FileUploader';
import FileList from '@/Components/FileList';

const DeliverFiles = ({ order }) => {
  const [refreshFileList, setRefreshFileList] = useState(false);

  const handleFileUploaded = () => {
    // Trigger a refresh of the file list when a new file is uploaded
    setRefreshFileList(prev => !prev);
  };

  return (
    <FreelancerLayout>
      <Head title={`Deliver Files - Order #${order.order_number}`} />

      <div className='py-6'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <h1 className='text-2xl font-semibold text-gray-900 mb-6'>
            Deliver Files for Order #{order.order_number}
          </h1>

          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6'>
            <div className='p-6'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Order Details
              </h2>
              <div className='border-b pb-4 mb-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-gray-600'>Client:</p>
                    <p className='font-medium'>{order.client.name}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Order Date:</p>
                    <p className='font-medium'>
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Service:</p>
                    <p className='font-medium'>
                      {order.service?.title || 'Custom Project'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Status:</p>
                    <p className='font-medium capitalize'>
                      {order.status.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Amount:</p>
                    <p className='font-medium'>
                      Rp {parseInt(order.amount).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Delivery Deadline:</p>
                    <p className='font-medium'>
                      {order.deadline
                        ? new Date(order.deadline).toLocaleDateString()
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              {order.description && (
                <div className='mb-4'>
                  <h3 className='text-md font-medium mb-2'>
                    Order Description
                  </h3>
                  <p className='text-gray-600 whitespace-pre-wrap'>
                    {order.description}
                  </p>
                </div>
              )}

              {order.requirements && (
                <div>
                  <h3 className='text-md font-medium mb-2'>Requirements</h3>
                  <p className='text-gray-600 whitespace-pre-wrap'>
                    {order.requirements}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className='mb-6'>
            <FileUploader
              orderId={order.id}
              onUploadComplete={handleFileUploaded}
            />
          </div>

          <FileList orderId={order.id} refreshTrigger={refreshFileList} />

          {order.status === 'in_progress' && (
            <div className='mt-6 flex justify-end'>
              <button
                type='button'
                onClick={() => {
                  if (
                    confirm(
                      'Are you sure you want to mark this order as delivered? This will notify the client that the work is complete.'
                    )
                  ) {
                    // You would implement this function to make an API call
                    // to mark the order as delivered
                    window.location.href = `/freelancer/orders/${order.id}/deliver`;
                  }
                }}
                className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
              >
                Mark as Delivered
              </button>
            </div>
          )}
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default DeliverFiles;
