import React from 'react';

const ActivityCard = ({ activities }) => {
  const formatDateTime = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getIcon = type => {
    switch (type) {
      case 'message':
        return (
          <div className='h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center'>
            <svg
              className='h-5 w-5 text-blue-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
              />
            </svg>
          </div>
        );
      case 'project':
        return (
          <div className='h-8 w-8 rounded-full bg-green-100 flex items-center justify-center'>
            <svg
              className='h-5 w-5 text-green-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className='h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center'>
            <svg
              className='h-5 w-5 text-yellow-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </div>
        );
      case 'review':
        return (
          <div className='h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center'>
            <svg
              className='h-5 w-5 text-purple-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className='h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center'>
            <svg
              className='h-5 w-5 text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
      <div className='p-4 border-b border-gray-200'>
        <h2 className='text-lg font-medium text-gray-900'>Aktivitas Terbaru</h2>
      </div>
      <div className='divide-y divide-gray-200'>
        {activities.map((activity, index) => (
          <div key={index} className='p-4'>
            <div className='flex'>
              {getIcon(activity.type)}
              <div className='ml-3 flex-1'>
                <p className='text-sm font-medium text-gray-900'>
                  {activity.title}
                </p>
                <p className='text-sm text-gray-500'>{activity.description}</p>
                <p className='mt-1 text-xs text-gray-400'>
                  {formatDateTime(activity.datetime)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities.length > 5 && (
        <div className='p-4 border-t border-gray-200'>
          <button className='text-sm font-medium text-teal-600 hover:text-teal-500'>
            Lihat Semua Aktivitas
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
