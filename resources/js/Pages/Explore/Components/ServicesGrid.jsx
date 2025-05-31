import React, { useState } from 'react';
import ServiceCard from './ServiceCard';

const ServicesGrid = ({ filters, searchValue, activeCategory }) => {
  // Dummy data for services
  const servicesData = [
    {
      id: 1,
      title: 'Desain Logo Profesional dengan Revisi Unlimited',
      image:
        'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      badge: 'best_seller',
      creator: {
        name: 'Anisa W.',
        avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
        level: 2,
      },
      rating: 2.9,
      reviewCount: 124,
      price: 150000,
      category: 'design',
    },
    {
      id: 2,
      title: 'Website Responsive dengan React dan Tailwind CSS',
      image:
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      badge: 'trending',
      creator: {
        name: 'Budi S.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        level: 3,
      },
      rating: 4.9,
      reviewCount: 86,
      price: 750000,
      category: 'web',
    },
    {
      id: 3,
      title: 'Video Editing Cinematic untuk YouTube & Social Media',
      image:
        'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
      badge: 'new',
      creator: {
        name: 'Citra P.',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        level: 2,
      },
      rating: 4.7,
      reviewCount: 53,
      price: 250000,
      category: 'video',
    },
    {
      id: 4,
      title: 'Terjemahan Bahasa Inggris - Indonesia Profesional',
      image:
        'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
      creator: {
        name: 'Dimas F.',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        level: 1,
      },
      rating: 4.6,
      reviewCount: 38,
      price: 100000,
      category: 'writing',
    },
    {
      id: 5,
      title: 'Social Media Marketing Strategy & Management',
      image:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      creator: {
        name: 'Farah A.',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        level: 2,
      },
      rating: 4.5,
      reviewCount: 47,
      price: 350000,
      category: 'marketing',
    },
    {
      id: 6,
      title: 'Jingle & Background Music Production',
      image:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      creator: {
        name: 'Galih R.',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        level: 3,
      },
      rating: 4.8,
      reviewCount: 29,
      price: 300000,
      category: 'music',
    },
    {
      id: 7,
      title: 'UI/UX Design for Mobile Apps & Websites',
      image:
        'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      creator: {
        name: 'Hana K.',
        avatar: 'https://randomuser.me/api/portraits/women/77.jpg',
        level: 3,
      },
      rating: 4.9,
      reviewCount: 58,
      price: 450000,
      category: 'design',
    },
    {
      id: 8,
      title: 'WordPress Website Development & Customization',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      creator: {
        name: 'Irfan M.',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        level: 2,
      },
      rating: 4.7,
      reviewCount: 42,
      price: 550000,
      category: 'web',
    },
  ];

  // Filter services based on active filters and search
  const filteredServices = servicesData.filter(service => {
    // Filter by category
    if (activeCategory !== 'all' && service.category !== activeCategory) {
      return false;
    }

    // Filter by budget
    if (filters.budget) {
      if (filters.budget === 'low' && service.price >= 100000) return false;
      if (
        filters.budget === 'medium' &&
        (service.price < 100000 || service.price > 300000)
      )
        return false;
      if (
        filters.budget === 'high' &&
        (service.price < 300000 || service.price > 500000)
      )
        return false;
      if (filters.budget === 'premium' && service.price < 500000) return false;
    }
    // Filter by rating
    if (filters.rating) {
      // Convert rating from string like "4.5" to number 4.5
      const minRating = parseFloat(filters.rating);
      if (!isNaN(minRating) && service.rating < minRating) return false;
    }

    // Filter by search term
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      const titleLower = service.title.toLowerCase();
      if (!titleLower.includes(searchLower)) return false;
    }

    return true;
  });

  // Sort services based on selected sort option
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (filters.sort === 'newest') {
      return b.id - a.id; // Using ID as a proxy for newest
    } else if (filters.sort === 'price-low') {
      return a.price - b.price;
    } else if (filters.sort === 'price-high') {
      return b.price - a.price;
    } else if (filters.sort === 'rating') {
      return b.rating - a.rating;
    }

    // Default: recommended (no specific sort)
    return 0;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8;

  // Calculate pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = sortedServices.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const totalPages = Math.ceil(sortedServices.length / servicesPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className='py-8 mb-16'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg font-medium text-slate-900 mb-6'>
          {sortedServices.length} jasa ditemukan
        </h2>

        {/* Services Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
          {currentServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Empty State */}
        {currentServices.length === 0 && (
          <div className='text-center py-12'>
            <h3 className='text-lg font-medium text-slate-800 mb-2'>
              Tidak ada jasa yang ditemukan
            </h3>
            <p className='text-slate-500'>
              Coba mengubah filter atau kata kunci pencarian
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center'>
            <div className='flex space-x-2'>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                    currentPage === number
                      ? 'bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {number}
                </button>
              ))}

              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className='flex items-center justify-center px-3 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all'
                >
                  <span className='mr-1'>Next</span>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;
