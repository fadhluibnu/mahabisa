import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ExploreHero from './Components/ExploreHero';
import FilterSection from './Components/FilterSection';
import CategoryPillsSection from './Components/CategoryPillsSection';
import ServicesGrid from './Components/ServicesGrid';
import { debounce } from 'lodash';

const Explore = ({ services, categories, priceRanges, ratingOptions, filters }) => {
  // Initialize state with values from props (which came from backend)
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [activeCategory, setActiveCategory] = useState(filters.category || 'all');
  const [currentFilters, setCurrentFilters] = useState({
    search: filters.search || '',
    category: filters.category || '',
    min_price: filters.minPrice || '',
    max_price: filters.maxPrice || '',
    rating: filters.rating || '',
    sort_by: filters.sortBy || 'newest',
  });
  
  const { auth } = usePage().props;
  
  // Create debounced version of the router visit
  const debouncedSearch = debounce((newFilters) => {
    router.get(route('explore'), newFilters, {
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
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    const newFilters = {
      ...currentFilters,
      search: searchValue || null,
    };
    
    setCurrentFilters(newFilters);
    router.get(route('explore'), newFilters, {
      preserveState: true,
      preserveScroll: true,
    });
  };
  
  // Handler for filter changes
  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...currentFilters };
    
    // Handle price range selection
    if (filterType === 'price_range') {
      const selectedRange = priceRanges.find(range => range.id === value);
      if (selectedRange) {
        newFilters.min_price = selectedRange.min || null;
        newFilters.max_price = selectedRange.max || null;
      } else {
        // If 'all' is selected, remove price filters
        newFilters.min_price = null;
        newFilters.max_price = null;
      }
    } else {
      // For other filters, just set the value directly
      newFilters[filterType] = value || null;
    }
    
    // Update state
    setCurrentFilters(newFilters);
    
    // Update active category if category filter changes
    if (filterType === 'category') {
      setActiveCategory(value || 'all');
    }
    
    // Apply the filter by navigating with the new parameters
    router.get(route('explore'), newFilters, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Handler for category pill clicks
  const handleCategoryClick = category => {
    const categoryValue = category === 'all' ? null : category;
    setActiveCategory(category);
    
    const newFilters = {
      ...currentFilters,
      category: categoryValue,
    };
    
    setCurrentFilters(newFilters);
    
    router.get(route('explore'), newFilters, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <Head title="MahaBisa | Eksplorasi Jasa" />
      <Navbar user={auth.user} />
      <div className='pt-16'>
        {/* Add padding to account for fixed navbar */}
        <ExploreHero
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <FilterSection 
          filters={currentFilters} 
          onFilterChange={handleFilterChange}
          categories={categories}
          priceRanges={priceRanges}
          ratingOptions={ratingOptions}
        />
        <CategoryPillsSection
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          categories={categories}
        />
        <ServicesGrid 
          services={services}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
