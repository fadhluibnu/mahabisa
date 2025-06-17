import React from 'react';
import { Head } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';
import StatCard from './Components/StatCard';
import ProjectCard from './Components/ProjectCard';
import ScheduleCard from './Components/ScheduleCard';
import OverviewChart from './Components/OverviewChart';
import SkillsCard from './Components/SkillsCard';
import EarningsCard from './Components/EarningsCard';
import MessagesCard from './Components/MessagesCard';
import ReviewsCard from './Components/ReviewsCard';
import { formatCurrency, formatDate } from '../../utils/formatters';

const Dashboard = ({
  user,
  stats: statsData,
  recentOrders,
  activities,
  skills: skillsData,
  chartData,
  scheduleEvents,
  earnings: earningsData,
  messages: messagesData,
  reviews: reviewsData,
  ratingData,
  unreadMessagesCount,
}) => {
  // Prepare the stats data with proper formatting
  const stats = [
    {
      title: 'Total Penghasilan',
      value: formatCurrency(statsData?.total_earnings || 0),
      percentage: '12.5',
      trend: 'up',
      color: 'purple',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
    },
    {
      title: 'Proyek Aktif',
      value: String(statsData?.active_orders || 0),
      percentage: '8.2',
      trend: 'up',
      color: 'pink',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
          />
        </svg>
      ),
    },
    {
      title: 'Penawaran Dibuat',
      value: String(statsData?.proposals_count || 0),
      percentage: '21.8',
      trend: 'up',
      color: 'green',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
    },
    {
      title: 'Rating Keseluruhan',
      value: (statsData?.average_rating || 0).toFixed(1),
      color: 'orange',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      ),
    },
  ];

  // Format active projects from orders data
  const activeProjects =
    recentOrders?.map(order => ({
      title: order.service?.title || order.project?.title || 'Unnamed Project',
      client: {
        name: order.client?.name || 'Unknown Client',
        avatar:
          order.client?.profile_photo_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(order.client?.name || 'Unknown')}`,
      },
      status: order.status,
    })) || [];

  return (
    <FreelancerLayout
      title='Dashboard Freelancer'
      subtitle='Selamat datang kembali, kelola proyek dan pantau pendapatan Anda'
    >
      <Head title='Dashboard Freelancer' />
      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8'>
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
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8'>
        <div className='lg:col-span-2'>
          <ProjectCard
            title='Proyek Aktif'
            items={activeProjects}
            viewAllLink='/freelancer/projects'
          />
        </div>
        <div className='lg:col-span-1'>
          <ScheduleCard
            date={new Date().toISOString()}
            events={scheduleEvents || []}
          />
        </div>
      </div>

      {/* Earnings & Overview Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8'>
        <div className='lg:col-span-2'>
          <OverviewChart
            data={
              chartData || {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                earnings: [0, 0, 0, 0, 0, 0],
                projects: [0, 0, 0, 0, 0, 0],
              }
            }
            period='month'
          />
        </div>
        <div className='lg:col-span-1'>
          <EarningsCard earnings={earningsData || []} />
        </div>
      </div>

      {/* Skills & Reviews Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8'>
        <SkillsCard
          skills={
            skillsData?.map(skill => ({
              name: skill.name,
              level: skill.pivot?.proficiency_level || 'Intermediate',
            })) || []
          }
        />
        <ReviewsCard
          ratingData={
            ratingData || {
              average: 0,
              total: 0,
              distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
            }
          }
          reviews={reviewsData || []}
        />
      </div>

      {/* Messages Section */}
      <div className='mb-6 md:mb-8'>
        <MessagesCard messages={messagesData || []} />
      </div>
    </FreelancerLayout>
  );
};

export default Dashboard;
