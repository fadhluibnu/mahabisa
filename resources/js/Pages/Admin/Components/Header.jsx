import React, { useState, useRef, useEffect } from 'react';

const Header = ({ title, subtitle }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        showSearch
      ) {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showSearch]);

  return (
    <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 py-4 border-b border-gray-200'>
      <div className='mb-4 sm:mb-0'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-gray-900'>
          {title}
        </h1>
        {subtitle && (
          <p className='text-gray-500 mt-1 text-sm md:text-base'>{subtitle}</p>
        )}
      </div>

      <div className='flex items-center'>
        {/* Mobile search toggle */}
        {/* <button
          className='sm:hidden mr-3 p-2 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'
          onClick={() => setShowSearch(!showSearch)}
        >
          <svg
            className='w-5 h-5 text-gray-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button> */}

        {/* Desktop search */}
        {/* <div
          ref={searchRef}
          className={`relative mr-4 ${showSearch ? 'block w-full sm:w-auto' : 'hidden sm:block'}`}
        >
          <div className='relative'>
            <input
              type='text'
              placeholder='Cari...'
              className='bg-gray-100 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all w-full sm:w-40 md:w-64'
            />
            <svg
              className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div> */}

        {/* <div ref={notificationRef} className='relative'>
            <button
              className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative'
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <svg
                className='w-6 h-6 text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
              <span className='absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                3
              </span>
            </button>

            {showNotifications && (
              <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200'>
                <div className='px-4 py-2 border-b border-gray-100'>
                  <h3 className='font-semibold text-gray-900'>Notifikasi</h3>
                </div>

                <div className='max-h-96 overflow-y-auto'>
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
                              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm text-gray-800'>
                          <span className='font-medium'>Budi Setiawan</span>{' '}
                          mendaftar sebagai freelancer baru
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                          2 jam yang lalu
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
                          <span className='font-medium'>#INV-230513</span> telah
                          selesai
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                          5 jam yang lalu
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='px-4 py-3 hover:bg-gray-50 cursor-pointer'>
                    <div className='flex'>
                      <div className='flex-shrink-0 mr-3 mt-1'>
                        <div className='w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center'>
                          <svg
                            className='w-4 h-4 text-yellow-500'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm text-gray-800'>
                          <span className='font-medium'>Proyek #PRJ-8723</span>{' '}
                          melewati tenggat waktu
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                          1 hari yang lalu
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
            )}
          </div> */}
      </div>
    </div>
  );
};

export default Header;
