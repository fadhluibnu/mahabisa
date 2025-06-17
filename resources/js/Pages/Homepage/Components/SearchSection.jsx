import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

const SearchSection = ({ searchValue, setSearchValue, handlePopularClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport width is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.visit(
        `/eksplorasi?search=${encodeURIComponent(searchValue.trim())}`
      );
    }
  };

  return (
    <section className='py-4 md:py-8'>
      <div className='bg-white shadow-md rounded-lg p-4 md:p-6'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col sm:flex-row items-center gap-3 md:gap-4'
        >
          <input
            type='text'
            className='border-1 border-gray-300 rounded-lg w-full h-11 p-2 bg-slate-100'
            placeholder='Apa yang kamu butuhkan hari ini?'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <button
            type='submit'
            className='flex gap-2 items-center justify-center text-lg py-2 px-5 bg-slate-200 rounded-lg hover:bg-slate-300 transition-all duration-200 ease-in-out w-full sm:w-auto'
          >
            <svg
              width='20'
              height='18'
              viewBox='0 0 20 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18.3333 1.5H1.66663L8.33329 9.38333V14.8333L11.6666 16.5V9.38333L18.3333 1.5Z'
                stroke='#334155'
                strokeWidth='1.66667'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Cari
          </button>
        </form>
        <div className='mt-4 md:mt-6'>
          <div className='flex items-center mb-2'>
            <p className='text-slate-600 mr-2'>
              {isMobile ? 'Populer:' : 'Populer :'}
            </p>
          </div>
          <div className='flex flex-wrap gap-2 md:gap-4'>
            <button
              type='button'
              onClick={() => handlePopularClick('Design')}
              className='cursor-pointer py-1 px-3 md:px-4 text-sm rounded-full bg-slate-200 transition-all duration-200 ease-in-out hover:bg-slate-300'
            >
              Design
            </button>
            <button
              type='button'
              onClick={() => handlePopularClick('Web Development')}
              className='cursor-pointer py-1 px-3 md:px-4 text-sm rounded-full bg-slate-200 transition-all duration-200 ease-in-out hover:bg-slate-300'
            >
              Web Development
            </button>
            <button
              type='button'
              onClick={() => handlePopularClick('Writing')}
              className='cursor-pointer py-1 px-3 md:px-4 text-sm rounded-full bg-slate-200 transition-all duration-200 ease-in-out hover:bg-slate-300'
            >
              Writing
            </button>
            <button
              type='button'
              onClick={() => handlePopularClick('Marketing')}
              className='cursor-pointer py-1 px-3 md:px-4 text-sm rounded-full bg-slate-200 transition-all duration-200 ease-in-out hover:bg-slate-300'
            >
              Marketing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
