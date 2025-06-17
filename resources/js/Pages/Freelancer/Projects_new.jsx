import React from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import ProjectCardSingle from './Components/ProjectCardSingle';

const Projects = () => {
  // Dummy data for active projects
  const activeProjects = [
    {
      id: 1,
      title: 'Redesain Website E-commerce',
      client: 'PT Maju Bersama',
      deadline: '15 Jun 2023',
      budget: 'Rp4.500.000',
      progress: 65,
      image:
        'https://ui-avatars.com/api/?name=PT+Maju+Bersama&background=6366f1&color=fff',
    },
    {
      id: 2,
      title: 'Pengembangan Aplikasi Mobile',
      client: 'StartUp Inovasi',
      deadline: '28 Jun 2023',
      budget: 'Rp8.000.000',
      progress: 40,
      image:
        'https://ui-avatars.com/api/?name=StartUp+Inovasi&background=ec4899&color=fff',
    },
    {
      id: 3,
      title: 'Integrasi Payment Gateway',
      client: 'Toko Online Sejahtera',
      deadline: '10 Jul 2023',
      budget: 'Rp3.200.000',
      progress: 25,
      image:
        'https://ui-avatars.com/api/?name=Toko+Online+Sejahtera&background=8b5cf6&color=fff',
    },
  ];

  // Dummy data for completed projects
  const completedProjects = [
    {
      id: 4,
      title: 'Landing Page untuk Peluncuran Produk',
      client: 'CV Digital Kreatif',
      deadline: '5 Jun 2023',
      budget: 'Rp2.800.000',
      progress: 100,
      image:
        'https://ui-avatars.com/api/?name=CV+Digital+Kreatif&background=10b981&color=fff',
    },
    {
      id: 5,
      title: 'Pembuatan Dashboard Admin',
      client: 'PT Solusi Teknologi',
      deadline: '1 Jun 2023',
      budget: 'Rp5.500.000',
      progress: 100,
      image:
        'https://ui-avatars.com/api/?name=PT+Solusi+Teknologi&background=f59e0b&color=fff',
    },
  ];

  return (
    <FreelancerLayout
      title='Proyek'
      subtitle='Kelola semua proyek aktif dan riwayat proyek Anda'
    >
      <div className='mb-8'>
        <h2 className='text-xl font-bold text-gray-800 mb-6'>Proyek Aktif</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {activeProjects.map(project => (
            <ProjectCardSingle key={project.id} {...project} />
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl font-bold text-gray-800 mb-6'>Proyek Selesai</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {completedProjects.map(project => (
            <ProjectCardSingle key={project.id} {...project} />
          ))}
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Projects;
