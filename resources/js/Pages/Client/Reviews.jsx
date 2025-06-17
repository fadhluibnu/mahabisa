import React, { useState } from 'react';
import ClientLayout from './Components/ClientLayout';
import { Link } from '@inertiajs/react';

const Reviews = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('given');
  // Dummy data for reviews given by client
  const reviewsGiven = [
    {
      id: 1,
      freelancerName: 'Ahmad Fauzi',
      freelancerAvatar:
        'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=6366f1&color=fff',
      freelancerRole: 'Graphic Designer',
      projectTitle: 'Company Logo Design',
      rating: 5,
      comment:
        'Ahmad sangat profesional dan cepat dalam menyelesaikan desain logo perusahaan kami. Hasilnya melebihi ekspektasi kami!',
      date: '15 Juni 2023',
      projectId: 101,
    },
    {
      id: 2,
      freelancerName: 'Siti Nurhaliza',
      freelancerAvatar:
        'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=f59e0b&color=fff',
      freelancerRole: 'Content Writer',
      projectTitle: 'Konten Blog Bulanan',
      rating: 4,
      comment:
        'Konten yang dihasilkan sangat bagus dan SEO-friendly. Pengerjaan tepat waktu sesuai jadwal yang disepakati.',
      date: '2 Mei 2023',
      projectId: 102,
    },
    {
      id: 3,
      freelancerName: 'Budi Santoso',
      freelancerAvatar:
        'https://ui-avatars.com/api/?name=Budi+Santoso&background=10b981&color=fff',
      freelancerRole: 'Mobile Developer',
      projectTitle: 'Aplikasi Android untuk Bisnis',
      rating: 4,
      comment:
        'Aplikasi berjalan dengan baik dan fitur-fiturnya sesuai dengan kebutuhan. Ada beberapa bug kecil yang perlu diperbaiki.',
      date: '17 April 2023',
      projectId: 103,
    },
    {
      id: 4,
      freelancerName: 'Diana Putri',
      freelancerAvatar:
        'https://ui-avatars.com/api/?name=Diana+Putri&background=ec4899&color=fff',
      freelancerRole: 'Logo Designer',
      projectTitle: 'Redesign Logo Produk',
      rating: 5,
      comment:
        'Diana sangat kreatif dan dapat menangkap esensi dari brand kami. Proses revisi sangat lancar dan komunikatif.',
      date: '5 Maret 2023',
      projectId: 104,
    },
  ];
  // Dummy data for pending reviews (projects that need to be reviewed)
  const pendingReviews = [
    {
      id: 1,
      freelancerName: 'Eko Prasetyo',
      freelancerAvatar:
        'https://ui-avatars.com/api/?name=Eko+Prasetyo&background=3b82f6&color=fff',
      freelancerRole: 'Web Developer',
      projectTitle: 'Website E-commerce',
      completionDate: '2 Juni 2023',
      projectId: 105,
    },
    {
      id: 2,
      freelancerName: 'Farah Diba',
      freelancerAvatar:
        'https://ui-avatars.com/api/?name=Farah+Diba&background=a855f7&color=fff',
      freelancerRole: 'UI/UX Designer',
      projectTitle: 'Redesign Aplikasi Mobile',
      completionDate: '10 Juni 2023',
      projectId: 106,
    },
  ];

  // State for review form
  const [reviewForm, setReviewForm] = useState({
    projectId: null,
    rating: 0,
    comment: '',
  });

  // Toggle review form for a specific project
  const [showReviewForm, setShowReviewForm] = useState(false);

  const openReviewForm = projectId => {
    setReviewForm({
      projectId,
      rating: 0,
      comment: '',
    });
    setShowReviewForm(true);
  };

  const handleRatingChange = rating => {
    setReviewForm({
      ...reviewForm,
      rating,
    });
  };

  const handleCommentChange = e => {
    setReviewForm({
      ...reviewForm,
      comment: e.target.value,
    });
  };

  const submitReview = e => {
    e.preventDefault();
    // In a real app, you would submit this to the server
    console.log('Submitting review:', reviewForm);
    setShowReviewForm(false);
    // Reset form
    setReviewForm({
      projectId: null,
      rating: 0,
      comment: '',
    });
  };

  return (
    <ClientLayout
      title='Ulasan'
      subtitle='Kelola ulasan untuk freelancer dan layanan'
    >
      <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
        {/* Tabs */}
        <div className='border-b border-gray-200'>
          <nav className='flex'>
            <button
              onClick={() => setActiveTab('given')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'given'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Ulasan yang Diberikan
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'pending'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Perlu Diulas
              {pendingReviews.length > 0 && (
                <span className='ml-2 px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-800'>
                  {pendingReviews.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className='p-6'>
          {activeTab === 'given' && (
            <div>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Ulasan yang Anda Berikan
              </h3>

              {reviewsGiven.length > 0 ? (
                <div className='space-y-6'>
                  {reviewsGiven.map(review => (
                    <div key={review.id} className='bg-gray-50 p-4 rounded-lg'>
                      <div className='flex items-start'>
                        <img
                          src={review.freelancerAvatar}
                          alt={review.freelancerName}
                          className='w-12 h-12 rounded-full object-cover'
                          onError={e => {
                            e.target.onerror = null;
                            e.target.src =
                              'https://via.placeholder.com/48?text=' +
                              review.freelancerName.charAt(0);
                          }}
                        />
                        <div className='ml-4 flex-1'>
                          <div className='flex items-center justify-between'>
                            <h4 className='text-sm font-medium text-gray-900'>
                              {review.freelancerName}
                            </h4>
                            <span className='text-xs text-gray-500'>
                              {review.date}
                            </span>
                          </div>
                          <p className='text-xs text-gray-500'>
                            {review.freelancerRole}
                          </p>
                          <p className='text-sm font-medium mt-1'>
                            Proyek: {review.projectTitle}
                          </p>

                          <div className='flex items-center mt-2'>
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

                          <p className='mt-3 text-sm text-gray-600'>
                            {review.comment}
                          </p>

                          <div className='mt-3 flex justify-end'>
                            <Link
                              to={`/client/reviews/create/${review.projectId}`}
                              className='text-xs text-teal-600 hover:text-teal-700'
                            >
                              Edit Ulasan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    />
                  </svg>
                  <h3 className='mt-2 text-sm font-medium text-gray-900'>
                    Belum ada ulasan
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Anda belum memberikan ulasan untuk freelancer atau layanan
                    apapun.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pending' && (
            <div>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Proyek yang Perlu Diulas
              </h3>

              {pendingReviews.length > 0 ? (
                <div className='space-y-4'>
                  {pendingReviews.map(project => (
                    <div
                      key={project.id}
                      className='border border-gray-200 rounded-lg overflow-hidden'
                    >
                      <div className='bg-gray-50 p-4'>
                        <div className='flex items-start'>
                          <img
                            src={project.freelancerAvatar}
                            alt={project.freelancerName}
                            className='w-12 h-12 rounded-full object-cover'
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://via.placeholder.com/48?text=' +
                                project.freelancerName.charAt(0);
                            }}
                          />
                          <div className='ml-4 flex-1'>
                            <div className='flex items-center justify-between'>
                              <h4 className='text-sm font-medium text-gray-900'>
                                {project.freelancerName}
                              </h4>
                              <span className='text-xs text-gray-500'>
                                Selesai: {project.completionDate}
                              </span>
                            </div>
                            <p className='text-xs text-gray-500'>
                              {project.freelancerRole}
                            </p>
                            <p className='text-sm font-medium mt-1'>
                              Proyek: {project.projectTitle}
                            </p>

                            <div className='mt-3'>
                              <Link
                                to={`/client/reviews/create/${project.projectId}`}
                                className='px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                              >
                                Berikan Ulasan
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                    />
                  </svg>
                  <h3 className='mt-2 text-sm font-medium text-gray-900'>
                    Semua proyek sudah diulas
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Tidak ada proyek yang perlu diulas saat ini.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      {/* {showReviewForm && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen p-4 text-center sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>

            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <form onSubmit={submitReview}>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
                      <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
                        Berikan Ulasan
                      </h3>

                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Rating
                        </label>
                        <div className='flex space-x-1'>
                          {[...Array(5)].map((_, i) => (
                            <button
                              key={i}
                              type='button'
                              onClick={() => handleRatingChange(i + 1)}
                              className='focus:outline-none'
                            >
                              <svg
                                className={`w-8 h-8 ${
                                  i < reviewForm.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className='mb-4'>
                        <label
                          htmlFor='comment'
                          className='block text-sm font-medium text-gray-700 mb-2'
                        >
                          Komentar
                        </label>
                        <textarea
                          id='comment'
                          rows={4}
                          className='shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md'
                          placeholder='Berikan komentar mengenai pengalaman Anda bekerja dengan freelancer ini'
                          value={reviewForm.comment}
                          onChange={handleCommentChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Kirim Ulasan
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm'
                    onClick={() => setShowReviewForm(false)}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}
    </ClientLayout>
  );
};

export default Reviews;
