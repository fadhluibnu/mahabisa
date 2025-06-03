import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
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
  Filler
} from 'chart.js';

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

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('Bulanan');
  
  // Chart data for different time ranges
  const chartData = {
    'Bulanan': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep'],
      totalVisitors: [8000, 9500, 10200, 9000, 11500, 15000, 13500, 16000, 18000],
      newVisitors: [5000, 6200, 6800, 6000, 7500, 9000, 8200, 9500, 10500]
    },
    'Mingguan': {
      labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      totalVisitors: [3800, 4200, 4500, 5000],
      newVisitors: [2200, 2500, 2800, 3100]
    },
    'Harian': {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      totalVisitors: [520, 680, 750, 620, 700, 800, 550],
      newVisitors: [320, 420, 460, 380, 430, 480, 340]
    }
  };
  
  // Chart options and data structure
  const data = {
    labels: chartData[timeRange].labels,
    datasets: [
      {
        label: 'Total Pengunjung',
        data: chartData[timeRange].totalVisitors,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#4f46e5'
      },
      {
        label: 'Pengunjung Baru',
        data: chartData[timeRange].newVisitors,
        borderColor: '#10b981',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#10b981'
      }
    ]
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
            size: 12
          }
        }
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
          size: 12
        },
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#9ca3af'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(243, 244, 246, 1)'
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#9ca3af',
          callback: function(value) {
            if (value >= 1000) {
              return value / 1000 + 'k';
            }
            return value;
          }
        }
      }
    }
  };
  
  // Handle time range change
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  return (
    <AdminLayout
      title='Dashboard Admin'
      subtitle='Selamat datang di pusat kendali MahaBisa'
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8'>
        <StatCard
          title='Total Pengguna'
          value='2,519'
          percentage='12.5'
          trend='up'
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
          value='128'
          percentage='8.2'
          trend='up'
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
          value='Rp 37,8jt'
          percentage='23.1'
          trend='up'
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
          value='4.8/5'
          percentage='4.3'
          trend='up'
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
                  <tr className='border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer' onClick={() => window.location.href = '/admin/projects/1'}>
                    <td className='py-3 font-medium text-gray-900'>
                      Website Dashboard
                    </td>
                    <td className='py-3'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 rounded-full mr-2 overflow-hidden flex-shrink-0'>
                          <img
                            src='https://randomuser.me/api/portraits/women/23.jpg'
                            alt='User'
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <span>Dewi S.</span>
                      </div>
                    </td>
                    <td className='py-3 hidden sm:table-cell'>PT Maju Jaya</td>
                    <td className='py-3 hidden md:table-cell'>25 Jun 2023</td>
                    <td className='py-3 hidden xs:table-cell'>
                      <span className='px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>
                        Aktif
                      </span>
                    </td>
                    <td className='py-3 text-right font-medium'>
                      Rp 4.500.000
                    </td>
                  </tr>
                  <tr className='border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer' onClick={() => window.location.href = '/admin/projects/2'}>
                    <td className='py-3 font-medium text-gray-900'>
                      Logo Design
                    </td>
                    <td className='py-3'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 rounded-full mr-2 overflow-hidden flex-shrink-0'>
                          <img
                            src='https://randomuser.me/api/portraits/men/32.jpg'
                            alt='User'
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <span>Agus P.</span>
                      </div>
                    </td>
                    <td className='py-3 hidden sm:table-cell'>
                      Startup Kreatif
                    </td>
                    <td className='py-3 hidden md:table-cell'>20 Jun 2023</td>
                    <td className='py-3 hidden xs:table-cell'>
                      <span className='px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>
                        Aktif
                      </span>
                    </td>
                    <td className='py-3 text-right font-medium'>
                      Rp 1.200.000
                    </td>
                  </tr>
                  <tr className='border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer' onClick={() => window.location.href = '/admin/projects/3'}>
                    <td className='py-3 font-medium text-gray-900'>
                      Mobile App
                    </td>
                    <td className='py-3'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 rounded-full mr-2 overflow-hidden flex-shrink-0'>
                          <img
                            src='https://randomuser.me/api/portraits/women/67.jpg'
                            alt='User'
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <span>Nina M.</span>
                      </div>
                    </td>
                    <td className='py-3 hidden sm:table-cell'>
                      Tech Solutions
                    </td>
                    <td className='py-3 hidden md:table-cell'>15 Jul 2023</td>
                    <td className='py-3 hidden xs:table-cell'>
                      <span className='px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800'>
                        Review
                      </span>
                    </td>
                    <td className='py-3 text-right font-medium'>
                      Rp 8.750.000
                    </td>
                  </tr>
                  <tr className='text-sm hover:bg-gray-50 cursor-pointer' onClick={() => window.location.href = '/admin/projects/4'}>
                    <td className='py-3 font-medium text-gray-900'>
                      Content Writing
                    </td>
                    <td className='py-3'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 rounded-full mr-2 overflow-hidden flex-shrink-0'>
                          <img
                            src='https://randomuser.me/api/portraits/men/54.jpg'
                            alt='User'
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <span>Rudi H.</span>
                      </div>
                    </td>
                    <td className='py-3 hidden sm:table-cell'>BlogMedia</td>
                    <td className='py-3 hidden md:table-cell'>10 Jun 2023</td>
                    <td className='py-3 hidden xs:table-cell'>
                      <span className='px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800'>
                        Selesai
                      </span>
                    </td>
                    <td className='py-3 text-right font-medium'>Rp 850.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform Stats */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='font-bold text-lg text-gray-900'>
                Traffic Pengunjung
              </h3>
              <select 
                className='text-sm bg-gray-50 border border-gray-300 rounded-md px-3 py-1'
                value={timeRange}
                onChange={handleTimeRangeChange}
              >
                <option>Bulanan</option>
                <option>Mingguan</option>
                <option>Harian</option>
              </select>
            </div>

            <div className='space-y-6'>
              <div className='h-64 w-full bg-white rounded-lg'>
                <Line data={data} options={options} />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Total Pengunjung</p>
                  <p className="font-bold text-lg text-blue-600">12,845</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Pengunjung Baru</p>
                  <p className="font-bold text-lg text-green-600">5,372</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Rata-rata Waktu</p>
                  <p className="font-bold text-lg text-purple-600">3:24</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Bounce Rate</p>
                  <p className="font-bold text-lg text-amber-600">32%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar content */}
        <div className='space-y-6 md:space-y-8'>
          {/* Combined Notifications & Activities */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <div className="flex justify-between items-center mb-4">
              <h3 className='font-bold text-lg text-gray-900'>
                Aktivitas & Notifikasi
              </h3>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-1"></span>
                  Baru
                </span>
              </div>
            </div>

            <div className='space-y-5'>
              <div className='flex items-start'>
                <div className='flex-shrink-0 mr-3'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img
                      src='https://randomuser.me/api/portraits/women/23.jpg'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-900'>
                    <Link href='/admin/users/1' className='font-medium hover:text-indigo-600'>Dewi Susanti</Link>{' '}
                    menyelesaikan proyek{' '}
                    <Link href='/admin/projects/5' className='font-medium hover:text-indigo-600'>Website E-commerce</Link>
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>2 jam yang lalu</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0 mr-3'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img
                      src='https://randomuser.me/api/portraits/men/32.jpg'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-900'>
                    <Link href='/admin/users/2' className='font-medium hover:text-indigo-600'>Agus Pratama</Link> bergabung
                    sebagai freelancer
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>5 jam yang lalu</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0 mr-3'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img
                      src='https://randomuser.me/api/portraits/women/67.jpg'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-900'>
                    <Link href='/admin/users/3' className='font-medium hover:text-indigo-600'>Nina Maulida</Link>{' '}
                    menambahkan portofolio baru
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>Kemarin, 16:42</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0 mr-3'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img
                      src='https://randomuser.me/api/portraits/men/54.jpg'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-900'>
                    <Link href='/admin/users/4' className='font-medium hover:text-indigo-600'>Rudi Hartono</Link>{' '}
                    mendapatkan 5 review bintang
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>Kemarin, 09:27</p>
                </div>
              </div>
              
              <div className='flex items-start'>
                <div className='flex-shrink-0 mr-3'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img
                      src='https://randomuser.me/api/portraits/women/45.jpg'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-900'>
                    <Link href='/admin/users/5' className='font-medium hover:text-indigo-600'>Maya Sari</Link>{' '}
                    membuat proyek baru{' '}
                    <Link href='/admin/projects/15' className='font-medium hover:text-indigo-600'>Brand Identity Design</Link>
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>2 hari yang lalu</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
              <Link 
                href='/admin/activities'
                className='py-2 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 text-center'
              >
                Lihat Semua Aktivitas
              </Link>
              
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Tandai Semua Dibaca
              </button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <h3 className='font-bold text-lg text-gray-900 mb-4'>
              Kategori Populer
            </h3>

            <div className='space-y-4'>
              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    Web Development
                  </span>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    35%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
                  <div
                    className='bg-indigo-600 h-1.5 sm:h-2 rounded-full'
                    style={{ width: '35%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    Design Grafis
                  </span>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    28%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
                  <div
                    className='bg-pink-500 h-1.5 sm:h-2 rounded-full'
                    style={{ width: '28%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    Mobile Development
                  </span>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    18%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
                  <div
                    className='bg-green-500 h-1.5 sm:h-2 rounded-full'
                    style={{ width: '18%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    Digital Marketing
                  </span>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    12%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
                  <div
                    className='bg-purple-500 h-1.5 sm:h-2 rounded-full'
                    style={{ width: '12%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    Writing
                  </span>
                  <span className='text-xs sm:text-sm font-medium text-gray-700'>
                    10%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
                  <div
                    className='bg-orange-500 h-1.5 sm:h-2 rounded-full'
                    style={{ width: '10%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
