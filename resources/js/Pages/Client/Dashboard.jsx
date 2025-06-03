import React from 'react';
import ClientLayout from './Components/ClientLayout';
import StatCard from './Components/StatCard';
import ProjectCard from './Components/ProjectCard';
import ServiceCard from './Components/ServiceCard';
import ActivityCard from './Components/ActivityCard';

const Dashboard = () => {  // Dummy data for stats
  const stats = [
    {
      title: 'Total Proyek',
      value: '5',
      percentage: '20',
      trend: 'up',
      color: 'indigo',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {      title: 'Proyek Aktif',
      value: '2',
      percentage: '10',
      trend: 'up',
      color: 'purple',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Total Pengeluaran',
      value: 'Rp7.500.000',
      percentage: '15',
      trend: 'up',
      color: 'sky',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Ulasan Diberikan',
      value: '4',
      color: 'amber',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
  ];

  // Dummy data for active projects
  const activeProjects = [
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
  ];

  // Dummy data for recommended services
  const recommendedServices = [
    {
      id: 1,
      title: 'Website Development & Design',
      freelancer: {
        name: 'Alex Suryanto',
        image: 'https://ui-avatars.com/api/?name=Alex+Suryanto&background=8b5cf6&color=fff',
      },
      rating: 4.9,
      price: 4500000,
      image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Web+Development',
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'Logo & Brand Identity Design',
      freelancer: {
        name: 'Diana Putri',
        image: 'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
      },
      rating: 4.8,
      price: 1500000,
      image: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Graphic+Design',
      category: 'Graphic Design',
    },
    {
      id: 3,
      title: 'Mobile App Development',
      freelancer: {
        name: 'Budi Santoso',
        image: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=f59e0b&color=fff',
      },
      rating: 4.7,
      price: 6000000,
      image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Mobile+App',
      category: 'Mobile App',
    },
  ];

  // Dummy data for recent activities
  const recentActivities = [
    {
      type: 'project',
      title: 'Proyek Baru Dibuat',
      description: 'Anda telah membuat proyek baru "Pengembangan Website E-commerce"',
      datetime: '2025-06-01T14:30:00',
    },
    {
      type: 'message',
      title: 'Pesan Baru',
      description: 'Alex Suryanto mengirim pesan tentang proyek "Pengembangan Website E-commerce"',
      datetime: '2025-06-01T15:45:00',
    },
    {
      type: 'payment',
      title: 'Pembayaran Berhasil',
      description: 'Pembayaran untuk "Desain Logo Perusahaan" telah dikonfirmasi',
      datetime: '2025-05-30T10:15:00',
    },
    {
      type: 'review',
      title: 'Ulasan Diberikan',
      description: 'Anda telah memberikan ulasan untuk "Website Portofolio Pribadi"',
      datetime: '2025-05-28T16:20:00',
    },
    {
      type: 'project',
      title: 'Proyek Selesai',
      description: 'Proyek "Website Portofolio Pribadi" telah selesai',
      datetime: '2025-05-28T14:00:00',
    },
  ];
  return (
    <ClientLayout
      title="Dashboard"
      subtitle="Lihat dan kelola semua aktivitas Anda"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects and Recommended Services */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Projects */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Proyek Aktif</h2>
            </div>
            <div className="p-6">
              {activeProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeProjects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
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
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada proyek aktif</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Mulai membuat proyek baru untuk menemukan freelancer yang tepat.
                  </p>                  <div className="mt-6">
                    <a
                      href="/client/projects/create"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
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
            </div>
          </div>
          
          {/* Recommended Services */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Layanan yang Direkomendasikan</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedServices.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Activities */}
        <div className="lg:col-span-1">
          <ActivityCard activities={recentActivities} />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Dashboard;
