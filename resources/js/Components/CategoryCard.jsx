import React from 'react';
import { router } from '@inertiajs/react';

const CategoryCard = ({ category }) => {
  const handleClick = () => {
    router.visit(`/eksplorasi?kategori=${encodeURIComponent(category.name)}`);
  };
  
  return (
    <div 
      onClick={handleClick}
      className='w-full cursor-pointer shadow-lg rounded-lg py-6 md:py-8 bg-white hover:shadow-xl transition-all duration-200 ease-in-out'
    >
      <div className='flex items-center justify-between gap-3 md:gap-4 px-4 md:px-6'>
        <div className='flex items-center gap-3 md:gap-4'>
          <img
            src={category.image}
            alt={category.name}
            className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover'
          />
          <div>
            <h3 className='font-bold text-lg md:text-xl'>{category.name}</h3>
            <span className='text-xs md:text-sm text-slate-500'>
              {category.jasa}
            </span>
          </div>
        </div>
        <svg
          width='20'
          height='21'
          viewBox='0 0 20 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='flex-shrink-0'
        >
          <path
            d='M7.5 15.095L12.5 10.095L7.5 5.09497'
            stroke='#94A3B8'
            strokeWidth='1.66667'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      {category.description && (
        <p className="px-4 md:px-6 mt-3 text-sm text-gray-600 line-clamp-2">{category.description}</p>
      )}
    </div>
  );
};

export default CategoryCard;
