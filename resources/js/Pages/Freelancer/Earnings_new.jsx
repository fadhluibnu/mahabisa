import React, { useEffect, useRef, useState } from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import EarningsCard from './Components/EarningsCard';
import Chart from 'chart.js/auto';

const Earnings = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // Dummy data for earnings
  const earnings = [
    {
      id: 1,
      client: 'PT Maju Bersama',
      project: 'Redesain Website E-commerce',
      amount: 'Rp1.500.000',
      date: '10 Jun 2023',
      status: 'paid',
      image:
        'https://ui-avatars.com/api/?name=PT+Maju+Bersama&background=6366f1&color=fff',
    },
    {
      id: 2,
      client: 'StartUp Inovasi',
      project: 'Pengembangan Aplikasi Mobile',
      amount: 'Rp3.000.000',
      date: '5 Jun 2023',
      status: 'paid',
      image:
        'https://ui-avatars.com/api/?name=StartUp+Inovasi&background=ec4899&color=fff',
    },
    {
      id: 3,
      client: 'CV Digital Kreatif',
      project: 'Landing Page untuk Peluncuran Produk',
      amount: 'Rp2.800.000',
      date: '1 Jun 2023',
      status: 'paid',
      image:
        'https://ui-avatars.com/api/?name=CV+Digital+Kreatif&background=10b981&color=fff',
    },
    {
      id: 4,
      client: 'PT Solusi Teknologi',
      project: 'Pembuatan Dashboard Admin',
      amount: 'Rp5.500.000',
      date: '25 Mei 2023',
      status: 'paid',
      image:
        'https://ui-avatars.com/api/?name=PT+Solusi+Teknologi&background=f59e0b&color=fff',
    },
  ];

  // Dummy data for pending payments
  const pendingPayments = [
    {
      id: 5,
      client: 'Toko Online Sejahtera',
      project: 'Integrasi Payment Gateway',
      amount: 'Rp3.200.000',
      date: '20 Jun 2023',
      status: 'pending',
      image:
        'https://ui-avatars.com/api/?name=Toko+Online+Sejahtera&background=8b5cf6&color=fff',
    },
    {
      id: 6,
      client: 'PT Edukasi Digital',
      project: 'Platform E-learning',
      amount: 'Rp6.000.000',
      date: '15 Jul 2023',
      status: 'pending',
      image:
        'https://ui-avatars.com/api/?name=PT+Edukasi+Digital&background=3b82f6&color=fff',
    },
  ];

  // Chart data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
      {
        label: 'Penghasilan Bulanan',
        data: [3500000, 4200000, 3800000, 5100000, 4800000, 5800000],
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
    if (chartRef.current) {
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
  }, []);

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
          <p className='text-2xl font-bold text-gray-800'>Rp12.800.000</p>
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
          <h3 className='text-sm font-medium text-gray-500 mb-1'>Bulan Ini</h3>
          <p className='text-2xl font-bold text-gray-800'>Rp5.800.000</p>
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
            <span className='text-sm font-medium'>+20.8% dari bulan lalu</span>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>
            Pembayaran Tertunda
          </h3>
          <p className='text-2xl font-bold text-gray-800'>Rp8.000.000</p>
          <div className='mt-2 flex items-center text-gray-500'>
            <span className='text-sm font-medium'>2 pembayaran tertunda</span>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>
            Rata-rata Bulanan
          </h3>
          <p className='text-2xl font-bold text-gray-800'>Rp4.500.000</p>
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

      {/* Payments */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-lg font-bold text-gray-800 mb-4'>
            Pembayaran Terbaru
          </h2>
          <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            {earnings.map((payment, index) => (
              <div
                key={payment.id}
                className={`p-4 ${index !== earnings.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className='flex items-center'>
                  <img
                    src={payment.image}
                    alt={payment.client}
                    className='h-10 w-10 rounded-full mr-4'
                  />
                  <div className='flex-1 min-w-0'>
                    <h4 className='text-sm font-medium text-gray-900 truncate'>
                      {payment.project}
                    </h4>
                    <p className='text-sm text-gray-500 truncate'>
                      {payment.client}
                    </p>
                  </div>
                  <div className='ml-4 flex flex-col items-end'>
                    <span className='text-sm font-medium text-gray-900'>
                      {payment.amount}
                    </span>
                    <span className='text-xs text-gray-500'>
                      {payment.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-lg font-bold text-gray-800 mb-4'>
            Pembayaran Tertunda
          </h2>
          <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            {pendingPayments.map((payment, index) => (
              <div
                key={payment.id}
                className={`p-4 ${index !== pendingPayments.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className='flex items-center'>
                  <img
                    src={payment.image}
                    alt={payment.client}
                    className='h-10 w-10 rounded-full mr-4'
                  />
                  <div className='flex-1 min-w-0'>
                    <h4 className='text-sm font-medium text-gray-900 truncate'>
                      {payment.project}
                    </h4>
                    <p className='text-sm text-gray-500 truncate'>
                      {payment.client}
                    </p>
                  </div>
                  <div className='ml-4 flex flex-col items-end'>
                    <span className='text-sm font-medium text-gray-900'>
                      {payment.amount}
                    </span>
                    <span className='text-xs text-gray-500'>
                      {payment.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Earnings;
