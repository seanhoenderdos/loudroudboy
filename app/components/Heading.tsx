import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Badge from './Badge';

interface HeadingProps {
  title: string;
  description?: string;
  badge?: string;
  children?: React.ReactNode;
  animationDelay?: number;
  descriptionWidth?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  badge,
  children,
  animationDelay = 0,
  descriptionWidth = 'max-w-lg',
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      // Create GSAP timeline with delay
      const tl = gsap.timeline({ delay: animationDelay });

      // Split the title into words and wrap each word in a span, preserving line breaks
      const lines = title.split('\n');
      titleRef.current.innerHTML = lines
        .map((line, lineIndex) => {
          const words = line.trim().split(' ');
          const wrappedWords = words
            .map((word) => `<span class="inline-block">${word}</span>`)
            .join(' ');
          return lineIndex < lines.length - 1
            ? wrappedWords + '<br>'
            : wrappedWords;
        })
        .join('');

      // Get all the word spans (excluding br elements)
      const wordSpans = titleRef.current.querySelectorAll('span');

      // Set initial states
      gsap.set(wordSpans, {
        opacity: 0,
        y: 30,
        rotationX: -90,
      });

      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, {
          opacity: 0,
          y: 20,
        });
      }

      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.8,
        });
      }

      if (badgeRef.current) {
        gsap.set(badgeRef.current, {
          opacity: 0,
          y: -10,
          scale: 0.8,
        });
      }

      // Timeline animations
      // 1. Badge (if exists)
      if (badgeRef.current) {
        tl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        });
      }

      // 2. Title words with stagger
      tl.to(
        wordSpans,
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.15,
        },
        badge ? '+=0.2' : '+=0.2',
      );

      // 3. Description
      if (descriptionRef.current) {
        tl.to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '+=0.1',
        );
      }

      // 4. Button (if exists)
      if (buttonRef.current) {
        tl.to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '+=0.2',
        );
      }
    }
  }, [title, description, badge, children, animationDelay]);

  return (
    <div className="mb-8">
      {/* Badge (optional) */}
      {badge && (
        <div ref={badgeRef} className="mb-4">
          <Badge text={badge} />
        </div>
      )}

      {/* Main Title */}
      <h2
        ref={titleRef}
        className="text-white text-[60px] max-sm:text-3xl font-bold leading-tight mb-4"
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <div ref={descriptionRef} className={`${descriptionWidth} mb-8`}>
          <p className="text-white/90 text-lg leading-relaxed">{description}</p>
        </div>
      )}

      {/* Children (like button) */}
      {children && <div ref={buttonRef}>{children}</div>}
    </div>
  );
};

export default Heading;
