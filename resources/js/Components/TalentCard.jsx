import React from 'react';
import { Link } from '@inertiajs/react';

const TalentCard = ({
  id,
  image,
  name,
  profession,
  university,
  rating,
  projectCount,
  responseTime,
  skills,
}) => {
  return (
    <div className='flex flex-col justify-between bg-white rounded-xl shadow-md p-6 border border-slate-100'>
      <div>
        <div className='flex justify-between items-start mb-4'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-full overflow-hidden'>
              <img
                src={image}
                alt={name}
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h3 className='font-bold text-lg'>{name}</h3>
              <p className='text-[#7C3AED]'>{profession}</p>
            </div>
          </div>
          <div className='p-2 bg-purple-100 rounded-full'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.5 10L9.16667 11.6667L12.5 8.33333M16.6667 10C16.6667 13.6819 13.6819 16.6667 10 16.6667C6.31814 16.6667 3.33334 13.6819 3.33334 10C3.33334 6.31814 6.31814 3.33334 10 3.33334C13.6819 3.33334 16.6667 6.31814 16.6667 10Z'
                stroke='#7C3AED'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>

        <div className='flex items-center gap-2 text-sm text-slate-600 mb-4'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0653 12.8512 14.2174 12.5 13.3333 12.5H6.66668C5.78262 12.5 4.93478 12.8512 4.30965 13.4763C3.68453 14.1014 3.33334 14.9493 3.33334 15.8333V17.5M13.3333 5.83333C13.3333 7.67428 11.841 9.16667 10 9.16667C8.15906 9.16667 6.66668 7.67428 6.66668 5.83333C6.66668 3.99238 8.15906 2.5 10 2.5C11.841 2.5 13.3333 3.99238 13.3333 5.83333Z'
              stroke='#64748B'
              strokeWidth='1.66667'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>{university}</span>
        </div>

        <div className='grid grid-cols-3 gap-2 mb-6'>
          <div className='text-center p-2'>
            <p className='text-slate-500 text-sm'>Rating</p>
            <p className='font-bold text-xl'>{rating}</p>
          </div>
          <div className='text-center p-2 border-x border-slate-200'>
            <p className='text-slate-500 text-sm'>Proyek</p>
            <p className='font-bold text-xl'>{projectCount}</p>
          </div>
          <div className='text-center p-2'>
            <p className='text-slate-500 text-sm'>Waktu Respons</p>
            <p className='font-bold text-xl'>{responseTime}</p>
          </div>
        </div>

        <div className='flex flex-wrap gap-2 mb-6'>
          {skills.map((skill, index) => (
            <span
              key={index}
              className='px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/talenta/${id || 1}`}
        className='block w-full py-2.5 text-center border border-[#7C3AED] text-[#7C3AED] rounded-lg font-medium hover:bg-[#7C3AED] hover:text-white transition-colors duration-200'
      >
        Lihat Profil
      </Link>
    </div>
  );
};

export default TalentCard;
