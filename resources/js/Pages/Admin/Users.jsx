import React, { useState, useEffect } from 'react';
import AdminLayout from './Components/AdminLayout';
import StatCard from './Components/StatCard';
import { Link } from '@inertiajs/react';

const Users = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Filter states
  const [filters, setFilters] = useState({
    userType: 'Semua Jenis',
    status: 'Semua Status',
    startDate: '',
    endDate: ''
  });
  
  // Sample user data
  const users = [
    {
      id: 1,
      name: 'Dewi Susanti',
      email: 'dewisusanti@gmail.com',
      type: 'Freelancer',
      status: 'Aktif',
      joinDate: '23 Mei 2023',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    {
      id: 2,
      name: 'Rudi Hartono',
      email: 'rudi.hartono@example.com',
      type: 'Klien',
      status: 'Aktif',
      joinDate: '15 Mei 2023',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
    },
    {
      id: 3,
      name: 'Nina Maulida',
      email: 'nina.maulida@example.com',
      type: 'Freelancer',
      status: 'Pending',
      joinDate: '10 Mei 2023',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    },
    {
      id: 4,
      name: 'Agus Pratama',
      email: 'agus.pratama@example.com',
      type: 'Freelancer',
      status: 'Aktif',
      joinDate: '5 Mei 2023',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 5,
      name: 'Siska Wijaya',
      email: 'siska.wijaya@example.com',
      type: 'Klien',
      status: 'Tidak Aktif',
      joinDate: '1 Mei 2023',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 6,
      name: 'Budi Setiawan',
      email: 'budi.setiawan@example.com',
      type: 'Admin',
      status: 'Aktif',
      joinDate: '28 April 2023',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    {
      id: 7,
      name: 'Maya Putri',
      email: 'maya.putri@example.com',
      type: 'Freelancer',
      status: 'Aktif',
      joinDate: '25 April 2023',
      avatar: 'https://randomuser.me/api/portraits/women/35.jpg'
    },
    {
      id: 8,
      name: 'Dani Santoso',
      email: 'dani.santoso@example.com',
      type: 'Klien',
      status: 'Aktif',
      joinDate: '20 April 2023',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: 9,
      name: 'Rini Anggraini',
      email: 'rini.anggraini@example.com',
      type: 'Freelancer',
      status: 'Tidak Aktif',
      joinDate: '15 April 2023',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    {
      id: 10,
      name: 'Joko Widodo',
      email: 'joko.widodo@example.com',
      type: 'Klien',
      status: 'Aktif',
      joinDate: '10 April 2023',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    {
      id: 11,
      name: 'Anita Sari',
      email: 'anita.sari@example.com',
      type: 'Freelancer',
      status: 'Aktif',
      joinDate: '5 April 2023',
      avatar: 'https://randomuser.me/api/portraits/women/14.jpg'
    },
    {
      id: 12,
      name: 'Hendra Gunawan',
      email: 'hendra.gunawan@example.com',
      type: 'Klien',
      status: 'Pending',
      joinDate: '1 April 2023',
      avatar: 'https://randomuser.me/api/portraits/men/18.jpg'
    }
  ];

  // Apply filters to users
  const getFilteredUsers = () => {
    return users.filter(user => {
      // Filter by user type
      if (filters.userType !== 'Semua Jenis' && user.type !== filters.userType) {
        return false;
      }
      
      // Filter by status
      if (filters.status !== 'Semua Status' && user.status !== filters.status) {
        return false;
      }
      
      // Filter by date range
      if (filters.startDate && filters.endDate) {
        // Convert string dates to Date objects for comparison
        const userJoinDate = new Date(convertToDateFormat(user.joinDate));
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        
        // Set end date to end of day for inclusive comparison
        endDate.setHours(23, 59, 59, 999);
        
        if (userJoinDate < startDate || userJoinDate > endDate) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  // Helper function to convert display date format (e.g., "23 Mei 2023") to standard date format
  const convertToDateFormat = (displayDate) => {
    const months = {
      'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04', 
      'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08', 
      'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
    };
    
    const parts = displayDate.split(' ');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = months[parts[1]];
      const year = parts[2];
      
      return `${year}-${month}-${day}`;
    }
    
    return '2023-01-01'; // fallback date
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Apply filters and reset pagination
  const applyFilters = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when applying filters
    setShowFilterModal(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      userType: 'Semua Jenis',
      status: 'Semua Status',
      startDate: '',
      endDate: ''
    });
    setCurrentPage(1);
  };

  const filteredUsers = getFilteredUsers();
  
  // Pagination calculation
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Always show first page
    pageNumbers.push(1);
    
    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    
    // Always show last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    // Add ellipsis indicators
    return pageNumbers.reduce((result, page, index, array) => {
      if (index > 0 && page > array[index - 1] + 1) {
        result.push('ellipsis' + index);
      }
      result.push(page);
      return result;
    }, []);
  };

  // Handle view user details
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };
  
  // Handle delete user
  const handleDeleteClick = (user, e) => {
    e.stopPropagation(); // Prevent row click event
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  
  // Handle confirm delete
  const handleConfirmDelete = () => {
    // In a real app, you would call an API to delete the user
    // For now, we'll just close the modal
    setShowDeleteModal(false);
    
    // You could show a success message here
    alert(`User ${selectedUser.name} has been deleted successfully!`);
  };

  // Get counts for statistics
  const totalUserCount = users.length;
  const freelancerCount = users.filter(user => user.type === 'Freelancer').length;
  const clientCount = users.filter(user => user.type === 'Klien').length;
  const recentUserCount = users.filter(user => {
    const date = new Date(convertToDateFormat(user.joinDate));
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return date >= thirtyDaysAgo;
  }).length;

  return (
    <AdminLayout
      title='Kelola Pengguna'
      subtitle='Manajemen data pengguna MahaBisa'
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8'>
        <StatCard
          title='Total Pengguna'
          value={totalUserCount.toString()}
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
          title='Freelancer'
          value={freelancerCount.toString()}
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
                d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
          }
        />

        <StatCard
          title='Klien'
          value={clientCount.toString()}
          percentage='14.3'
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
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          }
        />

        <StatCard
          title='Pengguna Baru'
          value={recentUserCount.toString()}
          percentage='4.3'
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
                d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
              />
            </svg>
          }
        />
      </div>

      <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='font-bold text-lg text-gray-900'>
            Daftar Pengguna 
            {filters.userType !== 'Semua Jenis' || filters.status !== 'Semua Status' || filters.startDate || filters.endDate ? 
              <span className="ml-2 text-sm font-normal text-indigo-600">(Filtered)</span> : ''}
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

            <button
              onClick={() => setShowAddModal(true)}
              className='flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700'
            >
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
              Tambah Pengguna
            </button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full table-auto'>
            <thead>
              <tr className='text-left text-gray-500 text-sm border-b border-gray-200'>
                <th className='pb-3 font-medium'>Nama</th>
                <th className='pb-3 font-medium'>Email</th>
                <th className='pb-3 font-medium hidden sm:table-cell'>Jenis</th>
                <th className='pb-3 font-medium hidden md:table-cell'>
                  Status
                </th>
                <th className='pb-3 font-medium hidden lg:table-cell'>
                  Tanggal Bergabung
                </th>
                <th className='pb-3 font-medium text-right'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className='border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer' onClick={() => handleViewDetails(user)}>
                  <td className='py-3'>
                    <div className='flex items-center'>
                      <div className='w-8 h-8 rounded-full mr-3 flex items-center justify-center overflow-hidden'>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <span className='font-medium text-gray-900'>
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className='py-3'>{user.email}</td>
                  <td className='py-3 hidden sm:table-cell'>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.type === 'Freelancer' 
                        ? 'bg-purple-100 text-purple-800' 
                        : user.type === 'Klien'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className='py-3 hidden md:table-cell'>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Aktif' 
                        ? 'bg-green-100 text-green-800' 
                        : user.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className='py-3 hidden lg:table-cell'>{user.joinDate}</td>
                  <td className='py-3 text-right'>
                    <div className='flex justify-end space-x-2'>
                      <button 
                        className='p-1 rounded hover:bg-gray-100'
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleViewDetails(user);
                        }}
                      >
                        <svg
                          className='w-5 h-5 text-gray-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                      </button>
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className='p-1 rounded hover:bg-gray-100'
                        onClick={(e) => e.stopPropagation()} // Prevent row click
                      >
                        <svg
                          className='w-5 h-5 text-blue-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                          />
                        </svg>
                      </Link>
                      <button 
                        className='p-1 rounded hover:bg-gray-100'
                        onClick={(e) => handleDeleteClick(user, e)}
                      >
                        <svg
                          className='w-5 h-5 text-red-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col md:flex-row gap-4 justify-between items-center mt-6'>
          <div className='text-sm text-gray-600'>
            Menampilkan {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, totalUsers)} dari {totalUsers} data
          </div>

          <div className='flex'>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm font-medium ${
                currentPage === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              } bg-white border border-gray-300 rounded-l-md`}
            >
              Sebelumnya
            </button>
            
            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm font-medium ${
                    currentPage === page 
                      ? 'text-white bg-indigo-600 border-indigo-600' 
                      : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                  } border`}
                >
                  {page}
                </button>
              ) : (
                <button 
                  key={page}
                  className='px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  disabled
                >
                  ...
                </button>
              )
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm font-medium ${
                currentPage === totalPages 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              } bg-white border border-gray-300 rounded-r-md`}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Modal User Details */}
      {showDetailsModal && selectedUser && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='fixed inset-0 bg-black opacity-50'
            onClick={() => setShowDetailsModal(false)}
          ></div>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='font-bold text-lg text-gray-900'>
                Detail Pengguna
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
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

            <div className='flex flex-col md:flex-row gap-6'>
              {/* User Avatar and Basic Info */}
              <div className='md:w-1/3 flex flex-col items-center'>
                <div className='w-32 h-32 rounded-full overflow-hidden mb-4'>
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name} 
                    className='w-full h-full object-cover' 
                  />
                </div>
                <h4 className='text-xl font-bold text-gray-900 mb-1'>{selectedUser.name}</h4>
                <p className='text-sm text-gray-600 mb-2'>{selectedUser.email}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedUser.type === 'Freelancer' 
                    ? 'bg-purple-100 text-purple-800' 
                    : selectedUser.type === 'Klien'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedUser.type}
                </span>
              </div>

              {/* User Details */}
              <div className='md:w-2/3'>
                <div className='bg-gray-50 p-4 rounded-lg mb-4'>
                  <h5 className='font-medium text-gray-900 mb-3'>Informasi Pengguna</h5>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>ID Pengguna</p>
                      <p className='text-sm font-medium'>{selectedUser.id}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Status</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        selectedUser.status === 'Aktif' 
                          ? 'bg-green-100 text-green-800' 
                          : selectedUser.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Tanggal Bergabung</p>
                      <p className='text-sm font-medium'>{selectedUser.joinDate}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Terakhir Login</p>
                      <p className='text-sm font-medium'>Hari ini, 10:45</p>
                    </div>
                  </div>
                </div>

                <div className='mb-4'>
                  <h5 className='font-medium text-gray-900 mb-3'>Aktivitas Terbaru</h5>
                  <div className='space-y-3'>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                      <p className='text-sm text-gray-900'>Login ke platform</p>
                      <p className='text-xs text-gray-500'>Hari ini, 10:45</p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                      <p className='text-sm text-gray-900'>Memperbarui profil</p>
                      <p className='text-xs text-gray-500'>Kemarin, 15:30</p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                      <p className='text-sm text-gray-900'>Mendaftar ke platform</p>
                      <p className='text-xs text-gray-500'>{selectedUser.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end mt-6 gap-3'>
              <button
                onClick={() => setShowDetailsModal(false)}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
              >
                Tutup
              </button>
              <Link
                href={`/admin/users/${selectedUser.id}/edit`}
                className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700'
              >
                Edit Pengguna
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete Confirmation */}
      {showDeleteModal && selectedUser && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='fixed inset-0 bg-black opacity-50'
            onClick={() => setShowDeleteModal(false)}
          ></div>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10'>
            <div className='flex items-center justify-center mb-6'>
              <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
            </div>
            
            <h3 className='text-center font-bold text-lg text-gray-900 mb-2'>
              Hapus Pengguna
            </h3>
            
            <p className='text-center text-gray-600 mb-6'>
              Apakah Anda yakin ingin menghapus pengguna <span className='font-medium'>{selectedUser.name}</span>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className='flex justify-center gap-3'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className='px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700'
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Pengguna */}
      {showAddModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='fixed inset-0 bg-black opacity-50'
            onClick={() => setShowAddModal(false)}
          ></div>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-bold text-lg text-gray-900'>
                Tambah Pengguna Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
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

            <form>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Nama Lengkap
                </label>
                <input
                  type='text'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Jenis Pengguna
                </label>
                <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                  <option>Pilih jenis pengguna</option>
                  <option>Freelancer</option>
                  <option>Klien</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Konfirmasi Password
                </label>
                <input
                  type='password'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div className='flex justify-end mt-6'>
                <button
                  type='button'
                  onClick={() => setShowAddModal(false)}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50'
                >
                  Batal
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700'
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Filter */}
      {showFilterModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='fixed inset-0 bg-black opacity-50'
            onClick={() => setShowFilterModal(false)}
          ></div>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-bold text-lg text-gray-900'>
                Filter Pengguna
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

            <form onSubmit={applyFilters}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Jenis Pengguna
                </label>
                <select 
                  name="userType"
                  value={filters.userType}
                  onChange={handleFilterChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                >
                  <option>Semua Jenis</option>
                  <option>Freelancer</option>
                  <option>Klien</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Status
                </label>
                <select 
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                >
                  <option>Semua Status</option>
                  <option>Aktif</option>
                  <option>Tidak Aktif</option>
                  <option>Pending</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Tanggal Bergabung
                </label>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-gray-700 text-xs font-medium mb-1'>
                      Dari
                    </label>
                    <input
                      type='date'
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700 text-xs font-medium mb-1'>
                      Sampai
                    </label>
                    <input
                      type='date'
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-end mt-6'>
                <button
                  type='button'
                  onClick={resetFilters}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50'
                >
                  Reset
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700'
                >
                  Terapkan Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Users;
