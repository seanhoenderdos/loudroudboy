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
    if (sectionRef.current && portfolioBentoRef.current) {
      // Get all photo card elements within the portfolio bento
      const photoCards = portfolioBentoRef.current.querySelectorAll('.portfolio-card');
      
      if (photoCards.length > 0) {
        // Set initial states for all photo cards (hidden and positioned)
        gsap.set(photoCards, {
          opacity: 0,
          y: 80,
          scale: 0.9,
        });

        // Create timeline for portfolio cards animation
        const portfolioTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%', // Start animation when section is 70% into view
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
            id: 'portfolio-animation',
          },
        });

        // Animate all cards with stagger effect
        portfolioTl.to(photoCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: {
            amount: 0.6, // Total time to stagger all cards
            from: 'start', // Start from first card
          },
        });
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
