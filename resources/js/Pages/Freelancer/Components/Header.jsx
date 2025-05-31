import React from 'react';
import { Link } from '@inertiajs/react';

const Header = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex mt-4 md:mt-0 md:ml-4 space-x-3">
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center p-2 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="sr-only">Notifikasi</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>
        </div>
        
        <Link
          href="/freelancer/project/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Buat Layanan
        </Link>
      </div>
    </div>
  );
};

export default Header;
