import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';
import { Link } from '@inertiajs/react';

const ServiceDetail = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');

  // State for package selection
  const [selectedPackage, setSelectedPackage] = useState('standard');

  // Dummy service data
  const service = {
    id: 1,
    title: 'Desain UI/UX Profesional untuk Aplikasi Mobile',
    description:
      'Saya akan mendesain UI/UX untuk aplikasi mobile Anda dengan pendekatan yang berfokus pada pengalaman pengguna. Layanan ini mencakup wireframe, mockup, dan prototype yang interaktif.',
    category: 'Design & Creative',
    subcategory: 'UI/UX Design',
    images: [
      'https://via.placeholder.com/800x500/6366f1/ffffff?text=UI+UX+Design+Main',
      'https://via.placeholder.com/800x500/8b5cf6/ffffff?text=UI+UX+Design+Sample+1',
      'https://via.placeholder.com/800x500/a855f7/ffffff?text=UI+UX+Design+Sample+2',
      'https://via.placeholder.com/800x500/d946ef/ffffff?text=UI+UX+Design+Sample+3',
    ],
    freelancer: {
      id: 1,
      name: 'Ahmad Fauzi',
      avatar:
        'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=6366f1&color=fff',
      title: 'Senior UI/UX Designer',
      level: 'Top Rated',
      location: 'Jakarta, Indonesia',
      memberSince: 'Januari 2019',
      responseTime: 'Dalam 2 jam',
      languages: ['Bahasa Indonesia', 'English'],
      rating: 4.9,
      reviews: 56,
      completedProjects: 85,
      description:
        'UI/UX Designer berpengalaman dengan lebih dari 5 tahun di industri kreatif. Spesialisasi saya adalah menciptakan antarmuka yang intuitif dan menarik untuk aplikasi web dan mobile.',
    },
    packages: {
      basic: {
        name: 'Basic',
        description: 'Desain UI dasar untuk 5 layar aplikasi mobile',
        price: 'Rp800.000',
        deliveryTime: '5 hari',
        revisions: '2 kali',
        features: [
          { included: true, text: '5 layar UI' },
          { included: true, text: 'Source file (Figma)' },
          { included: false, text: 'Wireframing' },
          { included: false, text: 'Prototype interaktif' },
          { included: false, text: 'User flow' },
          { included: false, text: 'Design system' },
        ],
      },
      standard: {
        name: 'Standard',
        description: 'Desain UI/UX lengkap untuk 10 layar aplikasi mobile',
        price: 'Rp1.500.000',
        deliveryTime: '7 hari',
        revisions: 'Unlimited',
        features: [
          { included: true, text: '10 layar UI' },
          { included: true, text: 'Source file (Figma)' },
          { included: true, text: 'Wireframing' },
          { included: true, text: 'Prototype interaktif' },
          { included: false, text: 'User flow' },
          { included: false, text: 'Design system' },
        ],
      },
      premium: {
        name: 'Premium',
        description: 'Solusi UI/UX komprehensif untuk aplikasi mobile lengkap',
        price: 'Rp2.500.000',
        deliveryTime: '14 hari',
        revisions: 'Unlimited',
        features: [
          { included: true, text: '20 layar UI' },
          { included: true, text: 'Source file (Figma)' },
          { included: true, text: 'Wireframing' },
          { included: true, text: 'Prototype interaktif' },
          { included: true, text: 'User flow' },
          { included: true, text: 'Design system' },
        ],
      },
    },
    faqs: [
      {
        question: 'Apa saja file yang akan saya terima?',
        answer:
          'Anda akan menerima semua file desain dalam format Figma, termasuk semua aset yang diperlukan. Jika diperlukan, saya juga dapat menyediakan format lain seperti Sketch atau Adobe XD.',
      },
      {
        question: 'Apakah Anda juga mengembangkan aplikasi dari desain ini?',
        answer:
          'Tidak, saya hanya fokus pada UI/UX design. Namun saya dapat merekomendasikan developer yang dapat mengimplementasikan desain ini menjadi aplikasi yang berfungsi.',
      },
      {
        question: 'Berapa banyak revisi yang bisa saya minta?',
        answer:
          'Jumlah revisi tergantung pada paket yang Anda pilih. Paket Basic mendapatkan 2 kali revisi, sedangkan paket Standard dan Premium mendapatkan revisi unlimited dalam batas waktu yang ditentukan.',
      },
      {
        question:
          'Apakah Anda dapat mendesain untuk sistem operasi tertentu (iOS/Android)?',
        answer:
          'Ya, saya dapat mendesain UI yang mengikuti guideline iOS (Human Interface Guidelines) atau Android (Material Design), atau pendekatan custom sesuai kebutuhan Anda.',
      },
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: 'Budi Setiawan',
          avatar:
            'https://ui-avatars.com/api/?name=Budi+Setiawan&background=3b82f6&color=fff',
        },
        rating: 5,
        date: '15 Juni 2023',
        comment:
          'Desain yang sangat bagus dan profesional. Ahmad sangat responsif dan memahami kebutuhan kami dengan cepat. Revisi dilakukan dengan sangat baik. Pasti akan menggunakan jasanya lagi!',
      },
      {
        id: 2,
        user: {
          name: 'Diana Putri',
          avatar:
            'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
        },
        rating: 5,
        date: '2 Juni 2023',
        comment:
          'Pengalaman yang luar biasa! Desain UI/UX yang dihasilkan sangat menarik dan user-friendly. Ahmad sangat komunikatif dan selalu memberikan update perkembangan secara berkala.',
      },
      {
        id: 3,
        user: {
          name: 'Eko Susanto',
          avatar:
            'https://ui-avatars.com/api/?name=Eko+Susanto&background=10b981&color=fff',
        },
        rating: 4,
        date: '25 Mei 2023',
        comment:
          'Hasil desainnya bagus, tapi ada beberapa detail yang perlu direvisi beberapa kali. Overall puas dengan hasilnya dan akan menggunakan jasa ini lagi di kemudian hari.',
      },
    ],
  };

  // Function to calculate average rating
  const calculateAverageRating = () => {
    const total = service.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return (total / service.reviews.length).toFixed(1);
  };

  return (
    <ClientLayout title='Detail Layanan' subtitle={service.title}>
      <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left column - service details */}
          <div className='lg:col-span-2 p-6'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              {service.title}
            </h1>

            {/* Service images */}
            <div className='mb-6'>
              <div className='relative h-80 bg-gray-200 rounded-lg overflow-hidden mb-2'>
                <img
                  src={service.images[0]}
                  alt={service.title}
                  className='w-full h-full object-cover'
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/600x400?text=Service+Image';
                  }}
                />
              </div>
              <div className='grid grid-cols-4 gap-2'>
                {service.images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className='h-20 bg-gray-100 rounded-lg overflow-hidden'
                  >
                    <img
                      src={image}
                      alt={`${service.title} ${index + 1}`}
                      className='w-full h-full object-cover'
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/150x100?text=Image+${index + 1}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Freelancer info */}
            <div className='flex items-center mb-6 p-4 border border-gray-200 rounded-lg'>
              <img
                src={service.freelancer.avatar}
                alt={service.freelancer.name}
                className='w-16 h-16 rounded-full object-cover mr-4'
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(service.freelancer.name)}&background=e0f2f1&color=0f766e&size=100`;
                }}
              />
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  {service.freelancer.name}
                </h3>
                <p className='text-sm text-gray-600'>
                  {service.freelancer.title}
                </p>
                <div className='flex items-center mt-1'>
                  <div className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(service.freelancer.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                    <span className='ml-1 text-sm text-gray-500'>
                      {service.freelancer.rating}
                    </span>
                  </div>
                  <span className='mx-2 text-gray-300'>•</span>
                  <span className='text-sm text-gray-500'>
                    {service.freelancer.reviews} ulasan
                  </span>
                </div>
              </div>{' '}
              <div className='ml-auto'>
                <a
                  href={`/client/freelancers/${service.freelancer.id}`}
                  className='inline-flex items-center px-3 py-1.5 border border-indigo-500 text-xs font-medium rounded text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Lihat Profil
                </a>
              </div>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 mb-6'>
              <nav className='flex -mb-px'>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Deskripsi
                </button>
                <button
                  onClick={() => setActiveTab('packages')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'packages'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Paket & Harga
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Ulasan ({service.reviews.length})
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'faq'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  FAQ
                </button>
              </nav>
            </div>

            {/* Tab content */}
            <div className='mb-8'>
              {/* Overview */}
              {activeTab === 'overview' && (
                <div>
                  <div className='mb-6'>
                    <h3 className='text-lg font-medium text-gray-900 mb-3'>
                      Tentang Layanan Ini
                    </h3>
                    <p className='text-gray-700 whitespace-pre-line'>
                      {service.description}
                    </p>
                    <p className='text-gray-700 mt-4'>
                      Sebagai seorang UI/UX designer berpengalaman, saya
                      memahami pentingnya desain yang tidak hanya menarik secara
                      visual tetapi juga memberikan pengalaman pengguna yang
                      optimal. Layanan ini dirancang untuk membantu Anda
                      menciptakan aplikasi mobile yang intuitif, mudah
                      digunakan, dan menarik.
                    </p>
                    <p className='text-gray-700 mt-4'>
                      Proses desain saya dimulai dengan memahami kebutuhan
                      bisnis dan pengguna Anda. Kemudian saya akan membuat
                      wireframe untuk memetakan alur pengguna dan struktur
                      aplikasi. Setelah wireframe disetujui, saya akan membuat
                      desain visual high-fidelity dan prototype interaktif.
                    </p>
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-lg font-medium text-gray-900 mb-3'>
                      Apa yang Saya Tawarkan
                    </h3>
                    <ul className='space-y-2 text-gray-700'>
                      <li className='flex items-start'>
                        <svg
                          className='h-5 w-5 text-indigo-500 mr-2'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>
                          Desain UI yang modern dan estetik untuk aplikasi
                          mobile
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <svg
                          className='h-5 w-5 text-indigo-500 mr-2'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>
                          Wireframe dan user flow untuk merancang pengalaman
                          pengguna
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <svg
                          className='h-5 w-5 text-indigo-500 mr-2'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>
                          Prototype interaktif untuk mensimulasikan alur
                          aplikasi
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <svg
                          className='h-5 w-5 text-indigo-500 mr-2'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>
                          Design system lengkap untuk menjaga konsistensi UI
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <svg
                          className='h-5 w-5 text-indigo-500 mr-2'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>
                          File source (Figma) dan aset yang siap
                          diimplementasikan
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <svg
                          className='h-5 w-5 text-indigo-500 mr-2'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>
                          Revisi untuk memastikan hasil sesuai dengan kebutuhan
                          Anda
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-lg font-medium text-gray-900 mb-3'>
                      Proses Kerja
                    </h3>
                    <ol className='space-y-4 text-gray-700'>
                      <li className='flex'>
                        <span className='flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium flex items-center justify-center mr-3'>
                          1
                        </span>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Discovery & Research
                          </h4>
                          <p className='mt-1'>
                            Memahami kebutuhan bisnis, target pengguna, dan
                            tujuan aplikasi Anda
                          </p>
                        </div>
                      </li>
                      <li className='flex'>
                        <span className='flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium flex items-center justify-center mr-3'>
                          2
                        </span>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Wireframing
                          </h4>
                          <p className='mt-1'>
                            Membuat wireframe untuk memetakan struktur dan alur
                            aplikasi
                          </p>
                        </div>
                      </li>
                      <li className='flex'>
                        <span className='flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium flex items-center justify-center mr-3'>
                          3
                        </span>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            UI Design
                          </h4>
                          <p className='mt-1'>
                            Mengembangkan desain visual dengan style dan
                            branding yang sesuai
                          </p>
                        </div>
                      </li>
                      <li className='flex'>
                        <span className='flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium flex items-center justify-center mr-3'>
                          4
                        </span>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Prototyping
                          </h4>
                          <p className='mt-1'>
                            Membuat prototype interaktif untuk mensimulasikan
                            pengalaman pengguna
                          </p>
                        </div>
                      </li>
                      <li className='flex'>
                        <span className='flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium flex items-center justify-center mr-3'>
                          5
                        </span>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Revisi & Finalisasi
                          </h4>
                          <p className='mt-1'>
                            Menyempurnakan desain berdasarkan feedback hingga
                            hasil final
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Packages */}
              {activeTab === 'packages' && (
                <div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                    {Object.keys(service.packages).map(pkg => {
                      const packageInfo = service.packages[pkg];
                      return (
                        <div
                          key={pkg}
                          className={`border rounded-lg overflow-hidden ${selectedPackage === pkg ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}
                        >
                          <div className='p-4'>
                            <h3 className='text-lg font-medium text-gray-900'>
                              {packageInfo.name}
                            </h3>
                            <p className='text-sm text-gray-600 mt-1'>
                              {packageInfo.description}
                            </p>
                            <p className='text-xl font-bold text-indigo-600 mt-3'>
                              {packageInfo.price}
                            </p>

                            <div className='mt-4 space-y-2'>
                              <div className='flex items-center text-sm'>
                                <svg
                                  className='h-5 w-5 text-indigo-500 mr-2'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                                <span>
                                  Pengerjaan: {packageInfo.deliveryTime}
                                </span>
                              </div>
                              <div className='flex items-center text-sm'>
                                <svg
                                  className='h-5 w-5 text-indigo-500 mr-2'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                                </svg>
                                <span>Revisi: {packageInfo.revisions}</span>
                              </div>
                            </div>

                            <div className='mt-4 space-y-2'>
                              {packageInfo.features.map((feature, index) => (
                                <div key={index} className='flex items-start'>
                                  {feature.included ? (
                                    <svg
                                      className='h-5 w-5 text-indigo-500 mr-2'
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className='h-5 w-5 text-gray-300 mr-2'
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                  )}
                                  <span
                                    className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}
                                  >
                                    {feature.text}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={() => setSelectedPackage(pkg)}
                              className={`w-full mt-4 px-4 py-2 text-sm font-medium rounded-md ${
                                selectedPackage === pkg
                                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                  : 'border border-indigo-500 text-indigo-600 hover:bg-indigo-50'
                              }`}
                            >
                              {selectedPackage === pkg
                                ? 'Paket Terpilih'
                                : 'Pilih Paket'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className='mt-6'>
                    <h3 className='text-lg font-medium text-gray-900 mb-3'>
                      Perbandingan Paket
                    </h3>
                    <div className='overflow-x-auto'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead>
                          <tr>
                            <th className='px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                              Fitur
                            </th>
                            {Object.keys(service.packages).map(pkg => (
                              <th
                                key={pkg}
                                className='px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                              >
                                {service.packages[pkg].name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          <tr>
                            <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-900'>
                              Harga
                            </td>
                            {Object.keys(service.packages).map(pkg => (
                              <td
                                key={pkg}
                                className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'
                              >
                                {service.packages[pkg].price}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-900'>
                              Waktu Pengerjaan
                            </td>
                            {Object.keys(service.packages).map(pkg => (
                              <td
                                key={pkg}
                                className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'
                              >
                                {service.packages[pkg].deliveryTime}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-900'>
                              Revisi
                            </td>
                            {Object.keys(service.packages).map(pkg => (
                              <td
                                key={pkg}
                                className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'
                              >
                                {service.packages[pkg].revisions}
                              </td>
                            ))}
                          </tr>
                          {service.packages.basic.features.map((_, index) => (
                            <tr key={index}>
                              <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-900'>
                                {service.packages.premium.features[index].text}
                              </td>
                              {Object.keys(service.packages).map(pkg => (
                                <td
                                  key={pkg}
                                  className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'
                                >
                                  {service.packages[pkg].features[index]
                                    .included ? (
                                    <svg
                                      className='h-5 w-5 text-indigo-500'
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className='h-5 w-5 text-gray-300'
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews */}
              {activeTab === 'reviews' && (
                <div>
                  <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
                    <div className='flex items-center'>
                      <div className='flex-1'>
                        <h3 className='text-xl font-bold text-gray-900'>
                          {calculateAverageRating()}
                        </h3>
                        <div className='flex items-center mt-1'>
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(calculateAverageRating())
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          ))}
                          <span className='ml-2 text-sm text-gray-500'>
                            {service.reviews.length} ulasan
                          </span>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        {[5, 4, 3, 2, 1].map(rating => {
                          const count = service.reviews.filter(
                            r => r.rating === rating
                          ).length;
                          const percentage = Math.round(
                            (count / service.reviews.length) * 100
                          );
                          return (
                            <div key={rating} className='flex items-center'>
                              <div className='flex items-center w-16'>
                                <span className='text-sm text-gray-600'>
                                  {rating}
                                </span>
                                <svg
                                  className='w-4 h-4 ml-1 text-yellow-400'
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                              </div>
                              <div className='w-48 h-2 mx-2 bg-gray-200 rounded-full'>
                                <div
                                  className='h-2 bg-yellow-400 rounded-full'
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className='text-sm text-gray-600'>
                                {percentage}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    {service.reviews.map(review => (
                      <div
                        key={review.id}
                        className='p-4 border border-gray-200 rounded-lg'
                      >
                        <div className='flex items-start'>
                          <img
                            src={review.user.avatar}
                            alt={review.user.name}
                            className='w-10 h-10 rounded-full object-cover mr-4'
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user.name)}&background=f0fdfa&color=115e59&size=60`;
                            }}
                          />
                          <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                              <h4 className='text-sm font-medium text-gray-900'>
                                {review.user.name}
                              </h4>
                              <span className='text-xs text-gray-500'>
                                {review.date}
                              </span>
                            </div>
                            <div className='flex items-center mt-1'>
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                              ))}
                            </div>
                            <p className='mt-2 text-sm text-gray-600'>
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {activeTab === 'faq' && (
                <div className='space-y-4'>
                  {service.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className='border border-gray-200 rounded-lg overflow-hidden'
                    >
                      <details className='group'>
                        <summary className='flex items-center justify-between p-4 cursor-pointer'>
                          <h3 className='text-sm font-medium text-gray-900'>
                            {faq.question}
                          </h3>
                          <svg
                            className='h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 9l-7 7-7-7'
                            />
                          </svg>
                        </summary>
                        <div className='px-4 pb-4 pt-0 text-sm text-gray-600'>
                          <p>{faq.answer}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column - order summary */}
          <div className='lg:col-span-1 p-6 border-t lg:border-t-0 lg:border-l border-gray-200'>
            <div className='sticky top-6'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Ringkasan Pesanan
              </h3>

              <div className='mb-4'>
                <p className='text-sm text-gray-600 mb-1'>Paket terpilih:</p>
                <div className='flex items-center justify-between'>
                  <p className='font-medium text-gray-900'>
                    {service.packages[selectedPackage].name}
                  </p>
                  <p className='font-medium text-gray-900'>
                    {service.packages[selectedPackage].price}
                  </p>
                </div>
              </div>

              <div className='border-t border-gray-200 pt-4 mb-6'>
                <div className='flex items-center justify-between'>
                  <p className='text-base font-medium text-gray-900'>Total</p>
                  <p className='text-base font-medium text-indigo-600'>
                    {service.packages[selectedPackage].price}
                  </p>
                </div>
                <p className='text-xs text-gray-500 mt-1'>
                  Pengerjaan dalam{' '}
                  {service.packages[selectedPackage].deliveryTime}
                </p>
              </div>
              <div className='space-y-4'>
                <Link
                  href={`/client/projects/create?serviceId=${service.id}&freelancerId=${service.freelancer.id}`}
                  className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Pesan Sekarang
                </Link>

                <Link
                  href={`/client/messages/${service.freelancer.id}`}
                  className='w-full flex items-center justify-center px-4 py-2 border border-indigo-500 rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                    />
                  </svg>
                  Hubungi Freelancer
                </Link>
              </div>

              <div className='mt-6'>
                <div className='flex items-center mb-4'>
                  <svg
                    className='h-5 w-5 text-indigo-500 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-xs text-gray-600'>
                    Pembayaran aman melalui MahaBisa
                  </span>
                </div>
                <div className='flex items-center mb-4'>
                  <svg
                    className='h-5 w-5 text-indigo-500 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-xs text-gray-600'>
                    Pembayaran setelah pekerjaan selesai
                  </span>
                </div>
                <div className='flex items-center'>
                  <svg
                    className='h-5 w-5 text-indigo-500 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-xs text-gray-600'>
                    Garansi kepuasan 100%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ServiceDetail;
