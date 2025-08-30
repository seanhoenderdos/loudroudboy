import React, { useEffect } from 'react';

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    // Preload critical images for mobile
    const criticalImages = [
      '/model.png',
      '/hero-bg.png',
      '/light-back.png',
    ];

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Preloaded: ${src}`);
          resolve(src);
        };
        img.onerror = () => {
          console.error(`Failed to preload: ${src}`);
          reject(src);
        };
        img.src = src;
      });
    };

    // Preload critical images
    Promise.allSettled(criticalImages.map(preloadImage))
      .then((results) => {
        console.log('Image preloading completed:', results);
      })
      .catch((error) => {
        console.error('Error during image preloading:', error);
      });
  }, []);

  return null; // This component doesn't render anything
};

export default ImagePreloader;
