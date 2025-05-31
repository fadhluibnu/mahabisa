import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { url } = usePage();

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
    return url.startsWith(`/admin/${path}`);
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
              <div className='flex items-center'>
                <span className='font-heading font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-transparent bg-clip-text text-lg'>
                  MahaBisa
                </span>
                {/* <span className="font-heading font-bold text-indigo-600 text-lg">Bisa</span> */}
              </div>
              <div className='text-center px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full font-semibold text-sm'>
                Admin
              </div>
            </div>
          </div>
        </div>

        <nav className='py-4'>
          <div className='mb-4'>
            <p className='px-6 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider'>
              Dashboard
            </p>
            <ul className='mt-2'>
              <li className='px-3'>
                <Link
                  href='/admin/dashboard'
                  className={`flex items-center px-3 py-2.5 rounded-lg ${
                    isActive('dashboard') || url === '/admin'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg
                    className='w-5 h-5 mr-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                    />
                  </svg>
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className='mb-4'>
            <p className='px-6 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider'>
              Manajemen
            </p>
            <ul className='mt-2'>
              <li className='px-3'>
                <Link
                  href='/admin/users'
                  className={`flex items-center px-3 py-2.5 rounded-lg ${
                    isActive('users')
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg
                    className='w-5 h-5 mr-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  <span>Pengguna</span>
                  <span className='ml-auto bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full'>
                    23
                  </span>
                </Link>
              </li>
              <li className='px-3'>
                <Link
                  href='/admin/orders'
                  className={`flex items-center px-3 py-2.5 rounded-lg ${
                    isActive('orders')
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg
                    className='w-5 h-5 mr-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                    />
                  </svg>
                  <span>Proyek</span>
                  <span className='ml-auto bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full'>
                    7
                  </span>
                </Link>
              </li>
              <li className='px-3'>
                <Link
                  href='/admin/payments'
                  className={`flex items-center px-3 py-2.5 rounded-lg ${
                    isActive('payments')
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg
                    className='w-5 h-5 mr-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>Pembayaran</span>
                  <span className='ml-auto bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full'>
                    3
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className='mb-4'>
            <p className='px-6 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider'>
              Sistem
            </p>
            <ul className='mt-2'>
              <li className='px-3'>
                <Link
                  href='/admin/settings'
                  className={`flex items-center px-3 py-2.5 rounded-lg ${
                    isActive('settings')
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg
                    className='w-5 h-5 mr-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
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
                  <span>Pengaturan</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className='p-4 mt-auto border-t border-gray-200'>
          <div className='flex items-center'>
            <div className='w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden'>
              <img
                src='https://randomuser.me/api/portraits/men/32.jpg'
                alt='Admin'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='ml-3'>
              <p className='font-medium text-gray-800 text-sm'>Andi Prasetyo</p>
              <p className='text-gray-500 text-xs'>Super Admin</p>
            </div>
          </div>

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
      </aside>
    </>
  );
};

export default Sidebar;
