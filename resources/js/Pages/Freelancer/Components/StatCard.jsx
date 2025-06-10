import React from 'react';

const StatCard = ({ title, value, icon, color, trend, percentage }) => {
  // Konfigurasi warna berdasarkan props color
  const colorClasses = {
    purple: {
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      trendUp: 'text-indigo-600',
      trendDown: 'text-red-600',
    },
    pink: {
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      trendUp: 'text-pink-600',
      trendDown: 'text-red-600',
    },
    green: {
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
    },
    orange: {
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      trendUp: 'text-orange-600',
      trendDown: 'text-red-600',
    },
  };

  const colors = colorClasses[color] || colorClasses.purple;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h3 className="text-gray-500 text-xs sm:text-sm font-medium">
          {title}
        </h3>
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}
        >
          <span className={colors.iconColor}>{icon}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          {value}
        </p>
        {percentage && (
          <p className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm">
            {trend === 'up' ? (
              <svg
                className={`mr-1 w-3 h-3 sm:w-4 sm:h-4 ${colors.trendUp}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className={`mr-1 w-3 h-3 sm:w-4 sm:h-4 ${colors.trendDown}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span
              className={
                trend === 'up' ? colors.trendUp : colors.trendDown
              }
            >
              {percentage}%
            </span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
