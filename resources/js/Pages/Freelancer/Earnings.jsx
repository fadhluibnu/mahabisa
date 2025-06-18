import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';
import EarningsCard from './Components/EarningsCard';
import Chart from 'chart.js/auto';

const Earnings = ({ 
  totalEarnings, 
  formattedTotalEarnings,
  availableBalance, 
  formattedAvailableBalance,
  pendingBalance, 
  formattedPendingBalance,
  earnings = [], 
  pendingPayments = [],
  monthLabels = [],
  monthlyEarningsData = [],
  recentWithdrawals = []
}) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Combined payments for filtering
  const allPayments = [...earnings, ...pendingPayments];

  // Filter and search logic
  const filteredPayments = allPayments.filter(payment => {
    const matchesStatus =
      filterStatus === 'all' || payment.status === filterStatus;
    const matchesSearch =
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.project.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Chart data
  const monthlyData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Penghasilan Bulanan',
        data: monthlyEarningsData,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Initialize the chart
  useEffect(() => {
    if (chartRef.current && monthLabels && monthLabels.length > 0) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: monthlyData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let value = context.raw;
                  return 'Rp' + value.toLocaleString('id-ID');
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  if (value >= 1000000) {
                    return 'Rp' + (value / 1000000).toFixed(1) + ' jt';
                  }
                  return 'Rp' + value.toLocaleString('id-ID');
                },
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [monthLabels, monthlyEarningsData]);

  return (
    <FreelancerLayout
      title='Penghasilan'
      subtitle='Pantau penghasilan dan status pembayaran Anda'
    >
      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>
            Total Penghasilan
          </h3>
          <p className='text-2xl font-bold text-gray-800'>{formattedTotalEarnings}</p>
          <div className='mt-2 flex items-center text-green-600'>
            <svg
              className='w-4 h-4 mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z'
                clipRule='evenodd'
              />
            </svg>
            <span className='text-sm font-medium'>+15.3% dari bulan lalu</span>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex justify-between items-center mb-1'>
            <h3 className='text-sm font-medium text-gray-500'>Dana Tersedia</h3>
            <Link
              href='/freelancer/withdraw'
              className='text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded-md'
            >
              Tarik Dana
            </Link>
          </div>
          <p className='text-2xl font-bold text-gray-800'>{formattedAvailableBalance}</p>
          <div className='mt-2 flex items-center text-gray-500'>
            <span className='text-sm font-medium'>
              Dana tersedia untuk ditarik
            </span>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>
            Pembayaran Tertunda
          </h3>
          <p className='text-2xl font-bold text-gray-800'>{formattedPendingBalance}</p>
          <div className='mt-2 flex items-center text-gray-500'>
            <span className='text-sm font-medium'>{pendingPayments.length} pembayaran tertunda</span>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>
            Rata-rata Bulanan
          </h3>
          <p className='text-2xl font-bold text-gray-800'>
            {monthlyEarningsData && monthlyEarningsData.length > 0
              ? 'Rp' + 
                Number(
                  monthlyEarningsData.reduce((sum, amount) => sum + amount, 0) / 
                  monthlyEarningsData.length
                ).toLocaleString('id-ID', { maximumFractionDigits: 0 })
              : 'Rp0'}
          </p>
          <div className='mt-2 flex items-center text-green-600'>
            <svg
              className='w-4 h-4 mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z'
                clipRule='evenodd'
              />
            </svg>
            <span className='text-sm font-medium'>
              +8.2% dari 6 bulan terakhir
            </span>
          </div>
        </div>
      </div>

      {/* Monthly Earnings Chart */}
      <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
        <h2 className='text-lg font-bold text-gray-800 mb-4'>
          Penghasilan Bulanan
        </h2>
        <div className='h-80'>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Search and filters */}
      <div className='mb-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='relative flex-grow max-w-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              type='text'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md'
              placeholder='Cari pembayaran atau klien...'
            />
          </div>

          <div className='flex items-center'>
            <span className='mr-3 text-sm font-medium text-gray-700'>
              Status:
            </span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option value='all'>Semua</option>
              <option value='paid'>Terbayar</option>
              <option value='pending'>Menunggu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden mb-8'>
        <div className='p-6 border-b border-gray-100'>
          <h2 className='text-lg font-bold text-gray-800'>Semua Pembayaran</h2>
        </div>

        {filteredPayments.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Klien
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Proyek
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Tanggal
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Jumlah
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredPayments.map(payment => (
                  <tr key={payment.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10'>
                          <img
                            className='h-10 w-10 rounded-full'
                            src={payment.image}
                            alt={payment.client}
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            {payment.client}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {payment.project}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {payment.date}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {payment.status === 'paid' ? (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          Terbayar
                        </span>
                      ) : (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                          Menunggu
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right'>
                      {payment.formatted_amount}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <Link
                        href={payment.status === 'paid' ? `/freelancer/orders/${payment.id}` : `/freelancer/orders/${payment.id}`}
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='p-6 text-center'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              Tidak ada pembayaran
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Belum ada pembayaran yang sesuai dengan filter Anda.
            </p>
          </div>
        )}
      </div>
      
      {/* Withdrawals history */}
      {recentWithdrawals && recentWithdrawals.length > 0 && (
        <div className='bg-white rounded-xl shadow-sm overflow-hidden mb-8'>
          <div className='p-6 border-b border-gray-100'>
            <h2 className='text-lg font-bold text-gray-800'>Riwayat Penarikan Dana</h2>
          </div>
          
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    ID Transaksi
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Tanggal
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Metode
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Jumlah
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Biaya Admin
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Diterima
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {recentWithdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>#{withdrawal.id}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{withdrawal.created_at}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{withdrawal.payment_method}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {withdrawal.status === 'completed' ? (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          Berhasil
                        </span>
                      ) : withdrawal.status === 'processing' ? (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                          Diproses
                        </span>
                      ) : (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                          Tertunda
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500'>
                      {withdrawal.formatted_amount}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500'>
                      {withdrawal.formatted_fee}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      {withdrawal.formatted_net_amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </FreelancerLayout>
  );
};

export default Earnings;
