import React from 'react';

const CategoryPillsSection = ({ activeCategory, onCategoryClick, categories }) => {
  // Include 'all' option and transform database categories
  const allCategories = [
    { id: 'all', name: 'Semua' },
    ...(categories || []).map(category => ({ 
      id: category.id.toString(), 
      name: category.name,
      count: category.services_count 
    }))
  ];

  return (
    <section className='py-4 md:py-6'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 md:gap-3'>
          {allCategories.map(category => (
            <button
              key={category.id}
              className={`py-2 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id || 
                (activeCategory === 'all' && category.id === 'all') ||
                (category.id === activeCategory)
                  ? 'bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
              onClick={() => onCategoryClick(category.id)}
            >
              {category.name} {category.count > 0 && category.id !== 'all' ? `(${category.count})` : ''}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPillsSection;
