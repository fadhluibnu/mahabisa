import React from 'react';

const ReviewCard = ({ review }) => {
  // Format timestamp to readable date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start">
        <img 
          src={review.user.avatar} 
          alt={review.user.name} 
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900">{review.user.name}</h3>
            <span className="text-sm text-gray-500">
              {review.date ? review.date : formatDate(review.timestamp)}
            </span>
          </div>
          
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <svg 
                key={index} 
                className={`w-4 h-4 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-600">{review.rating.toFixed(1)}</span>
          </div>
          
          {review.project && (
            <div className="mb-2 bg-gray-50 p-2 rounded text-sm">
              <span className="font-medium text-gray-700">Proyek: </span>
              <span className="text-gray-600">{review.project}</span>
            </div>
          )}
          
          <p className="text-gray-700">{review.comment}</p>
          
          {review.response && (
            <div className="mt-3 ml-3 p-3 bg-gray-50 rounded-lg border-l-2 border-indigo-400">
              <p className="text-sm font-medium text-gray-700 mb-1">Balasan:</p>
              <p className="text-sm text-gray-600">{review.response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
