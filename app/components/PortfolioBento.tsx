import React from 'react';

const PortfolioBento: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 auto-rows-fr min-h-[400px]">
      {/* Wedding Photo - Large */}
      <div className="portfolio-card lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden">
        <img
          src="/wedding.jpg"
          alt="Wedding photography"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Baby Photo */}
      <div className="portfolio-card lg:col-span-1 rounded-2xl overflow-hidden">
        <img
          src="/baby.jpg"
          alt="Baby photography"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Photo */}
      <div className="portfolio-card lg:col-span-1 rounded-2xl overflow-hidden">
        <img
          src="/event.jpg"
          alt="Event photography"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Family Photo */}
      <div className="portfolio-card lg:col-span-1 rounded-2xl overflow-hidden">
        <img
          src="/family.jpg"
          alt="Family photography"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Photo */}
      <div className="portfolio-card col-span-2 lg:col-span-1 rounded-2xl overflow-hidden">
        <img
          src="/brand.jpg"
          alt="Brand photography"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PortfolioBento;
