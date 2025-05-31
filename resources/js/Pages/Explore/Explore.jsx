import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ExploreHero from './Components/ExploreHero';
import FilterSection from './Components/FilterSection';
import CategoryPillsSection from './Components/CategoryPillsSection';
import ServicesGrid from './Components/ServicesGrid';

const Explore = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    budget: '',
    rating: '',
    sort: 'recommended',
  });
  const [activeCategory, setActiveCategory] = useState('all');

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

    // Sync activeCategory when category filter changes
    if (filterType === 'category') {
      setActiveCategory(value || 'all');
    }
  };

  // Handler for category pill clicks
  const handleCategoryClick = category => {
    setActiveCategory(category);

    // Sync category filter when pill is clicked
    setFilters({
      ...filters,
      category: category === 'all' ? '' : category,
    });
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <div className='pt-16'>
        {' '}
        {/* Add padding to account for fixed navbar */}
        <ExploreHero
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <FilterSection filters={filters} onFilterChange={handleFilterChange} />
        <CategoryPillsSection
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
        <ServicesGrid
          filters={filters}
          searchValue={searchValue}
          activeCategory={activeCategory}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
