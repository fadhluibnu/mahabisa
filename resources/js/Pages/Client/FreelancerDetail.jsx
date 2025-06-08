import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from './Components/ClientLayout';
import Button from '@/Components/Button';
import ReviewCard from '@/Components/ReviewCard';
import ServiceCard from '@/Components/ServiceCard';

const FreelancerDetail = ({ id, user }) => {
  const [activeTab, setActiveTab] = useState('portfolio');
  
  // Dummy freelancer data
  const freelancer = {
    id: id,
    name: 'Ricky Harahap',
    title: 'Full Stack Developer',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    rating: 4.9,
    reviewCount: 42,
    projectsCompleted: 57,
    responseRate: 98,
    responseTime: '1 jam',
    memberSince: 'Maret 2023',
    lastActive: '1 jam yang lalu',
    location: 'Jakarta, Indonesia',
    description: 'Saya adalah full stack developer dengan pengalaman lebih dari 3 tahun dalam pengembangan web dan mobile. Saya ahli dalam React, Laravel, dan Node.js. Saya menawarkan solusi pengembangan yang efisien dan tepat waktu untuk memenuhi kebutuhan Anda.',
    skills: ['Web Development', 'React.js', 'Laravel', 'Node.js', 'Mobile Development', 'UI/UX Design', 'Database Management', 'API Development'],
    education: [
      { institution: 'Universitas Indonesia', degree: 'S1 Teknik Informatika', year: '2018-2022' }
    ],
    languages: [
      { language: 'Indonesia', proficiency: 'Native' },
      { language: 'Inggris', proficiency: 'Profesional' }
    ],
    services: [
      {
        id: 1,
        title: 'Pembuatan Website Full Stack dengan React & Laravel',
        image: '/assets/web.png',
        price: 2500000,
        rating: 4.9,
        reviewCount: 24,
        isBestSeller: true
      },
      {
        id: 2,
        title: 'Pengembangan Aplikasi Mobile dengan React Native',
        image: '/assets/design.png',
        price: 3000000,
        rating: 4.8,
        reviewCount: 18,
        isBestSeller: false
      }
    ],
    portfolio: [
      {
        id: 1,
        title: 'E-Commerce Website',
        description: 'Website e-commerce lengkap dengan sistem pembayaran, keranjang belanja, dan panel admin.',
        image: '/assets/Website Responsive.png',
        link: '#'
      },
      {
        id: 2,
        title: 'Aplikasi Manajemen Proyek',
        description: 'Aplikasi web untuk manajemen proyek dan kolaborasi tim dengan fitur real-time notification.',
        image: '/assets/proyek.png',
        link: '#'
      }
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: 'Andi Pratama',
          avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
        },
        rating: 5,
        date: '23 Mei 2024',
        comment: 'Sangat profesional dan komunikatif. Ricky menyelesaikan proyek sesuai dengan kebutuhan dan tepat waktu. Saya sangat puas dengan hasilnya.'
      },
      {
        id: 2,
        user: {
          name: 'Siti Rahma',
          avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
        },
        rating: 4.5,
        date: '14 April 2024',
        comment: 'Bekerja dengan Ricky sangat menyenangkan. Ia memiliki kemampuan teknis yang bagus dan responsif terhadap revisi. Akan menggunakan jasanya lagi di masa depan.'
      }
    ]
  };

  return (
    <ClientLayout title="Detail Freelancer" subtitle="Lihat informasi dan portfolio freelancer">
      <Head title={`${freelancer.name} - MahaBisa Client`} />

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <img 
              src={freelancer.avatar} 
              alt={freelancer.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{freelancer.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{freelancer.title}</p>
              <div className="flex items-center mb-3">
                <div className="flex items-center text-yellow-400 mr-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="ml-1 text-gray-800 font-medium">{freelancer.rating}</span>
                </div>
                <span className="text-gray-600">({freelancer.reviewCount} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {freelancer.projectsCompleted} proyek selesai
                </div>
                <div className="flex items-center ml-4">
                  <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Respon: {freelancer.responseRate}%
                </div>
                <div className="flex items-center ml-4">
                  <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Waktu respon: {freelancer.responseTime}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                href={`/client/messages?freelancer=${freelancer.id}`}
              >
                Hubungi
              </Button>
              <Button
                className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                href={`/client/projects/create?freelancer=${freelancer.id}`}
              >
                Tawarkan Proyek
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'portfolio'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('about')}
            >
              Tentang
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Ulasan ({freelancer.reviewCount})
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('services')}
            >
              Layanan ({freelancer.services.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'portfolio' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {freelancer.portfolio.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <a href={item.link} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Lihat Detail →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tentang Saya</h2>
              <p className="text-gray-600 mb-6">{freelancer.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Keterampilan</h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Pendidikan</h3>
                <div className="space-y-3">
                  {freelancer.education.map((edu, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">{edu.institution}</p>
                        <p className="text-gray-600">{edu.degree} • {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Bahasa</h3>
                <div className="space-y-3">
                  {freelancer.languages.map((lang, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">{lang.language}</p>
                        <p className="text-gray-600">{lang.proficiency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Info Tambahan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span className="text-gray-600">Lokasi: {freelancer.location}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-gray-600">Bergabung sejak: {freelancer.memberSince}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-600">Terakhir aktif: {freelancer.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Ulasan ({freelancer.reviewCount})</h2>
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-400 mr-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1 text-gray-800 font-semibold text-xl">{freelancer.rating}</span>
                  </div>
                  <span className="text-gray-600">dari {freelancer.reviewCount} ulasan</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {freelancer.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start">
                      <img src={review.user.avatar} alt={review.user.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-800 mr-2">{review.user.name}</h3>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center text-yellow-400 mt-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-600">{review.rating}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Layanan ({freelancer.services.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {freelancer.services.map((service) => (
                  <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-yellow-400 mr-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({service.reviewCount} ulasan)</span>
                        {service.isBestSeller && (
                          <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            Best Seller
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-gray-900">Rp{service.price.toLocaleString()}</p>
                        <a 
                          href={`/jasa/${service.id}`} 
                          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                        >
                          Lihat Detail
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default FreelancerDetail;
