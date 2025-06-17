import React from 'react';
import { Link } from '@inertiajs/react';

const ProjectCard = ({ title, items, viewAllLink }) => {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className='p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
        <div className='flex'>
          {/* <button className="p-1 rounded-full text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button> */}
        </div>
      </div>
      <div className='divide-y divide-gray-100'>
        {items.map((item, index) => (
          <div
            key={index}
            className='p-4 sm:p-5 hover:bg-gray-50 transition duration-150'
          >
            <div className='flex items-center justify-between'>
              <div className='flex-1 min-w-0'>
                <h4 className='text-base font-medium text-gray-900 truncate'>
                  {item.title}
                </h4>
                <div className='mt-1 flex items-center'>
                  {item.client && item.client.avatar && (
                    <img
                      src={item.client.avatar}
                      alt={item.client.name}
                      className='h-6 w-6 rounded-full mr-2'
                    />
                  )}
                  <span className='text-sm text-gray-500 truncate'>
                    {item.client ? item.client.name : item.meta}
                  </span>
                </div>
              </div>
              <div className='ml-4 flex-shrink-0'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.status === 'active'
                    ? 'Aktif'
                    : item.status === 'pending'
                      ? 'Menunggu'
                      : item.status === 'completed'
                        ? 'Selesai'
                        : item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>{' '}
      {viewAllLink && (
        <div className='p-4 sm:p-5 border-t border-gray-100'>
          <Link
            href='/freelancer/projects'
            className='inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500'
          >
            Lihat Semua
            <svg
              className='ml-1 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
