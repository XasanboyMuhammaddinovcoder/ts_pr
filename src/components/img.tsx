import React from 'react';

interface ImageSelectorProps {
  images?: string[];
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images = [] }) => {
  return (
    <div className="image-selector">
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index + 1}`} className="rounded-lg" />
      ))}
    </div>
  );
};

export default ImageSelector;
