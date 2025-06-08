import React from 'react';

const ReviewCardSingle = (props) => {
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
    <div className="p-4 sm:p-6 border-b border-gray-100">
      <div className="flex items-start">
        <img
          src={props.client.image}
          alt={props.client.name}
          className="h-10 w-10 rounded-full mr-4"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">{props.client.name}</h4>
            <span className="text-xs text-gray-500">{props.date}</span>
          </div>
          <div className="flex items-center mt-1">
            <div className="flex">
              {renderStars(props.rating)}
            </div>
            <span className="ml-2 text-xs text-gray-500">{props.project}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{props.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardSingle;
