import React from 'react';
import { Link } from '@inertiajs/react';

const SellerSection = ({ seller, renderStars }) => {
  return (
    <div className='p-6 border-t border-gray-200'>
      <div className='flex items-center gap-4 mb-4'>
        <img
          src={seller.avatar}
          alt={seller.name}
          className='w-14 h-14 rounded-full object-cover'
        />
        <div>
          <h3 className='font-medium text-gray-900'>{seller.name}</h3>
          <p className='text-sm text-[#7C3AED]'>{seller.title}</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 mb-4'>
        <div>
          <p className='text-xs text-gray-500'>Rating</p>
          <div className='flex items-center'>
            <p className='font-medium text-gray-900 mr-1'>{seller.rating}</p>
            <div className='flex'>{renderStars(seller.rating)}</div>
          </div>
        </div>
        <div>
          <p className='text-xs text-gray-500'>Proyek Selesai</p>
          <p className='font-medium text-gray-900'>
            {seller.completedProjects}
          </p>
        </div>
        <div>
          <p className='text-xs text-gray-500'>Ulasan</p>
          <p className='font-medium text-gray-900'>{seller.reviews}</p>
        </div>
        <div>
          <p className='text-xs text-gray-500'>Waktu Respons</p>
          <p className='font-medium text-gray-900'>{seller.responseTime}</p>
        </div>
      </div>

      <div className='border-t border-gray-200 pt-4'>
        <p className='text-sm text-gray-700 mb-4'>{seller.description}</p>
        <Link
          href={`/talenta/${seller.id}`}
          className='text-sm text-[#7C3AED] font-medium hover:underline'
        >
          Lihat Profil
        </Link>
      </div>
    </div>
  );
};

export default SellerSection;
