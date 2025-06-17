import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const ServiceCard = ({ service }) => {
  const [isBookmarked, setIsBookmarked] = useState(
    service.isBookmarked || false
  );

  const toggleBookmark = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // Helper function to format price
  const formatPrice = price => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/jasa/${service.id}`} className='block'>
      <div className='bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-100 hover:border-violet-100'>
        {/* Image Container */}
        <div className='relative h-48 overflow-hidden'>
          <img
            src={service.image}
            alt={service.title}
            onError={e => {
              e.target.onerror = null;
              e.target.src = '/assets/img/service-placeholder.jpg';
            }}
            className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
          />

          {/* Badge */}
          {service.badge && (
            <span
              className={`absolute top-3 left-3 py-1 px-3 rounded-full text-xs font-medium text-white ${
                service.badge === 'best_seller'
                  ? 'bg-violet-600'
                  : service.badge === 'trending'
                    ? 'bg-blue-500'
                    : 'bg-pink-500'
              }`}
            >
              {service.badge === 'best_seller'
                ? 'Best Seller'
                : service.badge === 'trending'
                  ? 'Trending'
                  : 'Baru'}
            </span>
          )}

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className='absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-all'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill={isBookmarked ? 'currentColor' : 'none'}
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={isBookmarked ? 'text-pink-500' : 'text-slate-500'}
            >
              <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className='p-5'>
          {/* Creator Info */}
          <div className='flex items-center mb-3'>
            <img
              src={service.creator.avatar}
              alt={service.creator.name}
              className='w-9 h-9 rounded-full border-2 border-violet-100 mr-2'
            />
            <div>
              <div className='text-sm font-medium text-slate-800'>
                {service.creator.name}
              </div>
              <div className='text-xs text-slate-500'>
                Level {service.creator.level} Seller
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className='text-base font-medium text-slate-900 mb-3 line-clamp-2 min-h-[3rem]'>
            {service.title}
          </h3>

          {/* Rating and Price */}
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <svg
                className='w-4 h-4 text-amber-400'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <span className='ml-1 text-sm font-medium text-slate-800'>
                {service.rating}
              </span>
              <span className='ml-1 text-xs text-slate-500'>
                ({service.reviewCount})
              </span>
            </div>
            <div className='text-base font-bold text-slate-900'>
              {formatPrice(service.price)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
