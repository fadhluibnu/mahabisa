import React from 'react';

const HeroSection = () => {
  return (
    <section className='flex flex-col md:flex-row items-center justify-between py-8 md:py-12 lg:py-16'>
      <div className='w-full md:w-1/2 mb-10 md:mb-0'>
        <p className='font-medium text-sm text-[#7C3AED] bg-[#EDE9FE] rounded-full px-4 py-2 inline-block mb-4'>
          Platform freelance khusus mahasiswa
        </p>
        <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 mb-4 leading-tight'>
          Kembangkan Potensi <br />
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]'>
            Raih Pendapatan
          </span>
        </h1>
        <p className='w-full md:w-4/5 lg:w-3/4 font-normal text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed'>
          Platform yang menghubungkan mahasiswa berbakat dengan klien yang
          membutuhkan jasa kreatif dan profesional dengan harga terjangkau.
        </p>
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <a
            href='#'
            className='w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white rounded-md hover:shadow-xl hover:bg-gradient-to-br hover:from-[#5B21B6] hover:to-[#7C3AED] transition-all duration-200 font-medium'
          >
            Mulai Sekarang{' '}
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.16669 7H12.8334M12.8334 7L7.00002 1.16667M12.8334 7L7.00002 12.8333'
                stroke='white'
                strokeWidth='1.66667'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </a>
          <a
            href='#'
            className='w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-700 hover:bg-slate-50 transition-all duration-200 hover:shadow-lg hover:border-gray-300 border border-gray-200 rounded-md font-medium'
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
      <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
        <img
          src='assets/hero.png'
          alt='Hero Image'
          className='w-full max-w-md md:max-w-full object-cover'
        />
      </div>
    </section>
  );
};

export default HeroSection;
