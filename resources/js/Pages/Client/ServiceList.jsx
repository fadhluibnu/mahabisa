import React, { useState, useEffect } from 'react';
import ClientLayout from './Components/ClientLayout';
import ServiceCard from './Components/ServiceCard';
import { Link } from '@inertiajs/react';

const ServiceList = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('any');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of services per page

  // Dummy data for categories
  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'design', name: 'Design & Creative' },
    { id: 'writing', name: 'Writing & Translation' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'video', name: 'Video & Animation' },
    { id: 'business', name: 'Business' },
    { id: 'lifestyle', name: 'Lifestyle' },
  ];

  // Dummy data for services
  const services = [
    {
      id: 1,
      title: 'Desain UI/UX Profesional untuk Aplikasi Mobile',
      description: 'Saya akan mendesain UI/UX untuk aplikasi mobile Anda dengan pendekatan yang berfokus pada pengalaman pengguna. Termasuk wireframe, mockup, dan prototype.',
      image: 'https://via.placeholder.com/400x300?text=UI/UX+Design',
      price: 'Rp1.500.000',
      deliveryTime: '7 hari',
      revisions: 'Unlimited',
      rating: 4.9,
      reviews: 56,
      category: 'design',
      freelancer: {
        name: 'Ahmad Fauzi',
        avatar: 'https://via.placeholder.com/100x100?text=AF',
        level: 'Top Rated',
      },
      tags: ['UI/UX Design', 'Mobile App', 'Wireframing', 'Prototyping']
    },
    {
      id: 2,
      title: 'Pengembangan Website Responsif dengan React.js',
      description: 'Saya akan membuat website responsif menggunakan React.js dengan desain modern dan performa yang cepat. Termasuk SEO dan integrasi API.',
      image: 'https://via.placeholder.com/400x300?text=React+Development',
      price: 'Rp2.500.000',
      deliveryTime: '14 hari',
      revisions: '5 kali',
      rating: 4.8,
      reviews: 42,
      category: 'web',
      freelancer: {
        name: 'Budi Santoso',
        avatar: 'https://via.placeholder.com/100x100?text=BS',
        level: 'Level 2',
      },
      tags: ['Web Development', 'React.js', 'Responsive Design', 'SEO']
    },
    {
      id: 3,
      title: 'Penulisan Artikel SEO untuk Website Bisnis',
      description: 'Saya akan menulis artikel SEO-friendly untuk website Anda dengan penelitian kata kunci yang mendalam untuk meningkatkan peringkat di mesin pencari.',
      image: '/dummy/service3.jpg',
      price: 'Rp850.000',
      deliveryTime: '3 hari',
      revisions: '3 kali',
      rating: 4.7,
      reviews: 38,
      category: 'writing',
      freelancer: {
        name: 'Siti Nurhaliza',
        avatar: '/dummy/avatar2.jpg',
        level: 'Level 2',
      },
      tags: ['Content Writing', 'SEO', 'Article Writing', 'Blog Post']
    },
    {
      id: 4,
      title: 'Desain Logo Premium untuk Brand Anda',
      description: 'Saya akan mendesain logo premium dan profesional untuk brand Anda dengan konsep yang unik dan sesuai dengan identitas perusahaan.',
      image: '/dummy/service4.jpg',
      price: 'Rp1.200.000',
      deliveryTime: '5 hari',
      revisions: 'Unlimited',
      rating: 5.0,
      reviews: 63,
      category: 'design',
      freelancer: {
        name: 'Diana Putri',
        avatar: '/dummy/avatar4.jpg',
        level: 'Top Rated',
      },
      tags: ['Logo Design', 'Branding', 'Identity Design', 'Vector Art']
    },
    {
      id: 5,
      title: 'Pengembangan Aplikasi Android Native',
      description: 'Saya akan mengembangkan aplikasi Android native dengan Kotlin yang cepat, responsif dan sesuai dengan guideline Material Design.',
      image: '/dummy/service5.jpg',
      price: 'Rp3.500.000',
      deliveryTime: '21 hari',
      revisions: '3 kali',
      rating: 4.8,
      reviews: 29,
      category: 'mobile',
      freelancer: {
        name: 'Hadi Pranoto',
        avatar: '/dummy/avatar8.jpg',
        level: 'Level 2',
      },
      tags: ['Android', 'Kotlin', 'Mobile App', 'Material Design']
    },
    {
      id: 6,
      title: 'Strategi Marketing Media Sosial',
      description: 'Saya akan membuat strategi pemasaran media sosial yang komprehensif untuk bisnis Anda termasuk konten, jadwal posting, dan analitik.',
      image: '/dummy/service6.jpg',
      price: 'Rp1.800.000',
      deliveryTime: '7 hari',
      revisions: '2 kali',
      rating: 4.7,
      reviews: 41,
      category: 'marketing',
      freelancer: {
        name: 'Gunawan Wibisono',
        avatar: '/dummy/avatar7.jpg',
        level: 'Level 1',
      },
      tags: ['Social Media', 'Marketing Strategy', 'Content Planning', 'Analytics']
    },
    {
      id: 7,
      title: 'Website WordPress dengan WooCommerce',
      description: 'Saya akan membuat website WordPress dengan toko online WooCommerce yang profesional, responsif, dan mudah dikelola.',
      image: '/dummy/service7.jpg',
      price: 'Rp2.000.000',
      deliveryTime: '10 hari',
      revisions: '3 kali',
      rating: 4.6,
      reviews: 51,
      category: 'web',
      freelancer: {
        name: 'Eko Prasetyo',
        avatar: '/dummy/avatar5.jpg',
        level: 'Level 2',
      },
      tags: ['WordPress', 'WooCommerce', 'E-commerce', 'Website Development']
    },
    {
      id: 8,
      title: 'Desain UI Mobile App dengan Figma',
      description: 'Saya akan mendesain UI untuk aplikasi mobile Anda dengan Figma, termasuk style guide, komponen, dan prototype interaktif.',
      image: '/dummy/service8.jpg',
      price: 'Rp1.300.000',
      deliveryTime: '6 hari',
      revisions: '5 kali',
      rating: 4.9,
      reviews: 47,
      category: 'design',
      freelancer: {
        name: 'Farah Diba',
        avatar: '/dummy/avatar6.jpg',
        level: 'Top Rated',
      },
      tags: ['UI Design', 'Figma', 'Mobile App', 'Prototype']
    }
  ];

  // Filter and sort services
  const filteredServices = services
    .filter(service => 
      (searchTerm === '' || 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (categoryFilter === 'all' || service.category === categoryFilter) &&
      (priceFilter === 'any' || 
        (priceFilter === 'under500' && parseInt(service.price.replace(/\D/g, '')) < 500000) || 
        (priceFilter === '500to1000' && parseInt(service.price.replace(/\D/g, '')) >= 500000 && parseInt(service.price.replace(/\D/g, '')) <= 1000000) || 
        (priceFilter === '1000to2500' && parseInt(service.price.replace(/\D/g, '')) > 1000000 && parseInt(service.price.replace(/\D/g, '')) <= 2500000) || 
        (priceFilter === 'over2500' && parseInt(service.price.replace(/\D/g, '')) > 2500000)
      )
    )
    .sort((a, b) => {
      if (sortBy === 'recommended') return 0;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      if (sortBy === 'price_low') return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      if (sortBy === 'price_high') return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
      if (sortBy === 'delivery') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      return 0;
    });

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, priceFilter, sortBy]);

  // Generate page numbers to display (show max 5 pages with current in middle if possible)
  const getPageNumbers = () => {
    let pages = [];
    
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of middle section
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <ClientLayout title="Temukan Layanan" subtitle="Jelajahi layanan dari freelancer terbaik">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Search and filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Cari layanan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute top-3 left-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </span>
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="recommended">Direkomendasikan</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="reviews">Paling Banyak Ulasan</option>
                  <option value="price_low">Harga: Rendah ke Tinggi</option>
                  <option value="price_high">Harga: Tinggi ke Rendah</option>
                  <option value="delivery">Waktu Pengerjaan Tercepat</option>
                </select>
                <div className="absolute top-3 right-3 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kisaran Harga</label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="any">Semua Harga</option>
                    <option value="under500">Di Bawah Rp500.000</option>
                    <option value="500to1000">Rp500.000 - Rp1.000.000</option>
                    <option value="1000to2500">Rp1.000.000 - Rp2.500.000</option>
                    <option value="over2500">Di Atas Rp2.500.000</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results info */}
        <div className="mb-4 text-sm text-gray-500">
          Menampilkan {filteredServices.length} layanan
          {categoryFilter !== 'all' && ` dalam kategori ${categories.find(c => c.id === categoryFilter)?.name}`}
          {searchTerm && ` dengan pencarian "${searchTerm}"`}
        </div>

        {/* Services grid - modified to use currentServices instead of filteredServices */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ditemukan layanan</h3>
            <p className="mt-1 text-sm text-gray-500">
              Coba ubah filter pencarian Anda atau gunakan kata kunci yang berbeda.
            </p>
          </div>
        )}
        
        {/* Pagination - completely replaced with functional pagination */}
        {filteredServices.length > 0 && (
          <div className="mt-8">
            <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
              <div className="-mt-px flex w-0 flex-1">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center border-t-2 ${
                    currentPage === 1 
                      ? 'border-transparent text-gray-300 cursor-not-allowed' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } pr-1 pt-4 text-sm font-medium`}
                >
                  <svg className="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
                  </svg>
                  Sebelumnya
                </button>
              </div>
              <div className="hidden md:-mt-px md:flex">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                        currentPage === page
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>
              <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center border-t-2 ${
                    currentPage === totalPages 
                      ? 'border-transparent text-gray-300 cursor-not-allowed' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } pl-1 pt-4 text-sm font-medium`}
                >
                  Selanjutnya
                  <svg className="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </nav>
            
            {/* Mobile pagination indicator */}
            <div className="mt-4 flex justify-center md:hidden">
              <p className="text-sm text-gray-500">
                Halaman {currentPage} dari {totalPages}
              </p>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default ServiceList;
