import React, { useEffect, useRef } from 'react';
import Heading from './Heading';
import Button from './Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const backLightRef = useRef<HTMLImageElement>(null);
  const frontLightRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backLightRef.current && frontLightRef.current) {
      // Create timeline for hero animations
      const heroTl = gsap.timeline();

      // Set initial positions for lights (off-screen)
      gsap.set(backLightRef.current, {
        x: -200, // Start from left side
        opacity: 0,
      });

      gsap.set(frontLightRef.current, {
        x: 200, // Start from right side
        opacity: 0,
      });

      // Set initial state for button (hidden)
      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.9,
        });
      }

      // Timeline animations
      // 1. Back light slides in from left
      heroTl.to(backLightRef.current, {
        x: 0,
        opacity: 0.8,
        duration: 1.2,
        ease: 'power2.out',
      });

      // 2. Front light slides in from right (slightly overlapping)
      heroTl.to(
        frontLightRef.current,
        {
          x: 0,
          opacity: 0.9,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.8',
      ); // Start 0.8s before the previous animation ends

      // 3. Button fades in and slides up after the heading completes
      // Heading starts at 1.6s delay and takes ~3s to complete all animations
      // So button should start around 4.6s
      if (buttonRef.current) {
        heroTl.to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
          },
          4.6, // Absolute timing: start after heading completes
        );
      }

      // Model animation is now handled in home.tsx
    }

    // Parallax effect for background
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        y: -500, // Move background up (opposite to model movement)
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          id: 'background-parallax',
        },
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="section hero relative min-h-screen w-full overflow-visible">
      {/* Background Image */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          willChange: 'transform', // Optimize for animations
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Studio Lights */}
      <div className="absolute inset-0">
        {/* Back Light */}
        <img
          ref={backLightRef}
          src="/light-back.png"
          alt=""
          className="absolute -top-20 left-0 max-sm:-top-20 max-sm:left-0 h-full max-sm:h-[700px] object-contain"
        />
        {/* Front Light */}
        <img
          ref={frontLightRef}
          src="/light-front.png"
          alt=""
          className="absolute bottom-0 right-0 max-sm:-right-48 max-sm:top-1/5 h-11/12 z-11 max-sm:hidden"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen overflow-visible">
        <div className="absolute top-5 right-0 min-lg:top-70 min-lg:right-50 p-8 lg:px-16 xl:px-24 z-30">
          {/* Main Heading, Description, and Button */}
          <Heading
            title={`Creating Timeless${'\n'}Looks, Coupled with${'\n'}Flawless Moments.`}
            description="Loudroudboy Photography captures your most cherished memories with a unique artistic vision, guaranteeing every moment is perfectly preserved."
            animationDelay={1.6}
          />
        </div>
        <div className="absolute bottom-20 right-140 max-sm:bottom-12 max-sm:right-10">
          <div ref={buttonRef}>
            <Button title="Book Your Session Now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
