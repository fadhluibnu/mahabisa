import React from 'react';
import ClientLayout from './Components/ClientLayout';
import StatCard from './Components/StatCard';
import ProjectCard from './Components/ProjectCard';
import ServiceCard from './Components/ServiceCard';
import ActivityCard from './Components/ActivityCard';
import { usePage } from '@inertiajs/react';
import { formatCurrency } from '../../utils/formatters';

const Dashboard = () => {
  // Get data from props with usePage() hook
  const { stats: propStats, activities: propActivities, activeProjects: propProjects, user } = usePage().props;
  
  // Format stats data for display
  const stats = [
    {
      title: 'Total Proyek',
      value: propStats?.active_projects + propStats?.completed_orders || 0,
      percentage: null,
      trend: 'neutral',
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
    {      
      title: 'Proyek Aktif',
      value: propStats?.active_projects || 0,
      percentage: null,
      trend: 'neutral',
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
      value: formatCurrency(propStats?.total_spent || 0),
      percentage: null,
      trend: 'neutral',
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
      title: 'Pesanan Selesai',
      value: propStats?.completed_orders || 0,
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

  // Format active projects data from props
  const activeProjects = propProjects?.map(project => {
    // Find the accepted proposal (if any)
    const acceptedProposal = project.proposals?.find(p => p.status === 'accepted');
    
    return {
      id: project.id,
      title: project.title,
      freelancer: acceptedProposal?.user?.name || 'Belum ada freelancer',
      deadline: new Date(project.deadline).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      budget: `${formatCurrency(project.budget_min)} - ${formatCurrency(project.budget_max)}`,
      status: project.status === 'open' ? 'pending' : project.status,
      image: acceptedProposal?.user?.profile_photo_url || 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(acceptedProposal?.user?.name || 'Not Assigned')}&background=8b5cf6&color=fff`,
      proposals_count: project.proposals_count || 0
    };
  }) || [];

  // We need to fetch recommended services from the backend
  // For now, we'll use a placeholder until we update the controller
  const recommendedServices = [];

  // Format activities data from props
  const recentActivities = propActivities?.map(activity => {
    // Map activity type to icons and colors
    const activityTypeMap = {
      'project_created': { type: 'project', title: 'Proyek Baru Dibuat' },
      'project_status_updated': { type: 'project', title: 'Status Proyek Diperbarui' },
      'proposal_accepted': { type: 'project', title: 'Proposal Diterima' },
      'order_created': { type: 'payment', title: 'Pesanan Dibuat' },
      'payment_processed': { type: 'payment', title: 'Pembayaran Berhasil' },
      'review_submitted': { type: 'review', title: 'Ulasan Diberikan' },
      'service_ordered': { type: 'service', title: 'Jasa Dipesan' },
      'message_sent': { type: 'message', title: 'Pesan Dikirim' },
      'message_received': { type: 'message', title: 'Pesan Baru' },
    };
    
    const activityInfo = activityTypeMap[activity.activity_type] || { 
      type: 'other', 
      title: activity.activity_type?.replace(/_/g, ' ')?.charAt(0).toUpperCase() + activity.activity_type?.replace(/_/g, ' ')?.slice(1) || 'Aktivitas' 
    };
    
    return {
      type: activityInfo.type,
      title: activityInfo.title,
      description: activity.description,
      datetime: activity.created_at,
    };
  }) || [];
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
