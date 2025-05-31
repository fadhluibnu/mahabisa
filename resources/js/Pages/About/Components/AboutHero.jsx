import React from 'react';

const AboutHero = () => {
  return (
    <section className="py-12 sm:py-16 pt-28 sm:pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-indigo-600 font-medium uppercase tracking-wider mb-2 sm:mb-4 block text-sm sm:text-base">Tentang Kami</span>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 relative inline-block">
          Platform Freelance <br className="sm:hidden" /><span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">untuk Mahasiswa</span>
          <span className="absolute -bottom-1 left-0 w-20 sm:w-28 h-1 sm:h-1.5 bg-gradient-to-r from-violet-600 to-pink-500 rounded-full"></span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-xl sm:max-w-2xl mx-auto mt-4 sm:mt-6 px-2">
          MahaBisa adalah platform yang menghubungkan mahasiswa berbakat dengan peluang freelance 
          yang sesuai dengan keahlian mereka, sambil membantu bisnis menemukan talenta muda terbaik.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
