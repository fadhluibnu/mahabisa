import React from 'react';
import { Link } from '@inertiajs/react';

const ReviewsCard = ({ ratingData, reviews }) => {
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Ulasan & Rating</h3>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-shrink-0 text-center mb-4 md:mb-0 md:mr-6">
            <div className="text-4xl font-bold text-gray-900">{ratingData.average}</div>
            <div className="flex justify-center mt-1">{renderStars(Math.round(ratingData.average))}</div>
            <div className="text-sm text-gray-500 mt-1">{ratingData.total} ulasan</div>
          </div>
          
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center mb-1">
                <div className="flex items-center w-20">
                  {renderStars(star)}
                </div>
                <div className="flex-1 h-2 mx-3 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${
                        ratingData.total > 0
                          ? (ratingData.distribution[star] / ratingData.total) * 100
                          : 0
                      }%`
                    }}
                  ></div>
                </div>
                <div className="w-10 text-xs text-gray-500 text-right">
                  {ratingData.distribution[star]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-100 pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Ulasan Terbaru</h4>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className={index !== 0 ? 'pt-4 border-t border-gray-100' : ''}>
                  <div className="flex items-start">
                    <img
                      src={review.reviewer.avatar}
                      alt={review.reviewer.name}
                      className="h-10 w-10 rounded-full flex-shrink-0"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-medium text-gray-900">{review.reviewer.name}</h5>
                        <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                      </div>
                      <div className="flex mt-1">{renderStars(review.rating)}</div>
                      <p className="mt-1 text-sm text-gray-700">{review.comment}</p>
                      {review.project && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                            {review.project}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <svg
                className="mx-auto h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada ulasan</h3>
              <p className="mt-1 text-sm text-gray-500">
                Mulai terima proyek dan dapatkan ulasan dari klien.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-5 border-t border-gray-100">
        <Link
          href="/freelancer/reviews"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Lihat Semua Ulasan
          <svg
            className="ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ReviewsCard;
