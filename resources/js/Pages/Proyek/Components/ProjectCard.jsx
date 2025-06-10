import React from 'react';
import { Link } from '@inertiajs/react';

const ProjectCard = ({ project }) => {
  // Function to determine status badge styling
  const getStatusBadge = status => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'review':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Function to get human-readable status
  const getStatusText = status => {
    switch (status) {
      case 'open':
        return 'Terbuka';
      case 'in-progress':
        return 'Sedang Dikerjakan';
      case 'review':
        return 'Dalam Review';
      case 'completed':
        return 'Selesai';
      default:
        return 'Unknown';
    }
  };

  // Function to get category label
  const getCategoryLabel = category => {
    switch (category) {
      case 'web':
        return 'Pengembangan Web';
      case 'mobile':
        return 'Aplikasi Mobile';
      case 'design':
        return 'Desain';
      case 'writing':
        return 'Penulisan';
      case 'marketing':
        return 'Marketing';
      case 'video':
        return 'Video & Animasi';
      case 'music':
        return 'Musik & Audio';
      default:
        return 'Lainnya';
    }
  };

  // Format date to be more readable
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  return (
    <div className='bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-100 overflow-hidden flex flex-col h-full'>
      <div className='p-6 flex-grow'>
        {/* Status and Category */}
        <div className='flex justify-between items-center mb-3'>
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadge(project.status)}`}
          >
            {getStatusText(project.status)}
          </span>
          <span className='text-xs text-slate-500'>
            {getCategoryLabel(project.category)}
          </span>
        </div>

        {/* Project Title */}
        <h3 className='text-lg font-bold text-slate-900 mb-2 line-clamp-2'>
          <Link href={`/proyek/${project.id}`} className='hover:text-indigo-600 transition-colors'>
            {project.title}
          </Link>
        </h3>

        {/* Project Description */}
        <p className='text-slate-600 text-sm mb-4 line-clamp-3'>
          {project.description}
        </p>

        {/* Skills Tags */}
        <div className='flex flex-wrap gap-1.5 mb-4'>
          {project.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className='px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg'
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className='px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg'>
              +{project.skills.length - 3}
            </span>
          )}
        </div>

        {/* Budget */}
        <div className='mb-4'>
          <span className='font-bold text-slate-900 text-lg'>
            {project.budget}
          </span>
        </div>

        {/* Divider */}
        <div className='border-t border-slate-200 -mx-6 mb-4'></div>

        {/* Footer */}
        <div className='flex items-center justify-between'>
          {/* Client Info */}
          <div className='flex items-center gap-2'>
            <img
              src={project.client.avatar}
              alt={project.client.name}
              className='w-8 h-8 rounded-full border border-slate-200'
            />
            <span className='text-sm font-medium text-slate-700'>
              {project.client.name}
            </span>
          </div>

          {/* Bids and Date */}
          <div className='flex items-center gap-4 text-xs text-slate-500'>
            <span className='flex items-center gap-1'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
                ></path>
              </svg>
              {project.bids} Penawaran
            </span>
            <span>{formatDate(project.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className='px-6 py-3 bg-slate-50 border-t border-slate-100 mt-auto'>
        <Link 
          href={`/proyek/${project.id}`}
          className='w-full py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors flex items-center justify-center'
        >
          {project.status === 'open' ? 'Ajukan Penawaran' : 'Lihat Detail'}
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
