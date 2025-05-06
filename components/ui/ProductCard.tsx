'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  badge?: string;
  className?: string;
}

/**
 * ProductCard component for displaying product information
 * Used on product listing pages and featured sections
 */
const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  ctaText,
  ctaHref,
  badge,
  className,
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg", 
      className
    )}>
      {/* Product Image */}
      <div className="relative h-64 w-full">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image not available</span>
          </div>
        )}
        
        {/* Badge (if provided) */}
        {badge && (
          <div className="absolute top-4 right-4 bg-ww-red text-white text-sm font-medium px-3 py-1 rounded-full">
            {badge}
          </div>
        )}
      </div>
      
      {/* Product Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Features List */}
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-ww-blue mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Action Button */}
        <Link 
          href={ctaHref} 
          className="inline-block bg-ww-blue hover:bg-ww-blue-dark text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export { ProductCard };
