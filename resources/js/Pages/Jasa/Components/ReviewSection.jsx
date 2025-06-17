import React from 'react';

const ReviewSection = ({ reviews, averageRating, renderStars }) => {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-bold text-gray-900'>Ulasan dari Klien</h2>
        <div className='flex items-center'>
          <div className='flex mr-2'>{renderStars(averageRating)}</div>
          <span className='text-sm text-gray-700'>
            ({reviews.length} ulasan)
          </span>
        </div>
      </div>

      <div className='space-y-6'>
        {reviews.map(review => (
          <div
            key={review.id}
            className='border-b border-gray-200 pb-6 last:border-b-0 last:pb-0'
          >
            <div className='flex items-start'>
              <img
                src={review.user.avatar}
                alt={review.user.name}
                className='h-10 w-10 rounded-full mr-4'
              />
              <div>
                <div className='flex items-center mb-1'>
                  <h3 className='text-sm font-medium text-gray-900 mr-2'>
                    {review.user.name}
                  </h3>
                  <span className='text-xs text-gray-500'>{review.date}</span>
                </div>
                <div className='flex mb-2'>{renderStars(review.rating)}</div>
                <p className='text-sm text-gray-700'>{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
