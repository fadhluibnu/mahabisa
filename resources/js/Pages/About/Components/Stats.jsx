import React from 'react';

const Stats = () => {
  return (
    <section className="py-10 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <div className="p-3 sm:p-6 text-center relative">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent leading-tight">5000+</div>
            <div className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Mahasiswa Aktif</div>
            {/* Divider line hanya untuk desktop */}
            <div className="hidden md:block after:content-[''] after:absolute after:right-0 after:top-[20%] after:h-[60%] after:w-px after:bg-slate-200 last:after:hidden"></div>
          </div>
          
          <div className="p-3 sm:p-6 text-center relative">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent leading-tight">3700+</div>
            <div className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Proyek Selesai</div>
            <div className="hidden md:block after:content-[''] after:absolute after:right-0 after:top-[20%] after:h-[60%] after:w-px after:bg-slate-200 last:after:hidden"></div>
          </div>
          
          <div className="p-3 sm:p-6 text-center relative">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent leading-tight">250+</div>
            <div className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Universitas</div>
            <div className="hidden md:block after:content-[''] after:absolute after:right-0 after:top-[20%] after:h-[60%] after:w-px after:bg-slate-200 last:after:hidden"></div>
          </div>
          
          <div className="p-3 sm:p-6 text-center relative">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent leading-tight">98%</div>
            <div className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Kepuasan Klien</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
