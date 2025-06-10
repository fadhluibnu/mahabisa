import React from 'react';
import { Link } from '@inertiajs/react';

const EarningsCard = (props) => {
  // Check if this is a single payment or a list of payments
  const isSinglePayment = !Array.isArray(props.earnings) && props.project;
  const earnings = isSinglePayment ? [props] : props.earnings;

  // Format currency
  const formatCurrency = (amount) => {
    if (typeof amount === 'string' && amount.startsWith('Rp')) {
      return amount;
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateString; // If date parsing fails, return the original string
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {!isSinglePayment && (
        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Pembayaran Terbaru</h3>
          <button
            type="button"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="ml-1">Filter</span>
          </button>
        </div>
      )}
      <div className="divide-y divide-gray-100">
        {earnings.map((item, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 hover:bg-gray-50 transition duration-150 flex items-center"
          >
            <div className="flex-shrink-0 mr-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <svg
                  className={`h-5 w-5 ${
                    item.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {item.status === 'completed' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  )}
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.project}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(item.date)}
              </p>
            </div>
            <div className="ml-4">
              <span className={`text-sm font-medium ${
                item.status === 'completed' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {formatCurrency(item.amount)}
              </span>
            </div>
          </div>
        ))}
        
        {earnings.length === 0 && (
          <div className="p-6 text-center">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada pembayaran</h3>
            <p className="mt-1 text-sm text-gray-500">
              Anda belum menerima pembayaran apa pun.
            </p>
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-5 border-t border-gray-100">
        <Link
          href="/freelancer/earnings"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Lihat Semua Pembayaran
          <svg
            className="ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default EarningsCard;
