import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';
import ProjectCardSingle from './Components/ProjectCardSingle';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Dummy data for active projects
  const activeProjects = [
    {
      id: 1,
      title: 'Redesain Website E-commerce',
      client: 'PT Maju Bersama',
      deadline: '15 Jun 2023',
      budget: 'Rp4.500.000',
      progress: 65,
      status: 'in-progress',
      image: 'https://ui-avatars.com/api/?name=PT+Maju+Bersama&background=6366f1&color=fff',
    },
    {
      id: 2,
      title: 'Pengembangan Aplikasi Mobile',
      client: 'StartUp Inovasi',
      deadline: '28 Jun 2023',
      budget: 'Rp8.000.000',
      progress: 40,
      status: 'in-progress',
      image: 'https://ui-avatars.com/api/?name=StartUp+Inovasi&background=ec4899&color=fff',
    },
    {
      id: 3,
      title: 'Integrasi Payment Gateway',
      client: 'Toko Online Sejahtera',
      deadline: '10 Jul 2023',
      budget: 'Rp3.200.000',
      progress: 25,
      status: 'pending',
      image: 'https://ui-avatars.com/api/?name=Toko+Online+Sejahtera&background=8b5cf6&color=fff',
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
      status: 'completed',
      image: 'https://ui-avatars.com/api/?name=CV+Digital+Kreatif&background=10b981&color=fff',
    },
    {
      id: 5,
      title: 'Pembuatan Dashboard Admin',
      client: 'PT Solusi Teknologi',
      deadline: '1 Jun 2023',
      budget: 'Rp5.500.000',
      progress: 100,
      status: 'completed',
      image: 'https://ui-avatars.com/api/?name=PT+Solusi+Teknologi&background=f59e0b&color=fff',
    },
  ];

  // Combine all projects for filtering
  const allProjects = [...activeProjects, ...completedProjects];

  // Filter projects based on search query and status
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && project.status === 'in-progress') ||
      (filterStatus === 'pending' && project.status === 'pending') ||
      (filterStatus === 'completed' && project.status === 'completed');
    
    return matchesSearch && matchesStatus;
  });

  // Split filtered projects into active and completed
  const filteredActiveProjects = filteredProjects.filter(project => project.status !== 'completed');
  const filteredCompletedProjects = filteredProjects.filter(project => project.status === 'completed');

  return (
    <FreelancerLayout
      title="Proyek"
      subtitle="Kelola semua proyek aktif dan riwayat proyek Anda"
    >
      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Cari proyek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="active">Sedang Berjalan</option>
              <option value="pending">Tertunda</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
        </div>
        <Link
          href="/freelancer/projects/create"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Proyek Baru
        </Link>
      </div>

      {/* Active Projects */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Proyek Aktif</h2>
        {filteredActiveProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredActiveProjects.map((project) => (
              <div key={project.id} className="relative group">
                <ProjectCardSingle {...project} />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-70 rounded-lg">
                  <Link 
                    href={`/freelancer/projects/${project.id}`}
                    className="bg-white text-indigo-600 hover:bg-indigo-100 font-medium py-2 px-4 rounded-md shadow transition-all transform scale-95 group-hover:scale-100"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada proyek aktif</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || filterStatus !== 'all' 
                ? 'Tidak ada proyek yang sesuai dengan filter Anda.' 
                : 'Anda belum memiliki proyek aktif.'}
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <div className="mt-6">
                <Link
                  href="/freelancer/projects/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Buat Proyek Baru
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Completed Projects */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Proyek Selesai</h2>
        {filteredCompletedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCompletedProjects.map((project) => (
              <div key={project.id} className="relative group">
                <ProjectCardSingle {...project} />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-70 rounded-lg">
                  <Link 
                    href={`/freelancer/projects/${project.id}`}
                    className="bg-white text-indigo-600 hover:bg-indigo-100 font-medium py-2 px-4 rounded-md shadow transition-all transform scale-95 group-hover:scale-100"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada proyek selesai</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || filterStatus !== 'all' 
                ? 'Tidak ada proyek yang sesuai dengan filter Anda.' 
                : 'Anda belum memiliki proyek yang selesai.'}
            </p>
          </div>
        )}
      </div>
    </FreelancerLayout>
  );
};

export default Projects;