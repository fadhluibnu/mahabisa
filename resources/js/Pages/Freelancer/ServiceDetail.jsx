import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import FreelancerLayout from './Components/FreelancerLayout';

const ServiceDetail = ({ service: initialService, recentReviews, ratingDistribution, chartData }) => {
  const { auth } = usePage().props;
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // Log data to help debug
  console.log("Received service data:", initialService);
  console.log("Service requirements data type:", typeof initialService.requirements);
  console.log("Service requirements value:", initialService.requirements);
  
  // Additional debugging - this should always be an array of strings
  if (initialService.requirements) {
    initialService.requirements.forEach((req, index) => {
      console.log(`Requirement ${index}:`, req, typeof req);
    });
  }
  
  // Be more defensive with the initialization
  const defaultService = {
    price: 2500000,
    deliveryTime: 14,
    revisions: 3,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'active',
    featured: true,
    category: 'Web Development',
    packages: [
      {
        id: 1,
        name: 'Paket Dasar',
        price: 2500000,
        deliveryTime: 14,
        revisions: 3,
        features: [
          'Website dengan 5 halaman',
          'Responsive design',
          'Form kontak',
          'Integrasi dengan sosial media',
          'Optimasi SEO dasar',
        ],
      },
      {
        id: 2,
        name: 'Paket Standar',
        price: 4000000,
        deliveryTime: 21,
        revisions: 5,
        features: [
          'Website dengan 10 halaman',
          'Responsive design',
          'Form kontak & newsletter',
          'Integrasi dengan sosial media',
          'Optimasi SEO lengkap',
          'Blog section',
          'Admin dashboard',
        ],
      },
      {
        id: 3,
        name: 'Paket Premium',
        price: 6500000,
        deliveryTime: 30,
        revisions: 7,
        features: [
          'Website dengan 15+ halaman',
          'Responsive design',
          'Form kontak & newsletter',
          'Integrasi dengan sosial media',
          'Optimasi SEO lengkap',
          'Blog section',
          'Admin dashboard',
          'E-commerce functionality',
          'Payment gateway integration',
          'Custom animations',
          'Performance optimization',
        ],
      },
    ],
    requirements: [
      'Detail tentang tujuan website',
      'Brand guideline jika ada',
      'Konten yang akan ditampilkan di website',
      'Referensi website yang disukai',
      'Akses hosting (jika sudah memiliki)',
    ],
    faqs: [
      {
        question: 'Apakah termasuk biaya hosting dan domain?',
        answer: 'Tidak, biaya hosting dan domain tidak termasuk dalam paket. Namun, saya dapat membantu Anda dalam proses pemilihan dan setup hosting yang sesuai dengan kebutuhan website Anda.',
      },
      {
        question: 'Apakah website yang dibuat mobile friendly?',
        answer: 'Ya, semua website yang saya kembangkan bersifat responsive dan dapat diakses dengan baik pada perangkat mobile, tablet, maupun desktop.',
      },
      {
        question: 'Apakah bisa melakukan penambahan fitur di luar paket?',
        answer: 'Ya, bisa. Penambahan fitur akan dikenakan biaya tambahan sesuai dengan kompleksitas fitur yang diminta.',
      },
      {
        question: 'Apakah ada garansi untuk website yang dibuat?',
        answer: 'Ya, saya memberikan garansi perbaikan bug selama 1 bulan setelah website selesai dikembangkan.',
      },
    ],
    stats: {
      orders: 27,
      inProgress: 3,
      completed: 24,
      cancelRate: 0,
      avgRating: 4.8,
      totalReviews: 24,
    },
    createdAt: '2023-01-15',
    updatedAt: '2023-05-20',
  };
  
  // Initialize service with either the passed service or the default
  const [service, setService] = useState(() => {
    // Ensure any initial service has all required properties
    if (initialService) {
      console.log("Initial service requirements:", initialService.requirements);
      return {
        ...defaultService,
        ...initialService,
        packages: initialService.packages || defaultService.packages,
        requirements: Array.isArray(initialService.requirements) ? initialService.requirements : [],
        faqs: initialService.faqs || defaultService.faqs,
        stats: {
          orders: initialService.ordersCount || 0,
          inProgress: initialService.activeOrders || 0,
          completed: initialService.completedOrders || 0,
          cancelRate: 0, // We'll calculate this if needed
          avgRating: initialService.rating || 0,
          totalReviews: initialService.reviewsCount || 0,
        }
      };
    }
    return defaultService;
  });

  // Format price to Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
          />
        </svg>
      );
    }
    return stars;
  };

  const handleToggleStatus = () => {
    axios.put(`/freelancer/services/${service.id}/toggle-status`)
      .then(response => {
        if (response.data.success) {
          setService({
            ...service,
            status: service.status === 'active' ? 'draft' : 'active',
          });
        }
      })
      .catch(error => {
        console.error('Failed to update service status:', error);
      });
  };

  const handleToggleFeatured = () => {
    // For now, we'll continue updating the UI locally since the API endpoint doesn't exist yet
    // But we'll structure it to be ready for when the API is implemented
    setService({
      ...service,
      featured: !service.featured,
    });
    
    // This would be the actual implementation once the API endpoint is created:
    /*
    axios.put(`/freelancer/services/${service.id}/toggle-featured`)
      .then(response => {
        if (response.data.success) {
          setService({
            ...service,
            featured: !service.featured,
          });
        }
      })
      .catch(error => {
        console.error('Failed to update service featured status:', error);
      });
    */
  };

  return (
    <FreelancerLayout
      title="Detail Layanan"
      subtitle="Informasi lengkap tentang layanan yang Anda tawarkan"
    >
      <div className="bg-white shadow-sm rounded-xl overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h2>
                {service.featured && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Featured
                  </span>
                )}
                {service.status === 'active' ? (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Aktif
                  </span>
                ) : (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Draft
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Kategori: {service.category}
              </p>
            </div>            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/freelancer/services/${service.id}/edit`}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Layanan
              </Link>
              <button
                onClick={handleToggleStatus}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {service.status === 'active' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    Nonaktifkan
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Aktifkan
                  </>
                )}
              </button>
              <button
                onClick={handleToggleFeatured}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {service.featured ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Hapus Featured
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Jadikan Featured
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => {
                console.log('Switching to overview tab');
                setActiveTab('overview');
              }}
            >
              Ringkasan
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'packages'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => {
                // Before switching tabs, verify service and packages exist
                console.log('Switching to packages tab, service:', service);
                if (!service || !service.packages) {
                  console.warn('Service or packages is undefined - setting defaults');
                  // Ensure packages exists
                  setService(prevService => ({
                    ...prevService,
                    packages: prevService.packages || []
                  }));
                }
                setActiveTab('packages');
              }}
            >
              Paket
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'requirements'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => {
                console.log('Switching to requirements tab');
                // Ensure requirements exists and is an array
                if (!service || !Array.isArray(service.requirements)) {
                  console.warn('Requirements is not an array - setting defaults');
                  setService(prevService => ({
                    ...prevService,
                    requirements: Array.isArray(prevService.requirements) ? prevService.requirements : []
                  }));
                }
                setActiveTab('requirements');
              }}
            >
              Persyaratan
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'faqs'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => {
                console.log('Switching to FAQs tab');
                // Ensure faqs exists
                if (!service || !service.faqs) {
                  console.warn('FAQs is undefined - setting defaults');
                  setService(prevService => ({
                    ...prevService,
                    faqs: prevService.faqs || []
                  }));
                }
                setActiveTab('faqs');
              }}
            >
              FAQ
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'reviews'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Ulasan
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'stats'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              Statistik
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Deskripsi Layanan</h3>
                <p className="text-gray-700 mb-6">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Harga Mulai Dari</h4>
                    <p className="text-lg font-bold text-gray-900">{formatRupiah(service.price)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Waktu Pengerjaan</h4>
                    <p className="text-lg font-bold text-gray-900">{service.deliveryTime} hari</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Revisi</h4>
                    <p className="text-lg font-bold text-gray-900">{service.revisions} kali</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Dibuat pada</h4>
                  <p className="text-sm text-gray-700 mb-4">{new Date(service.createdAt).toLocaleDateString('id-ID')}</p>
                  
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Terakhir diperbarui</h4>
                  <p className="text-sm text-gray-700">{new Date(service.updatedAt).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Paket Layanan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(service.packages || []).map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg overflow-hidden ${
                    pkg.name === 'Paket Standar'
                      ? 'border-indigo-500 shadow-md'
                      : 'border-gray-200'
                  }`}
                >
                  <div
                    className={`p-4 ${
                      pkg.name === 'Paket Standar'
                        ? 'bg-indigo-50 border-b border-indigo-100'
                        : 'bg-white border-b border-gray-100'
                    }`}
                  >
                    <h4 className="text-lg font-medium text-gray-900">{pkg.name}</h4>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {formatRupiah(pkg.price)}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Waktu Pengerjaan</span>
                        <span className="text-sm font-medium text-gray-900">{pkg.deliveryTime} hari</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">Revisi</span>
                        <span className="text-sm font-medium text-gray-900">{pkg.revisions} kali</span>
                      </div>
                    </div>
                    
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Yang Anda dapatkan:</h5>
                    <ul className="space-y-2">
                      {(pkg.features || []).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Persyaratan untuk Klien</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-4">
                Untuk memberikan hasil terbaik, klien perlu menyediakan informasi dan bahan berikut:
              </p>
              
              <ul className="space-y-3">
                {Array.isArray(service.requirements) && service.requirements.length > 0 ? (
                  service.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{req}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">Belum ada persyaratan yang ditentukan.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Pertanyaan yang Sering Diajukan (FAQ)</h3>
            
            <div className="space-y-4">
              {(service.faqs || []).length > 0 ? (
                service.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h4 className="text-base font-medium text-gray-900">{faq.question}</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700">{faq.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 px-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Belum ada FAQ untuk layanan ini.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Ulasan Terbaru</h3>
              
              {recentReviews && recentReviews.length > 0 ? (
                <div className="space-y-6">
                  {recentReviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <img 
                            src={review.client?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.client?.name || 'User')}`} 
                            alt={review.client?.name}
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{review.client?.name}</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString('id-ID')}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Belum ada ulasan untuk layanan ini.</p>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Distribusi Rating</h3>
              
              {ratingDistribution && (
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    // Calculate percentage
                    const count = ratingDistribution[rating] || 0;
                    const total = Object.values(ratingDistribution).reduce((sum, value) => sum + value, 0);
                    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                    
                    return (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-12">
                          <span className="text-sm font-medium text-gray-900 mr-1">{rating}</span>
                          <svg className="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div className="flex-1 ml-4">
                          <div className="bg-gray-200 rounded-full h-2 w-full">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="ml-4 text-sm text-gray-500 w-12 text-right">{count} ({percentage}%)</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Statistik Layanan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Total Pesanan</h4>
                <p className="text-2xl font-bold text-gray-900">{service.stats?.orders || service.ordersCount || 0}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Sedang Dikerjakan</h4>
                <p className="text-2xl font-bold text-gray-900">{service.stats?.inProgress || service.activeOrders || 0}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Selesai</h4>
                <p className="text-2xl font-bold text-gray-900">{service.stats?.completed || service.completedOrders || 0}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Rating Rata-rata</h4>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900 mr-2">{service.stats?.avgRating || service.rating || 0}</p>
                  <div className="flex">
                    {renderStars(Math.round(service.stats?.avgRating || service.rating || 0))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Jumlah Ulasan</h4>
                <p className="text-2xl font-bold text-gray-900">{service.stats?.totalReviews || service.reviewsCount || 0}</p>
              </div>
            </div>
            
            {chartData && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Pesanan Bulanan</h4>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-7 gap-2">
                    {chartData.labels.map((label, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-indigo-500 rounded-t-sm w-8" 
                          style={{ height: `${Math.max(chartData.orders[index] * 10, 10)}px` }}
                        ></div>
                        <div 
                          className="bg-green-500 rounded-b-sm w-8" 
                          style={{ height: `${Math.max(chartData.completed[index] * 10, 0)}px` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center mt-3 space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-500">Total</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-500">Selesai</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </FreelancerLayout>
  );
};

export default ServiceDetail;
