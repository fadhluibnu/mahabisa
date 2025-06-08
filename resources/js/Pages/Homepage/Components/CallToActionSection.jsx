import React from 'react';

const CallToActionSection = () => {
  return (
    <section className='py-8 md:py-12 lg:py-16 px-4 md:px-0'>
      <div className='container mx-auto max-w-7xl'>
        <div className='bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-2xl overflow-hidden shadow-xl'>
          <div className='flex flex-col lg:flex-row'>
            <div className='p-8 md:p-12 lg:w-1/2'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6'>
                Mulai Perjalanan Anda di MahaBisa Sekarang
              </h2>
              <p className='text-purple-200 text-base md:text-lg mb-6 md:mb-8'>
                Bergabunglah dengan komunitas talenta berbakat dan temukan
                peluang kolaborasi untuk mengembangkan potensi dan karir Anda.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <a
                  href='/talenta'
                  className='px-6 py-3 bg-white text-[#7C3AED] font-semibold rounded-lg hover:bg-purple-100 transition-colors text-center w-full sm:w-auto'
                >
                  Cari Freelancer
                </a>
                <a
                  href='/auth?form=register&type=freelancer'
                  className='px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center w-full sm:w-auto'
                >
                  Jadi Freelancer
                </a>
              </div>
            </div>
            <div className='lg:w-1/2 relative min-h-[200px] sm:min-h-[300px]'>
              <img
                src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
                alt='Kolaborasi Mahasiswa'
                className='absolute inset-0 w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
