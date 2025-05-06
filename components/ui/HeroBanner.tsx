'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { cn } from '@/lib/utils';

// Define types for banner slides
interface BannerSlide {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

interface HeroBannerProps {
  slides: BannerSlide[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * HeroBanner component with slider functionality
 * Exactly matches the Window World LA homepage hero banner
 */
const HeroBanner: React.FC<HeroBannerProps> = ({
  slides,
  autoplay = true,
  interval = 5000,
  className,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Ensure we have valid slides
  const validSlides = slides && slides.length > 0 ? slides : [];

  // Preload images to prevent flickering during transitions
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = validSlides.map((slide) => {
          return new Promise((resolve: (value: boolean) => void, reject: (reason: Error) => void) => {
            const img = new window.Image();
            img.src = slide.imageSrc;
            img.onload = () => resolve(true);
            img.onerror = () => reject(new Error(`Failed to load image: ${slide.imageSrc}`));
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Still set images as loaded even if there's an error to prevent infinite loading state
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, [validSlides]);

  // Ensure the first slide is visible when images are loaded
  useEffect(() => {
    if (imagesLoaded && validSlides.length > 0) {
      setCurrentSlide(0);
    }
  }, [imagesLoaded, validSlides]);

  // Handle automatic slide transition
  useEffect(() => {
    if (!autoplay || !imagesLoaded) return;

    const timer = setInterval(() => {
      goToNextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, autoplay, interval, imagesLoaded]);

  const goToSlide = (index: number) => {
    if (isTransitioning || !imagesLoaded) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % validSlides.length;
    goToSlide(nextSlide);
  };

  const goToPrevSlide = () => {
    const prevSlide = (currentSlide - 1 + validSlides.length) % validSlides.length;
    goToSlide(prevSlide);
  };

  // Show loading state while images are being loaded
  if (!imagesLoaded) {
    return (
      <div className={cn("relative h-[600px] bg-gray-200 flex items-center justify-center", className)}>
        <div className="text-center text-gray-500">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-ww-blue rounded-full mb-4"></div>
          <p>Loading images... {validSlides.length} slides found.</p>
        </div>
      </div>
    );
  }

  // Debug message to help troubleshoot
  console.log('HeroBanner rendering with:', { 
    slidesCount: validSlides.length, 
    currentSlide, 
    imagesLoaded,
    firstImageSrc: validSlides[0]?.imageSrc 
  });

  return (
    <div className={cn("relative h-[600px] overflow-hidden", className)}>
      {/* Slides */}
      <div className="relative h-full w-full">
        {validSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            style={{ display: index === currentSlide ? 'block' : 'none' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {slide.imageSrc ? (
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-300"></div>
              )}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* Slide Content */}
            <div className="relative h-full flex items-center z-10">
              <div className="container-custom text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                  {slide.title}
                </h1>
                
                {slide.subtitle && (
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    {slide.subtitle}
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {slide.primaryButtonText && slide.primaryButtonHref && (
                    <Button
                      href={slide.primaryButtonHref}
                      variant="primary"
                      size="lg"
                    >
                      {slide.primaryButtonText}
                    </Button>
                  )}
                  
                  {slide.secondaryButtonText && slide.secondaryButtonHref && (
                    <Button
                      href={slide.secondaryButtonHref}
                      variant="white"
                      size="lg"
                    >
                      {slide.secondaryButtonText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {validSlides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentSlide ? "bg-white" : "bg-white/50"
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export { HeroBanner };
