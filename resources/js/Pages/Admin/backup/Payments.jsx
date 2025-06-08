import React, { useState, useEffect } from 'react';
import AdminLayout from './../Components/AdminLayout';
import StatCard from './../Components/StatCard';
import { Link } from '@inertiajs/react';
import axios from 'axios';

const Payments = ({ payments, user }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [stats, setStats] = useState({
    totalPayments: 0,
    totalAmount: 0,
    totalCommission: 0,
    pendingPayments: 0
  });
  
  useEffect(() => {
    // Calculate stats from payments data
    if (payments.data) {
      const total = payments.data.length;
      const totalAmount = payments.data.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
      const totalCommission = payments.data.reduce((sum, payment) => {
        // Calculate commission (20% of amount by default)
        const commission = payment.commission || parseFloat(payment.amount) * 0.2;
        return sum + parseFloat(commission);
      }, 0);
      const pending = payments.data.filter(payment => payment.status === 'pending').length;
      
      setStats({
        totalPayments: total,
        totalAmount: totalAmount,
        totalCommission: totalCommission,
        pendingPayments: pending
      });
    }
  }, [payments]);

  // Convert payments data to the format used in the component
  const transactions = payments.data ? payments.data.map(payment => {
    // Generate code and colors for project badge
    const projectName = payment.order?.project?.name || payment.order?.service?.title || 'Pembayaran';
    const code = projectName.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
    
    // Assign a color based on the first character of the project name
    const colors = [
      {bg: 'bg-blue-100', text: 'text-blue-600'},
      {bg: 'bg-purple-100', text: 'text-purple-600'},
      {bg: 'bg-pink-100', text: 'text-pink-600'},
      {bg: 'bg-green-100', text: 'text-green-600'},
      {bg: 'bg-yellow-100', text: 'text-yellow-600'},
      {bg: 'bg-red-100', text: 'text-red-600'}
    ];
    
    const colorIndex = projectName.charCodeAt(0) % colors.length;
    
    // Format status in Indonesian
    const statusMap = {
      'pending': 'Menunggu',
      'paid': 'Dibayar',
      'failed': 'Gagal',
      'refunded': 'Dikembalikan',
      'cancelled': 'Dibatalkan'
    };
    
    // Format date to Indonesian format
    const formatDate = (dateString) => {
      if (!dateString) return '-';
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    };
    
    // Format currency to Indonesian Rupiah
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    
    return {
      id: `#INV-${payment.payment_id || payment.id}`,
      project: {
        name: projectName,
        code: code,
        bgColor: colors[colorIndex].bg,
        textColor: colors[colorIndex].text
      },
      amount: formatCurrency(payment.amount),
      commission: formatCurrency(payment.amount * 0.2), // Assuming 20% commission
      status: statusMap[payment.status] || payment.status,
      date: formatDate(payment.paid_at || payment.created_at),
      client: payment.client?.name || 'Client',
      freelancer: payment.order?.freelancer?.name || 'Freelancer',
      category: payment.order?.project?.category?.name || payment.order?.service?.category?.name || 'Umum',
      paymentMethod: payment.payment_method || 'Online Payment'
    };
  }) : [
    // Fallback data in case there are no payments
    {
      id: '#INV-000000',
      project: {
        name: 'No Transactions',
        code: 'NT',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600'
      },
      amount: 'Rp 0',
      commission: 'Rp 0',
      status: 'N/A',
      date: '-',
      client: '-',
      freelancer: '-',
      category: '-',
      paymentMethod: '-'
    }
  ];

  // Filter transactions based on status
  const getFilteredTransactions = () => {
    if (filterStatus === 'Semua Status') {
      return transactions;
    }
    return transactions.filter(transaction => transaction.status === filterStatus);
  };

  const filteredTransactions = getFilteredTransactions();

  // Calculate pagination
  const totalTransactions = filteredTransactions.length;
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle transaction details modal
  const handleTransactionDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Apply filter
  const applyFilter = () => {
    setCurrentPage(1); // Reset to first page when applying filter
    setShowFilterModal(false);
  };

  // Reset filter
  const resetFilter = () => {
    setFilterStatus('Semua Status');
    setCurrentPage(1);
  };

  // Handle financial report generation
  const handleFinancialReport = () => {
    setShowReportModal(true);
  };

  return (
    <AdminLayout
      title='Pembayaran & Komisi'
      subtitle='Manajemen pembayaran dan komisi platform'
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8'>
        <StatCard
          title='Total Pembayaran'
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
          title='Pendapatan Platform'
          value='Rp 7,56jt'
          percentage='18.5'
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
                d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          }
        />

        <StatCard
          title='Pembayaran Sukses'
          value='124'
          percentage='12.7'
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
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          }
        />

        <StatCard
          title='Menunggu Pencairan'
          value='15'
          percentage='3.2'
          trend='down'
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
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          }
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='font-bold text-lg text-gray-900'>
              Transaksi Terbaru
              {filterStatus !== 'Semua Status' && 
                <span className="ml-2 text-sm font-normal text-indigo-600">
                  (Filter: {filterStatus})
                </span>
              }
            </h3>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowFilterModal(true)}
                className='flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
              >
                <svg
                  className='w-5 h-5 mr-2 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                  />
                </svg>
                Filter
              </button>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full table-auto'>
              <thead>
                <tr className='text-left text-gray-500 text-sm border-b border-gray-200'>
                  <th className='pb-3 font-medium'>ID Transaksi</th>
                  <th className='pb-3 font-medium'>Proyek</th>
                  <th className='pb-3 font-medium'>Jumlah</th>
                  <th className='pb-3 font-medium hidden md:table-cell'>
                    Komisi
                  </th>
                  <th className='pb-3 font-medium hidden sm:table-cell'>
                    Status
                  </th>
                  <th className='pb-3 font-medium hidden lg:table-cell'>
                    Tanggal
                  </th>
                  <th className='pb-3 font-medium text-right'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((transaction, index) => (
                    <tr key={index} className='border-b border-gray-100 text-sm hover:bg-gray-50'>
                      <td className='py-3'>
                        <span className='font-medium text-gray-900'>
                          {transaction.id}
                        </span>
                      </td>
                      <td className='py-3'>
                        <div className='flex items-center'>
                          <div className={`w-8 h-8 rounded ${transaction.project.bgColor} mr-3 flex items-center justify-center ${transaction.project.textColor} font-medium`}>
                            {transaction.project.code}
                          </div>
                          <span>{transaction.project.name}</span>
                        </div>
                      </td>
                      <td className='py-3 font-medium'>{transaction.amount}</td>
                      <td className='py-3 hidden md:table-cell text-green-600'>
                        {transaction.commission}
                      </td>
                      <td className='py-3 hidden sm:table-cell'>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'Dibayar' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.status === 'Menunggu'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className='py-3 hidden lg:table-cell'>{transaction.date}</td>
                      <td className='py-3 text-right'>
                        <button
                          onClick={() => handleTransactionDetail(transaction)}
                          className='px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100'
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-6 text-center text-gray-500">
                      Tidak ada transaksi dengan filter yang dipilih
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalTransactions > itemsPerPage && (
            <div className="mt-6 flex justify-center">
              <nav className="flex items-center">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  &laquo; Sebelumnya
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === number 
                        ? 'text-white bg-indigo-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Selanjutnya &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>

        <div>
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6'>
            <h3 className='font-bold text-lg text-gray-900 mb-4'>
              Ringkasan Keuangan
            </h3>

            <div className='space-y-4'>
              <div className='pb-4 border-b border-gray-100'>
                <p className='text-sm text-gray-500 mb-1'>
                  Pendapatan Bulan Ini
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  Rp 15.250.000
                </p>
                <div className='flex items-center mt-1'>
                  <svg
                    className='w-4 h-4 text-green-600 mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    />
                  </svg>
                  <span className='text-sm text-green-600'>
                    23.1% dari bulan lalu
                  </span>
                </div>
              </div>

              <div className='pb-4 border-b border-gray-100'>
                <p className='text-sm text-gray-500 mb-1'>Komisi Platform</p>
                <p className='text-2xl font-bold text-gray-900'>Rp 3.050.000</p>
                <div className='flex items-center mt-1'>
                  <svg
                    className='w-4 h-4 text-green-600 mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    />
                  </svg>
                  <span className='text-sm text-green-600'>
                    18.5% dari bulan lalu
                  </span>
                </div>
              </div>

              <div className='pb-4'>
                <p className='text-sm text-gray-500 mb-1'>
                  Pembayaran ke Freelancer
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  Rp 12.200.000
                </p>
                <div className='flex items-center mt-1'>
                  <svg
                    className='w-4 h-4 text-green-600 mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    />
                  </svg>
                  <span className='text-sm text-green-600'>
                    15.8% dari bulan lalu
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <h3 className='font-bold text-lg text-gray-900 mb-4'>
              Metode Pembayaran
            </h3>

            <div className='space-y-4'>
              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-sm font-medium text-gray-700'>
                    Bank Transfer
                  </span>
                  <span className='text-sm font-medium text-gray-700'>60%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-indigo-600 h-2 rounded-full'
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-sm font-medium text-gray-700'>
                    E-Wallet
                  </span>
                  <span className='text-sm font-medium text-gray-700'>25%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-pink-500 h-2 rounded-full'
                    style={{ width: '25%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-sm font-medium text-gray-700'>
                    Kartu Kredit
                  </span>
                  <span className='text-sm font-medium text-gray-700'>15%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-green-500 h-2 rounded-full'
                    style={{ width: '15%' }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <button 
                onClick={handleFinancialReport}
                className='w-full py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700'
              >
                Laporan Keuangan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Filter */}
      {showFilterModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='fixed inset-0 bg-black bg-opacity-30'
            onClick={() => setShowFilterModal(false)}
          ></div>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-bold text-lg text-gray-900'>
                Filter Transaksi
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className='text-gray-400 hover:text-gray-600'
              >
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Status Pembayaran
                </label>
                <select 
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                >
                  <option>Semua Status</option>
                  <option>Dibayar</option>
                  <option>Menunggu</option>
                  <option>Gagal</option>
                </select>
              </div>

              <div className='flex justify-end mt-6'>
                <button
                  type='button'
                  onClick={resetFilter}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50'
                >
                  Reset
                </button>
                <button
                  type='button'
                  onClick={applyFilter}
                  className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700'
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Transaksi */}
      {showTransactionModal && selectedTransaction && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='fixed inset-0 bg-black bg-opacity-30'
            onClick={() => setShowTransactionModal(false)}
          ></div>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10 max-h-screen overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='font-bold text-lg text-gray-900'>
                Detail Transaksi
              </h3>
              <button
                onClick={() => setShowTransactionModal(false)}
                className='text-gray-400 hover:text-gray-600'
              >
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center'>
              <div>
                <span className='text-sm text-gray-500'>ID Transaksi</span>
                <p className='text-lg font-bold text-gray-900'>{selectedTransaction.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                selectedTransaction.status === 'Dibayar' 
                  ? 'bg-green-100 text-green-800' 
                  : selectedTransaction.status === 'Menunggu'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                {selectedTransaction.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Informasi Proyek</h4>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className='flex items-center mb-3'>
                    <div className={`w-10 h-10 rounded ${selectedTransaction.project.bgColor} mr-3 flex items-center justify-center ${selectedTransaction.project.textColor} font-medium`}>
                      {selectedTransaction.project.code}
                    </div>
                    <span className="font-medium">{selectedTransaction.project.name}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kategori:</span>
                      <span className="font-medium">{selectedTransaction.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Freelancer:</span>
                      <span className="font-medium">{selectedTransaction.freelancer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Klien:</span>
                      <span className="font-medium">{selectedTransaction.client}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Informasi Pembayaran</h4>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tanggal:</span>
                      <span className="font-medium">{selectedTransaction.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Metode:</span>
                      <span className="font-medium">{selectedTransaction.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Pembayaran:</span>
                      <span className="font-medium">{selectedTransaction.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Komisi Platform:</span>
                      <span className="font-medium text-green-600">{selectedTransaction.commission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diterima Freelancer:</span>
                      <span className="font-medium">
                        {(() => {
                          // Calculate amount received by freelancer
                          const totalAmount = parseInt(selectedTransaction.amount.replace(/\D/g, ''));
                          const commission = parseInt(selectedTransaction.commission.replace(/\D/g, ''));
                          const received = totalAmount - commission;
                          // Format as currency
                          return `Rp ${received.toLocaleString('id-ID')}`;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Catatan Transaksi</h4>
              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  Pembayaran telah diverifikasi dan diteruskan ke akun freelancer. Proyek telah selesai dan telah memenuhi semua persyaratan yang ditetapkan oleh klien.
                </p>
              </div>
            </div>

            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => setShowTransactionModal(false)}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
              >
                Tutup
              </button>
              <button className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700'>
                Cetak Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Financial Report Modal */}
      {showReportModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='fixed inset-0 bg-black bg-opacity-30'
            onClick={() => setShowReportModal(false)}
          ></div>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10 max-h-screen overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='font-bold text-lg text-gray-900'>
                Laporan Keuangan
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className='text-gray-400 hover:text-gray-600'
              >
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Pilih Periode Laporan</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">
                    Dari Tanggal
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">
                    Sampai Tanggal
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Ringkasan Laporan</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Total Pendapatan</p>
                  <p className="font-bold text-lg">Rp 15.250.000</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Komisi Platform</p>
                  <p className="font-bold text-lg">Rp 3.050.000</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Pembayaran Freelancer</p>
                  <p className="font-bold text-lg">Rp 12.200.000</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Total Transaksi</p>
                  <p className="font-bold text-lg">24</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Format Laporan</h4>
              <div className="flex gap-3">
                <button className="flex-1 py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    PDF
                  </span>
                </button>
                <button className="flex-1 py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Excel
                  </span>
                </button>
              </div>
            </div>

            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => setShowReportModal(false)}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Payments;
