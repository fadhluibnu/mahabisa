import React from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import StatCard from './Components/StatCard';
import ProjectCard from './Components/ProjectCard';
import ScheduleCard from './Components/ScheduleCard';
import OverviewChart from './Components/OverviewChart';
import SkillsCard from './Components/SkillsCard';
import EarningsCard from './Components/EarningsCard';
import MessagesCard from './Components/MessagesCard';
import ReviewsCard from './Components/ReviewsCard';

const Dashboard = () => {
  // Dummy data for stats
  const stats = [
    {
      title: 'Total Penghasilan',
      value: 'Rp5.800.000',
      percentage: '12.5',
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Proyek Aktif',
      value: '3',
      percentage: '8.2',
      trend: 'up',
      color: 'pink',
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
      title: 'Penawaran Baru',
      value: '5',
      percentage: '21.8',
      trend: 'up',
      color: 'green',
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Rating Keseluruhan',
      value: '4.8',
      color: 'orange',
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

  // Dummy data for projects
  const activeProjects = [
    {
      title: 'Website E-Commerce Toko Batik',
      client: {
        name: 'PT Batik Nusantara',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      status: 'active',
    },
    {
      title: 'Landing Page Aplikasi Kesehatan',
      client: {
        name: 'HealthTech Indonesia',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      status: 'active',
    },
    {
      title: 'Redesign Website Universitas',
      client: {
        name: 'Universitas Teknologi',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      status: 'pending',
    },
  ];

  // Dummy data for schedule
  const scheduleEvents = [
    {
      time: { hour: '09:00', period: 'WIB' },
      title: 'Meeting dengan Tim HealthTech',
      description: 'Diskusi revisi landing page dan timeline',
      type: 'meeting',
    },
    {
      time: { hour: '13:30', period: 'WIB' },
      title: 'Deadline Wireframe E-Commerce',
      description: 'Submit wireframe untuk halaman produk dan checkout',
      type: 'deadline',
    },
    {
      time: { hour: '16:00', period: 'WIB' },
      title: 'Update Progress Website Universitas',
      description: 'Persiapkan laporan progress mingguan',
      type: 'task',
    },
  ];

  // Dummy data for earnings chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    earnings: [1200000, 1500000, 1000000, 1800000, 1600000, 2200000],
    projects: [2, 3, 2, 4, 3, 5],
  };

  // Dummy data for skills
  const skills = [
    { name: 'Web Development', level: 'Expert' },
    { name: 'UI/UX Design', level: 'Advanced' },
    { name: 'React', level: 'Expert' },
    { name: 'Laravel', level: 'Intermediate' },
    { name: 'TailwindCSS', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
  ];

  // Dummy data for earnings
  const earnings = [
    {
      project: 'Landing Page Startup',
      amount: 2500000,
      date: '2025-05-25',
      status: 'completed',
    },
    {
      project: 'Website E-Commerce',
      amount: 1800000,
      date: '2025-05-15',
      status: 'completed',
    },
    {
      project: 'Aplikasi Mobile Banking',
      amount: 3500000,
      date: '2025-05-05',
      status: 'completed',
    },
  ];

  // Dummy data for messages
  const messages = [
    {
      id: 1,
      sender: {
        name: 'Budi Santoso',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      subject: 'Revisi Landing Page',
      preview: 'Halo, saya ingin mendiskusikan beberapa revisi untuk landing page yang sudah...',
      date: '2025-05-30T10:30:00',
      read: false,
      project: 'Landing Page Aplikasi Kesehatan',
    },
    {
      id: 2,
      sender: {
        name: 'Siti Rahayu',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      subject: 'Konfirmasi Pembayaran',
      preview: 'Pembayaran untuk project redesign website universitas sudah kami proses...',
      date: '2025-05-29T14:15:00',
      read: true,
      project: 'Redesign Website Universitas',
    },
    {
      id: 3,
      sender: {
        name: 'Ahmad Rizki',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      subject: 'Tawaran Project Baru',
      preview: 'Saya memiliki project baru untuk pengembangan sistem manajemen inventaris...',
      date: '2025-05-28T09:45:00',
      read: false,
    },
  ];

  // Dummy data for reviews
  const ratingData = {
    average: 4.8,
    total: 26,
    distribution: {
      5: 20,
      4: 5,
      3: 1,
      2: 0,
      1: 0,
    },
  };

  const reviews = [
    {
      reviewer: {
        name: 'Dewi Pratiwi',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 5,
      comment: 'Sangat profesional dan responsif. Hasil kerjanya sangat memuaskan dan sesuai dengan kebutuhan kami.',
      date: '2025-05-20',
      project: 'Website Company Profile',
    },
    {
      reviewer: {
        name: 'Joko Widodo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 4,
      comment: 'Kerjanya cepat dan hasilnya bagus. Hanya perlu sedikit revisi untuk mencapai hasil yang sempurna.',
      date: '2025-05-15',
      project: 'Aplikasi Mobile Banking',
    },
  ];

  return (
    <FreelancerLayout
      title="Dashboard Freelancer"
      subtitle="Selamat datang kembali, kelola proyek dan pantau pendapatan Anda"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
            trend={stat.trend}
            color={stat.color}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Project & Schedule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="lg:col-span-2">
          <ProjectCard
            title="Proyek Aktif"
            items={activeProjects}
            viewAllLink="/freelancer/projects"
          />
        </div>
        <div className="lg:col-span-1">
          <ScheduleCard date={new Date().toISOString()} events={scheduleEvents} />
        </div>
      </div>

      {/* Earnings & Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="lg:col-span-2">
          <OverviewChart data={chartData} period="month" />
        </div>
        <div className="lg:col-span-1">
          <EarningsCard earnings={earnings} />
        </div>
      </div>

      {/* Skills & Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <SkillsCard skills={skills} />
        <ReviewsCard ratingData={ratingData} reviews={reviews} />
      </div>

      {/* Messages Section */}
      <div className="mb-6 md:mb-8">
        <MessagesCard messages={messages} />
      </div>
    </FreelancerLayout>
  );
};

export default Dashboard;
