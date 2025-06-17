import React from 'react';

const FilterSection = ({
  filters,
  onFilterChange,
  categories,
  priceRanges,
  ratingOptions,
}) => {
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
                value={filters.category || ''}
                onChange={e => onFilterChange('category', e.target.value)}
              >
                <option value=''>Semua Kategori</option>
                {categories &&
                  categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.services_count})
                    </option>
                  ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Budget
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={getPriceRangeId(
                  filters.min_price,
                  filters.max_price,
                  priceRanges
                )}
                onChange={e => onFilterChange('price_range', e.target.value)}
              >
                <option value=''>Semua Harga</option>
                {priceRanges &&
                  priceRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Rating
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.rating || ''}
                onChange={e => onFilterChange('rating', e.target.value)}
              >
                <option value=''>Semua Rating</option>
                {ratingOptions &&
                  ratingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-700'>
                Urutkan
              </label>
              <select
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600'
                value={filters.sort_by || 'newest'}
                onChange={e => onFilterChange('sort_by', e.target.value)}
              >
                <option value='newest'>Terbaru</option>
                <option value='popular'>Terpopuler</option>
                <option value='price_low'>Harga Terendah</option>
                <option value='price_high'>Harga Tertinggi</option>
                <option value='rating'>Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to determine which price range is currently selected
const getPriceRangeId = (minPrice, maxPrice, priceRanges) => {
  if (!minPrice && !maxPrice) return '';

  for (const range of priceRanges || []) {
    if (
      range.min === parseInt(minPrice) &&
      range.max === (maxPrice ? parseInt(maxPrice) : null)
    ) {
      return range.id;
    }
  }

  return '';
};

export default FilterSection;
