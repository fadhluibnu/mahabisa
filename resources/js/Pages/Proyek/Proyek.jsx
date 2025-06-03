import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ProyekHero from './Components/ProyekHero';
import FilterSection from './Components/FilterSection';
import ProjectsGrid from './Components/ProjectsGrid';
import CtaSection from './Components/CtaSection';

const Proyek = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    budget: '',
    status: '',
    sort: 'terbaru',
  });
  const { auth } = usePage().props;

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  const handleSearchChange = e => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
  };

  return (
    <>
      <Head title='MahaBisa | Proyek' />
      <div className='min-h-screen bg-slate-50 flex flex-col'>
        <Navbar user={auth.user} />
        <div className='pt-16 flex-grow'>
          {' '}
          {/* Add padding to account for fixed navbar */}
          <ProyekHero />
          <section className='py-12'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              {/* Tabs Navigation */}
              <div className='flex border-b-2 border-slate-200 mb-8'>
                <button
                  className={`py-4 px-8 font-semibold ${
                    activeTab === 'semua'
                      ? 'text-indigo-500 border-b-2 border-indigo-500 -mb-0.5'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                  onClick={() => handleTabChange('semua')}
                >
                  Semua Proyek
                </button>
                <button
                  className={`py-4 px-8 font-semibold ${
                    activeTab === 'terbuka'
                      ? 'text-indigo-500 border-b-2 border-indigo-500 -mb-0.5'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                  onClick={() => handleTabChange('terbuka')}
                >
                  Proyek Terbuka
                </button>
                <button
                  className={`py-4 px-8 font-semibold ${
                    activeTab === 'diproses'
                      ? 'text-indigo-500 border-b-2 border-indigo-500 -mb-0.5'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                  onClick={() => handleTabChange('diproses')}
                >
                  Sedang Diproses
                </button>
              </div>

              <FilterSection
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
              />

              <ProjectsGrid activeTab={activeTab} filters={filters} />
            </div>
          </section>
          <CtaSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Proyek;
