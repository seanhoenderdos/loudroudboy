import React from 'react';

const PortfolioBento: React.FC = () => {
  const handleImageLoad = (imageName: string) => {
    console.log(`${imageName} loaded successfully`);
  };

  const handleImageError = (imageName: string, event: any) => {
    console.error(`Failed to load ${imageName}:`, event);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 auto-rows-fr min-h-[400px]">
      {/* Wedding Photo - Large */}
      <div className="portfolio-card lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden">
        <img
          src="/wedding.jpg"
          alt="Wedding photography"
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => handleImageLoad('wedding.jpg')}
          onError={(e) => handleImageError('wedding.jpg', e)}
        />
      </div>

      {/* Baby Photo */}
      <div className="portfolio-card lg:col-span-1 rounded-2xl overflow-hidden">
        <img
          src="/baby.jpg"
          alt="Baby photography"
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => handleImageLoad('baby.jpg')}
          onError={(e) => handleImageError('baby.jpg', e)}
        />
      </div>

      {/* Event Photo */}
      <div className="portfolio-card lg:col-span-1 rounded-2xl overflow-hidden">
        <img
          src="/event.jpg"
          alt="Event photography"
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => handleImageLoad('event.jpg')}
          onError={(e) => handleImageError('event.jpg', e)}
        />
      </div>

      {/* Family Photo */}
      <div className="portfolio-card lg:col-span-1 rounded-2xl overflow-hidden">
        <img
          src="/family.jpg"
          alt="Family photography"
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => handleImageLoad('family.jpg')}
          onError={(e) => handleImageError('family.jpg', e)}
        />
      </div>

      {/* Brand Photo */}
      <div className="portfolio-card col-span-2 lg:col-span-1 rounded-2xl overflow-hidden">
        <img
          src="/brand.jpg"
          alt="Brand photography"
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => handleImageLoad('brand.jpg')}
          onError={(e) => handleImageError('brand.jpg', e)}
        />
      </div>
    </div>
  );
};

export default PortfolioBento;
