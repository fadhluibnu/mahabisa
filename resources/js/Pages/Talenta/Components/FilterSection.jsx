import React from 'react';

const FilterSection = ({ filters, onFilterChange, categories }) => {
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
                value={filters.categoryId || ''}
                onChange={e => onFilterChange('categoryId', e.target.value)}
              >
                <option value=''>Semua Kategori</option>
                {categories &&
                  categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Status Verifikasi
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.verified || ''}
                onChange={e => onFilterChange('verified', e.target.value)}
              >
                <option value=''>Semua Status</option>
                <option value='verified'>Terverifikasi</option>
                <option value='unverified'>Belum Terverifikasi</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Rating Minimal
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.rating || ''}
                onChange={e => onFilterChange('rating', e.target.value)}
              >
                <option value=''>Semua Rating</option>
                <option value='4.5'>4.5+</option>
                <option value='4'>4.0+</option>
                <option value='3.5'>3.5+</option>
                <option value='3'>3.0+</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Urutkan
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.sortBy || 'rating'}
                onChange={e => onFilterChange('sortBy', e.target.value)}
              >
                <option value='rating'>Rating Tertinggi</option>
                <option value='orders_count'>Proyek Terbanyak</option>
                <option value='newest'>Terbaru</option>
                <option value='oldest'>Terlama</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
