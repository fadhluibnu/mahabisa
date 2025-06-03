import React from 'react';
import { Link } from '@inertiajs/react';

const CtaSection = () => {
  return (
    <section className='py-16 bg-gradient-to-br from-violet-50 to-purple-50'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row items-center justify-between'>
          <div className='max-w-lg mb-8 lg:mb-0 text-center lg:text-left'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-900 mb-4'>
              Jadilah bagian dari talenta MahaBisa
            </h2>
            <p className='text-slate-600 mb-6'>
              Gabung sebagai talenta dan dapatkan akses ke berbagai proyek
              menarik. Kembangkan portofoliomu dan dapatkan penghasilan
              tambahan.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <Link
                href='/register/talent'
                className='py-3 px-6 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-lg font-medium hover:shadow-lg transition-all text-center'
              >
                Daftar sebagai Talenta
              </Link> 
            </div>
          </div>

          <div className='w-full max-w-md'>
            <img
              src='/assets/skill.png'
              alt='Talenta MahaBisa'
              className='w-full h-auto rounded-xl shadow-lg'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
