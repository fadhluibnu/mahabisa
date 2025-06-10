import React, { useState } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ReviewSection from './Components/ReviewSection';
import PackageSection from './Components/PackageSection';
import SellerSection from './Components/SellerSection';
import RelatedServiceCard from './Components/RelatedServiceCard';
import ImageGallery from './Components/ImageGallery';

const ServiceDetail = ({ id }) => {
  const { auth } = usePage().props;
  // State untuk menyimpan data jasa
  const [service, setService] = useState({
    id: id || 1,
    title: 'Web Development dengan React & Laravel',
    description: 'Membuat website modern dengan React di frontend dan Laravel di backend. Termasuk responsive design dan optimasi kinerja untuk pengalaman pengguna yang maksimal.',
    longDescription: `
      <p>Saya menawarkan jasa pembuatan website modern menggunakan teknologi terkini yaitu React.js untuk frontend dan Laravel untuk backend. Kombinasi teknologi ini akan menghasilkan website yang cepat, responsif, dan mudah dikelola.</p>
      
      <p>Website yang dibuat akan memiliki tampilan yang menarik, responsif (mobile-friendly), dan performa yang optimal. Selain itu, website juga akan dilengkapi dengan fitur SEO dasar untuk membantu meningkatkan peringkat di mesin pencari.</p>
      
      <p>Layanan ini cocok untuk:</p>
      <ul>
        <li>Perusahaan yang ingin memiliki website profesional</li>
        <li>Startup yang membutuhkan landing page menarik</li>
        <li>Toko online yang ingin meningkatkan pengalaman pengguna</li>
        <li>Portfolio personal dengan tampilan profesional</li>
      </ul>
    `,
    price: 2500000,
    deliveryTime: 14,
    revisions: 3,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    status: 'active',
    featured: true,
    category: 'Web Development',
    tags: ['React', 'Laravel', 'Web Development', 'Responsive Design', 'SEO'],
    seller: {
      id: 1,
      name: 'Ahmad Rizky',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      title: 'Full Stack Developer',
      university: 'Universitas Indonesia',
      rating: 4.9,
      reviews: 38,
      completedProjects: 42,
      memberSince: 'Januari 2022',
      responseTime: '1 jam',
      skills: ['React', 'Laravel', 'Node.js', 'MySQL', 'Tailwind CSS'],
      description: 'Full Stack Developer dengan pengalaman 3 tahun dalam pengembangan aplikasi web menggunakan React.js dan Laravel. Mahasiswa Ilmu Komputer di Universitas Indonesia.'
    },
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
    reviews: [
      {
        id: 1,
        user: {
          name: 'Budi Santoso',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        rating: 5,
        date: '12 Mei 2023',
        comment: 'Sangat puas dengan hasil kerja Ahmad. Website yang dibuat sangat sesuai dengan kebutuhan dan ekspektasi saya. Proses komunikasi juga lancar dan responsif.',
      },
      {
        id: 2,
        user: {
          name: 'Citra Puspita',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        rating: 4,
        date: '3 April 2023',
        comment: 'Website yang dibuat sangat bagus dan responsif. Namun, ada beberapa revisi kecil yang diperlukan. Ahmad dengan cepat menanggapi dan memperbaiki sesuai dengan permintaan saya.',
      },
      {
        id: 3,
        user: {
          name: 'Dodi Prakoso',
          avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
        },
        rating: 5,
        date: '17 Maret 2023',
        comment: 'Luar biasa! Hasil kerjanya melampaui ekspektasi saya. Website yang dibuat tidak hanya menarik secara visual tetapi juga cepat dan fungsional. Sangat merekomendasikan jasa Ahmad!',
      },
    ],
    relatedServices: [
      {
        id: 2,
        title: 'UI/UX Design untuk Website & Mobile App',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        seller: 'Anisa Widya',
        rating: 4.8,
        reviews: 24,
        price: 1800000,
      },
      {
        id: 3,
        title: 'Mobile App Development dengan React Native',
        image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        seller: 'Budi Santoso',
        rating: 4.7,
        reviews: 19,
        price: 3500000,
      },
      {
        id: 4,
        title: 'WordPress Website Development',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        seller: 'Citra Puspita',
        rating: 4.9,
        reviews: 31,
        price: 1500000,
      },
    ],
  });

  // State untuk paket yang dipilih
  const [selectedPackage, setSelectedPackage] = useState(1);
  // State untuk gambar yang dipilih
  const [selectedImage, setSelectedImage] = useState(service.image);
  // State untuk tab yang aktif
  const [activeTab, setActiveTab] = useState('description');

  // Helper function untuk format harga ke Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Helper function untuk render bintang rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <>
      <Head title={service.title} />
      <Head title={`MahaBisa | ${service.title}`} />
      <Navbar user={auth.user} />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <Link href="/eksplorasi" className="hover:text-gray-700">
              Eksplorasi
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/eksplorasi?category=${service.category}`} className="hover:text-gray-700">
              {service.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{service.title}</span>
          </nav>

          {/* Service Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Service Images & Details */}            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <ImageGallery 
                mainImage={service.image}
                additionalImages={service.additionalImages}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                title={service.title}
              />

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex -mb-px">
                  <button
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'description'
                        ? 'text-[#7C3AED] border-b-2 border-[#7C3AED]'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Deskripsi
                  </button>
                  <button
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'requirements'
                        ? 'text-[#7C3AED] border-b-2 border-[#7C3AED]'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('requirements')}
                  >
                    Persyaratan
                  </button>
                  <button
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'faqs'
                        ? 'text-[#7C3AED] border-b-2 border-[#7C3AED]'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('faqs')}
                  >
                    FAQ
                  </button>
                  <button
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'reviews'
                        ? 'text-[#7C3AED] border-b-2 border-[#7C3AED]'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Ulasan ({service.reviews.length})
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                {activeTab === 'description' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    <div 
                      className="prose prose-sm max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: service.longDescription }}
                    />
                    
                    {/* Tags */}
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Persyaratan Jasa
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Untuk memberikan hasil terbaik, harap sediakan informasi berikut saat memesan jasa ini:
                    </p>
                    <ul className="space-y-3">
                      {service.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'faqs' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Pertanyaan yang Sering Diajukan (FAQ)
                    </h2>
                    <div className="space-y-4">
                      {service.faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-md font-medium text-gray-900">
                              {faq.question}
                            </h3>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}                {activeTab === 'reviews' && (
                  <ReviewSection 
                    reviews={service.reviews} 
                    averageRating={service.reviews.reduce((acc, review) => acc + review.rating, 0) / service.reviews.length}
                    renderStars={renderStars}
                  />
                )}
              </div>              {/* Related Services */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Jasa Terkait
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {service.relatedServices.map((relService) => (
                    <RelatedServiceCard 
                      key={relService.id} 
                      service={relService} 
                      formatRupiah={formatRupiah} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Box */}            <div className="lg:col-span-1">
              {/* Package Section */}
              <div className="mb-6">
                <PackageSection 
                  packages={service.packages}
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  formatRupiah={formatRupiah}
                />
              </div>

              {/* Seller Info */}
              <SellerSection
                seller={service.seller}
                renderStars={renderStars}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ServiceDetail;
