import React from 'react';

const Badge = ({ children, color = 'gray', className = '' }) => {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
    orange: 'bg-orange-100 text-orange-800'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-md font-medium ${colorClasses[color] || colorClasses.gray} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
