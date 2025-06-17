import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import FreelancerLayout from './Components/FreelancerLayout';

const ReviewDetail = ({ id }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  // This would be fetched from the backend in a real application
  const review = {
    id: id || 1,
    client: {
      id: 101,
      name: 'Budi Santoso',
      company: 'PT Maju Bersama',
      image:
        'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
      since: 'Mei 2023',
      totalProjects: 3,
    },
    project: {
      id: 201,
      title: 'Redesain Website E-commerce',
      description:
        'Mengubah tampilan dan meningkatkan performa website e-commerce untuk meningkatkan konversi penjualan.',
      completedDate: '2023-06-10',
      budget: 'Rp1.500.000',
    },
    rating: 5,
    comment:
      'Sangat puas dengan hasil kerjanya. Desain website sangat menarik dan sesuai dengan kebutuhan kami. Komunikasi lancar dan selalu responsif terhadap feedback yang diberikan. Kami sangat merekomendasikan freelancer ini untuk pengembangan website e-commerce. Terima kasih atas kerja kerasnya!',
    date: '15 Jun 2023',
    aspects: [
      { name: 'Kualitas Hasil', rating: 5 },
      { name: 'Komunikasi', rating: 5 },
      { name: 'Ketepatan Waktu', rating: 4 },
      { name: 'Profesionalisme', rating: 5 },
    ],
    reply: null,
    isPublic: true,
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

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      // In a real application, this would send a request to the backend
      console.log('Replying to review:', replyText);
      setIsReplying(false);
      setReplyText('');
      // Show success message
      alert('Balasan Anda telah dikirim!');
    }
  };

  const handleTogglePublic = () => {
    // In a real application, this would send a request to the backend
    console.log('Toggling review visibility');
    // Show success message
    alert(
      review.isPublic
        ? 'Ulasan disembunyikan dari profil Anda'
        : 'Ulasan ditampilkan di profil Anda'
    );
  };

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <FreelancerLayout
      title='Detail Ulasan'
      subtitle='Lihat dan kelola ulasan dari klien'
    >
      <div className='bg-white shadow-sm rounded-xl overflow-hidden mb-6'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center'>
              <img
                src={review.client.image}
                alt={review.client.name}
                className='h-12 w-12 rounded-full'
              />
              <div className='ml-4'>
                <h2 className='text-lg font-medium text-gray-900'>
                  {review.client.name}
                </h2>
                <p className='text-sm text-gray-500'>{review.client.company}</p>
              </div>
            </div>
            <div className='mt-4 md:mt-0 flex items-center'>
              <div className='flex mr-2'>{renderStars(review.rating)}</div>
              <span className='text-lg font-bold text-gray-900'>
                {review.rating}.0
              </span>
            </div>
          </div>
        </div>

        <div className='p-6 border-b border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Detail Proyek
          </h3>
          <div className='bg-gray-50 rounded-lg p-4'>
            <div className='mb-4'>
              <h4 className='text-base font-medium text-gray-900'>
                {review.project.title}
              </h4>
              <p className='mt-1 text-sm text-gray-600'>
                {review.project.description}
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium text-gray-500'>
                  Tanggal Selesai
                </p>
                <p className='text-sm text-gray-900'>
                  {formatDate(review.project.completedDate)}
                </p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>
                  Budget Proyek
                </p>
                <p className='text-sm text-gray-900'>{review.project.budget}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='p-6 border-b border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Ulasan Klien
          </h3>
          <div className='bg-gray-50 rounded-lg p-4'>
            <div className='mb-4'>
              <p className='text-sm text-gray-600 italic'>"{review.comment}"</p>
              <p className='mt-2 text-xs text-gray-500'>
                Diterima pada {review.date}
              </p>
            </div>

            <h4 className='text-sm font-medium text-gray-900 mb-2'>
              Penilaian Aspek
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-4'>
              {review.aspects.map((aspect, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <span className='text-sm text-gray-700'>{aspect.name}</span>
                  <div className='flex'>{renderStars(aspect.rating)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {review.reply && (
          <div className='p-6 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Balasan Anda
            </h3>
            <div className='bg-blue-50 rounded-lg p-4'>
              <p className='text-sm text-gray-600'>{review.reply.text}</p>
              <p className='mt-2 text-xs text-gray-500'>
                Dibalas pada {review.reply.date}
              </p>
            </div>
          </div>
        )}

        <div className='p-6'>
          <div className='flex flex-col sm:flex-row gap-3'>
            {!review.reply && (
              <>
                {!isReplying ? (
                  <button
                    onClick={() => setIsReplying(true)}
                    className='inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6'
                      />
                    </svg>
                    Balas Ulasan
                  </button>
                ) : (
                  <div className='w-full space-y-3'>
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                      rows={4}
                      placeholder='Tulis balasan Anda untuk ulasan ini...'
                    ></textarea>
                    <div className='flex gap-3'>
                      <button
                        onClick={handleSubmitReply}
                        className='inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Kirim Balasan
                      </button>
                      <button
                        onClick={() => setIsReplying(false)}
                        className='inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              onClick={handleTogglePublic}
              className='inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {review.isPublic ? (
                <>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                    />
                  </svg>
                  Sembunyikan Ulasan
                </>
              ) : (
                <>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                  Tampilkan Ulasan
                </>
              )}
            </button>

            <Link
              href={`/freelancer/projects/${review.project.id}`}
              className='inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
              Lihat Proyek
            </Link>
          </div>
        </div>
      </div>

      <div className='bg-white shadow-sm rounded-xl overflow-hidden'>
        <div className='p-6 border-b border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900'>Tentang Klien</h3>
        </div>

        <div className='p-6'>
          <div className='flex items-center mb-6'>
            <img
              src={review.client.image}
              alt={review.client.name}
              className='h-16 w-16 rounded-full'
            />
            <div className='ml-4'>
              <h4 className='text-lg font-medium text-gray-900'>
                {review.client.name}
              </h4>
              <p className='text-sm text-gray-500'>{review.client.company}</p>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm font-medium text-gray-500'>
                Bergabung Sejak
              </p>
              <p className='text-sm text-gray-900'>{review.client.since}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500'>Total Proyek</p>
              <p className='text-sm text-gray-900'>
                {review.client.totalProjects} proyek
              </p>
            </div>
          </div>

          <div className='mt-6'>
            <Link
              href={`/freelancer/clients/${review.client.id}`}
              className='inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500'
            >
              Lihat profil lengkap
              <svg
                className='ml-1 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default ReviewDetail;
