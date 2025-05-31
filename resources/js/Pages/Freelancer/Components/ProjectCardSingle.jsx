import React from 'react';
import { Link } from '@inertiajs/react';

const ProjectCardSingle = (props) => {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Selesai</span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Sedang Berjalan</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Tertunda</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={props.image}
            alt={props.client}
            className="h-10 w-10 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{props.title}</h3>
            <p className="text-sm text-gray-500">{props.client}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div>
            <span className="font-medium">Deadline:</span> {props.deadline}
          </div>
          <div>
            <span className="font-medium">Budget:</span> {props.budget}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Progress</span>
            <span className="font-medium text-indigo-600">{props.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                props.progress === 100 
                  ? 'bg-green-600' 
                  : props.progress >= 60 
                    ? 'bg-indigo-600' 
                    : props.progress >= 30 
                      ? 'bg-blue-600' 
                      : 'bg-yellow-600'
              }`}
              style={{ width: `${props.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {props.status && getStatusBadge(props.status)}
          
          <div className="flex space-x-2">
            <Link 
              href={`/freelancer/projects/${props.id}`}
              className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Detail
            </Link>
            {(props.status === 'in-progress' || props.status === 'pending') && (
              <button 
                className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSingle;
