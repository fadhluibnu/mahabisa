import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

const Dashboard = () => {
  const { auth } = usePage().props;
  const user = auth.user;

  return (
    <>
      <Head title='MahaBisa | Dashboard' />
      <div className='min-h-screen bg-gray-50'>
        <header className='bg-white shadow'>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
          </div>
        </header>

        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-white border-b border-gray-200'>
              <h2 className='text-xl font-semibold mb-4'>
                Selamat datang, {user.name}!
              </h2>

              <div className='mt-6'>
                <p className='text-gray-700'>
                  Selamat datang di dashboard MahaBisa.
                  {user.role === 'freelancer' ? (
                    <span>
                      {' '}
                      Sebagai freelancer, Anda dapat membuat profil, mengunggah
                      portfolio, dan menjelajahi proyek yang tersedia.
                    </span>
                  ) : (
                    <span>
                      {' '}
                      Sebagai client, Anda dapat membuat proyek baru dan mencari
                      freelancer yang sesuai dengan kebutuhan Anda.
                    </span>
                  )}
                </p>
              </div>

              <div className='mt-8'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-semibold'>Langkah Selanjutnya</h3>
                </div>

                <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {user.role === 'freelancer' ? (
                    <>
                      <div className='bg-indigo-50 p-6 rounded-lg border border-indigo-100'>
                        <h4 className='font-semibold text-indigo-700 mb-2'>
                          Lengkapi Profil Anda
                        </h4>
                        <p className='text-gray-700 mb-4'>
                          Pastikan profil Anda lengkap untuk meningkatkan
                          peluang mendapatkan proyek
                        </p>
                        <Link
                          href='/profile'
                          className='inline-flex items-center text-indigo-600 hover:text-indigo-800'
                        >
                          Edit Profil
                          <svg
                            className='ml-1 w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M9 5l7 7-7 7'
                            ></path>
                          </svg>
                        </Link>
                      </div>
                      <div className='bg-emerald-50 p-6 rounded-lg border border-emerald-100'>
                        <h4 className='font-semibold text-emerald-700 mb-2'>
                          Jelajahi Proyek
                        </h4>
                        <p className='text-gray-700 mb-4'>
                          Temukan proyek yang sesuai dengan keahlian Anda
                        </p>
                        <Link
                          href='/eksplorasi'
                          className='inline-flex items-center text-emerald-600 hover:text-emerald-800'
                        >
                          Lihat Proyek
                          <svg
                            className='ml-1 w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M9 5l7 7-7 7'
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='bg-indigo-50 p-6 rounded-lg border border-indigo-100'>
                        <h4 className='font-semibold text-indigo-700 mb-2'>
                          Buat Proyek Baru
                        </h4>
                        <p className='text-gray-700 mb-4'>
                          Mulai dengan membuat proyek dan temukan freelancer
                          terbaik
                        </p>
                        <Link
                          href='/projects/create'
                          className='inline-flex items-center text-indigo-600 hover:text-indigo-800'
                        >
                          Buat Proyek
                          <svg
                            className='ml-1 w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M9 5l7 7-7 7'
                            ></path>
                          </svg>
                        </Link>
                      </div>
                      <div className='bg-emerald-50 p-6 rounded-lg border border-emerald-100'>
                        <h4 className='font-semibold text-emerald-700 mb-2'>
                          Cari Talenta
                        </h4>
                        <p className='text-gray-700 mb-4'>
                          Temukan freelancer yang sesuai dengan kebutuhan proyek
                          Anda
                        </p>
                        <Link
                          href='/talenta'
                          className='inline-flex items-center text-emerald-600 hover:text-emerald-800'
                        >
                          Lihat Freelancer
                          <svg
                            className='ml-1 w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M9 5l7 7-7 7'
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
