import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import TalentaHero from './Components/TalentaHero';
import FilterSection from './Components/FilterSection';
import SkillTagsSection from './Components/SkillTagsSection';
import FeaturedTalents from './Components/FeaturedTalents';
import TalentsGrid from './Components/TalentsGrid';
import CtaSection from './Components/CtaSection';

const Talenta = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    university: '',
    education: '',
    experience: '',
    sort: 'recommended',
  });
  const [activeSkill, setActiveSkill] = useState('all');
  const { auth } = usePage().props;

  // Handler for search input
  const handleSearchChange = e => {
    setSearchValue(e.target.value);
  };

  // Handler for filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  // Handler for skill tag clicks
  const handleSkillClick = skill => {
    setActiveSkill(skill);
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <Head title="MahaBisa | Talenta" />
      <Navbar user={auth.user} />
      <div className='pt-16'>
        {' '}
        {/* Add padding to account for fixed navbar */}
        <TalentaHero
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <FilterSection filters={filters} onFilterChange={handleFilterChange} />
        <SkillTagsSection
          activeSkill={activeSkill}
          onSkillClick={handleSkillClick}
        />
        <FeaturedTalents />
        <TalentsGrid
          filters={filters}
          searchValue={searchValue}
          activeSkill={activeSkill}
        />
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
};

export default Talenta;
