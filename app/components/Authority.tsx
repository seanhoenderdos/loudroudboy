import React, { useEffect, useRef } from 'react';
import Heading from './Heading';
import Badge from './Badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Authority = () => {
  const authorityImageRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authorityImageRef.current && badgesRef.current) {
      // Set initial states (hidden)
      gsap.set(authorityImageRef.current, {
        x: -100,
        opacity: 0,
      });

      gsap.set(badgesRef.current.children, {
        x: 100,
        opacity: 0,
      });

      // Create animation timeline that triggers when model scroll ends
      const authorityTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: false, // No scrub - we want discrete animation
          onUpdate: (self) => {
            // Trigger animation when scroll progress is near completion (around 90%)
            if (self.progress >= 0.9 && !authorityTl.isActive()) {
              // Authority image slides in from left
              gsap.to(authorityImageRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
              });

              // Badges slide in from right with stagger
              gsap.to(badgesRef.current!.children, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.2, // 0.2s delay between each badge
              });
            }
          },
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === 'authority-animation') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      data-section="authority"
      className="section authority bg-[--color-dark-gray] px-5 text-center relative overflow-hidden pb-[500px] md:pb-[300px] md: py-20"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Heading Component with Badge */}
        <Heading
          badge="Best in CPT"
          title="Over 1000+ Customers & Brands"
          description="Trusted by families and brands across Cape Town for capturing life's most precious moments with professional photography services."
          descriptionWidth="max-w-lg md:max-w-full"
        />

        {/* Group Photo */}
        <div
          ref={authorityImageRef}
          className="w-full absolute -left-[320px] max-sm:-left-[5px] top-1/4 max-sm:top-9/10"
        >
          <img
            src="/authorityImage.png"
            alt="Happy customers and families"
            className="w-full h-full scale-75 max-sm:scale-200"
          />
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center gap-16 flex-wrap"></div>
        {/* Stats Badges */}
        <div
          ref={badgesRef}
          className="flex flex-col gap-6 items-start md:items-end md:mt-40"
        >
          <Badge
            text="1000+ shoots"
            shape="square"
            className="text-[30px] font-semibold px-8 py-5 backdrop-blur-sm"
          />
          <Badge
            text="100k+ photos"
            shape="square"
            className="text-[30px] font-semibold px-8 py-5 backdrop-blur-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Authority;
