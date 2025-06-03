import React from 'react';
import { Link } from '@inertiajs/react';

const ProjectCard = ({ id, title, freelancer, deadline, budget, status, image }) => {
  // Function to render status badge
  const renderStatusBadge = () => {
    switch (status) {
      case 'ongoing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Sedang Berjalan
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Selesai
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Menunggu
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Dibatalkan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={image}
            alt={freelancer}
            className="h-10 w-10 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{freelancer}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div>
            <span className="font-medium">Deadline:</span> {deadline}
          </div>
          <div>
            <span className="font-medium">Budget:</span> {budget}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            {renderStatusBadge()}
          </div>
          <Link
            href={`/client/projects/${id}`}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Detail
            <svg
              className="ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
