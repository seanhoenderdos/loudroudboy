import React, { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import Heading from './Heading';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && imageRef.current && formRef.current) {
      // Set initial states
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 60,
      });

      // Get form elements
      const formInputs = formRef.current.querySelectorAll('.contact-input');
      const formButton = formRef.current.querySelector('.contact-button');

      if (formInputs.length > 0) {
        gsap.set(formInputs, {
          opacity: 0,
          y: 40,
          x: 20,
        });
      }

      if (formButton) {
        gsap.set(formButton, {
          opacity: 0,
          y: 30,
          scale: 0.95,
        });
      }

      // 1. Animate image when it comes into view
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
          id: 'contact-image',
        },
      });

      // 2. Animate each form input individually as they come into view
      formInputs.forEach((input, index) => {
        gsap.to(input, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: input,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
            id: `contact-input-${index}`,
          },
        });
      });

      // 3. Animate button when it comes into view
      if (formButton) {
        gsap.to(formButton, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: formButton,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
            id: 'contact-button',
          },
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id && trigger.vars.id.toString().includes('contact-')) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gray-950 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading
            title={`Ready to Capture${'\n'}Your Story?`}
            description="Your memories are priceless. Don't let them be fleeting. Let's create beautiful, timeless images you can cherish forever."
            badge="Book Your Session"
            descriptionWidth="max-w-4xl mx-auto"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image - Hidden on mobile, visible on desktop */}
          <div ref={imageRef} className="hidden lg:block">
            <div className="relative">
              <img
                src="/contact.jpg"
                alt="Contact us"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="w-full max-w-lg mx-auto lg:mx-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
