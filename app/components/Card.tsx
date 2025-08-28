import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  image?: string;
  imageAlt?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  image,
  imageAlt = '',
}) => {
  return (
    <div className={`card rounded-2xl border border-slate-700 ${className}`}>
      {image && (
        <div className="rounded-xl overflow-hidden object-cover">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-70 object-cover"
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
