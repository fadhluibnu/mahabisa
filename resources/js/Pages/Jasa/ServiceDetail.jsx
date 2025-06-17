import React, { useState } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ReviewSection from './Components/ReviewSection';
import PackageSection from './Components/PackageSection';
import SellerSection from './Components/SellerSection';
import RelatedServiceCard from './Components/RelatedServiceCard';
import ImageGallery from './Components/ImageGallery';

const ServiceDetail = ({ service, reviewStats, similarServices }) => {
  console.log(service);
  const { auth } = usePage().props;

  // State untuk paket yang dipilih (default ke paket pertama jika ada)
  const [selectedPackage, setSelectedPackage] = useState(
    service.packages && service.packages.length > 0
      ? service.packages[0].id
      : null
  );

  // State untuk gambar yang dipilih
  const [selectedImage, setSelectedImage] = useState(
    service.image || 'https://via.placeholder.com/800x600?text=Tidak+ada+gambar'
  );

  // State untuk tab yang aktif
  const [activeTab, setActiveTab] = useState('description');

  // Helper function untuk format harga ke Rupiah
  const formatRupiah = price => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Helper function untuk render bintang rating
  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className='w-4 h-4 text-yellow-400'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className='w-4 h-4 text-yellow-400'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <defs>
              <linearGradient
                id='half-gradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='50%' stopColor='currentColor' />
                <stop offset='50%' stopColor='#D1D5DB' />
              </linearGradient>
            </defs>
            <path
              fill='url(#half-gradient)'
              d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className='w-4 h-4 text-gray-300'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
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

      <main className='py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Breadcrumb */}
          <nav className='flex mb-6 text-sm text-gray-500'>
            <Link href='/' className='hover:text-gray-700'>
              Beranda
            </Link>
            <span className='mx-2'>/</span>
            <Link href='/eksplorasi' className='hover:text-gray-700'>
              Eksplorasi
            </Link>
            <span className='mx-2'>/</span>
            <Link
              href={`/eksplorasi?category=${service.category?.name || 'all'}`}
              className='hover:text-gray-700'
            >
              {service.category?.name || 'Semua Kategori'}
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-gray-900'>{service.title}</span>
          </nav>

          {/* Service Detail Layout */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Service Images & Details */}
            <div className='lg:col-span-2'>
              {/* Image Gallery */}
              <ImageGallery
                mainImage={
                  service.image ||
                  service.thumbnail ||
                  'https://via.placeholder.com/800x600?text=Tidak+ada+gambar'
                }
                additionalImages={
                  service.galleries && service.galleries.length > 0
                    ? service.galleries.map(gallery => gallery.image_path)
                    : service.additional_images || []
                }
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                title={service.title}
              />

              {/* Tabs */}
              <div className='border-b border-gray-200 mb-6'>
                <nav className='flex -mb-px'>
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
              <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
                {activeTab === 'description' && (
                  <div>
                    <h2 className='text-xl font-bold text-gray-900 mb-4'>
                      {service.title}
                    </h2>
                    <div
                      className='prose prose-sm max-w-none text-gray-700'
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />

                    {/* Skills/Tags */}
                    {service.skills && service.skills.length > 0 && (
                      <div className='mt-6'>
                        <h3 className='text-sm font-medium text-gray-700 mb-2'>
                          Skills:
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                          {service.skills.map((skill, index) => (
                            <span
                              key={index}
                              className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div>
                    <h2 className='text-xl font-bold text-gray-900 mb-4'>
                      Persyaratan Jasa
                    </h2>
                    <p className='text-gray-700 mb-4'>
                      Untuk memberikan hasil terbaik, harap sediakan informasi
                      berikut saat memesan jasa ini:
                    </p>
                    {service.requirements && service.requirements.length > 0 ? (
                      <ul className='space-y-3'>
                        {service.requirements.map((req, index) => (
                          <li key={index} className='flex items-start'>
                            <svg
                              className='h-5 w-5 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0'
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
                            <span className='text-gray-700'>
                              {req.description || req.question}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-gray-500 italic'>
                        Tidak ada persyaratan khusus yang ditentukan oleh
                        penyedia jasa.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'faqs' && (
                  <div>
                    <h2 className='text-xl font-bold text-gray-900 mb-4'>
                      Pertanyaan yang Sering Diajukan (FAQ)
                    </h2>
                    {service.faqs && service.faqs.length > 0 ? (
                      <div className='space-y-4'>
                        {service.faqs.map((faq, index) => (
                          <div
                            key={index}
                            className='border border-gray-200 rounded-lg overflow-hidden'
                          >
                            <div className='p-4 bg-gray-50 border-b border-gray-200'>
                              <h3 className='text-md font-medium text-gray-900'>
                                {faq.question}
                              </h3>
                            </div>
                            <div className='p-4'>
                              <p className='text-gray-700'>{faq.answer}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className='text-gray-500 italic'>
                        Tidak ada FAQ untuk jasa ini.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <ReviewSection
                    reviews={service.reviews || []}
                    averageRating={reviewStats?.average || 0}
                    renderStars={renderStars}
                  />
                )}
              </div>

              {/* Related Services */}
              {similarServices && similarServices.length > 0 && (
                <div className='mb-8'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>
                    Jasa Terkait
                  </h2>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {similarServices.map(relService => (
                      <RelatedServiceCard
                        key={relService.id}
                        service={{
                          id: relService.id,
                          title: relService.title,
                          image:
                            relService.image ||
                            'https://via.placeholder.com/300x200?text=Tidak+ada+gambar',
                          seller: relService.user?.name || 'Freelancer',
                          rating: reviewStats?.average || 0,
                          reviews: reviewStats?.count || 0,
                          price: relService.price,
                        }}
                        formatRupiah={formatRupiah}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Box */}
            <div className='lg:col-span-1'>
              {/* Package Section */}
              <div className='mb-6'>
                <PackageSection
                  packages={service.packages || []}
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  formatRupiah={formatRupiah}
                  serviceId={service.id}
                  isAuthenticated={auth.user ? true : false}
                  isClient={auth.user?.role === 'client'}
                />
              </div>

              {/* Seller Info */}
              <SellerSection
                seller={{
                  id: service.user?.id,
                  name: service.user?.name || 'Freelancer',
                  avatar:
                    service.user?.profile_photo_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(service.user?.name || 'User')}&background=7C3AED&color=fff`,
                  title: service.user?.profile?.title || 'MahaBisa Freelancer',
                  university: service.user?.profile?.education || '',
                  rating: reviewStats?.average || 0,
                  reviews: reviewStats?.count || 0,
                  completedProjects: service.user?.completed_orders_count || 0,
                  memberSince: service.user?.created_at
                    ? new Date(service.user.created_at).toLocaleDateString(
                        'id-ID',
                        { month: 'long', year: 'numeric' }
                      )
                    : '',
                  responseTime:
                    service.user?.profile?.response_time || 'Tidak tersedia',
                  skills: service.user?.skills?.map(skill => skill.name) || [],
                  description:
                    service.user?.profile?.bio || 'Tidak ada deskripsi.',
                }}
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
