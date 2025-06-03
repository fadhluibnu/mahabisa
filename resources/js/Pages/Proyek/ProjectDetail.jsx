import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SubmitBid from './Components/SubmitBid';

// Mock data for a single project
const projectData = {
  id: 1,
  title: 'Website E-commerce Produk UMKM',
  category: 'web',
  budget: 'Rp 3.500.000',
  budgetRange: 'high',
  status: 'open',
  description:
    'Mencari developer untuk membuat website e-commerce khusus produk UMKM dengan fitur penjualan, manajemen inventori, dan integrasi pembayaran online.',
  skills: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],  client: {
    id: 101,
    name: 'Ahmad Fauzi',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.7,
    projectsPosted: 12,
    memberSince: 'April 2023',
  },
  bids: 8,
  createdAt: '2025-05-20',
  deadline: '2025-06-20',
  attachments: [
    {
      name: 'project_requirements.pdf',
      size: '1.2 MB',
      url: '#',
    },
    {
      name: 'design_mockups.zip',
      size: '5.6 MB',
      url: '#',
    },
  ],
  fullDescription: `
    <p>Kami adalah UMKM yang menjual produk kerajinan tangan dan membutuhkan website e-commerce untuk memperluas jangkauan pasar kami.</p>
    
    <h4>Fitur yang dibutuhkan:</h4>
    <ul>
      <li>Katalog produk dengan kategori dan filter</li>
      <li>Sistem keranjang belanja</li>
      <li>Integrasi dengan berbagai metode pembayaran (Midtrans, OVO, GoPay, dll.)</li>
      <li>Sistem manajemen inventori</li>
      <li>Sistem notifikasi untuk admin dan pembeli</li>
      <li>Dashboard admin untuk mengelola produk, pesanan, dan laporan</li>
      <li>Optimasi SEO</li>
      <li>Responsive design (desktop, tablet, mobile)</li>
    </ul>
    
    <h4>Teknologi yang diharapkan:</h4>
    <ul>
      <li>Frontend: React.js dengan state management yang baik</li>
      <li>Backend: Node.js dengan Express atau framework serupa</li>
      <li>Database: MongoDB atau SQL sesuai kebutuhan</li>
      <li>Integrasi API pembayaran</li>
    </ul>
    
    <h4>Timeline:</h4>
    <p>Proyek diharapkan selesai dalam waktu 1-2 bulan dengan milestone yang jelas untuk setiap tahap pengembangan.</p>
    
    <h4>Deliverables:</h4>
    <ul>
      <li>Source code lengkap</li>
      <li>Dokumentasi penggunaan dan pengembangan</li>
      <li>Deployment ke hosting</li>
      <li>Support 1 bulan setelah website live</li>
    </ul>
    
    <p>Silakan ajukan penawaran dengan detail pengalaman Anda dalam membuat website e-commerce serupa dan timeline yang Anda usulkan. Portofolio sangat diperhatikan dalam pemilihan freelancer.</p>
  `,
};

