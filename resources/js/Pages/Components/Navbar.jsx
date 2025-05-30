import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Set current path on component mount and when the URL changes
    setCurrentPath(window.location.pathname);

    // Optional: Listen for history changes to update active state when navigating
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Helper function to determine if a link is active
  const isActive = path => {
    if (path === '/' && currentPath === '/') {
      return true;
    }
    return path !== '/' && currentPath.startsWith(path);
  };

  return (
    <nav className='border-b border-gray-200/30 fixed z-50 w-full bg-white/70 backdrop-blur-lg backdrop-filter'>
      <div className='px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto'>
        <div className='flex justify-between h-16'>          <div className='flex items-center justify-start'>
            <a
              href='/'
              className='text-xl font-bold text-gray-900 flex items-center'
            >
              <div className='justify-center items-center flex p-2 rounded-lg animate-gradient-background'>
                <svg
                  width='24'
                  height='21'
                  viewBox='0 0 24 21'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M0.000147127 20.2922V0H3.55951L8.83284 6.18205L14.2303 0H18.449C20.6698 0.340231 22.5699 1.17937 23.3611 4.45978C23.5032 6.18882 23.2647 8.60575 20.6824 9.68735C22.1291 10.4426 24.277 11.9262 23.9704 15.2709C23.6589 17.4356 22.5651 19.4923 18.6661 20.3891L7.12668 20.3271V17.3182L17.5803 17.2873C19.3465 17.2118 20.5762 16.0303 20.4962 14.3093C20.4316 12.8371 19.5602 11.772 17.7975 11.3934H14.2923V8.44655C15.2332 8.45685 16.1741 8.46723 17.1151 8.4776C19.6745 7.98987 19.8648 6.56392 19.9378 5.74788C19.8267 3.82346 19.0103 3.27446 17.2056 3.00308C16.7731 2.96645 16.1737 3.15675 15.8122 3.57651L8.95686 11.1763L3.49735 5.12745L3.43534 20.3582L0 20.2923L0.000147127 20.2922Z'
                    fill='white'
                  />
                </svg>
              </div>
              {/* <svg
                width='40'
                height='40'
                viewBox='0 0 40 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  width='40'
                  height='40'
                  rx='12'
                  fill='url(#paint0_linear_631_5140)'
                />
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M8.00015 30.2922V10H11.5595L16.8328 16.1821L22.2303 10H26.449C28.6698 10.3402 30.5699 11.1794 31.3611 14.4598C31.5032 16.1888 31.2647 18.6057 28.6824 19.6873C30.1291 20.4426 32.277 21.9262 31.9704 25.2709C31.6589 27.4356 30.5651 29.4923 26.6661 30.3891L15.1267 30.3271V27.3182L25.5803 27.2873C27.3465 27.2118 28.5762 26.0303 28.4962 24.3093C28.4316 22.8371 27.5602 21.772 25.7975 21.3934H22.2923V18.4466C23.2332 18.4569 24.1741 18.4672 25.1151 18.4776C27.6745 17.9899 27.8648 16.5639 27.9378 15.7479C27.8267 13.8235 27.0103 13.2745 25.2056 13.0031C24.7731 12.9664 24.1737 13.1568 23.8122 13.5765L16.9569 21.1763L11.4974 15.1274L11.4353 30.3582L8 30.2923L8.00015 30.2922Z'
                  fill='white'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_631_5140'
                    x1='0'
                    y1='0'
                    x2='40'
                    y2='40'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#7C3AED' />
                    <stop offset='1' stop-color='#EC4899' />
                  </linearGradient>
                </defs>
              </svg> */}
              <span className='ml-2'>MahaBisa</span>
            </a>
          </div>
          {/* Desktop Navigation */}
          <div className='hidden md:flex gap-7 items-center'>
            <a
              href='/'
              className={`font-medium transition-all duration-300 ease-in-out relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] ${
                isActive('/')
                  ? 'text-[#7C3AED] after:w-full after:bg-[#7C3AED]'
                  : 'text-gray-800 hover:text-[#7C3AED] after:w-0 after:bg-[#7C3AED] after:transition-all hover:after:w-full'
              }`}
            >
              Beranda
            </a>
            <a
              href='/eksplorasi'
              className={`font-medium transition-all duration-300 ease-in-out relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] ${
                isActive('/eksplorasi')
                  ? 'text-[#7C3AED] after:w-full after:bg-[#7C3AED]'
                  : 'text-gray-800 hover:text-[#7C3AED] after:w-0 after:bg-[#7C3AED] after:transition-all hover:after:w-full'
              }`}
            >
              Eksplorasi
            </a>
            <a
              href='/talenta'
              className={`font-medium transition-all duration-300 ease-in-out relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] ${
                isActive('/talenta')
                  ? 'text-[#7C3AED] after:w-full after:bg-[#7C3AED]'
                  : 'text-gray-800 hover:text-[#7C3AED] after:w-0 after:bg-[#7C3AED] after:transition-all hover:after:w-full'
              }`}
            >
              Talenta
            </a>
            <a
              href='/proyek'
              className={`font-medium transition-all duration-300 ease-in-out relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] ${
                isActive('/proyek')
                  ? 'text-[#7C3AED] after:w-full after:bg-[#7C3AED]'
                  : 'text-gray-800 hover:text-[#7C3AED] after:w-0 after:bg-[#7C3AED] after:transition-all hover:after:w-full'
              }`}
            >
              Proyek
            </a>
            <a
              href='/tentang-kami'
              className={`font-medium transition-all duration-300 ease-in-out relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] ${
                isActive('/tentang-kami')
                  ? 'text-[#7C3AED] after:w-full after:bg-[#7C3AED]'
                  : 'text-gray-800 hover:text-[#7C3AED] after:w-0 after:bg-[#7C3AED] after:transition-all hover:after:w-full'
              }`}
            >
              Tentang Kami
            </a>
          </div>          {/* Desktop Auth Buttons */}
          <div className='hidden md:flex items-center gap-4'>
            <a
              href='/auth?form=login'
              className='px-5 py-2 rounded-md transition-all duration-300 ease-in-out hover:shadow-md hover:bg-gray-50 font-medium text-gray-700'
            >
              Masuk
            </a>
            <a
              href='/auth?form=register'
              className='px-5 py-2 bg-[#7C3AED] text-white rounded-md transition-all duration-300 hover:shadow-lg hover:bg-[#6D28D9] font-medium'
            >
              Daftar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex items-center md:hidden'>
            <button
              onClick={toggleMenu}
              className='p-2 rounded-md text-gray-700 hover:text-[#7C3AED] hover:bg-gray-100 focus:outline-none'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              ) : (
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white shadow-lg border-t border-gray-200'>
          <div className='px-4 pt-2 pb-4 space-y-1'>
            <a
              href='/'
              className={`block py-2 px-3 text-base font-medium rounded-md ${
                isActive('/')
                  ? 'text-[#7C3AED] bg-purple-50'
                  : 'text-gray-800 hover:bg-gray-100 hover:text-[#7C3AED]'
              }`}
            >
              Home
            </a>
            <a
              href='/explore'
              className={`block py-2 px-3 text-base font-medium rounded-md ${
                isActive('/explore')
                  ? 'text-[#7C3AED] bg-purple-50'
                  : 'text-gray-800 hover:bg-gray-100 hover:text-[#7C3AED]'
              }`}
            >
              Explore
            </a>
            <a
              href='/talenta'
              className={`block py-2 px-3 text-base font-medium rounded-md ${
                isActive('/talenta')
                  ? 'text-[#7C3AED] bg-purple-50'
                  : 'text-gray-800 hover:bg-gray-100 hover:text-[#7C3AED]'
              }`}
            >
              Talenta
            </a>
            <a
              href='/proyek'
              className={`block py-2 px-3 text-base font-medium rounded-md ${
                isActive('/proyek')
                  ? 'text-[#7C3AED] bg-purple-50'
                  : 'text-gray-800 hover:bg-gray-100 hover:text-[#7C3AED]'
              }`}
            >
              Proyek
            </a>
            <a
              href='/lainnya'
              className={`block py-2 px-3 text-base font-medium rounded-md ${
                isActive('/lainnya')
                  ? 'text-[#7C3AED] bg-purple-50'
                  : 'text-gray-800 hover:bg-gray-100 hover:text-[#7C3AED]'
              }`}
            >
              Tentang Kami
            </a>
          </div>          <div className='px-4 py-3 border-t border-gray-200 flex flex-col space-y-3'>
            <a
              href='/auth?form=login'
              className='block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-all'
            >
              Masuk
            </a>
            <a
              href='/auth?form=register'
              className='block w-full px-4 py-2 text-center text-white bg-[#7C3AED] rounded-md hover:bg-[#6D28D9] transition-all'
            >
              Daftar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
