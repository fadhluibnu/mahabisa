import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Link } from '@inertiajs/react';

const ProjectsGrid = ({ activeTab, filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  // Sample projects data - in a real application, this would come from an API
  const [projects] = useState([
    {
      id: 1,
      title: 'Website E-commerce Produk UMKM',
      category: 'web',
      budget: 'Rp 3.500.000',
      budgetRange: 'high',
      status: 'open',
      description:
        'Mencari developer untuk membuat website e-commerce khusus produk UMKM dengan fitur penjualan, manajemen inventori, dan integrasi pembayaran online.',
      skills: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],
      client: {
        name: 'Ahmad Fauzi',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      bids: 8,
      createdAt: '2025-05-20',
    },
    {
      id: 2,
      title: 'Desain Logo dan Branding Untuk Startup Edukasi',
      category: 'design',
      budget: 'Rp 1.800.000',
      budgetRange: 'medium',
      status: 'in-progress',
      description:
        'Membutuhkan desainer untuk merancang logo, branding kit lengkap, dan panduan brand untuk startup di bidang edukasi teknologi.',
      skills: [
        'Logo Design',
        'Branding',
        'Adobe Illustrator',
        'Brand Guidelines',
      ],
      client: {
        name: 'Siti Rahayu',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      bids: 12,
      createdAt: '2025-05-15',
    },
    {
      id: 3,
      title: 'Pengembangan Aplikasi Mobile Healthy Lifestyle',
      category: 'mobile',
      budget: 'Rp 6.500.000',
      budgetRange: 'very-high',
      status: 'open',
      description:
        'Mencari developer untuk aplikasi mobile kesehatan yang menggabungkan tracking nutrisi, latihan fisik, dan meditasi dengan tampilan menarik.',
      skills: ['Flutter', 'Firebase', 'UI/UX Design', 'Health API'],
      client: {
        name: 'Budi Santoso',
        avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      },
      bids: 5,
      createdAt: '2025-05-28',
    },
    {
      id: 4,
      title: 'Penulisan Konten Blog Teknologi (10 Artikel)',
      category: 'writing',
      budget: 'Rp 1.200.000',
      budgetRange: 'medium',
      status: 'review',
      description:
        'Mencari penulis untuk membuat 10 artikel blog dengan topik teknologi terkini, AI, dan perkembangan startup di Indonesia.',
      skills: ['Content Writing', 'SEO', 'Tech Knowledge', 'Blogging'],
      client: {
        name: 'Diana Putri',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      },
      bids: 15,
      createdAt: '2025-05-10',
    },
    {
      id: 5,
      title: 'Pembuatan Video Explainer untuk Aplikasi Fintech',
      category: 'video',
      budget: 'Rp 4.200.000',
      budgetRange: 'high',
      status: 'completed',
      description:
        'Membuat video explainer berdurasi 2 menit untuk menjelaskan cara kerja aplikasi fintech dengan gaya animasi yang menarik.',
      skills: [
        'Motion Graphics',
        'Scriptwriting',
        'After Effects',
        'Voice Over',
      ],
      client: {
        name: 'Rendra Wijaya',
        avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      },
      bids: 9,
      createdAt: '2025-04-25',
    },
    {
      id: 6,
      title: 'Digital Marketing Campaign untuk Launch Produk',
      category: 'marketing',
      budget: 'Rp 2.800.000',
      budgetRange: 'high',
      status: 'in-progress',
      description:
        'Mencari spesialis marketing untuk merancang dan menjalankan kampanye digital marketing peluncuran produk skincare baru.',
      skills: [
        'Social Media Marketing',
        'Google Ads',
        'Content Strategy',
        'Analytics',
      ],
      client: {
        name: 'Maya Anggraini',
        avatar: 'https://randomuser.me/api/portraits/women/71.jpg',
      },
      bids: 7,
      createdAt: '2025-05-18',
    },
    {
      id: 7,
      title: 'Pengembangan Chatbot untuk Layanan Pelanggan',
      category: 'web',
      budget: 'Rp 4.800.000',
      budgetRange: 'high',
      status: 'open',
      description:
        'Membutuhkan pengembang untuk membuat chatbot AI yang dapat menangani pertanyaan umum pelanggan dan terintegrasi dengan platform e-commerce kami.',
      skills: [
        'Artificial Intelligence',
        'Natural Language Processing',
        'API Integration',
        'JavaScript',
      ],
      client: {
        name: 'Rizki Pratama',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      },
      bids: 4,
      createdAt: '2025-05-26',
    },
    {
      id: 8,
      title: 'Desain UI/UX Aplikasi Edukasi Anak',
      category: 'design',
      budget: 'Rp 3.200.000',
      budgetRange: 'high',
      status: 'open',
      description:
        'Mencari desainer UI/UX untuk merancang antarmuka aplikasi pembelajaran interaktif untuk anak usia 5-10 tahun dengan fokus pada pengalaman yang menyenangkan dan edukatif.',
      skills: [
        'UI Design',
        'UX Design',
        'Figma',
        'Prototyping',
        'User Research',
      ],
      client: {
        name: 'Nadia Putri',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      bids: 10,
      createdAt: '2025-05-22',
    },
    {
      id: 9,
      title: 'Pengembangan Game Edukasi Berbasis Unity',
      category: 'mobile',
      budget: 'Rp 7.500.000',
      budgetRange: 'very-high',
      status: 'open',
      description:
        'Membutuhkan developer game untuk membuat game edukasi yang mengajarkan konsep matematika dasar untuk siswa SD menggunakan Unity.',
      skills: ['Unity', 'C#', 'Game Development', '3D Modeling', 'Animation'],
      client: {
        name: 'Andi Wijaya',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      },
      bids: 6,
      createdAt: '2025-05-29',
    },
    {
      id: 10,
      title: 'Produksi Podcast Bisnis dan Teknologi',
      category: 'music',
      budget: 'Rp 1.800.000',
      budgetRange: 'medium',
      status: 'in-progress',
      description:
        'Mencari ahli audio untuk membantu dalam produksi podcast bisnis dan teknologi, termasuk editing audio, mixing, dan penambahan musik latar.',
      skills: [
        'Audio Editing',
        'Sound Design',
        'Adobe Audition',
        'Podcast Production',
      ],
      client: {
        name: 'Lina Sasmita',
        avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      },
      bids: 8,
      createdAt: '2025-05-14',
    },
    {
      id: 11,
      title: 'Pembuatan Konten Instagram untuk Brand Lokal',
      category: 'design',
      budget: 'Rp 2.200.000',
      budgetRange: 'medium',
      status: 'review',
      description:
        'Membutuhkan content creator untuk merancang dan membuat konten visual Instagram yang menarik untuk brand fashion lokal selama 1 bulan.',
      skills: [
        'Social Media Design',
        'Photography',
        'Copywriting',
        'Instagram Marketing',
      ],
      client: {
        name: 'Dian Kusuma',
        avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
      },
      bids: 15,
      createdAt: '2025-05-08',
    },
    {
      id: 12,
      title: 'Pembuatan Data Visualization Dashboard',
      category: 'web',
      budget: 'Rp 5.500.000',
      budgetRange: 'very-high',
      status: 'open',
      description:
        'Mencari developer untuk membuat dashboard visualisasi data interaktif yang menampilkan metrik bisnis utama dengan grafik dan chart yang mudah dimengerti.',
      skills: [
        'D3.js',
        'React',
        'Data Visualization',
        'Dashboard Design',
        'API Integration',
      ],
      client: {
        name: 'Hadi Santoso',
        avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      },
      bids: 7,
      createdAt: '2025-05-24',
    },
  ]);

  // Filter projects based on activeTab and filters
  const filteredProjects = projects.filter(project => {
    // Filter by tab
    if (activeTab === 'terbuka' && project.status !== 'open') return false;
    if (
      activeTab === 'diproses' &&
      project.status !== 'in-progress' &&
      project.status !== 'review'
    )
      return false;

    // Filter by search term
    if (
      filters.search &&
      !project.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !project.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (filters.category && project.category !== filters.category) return false;

    // Filter by budget
    if (filters.budget && project.budgetRange !== filters.budget) return false;

    // Filter by status
    if (filters.status && project.status !== filters.status) return false;

    return true;
  });
  // Sort projects based on filters.sort
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (filters.sort) {
      case 'tertua':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'budget-asc':
        return (
          parseInt(a.budget.replace(/\D/g, '')) -
          parseInt(b.budget.replace(/\D/g, ''))
        );
      case 'budget-desc':
        return (
          parseInt(b.budget.replace(/\D/g, '')) -
          parseInt(a.budget.replace(/\D/g, ''))
        );
      case 'bids':
        return b.bids - a.bids;
      case 'terbaru':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Pagination logic
  useEffect(() => {
    // Calculate total pages
    const calculatedTotalPages = Math.ceil(
      sortedProjects.length / projectsPerPage
    );
    setTotalPages(calculatedTotalPages || 1); // Ensure at least 1 page

    // Reset to first page when filters change
    setCurrentPage(1);
  }, [sortedProjects.length, projectsPerPage, activeTab, filters]);

  useEffect(() => {
    // Get current projects
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    setDisplayedProjects(
      sortedProjects.slice(indexOfFirstProject, indexOfLastProject)
    );

    // Calculate page numbers to display
    let pageArray = [];
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Show pagination with ellipsis
      if (currentPage <= 3) {
        pageArray = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pageArray = [
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pageArray = [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      }
    }
    setPageNumbers(pageArray);
  }, [currentPage, projectsPerPage, sortedProjects, totalPages]);

  // Page change handler
  const handlePageChange = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top of the projects section
      window.scrollTo({
        top: document.querySelector('.projects-section').offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className='projects-section'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-slate-900'>
          {activeTab === 'terbuka'
            ? 'Proyek Terbuka'
            : activeTab === 'diproses'
              ? 'Proyek Sedang Diproses'
              : 'Semua Proyek'}
        </h2>
        <Link
          href='/client/projects/create'
          className='inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            ></path>
          </svg>
          Buat Proyek
        </Link>
      </div>{' '}
      {displayedProjects.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 auto-rows-fr'>
          {displayedProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className='text-center py-12 bg-slate-50 rounded-xl border border-slate-200'>
          <svg
            className='w-16 h-16 mx-auto text-slate-400 mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          <h3 className='text-xl font-semibold text-slate-700 mb-2'>
            Tidak Ada Proyek
          </h3>
          <p className='text-slate-500 max-w-md mx-auto'>
            Tidak ada proyek yang sesuai dengan filter yang kamu pilih. Coba
            ubah filter atau buat proyek baru.
          </p>
        </div>
      )}
      {/* Pagination */}
      {sortedProjects.length > projectsPerPage && (
        <div className='flex justify-center mt-10'>
          <nav className='flex items-center gap-1'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 text-sm border border-slate-300 rounded hover:bg-slate-50 text-slate-500 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              &laquo; Prev
            </button>

            {pageNumbers.map((number, index) =>
              typeof number === 'number' ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(number)}
                  className={`px-3 py-1.5 text-sm border border-slate-300 rounded hover:bg-slate-50 ${
                    currentPage === number
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'text-slate-500'
                  }`}
                >
                  {number}
                </button>
              ) : (
                <span
                  key={index}
                  className='px-2 py-1.5 text-sm text-slate-500'
                >
                  {number}
                </span>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 text-sm border border-slate-300 rounded hover:bg-slate-50 text-slate-500 ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              Next &raquo;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;
