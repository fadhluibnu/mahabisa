import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Sidebar = ({ isOpen, closeSidebar, auth }) => {
  const { url, props } = usePage();
  const { user } = auth || props;

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        isOpen &&
        event.target.closest('aside') === null &&
        event.target.closest('button') === null
      ) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, closeSidebar]);

  // Function to check if the current route matches
  const isActive = path => {
    return url.startsWith(`/client/${path}`);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden'
          aria-hidden='true'
        ></div>
      )}

      <aside
        className={`w-64 h-screen bg-white shadow-md fixed left-0 top-0 overflow-y-auto transition-all duration-300 z-30 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center'>
            <div className='justify-center items-center flex p-3 rounded-lg animate-gradient-background'>
              <svg
                width='24'
                height='21'
                viewBox='0 0 24 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                {' '}
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.000147127 20.2922V0H3.55951L8.83284 6.18205L14.2303 0H18.449C20.6698 0.340231 22.5699 1.17937 23.3611 4.45978C23.5032 6.18882 23.2647 8.60575 20.6824 9.68735C22.1291 10.4426 24.277 11.9262 23.9704 15.2709C23.6589 17.4356 22.5651 19.4923 18.6661 20.3891L7.12668 20.3271V17.3182L17.5803 17.2873C19.3465 17.2118 20.5762 16.0303 20.4962 14.3093C20.4316 12.8371 19.5602 11.772 17.7975 11.3934H14.2923V8.44655C15.2332 8.45685 16.1741 8.46723 17.1151 8.4776C19.6745 7.98987 19.8648 6.56392 19.9378 5.74788C19.8267 3.82346 19.0103 3.27446 17.2056 3.00308C16.7731 2.96645 16.1737 3.15675 15.8122 3.57651L8.95686 11.1763L3.49735 5.12745L3.43534 20.3582L0 20.2923L0.000147127 20.2922Z'
                  fill='white'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <h1 className='text-lg font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-transparent bg-clip-text'>
                MahaBisa
              </h1>
              <span className='text-center px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full font-semibold text-sm'>
                Client
              </span>
            </div>
          </div>
        </div>

        <nav className='p-4'>
          <div className='mb-6'>
            <h3 className='px-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
              Dashboard
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/client/dashboard'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('dashboard') || url === '/client'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className='mb-6'>
            <h3 className='px-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
              Proyek
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/client/projects'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('projects')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                    />
                  </svg>
                  Proyek Saya
                </Link>
              </li>
              <li>
                <Link
                  href='/client/projects/create'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('projects/create')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
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
              </li>
            </ul>
          </div>

          <div className='mb-6'>
            <h3 className='px-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
              Layanan
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/client/services'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('services')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                    />
                  </svg>
                  Temukan Layanan
                </Link>
              </li>
              <li>
                <Link
                  href='/client/freelancers'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('freelancers')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  Cari Freelancer
                </Link>
              </li>
              <li>
                <Link
                  href='/client/orders'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('orders')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                    />
                  </svg>
                  Pesanan Saya
                </Link>
              </li>
            </ul>
          </div>

          <div className='mb-6'>
            <h3 className='px-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
              Komunikasi
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/client/messages'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('messages')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="relative">
                    <svg
                      className='mr-3 h-5 w-5'
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
                    {/* Message notification badge */}
                    <span id="message-badge-count" className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full hidden">0</span>
                  </div>
                  Pesan
                </Link>
              </li>
              <li>
                <Link
                  href='/client/reviews'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('reviews')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
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
                  Ulasan Saya
                </Link>
              </li>
            </ul>
          </div>

          <div className='mb-6'>
            <h3 className='px-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
              Pembayaran
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/client/payments'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('payments')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                    />
                  </svg>
                  Riwayat Pembayaran
                </Link>
              </li>
            </ul>
          </div>

          <div className='mb-6'>
            <h3 className='px-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
              Akun
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/client/profile'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('profile')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                  Profil Saya
                </Link>
              </li>
              <li>
                <Link
                  href='/client/settings'
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('settings')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className='mr-3 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  Pengaturan
                </Link>
              </li>
            </ul>
          </div>
          <div className='border-t border-gray-200 p-4'>
            {!user ? (
              <div className='flex items-center'>
                <div className='h-10 w-10 bg-gray-200 rounded-full animate-pulse'></div>
                <div className='ml-3'>
                  <div className='h-4 w-24 bg-gray-200 rounded animate-pulse mb-1'></div>
                  <div className='h-3 w-32 bg-gray-200 rounded animate-pulse'></div>
                </div>
              </div>
            ) : (
              <div className='flex items-center'>
                <img
                  src={
                    user?.profile_photo_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`
                  }
                  alt={user?.name}
                  className='h-10 w-10 rounded-full'
                />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-800'>
                    {user?.name || 'User'}
                  </p>
                  {user?.email && (
                    <p className='text-xs text-gray-500'>{user.email}</p>
                  )}
                </div>
              </div>
            )}

            <Link
              href='/logout'
              method='post'
              as='button'
              className='w-full mt-4 flex items-center justify-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
              Logout
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
