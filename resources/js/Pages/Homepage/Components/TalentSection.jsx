import React from 'react';
import TalentCard from '@/Components/TalentCard';

const TalentSection = () => {
  // Talent data
  const talents = [
    {
      image: 'https://randomuser.me/api/portraits/women/56.jpg',
      name: 'Anisa Widya',
      profession: 'UI/UX Designer',
      university: 'Universitas Negeri Semarang',
      rating: '4.8',
      projectCount: '46',
      responseTime: '1 jam',
      skills: ['UI Design', 'UX Research', 'Wireframing', 'Figma'],
    },
    {
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      name: 'Budi Santoso',
      profession: 'Full Stack Developer',
      university: 'Universitas Indonesia',
      rating: '4.9',
      projectCount: '38',
      responseTime: '2 jam',
      skills: ['React', 'Node.js', 'Firebase', 'MongoDB'],
    },
    {
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      name: 'Citra Puspita',
      profession: 'Video Editor',
      university: 'Institut Teknologi Bandung',
      rating: '4.7',
      projectCount: '53',
      responseTime: '3 jam',
      skills: ['Adobe Premiere', 'After Effects', 'Color Grading'],
    },
  ];

  return (
    <section className='py-8'>
      <div className='container mx-auto max-w-7xl'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h2 className='text-4xl font-bold text-slate-900'>
              Talenta Unggulan
            </h2>
            <p className='text-lg text-slate-600 mt-2'>
              Mahasiswa berbakat dengan keahlian yang dibutuhkan pasar
            </p>
          </div>
          <a
            href='#'
            className='flex items-center hover:underline gap-1 text-[#7C3AED] font-medium'
          >
            Lihat Semua
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='mt-0.5'
            >
              <path
                d='M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333'
                stroke='#7C3AED'
                strokeWidth='1.66667'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </a>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
          {talents.map((talent, index) => (
            <TalentCard
              key={index}
              image={talent.image}
              name={talent.name}
              profession={talent.profession}
              university={talent.university}
              rating={talent.rating}
              projectCount={talent.projectCount}
              responseTime={talent.responseTime}
              skills={talent.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TalentSection;
