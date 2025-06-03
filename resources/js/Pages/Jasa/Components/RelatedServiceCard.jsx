import React from 'react';
import { Link } from '@inertiajs/react';

const RelatedServiceCard = ({ service, formatRupiah }) => {
  return (
    <Link 
      href={`/jasa/${service.id}`}
      className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <div className="font-semibold text-sm text-slate-800 leading-tight">
            {service.seller}
          </div>
        </div>
        <div className="font-bold text-base text-slate-900 mb-2 leading-snug line-clamp-2">
          {service.title}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-[#F59E42] text-sm font-semibold">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path
                d="M8 1.333l2.06 4.177 4.607.67-3.334 3.25.787 4.583L8 11.177l-4.12 2.336.787-4.583-3.334-3.25 4.607-.67L8 1.333z"
                stroke="#F59E42"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            {service.rating}
            <span className="text-slate-400 font-normal ml-1">
              ({service.reviews})
            </span>
          </div>
          <div className="font-bold text-slate-900 text-base">
            {formatRupiah(service.price)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedServiceCard;
