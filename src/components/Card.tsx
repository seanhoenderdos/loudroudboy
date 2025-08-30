import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  image?: string;
  imageAlt?: string;
  onImageError?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  image,
  imageAlt = '',
  onImageError,
}) => {
  return (
    <div className={`card rounded-2xl border border-slate-700 ${className}`}>
      {image && (
        <div className="rounded-xl overflow-hidden object-cover">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-70 object-cover"
            loading="lazy"
            onLoad={() => console.log(`Card image loaded: ${image}`)}
            onError={(e) => {
              console.error(`Failed to load card image: ${image}`, e);
              if (onImageError) onImageError();
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
