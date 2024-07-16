import React, { useState } from 'react';

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    '/tshirt-1.png', // O'z URL-laringizni bu yerga qo'ying
    '/tshirt-2.png',
    '/tshirt-3.png',
    // '',
  ];

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-4">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`img-${index}`}
          className={`w-40h-40 object-cover cursor-pointer ${selectedImage === url ? 'border-4 border-blue-500' : 'border-0'}`}
          onClick={() => handleImageClick(url)}
        />
      ))}
    </div>
  );
};

export default ImageSelector;
