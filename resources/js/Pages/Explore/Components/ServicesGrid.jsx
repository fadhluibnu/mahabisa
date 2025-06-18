import React from 'react';
import ServiceCard from './ServiceCard';
import { usePage } from '@inertiajs/react';

const ServicesGrid = ({ services, isLoading }) => {
  const { data: servicesData = [], meta, links } = services || { data: [] };

  // All filtering and sorting is done on the server side now

  // Pagination is now handled by Laravel's pagination

  return (
    <section className='py-8 mb-16'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg font-medium text-slate-900 mb-6'>
          {servicesData.length} jasa ditemukan
        </h2>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
            <span className="ml-3 text-lg text-violet-600 font-medium">Mencari dengan AI...</span>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
          {servicesData.map(service => (
            <ServiceCard
              key={service.id}
              service={{
                id: service.id,
                title: service.title,
                image:
                  service.thumbnail || '/assets/img/service-placeholder.jpg',
                badge: service.badge,
                creator: {
                  name: service.user?.name || 'Anonymous',
                  avatar:
                    service.user?.profile_photo_url ||
                    '/assets/img/avatar-placeholder.jpg',
                  level: service.user?.profile?.level || 1,
                },
                rating: service.reviews_avg_rating || 0,
                reviewCount: service.reviews_count || 0,
                price: service.price || 0,
                category: service.category?.name?.toLowerCase() || 'other',
              }}
            />
          ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && servicesData.length === 0 && (
          <div className='text-center py-12'>
            <h3 className='text-lg font-medium text-slate-800 mb-2'>
              Tidak ada jasa yang ditemukan
            </h3>
            <p className='text-slate-500'>
              Coba mengubah filter atau kata kunci pencarian
            </p>
          </div>
        )}

        {/* Pagination - only show for regular search (not AI search) */}
        {!isLoading && meta?.last_page > 1 && (
          <div className='flex justify-center'>
            <div className='flex space-x-2'>
              {links.prev && (
                <a
                  href={links.prev}
                  className='flex items-center justify-center px-3 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all'
                >
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                  <span>Prev</span>
                </a>
              )}

              {/* Generate page numbers */}
              {Array.from({ length: meta.last_page }, (_, i) => i + 1)
                .filter(i => {
                  const current = meta.current_page;
                  return (
                    i === 1 ||
                    i === meta.last_page ||
                    (i >= current - 1 && i <= current + 1)
                  );
                })
                .map((number, i, arr) => (
                  <React.Fragment key={number}>
                    {i > 0 && arr[i - 1] !== number - 1 && (
                      <span className='w-10 h-10 flex items-center justify-center'>
                        ...
                      </span>
                    )}
                    <a
                      href={`${links.first.split('?')[0]}?page=${number}&${links.first
                        .split('?')[1]
                        ?.split('&')
                        .filter(param => !param.startsWith('page='))
                        .join('&')}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                        meta.current_page === number
                          ? 'bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {number}
                    </a>
                  </React.Fragment>
                ))}

              {links.next && (
                <a
                  href={links.next}
                  className='flex items-center justify-center px-3 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all'
                >
                  <span className='mr-1'>Next</span>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;
