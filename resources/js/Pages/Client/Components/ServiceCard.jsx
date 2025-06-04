import React from 'react';
import { Link } from '@inertiajs/react';

const ServiceCard = ({ service }) => {
  // Use a default image if the service image is not available
  const imageUrl = service && service.image ? service.image : '/img/placeholder.jpg';
  
  if (!service) {
    return <div className="rounded-lg bg-white shadow-md p-4">Loading...</div>;
  }

  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/client/services/${service.id}`} className="block">
        <div className="relative pb-[60%]">
          {/* Use error handling for image */}
          <img
            src={imageUrl}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/img/placeholder.jpg';
            }}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            {service.freelancer && (
              <>
                <img
                  src={service.freelancer.avatar || '/img/placeholder-avatar.jpg'}
                  alt={service.freelancer.name}
                  className="w-6 h-6 rounded-full object-cover mr-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/img/placeholder-avatar.jpg';
                  }}
                />
                <span className="text-sm text-gray-600">{service.freelancer.name}</span>
                {service.freelancer.level && (
                  <span className="ml-auto text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {service.freelancer.level}
                  </span>
                )}
              </>
            )}
          </div>
          <h3 className="font-medium text-sm line-clamp-2 mb-2">{service.title}</h3>
          <div className="flex items-center text-sm text-yellow-500 mb-2">
            <svg className="w-4 h-4 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-gray-700 mr-1">{service.rating || '0.0'}</span>
            <span className="text-gray-500">({service.reviews || 0})</span>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Mulai dari</span>
              <span className="font-semibold text-sm">{service.price}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
