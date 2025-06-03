import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';
import ProjectCard from './Components/ProjectCard';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Dummy data for projects
  const projects = [
    {
      id: 1,
      title: 'Pengembangan Website E-commerce',
      freelancer: 'Alex Suryanto',
      deadline: '15 Jun 2025',
      budget: 'Rp4.500.000',
      status: 'ongoing',
      image: 'https://ui-avatars.com/api/?name=Alex+Suryanto&background=8b5cf6&color=fff',
    },
    {
      id: 2,
      title: 'Desain Logo Perusahaan',
      freelancer: 'Diana Putri',
      deadline: '20 Jun 2025',
      budget: 'Rp1.500.000',
      status: 'pending',
      image: 'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
    },
    {
      id: 3,
      title: 'Website Portofolio Pribadi',
      freelancer: 'Budi Santoso',
      deadline: '10 Mei 2025',
      budget: 'Rp3.000.000',
      status: 'completed',
      image: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=f59e0b&color=fff',
    },
    {
      id: 4,
      title: 'Pengembangan Aplikasi Mobile',
      freelancer: 'Rini Wulandari',
      deadline: '5 Mei 2025',
      budget: 'Rp6.000.000',
      status: 'completed',
      image: 'https://ui-avatars.com/api/?name=Rini+Wulandari&background=10b981&color=fff',
    },
    {
      id: 5,
      title: 'Desain UI/UX Aplikasi',
      freelancer: 'Arya Wijaya',
      deadline: '30 Apr 2025',
      budget: 'Rp2.500.000',
      status: 'cancelled',
      image: 'https://ui-avatars.com/api/?name=Arya+Wijaya&background=ef4444&color=fff',
    }
  ];

  // Filter projects based on search query and status filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.freelancer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      filterStatus === project.status;
    
    return matchesSearch && matchesStatus;
  });

  // Split filtered projects into active and completed/cancelled
  const activeProjects = filteredProjects.filter(project => ['ongoing', 'pending'].includes(project.status));
  const completedProjects = filteredProjects.filter(project => ['completed', 'cancelled'].includes(project.status));

  return (
    <ClientLayout
      title="Proyek Saya"
      subtitle="Kelola semua proyek Anda"
    >
      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari proyek..."
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-2.5">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <select
              className="border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Semua status</option>
              <option value="ongoing">Sedang Berjalan</option>
              <option value="pending">Menunggu</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>        </div>
        <a
          href="/client/projects/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Buat Proyek Baru
        </a>
      </div>

      {/* Active Projects */}
      {activeProjects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Proyek Aktif</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Proyek Selesai & Dibatalkan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      )}

      {/* No projects found */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada proyek ditemukan</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Coba kata kunci pencarian lain atau reset filter' : 'Mulai membuat proyek baru untuk menemukan freelancer yang tepat'}
          </p>          <div className="mt-6">
            <a
              href="/client/projects/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Buat Proyek Baru
            </a>
          </div>
        </div>
      )}
    </ClientLayout>
  );
};

export default Projects;
