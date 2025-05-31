import React from 'react';

const StatCard = ({ title, value, icon, color, trend, percentage }) => {
  // Konfigurasi warna berdasarkan props color
  const colorClasses = {
    purple: {
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      trendUp: 'text-indigo-600',
      trendDown: 'text-red-600'
    },
    pink: {
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      trendUp: 'text-pink-600',
      trendDown: 'text-red-600'
    },
    green: {
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    orange: {
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      trendUp: 'text-orange-600',
      trendDown: 'text-red-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.purple;

  return (    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h3 className="text-gray-500 text-xs sm:text-sm font-medium">{title}</h3>
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
          <span className={colors.iconColor}>
            {icon}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
        
        {trend && (
          <div className="flex items-center mt-1 sm:mt-2">
            {trend === 'up' ? (
              <svg 
                className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${colors.trendUp}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : (
              <svg 
                className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${colors.trendDown}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              </svg>
            )}
            <span className={`text-xs sm:text-sm ${trend === 'up' ? colors.trendUp : colors.trendDown}`}>
              {percentage}% dari bulan lalu
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
