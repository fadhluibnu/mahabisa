import React from 'react';
import { Link } from '@inertiajs/react';

const ProyekHero = () => {
  return (
    <section className='py-16 bg-slate-50 border-b border-slate-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold text-slate-900 mb-4 relative inline-block'>
          Jelajahi Proyek
          <span className='absolute -bottom-3 left-0 w-28 h-1.5 bg-gradient-to-r from-violet-600 to-pink-500 rounded-full'></span>
        </h1>
        <p className='text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mt-6 mb-8'>
          Temukan proyek freelance yang sesuai dengan keahlian dan minatmu, atau
          posting proyek baru untuk menemukan talenta terbaik.
        </p>
      </div>
    </section>
  );
};

export default ProyekHero;
