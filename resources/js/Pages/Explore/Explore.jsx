import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ExploreHero from './Components/ExploreHero';
import FilterSection from './Components/FilterSection';
import CategoryPillsSection from './Components/CategoryPillsSection';
import ServicesGrid from './Components/ServicesGrid';
import { debounce } from 'lodash';

const Explore = ({
  services,
  categories,
  priceRanges,
  ratingOptions,
  filters,
}) => {
  // Initialize state with values from props (which came from backend)
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [activeCategory, setActiveCategory] = useState(
    filters.category || 'all'
  );
  const [currentFilters, setCurrentFilters] = useState({
    search: filters.search || '',
    category: filters.category || '',
    min_price: filters.minPrice || '',
    max_price: filters.maxPrice || '',
    rating: filters.rating || '',
    sort_by: filters.sortBy || 'newest',
  });
  const [aiSearchResults, setAISearchResults] = useState(null);
  const [isAISearchActive, setIsAISearchActive] = useState(false);
  const [isAISearchLoading, setIsAISearchLoading] = useState(false);

  const { auth } = usePage().props;

  // Create debounced version of the router visit
  const debouncedSearch = debounce(newFilters => {
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
  const handleSearchSubmit = e => {
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

  // Handler for AI search results
  const handleAISearchResults = (results) => {
    setAISearchResults(results);
    setIsAISearchActive(true);
  };

  // Handler for AI search loading state
  const handleAISearchLoading = (isLoading) => {
    setIsAISearchLoading(isLoading);
  };

  // Reset AI search
  const resetAISearch = () => {
    setAISearchResults(null);
    setIsAISearchActive(false);
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <Head title='MahaBisa | Eksplorasi Jasa' />
      <Navbar user={auth.user} />
      <div className='pt-16'>
        {/* Add padding to account for fixed navbar */}
        <ExploreHero
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          initialData={services.data}
          filters={currentFilters}
          onAISearchResults={handleAISearchResults}
          onAISearchLoading={handleAISearchLoading}
        />
        
        {isAISearchActive && (
          <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4'>
            <div className='bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-center justify-between'>
              <div className='flex items-center'>
                <svg className='h-5 w-5 text-yellow-500 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='text-yellow-700'>Menampilkan hasil pencarian AI {aiSearchResults && `(${aiSearchResults.length} hasil)`}</span>
              </div>
              <button 
                onClick={resetAISearch}
                className='text-yellow-700 hover:text-yellow-900 font-medium flex items-center'
              >
                <span>Kembali ke Hasil Normal</span>
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
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
          services={isAISearchActive ? { data: aiSearchResults } : services} 
          isLoading={isAISearchLoading}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
