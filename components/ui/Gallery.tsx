'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * Gallery component for displaying project images
 * Features a lightbox for viewing images in full screen
 */
const Gallery: React.FC<GalleryProps> = ({
  images,
  className,
  columns = 3,
  gap = 'md',
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Map gap size to Tailwind classes
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  // Map columns to Tailwind grid classes
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <>
      <div className={cn(
        'grid',
        columnClasses[columns],
        gapClasses[gap],
        className
      )}>
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button 
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-h-[90vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Gallery };
