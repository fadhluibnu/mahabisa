import React from 'react';
import { Link } from '@inertiajs/react';

const ServiceCard = ({ service, showFreelancer = true }) => {
  // Format price with Rupiah formatting
  const formatPrice = price => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md'>
      <div className='relative'>
        <Link href={`/jasa/${service.id}`}>
          <img
            src={service.image}
            alt={service.title}
            className='h-48 w-full object-cover'
            onError={e => {
              e.target.onerror = null;
              e.target.src = '/assets/design.png'; // Fallback image
            }}
          />
        </Link>

        {service.isBestSeller && (
          <div className='absolute top-2 left-2'>
            <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium'>
              Best Seller
            </span>
          </div>
        )}
      </div>

      <div className='p-4'>
        {showFreelancer && service.freelancer && (
          <div className='flex items-center mb-2'>
            <img
              src={
                service.freelancer.avatar ||
                'https://randomuser.me/api/portraits/men/1.jpg'
              }
              alt={service.freelancer.name}
              className='w-6 h-6 rounded-full mr-2 object-cover border border-gray-200'
            />
            <span className='text-sm text-gray-700'>
              {service.freelancer.name}
            </span>
            {service.freelancer.level && (
              <span className='ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full'>
                {service.freelancer.level}
              </span>
            )}
          </div>
        )}

        <Link href={`/jasa/${service.id}`}>
          <h3 className='font-medium text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors'>
            {service.title}
          </h3>
        </Link>

        <div className='flex items-center mb-3'>
          <div className='flex items-center text-yellow-400 mr-1'>
            <svg
              className='w-4 h-4'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <span className='ml-1 text-sm text-gray-700'>{service.rating}</span>
          </div>
          <span className='text-xs text-gray-500'>({service.reviewCount})</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold text-gray-900'>
            {typeof service.price === 'number'
              ? formatPrice(service.price)
              : service.price}
          </span>
          <Link
            href={`/jasa/${service.id}`}
            className='text-sm text-indigo-600 hover:text-indigo-800 font-medium'
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
