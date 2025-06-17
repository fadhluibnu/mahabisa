import React from 'react';

const ScheduleCard = ({ date, events }) => {
  // Format tanggal
  const formatDate = dateString => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className='p-4 sm:p-6 border-b border-gray-100'>
        <h3 className='text-lg font-semibold text-gray-900'>Jadwal Hari Ini</h3>
        <p className='text-sm text-gray-500 mt-1'>{formatDate(date)}</p>
      </div>

      <div className='divide-y divide-gray-100'>
        {events.map((event, index) => (
          <div key={index} className='p-4 sm:p-5 flex'>
            <div className='flex-shrink-0 w-16 text-center'>
              <p className='text-lg font-semibold text-gray-900'>
                {event.time.hour}
              </p>
              <p className='text-xs text-gray-500'>{event.time.period}</p>
            </div>

            <div
              className={`ml-4 flex-1 p-3 rounded-lg ${
                event.type === 'meeting'
                  ? 'bg-indigo-50 border-l-4 border-indigo-500'
                  : event.type === 'deadline'
                    ? 'bg-red-50 border-l-4 border-red-500'
                    : 'bg-green-50 border-l-4 border-green-500'
              }`}
            >
              <h4 className='font-medium text-gray-900'>{event.title}</h4>
              <p className='text-sm text-gray-600 mt-1'>{event.description}</p>
              <div className='mt-2'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.type === 'meeting'
                      ? 'bg-indigo-100 text-indigo-800'
                      : event.type === 'deadline'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {event.type === 'meeting'
                    ? 'Meeting'
                    : event.type === 'deadline'
                      ? 'Deadline'
                      : 'Tugas'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className='p-6 text-center'>
            <svg
              className='mx-auto h-10 w-10 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              Tidak ada jadwal
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Anda tidak memiliki jadwal untuk hari ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;
