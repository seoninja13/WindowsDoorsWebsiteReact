'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location?: string;
  rating: number;
  imageSrc?: string;
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  viewAllLink?: string;
  className?: string;
  autoplay?: boolean;
  interval?: number;
}

/**
 * TestimonialSection component for displaying customer reviews
 * Matches the Window World LA website testimonial section exactly
 */
const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title = "What Our Customers Are Saying",
  subtitle = "Read reviews from our satisfied customers",
  testimonials,
  viewAllLink = "/about/reviews",
  className,
  autoplay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Handle automatic slide transition
  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      goToNextTestimonial();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoplay, interval]);

  const goToTestimonial = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    goToTestimonial(nextIndex);
  };

  const goToPrevTestimonial = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToTestimonial(prevIndex);
  };

  // Generate star rating based on rating prop
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className={cn("py-16 bg-gray-50", className)}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold text-ww-dark-gray mb-3">{title}</h2>}
          {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        
        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-ww-dark-gray p-2 rounded-full shadow-md transition-colors"
            onClick={goToPrevTestimonial}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-ww-dark-gray p-2 rounded-full shadow-md transition-colors"
            onClick={goToNextTestimonial}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Testimonials Container */}
          <div 
            ref={testimonialsRef}
            className="overflow-hidden"
          >
            <div className="relative h-full">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "transition-opacity duration-500 bg-white rounded-lg shadow-md p-8 border border-gray-100",
                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 absolute inset-0"
                  )}
                >
                  {/* Quote marks */}
                  <div className="text-ww-blue opacity-20 mb-4">
                    <svg
                      className="h-10 w-10"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.722 6.065c-5.898 2.162-9.654 7.898-9.654 14.095 0 4.572 2.04 7.46 5.898 7.46 3.062 0 5.53-2.624 5.53-5.96 0-3.43-2.403-5.96-5.53-5.96-.535 0-1.338.134-1.873.335.535-3.7 3.732-7.46 7.06-9.085l-1.43-1.07zM25.45 6.065c-5.965 2.162-9.655 7.898-9.655 14.095 0 4.572 2.04 7.46 5.898 7.46 3.128 0 5.53-2.624 5.53-5.96 0-3.43-2.403-5.96-5.53-5.96-.535 0-1.338.134-1.873.335.535-3.7 3.732-7.46 7.06-9.085L25.45 6.065z" />
                    </svg>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  {/* Testimonial Quote */}
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  
                  {/* Author Information */}
                  <div className="flex items-center">
                    {testimonial.imageSrc ? (
                      <div className="mr-4 relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.imageSrc}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="mr-4 h-12 w-12 rounded-full bg-ww-light-gray flex items-center justify-center">
                        <span className="text-ww-blue font-semibold text-lg">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-ww-dark-gray">{testimonial.author}</h4>
                      {testimonial.location && <p className="text-sm text-gray-500">{testimonial.location}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slide Indicators */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index === currentIndex ? "bg-ww-blue" : "bg-gray-300"
                )}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* View All Link */}
        {viewAllLink && (
          <div className="text-center mt-10">
            <Link 
              href={viewAllLink}
              className="inline-flex items-center text-ww-blue hover:text-ww-dark-blue font-medium"
            >
              View All Reviews
              <svg 
                className="ml-2 h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export { TestimonialSection };
