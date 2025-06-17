import React from 'react';
import TalentCard from './TalentCard';
import { Link } from '@inertiajs/react';

const TalentsGrid = ({ freelancers }) => {
  const { data: talentsData, meta, links } = freelancers;
  //   {
  //     id: 2,
  //     name: 'Putri Ariani',
  //     title: 'Video Editor & Motion Graphics',
  //     image: 'https://randomuser.me/api/portraits/women/33.jpg',
  //     university: 'Institut Teknologi Bandung',
  //     isVerified: true,
  //     skills: ['Video Editing', 'Motion Graphics', 'After Effects'],
  //     rating: 4.8,
  //     projects: 42,
  //     education: 's1',
  //     experienceLevel: 'expert',
  //     mainSkill: 'video',
  //   },
  //   {
  //     id: 3,
  //     name: 'Budi Santoso',
  //     title: 'Full Stack Developer',
  //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
  //     university: 'Universitas Gadjah Mada',
  //     isVerified: false,
  //     skills: ['React', 'Node.js', 'MongoDB'],
  //     rating: 4.7,
  //     projects: 24,
  //     education: 's1',
  //     experienceLevel: 'intermediate',
  //     mainSkill: 'web',
  //   },
  //   {
  //     id: 4,
  //     name: 'Dina Fitriani',
  //     title: 'Content Writer & Translator',
  //     image: 'https://randomuser.me/api/portraits/women/22.jpg',
  //     university: 'Universitas Padjadjaran',
  //     isVerified: true,
  //     skills: ['Copywriting', 'Translation', 'SEO'],
  //     rating: 4.6,
  //     projects: 31,
  //     education: 's2',
  //     experienceLevel: 'intermediate',
  //     mainSkill: 'writing',
  //   },
  //   {
  //     id: 5,
  //     name: 'Eko Prasetyo',
  //     title: 'Mobile App Developer',
  //     image: 'https://randomuser.me/api/portraits/men/55.jpg',
  //     university: 'Universitas Diponegoro',
  //     isVerified: true,
  //     skills: ['Flutter', 'React Native', 'Firebase'],
  //     rating: 4.9,
  //     projects: 27,
  //     education: 's1',
  //     experienceLevel: 'expert',
  //     mainSkill: 'mobile',
  //   },
  //   {
  //     id: 6,
  //     name: 'Farah Diba',
  //     title: 'Digital Marketing Specialist',
  //     image: 'https://randomuser.me/api/portraits/women/65.jpg',
  //     university: 'Universitas Airlangga',
  //     isVerified: false,
  //     skills: ['Social Media', 'SEM', 'Analytics'],
  //     rating: 4.5,
  //     projects: 19,
  //     education: 's1',
  //     experienceLevel: 'beginner',
  //     mainSkill: 'marketing',
  //   },
  //   {
  //     id: 7,
  //     name: 'Gilang Ramadhan',
  //     title: 'Data Scientist',
  //     image: 'https://randomuser.me/api/portraits/men/67.jpg',
  //     university: 'Institut Teknologi Bandung',
  //     isVerified: true,
  //     skills: ['Python', 'Machine Learning', 'Data Analysis'],
  //     rating: 4.8,
  //     projects: 16,
  //     education: 's2',
  //     experienceLevel: 'intermediate',
  //     mainSkill: 'data',
  //   },
  //   {
  //     id: 8,
  //     name: 'Hana Kusuma',
  //     title: 'Music Producer & Composer',
  //     image: 'https://randomuser.me/api/portraits/women/77.jpg',
  //     university: 'Institut Seni Indonesia Yogyakarta',
  //     isVerified: true,
  //     skills: ['Music Production', 'Composition', 'Sound Design'],
  //     rating: 4.7,
  //     projects: 23,
  //     education: 'd3',
  //     experienceLevel: 'expert',
  //     mainSkill: 'music',
  //   },
  // ];

  // No local filtering or sorting needed as it's done by the backend

  return (
    <section className='py-8 mb-16'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg font-medium text-slate-900 mb-6'>
          {meta?.total || 0} talenta ditemukan
        </h2>

        {/* Talents Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {talentsData.map(freelancer => (
            <TalentCard key={freelancer.id} talent={{
              id: freelancer.id,
              name: freelancer.name,
              title: freelancer.profile?.bio?.split('\n')[0] || "Freelancer",
              image: freelancer.profile_photo_url || "https://randomuser.me/api/portraits/lego/1.jpg",
              university: freelancer.profile?.education || freelancer.profile?.university || "Universitas",
              isVerified: freelancer.profile?.is_verified || false,
              skills: freelancer.skills?.map(skill => skill.name) || [],
              rating: freelancer.avg_rating || 0,
              projects: freelancer.completed_orders_count || 0
            }} />
          ))}
        </div>

        {/* Empty State */}
        {talentsData.length === 0 && (
          <div className='text-center py-12'>
            <h3 className='text-lg font-medium text-slate-800 mb-2'>
              Tidak ada talenta yang ditemukan
            </h3>
            <p className='text-slate-500'>
              Coba mengubah filter atau kata kunci pencarian
            </p>
          </div>
        )}

        {/* Pagination */}
        {meta?.last_page > 1 && (
          <div className='flex justify-center'>
            <div className='flex space-x-2'>
              {links.prev && (
                <Link
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
                </Link>
              )}
              
              {/* Generate page numbers */}
              {Array.from({ length: meta.last_page }, (_, i) => i + 1)
                .filter(i => {
                  const current = meta.current_page;
                  return i === 1 || i === meta.last_page || (i >= current - 1 && i <= current + 1);
                })
                .map((number, i, arr) => (
                  <React.Fragment key={number}>
                    {i > 0 && arr[i-1] !== number - 1 && (
                      <span className="w-10 h-10 flex items-center justify-center">...</span>
                    )}
                    <Link
                      href={`${links.first.split('?')[0]}?page=${number}&${links.first.split('?')[1]?.split('&').filter(param => !param.startsWith('page=')).join('&')}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                        meta.current_page === number
                          ? 'bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {number}
                    </Link>
                  </React.Fragment>
                ))
              }

              {links.next && (
                <Link
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
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TalentsGrid;
