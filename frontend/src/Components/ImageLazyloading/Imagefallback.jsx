import React, { useState } from "react";

export const ImageFallback = ({ src, fallbackSrc, alt }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleImageError = () => {
    if (fallbackSrc && !error) {
      setImageSrc(fallbackSrc);
      setError(true);
    }
  };

  return <img src={imageSrc} alt={alt} onError={handleImageError} />;
};

export default ImageFallback;
