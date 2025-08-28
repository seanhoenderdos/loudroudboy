import React from 'react';

interface BadgeProps {
  text: string;
  className?: string;
  shape?: 'rounded' | 'square' | 'pill';
}

const Badge: React.FC<BadgeProps> = ({
  text,
  className = '',
  shape = 'pill',
}) => {
  const getShapeClass = () => {
    switch (shape) {
      case 'square':
        return 'rounded-lg';
      case 'rounded':
        return 'rounded-xl';
      case 'pill':
      default:
        return 'rounded-full';
    }
  };

  const getDefaultStyles = () => {
    if (shape === 'square') {
      return 'bg-[--color-dark-gray] text-white border-1 border-white px-6 py-2 text-sm font-semibold shadow-lg';
    }
    return 'bg-white text-black px-6 py-2 text-sm font-semibold shadow-lg';
  };

  return (
    <span
      className={`inline-block ${getDefaultStyles()} ${getShapeClass()} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
