import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from './Card';
import Heading from './Heading';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Benefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640);
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
    // Create GSAP animation exactly like the GSAP jungles project
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#benefits',
        start: 'top top',
        end: 'bottom center',
        scrub: 1.5,
        pin: true,
        // markers: true, // Remove this after testing
      },
    });

    // Three-stage animation sequence
    maskTimeline
      // Stage 1: Fade out elements with will-fade class
      .to('.will-fade', {
        opacity: 0,
        stagger: 0.2,
        ease: 'power1.inOut',
      })
      // Stage 2: Mask reveal animation - expand mask with scaling
      .to('.jungle-img img', {
        scale: isMobile ? 1.5 : 1.3,
        maskSize: isMobile ? '1500%' : '1000%',
        webkitMaskSize: isMobile ? '1500%' : '1000%',
        duration: 1,
        ease: 'power1.inOut',
      });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div
      id="benefits"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-radial"
    >
      <div className="container mx-auto relative h-full min-h-screen flex flex-col justify-center px-5">
        {/* Left Side - Heading positioned absolutely */}
        <div className="will-fade absolute top-20 left-5 z-10 max-w-lg">
          <Heading
            badge="Benefits"
            title="Our Secret to Perfection: From the Shoot to the Final Edit"
          />
        </div>

        {/* Right Side - Card with Quote positioned absolutely */}
        <div className="will-fade max-sm:hidden absolute bottom-1/3 right-5 z-10">
          <Card className="bg-gray-800/50 backdrop-blur border-gray-700 p-6 relative max-w-sm">
            <div className="text-white text-lg leading-relaxed">
              "We go beyond the click. We handle the entire process from start
              to finish, so all you have to do is show up."
            </div>
          </Card>
        </div>

        {/* Center - Masked Image */}
        <div className="jungle-img">
          <img
            src="/jungle.jpg"
            alt="Photography session"
            className="abs-center size-full object-cover"
            style={{
              maskImage: 'url("/masked-img.png")',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              maskSize: isMobile ? '130%' : '80%',
              WebkitMaskImage: 'url("/masked-img.png")',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              WebkitMaskSize: isMobile ? '130%' : '80%',
              objectPosition: '30% 70%',
            }}
          />
        </div>

        {/* Bottom Section - Bullet Points positioned at bottom */}
        <div className="will-fade absolute bottom-10 left-5 right-5 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    Personalized Planning:
                  </h3>
                  <p className="text-gray-300 text-xs">
                    We get to know your unique style and needs to create a
                    custom shoot.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    Relaxed & Fun Sessions:
                  </h3>
                  <p className="text-gray-300 text-xs">
                    We create a no-stress environment where you can be
                    yourselves, capturing your authentic story.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    Expert Post-Production:
                  </h3>
                  <p className="text-gray-300 text-xs">
                    We meticulously edit every single photo, ensuring flawless
                    color, lighting, and detail. Your images aren't just
                    taken—they're perfected.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    Timeless Gallery Delivery:
                  </h3>
                  <p className="text-gray-300 text-xs">
                    You receive a stunning, high-resolution online gallery ready
                    for sharing and printing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
