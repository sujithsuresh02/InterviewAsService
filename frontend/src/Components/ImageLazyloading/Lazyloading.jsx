import { useEffect, useState } from "react";

export const LazyImage = ({ src, alt, fallbackSrc,width,height }) => {
  const [imageSrc, setImageSrc] = useState(fallbackSrc);
 const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let observer;
    let didCancel = false;

    const image = new Image();
    image.src = src;

    if (IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              !didCancel &&
              (entry.intersectionRatio > 0 || entry.isIntersecting)
            ) {
              setImageSrc(src);
              observer.unobserve(image);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50%",
        }
      );

      observer.observe(image);
    } else {
      // Fallback for browsers that do not support Intersection Observer API
      setImageSrc(src);
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(image);
      }
    };
  }, [src]);
  const imageStyle = {
    width: width ? width : "100%",
    height: height ? height : "auto",
  };

  return (
    <>
      {isLoading && <img src={fallbackSrc} alt={alt} style={imageStyle} />}
      {!isLoading && <img src={imageSrc} alt={alt} style={imageStyle} />}
    </>
  );
};