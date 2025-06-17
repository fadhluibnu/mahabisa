import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const Header = ({ title, subtitle }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showUserMenu]);

  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
      <div className='flex-1 min-w-0'>
        <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>
          {title}
        </h1>
        <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>
      </div>
      <div className='flex mt-4 md:mt-0 md:ml-4 space-x-3 items-center'>
        <div className='relative' ref={notificationRef}>
          {/* <button
            type="button"
            className="inline-flex items-center p-2 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setShowNotifications(!showNotifications)}
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
          </button> */}

          {/* Notification dropdown */}
          {showNotifications && (
            <div className='origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10'>
              <div className='py-1' role='menu' aria-orientation='vertical'>
                <div className='px-4 py-2 border-b border-gray-100'>
                  <p className='text-sm font-medium text-gray-900'>
                    Notifikasi
                  </p>
                </div>
                <div className='max-h-60 overflow-y-auto'>
                  <div className='px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer'>
                    <div className='flex'>
                      <div className='flex-shrink-0 mr-3 mt-1'>
                        <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
                          <svg
                            className='w-4 h-4 text-blue-500'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm text-gray-800'>
                          Pesan baru dari{' '}
                          <span className='font-medium'>Alex Suryanto</span>
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                          30 menit yang lalu
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer'>
                    <div className='flex'>
                      <div className='flex-shrink-0 mr-3 mt-1'>
                        <div className='w-8 h-8 rounded-full bg-green-100 flex items-center justify-center'>
                          <svg
                            className='w-4 h-4 text-green-500'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm text-gray-800'>
                          Pembayaran{' '}
                          <span className='font-medium'>#INV-230513</span>{' '}
                          berhasil
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                          2 jam yang lalu
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-2 border-t border-gray-100 text-center'>
                  <button className='text-sm text-indigo-600 hover:text-indigo-800 font-medium'>
                    Lihat semua notifikasi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link
          href='/client/projects/create'
          className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <svg
            className='-ml-1 mr-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          Buat Proyek Baru
        </Link>
      </div>
    </div>
  );
};

export default Header;
