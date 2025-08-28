import React, { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { gsap } from 'gsap';

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconBgRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (buttonRef.current && iconBgRef.current) {
      const tl = gsap.timeline();

      // Animate button to black background and white text
      tl.to(buttonRef.current, {
        backgroundColor: '#000000',
        color: '#ffffff',
        duration: 0.3,
        ease: 'power2.out',
      })
        // Show and animate the icon circle background
        .to(
          iconBgRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          },
          0,
        );
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current && iconBgRef.current) {
      const tl = gsap.timeline();

      // Animate button back to white background and black text
      tl.to(buttonRef.current, {
        backgroundColor: '#ffffff',
        color: '#000000',
        duration: 0,
        ease: 'power2.out',
      })
        // Hide the icon circle background
        .to(
          iconBgRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
          },
          0,
        );
    }
  };

  return (
    <button
      ref={buttonRef}
      className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold shadow-lg flex items-center gap-3 relative cursor-pointer"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {title}
      <div className="relative">
        <div
          ref={iconBgRef}
          className="absolute inset-0 bg-white rounded-full scale-0 opacity-0"
          style={{
            width: '32px',
            height: '32px',
            left: '-28%',
            top: '-30%',
            transform: 'translate(-50%, -50%) scale(0)',
          }}
        />
        <FiArrowRight className="w-5 h-5 relative z-10 text-black" />
      </div>
    </button>
  );
};

export default Button;
