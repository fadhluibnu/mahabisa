import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import ClientLayout from './Components/ClientLayout'; // Corrected import
import { usePage } from '@inertiajs/react';

export default function Services({ auth, services, categories }) {
  const { url } = usePage();

  // Helper function to generate route URLs
  const route = (name, params = {}) => {
    // Access window.route provided by Ziggy
    if (typeof window !== 'undefined' && window.route) {
      return window.route(name, params);
    }

    // Fallback URLs if route() is not available
    const routes = {
      'client.services': '/client/services',
      'client.services.show': id => `/client/services/${id}`,
      'client.freelancers.show': id => `/client/freelancers/${id}`,
      'client.services.order.form': id => `/client/services/${id}/order`,
    };

    if (typeof routes[name] === 'function') {
      return routes[name](params);
    }
    return routes[name] || '/';
  };

  return (
    <ClientLayout // Corrected Layout component
      title='Browse Services' // Pass title prop
      subtitle='Find the best services offered by our talented freelancers' // Pass subtitle prop
    >
      <Head title='Browse Services' />

      <div className='py-1'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-white border-b border-gray-200'>
              <div className='mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Filter by Category
                </h3>
                <div className='mt-2 space-x-2 flex flex-wrap gap-2'>
                  <Link
                    href={route('client.services')}
                    className='px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    preserveState
                    preserveScroll
                  >
                    All
                  </Link>
                  {categories &&
                    categories.map(category => (
                      <Link
                        key={category.id}
                        href={route('client.services', {
                          category: category.id,
                        })} // Assuming you'll handle category filtering in controller
                        className='px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        preserveState
                        preserveScroll
                      >
                        {category.name}
                      </Link>
                    ))}
                </div>
              </div>

              {services && services.data && services.data.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {services.data.map(service => (
                    <div
                      key={service.id}
                      className='bg-white shadow rounded-lg overflow-hidden flex flex-col'
                    >
                      <Link
                        href={route('client.services.show', service.id)}
                        className='block'
                      >
                        <img
                          src={
                            service.image_url ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(service.title.substring(0, 15))}&background=random&color=fff`
                          }
                          alt={service.title}
                          className='w-full h-48 object-cover'
                        />
                      </Link>
                      <div className='p-4 flex flex-col flex-grow'>
                        <Link
                          href={route('client.services.show', service.id)}
                          className='block'
                        >
                          <h4
                            className='text-lg font-semibold text-gray-900 truncate hover:text-indigo-600'
                            title={service.title}
                          >
                            {service.title}
                          </h4>
                        </Link>
                        <p className='text-sm text-gray-600 mt-1'>
                          By{' '}
                          <Link
                            href={route(
                              'client.freelancers.show',
                              service.user.id
                            )}
                            className='text-indigo-600 hover:underline'
                          >
                            {service.user.name}
                          </Link>
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                          {service.category.name}
                        </p>
                        {/* Placeholder for rating - you'll need to fetch this data */}
                        {/* <div className="mt-1 flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-4 h-4 ${i < (service.average_rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                                    ))}
                                                    <span className="ml-1 text-xs text-gray-500">({service.reviews_count || 0} reviews)</span>
                                                </div> */}
                        <div className='mt-auto pt-3 flex items-center justify-between'>
                          <p className='text-lg font-bold text-indigo-600'>
                            ${parseFloat(service.price).toFixed(2)}
                          </p>
                          <Link
                            href={route(
                              'client.services.order.form',
                              service.id
                            )}
                            className='px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                          >
                            Order Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-10'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      vectorEffect='non-scaling-stroke'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                    />
                  </svg>
                  <h3 className='mt-2 text-sm font-medium text-gray-900'>
                    No services found
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    There are currently no services available. Please check back
                    later.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {services && services.links && services.data.length > 0 && (
                <div className='mt-6 flex justify-center items-center space-x-1'>
                  {services.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url || '#'} // Ensure URL is not null
                      className={`px-4 py-2 text-sm font-medium border rounded-md 
                                                        ${link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} 
                                                        ${!link.url ? 'text-gray-400 cursor-not-allowed opacity-50' : ''}`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                      disabled={!link.url}
                      preserveState
                      preserveScroll
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
