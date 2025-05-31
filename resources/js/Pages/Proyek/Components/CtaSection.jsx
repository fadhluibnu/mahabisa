import React from 'react';

const CtaSection = () => {
  return (
    <section className='py-16 bg-gradient-to-r from-indigo-600 to-violet-600'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              Punya Proyek yang Perlu Dikerjakan?
            </h2>
            <p className='text-indigo-100 text-lg mb-8'>
              Temukan talenta terbaik dari kalangan mahasiswa Indonesia untuk
              mengerjakan proyek Anda. Posting proyek sekarang dan dapatkan
              penawaran dalam 24 jam.
            </p>
            <div className='flex flex-wrap gap-4'>
              <a
                href='#'
                className='px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md'
              >
                Buat Proyek Baru
              </a>
              <a
                href='#'
                className='px-6 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors'
              >
                Jelajahi Talenta
              </a>
            </div>
          </div>

          <div className='flex justify-center md:justify-end'>
            <div className='relative'>
              {/* Main illustration */}
              <div className='bg-white p-4 rounded-xl shadow-xl rotate-3 relative z-10'>
                <img
                  src='/assets/proyek.png'
                  alt='Ilustrasi Proyek'
                  className='w-full h-auto rounded-lg'
                  style={{ maxWidth: '400px' }}
                />
              </div>

              {/* Decorative elements */}
              <div className='absolute top-8 -left-4 bg-yellow-400 w-16 h-16 rounded-lg -rotate-6 z-0 opacity-80'></div>
              <div className='absolute -bottom-6 -right-4 bg-pink-500 w-24 h-24 rounded-lg rotate-12 z-0 opacity-70'></div>
              <div className='absolute -top-6 right-12 bg-indigo-300 w-12 h-12 rounded-full z-0 opacity-80'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
