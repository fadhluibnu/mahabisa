import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';

const FreelancerList = () => {  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('any');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Number of freelancers per page

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

  // Dummy data for freelancers
  const freelancers = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      avatar: '/dummy/avatar1.jpg',
      title: 'Senior Graphic Designer & UI/UX Specialist',
      rating: 4.9,
      reviews: 56,
      hourlyRate: 'Rp350.000',
      category: 'design',
      skills: ['UI/UX Design', 'Graphic Design', 'Logo Design', 'Adobe Photoshop', 'Figma'],
      description: 'UI/UX Designer berpengalaman dengan lebih dari 5 tahun di industri kreatif. Spesialisasi saya adalah menciptakan antarmuka yang intuitif dan menarik untuk aplikasi web dan mobile.',
      location: 'Jakarta, Indonesia',
      isOnline: true,
      completedProjects: 85,
      responseRate: '99%',
      responseTime: '2 jam'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      avatar: '/dummy/avatar2.jpg',
      title: 'Content Writer & SEO Specialist',
      rating: 4.7,
      reviews: 42,
      hourlyRate: 'Rp250.000',
      category: 'writing',
      skills: ['Content Writing', 'SEO', 'Copywriting', 'Blog Writing', 'Article Writing'],
      description: 'Content writer profesional dengan keahlian SEO. Saya membantu bisnis meningkatkan visibility online melalui konten berkualitas tinggi yang dioptimalkan untuk mesin pencari.',
      location: 'Bandung, Indonesia',
      isOnline: false,
      completedProjects: 65,
      responseRate: '95%',
      responseTime: '3 jam'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      avatar: '/dummy/avatar3.jpg',
      title: 'Full Stack Web & Mobile Developer',
      rating: 4.8,
      reviews: 78,
      hourlyRate: 'Rp400.000',
      category: 'web',
      skills: ['React', 'Node.js', 'React Native', 'PHP', 'Laravel', 'MongoDB'],
      description: 'Full stack developer dengan pengalaman lebih dari 7 tahun. Spesialisasi saya adalah pengembangan aplikasi web dan mobile dengan fokus pada performa dan UI yang menarik.',
      location: 'Surabaya, Indonesia',
      isOnline: true,
      completedProjects: 120,
      responseRate: '97%',
      responseTime: '1 jam'
    },
    {
      id: 4,
      name: 'Diana Putri',
      avatar: '/dummy/avatar4.jpg',
      title: 'Branding & Logo Designer',
      rating: 5.0,
      reviews: 63,
      hourlyRate: 'Rp300.000',
      category: 'design',
      skills: ['Logo Design', 'Branding', 'Identity Design', 'Typography', 'Adobe Illustrator'],
      description: 'Designer dengan fokus pada branding dan identitas visual. Saya membantu perusahaan membangun brand yang konsisten dan berkesan melalui desain logo dan sistem identitas yang kuat.',
      location: 'Yogyakarta, Indonesia',
      isOnline: false,
      completedProjects: 95,
      responseRate: '98%',
      responseTime: '4 jam'
    },
    {
      id: 5,
      name: 'Eko Prasetyo',
      avatar: '/dummy/avatar5.jpg',
      title: 'Web Developer & WordPress Expert',
      rating: 4.6,
      reviews: 51,
      hourlyRate: 'Rp275.000',
      category: 'web',
      skills: ['WordPress', 'PHP', 'JavaScript', 'HTML/CSS', 'WooCommerce', 'Web Design'],
      description: 'WordPress expert dengan pengalaman lebih dari 5 tahun. Saya menawarkan solusi lengkap mulai dari desain hingga pengembangan website yang responsif dan user-friendly.',
      location: 'Semarang, Indonesia',
      isOnline: true,
      completedProjects: 110,
      responseRate: '96%',
      responseTime: '2 jam'
    },
    {
      id: 6,
      name: 'Farah Diba',
      avatar: '/dummy/avatar6.jpg',
      title: 'UI/UX Designer & Mobile App Specialist',
      rating: 4.9,
      reviews: 47,
      hourlyRate: 'Rp325.000',
      category: 'design',
      skills: ['UI/UX Design', 'Mobile App Design', 'Wireframing', 'Prototyping', 'Sketch', 'Adobe XD'],
      description: 'UI/UX designer dengan fokus pada pengalaman pengguna. Saya menciptakan desain yang tidak hanya menarik secara visual tetapi juga fungsional dan mudah digunakan.',
      location: 'Jakarta, Indonesia',
      isOnline: true,
      completedProjects: 75,
      responseRate: '99%',
      responseTime: '1 jam'
    },
    {
      id: 7,
      name: 'Gunawan Wibisono',
      avatar: '/dummy/avatar7.jpg',
      title: 'Digital Marketing & Social Media Specialist',
      rating: 4.7,
      reviews: 39,
      hourlyRate: 'Rp275.000',
      category: 'marketing',
      skills: ['Social Media Marketing', 'Facebook Ads', 'Google Ads', 'Content Strategy', 'Email Marketing'],
      description: 'Digital marketer dengan pengalaman mengelola kampanye sukses untuk berbagai industri. Spesialisasi saya adalah social media marketing dan paid advertising.',
      location: 'Bandung, Indonesia',
      isOnline: false,
      completedProjects: 65,
      responseRate: '94%',
      responseTime: '3 jam'
    },
    {
      id: 8,
      name: 'Hadi Pranoto',
      avatar: '/dummy/avatar8.jpg',
      title: 'Mobile App Developer - Android & iOS',
      rating: 4.8,
      reviews: 58,
      hourlyRate: 'Rp375.000',
      category: 'mobile',
      skills: ['Android', 'iOS', 'Kotlin', 'Swift', 'Flutter', 'Firebase'],
      description: 'Mobile developer dengan keahlian dalam pengembangan aplikasi Android dan iOS. Saya membangun aplikasi yang cepat, responsif dan menarik dengan fokus pada pengalaman pengguna.',
      location: 'Surabaya, Indonesia',
      isOnline: true,
      completedProjects: 90,
      responseRate: '97%',
      responseTime: '2 jam'
    }
  ];
  // Filter and sort freelancers
  const filteredFreelancers = freelancers
    .filter(freelancer => 
      (searchTerm === '' || 
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (categoryFilter === 'all' || freelancer.category === categoryFilter) &&
      (ratingFilter === 'any' || 
        (ratingFilter === '4plus' && freelancer.rating >= 4) || 
        (ratingFilter === '45plus' && freelancer.rating >= 4.5) || 
        (ratingFilter === '5only' && freelancer.rating === 5)
      )
    )
    .sort((a, b) => {
      if (sortBy === 'relevance') return 0;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
      if (sortBy === 'price_low') return parseInt(a.hourlyRate.replace(/\D/g, '')) - parseInt(b.hourlyRate.replace(/\D/g, ''));
      if (sortBy === 'price_high') return parseInt(b.hourlyRate.replace(/\D/g, '')) - parseInt(a.hourlyRate.replace(/\D/g, ''));
      return 0;
    });
    
  // Pagination logic
  const totalPages = Math.ceil(filteredFreelancers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFreelancers.slice(indexOfFirstItem, indexOfLastItem);
  
  // Page change handler
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum number of page numbers to show
    
    if (totalPages <= maxPagesToShow) {
      // If total pages are less than maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end page numbers
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
      } else if (currentPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <ClientLayout title="Cari Freelancer" subtitle="Temukan freelancer terbaik untuk proyek Anda">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Search and filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"                  placeholder="Cari berdasarkan nama, keahlian, atau bidang..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when search changes
                  }}
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
              <div className="relative">                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1); // Reset to first page when sort order changes
                  }}
                  className="appearance-none pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="relevance">Relevansi</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="projects">Proyek Selesai</option>
                  <option value="price_low">Tarif: Rendah ke Tinggi</option>
                  <option value="price_high">Tarif: Tinggi ke Rendah</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>                  <select
                    value={categoryFilter}
                    onChange={(e) => {
                      setCategoryFilter(e.target.value);
                      setCurrentPage(1); // Reset to first page when category changes
                    }}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>                  <select
                    value={ratingFilter}
                    onChange={(e) => {
                      setRatingFilter(e.target.value);
                      setCurrentPage(1); // Reset to first page when rating filter changes
                    }}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="any">Semua Rating</option>
                    <option value="4plus">4.0 & Ke Atas</option>
                    <option value="45plus">4.5 & Ke Atas</option>
                    <option value="5only">Hanya 5.0</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>        {/* Results info */}
        <div className="mb-4 text-sm text-gray-500">
          Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredFreelancers.length)} dari {filteredFreelancers.length} freelancer
          {categoryFilter !== 'all' && ` dalam kategori ${categories.find(c => c.id === categoryFilter)?.name}`}
          {searchTerm && ` dengan pencarian "${searchTerm}"`}
        </div>{/* Freelancer list */}
        <div className="space-y-6">
          {filteredFreelancers.length > 0 ? (
            currentItems.map((freelancer) => (
              <div key={freelancer.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-500 transition-colors duration-200">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className="relative">
                        <img
                          src={freelancer.avatar}
                          alt={freelancer.name}
                          className="w-20 h-20 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(freelancer.name)}&background=6366f1&color=fff&size=100`;
                          }}
                        />
                        {freelancer.isOnline && (
                          <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-green-400"></span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {freelancer.name}
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {freelancer.isOnline ? 'Online' : 'Offline'}
                            </span>
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{freelancer.title}</p>
                          <div className="flex items-center mt-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(freelancer.rating) ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-sm text-gray-500">{freelancer.rating}</span>
                            </div>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{freelancer.reviews} ulasan</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{freelancer.location}</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0 text-right">
                          <p className="text-lg font-medium text-indigo-600">{freelancer.hourlyRate}</p>
                          <p className="text-sm text-gray-500">per jam</p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-gray-600">{freelancer.description}</p>
                      
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {freelancer.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Proyek Selesai:</span>
                            <span className="ml-1 text-sm text-gray-900">{freelancer.completedProjects}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Respon:</span>
                            <span className="ml-1 text-sm text-gray-900">{freelancer.responseRate}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Waktu Respon:</span>
                            <span className="ml-1 text-sm text-gray-900">{freelancer.responseTime}</span>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0 flex space-x-2">
                          <a
                            href={`/client/freelancers/${freelancer.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-indigo-500 text-xs font-medium rounded text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Lihat Profil
                          </a>
                          <a
                            href={`/client/messages?user=${freelancer.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Hubungi
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
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
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ditemukan freelancer</h3>
              <p className="mt-1 text-sm text-gray-500">
                Coba ubah filter pencarian Anda atau gunakan kata kunci yang berbeda.
              </p>
            </div>
          )}
        </div>
          {/* Pagination */}
        {filteredFreelancers.length > 0 && (
          <div className="mt-8">
            <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
              <div className="-mt-px flex w-0 flex-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${
                    currentPage === 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <svg className="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
                  </svg>
                  Sebelumnya
                </button>
              </div>
              <div className="hidden md:-mt-px md:flex">
                {getPageNumbers().map((pageNumber, index) => (
                  pageNumber === '...' ? (
                    <span key={`ellipsis-${index}`} className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button 
                      key={`page-${pageNumber}`}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                        currentPage === pageNumber
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                ))}
              </div>
              <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ${
                    currentPage === totalPages 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Selanjutnya
                  <svg className="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                  </svg>
                </button>              </div>
            </nav>
            
            {/* Mobile pagination info */}
            <div className="mt-4 flex justify-center md:hidden text-sm text-gray-700">
              <span>
                Halaman {currentPage} dari {totalPages}
              </span>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default FreelancerList;
