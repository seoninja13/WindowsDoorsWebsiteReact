'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

interface ProductFeaturesProps {
  title: string;
  description: string;
  features: Feature[];
  className?: string;
}

/**
 * ProductFeatures component to showcase product features and benefits
 * Exactly matches the Window World LA website design
 */
const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  title,
  description,
  features,
  className,
}) => {
  return (
    <section className={cn("py-16 bg-gray-100", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white p-6 rounded-lg shadow-md">
              {feature.icon && (
                <div className="text-4xl mb-4">{feature.icon}</div>
              )}
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProductFeatures };
