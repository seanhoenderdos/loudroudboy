import React from 'react';
import { FaStar } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

interface TestimonialCardProps {
  name: string;
  position: string;
  quote: string;
  profileImage: string;
  rating?: number;
  isVerified?: boolean;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  position,
  quote,
  profileImage,
  rating = 5,
  isVerified = true,
  className = '',
}) => {
  return (
    <div
      className={`p-6 rounded-lg text-white relative ${className}`}
      style={{
        background: 'linear-gradient(to bottom, #00AF95 0%, #00493E 100%)',
      }}
    >
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={profileImage}
          alt={name}
          className="w-[52px] h-[52px] rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            {isVerified && (
              <RiVerifiedBadgeFill className="text-[#FFF1AC] text-lg" />
            )}
          </div>
          <p className="text-white/80 text-sm">{position}</p>
        </div>
      </div>

      {/* Quote */}
      <div className="mb-4">
        <p className="text-white leading-relaxed">{quote}</p>
      </div>

      {/* Star Rating */}
      <div className="flex gap-1">
        {[...Array(rating)].map((_, index) => (
          <FaStar
            key={index}
            className="text-sm"
            style={{ color: '#FFF1AC' }}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
