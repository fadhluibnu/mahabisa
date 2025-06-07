import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HeroSection from './Components/HeroSection';
import SearchSection from './Components/SearchSection';
import CategorySection from './Components/CategorySection';
import PopularSection from './Components/PopularSection';
import DashboardSection from './Components/DashboardSection';
import TalentSection from './Components/TalentSection';
import TestimonialsSection from './Components/TestimonialsSection';
import CallToActionSection from './Components/CallToActionSection';

const Homepage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { auth, featuredServices, topFreelancers, categories } = usePage().props;
  
  // Handler for popular search terms
  const handlePopularClick = value => {
    setSearchValue(value);
    // Redirect to exploration page with search parameter
    router.visit(`/eksplorasi?search=${encodeURIComponent(value)}`);
  };
        return (
    <div>
      <Head title="MahaBisa | Platform Freelance untuk Mahasiswa" />
      <Navbar user={auth.user} />
      <div className='max-w-7xl px-4 md:px-5 lg:px-0 mx-auto pt-16'>
        <HeroSection />
        <SearchSection
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handlePopularClick={handlePopularClick}
        />
        <CategorySection />
        <CallToActionSection />
        <PopularSection />
        <DashboardSection />
        <TalentSection freelancers={topFreelancers} />
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
