import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import Authority from './components/Authority';
import Mission from './components/Mission';
import Benefits from './components/Benefits';
import Portfolio from './components/Portfolio';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import ImagePreloader from './components/ImagePreloader';
import MobileDebugger from './components/MobileDebugger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    let scrollTriggerInstance: any = null;
    let isInitialized = false;

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

      // Check if mobile/small screen
      const isSmallScreen = window.innerWidth <= 768;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      console.log('Setting up animation, screen width:', window.innerWidth, 'isMobile:', isMobile);

      // Set initial state for model (visible on mobile to prevent loading issues)
      gsap.set('.scroll-image', {
        opacity: isMobile ? 1 : 0,
        scale: isMobile ? 1 : 0.8,
        y: isMobile ? 0 : 30,
      });

      // Simplified entrance animation - skip complex animations on mobile
      if (!isMobile) {
        gsap.to('.scroll-image', {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.2)',
          delay: 0,
        });
      }

      // Simplified scroll animation for mobile
      if (isMobile) {
        // Simple CSS-based scroll for mobile - more reliable
        scrollTriggerInstance = gsap.to('.scroll-image', {
          y: 800, // Reduced distance for mobile
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.3, // Lighter scrub for mobile
            id: 'model-scroll-mobile',
            refreshPriority: 1,
          },
        });
      } else {
        // Full animation for desktop
        scrollTriggerInstance = gsap.to('.scroll-image', {
          y: 1050,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            id: 'model-scroll-desktop',
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        });
      }

      // Force refresh after setup - reduced delay for mobile
      const refreshDelay = isMobile ? 100 : 200;
      setTimeout(() => {
        ScrollTrigger.refresh();
        console.log('ScrollTrigger refreshed');
        isInitialized = true;
      }, refreshDelay);
    };

    // Immediate setup for mobile, delayed for desktop
    const setupDelay = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 50 : 100;
    setTimeout(setupAnimation, setupDelay);

    // Handle window resize - debounced and mobile-optimized
    const handleResize = () => {
      if (!isInitialized) return; // Don't resize until initialized
      
      // Debounce resize events - longer delay for mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const debounceDelay = isMobile ? 300 : 150;
      
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(() => {
        console.log('Window resized, recalculating...');
        setupAnimation();
      }, debounceDelay);
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
      <ImagePreloader />
      <MobileDebugger />
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
          loading="eager"
          onLoad={() => console.log('Model image loaded')}
          onError={(e) => console.error('Model image failed to load:', e)}
        />
      </div>
    </div>
  );
}

export default App;
