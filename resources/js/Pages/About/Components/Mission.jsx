import React from 'react';

const Mission = () => {
  return (
    <section className='py-12 sm:py-16 md:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-8 md:gap-12 items-center'>
          <div className='order-2 lg:order-1'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight'>
              Misi Kami:{' '}
              <span className='text-indigo-600'>Memberdayakan Mahasiswa</span>
            </h2>

            <p className='text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base'>
              Kami percaya bahwa mahasiswa memiliki bakat dan potensi besar yang
              belum sepenuhnya tergali. MahaBisa hadir untuk menjembatani
              kesenjangan antara dunia akademis dan profesional, memberikan
              kesempatan bagi mahasiswa untuk memperoleh pengalaman nyata dan
              menghasilkan pendapatan tambahan.
            </p>
            <div className='space-y-4 sm:space-y-6'>
              <div className='flex gap-3 sm:gap-4'>
                <div className='flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-100 flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 sm:w-6 sm:h-6 text-indigo-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                </div>

                <div>
                  <h3 className='text-lg sm:text-xl font-semibold mb-1 sm:mb-2'>
                    Mengembangkan Keahlian
                  </h3>
                  <p className='text-slate-600 text-sm sm:text-base'>
                    Mendapatkan pengalaman praktis yang relevan dengan bidang
                    studi dan mengasah keterampilan melalui proyek nyata.
                  </p>
                </div>
              </div>

              <div className='flex gap-3 sm:gap-4'>
                <div className='flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-100 flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 sm:w-6 sm:h-6 text-indigo-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>

                <div>
                  <h3 className='text-lg sm:text-xl font-semibold mb-1 sm:mb-2'>
                    Penghasilan Fleksibel
                  </h3>
                  <p className='text-slate-600 text-sm sm:text-base'>
                    Memperoleh pendapatan tambahan dengan jadwal yang fleksibel,
                    menyesuaikan dengan kegiatan perkuliahan.
                  </p>
                </div>
              </div>

              <div className='flex gap-3 sm:gap-4'>
                <div className='flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-100 flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 sm:w-6 sm:h-6 text-indigo-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>

                <div>
                  <h3 className='text-lg sm:text-xl font-semibold mb-1 sm:mb-2'>
                    Portofolio Profesional
                  </h3>
                  <p className='text-slate-600 text-sm sm:text-base'>
                    Membangun portofolio karya nyata yang akan sangat berharga
                    untuk karir masa depan setelah lulus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='order-1 lg:order-2'>
            {' '}
            <div className='relative mx-auto max-w-sm lg:max-w-none'>
              <div className='bg-white p-3 sm:p-4 rounded-xl shadow-xl relative z-10 transform rotate-2'>
                <img
                  src='/assets/Mahasiswa-berkolaborasi.png'
                  alt='Mahasiswa berkolaborasi'
                  className='w-full h-auto rounded-lg'
                />
              </div>

              {/* Elemen dekoratif */}
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

export default Mission;
