import React from 'react';

const AuthSidebar = () => {
  return (
    <div className='hidden md:flex md:flex-1 bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex-col justify-between p-8 relative overflow-hidden'>
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] opacity-30"></div>

      {/* Background Image */}
      {/* <div className="absolute bottom-0 left-0 w-full h-[60%] bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center opacity-30 mix-blend-lighten"></div> */}

      {/* Brand Logo */}
      <div className='flex items-center gap-2 mb-6 relative z-10'>
        <div className='justify-center items-center flex p-2 rounded-lg animate-gradient-background'>
          <svg
            width='24'
            height='21'
            viewBox='0 0 24 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M0.000147127 20.2922V0H3.55951L8.83284 6.18205L14.2303 0H18.449C20.6698 0.340231 22.5699 1.17937 23.3611 4.45978C23.5032 6.18882 23.2647 8.60575 20.6824 9.68735C22.1291 10.4426 24.277 11.9262 23.9704 15.2709C23.6589 17.4356 22.5651 19.4923 18.6661 20.3891L7.12668 20.3271V17.3182L17.5803 17.2873C19.3465 17.2118 20.5762 16.0303 20.4962 14.3093C20.4316 12.8371 19.5602 11.772 17.7975 11.3934H14.2923V8.44655C15.2332 8.45685 16.1741 8.46723 17.1151 8.4776C19.6745 7.98987 19.8648 6.56392 19.9378 5.74788C19.8267 3.82346 19.0103 3.27446 17.2056 3.00308C16.7731 2.96645 16.1737 3.15675 15.8122 3.57651L8.95686 11.1763L3.49735 5.12745L3.43534 20.3582L0 20.2923L0.000147127 20.2922Z'
              fill='white'
            />
          </svg>
        </div>
        <div className='font-heading font-bold text-xl tracking-tight'>
          MahaBisa
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <h1 className='text-4xl font-heading font-extrabold tracking-tight mb-4'>
          Kembangkan Potensi, Raih Pendapatan
        </h1>
        <p className='opacity-80 mb-8'>
          Platform yang menghubungkan mahasiswa berbakat dengan klien yang
          membutuhkan jasa kreatif dan profesional.
        </p>

        <ul className='space-y-4'>
          <li className='flex items-center gap-4'>
            <div className='w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M22 4L12 14.01L9 11.01'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <span>Mulai freelancing tanpa biaya</span>
          </li>
          <li className='flex items-center gap-4'>
            <div className='w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M22 4L12 14.01L9 11.01'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <span>Pembayaran aman dan tepat waktu</span>
          </li>
          <li className='flex items-center gap-4'>
            <div className='w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M22 4L12 14.01L9 11.01'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <span>Kembangkan portofolio profesional</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthSidebar;
