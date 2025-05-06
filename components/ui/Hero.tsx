'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  overlayOpacity?: 'light' | 'medium' | 'dark';
  textAlignment?: 'left' | 'center' | 'right';
  height?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Hero component for creating visually appealing hero sections
 * Used on homepage and key landing pages
 */
const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  overlayOpacity = 'medium',
  textAlignment = 'center',
  height = 'medium',
  className,
}) => {
  // Map overlay opacity to Tailwind classes
  const overlayClasses = {
    light: 'bg-black/30',
    medium: 'bg-black/50',
    dark: 'bg-black/70',
  };

  // Map text alignment to Tailwind classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Map height to pixel values
  const heightClasses = {
    small: 'h-[400px]',
    medium: 'h-[600px]',
    large: 'h-[800px]',
  };

  return (
    <section className={cn(
      "relative w-full",
      heightClasses[height],
      className
    )}>
      {/* Background Image */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-300"></div>
        )}
        <div className={cn("absolute inset-0", overlayClasses[overlayOpacity])}></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center z-10">
        <div className={cn(
          "container-custom text-white px-4",
          alignmentClasses[textAlignment]
        )}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl mx-auto">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          
          {(primaryButtonText || secondaryButtonText) && (
            <div className={cn(
              "flex flex-col sm:flex-row gap-4",
              textAlignment === 'center' ? 'justify-center' : 
              textAlignment === 'right' ? 'justify-end' : 'justify-start'
            )}>
              {primaryButtonText && primaryButtonHref && (
                <Button
                  href={primaryButtonHref}
                  variant="primary"
                  size="lg"
                >
                  {primaryButtonText}
                </Button>
              )}
              
              {secondaryButtonText && secondaryButtonHref && (
                <Button
                  href={secondaryButtonHref}
                  variant="white"
                  size="lg"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero };
