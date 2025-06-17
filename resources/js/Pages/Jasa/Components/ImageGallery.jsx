import React from 'react';

const ImageGallery = ({
  mainImage,
  additionalImages,
  selectedImage,
  setSelectedImage,
  title,
}) => {
  // Helper function to ensure image URLs are properly formatted
  const formatImageUrl = imagePath => {
    if (!imagePath)
      return 'https://via.placeholder.com/800x600?text=Tidak+ada+gambar';

    // If the URL already starts with http, https, or data:, it's a complete URL
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }

    // If the URL starts with /storage, it's correct
    if (imagePath.startsWith('/storage')) {
      return imagePath;
    }

    // Handle storage path without leading slash
    if (imagePath.startsWith('storage/')) {
      return '/' + imagePath;
    }

    // For any other case, assume it's a relative path and add storage prefix
    return '/' + imagePath;
  };

  return (
    <>
      {/* Main Image */}
      <div className='mb-6 rounded-2xl overflow-hidden shadow-md'>
        <img
          src={formatImageUrl(mainImage)}
          alt={title}
          className='w-full h-auto object-cover'
        />
      </div>

      {/* Thumbnail Images */}
      <div className='grid grid-cols-4 gap-3 mb-8'>
        <div
          className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === mainImage ? 'border-[#7C3AED]' : 'border-transparent'}`}
          onClick={() => setSelectedImage(mainImage)}
        >
          <img
            src={formatImageUrl(mainImage)}
            alt={`${title} thumbnail 1`}
            className='w-full h-20 object-cover'
          />
        </div>
        {additionalImages &&
          additionalImages.map((img, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === img ? 'border-[#7C3AED]' : 'border-transparent'}`}
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={formatImageUrl(img)}
                alt={`${title} thumbnail ${index + 2}`}
                className='w-full h-20 object-cover'
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default ImageGallery;
