'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
  imageSrc?: string;
  className?: string;
}

/**
 * Testimonial component for displaying customer reviews
 * Used on homepage and testimonials page
 */
const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  location,
  rating = 5,
  imageSrc,
  className,
}) => {
  // Generate star rating based on rating prop
  const renderStars = () => {
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
    <div className={cn(
      "bg-white rounded-lg shadow-md p-6 border border-gray-100",
      className
    )}>
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
        {renderStars()}
      </div>
      
      {/* Testimonial Quote */}
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      
      {/* Author Information */}
      <div className="flex items-center">
        {imageSrc ? (
          <div className="mr-4 relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={author}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mr-4 h-12 w-12 rounded-full bg-ww-light-gray flex items-center justify-center">
            <span className="text-ww-blue font-semibold text-lg">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-semibold text-ww-dark-gray">{author}</h4>
          {location && <p className="text-sm text-gray-500">{location}</p>}
        </div>
      </div>
    </div>
  );
};

export { Testimonial };
