import React, { useState } from 'react';
import AISearchComponent from './AISearchComponent';

const ExploreHero = ({ 
  searchValue, 
  onSearchChange, 
  onSearchSubmit, 
  initialData,
  filters,
  onAISearchResults,
  onAISearchLoading,
}) => {
  const [isAISearch, setIsAISearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSearchMode = () => {
    setIsAISearch(!isAISearch);
  };

  const handleAILoading = (loading) => {
    setIsLoading(loading);
    onAISearchLoading(loading);
  };

  return (
    <section className='py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-slate-900 mb-4 relative inline-block'>
            Explore Jasa & Proyek
            <span className='absolute -bottom-2 left-0 w-24 h-1.5 bg-gradient-to-r from-violet-600 to-pink-500 rounded-full'></span>
          </h1>
          <p className='text-lg text-slate-600 mt-6'>
            Temukan berbagai jasa dan proyek dari talenta mahasiswa terbaik di
            Indonesia
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="flex rounded-lg overflow-hidden bg-slate-100 p-1">
            <button 
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${!isAISearch ? 'bg-white shadow-sm text-violet-700' : 'text-slate-600 hover:bg-slate-200'}`}
              onClick={() => setIsAISearch(false)}
            >
              Pencarian Biasa
            </button>
            <button 
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center ${isAISearch ? 'bg-white shadow-sm text-violet-700' : 'text-slate-600 hover:bg-slate-200'}`}
              onClick={() => setIsAISearch(true)}
            >
              <span>Pencarian AI</span>
              <span className="ml-1 bg-indigo-100 text-indigo-700 text-xs px-1.5 py-0.5 rounded-full">Baru</span>
            </button>
          </div>
        </div>

        {isAISearch ? (
          <div className={`transition-all duration-300 relative ${isLoading ? 'opacity-70' : 'opacity-100'}`}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10 rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600 mb-3"></div>
                  <span className="text-violet-700 font-medium">Mencari dengan AI...</span>
                </div>
              </div>
            )}
            <AISearchComponent 
              onSearchResults={onAISearchResults} 
              onLoading={handleAILoading}
              initialData={initialData}
              filters={filters}
            />
            <div className="max-w-2xl mx-auto mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-3">
              <h3 className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Tips Pencarian AI:
              </h3>
              <ul className="text-xs text-indigo-600 space-y-1.5 pl-5 list-disc">
                <li>Jelaskan kebutuhan Anda secara spesifik (jenis jasa, gaya, tujuan)</li>
                <li>Tambahkan preferensi Anda (warna, format, gaya desain)</li>
                <li>Sebutkan anggaran jika relevan</li>
                <li>Tentukan tenggat waktu atau urgensi jika ada</li>
              </ul>
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">
              <svg className="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Jelaskan dengan detail apa yang Anda cari untuk hasil yang lebih akurat
            </p>
          </div>
        ) : (
          <form onSubmit={onSearchSubmit} className='relative max-w-2xl mx-auto'>
            <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-slate-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              className='w-full py-4 pl-12 pr-4 bg-white border border-slate-200 rounded-xl shadow-md focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none transition-all'
              placeholder='Cari jasa atau proyek...'
              value={searchValue}
              onChange={onSearchChange}
            />
            <button type='submit' className='sr-only'>
              Cari
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ExploreHero;
