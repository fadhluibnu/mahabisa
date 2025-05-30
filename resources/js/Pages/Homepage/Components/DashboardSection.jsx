import React from 'react';

const DashboardSection = () => {
  return (
    <section className='py-20 bg-slate-50'>
      <div className='container mx-auto max-w-7xl'>
        <div className='flex flex-col md:flex-row gap-12 items-center'>
          <div className='lg:w-1/2'>
            <h2 className='text-4xl font-bold text-slate-900 mb-4'>
              Dashboard yang Powerful
            </h2>
            <p className='text-lg text-slate-600 mb-8'>
              Kelola proyek, komunikasi, dan pembayaran dalam satu platform
              terintegrasi yang dirancang khusus untuk mahasiswa freelancer
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
              {/* Manajemen Proyek */}
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-100 rounded-lg flex-shrink-0'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='24' height='24' rx='6' fill='#EDE9FE' />
                    <path
                      d='M7.5 18C8.32843 18 9 17.3284 9 16.5C9 15.6716 8.32843 15 7.5 15C6.67157 15 6 15.6716 6 16.5C6 17.3284 6.67157 18 7.5 18Z'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M16.5 18C17.3284 18 18 17.3284 18 16.5C18 15.6716 17.3284 15 16.5 15C15.6716 15 15 15.6716 15 16.5C15 17.3284 15.6716 18 16.5 18Z'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M16.5 9C17.3284 9 18 8.32843 18 7.5C18 6.67157 17.3284 6 16.5 6C15.6716 6 15 6.67157 15 7.5C15 8.32843 15.6716 9 16.5 9Z'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M7.5 9C8.32843 9 9 8.32843 9 7.5C9 6.67157 8.32843 6 7.5 6C6.67157 6 6 6.67157 6 7.5C6 8.32843 6.67157 9 7.5 9Z'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M9 7.5H15'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M9 16.5H15'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M7.5 9V15'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M16.5 9V15'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-lg text-slate-900'>
                    Manajemen Proyek
                  </h3>
                  <p className='text-slate-600'>
                    Pantau kemajuan, atur tenggat waktu, dan dokumentasikan
                    deliverables dengan mudah
                  </p>
                </div>
              </div>

              {/* Komunikasi Real-time */}
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-100 rounded-lg flex-shrink-0'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='24' height='24' rx='6' fill='#EDE9FE' />
                    <path
                      d='M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5286 20 9.13505 19.6501 7.9 19.0289L3 20L4.2 16.8C3.44132 15.6554 3 14.3804 3 13C3 8.58172 7.02944 5 12 5C16.97 5 21 8.58172 21 12Z'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-lg text-slate-900'>
                    Komunikasi Real-time
                  </h3>
                  <p className='text-slate-600'>
                    Chat langsung dengan klien, diskusikan revisi, dan bagikan
                    update secara instan
                  </p>
                </div>
              </div>

              {/* Pembayaran Aman */}
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-100 rounded-lg flex-shrink-0'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='24' height='24' rx='6' fill='#EDE9FE' />
                    <path
                      d='M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12 7.5V16.5'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M17 3V7H21'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M22 2L17 7'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-lg text-slate-900'>
                    Pembayaran Aman
                  </h3>
                  <p className='text-slate-600'>
                    Terima pembayaran dengan aman dan kelola keuangan dengan
                    sistem escrow terpercaya
                  </p>
                </div>
              </div>

              {/* Portfolio Profesional */}
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-100 rounded-lg flex-shrink-0'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='24' height='24' rx='6' fill='#EDE9FE' />
                    <path
                      d='M8 6H20M8 10H20M8 14H20M8 18H16'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M4 6V6.01M4 10V10.01M4 14V14.01M4 18V18.01'
                      stroke='#7C3AED'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-lg text-slate-900'>
                    Portofolio Profesional
                  </h3>
                  <p className='text-slate-600'>
                    Tampilkan karya terbaik dan tingkatkan visibilitas untuk
                    menarik klien baru
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-10'>
              <a
                href='#'
                className='inline-flex items-center px-6 py-3 bg-[#7C3AED] text-white font-medium rounded-lg hover:bg-purple-700 transition-colors'
              >
                Jelajahi Dashboard
              </a>
            </div>
          </div>

          {/* Dashboard Display */}
          <div className='relative hidden lg:block lg:w-2/3 pl-4 gap-8'>
            <img
              src='assets/Dashboard MahaBisa.png'
              alt='Dashboard Preview'
              className='w-full h-auto rounded-lg shadow-lg'
            />
            <div className='md:w-3/5 absolute top-12 -left-8'>
              <div className='bg-white p-6 rounded-xl shadow-lg'>
                <div className='flex items-center justify-between mb-8'>
                  <h3 className='text-xl font-bold'>Proyek Aktif</h3>
                  <div className='w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center'>
                    <span className='text-slate-600 font-medium'>3</span>
                  </div>
                </div>

                {/* UI Design Project */}
                <div className='mb-2'>
                  <div className='flex justify-between items-center mb-1'>
                    <h4 className='text-lg font-medium'>
                      UI Design untuk Aplikasi Mobile
                    </h4>
                  </div>
                  <div className='text-sm text-slate-500 mb-3'>
                    5 dari 8 screens selesai
                  </div>
                  <div className='w-full bg-slate-100 h-2 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-[#7C3AED]'
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <div className='flex justify-end mt-1 text-sm'>
                    <span className='text-slate-500'>65%</span>
                  </div>
                </div>

                {/* Brand Identity Project */}
                <div className='mb-2'>
                  <div className='flex justify-between items-center mb-1'>
                    <h4 className='text-lg font-medium'>
                      Brand Identity Design
                    </h4>
                  </div>
                  <div className='text-sm text-slate-500 mb-3'>
                    Logo & Guidelines
                  </div>
                  <div className='w-full bg-slate-100 h-2 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-[#7C3AED]'
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                  <div className='flex justify-end mt-1 text-sm'>
                    <span className='text-slate-500'>90%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
