import React from 'react';

const StatCard = ({ title, value, percentage, trend, color, icon }) => {
  const getBgColor = () => {
    switch (color) {
      case 'teal':
        return 'bg-teal-100 text-teal-800';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-800';
      case 'sky':
        return 'bg-sky-100 text-sky-800';
      case 'amber':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = () => {
    return trend === 'up' ? 'text-green-500' : 'text-red-500';
  };

  const getTrendIcon = () => {
    return trend === 'up' ? (
      <svg
        className='h-3 w-3'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
          clipRule='evenodd'
        />
      </svg>
    ) : (
      <svg
        className='h-3 w-3'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z'
          clipRule='evenodd'
        />
      </svg>
    );
  };

  return (
    <div className='bg-white rounded-xl shadow-sm p-6'>
      <div className='flex items-center'>
        <div className={`p-3 rounded-full ${getBgColor()}`}>{icon}</div>
        <div className='ml-5 w-0 flex-1'>
          <dl>
            <dt className='text-sm font-medium text-gray-500 truncate'>
              {title}
            </dt>
            <dd>
              <div className='text-lg font-semibold text-gray-900'>{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      {percentage && (
        <div className='mt-4'>
          <div className={`flex items-center text-sm ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className='ml-1 font-medium'>{percentage}%</span>
            <span className='ml-1 text-gray-500'>dari bulan lalu</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
