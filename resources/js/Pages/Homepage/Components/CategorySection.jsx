import React from 'react';
import { usePage } from '@inertiajs/react';
import CategoryCard from '@/Components/CategoryCard';

const CategorySection = () => {
  const { categories } = usePage().props;
  
  // Default image mapping for categories
  const defaultImages = {
    'Desain Grafis': 'assets/design.png',
    'Web Development': 'assets/web.png',
    'Video & Animasi': 'assets/video.png', 
    'Penulisan & Translasi': 'assets/penulisan.png',
    'Digital Marketing': 'assets/digital_marketing.png',
    'Musik & Audio': 'assets/musik.png'
  };

  return (
    <section className='pt-8 pb-12 md:pb-16 lg:pb-20'>
      <h1 className='font-bold text-3xl md:text-4xl text-center'>
        Jelajahi Kategori
      </h1>
      <p className='text-md font-normal text-slate-400 text-center mt-3 px-4 md:px-0'>
        Temukan jasa yang kamu butuhkan dari berbagai kategori
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 px-4 md:px-0'>
        {categories && categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={{
              id: category.id,
              name: category.name,
              jasa: `${category.services_count} Jasa`,
              image: category.image_url || defaultImages[category.name] || 'assets/default-category.png',
              description: category.description
            }}
          />
        ))}
        
        {/* If no categories are available, show loading skeleton */}
        {(!categories || categories.length === 0) && (
          <>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
