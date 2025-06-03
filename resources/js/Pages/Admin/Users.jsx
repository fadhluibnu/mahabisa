import React, { useState } from 'react';
import AdminLayout from './Components/AdminLayout';
import StatCard from './Components/StatCard';
import { Link } from '@inertiajs/react';

const Users = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <AdminLayout
      title='Kelola Pengguna'
      subtitle='Manajemen data pengguna MahaBisa'
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
          title='Freelancer'
          value='1,243'
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
          value='876'
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
          value='48'
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
          <h3 className='font-bold text-lg text-gray-900'>Daftar Pengguna</h3>

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

            <Link
              href='/admin/users/create'
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
            </Link>
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
              <tr className='border-b border-gray-100 text-sm'>
                <td className='py-3'>
                  <div className='flex items-center'>
                    <div className='w-8 h-8 rounded-full mr-3 flex items-center justify-center overflow-hidden'>
                      <img
                        src='https://randomuser.me/api/portraits/women/23.jpg'
                        alt='User'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span className='font-medium text-gray-900'>
                      Dewi Susanti
                    </span>
                  </div>
                </td>
                <td className='py-3'>dewisusanti@gmail.com</td>
                <td className='py-3 hidden sm:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800'>
                    Freelancer
                  </span>
                </td>
                <td className='py-3 hidden md:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>
                    Aktif
                  </span>
                </td>
                <td className='py-3 hidden lg:table-cell'>23 Mei 2023</td>
                <td className='py-3 text-right'>
                  <div className='flex justify-end space-x-2'>
                    <button className='p-1 rounded hover:bg-gray-100'>
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
                      href='/admin/users/1/edit'
                      className='p-1 rounded hover:bg-gray-100'
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
                    <button className='p-1 rounded hover:bg-gray-100'>
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
              <tr className='border-b border-gray-100 text-sm'>
                <td className='py-3'>
                  <div className='flex items-center'>
                    <div className='w-8 h-8 rounded-full mr-3 flex items-center justify-center overflow-hidden'>
                      <img
                        src='https://randomuser.me/api/portraits/men/54.jpg'
                        alt='User'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span className='font-medium text-gray-900'>
                      Rudi Hartono
                    </span>
                  </div>
                </td>
                <td className='py-3'>rudi.hartono@example.com</td>
                <td className='py-3 hidden sm:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>
                    Klien
                  </span>
                </td>
                <td className='py-3 hidden md:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>
                    Aktif
                  </span>
                </td>
                <td className='py-3 hidden lg:table-cell'>15 Mei 2023</td>
                <td className='py-3 text-right'>
                  <div className='flex justify-end space-x-2'>
                    <button className='p-1 rounded hover:bg-gray-100'>
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
                      href='/admin/users/1/edit'
                      className='p-1 rounded hover:bg-gray-100'
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
                    <button className='p-1 rounded hover:bg-gray-100'>
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
              <tr className='border-b border-gray-100 text-sm'>
                <td className='py-3'>
                  <div className='flex items-center'>
                    <div className='w-8 h-8 rounded-full mr-3 flex items-center justify-center overflow-hidden'>
                      <img
                        src='https://randomuser.me/api/portraits/women/67.jpg'
                        alt='User'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span className='font-medium text-gray-900'>
                      Nina Maulida
                    </span>
                  </div>
                </td>
                <td className='py-3'>nina.maulida@example.com</td>
                <td className='py-3 hidden sm:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800'>
                    Freelancer
                  </span>
                </td>
                <td className='py-3 hidden md:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800'>
                    Pending
                  </span>
                </td>
                <td className='py-3 hidden lg:table-cell'>10 Mei 2023</td>
                <td className='py-3 text-right'>
                  <div className='flex justify-end space-x-2'>
                    <button className='p-1 rounded hover:bg-gray-100'>
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
                      href='/admin/users/1/edit'
                      className='p-1 rounded hover:bg-gray-100'
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
                    <button className='p-1 rounded hover:bg-gray-100'>
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
              <tr className='border-b border-gray-100 text-sm'>
                <td className='py-3'>
                  <div className='flex items-center'>
                    <div className='w-8 h-8 rounded-full mr-3 flex items-center justify-center overflow-hidden'>
                      <img
                        src='https://randomuser.me/api/portraits/men/32.jpg'
                        alt='User'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span className='font-medium text-gray-900'>
                      Agus Pratama
                    </span>
                  </div>
                </td>
                <td className='py-3'>agus.pratama@example.com</td>
                <td className='py-3 hidden sm:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800'>
                    Freelancer
                  </span>
                </td>
                <td className='py-3 hidden md:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>
                    Aktif
                  </span>
                </td>
                <td className='py-3 hidden lg:table-cell'>5 Mei 2023</td>
                <td className='py-3 text-right'>
                  <div className='flex justify-end space-x-2'>
                    <button className='p-1 rounded hover:bg-gray-100'>
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
                      href='/admin/users/1/edit'
                      className='p-1 rounded hover:bg-gray-100'
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
                    <button className='p-1 rounded hover:bg-gray-100'>
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
              <tr className='text-sm'>
                <td className='py-3'>
                  <div className='flex items-center'>
                    <div className='w-8 h-8 rounded-full mr-3 flex items-center justify-center overflow-hidden'>
                      <img
                        src='https://randomuser.me/api/portraits/women/44.jpg'
                        alt='User'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span className='font-medium text-gray-900'>
                      Siska Wijaya
                    </span>
                  </div>
                </td>
                <td className='py-3'>siska.wijaya@example.com</td>
                <td className='py-3 hidden sm:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>
                    Klien
                  </span>
                </td>
                <td className='py-3 hidden md:table-cell'>
                  <span className='px-2 py-1 rounded-full text-xs bg-red-100 text-red-800'>
                    Tidak Aktif
                  </span>
                </td>
                <td className='py-3 hidden lg:table-cell'>1 Mei 2023</td>
                <td className='py-3 text-right'>
                  <div className='flex justify-end space-x-2'>
                    <button className='p-1 rounded hover:bg-gray-100'>
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
                      href='/admin/users/1/edit'
                      className='p-1 rounded hover:bg-gray-100'
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
                    <button className='p-1 rounded hover:bg-gray-100'>
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
            </tbody>
          </table>
        </div>

        <div className='flex justify-between items-center mt-6'>
          <div className='text-sm text-gray-600'>
            Menampilkan 1-5 dari 120 data
          </div>

          <div className='flex'>
            <button className='px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50'>
              Sebelumnya
            </button>
            <button className='px-3 py-1 text-sm font-medium text-white bg-indigo-600 border border-indigo-600'>
              1
            </button>
            <button className='px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'>
              2
            </button>
            <button className='px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'>
              3
            </button>
            <button className='px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'>
              ...
            </button>
            <button className='px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'>
              24
            </button>
            <button className='px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50'>
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

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

            <form>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                  Jenis Pengguna
                </label>
                <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'>
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
                <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'>
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
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700 text-xs font-medium mb-1'>
                      Sampai
                    </label>
                    <input
                      type='date'
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-end mt-6'>
                <button
                  type='button'
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-3 hover:bg-gray-50'
                >
                  Reset
                </button>
                <button
                  type='submit'
                  onClick={() => setShowFilterModal(false)}
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
