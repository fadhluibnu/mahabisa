import React from 'react';

const TalentaHero = ({ searchValue, onSearchChange }) => {
  return (
    <section className='py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-slate-900 mb-4 relative inline-block'>
            Talenta Mahasiswa
            <span className='absolute -bottom-2 left-0 w-24 h-1.5 bg-gradient-to-r from-violet-600 to-pink-500 rounded-full'></span>
          </h1>
          <p className='text-lg text-slate-600 mt-6'>
            Temukan talenta mahasiswa berbakat dari universitas terbaik di
            Indonesia
          </p>
        </div>

        <div className='relative max-w-2xl mx-auto'>
          <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none'>
            <svg
              className='h-5 w-5 text-slate-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
          <input
            type='text'
            className='w-full py-4 pl-12 pr-4 bg-white border border-slate-200 rounded-xl shadow-md focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none transition-all'
            placeholder='Cari talenta berdasarkan nama, keahlian, atau universitas...'
            value={searchValue}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </section>
  );
};

export default TalentaHero;
