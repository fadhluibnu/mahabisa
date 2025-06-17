import React, { useState } from 'react';
import AdminLayout from './Components/AdminLayout';
import StatCard from './Components/StatCard';
import { Link, Head, useForm } from '@inertiajs/react';

const Users = ({ users, user, stats, flash }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(users.current_page || 1);
  const [itemsPerPage] = useState(users.per_page || 10);

  // Form for adding a new user
  const addUserForm = useForm({
    name: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: '',
  });

  // Filter states
  const [filters, setFilters] = useState({
    userType: 'Semua Jenis',
    status: 'Semua Status',
    startDate: '',
    endDate: '',
  });

  // Get user role map for display
  const getUserRoleDisplay = role => {
    switch (role.toLowerCase()) {
      case 'client':
        return 'Klien';
      case 'freelancer':
        return 'Freelancer';
      case 'admin':
        return 'Admin';
      default:
        return 'Pengguna';
    }
  };

  // Get user status for display
  const getUserStatusDisplay = user => {
    return user.email_verified_at ? 'Aktif' : 'Pending';
  };

  // Apply filters to users
  const getFilteredUsers = () => {
    return users.data.filter(user => {
      // Filter by user type
      if (
        filters.userType !== 'Semua Jenis' &&
        getUserRoleDisplay(user.role) !== filters.userType
      ) {
        return false;
      }

      // Filter by status
      const userStatus = getUserStatusDisplay(user);
      if (filters.status !== 'Semua Status' && userStatus !== filters.status) {
        return false;
      }

      // Filter by join date
      if (filters.startDate) {
        const joinDate = new Date(user.created_at);
        const startDate = new Date(filters.startDate);
        if (joinDate < startDate) {
          return false;
        }
      }

      if (filters.endDate) {
        const joinDate = new Date(user.created_at);
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999); // Set to end of day
        if (joinDate > endDate) {
          return false;
        }
      }

      return true;
    });
  };

  // Handle filter changes
  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters and reset pagination
  const applyFilters = e => {
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
      endDate: '',
    });
    setCurrentPage(1);
  };

  const filteredUsers = getFilteredUsers();

  // Handle pagination either from Laravel pagination (when not filtered) or client-side (when filtered)
  const totalUsers = filteredUsers.length;
  const totalPages =
    filters.userType !== 'Semua Jenis' ||
    filters.status !== 'Semua Status' ||
    filters.startDate ||
    filters.endDate
      ? Math.ceil(totalUsers / itemsPerPage)
      : Math.ceil(users.total / users.per_page);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageChange = pageNumber => {
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
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
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
  const handleViewDetails = user => {
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
    // Use Inertia for the delete request
    window.Inertia.delete(`/admin/users/${selectedUser.id}`, {
      onSuccess: () => {
        setShowDeleteModal(false);
        // The page will refresh with updated data from the backend
      },
      onError: errors => {
        alert('Error deleting user: ' + (errors.message || 'Unknown error'));
        setShowDeleteModal(false);
      },
    });
  };

  // Format date to readable format
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <AdminLayout
      title='Kelola Pengguna'
      subtitle='Manajemen data pengguna MahaBisa'
    >
      <Head title='Kelola Pengguna - MahaBisa Admin' />

      {/* Flash Messages */}
      {flash.success && (
        <div
          className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4'
          role='alert'
        >
          <span className='block sm:inline'>{flash.success}</span>
          <button
            onClick={() =>
              window.Inertia.visit(window.location.href, {
                only: ['users', 'stats'],
              })
            }
            className='absolute top-0 bottom-0 right-0 px-4 py-3'
          >
            <svg
              className='fill-current h-6 w-6 text-green-500'
              role='button'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <title>Close</title>
              <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
            </svg>
          </button>
        </div>
      )}

      {flash.error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
          role='alert'
        >
          <span className='block sm:inline'>{flash.error}</span>
          <button
            onClick={() =>
              window.Inertia.visit(window.location.href, {
                only: ['users', 'stats'],
              })
            }
            className='absolute top-0 bottom-0 right-0 px-4 py-3'
          >
            <svg
              className='fill-current h-6 w-6 text-red-500'
              role='button'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <title>Close</title>
              <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
            </svg>
          </button>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8'>
        <StatCard
          title='Total Pengguna'
          value={stats.totalUsers.toString()}
          percentage={
            stats.newUsers > 0
              ? ((stats.newUsers / stats.totalUsers) * 100).toFixed(1)
              : '0.0'
          }
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
          value={stats.totalFreelancers.toString()}
          percentage={
            stats.totalFreelancers > 0
              ? ((stats.newFreelancers / stats.totalFreelancers) * 100).toFixed(
                  1
                )
              : '0.0'
          }
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
          value={stats.totalClients.toString()}
          percentage={
            stats.totalClients > 0
              ? ((stats.newClients / stats.totalClients) * 100).toFixed(1)
              : '0.0'
          }
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
          value={stats.newUsers.toString()}
          percentage={
            stats.newUsers > 0 && stats.lastMonthNewUsers > 0
              ? (
                  ((stats.newUsers - stats.lastMonthNewUsers) /
                    stats.lastMonthNewUsers) *
                  100
                ).toFixed(1)
              : '0.0'
          }
          trend={stats.newUsers >= stats.lastMonthNewUsers ? 'up' : 'down'}
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
            {filters.userType !== 'Semua Jenis' ||
            filters.status !== 'Semua Status' ||
            filters.startDate ||
            filters.endDate ? (
              <span className='ml-2 text-sm font-normal text-indigo-600'>
                (Filtered)
              </span>
            ) : (
              ''
            )}
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
              {currentUsers.map(user => (
                <tr
                  key={user.id}
                  className='border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer'
                  onClick={() => handleViewDetails(user)}
                >
                  <td className='py-3'>
                    <div className='flex items-center'>
                      <div className='w-8 h-8 rounded-full mr-3 flex items-center justify-center overflow-hidden'>
                        {user.profile_photo_path ? (
                          <img
                            src={user.profile_photo_path}
                            alt={user.name}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold'>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className='font-medium text-gray-900'>
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className='py-3'>{user.email}</td>
                  <td className='py-3 hidden sm:table-cell'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'freelancer'
                          ? 'bg-purple-100 text-purple-800'
                          : user.role === 'client'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {getUserRoleDisplay(user.role)}
                    </span>
                  </td>
                  <td className='py-3 hidden md:table-cell'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        getUserStatusDisplay(user) === 'Aktif'
                          ? 'bg-green-100 text-green-800'
                          : getUserStatusDisplay(user) === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {getUserStatusDisplay(user)}
                    </span>
                  </td>
                  <td className='py-3 hidden lg:table-cell'>
                    {formatDate(user.created_at)}
                  </td>
                  <td className='py-3 text-right'>
                    <div className='flex justify-end space-x-2'>
                      <button
                        className='p-1 rounded hover:bg-gray-100'
                        onClick={e => {
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
                        onClick={e => e.stopPropagation()} // Prevent row click
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
                        onClick={e => handleDeleteClick(user, e)}
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
            Menampilkan {indexOfFirstUser + 1}-
            {Math.min(indexOfLastUser, totalUsers)} dari {totalUsers} data
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

            {getPageNumbers().map((page, index) =>
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
            )}

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
                  {selectedUser.profile_photo_path ? (
                    <img
                      src={selectedUser.profile_photo_path}
                      alt={selectedUser.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 text-4xl font-semibold'>
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <h4 className='text-xl font-bold text-gray-900 mb-1'>
                  {selectedUser.name}
                </h4>
                <p className='text-sm text-gray-600 mb-2'>
                  {selectedUser.email}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedUser.role === 'freelancer'
                      ? 'bg-purple-100 text-purple-800'
                      : selectedUser.role === 'client'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {getUserRoleDisplay(selectedUser.role)}
                </span>
              </div>

              {/* User Details */}
              <div className='md:w-2/3'>
                <div className='bg-gray-50 p-4 rounded-lg mb-4'>
                  <h5 className='font-medium text-gray-900 mb-3'>
                    Informasi Pengguna
                  </h5>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>ID Pengguna</p>
                      <p className='text-sm font-medium'>{selectedUser.id}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Status</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          getUserStatusDisplay(selectedUser) === 'Aktif'
                            ? 'bg-green-100 text-green-800'
                            : getUserStatusDisplay(selectedUser) === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {getUserStatusDisplay(selectedUser)}
                      </span>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>
                        Tanggal Bergabung
                      </p>
                      <p className='text-sm font-medium'>
                        {formatDate(selectedUser.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>
                        Terakhir Login
                      </p>
                      <p className='text-sm font-medium'>
                        {selectedUser.last_login_at || 'Belum pernah login'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mb-4'>
                  <h5 className='font-medium text-gray-900 mb-3'>
                    Aktivitas Terbaru
                  </h5>
                  <div className='space-y-3'>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                      <p className='text-sm text-gray-900'>Login ke platform</p>
                      <p className='text-xs text-gray-500'>
                        {selectedUser.last_login_at || 'Belum pernah login'}
                      </p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                      <p className='text-sm text-gray-900'>
                        Memperbarui profil
                      </p>
                      <p className='text-xs text-gray-500'>
                        {selectedUser.updated_at
                          ? formatDate(selectedUser.updated_at)
                          : 'Belum pernah diperbarui'}
                      </p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                      <p className='text-sm text-gray-900'>
                        Mendaftar ke platform
                      </p>
                      <p className='text-xs text-gray-500'>
                        {formatDate(selectedUser.created_at)}
                      </p>
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
              Apakah Anda yakin ingin menghapus pengguna{' '}
              <span className='font-medium'>{selectedUser.name}</span>? Tindakan
              ini tidak dapat dibatalkan.
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

            <form
              onSubmit={e => {
                e.preventDefault();
                window.Inertia.post('/admin/users/store', addUserForm.data, {
                  onSuccess: () => {
                    setShowAddModal(false);
                    addUserForm.reset();
                  },
                });
              }}
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Nama Lengkap
                </label>
                <input
                  type='text'
                  name='name'
                  value={addUserForm.data.name || ''}
                  onChange={e => addUserForm.setData('name', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                {addUserForm.errors.name && (
                  <div className='text-red-500 text-sm mt-1'>
                    {addUserForm.errors.name}
                  </div>
                )}
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={addUserForm.data.email || ''}
                  onChange={e => addUserForm.setData('email', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                {addUserForm.errors.email && (
                  <div className='text-red-500 text-sm mt-1'>
                    {addUserForm.errors.email}
                  </div>
                )}
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Jenis Pengguna
                </label>
                <select
                  name='role'
                  value={addUserForm.data.role || ''}
                  onChange={e => addUserForm.setData('role', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                >
                  <option value=''>Pilih jenis pengguna</option>
                  <option value='freelancer'>Freelancer</option>
                  <option value='client'>Klien</option>
                  <option value='admin'>Admin</option>
                </select>
                {addUserForm.errors.role && (
                  <div className='text-red-500 text-sm mt-1'>
                    {addUserForm.errors.role}
                  </div>
                )}
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={addUserForm.data.password || ''}
                  onChange={e =>
                    addUserForm.setData('password', e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                {addUserForm.errors.password && (
                  <div className='text-red-500 text-sm mt-1'>
                    {addUserForm.errors.password}
                  </div>
                )}
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Konfirmasi Password
                </label>
                <input
                  type='password'
                  name='password_confirmation'
                  value={addUserForm.data.password_confirmation || ''}
                  onChange={e =>
                    addUserForm.setData('password_confirmation', e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div className='flex justify-end mt-6'>
                <button
                  type='button'
                  onClick={() => {
                    setShowAddModal(false);
                    addUserForm.reset();
                  }}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50'
                >
                  Batal
                </button>
                <button
                  type='submit'
                  disabled={addUserForm.processing}
                  className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-75'
                >
                  {addUserForm.processing ? 'Menyimpan...' : 'Simpan'}
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
                  name='userType'
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
                  name='status'
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
                      name='startDate'
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
                      name='endDate'
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
