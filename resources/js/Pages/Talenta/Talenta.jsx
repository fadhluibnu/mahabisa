import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import TalentaHero from './Components/TalentaHero';
import FilterSection from './Components/FilterSection';
import SkillTagsSection from './Components/SkillTagsSection';
import FeaturedTalents from './Components/FeaturedTalents';
import TalentsGrid from './Components/TalentsGrid';
import CtaSection from './Components/CtaSection';
import { debounce } from 'lodash';

const Talenta = ({ freelancers, categories, skills, filters }) => {
  // Initialize state with values from props (which came from backend)
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [activeSkill, setActiveSkill] = useState(filters.skillId || 'all');
  const [currentFilters, setCurrentFilters] = useState({
    search: filters.search || '',
    categoryId: filters.categoryId || '',
    skillId: filters.skillId || '',
    sortBy: filters.sortBy || 'rating',
  });

  const { auth } = usePage().props;

  // Create debounced version of the router visit
  const debouncedSearch = debounce(newFilters => {
    router.get(route('talents'), newFilters, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  }, 500);

  // Handler for search input
  const handleSearchChange = e => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    const newFilters = {
      ...currentFilters,
      search: newValue || null,
    };

    setCurrentFilters(newFilters);
    debouncedSearch(newFilters);
  };

  // Handle searching when the search form is submitted
  const handleSearchSubmit = e => {
    e.preventDefault();

    const newFilters = {
      ...currentFilters,
      search: searchValue || null,
    };

    setCurrentFilters(newFilters);
    router.get(route('talents'), newFilters, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Handler for filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...currentFilters,
      [filterType]: value || null,
    };

    setCurrentFilters(newFilters);

    router.get(route('talents'), newFilters, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Handler for skill tag clicks
  const handleSkillClick = skill => {
    const skillValue = skill === 'all' ? null : skill;
    setActiveSkill(skill);

    const newFilters = {
      ...currentFilters,
      skillId: skillValue,
    };

    setCurrentFilters(newFilters);

    router.get(route('talents'), newFilters, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <Head title='MahaBisa | Talenta' />
      <Navbar user={auth.user} />
      <div className='pt-16'>
        {/* Add padding to account for fixed navbar */}
        <TalentaHero
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <FilterSection
          filters={currentFilters}
          onFilterChange={handleFilterChange}
          categories={categories}
        />
        <SkillTagsSection
          activeSkill={activeSkill}
          onSkillClick={handleSkillClick}
          skills={skills}
        />
        <FeaturedTalents freelancers={freelancers?.data?.slice(0, 3) || []} />
        <TalentsGrid freelancers={freelancers} />
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
};

export default Talenta;
