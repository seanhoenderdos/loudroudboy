import React, { useEffect, useRef } from 'react';
import Heading from './Heading';
import Bento from './Bento';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && bentoRef.current) {
      // Get all card elements within the bento grid
      const cards = bentoRef.current.querySelectorAll('.card');
      
      if (cards.length > 0) {
        // Set initial states for all cards (hidden and positioned)
        gsap.set(cards, {
          opacity: 0,
          y: 80,
          scale: 0.9,
        });

        // Create timeline for mission cards animation (same as portfolio)
        const missionTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%', // Start animation when section is 70% into view
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
            id: 'mission-animation',
          },
        });

        // Animate all cards with stagger effect (same as portfolio)
        missionTl.to(cards, {
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
        if (trigger.vars.id === 'mission-animation') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 max-w-7xl flex justify-center flex-col mx-auto items-center"
    >
      <Heading title="Tired of Looking Awkward in Photos?" />
      <div ref={bentoRef}>
        <Bento />
      </div>
    </section>
  );
};

export default Mission;
