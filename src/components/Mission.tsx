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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (sectionRef.current && bentoRef.current) {
      // Get all card elements within the bento grid
      const cards = bentoRef.current.querySelectorAll('.card');
      
      if (cards.length > 0) {
        if (isMobile) {
          // Simple mobile animation - ensure content is visible
          gsap.set(cards, {
            opacity: 1, // Start visible on mobile
            y: 0,
            scale: 1,
          });
          
          // Add subtle slide-up animation for mobile
          gsap.fromTo(cards, 
            { opacity: 0.5, y: 20 },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.15,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
                id: 'mission-mobile',
              }
            }
          );
        } else {
          // Full desktop animation
          gsap.set(cards, {
            opacity: 0,
            y: 80,
            scale: 0.9,
          });

          const missionTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse',
              id: 'mission-animation',
            },
          });

          missionTl.to(cards, {
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
        console.warn('No mission cards found, ensuring section is visible');
        if (bentoRef.current) {
          gsap.set(bentoRef.current, { opacity: 1 });
        }
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
