import React from 'react';

const FilterSection = ({ filters, onFilterChange }) => {
  return (
    <section className='py-6'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Kategori
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.category}
                onChange={e => onFilterChange('category', e.target.value)}
              >
                <option value=''>Semua Kategori</option>
                <option value='design'>Design Grafis</option>
                <option value='web'>Web Development</option>
                <option value='video'>Video & Animasi</option>
                <option value='writing'>Penulisan & Translasi</option>
                <option value='marketing'>Digital Marketing</option>
                <option value='music'>Musik & Audio</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Budget
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.budget}
                onChange={e => onFilterChange('budget', e.target.value)}
              >
                <option value=''>Semua Harga</option>
                <option value='low'>{'< Rp100rb'}</option>
                <option value='medium'>Rp100rb - Rp300rb</option>
                <option value='high'>Rp300rb - Rp500rb</option>
                <option value='premium'>Rp500rb+</option>
              </select>
            </div>

            <div className='space-y-2'>
              {' '}
              <label className='block text-sm font-medium text-slate-700'>
                Rating
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.rating}
                onChange={e => onFilterChange('rating', e.target.value)}
              >
                <option value=''>Semua Rating</option>
                <option value='4.5'>4.5+</option>
                <option value='4.0'>4.0+</option>
                <option value='3.5'>3.5+</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Urutkan
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.sort}
                onChange={e => onFilterChange('sort', e.target.value)}
              >
                <option value='recommended'>Direkomendasikan</option>
                <option value='newest'>Terbaru</option>
                <option value='price-low'>Harga Terendah</option>
                <option value='price-high'>Harga Tertinggi</option>
                <option value='rating'>Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
