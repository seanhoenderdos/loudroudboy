import Hero from '~/components/Hero';
import type { Route } from './+types/home';
import Authority from '~/components/Authority';
import Mission from '~/components/Mission';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Benefits from '~/components/Benefits';
import Portfolio from '~/components/Portfolio';
import Testimonial from '~/components/Testimonial';
import Contact from '~/components/Contact';

gsap.registerPlugin(ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'LoudRoudBoy Photography' },
    { name: 'description', content: 'Welcome to LoudRoudBoy Photography!' },
  ];
}

export default function Home() {
  useEffect(() => {
    let scrollTriggerInstance: any = null;

    const setupAnimation = () => {
      // Clean up existing ScrollTrigger
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }

      // Wait for DOM elements to be ready
      const modelElement = document.querySelector('.scroll-image');
      const heroElement = document.querySelector('.hero');

      if (!modelElement || !heroElement) {
        console.log('Elements not found, retrying...');
        setTimeout(setupAnimation, 100);
        return;
      }

      console.log('Setting up animation, screen width:', window.innerWidth);

      // Set initial state for model (hidden initially)
      gsap.set('.scroll-image', {
        opacity: 0,
        scale: 0.8,
        y: 30,
      });

      // Entrance animation for model (matches Hero timing)
      gsap.to('.scroll-image', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.2)',
        delay: 0, // Start with the timeline
      });

      // Check if mobile/small screen
      const isSmallScreen = window.innerWidth <= 768;
      console.log('Is small screen:', isSmallScreen);

      // Enable ScrollTrigger normalizeScroll for mobile
      if (isSmallScreen) {
        ScrollTrigger.normalizeScroll(true);
      }

      // Scroll animation with responsive settings
      scrollTriggerInstance = gsap.to('.scroll-image', {
        y: isSmallScreen ? 1100 : 1050, // Increased mobile distance from 800 to 1000
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: isSmallScreen ? 0.5 : 1, // Smoother on small screens
          // markers: true, // Enable for debugging
          id: 'model-scroll',
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onUpdate: (self) => {
            console.log('ScrollTrigger update:', self.progress);
          },
          onToggle: (self) => {
            console.log('ScrollTrigger toggle:', self.isActive);
          },
        },
      });

      // Force refresh after setup
      setTimeout(() => {
        ScrollTrigger.refresh();
        console.log('ScrollTrigger refreshed');
      }, 200);
    };

    // Initial setup with delay to ensure DOM is ready
    setTimeout(setupAnimation, 100);

    // Handle window resize
    const handleResize = () => {
      // Debounce resize events
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(() => {
        console.log('Window resized, recalculating...');
        setupAnimation();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      clearTimeout((window as any).resizeTimeout);
    };
  }, []);

  return (
    <div>
      <Hero />
      <Authority />
      <Mission />
      <Benefits />
      <Portfolio />
      <Testimonial />
      <Contact />

      {/* Shared model image - controlled by GSAP across Hero and Authority */}
      <div className="absolute right-4/6 top-1/6 max-sm:top-1/7 max-sm:right-1/6 z-20">
        <img
          src="/model.png"
          alt="Professional model photography"
          className="scroll-image h-[80vh] max-h-[600px] object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
