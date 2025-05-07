"use client";

import React, { useState, useEffect } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  rating: number;
  source?: 'google' | 'facebook' | 'yelp';
}

interface TestimonialsSliderProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  autoplaySpeed?: number;
}

export const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  title,
  subtitle,
  testimonials,
  autoplaySpeed = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [testimonials.length, autoplaySpeed]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.54 12.88">
          <polygon points="6.77 0 8.86 4.24 13.54 4.92 10.15 8.22 10.95 12.88 6.77 10.68 2.59 12.88 3.38 8.22 0 4.92 4.68 4.24 6.77 0" />
        </svg>
      );
    }
    return stars;
  };

  const renderSourceIcon = (source?: 'google' | 'facebook' | 'yelp') => {
    if (source === 'google') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.1 22.99">
          <path d="M9.13,8.19v2.46H15a5.22,5.22,0,0,1-1.34,3.1,6,6,0,0,1-4.54,1.8A6.45,6.45,0,0,1,2.68,9,6.45,6.45,0,0,1,9.13,2.47a6.25,6.25,0,0,1,4.43,1.76L15.29,2.5A8.49,8.49,0,0,0,9.13,0,9.13,9.13,0,0,0,0,9a9.13,9.13,0,0,0,9.13,9,8.25,8.25,0,0,0,6.28-2.52,8.14,8.14,0,0,0,2.13-5.75,7.9,7.9,0,0,0-.13-1.54Z" style={{ fill: '#4285f4' }} />
          <path d="M24.89,6.19A5.73,5.73,0,0,0,19.06,12a5.83,5.83,0,0,0,11.66,0A5.73,5.73,0,0,0,24.89,6.19Zm0,9.33A3.36,3.36,0,0,1,21.61,12a3.29,3.29,0,1,1,6.56,0A3.36,3.36,0,0,1,24.89,15.52Z" style={{ fill: '#ea4335' }} />
          <path d="M53.47,7.49h-.09a4,4,0,0,0-3.06-1.3A5.65,5.65,0,0,0,44.89,12a5.66,5.66,0,0,0,5.43,5.81,4,4,0,0,0,3.06-1.32h.09v.81c0,2.22-1.19,3.41-3.1,3.41a3.22,3.22,0,0,1-2.93-2.07l-2.22.92A5.53,5.53,0,0,0,50.37,23c3,0,5.52-1.76,5.52-6V6.49H53.47Zm-2.93,8A3.25,3.25,0,0,1,47.44,12a3.24,3.24,0,0,1,3.1-3.52A3.27,3.27,0,0,1,53.64,12,3.24,3.24,0,0,1,50.54,15.52Z" style={{ fill: '#4285f4' }} />
          <path d="M37.89,6.19A5.73,5.73,0,0,0,32.06,12a5.83,5.83,0,0,0,11.66,0A5.73,5.73,0,0,0,37.89,6.19Zm0,9.33A3.36,3.36,0,0,1,34.61,12a3.29,3.29,0,1,1,6.56,0A3.36,3.36,0,0,1,37.89,15.52Z" style={{ fill: '#fbbc05' }} />
          <path d="M57.89.24H60.4V17.81H57.89Z" style={{ fill: '#34a853' }} />
          <path d="M68.15,15.52a3,3,0,0,1-2.82-1.76l7.77-3.21-.26-.66a5.4,5.4,0,0,0-5-3.7A5.52,5.52,0,0,0,62.39,12a5.68,5.68,0,0,0,5.76,5.81A5.8,5.8,0,0,0,73,15.24l-2-1.32a3.33,3.33,0,0,1-2.86,1.6ZM68,8.37a2.3,2.3,0,0,1,2.2,1.28l-5.25,2.17A3.16,3.16,0,0,1,68,8.37Z" style={{ fill: '#ea4335' }} />
        </svg>
      );
    }
    return null;
  };

  return (
    <section className="block-testimonials-slider online-reviews bg-pattern-rain">
      <div className="wrapper">
        <div className="intro">
          <h3 className="h4">{subtitle || '5-Star Google Ratings'}</h3>
          <h2>{title}</h2>
        </div>
        <div className="online-reviews-slider">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ display: index === currentSlide ? 'block' : 'none' }}
            >
              <div className="quote">{testimonial.quote}</div>
              <div className="author">{testimonial.author}</div>
              <div className="stars">
                {renderStars(testimonial.rating)}
              </div>
              {testimonial.source && (
                <div className="review-source">
                  {renderSourceIcon(testimonial.source)}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="controls">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
