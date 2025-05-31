import React, { useState } from 'react';
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

  const handlePopularClick = value => {
    setSearchValue(value);
  };

  // Data dummy untuk carousel PopulerCard
  const populerCards = [
    {
      image: 'assets/Desain Logo Profesional.png',
      isBestSeller: true,
      label: 'Best Seller',
      userName: 'Anisa W.',
      userLevel: 'Level 2 Seller',
      title: 'Desain Logo Profesional dengan Revisi Unlimited',
      rating: 4.8,
      reviewCount: 124,
      price: 150000,
    },
    {
      image: 'assets/Terjemahan.png',
      isBestSeller: true,
      label: 'Trending',
      userName: 'Budi S.',
      userLevel: 'Level 3 Seller',
      title: 'Website Responsive dengan React dan Tailwind CSS',
      rating: 4.9,
      reviewCount: 86,
      price: 750000,
    },
    {
      image: 'assets/Website Responsive.png',
      isBestSeller: true,
      label: 'Baru',
      userName: 'Citra P.',
      userLevel: 'Level 2 Seller',
      title: 'Video Editing Cinematic untuk YouTube & Social Media',
      rating: 4.7,
      reviewCount: 53,
      price: 250000,
    },
    {
      image: 'assets/Terjemahan.png',
      isBestSeller: false,
      label: '',
      userName: 'Dimas F.',
      userLevel: 'Level 1 Seller',
      title: 'Terjemahan Bahasa Inggris ke Indonesia dan Sebaliknya',
      rating: 4.6,
      reviewCount: 42,
      price: 100000,
    },
    {
      image: 'assets/Desain Logo Profesional.png',
      isBestSeller: true,
      label: 'Top Rated',
      userName: 'Eko P.',
      userLevel: 'Level 2 Seller',
      title: 'Jasa Pembuatan UI/UX Design untuk Aplikasi Mobile',
      rating: 4.9,
      reviewCount: 98,
      price: 500000,
    },
    {
      image: 'assets/Website Responsive.png',
      isBestSeller: false,
      label: '',
      userName: 'Fira S.',
      userLevel: 'Level 1 Seller',
      title: 'Penulisan Artikel SEO Friendly untuk Website Bisnis',
      rating: 4.5,
      reviewCount: 29,
      price: 75000,
    },
    {
      image: 'assets/Terjemahan.png',
      isBestSeller: true,
      label: 'Recommended',
      userName: 'Galih R.',
      userLevel: 'Level 3 Seller',
      title: 'Jasa Digital Marketing untuk Social Media',
      rating: 4.8,
      reviewCount: 112,
      price: 350000,
    },
    {
      image: 'assets/Desain Logo Profesional.png',
      isBestSeller: false,
      label: '',
      userName: 'Hana M.',
      userLevel: 'Level 2 Seller',
      title: 'Ilustrasi Digital Custom untuk Berbagai Kebutuhan',
      rating: 4.7,
      reviewCount: 67,
      price: 200000,
    },
    {
      image: 'assets/Website Responsive.png',
      isBestSeller: true,
      label: 'Hot',
      userName: 'Indra W.',
      userLevel: 'Level 2 Seller',
      title: 'Jasa Editing Foto Profesional dengan Photoshop',
      rating: 4.8,
      reviewCount: 85,
      price: 125000,
    },
    {
      image: 'assets/Terjemahan.png',
      isBestSeller: false,
      label: '',
      userName: 'Jasmine K.',
      userLevel: 'Level 1 Seller',
      title: 'Voice Over Profesional untuk Video dan Iklan',
      rating: 4.6,
      reviewCount: 36,
      price: 180000,
    },
  ];

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl px-4 md:px-5 lg:px-0 mx-auto pt-16'>
        <HeroSection />
        <SearchSection
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handlePopularClick={handlePopularClick}
        />
        <CategorySection />
        <CallToActionSection />
        <PopularSection populerCards={populerCards} />
        <DashboardSection />
        <TalentSection />
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
