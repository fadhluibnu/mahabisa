import React from 'react';

const CategoryPillsSection = ({ activeCategory, onCategoryClick }) => {
  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'design', name: 'Design Grafis' },
    { id: 'web', name: 'Web Development' },
    { id: 'video', name: 'Video & Animasi' },
    { id: 'writing', name: 'Penulisan' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'music', name: 'Musik' },
    { id: 'other', name: 'Lainnya' }
  ];

  return (
    <section className="py-4 md:py-6">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 md:gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`py-2 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
              onClick={() => onCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPillsSection;
