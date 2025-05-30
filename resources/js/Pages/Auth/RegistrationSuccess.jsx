import React from 'react';
import { Link, Head } from '@inertiajs/react';

const RegistrationSuccess = ({ name, role }) => {
  return (
    <>
      <Head title='Registration Successful | MahaBisa' />
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='flex justify-center'>
            <div className='h-16 w-16 rounded-full bg-green-100 flex items-center justify-center'>
              <svg
                className='h-10 w-10 text-green-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Registrasi Berhasil!
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Selamat datang di MahaBisa, {name}!
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='text-center'>
              <p className='mb-4'>
                Akun Anda sebagai{' '}
                <span className='font-semibold'>
                  {role === 'freelancer' ? 'Freelancer' : 'Client'}
                </span>{' '}
                telah berhasil dibuat.
              </p>

              <p className='mb-6'>
                {role === 'freelancer'
                  ? 'Anda sekarang dapat membuat profil, mengunggah portfolio, dan mulai mencari proyek yang sesuai dengan keahlian Anda.'
                  : 'Anda sekarang dapat membuat proyek baru dan menemukan freelancer terbaik untuk membantu mewujudkan ide Anda.'}
              </p>

              <div className='mt-8'>
                <Link
                  href='/dashboard'
                  className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Lanjut ke Dashboard
                </Link>

                <div className='mt-3'>
                  <Link
                    href='/'
                    className='w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Kembali ke Beranda
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationSuccess;
