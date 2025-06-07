import React, { useState, useEffect } from "react";
import AdminLayout from "./Components/AdminLayout";
import StatCard from "./Components/StatCard";
import { Link, router } from "@inertiajs/react";
import axios from "axios";

const Payments = ({ payments, user, filters = {} }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filterStatus, setFilterStatus] = useState(filters.status || "Semua Status");
  const [currentPage, setCurrentPage] = useState(payments.current_page || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalPayments: 0,
    totalAmount: 0,
    totalCommission: 0,
    pendingPayments: 0
  });
  const [reportDates, setReportDates] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [reportData, setReportData] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Calculate stats from payments data
    if (payments.data) {
      const total = payments.total || payments.data.length;
      const totalAmount = payments.data.reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);
      const totalCommission = payments.data.reduce((sum, payment) => {
        // Calculate commission (20% of amount by default)
        const commission = payment.commission || (parseFloat(payment.amount || 0) * 0.2);
        return sum + parseFloat(commission || 0);
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
  
  const fetchPayments = (page = currentPage, status = filterStatus) => {
    setIsLoading(true);
    
    // For navigation and browser history
    const params = new URLSearchParams();
    if (status && status !== 'Semua Status') params.append('status', status);
    if (page !== 1) params.append('page', page);
    
    router.visit(`/admin/payments?${params.toString()}`, {
      preserveState: true,
      replace: true,
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false)
    });
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
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPayments(1, filterStatus, searchTerm);
  };
  
  // Handle status filter change
  const applyFilter = () => {
    setShowFilterModal(false);
    fetchPayments(1, filterStatus);
  };

  // Convert payments data to the format used in the component
  const transactions = payments && payments.data ? payments.data.map(payment => {
    // Generate code and colors for project badge
    const projectName = payment.order?.project?.name || payment.order?.service?.title || 'Pembayaran';
    const code = projectName.split(' ').map(word => word[0] || '').join('').substring(0, 2).toUpperCase();
    
    // Assign a color based on the first character of the project name
    const colors = [
      {bg: 'bg-blue-100', text: 'text-blue-600'},
      {bg: 'bg-purple-100', text: 'text-purple-600'},
      {bg: 'bg-pink-100', text: 'text-pink-600'},
      {bg: 'bg-green-100', text: 'text-green-600'},
      {bg: 'bg-yellow-100', text: 'text-yellow-600'},
      {bg: 'bg-red-100', text: 'text-red-600'}
    ];
    
    const colorIndex = (projectName?.charCodeAt(0) || 0) % colors.length;
    
    // Format status in Indonesian
    const statusMap = {
      'pending': 'Menunggu',
      'paid': 'Dibayar',
      'failed': 'Gagal',
      'refunded': 'Dikembalikan',
      'cancelled': 'Dibatalkan'
    };
    
    return {
      id: `#INV-${payment.payment_id || payment.id}`,
      project: {
        name: projectName,
        code: code || 'PY',
        bgColor: colors[colorIndex].bg,
        textColor: colors[colorIndex].text
      },
      amount: formatCurrency(payment.amount || 0),
      commission: formatCurrency((payment.amount || 0) * 0.2), // Assuming 20% commission
      status: statusMap[payment.status] || payment.status || 'Unknown',
      date: formatDate(payment.paid_at || payment.created_at),
      client: payment.client?.name || 'Client',
      freelancer: payment.order?.freelancer?.name || 'Freelancer',
      category: payment.order?.project?.category?.name || payment.order?.service?.category?.name || 'Umum',
      paymentMethod: payment.payment_method || 'Online Payment',
      rawData: payment // Keep the original data for modal view and actions
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

  // All transactions come directly from the backend already filtered
  const currentTransactions = transactions;
  
  // Pagination is now handled by the backend
  const totalPages = payments.last_page || 1;
  const totalTransactions = payments.total || 0;
  const indexOfFirstTransaction = ((currentPage - 1) * payments.per_page) + 1;
  const indexOfLastTransaction = Math.min(currentPage * payments.per_page, totalTransactions);
  
  // Update pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchPayments(pageNumber, filterStatus);
  };

  const viewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };
  
  // Update payment status
  const updatePaymentStatus = (paymentId, newStatus) => {
    axios.put(`/api/admin/payments/${paymentId}/status`, {
      status: newStatus
    })
    .then(response => {
      // Refresh the payments data
      fetchPayments(currentPage, filterStatus);
      
      // If we're viewing the details, close the modal
      if (showTransactionModal) {
        setShowTransactionModal(false);
      }
    })
    .catch(error => {
      console.error('Error updating payment status:', error);
      alert('Terjadi kesalahan saat memperbarui status pembayaran.');
    });
  };
  
  // Generate report data
  const generateReport = () => {
    setIsGeneratingReport(true);
    
    // Call the API endpoint to get filtered data
    axios.get(`/api/admin/reports/payments`, {
      params: {
        startDate: reportDates.startDate,
        endDate: reportDates.endDate
      }
    })
    .then(response => {
      setReportData(response.data);
      setIsGeneratingReport(false);
    })
    .catch(error => {
      console.error('Error generating report:', error);
      setIsGeneratingReport(false);
      alert('Terjadi kesalahan saat membuat laporan.');
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Pembayaran</h1>
        <p className="text-sm text-gray-600">Kelola semua transaksi pembayaran dalam platform.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Pembayaran"
          value={stats.totalPayments.toString()}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        
        <StatCard
          title="Total Pendapatan"
          value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats.totalAmount)}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          bgColor="bg-green-50"
          textColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        
        <StatCard
          title="Komisi Platform"
          value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats.totalCommission)}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          bgColor="bg-purple-50"
          textColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        
        <StatCard
          title="Pembayaran Menunggu"
          value={stats.pendingPayments.toString()}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
          iconBgColor="bg-yellow-100"
        />
      </div>
      
      {/* Actions Row */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {filterStatus === 'Semua Status' ? 'Filter' : `Filter: ${filterStatus}`}
          </button>
          
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Cari transaksi..."
              className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            href="/admin/payments/create" 
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Pembayaran
          </Link>
          
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Report
          </button>
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center my-8">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium text-gray-500">Memuat data...</span>
        </div>
      )}
      
      {/* Transaction Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTransactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 ${transaction.project.bgColor} ${transaction.project.textColor} flex items-center justify-center rounded-md`}>
                      {transaction.project.code}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.project.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.amount}</div>
                  <div className="text-xs text-gray-500">Fee: {transaction.commission}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.status === 'Dibayar' ? 'bg-green-100 text-green-800' : 
                    transaction.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-800' :
                    transaction.status === 'Gagal' ? 'bg-red-100 text-red-800' :
                    transaction.status === 'Dikembalikan' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => viewTransactionDetails(transaction)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstTransaction}-{Math.min(indexOfLastTransaction, totalTransactions)} of {totalTransactions} transactions
          </div>
          <div className="flex space-x-1">
            {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="px-3 py-1 text-sm font-medium rounded bg-white text-gray-700 hover:bg-gray-50"
              >
                &laquo;
              </button>
            )}
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around the current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    currentPage === pageNum
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {currentPage < totalPages && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="px-3 py-1 text-sm font-medium rounded bg-white text-gray-700 hover:bg-gray-50"
              >
                &raquo;
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Filter Transactions</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
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
            
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="Semua Status">Semua Status</option>
                <option value="paid">Dibayar</option>
                <option value="pending">Menunggu</option>
                <option value="failed">Gagal</option>
                <option value="refunded">Dikembalikan</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setFilterStatus('Semua Status');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={applyFilter}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Transaction Detail Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Transaction Details</h3>
              <button
                onClick={() => setShowTransactionModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
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
            
            <div className="border-t border-gray-200 pt-4">
              <div className="mb-6 flex justify-between">
                <div>
                  <h4 className="font-medium text-xl text-gray-900">{selectedTransaction.id}</h4>
                  <p className="text-gray-500 text-sm">{selectedTransaction.date}</p>
                </div>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full self-start ${
                  selectedTransaction.status === 'Dibayar' ? 'bg-green-100 text-green-800' : 
                  selectedTransaction.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-800' :
                  selectedTransaction.status === 'Gagal' ? 'bg-red-100 text-red-800' :
                  selectedTransaction.status === 'Dikembalikan' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedTransaction.status}
                </span>
              </div>
              
              {/* Status Update Buttons */}
              {selectedTransaction.rawData && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Update Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updatePaymentStatus(selectedTransaction.rawData.id, 'paid')}
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        selectedTransaction.status === 'Dibayar'
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                      disabled={selectedTransaction.status === 'Dibayar'}
                    >
                      Tandai Dibayar
                    </button>
                    <button
                      onClick={() => updatePaymentStatus(selectedTransaction.rawData.id, 'pending')}
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        selectedTransaction.status === 'Menunggu'
                          ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
                          : 'bg-yellow-500 text-white hover:bg-yellow-600'
                      }`}
                      disabled={selectedTransaction.status === 'Menunggu'}
                    >
                      Tandai Menunggu
                    </button>
                    <button
                      onClick={() => updatePaymentStatus(selectedTransaction.rawData.id, 'failed')}
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        selectedTransaction.status === 'Gagal'
                          ? 'bg-red-100 text-red-800 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      disabled={selectedTransaction.status === 'Gagal'}
                    >
                      Tandai Gagal
                    </button>
                    <button
                      onClick={() => updatePaymentStatus(selectedTransaction.rawData.id, 'refunded')}
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        selectedTransaction.status === 'Dikembalikan'
                          ? 'bg-purple-100 text-purple-800 cursor-not-allowed'
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                      disabled={selectedTransaction.status === 'Dikembalikan'}
                    >
                      Tandai Dikembalikan
                    </button>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-sm font-medium text-gray-500">Project/Service</span>
                    <span className="block text-base font-medium text-gray-900">{selectedTransaction.project.name}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Category</span>
                    <span className="block text-base font-medium text-gray-900">{selectedTransaction.category}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Client</span>
                    <span className="block text-base font-medium text-gray-900">{selectedTransaction.client}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Freelancer</span>
                    <span className="block text-base font-medium text-gray-900">{selectedTransaction.freelancer}</span>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Amount</span>
                    <span className="block text-base font-medium text-gray-900">{selectedTransaction.amount}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Platform Fee</span>
                    <span className="block text-base font-medium text-gray-900">{selectedTransaction.commission}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Payment Method</span>
                    <span className="block text-base font-medium text-gray-900">{selectedTransaction.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              {selectedTransaction.rawData?.receipt_url && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Receipt</h4>
                  <div className="border border-gray-300 rounded-lg p-2">
                    <a
                      href={selectedTransaction.rawData.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      View Receipt
                    </a>
                  </div>
                </div>
              )}
              
              {selectedTransaction.rawData?.notes && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {selectedTransaction.rawData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Report Generator Modal */}
      {showReportModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Generate Payment Report</h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
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
              <h4 className="text-sm font-medium text-gray-500 mb-3">Select Report Period</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={reportDates.startDate}
                    onChange={(e) => setReportDates({...reportDates, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={reportDates.endDate}
                    onChange={(e) => setReportDates({...reportDates, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6 flex justify-center">
              <button
                onClick={generateReport}
                disabled={isGeneratingReport}
                className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 ${isGeneratingReport ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isGeneratingReport ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : 'Preview Report'}
              </button>
            </div>
            
            {reportData && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Report Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Total Revenue</p>
                      <p className="font-bold text-lg">
                        {new Intl.NumberFormat('id-ID', { 
                          style: 'currency', 
                          currency: 'IDR',
                          maximumFractionDigits: 0 
                        }).format(reportData.summary.totalAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Platform Commission</p>
                      <p className="font-bold text-lg">
                        {new Intl.NumberFormat('id-ID', { 
                          style: 'currency', 
                          currency: 'IDR',
                          maximumFractionDigits: 0 
                        }).format(reportData.summary.totalCommission)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Freelancer Payments</p>
                      <p className="font-bold text-lg">
                        {new Intl.NumberFormat('id-ID', { 
                          style: 'currency', 
                          currency: 'IDR',
                          maximumFractionDigits: 0 
                        }).format(reportData.summary.freelancerAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Total Transactions</p>
                      <p className="font-bold text-lg">{reportData.summary.count}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Report Format</h4>
                  <div className="flex gap-3">
                    <a 
                      href={`/api/admin/reports/payments/download?format=pdf&startDate=${reportDates.startDate}&endDate=${reportDates.endDate}`}
                      target="_blank"
                      className="flex-1 py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 text-center"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        PDF
                      </span>
                    </a>
                    <a 
                      href={`/api/admin/reports/payments/download?format=excel&startDate=${reportDates.startDate}&endDate=${reportDates.endDate}`}
                      target="_blank"
                      className="flex-1 py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 text-center"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Excel
                      </span>
                    </a>
                  </div>
                </div>
              </>
            )}

            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => setShowReportModal(false)}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Payments;
