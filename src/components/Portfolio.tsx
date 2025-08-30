import React, { useEffect, useRef } from 'react';
import Heading from './Heading';
import PortfolioBento from './PortfolioBento';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portfolioBentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (sectionRef.current && portfolioBentoRef.current) {
      // Get all photo card elements within the portfolio bento
      const photoCards = portfolioBentoRef.current.querySelectorAll('.portfolio-card');
      
      if (photoCards.length > 0) {
        if (isMobile) {
          // Simple mobile animation - ensure content is visible
          gsap.set(photoCards, {
            opacity: 1, // Start visible on mobile
            y: 0,
            scale: 1,
          });
          
          // Add subtle scale animation for mobile
          gsap.fromTo(photoCards, 
            { opacity: 0.6, scale: 0.95 },
            { 
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
                id: 'portfolio-mobile',
              }
            }
          );
        } else {
          // Full desktop animation
          gsap.set(photoCards, {
            opacity: 0,
            y: 80,
            scale: 0.9,
          });

          const portfolioTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse',
              id: 'portfolio-animation',
            },
          });

          portfolioTl.to(photoCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: {
              amount: 0.6,
              from: 'start',
            },
          });
        }
      } else {
        // Fallback: ensure content is visible if no cards found
        console.warn('No portfolio cards found, ensuring section is visible');
        if (portfolioBentoRef.current) {
          gsap.set(portfolioBentoRef.current, { opacity: 1 });
        }
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === 'portfolio-animation') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 px-6 max-w-6xl mx-auto"
    >
      <Heading
        badge="Portfolio"
        title="A Glimpse into the Loudroudboy Experience"
        description="Rather than show you everything, here is a small, hand-picked collection that represents our signature style."
        descriptionWidth="max-w-2xl"
        animationDelay={0.2}
      />
      <div ref={portfolioBentoRef}>
        <PortfolioBento />
      </div>
    </section>
  );
};

export default Portfolio;
