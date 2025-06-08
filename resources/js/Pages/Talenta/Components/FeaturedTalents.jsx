import React from 'react';
import { Link } from '@inertiajs/react';

const FeaturedTalents = () => {
  // Data for featured talents
  const featuredTalents = [
    {
      id: 1,
      name: 'Ahmad Rizky',
      title: 'UI/UX Designer & Web Developer',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      university: 'Universitas Indonesia',
      isVerified: true,
      isOnline: true,
      stats: {
        rating: 4.9,
        projects: 38,
        clients: 24,
      },
      skills: ['UI/UX', 'React', 'Figma', 'Tailwind CSS'],
      description:
        'Mahasiswa Ilmu Komputer dengan pengalaman 3 tahun di UI/UX design dan web development. Spesialis dalam membuat desain yang user-centered dan implementasi dengan teknologi modern.',
    },
    {
      id: 2,
      name: 'Putri Ariani',
      title: 'Video Editor & Motion Graphics Artist',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      university: 'Institut Teknologi Bandung',
      isVerified: true,
      isOnline: false,
      stats: {
        rating: 4.8,
        projects: 42,
        clients: 29,
      },
      skills: [
        'Adobe Premiere',
        'After Effects',
        'DaVinci Resolve',
        'Motion Graphics',
      ],
      description:
        'Mahasiswi Desain Komunikasi Visual dengan fokus pada editing video dan motion graphics. Telah mengerjakan berbagai proyek untuk brand nasional dan startup.',
    },
  ];

  return (
    <section className='py-12 md:py-16 bg-white'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-0'>
            Talenta Terbaik
          </h2>
          <Link
            href='/talenta'
            className='text-violet-600 font-medium flex items-center hover:text-violet-800 transition-all'
          >
            Lihat semua talenta
            <svg
              className='w-4 h-4 ml-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {featuredTalents.map(talent => (
            <div
              key={talent.id}
              className='bg-white rounded-xl shadow-md hover:shadow-lg border border-slate-100 overflow-hidden transition-all'
            >
              <div className='flex flex-col md:flex-row'>
                {/* Talent Image Column */}
                <div className='w-full md:w-1/3 relative'>
                  <div className='p-4 md:p-6 h-full flex flex-col justify-center'>
                    <div className='relative mx-auto md:mx-0'>
                      <img
                        src={talent.image}
                        alt={talent.name}
                        className='w-28 h-28 rounded-full object-cover mx-auto md:mx-0 border-4 border-white shadow-md'
                      />

                      {talent.isVerified && (
                        <span className='absolute bottom-0 right-0 md:right-0 bg-violet-600 text-white p-1 rounded-full'>
                          <svg
                            className='w-3 h-3'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
                          </svg>
                        </span>
                      )}
                    </div>

                    <div
                      className={`flex items-center justify-center md:justify-start mt-3 ${
                        talent.isOnline ? 'text-green-500' : 'text-slate-400'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          talent.isOnline ? 'bg-green-500' : 'bg-slate-400'
                        } mr-1.5`}
                      ></span>
                      <span className='text-xs'>
                        {talent.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Talent Info Column */}
                <div className='w-full md:w-2/3 p-4 md:p-6'>
                  <div className='mb-3'>
                    <h3 className='text-xl font-bold text-slate-900'>
                      {talent.name}
                    </h3>
                    <p className='text-violet-600 font-medium'>
                      {talent.title}
                    </p>
                    <p className='text-sm text-slate-500'>
                      {talent.university}
                    </p>
                  </div>

                  <div className='flex flex-wrap gap-2 mb-4 md:mb-5'>
                    {talent.skills.map((skill, index) => (
                      <span
                        key={index}
                        className='text-xs bg-violet-50 text-violet-700 px-2 py-1 rounded-md'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className='text-sm text-slate-600 mb-4 md:mb-6 line-clamp-2'>
                    {talent.description}
                  </p>

                  <div className='flex items-center justify-between mb-4 md:mb-5'>
                    <div className='flex items-center gap-4 md:gap-6'>
                      <div className='text-center'>
                        <p className='text-lg font-bold text-slate-900'>
                          {talent.stats.rating}
                        </p>
                        <p className='text-xs text-slate-500'>Rating</p>
                      </div>
                      <div className='text-center'>
                        <p className='text-lg font-bold text-slate-900'>
                          {talent.stats.projects}
                        </p>
                        <p className='text-xs text-slate-500'>Proyek</p>
                      </div>
                      <div className='text-center'>
                        <p className='text-lg font-bold text-slate-900'>
                          {talent.stats.clients}
                        </p>
                        <p className='text-xs text-slate-500'>Klien</p>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3'>
                    <Link
                      href={`/talenta/${talent.id}`}
                      className='py-2 px-4 bg-gradient-to-r from-violet-600 to-violet-800 text-white text-center rounded-lg font-medium hover:shadow-md transition-all'
                    >
                      Lihat Profil
                    </Link>
                    <Link
                      href={`/pesan/${talent.id}`}
                      className='py-2 px-4 border border-violet-600 text-violet-600 text-center rounded-lg font-medium hover:bg-violet-50 transition-all'
                    >
                      Kirim Pesan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTalents;
