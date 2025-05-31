import React from 'react';

const CallToAction = () => {
  return (
    <section className='py-10 sm:py-16 bg-gradient-to-r from-indigo-600 to-violet-600 relative overflow-hidden'>
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
          <div>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4'>
              Siap Untuk Memulai?
            </h2>
            <p className='text-indigo-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-8'>
              Bergabunglah dengan ribuan mahasiswa yang telah mengembangkan
              keterampilan dan menghasilkan pendapatan melalui MahaBisa.
            </p>
            <div className='flex flex-wrap gap-3 sm:gap-4'>
              <a
                href='/auth?form=register'
                className='px-4 sm:px-6 py-2 sm:py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md text-sm sm:text-base'
              >
                Daftar Sekarang
              </a>
              <a
                href='/proyek'
                className='px-4 sm:px-6 py-2 sm:py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm sm:text-base'
              >
                Jelajahi Proyek{' '}
              </a>
            </div>
          </div>

          <div className='flex justify-center md:justify-end mt-8 md:mt-0'>
            <div className='relative max-w-[250px] sm:max-w-[320px] md:max-w-[400px]'>
              {/* Main illustration */}
              <div className='bg-white p-3 sm:p-4 rounded-xl shadow-xl rotate-3 relative z-10'>
                <img
                  src='/assets/skill.png'
                  alt='Ilustrasi Keahlian'
                  className='w-full h-auto rounded-lg'
                />
              </div>

              {/* Decorative elements - responsive sizing */}
              <div className='absolute top-6 -left-3 sm:top-8 sm:-left-4 bg-yellow-400 w-12 h-12 sm:w-16 sm:h-16 rounded-lg -rotate-6 z-0 opacity-80'></div>
              <div className='absolute -bottom-4 -right-3 sm:-bottom-6 sm:-right-4 bg-pink-500 w-16 h-16 sm:w-24 sm:h-24 rounded-lg rotate-12 z-0 opacity-70'></div>
              <div className='absolute -top-4 right-8 sm:-top-6 sm:right-12 bg-indigo-300 w-8 h-8 sm:w-12 sm:h-12 rounded-full z-0 opacity-80'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
