import React from 'react';
import FreelancerLayout from './Components/FreelancerLayout';
import ReviewCardSingle from './Components/ReviewCardSingle';

const Reviews = () => {
  // Dummy data for reviews
  const reviews = [
    {
      id: 1,
      client: {
        name: 'Budi Santoso',
        company: 'PT Maju Bersama',
        image:
          'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
      },
      project: 'Redesain Website E-commerce',
      rating: 5,
      comment:
        'Sangat puas dengan hasil kerjanya. Desain website sangat menarik dan sesuai dengan kebutuhan kami. Komunikasi lancar dan selalu responsif terhadap feedback yang diberikan.',
      date: '15 Jun 2023',
    },
    {
      id: 2,
      client: {
        name: 'Diana Putri',
        company: 'StartUp Inovasi',
        image:
          'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
      },
      project: 'Pengembangan Aplikasi Mobile',
      rating: 4,
      comment:
        'Aplikasi yang dikembangkan berfungsi dengan baik dan sesuai dengan kebutuhan. Ada beberapa perbaikan kecil yang diperlukan, tapi secara keseluruhan sangat baik.',
      date: '10 Jun 2023',
    },
    {
      id: 3,
      client: {
        name: 'Ahmad Rizal',
        company: 'Toko Online Sejahtera',
        image:
          'https://ui-avatars.com/api/?name=Ahmad+Rizal&background=8b5cf6&color=fff',
      },
      project: 'Integrasi Payment Gateway',
      rating: 5,
      comment:
        'Integrasi payment gateway berjalan dengan lancar dan tidak ada masalah. Sangat profesional dan cepat dalam menyelesaikan pekerjaan.',
      date: '5 Jun 2023',
    },
    {
      id: 4,
      client: {
        name: 'Siti Nuraini',
        company: 'CV Digital Kreatif',
        image:
          'https://ui-avatars.com/api/?name=Siti+Nuraini&background=10b981&color=fff',
      },
      project: 'Landing Page untuk Peluncuran Produk',
      rating: 5,
      comment:
        'Landing page yang dibuat sangat menarik dan dapat meningkatkan konversi penjualan produk kami. Sangat puas dengan hasilnya.',
      date: '1 Jun 2023',
    },
    {
      id: 5,
      client: {
        name: 'Rudi Hartono',
        company: 'PT Solusi Teknologi',
        image:
          'https://ui-avatars.com/api/?name=Rudi+Hartono&background=f59e0b&color=fff',
      },
      project: 'Pembuatan Dashboard Admin',
      rating: 4,
      comment:
        'Dashboard admin yang dibuat sangat fungsional dan mudah digunakan. Terima kasih atas kerjasamanya.',
      date: '25 Mei 2023',
    },
  ];

  // Rating data
  const ratingData = {
    average: 4.8,
    total: reviews.length,
    distribution: {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    },
  };

  // Function to render stars
  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z' />
        </svg>
      );
    }
    return stars;
  };

  return (
    <FreelancerLayout
      title='Ulasan & Rating'
      subtitle='Lihat apa yang klien katakan tentang layanan Anda'
    >
      <div className='bg-white rounded-xl shadow-sm mb-8'>
        <div className='p-6 border-b border-gray-100'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Ringkasan Rating
          </h3>
        </div>

        <div className='p-6'>
          <div className='flex flex-col md:flex-row md:items-center'>
            <div className='flex-shrink-0 text-center mb-6 md:mb-0 md:mr-10'>
              <div className='text-5xl font-bold text-gray-900'>
                {ratingData.average}
              </div>
              <div className='flex justify-center mt-2'>
                {renderStars(Math.round(ratingData.average))}
              </div>
              <div className='text-sm text-gray-500 mt-1'>
                dari {ratingData.total} ulasan
              </div>
            </div>

            <div className='flex-1'>
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className='flex items-center mb-2'>
                  <div className='text-sm font-medium text-gray-600 w-5'>
                    {star}
                  </div>
                  <svg
                    className='h-4 w-4 text-yellow-400 ml-1 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z' />
                  </svg>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-yellow-400 h-2 rounded-full'
                      style={{
                        width: `${(ratingData.distribution[star] / ratingData.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className='text-sm text-gray-500 ml-3 w-10'>
                    {ratingData.distribution[star]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm'>
        <div className='p-6 border-b border-gray-100'>
          <h3 className='text-lg font-semibold text-gray-900'>Semua Ulasan</h3>
        </div>

        {reviews.map(review => (
          <ReviewCardSingle key={review.id} {...review} />
        ))}
      </div>
    </FreelancerLayout>
  );
};

export default Reviews;
