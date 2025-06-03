import React from 'react';

const ImageGallery = ({ mainImage, additionalImages, selectedImage, setSelectedImage, title }) => {
  return (
    <>
      {/* Main Image */}
      <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
        <img 
          src={selectedImage} 
          alt={title} 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div 
          className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === mainImage ? 'border-[#7C3AED]' : 'border-transparent'}`}
          onClick={() => setSelectedImage(mainImage)}
        >
          <img 
            src={mainImage} 
            alt={`${title} thumbnail 1`} 
            className="w-full h-20 object-cover"
          />
        </div>
        {additionalImages.map((img, index) => (
          <div 
            key={index}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === img ? 'border-[#7C3AED]' : 'border-transparent'}`}
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img} 
              alt={`${title} thumbnail ${index + 2}`} 
              className="w-full h-20 object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
