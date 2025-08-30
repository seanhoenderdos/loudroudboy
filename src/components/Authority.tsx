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
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    // Add delay to ensure DOM is fully rendered
    const setupAnimations = () => {
      if (authorityImageRef.current && badgesRef.current) {
        if (isMobile) {
          // Mobile: Start visible but slightly faded
          gsap.set(authorityImageRef.current, {
            x: 0,
            opacity: 0.8,
          });

          gsap.set(badgesRef.current.children, {
            x: 0,
            opacity: 0.8,
          });

          // Simple fade-in animation for mobile
          gsap.to(authorityImageRef.current, {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: authorityImageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              id: 'authority-mobile-image',
              refreshPriority: 1,
            },
          });

          gsap.to(badgesRef.current.children, {
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: badgesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              id: 'authority-mobile-badges',
              refreshPriority: 1,
            },
          });
        } else {
          // Desktop: Animation triggered by model scroll completion
          gsap.set(authorityImageRef.current, {
            x: -100,
            opacity: 0,
          });

          gsap.set(badgesRef.current.children, {
            x: 100,
            opacity: 0,
          });

          // Create ScrollTrigger that watches the hero section for model completion
          ScrollTrigger.create({
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: false,
            id: 'authority-desktop-trigger',
            onUpdate: (self) => {
              // When the hero scroll is about 85-90% complete, trigger Authority animations
              if (self.progress >= 0.85) {
                // Animate the authority image
                gsap.to(authorityImageRef.current, {
                  x: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: 'power2.out',
                });

                // Animate the badges with stagger
                if (badgesRef.current) {
                  gsap.to(badgesRef.current.children, {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: 0.2,
                  });
                }

                // Kill this trigger once animations are complete to prevent re-triggering
                self.kill();
              }
            },
            refreshPriority: 1,
          });
        }

        // Force ScrollTrigger refresh after setup
        setTimeout(() => {
          ScrollTrigger.refresh();
          console.log('Authority ScrollTrigger refreshed');
        }, 100);
      } else {
        console.warn('Authority refs not ready, retrying...');
        setTimeout(setupAnimations, 50);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(setupAnimations, 100);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.id &&
          (trigger.vars.id.toString().includes('authority-') ||
            trigger.vars.id === 'authority-desktop-trigger')
        ) {
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