const ProjectDetail = ({ id }) => {
  // In a real app, you would fetch project data based on the ID
  const project = projectData;
  const [activeTab, setActiveTab] = useState('description');
  const { auth } = usePage().props;

  // Function to get category label
  const getCategoryLabel = category => {
    switch (category) {
      case 'web':
        return 'Pengembangan Web';
      case 'mobile':
        return 'Aplikasi Mobile';
      case 'design':
        return 'Desain';
      case 'writing':
        return 'Penulisan';
      case 'marketing':
        return 'Marketing';
      case 'video':
        return 'Video & Animasi';
      case 'music':
        return 'Musik & Audio';
      default:
        return 'Lainnya';
    }
  };

  // Function to determine status badge styling
  const getStatusBadge = status => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'review':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Function to get human-readable status
  const getStatusText = status => {
    switch (status) {
      case 'open':
        return 'Terbuka';
      case 'in-progress':
        return 'Sedang Dikerjakan';
      case 'review':
        return 'Dalam Review';
      case 'completed':
        return 'Selesai';
      default:
        return 'Unknown';
    }
  };

  // Format date to be more readable
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  return (
    <>
      <Head title={`MahaBisa | ${project.title}`} />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar user={auth.user} />
        <div className="pt-16 pb-12 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {/* Breadcrumbs */}
            <nav className="text-sm text-slate-500 mb-6">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <a href="/proyek" className="hover:text-indigo-500">Proyek</a>
                  <svg className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>{project.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Project Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                  <div className="p-6">
                    {/* Project Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadge(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {getCategoryLabel(project.category)}
                      </span>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">{project.title}</h1>
                    
                    <div className="mb-6">
                      <span className="font-bold text-slate-900 text-xl">
                        {project.budget}
                      </span>
                    </div>
                    
                    {/* Project Metadata */}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Dibuat: {formatDate(project.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tenggat: {formatDate(project.deadline)}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        {project.bids} Penawaran
                      </div>
                    </div>
                    
                    {/* Tabs Navigation */}
                    <div className="border-b border-slate-200 mb-6">
                      <nav className="flex space-x-6">
                        <button
                          onClick={() => setActiveTab('description')}
                          className={`py-3 border-b-2 font-medium text-sm ${
                            activeTab === 'description'
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          Deskripsi Proyek
                        </button>
                        <button
                          onClick={() => setActiveTab('files')}
                          className={`py-3 border-b-2 font-medium text-sm ${
                            activeTab === 'files'
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          File Lampiran
                        </button>
                      </nav>
                    </div>
                    
                    {/* Tab Content */}
                    <div>
                      {activeTab === 'description' && (
                        <div>
                          <div dangerouslySetInnerHTML={{ __html: project.fullDescription }} className="prose max-w-none text-slate-700" />
                          
                          <div className="mt-8">
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Keahlian yang Dibutuhkan</h3>
                            <div className="flex flex-wrap gap-2">
                              {project.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'files' && (
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">File Lampiran Proyek</h3>
                          
                          {project.attachments.length > 0 ? (
                            <div className="space-y-3">
                              {project.attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                  <div className="flex items-center">
                                    <svg className="w-6 h-6 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div>
                                      <div className="font-medium text-slate-700">{file.name}</div>
                                      <div className="text-xs text-slate-500">{file.size}</div>
                                    </div>
                                  </div>
                                  <a
                                    href={file.url}
                                    className="text-indigo-500 hover:text-indigo-600 font-medium text-sm flex items-center"
                                  >
                                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Unduh
                                  </a>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-slate-500">Tidak ada file lampiran untuk proyek ini.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Client Info & Bid Form */}
              <div className="lg:col-span-1">
                {/* Client Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Informasi Klien</h3>
                    
                    <div className="flex items-center mb-4">
                      <img
                        src={project.client.avatar}
                        alt={project.client.name}
                        className="w-12 h-12 rounded-full border border-slate-200 mr-3"
                      />
                      <div>
                        <div className="font-medium text-slate-800">{project.client.name}</div>
                        <div className="text-sm text-slate-500">Anggota sejak {project.client.memberSince}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-sm text-slate-500">Rating</div>
                        <div className="font-bold text-slate-900 flex items-center justify-center mt-1">
                          {project.client.rating}
                          <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-sm text-slate-500">Proyek</div>
                        <div className="font-bold text-slate-900 mt-1">{project.client.projectsPosted}</div>
                      </div>
                    </div>
                      <Link 
                      href={`/client/profile/${project.client.id}`} 
                      className="block w-full text-center py-2 px-4 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                      Lihat Profil
                    </Link>
                  </div>
                </div>
                
                {/* Bid Form Card */}
                {project.status === 'open' && (
                  <SubmitBid project={project} />
                )}
                
                {project.status !== 'open' && (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6">
                      <div className="text-center p-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4">
                          <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Proyek Sudah Tidak Terbuka</h3>
                        <p className="text-slate-600 mb-4">
                          Proyek ini sedang dalam pengerjaan atau sudah selesai sehingga tidak lagi menerima penawaran baru.
                        </p>
                        <a href="/proyek" className="inline-flex items-center text-indigo-500 hover:text-indigo-600 font-medium">
                          Kembali ke Daftar Proyek
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;
