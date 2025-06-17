import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import AdminLayout from './Components/AdminLayout';
import StatCard from './Components/StatCard';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = ({
  stats,
  chartData: dashboardChartData,
  recentOrders,
  recentActivities,
  topFreelancers,
  recentReviews,
  user,
}) => {
  const [timeRange, setTimeRange] = useState('Bulanan');

  // Prepare chart data based on props or use default data
  const dataForCharts = {
    Bulanan: {
      labels: dashboardChartData?.labels || [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Ags',
        'Sep',
      ],
      totalVisitors: dashboardChartData?.totalVisitors || [
        8000, 9500, 10200, 9000, 11500, 15000, 13500, 16000, 18000,
      ],
      newVisitors: dashboardChartData?.newVisitors || [
        5000, 6200, 6800, 6000, 7500, 9000, 8200, 9500, 10500,
      ],
    },
    Mingguan: {
      labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      totalVisitors: [3800, 4200, 4500, 5000],
      newVisitors: [2200, 2500, 2800, 3100],
    },
    Harian: {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      totalVisitors: [520, 680, 750, 620, 700, 800, 550],
      newVisitors: [320, 420, 460, 380, 430, 480, 340],
    },
  };

  // Chart options and data structure
  const data = {
    labels: dataForCharts[timeRange].labels,
    datasets: [
      {
        label: 'Total Pengunjung',
        data: dataForCharts[timeRange].totalVisitors,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#4f46e5',
      },
      {
        label: 'Pengunjung Baru',
        data: dataForCharts[timeRange].newVisitors,
        borderColor: '#10b981',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#10b981',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#9ca3af',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(243, 244, 246, 1)',
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#9ca3af',
          callback: function (value) {
            if (value >= 1000) {
              return value / 1000 + 'k';
            }
            return value;
          },
        },
      },
    },
  };

  // Handle time range change
  const handleTimeRangeChange = e => {
    setTimeRange(e.target.value);
  };

  return (
    <AdminLayout
      title='Dashboard Admin'
      subtitle='Selamat datang di pusat kendali MahaBisa'
    >
      <Head title='Dashboard Admin' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8'>
        <StatCard
          title='Total Pengguna'
          value={stats.users_count.toLocaleString()}
          percentage={stats.users_growth.toString()}
          trend={stats.users_growth >= 0 ? 'up' : 'down'}
          color='purple'
          icon={
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
                d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
              />
            </svg>
          }
        />

        <StatCard
          title='Proyek Aktif'
          value={stats.active_projects_count.toLocaleString()}
          percentage={stats.projects_growth.toString()}
          trend={stats.projects_growth >= 0 ? 'up' : 'down'}
          color='pink'
          icon={
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
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
          }
        />

        <StatCard
          title='Pendapatan'
          value={formatCurrency(stats.revenue)}
          percentage={stats.revenue_growth.toString()}
          trend={stats.revenue_growth >= 0 ? 'up' : 'down'}
          color='green'
          icon={
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
          }
        />

        <StatCard
          title='Rating Platform'
          value={`${stats.average_rating.toFixed(1)}/5`}
          percentage={stats.rating_growth.toString()}
          trend={stats.rating_growth >= 0 ? 'up' : 'down'}
          color='orange'
          icon={
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
          }
        />
      </div>

      {/* Content Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
        {/* Main content - charts etc */}
        <div className='lg:col-span-2 space-y-6 md:space-y-8'>
          {/* Recent Projects Section */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='font-bold text-lg text-gray-900'>
                Proyek Terbaru
              </h3>
              <Link
                href='/admin/orders'
                className='text-sm text-indigo-600 hover:text-indigo-800 font-medium'
              >
                Lihat Semua
              </Link>
            </div>

            {/* Project list */}
            <div className='overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead>
                  <tr className='text-left text-gray-500 text-sm border-b border-gray-200'>
                    <th className='pb-3 font-medium'>Nama Proyek</th>
                    <th className='pb-3 font-medium'>Freelancer</th>
                    <th className='pb-3 font-medium hidden sm:table-cell'>
                      Klien
                    </th>
                    <th className='pb-3 font-medium hidden md:table-cell'>
                      Deadline
                    </th>
                    <th className='pb-3 font-medium hidden xs:table-cell'>
                      Status
                    </th>
                    <th className='pb-3 font-medium text-right'>Anggaran</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders?.map(order => (
                    <tr
                      key={order.id}
                      className='border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer'
                      onClick={() =>
                        (window.location.href = `/admin/orders/${order.id}`)
                      }
                    >
                      <td className='py-3 font-medium text-gray-900'>
                        {order.title}
                      </td>
                      <td className='py-3'>
                        <div className='flex items-center'>
                          <img
                            src={order.freelancer.avatar}
                            alt={order.freelancer.name}
                            className='h-6 w-6 rounded-full mr-2'
                          />
                          <span>{order.freelancer.name}</span>
                        </div>
                      </td>
                      <td className='py-3 hidden sm:table-cell'>
                        <div className='flex items-center'>
                          <img
                            src={order.client.avatar}
                            alt={order.client.name}
                            className='h-6 w-6 rounded-full mr-2'
                          />
                          <span>{order.client.name}</span>
                        </div>
                      </td>
                      <td className='py-3 hidden md:table-cell text-gray-500'>
                        {order.deadline
                          ? formatDate(order.deadline)
                          : 'Tidak ada'}
                      </td>
                      <td className='py-3 hidden xs:table-cell'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              order.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'revision'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {order.status === 'completed'
                            ? 'Selesai'
                            : order.status === 'in-progress'
                              ? 'Proses'
                              : order.status === 'revision'
                                ? 'Revisi'
                                : 'Pending'}
                        </span>
                      </td>
                      <td className='py-3 text-right font-medium'>
                        {formatCurrency(order.amount)}
                      </td>
                    </tr>
                  ))}

                  {(!recentOrders || recentOrders.length === 0) && (
                    <tr>
                      <td
                        colSpan='6'
                        className='py-4 text-center text-gray-500'
                      >
                        Tidak ada proyek terbaru
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Main Chart Section */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <div className='flex flex-wrap justify-between items-center mb-6'>
              <div>
                <h3 className='font-bold text-lg text-gray-900'>
                  Statistik Pengunjung
                </h3>
                <p className='text-gray-500 text-sm'>
                  Tren pengunjung platform MahaBisa
                </p>
              </div>
              <div className='mt-2 sm:mt-0'>
                <select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  className='form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm'
                >
                  <option>Bulanan</option>
                  <option>Mingguan</option>
                  <option>Harian</option>
                </select>
              </div>
            </div>

            <div className='h-64 md:h-80'>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>

        {/* Sidebar content */}
        <div className='space-y-6 md:space-y-8'>
          {/* Top Freelancers Section */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-bold text-lg text-gray-900'>
                Freelancer Top
              </h3>
              <Link
                href='/admin/freelancers'
                className='text-sm text-indigo-600 hover:text-indigo-800 font-medium'
              >
                Lihat Semua
              </Link>
            </div>

            <div className='space-y-4'>
              {topFreelancers?.map(freelancer => (
                <div key={freelancer.id} className='flex items-center'>
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className='h-10 w-10 rounded-full'
                  />
                  <div className='ml-3 flex-1'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          {freelancer.name}
                        </h4>
                        <div className='flex items-center mt-1'>
                          <div className='flex text-yellow-400'>
                            {[1, 2, 3, 4, 5].map(star => (
                              <svg
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= Math.round(freelancer.average_rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                            ))}
                          </div>
                          <span className='text-xs text-gray-500 ml-1'>
                            ({freelancer.average_rating.toFixed(1)})
                          </span>
                        </div>
                      </div>
                      <div className='text-right'>
                        <span className='text-sm font-medium text-gray-900'>
                          {formatCurrency(freelancer.total_earnings)}
                        </span>
                        <p className='text-xs text-gray-500 mt-1'>
                          {freelancer.orders_count} proyek
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {(!topFreelancers || topFreelancers.length === 0) && (
                <div className='py-4 text-center text-gray-500'>
                  Belum ada data freelancer
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-bold text-lg text-gray-900'>
                Aktivitas Terbaru
              </h3>
            </div>

            <div className='space-y-4 max-h-96 overflow-y-auto'>
              {recentActivities?.map(activity => (
                <div key={activity.id} className='flex'>
                  <div className='flex-shrink-0 mr-3'>
                    <div className='relative'>
                      <img
                        className='h-8 w-8 rounded-full border-2 border-white'
                        src={activity.user.avatar}
                        alt={activity.user.name}
                      />
                      <span
                        className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-1 ring-white ${
                          activity.user.role === 'admin'
                            ? 'bg-green-400'
                            : activity.user.role === 'freelancer'
                              ? 'bg-blue-400'
                              : 'bg-purple-400'
                        }`}
                      ></span>
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm text-gray-800'>
                      <span className='font-medium'>{activity.user.name}</span>{' '}
                      {activity.description}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>
                      {formatDate(activity.created_at, { timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
              ))}

              {(!recentActivities || recentActivities.length === 0) && (
                <div className='py-4 text-center text-gray-500'>
                  Tidak ada aktivitas terbaru
                </div>
              )}
            </div>
          </div>

          {/* Recent Reviews Section */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-bold text-lg text-gray-900'>
                Ulasan Terbaru
              </h3>
              <Link
                href='/admin/reviews'
                className='text-sm text-indigo-600 hover:text-indigo-800 font-medium'
              >
                Lihat Semua
              </Link>
            </div>

            <div className='space-y-4'>
              {recentReviews?.map(review => (
                <div
                  key={review.id}
                  className='pb-4 border-b border-gray-100 last:border-0 last:pb-0'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <img
                        src={review.client.avatar}
                        alt={review.client.name}
                        className='h-8 w-8 rounded-full mr-2'
                      />
                      <div>
                        <p className='text-sm font-medium text-gray-900'>
                          {review.client.name}
                        </p>
                        <div className='flex items-center mt-0.5'>
                          <div className='flex text-yellow-400'>
                            {[1, 2, 3, 4, 5].map(star => (
                              <svg
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= review.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                            ))}
                          </div>
                          <span className='text-xs text-gray-500 ml-1'>
                            {formatDate(review.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='text-xs text-gray-500'>
                      {review.order.title}
                    </div>
                  </div>
                  <p className='mt-2 text-sm text-gray-600 line-clamp-2'>
                    {review.comment}
                  </p>
                </div>
              ))}

              {(!recentReviews || recentReviews.length === 0) && (
                <div className='py-4 text-center text-gray-500'>
                  Belum ada ulasan dari pengguna
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
