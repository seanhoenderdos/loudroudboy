import React, { useEffect, useRef, useState } from 'react';
import TestimonialCard from './TestimonialCard';
import Heading from './Heading';
import Card from './Card';
import { testimonials, testimonialConcerns } from '../../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768); // md breakpoint
      };

      // Initial check
      checkMobile();

      // Add resize listener
      window.addEventListener('resize', checkMobile);

      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      // Get all testimonial cards and concern cards
      const testimonialCards =
        sectionRef.current.querySelectorAll('.testimonial-card');
      const concernCards = sectionRef.current.querySelectorAll('.concern-card');

      if (testimonialCards.length > 0 && concernCards.length > 0) {
        // Set initial states based on desktop or mobile
        if (isMobile) {
          // Mobile: Alternate sides - every second card from same side
          testimonialCards.forEach((card, index) => {
            gsap.set(card, {
              x: index % 2 === 0 ? -100 : 100, // Even indices from left, odd from right
              opacity: 0,
            });
          });

          concernCards.forEach((card, index) => {
            gsap.set(card, {
              x: index % 2 === 0 ? -100 : 100, // Even indices from left, odd from right
              opacity: 0,
            });
          });
        } else {
          // Desktop: First two from left, next two from right, etc.
          testimonialCards.forEach((card, index) => {
            const pairIndex = Math.floor(index / 2);
            gsap.set(card, {
              x: pairIndex % 2 === 0 ? -100 : 100, // First pair from left, second from right, etc.
              opacity: 0,
            });
          });

          concernCards.forEach((card, index) => {
            const pairIndex = Math.floor(index / 2);
            gsap.set(card, {
              x: pairIndex % 2 === 0 ? -100 : 100, // First pair from left, second from right, etc.
              opacity: 0,
            });
          });
        }

        // Create scroll-based animation for each row
        const rows = sectionRef.current.querySelectorAll('.testimonial-row');

        rows.forEach((row, rowIndex) => {
          const rowCards = row.querySelectorAll(
            '.testimonial-card, .concern-card',
          );

          gsap.to(rowCards, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
              id: `testimonial-row-${rowIndex}`,
            },
          });
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id && trigger.vars.id.includes('testimonial-row')) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="py-16 px-6">
      <div className="w-full flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <Heading
            badge="Testimonials"
            title="Don't Just Take Our Word For It"
            description="We understand you have questions, and we've helped over a thousand clients get the beautiful photos they've always wanted. We've found that most people are concerned about three things - themselves, the product, and the price. Here's what some of them had to say."
            descriptionWidth="max-w-4xl mx-auto"
          />
        </div>

        {/* Testimonials Grid - Matching the image layout */}
        <div className="flex flex-col gap-15 items-center justify-center w-11/12">
          {/* Row 1: Concern + Testimonial */}
          <div className="testimonial-row grid grid-cols-1 md:grid-cols-2 gap-15 items-center justify-center w-full">
            <Card className="concern-card p-6 flex items-center justify-center h-fit">
              <p className="text-white italic text-center leading-relaxed">
                "{testimonialConcerns[0]}"
              </p>
            </Card>
            <TestimonialCard
              className="testimonial-card"
              name={testimonials[0].name}
              position={testimonials[0].position}
              quote={testimonials[0].quote}
              profileImage={testimonials[0].profileImage}
              rating={testimonials[0].rating}
              isVerified={testimonials[0].isVerified}
            />
          </div>

          {/* Row 2: Testimonial + Concern */}
          <div className="testimonial-row grid grid-cols-1 md:grid-cols-2 gap-15 items-center justify-center w-full">
            <TestimonialCard
              className="testimonial-card order-1 max-sm:order-2"
              name={testimonials[1].name}
              position={testimonials[1].position}
              quote={testimonials[1].quote}
              profileImage={testimonials[1].profileImage}
              rating={testimonials[1].rating}
              isVerified={testimonials[1].isVerified}
            />
            <Card className="concern-card p-6 flex items-center justify-center h-fit order-2 max-sm:order-1">
              <p className="text-white italic text-center leading-relaxed">
                "{testimonialConcerns[1]}"
              </p>
            </Card>
          </div>

          {/* Row 3: Concern + Testimonial */}
          <div className="testimonial-row grid grid-cols-1 md:grid-cols-2 gap-15 items-center justify-center w-full">
            <Card className="concern-card p-6 flex items-center justify-center h-fit">
              <p className="text-white italic text-center leading-relaxed">
                "{testimonialConcerns[2]}"
              </p>
            </Card>
            <TestimonialCard
              className="testimonial-card"
              name={testimonials[2].name}
              position={testimonials[2].position}
              quote={testimonials[2].quote}
              profileImage={testimonials[2].profileImage}
              rating={testimonials[2].rating}
              isVerified={testimonials[2].isVerified}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
