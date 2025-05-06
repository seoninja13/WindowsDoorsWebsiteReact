'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Feature {
  name: string;
  description?: string;
}

interface ProductFeatures {
  productName: string;
  features: Record<string, boolean | string>;
  price?: string;
  popularChoice?: boolean;
}

interface FeatureComparisonProps {
  title?: string;
  subtitle?: string;
  featuresList: Feature[];
  products: ProductFeatures[];
  className?: string;
}

/**
 * FeatureComparison component for comparing product features
 * Used on product pages to help customers choose the right option
 */
const FeatureComparison: React.FC<FeatureComparisonProps> = ({
  title = "Compare Our Window Options",
  subtitle = "Find the perfect windows for your home and budget",
  featuresList,
  products,
  className,
}) => {
  return (
    <div className={cn("overflow-hidden", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        {title && <h2 className="text-3xl font-bold text-ww-dark-gray mb-2">{title}</h2>}
        {subtitle && <p className="text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
      </div>
      
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gray-50 text-left text-gray-600 font-medium border-b border-gray-200">
                Features
              </th>
              {products.map((product, index) => (
                <th 
                  key={index} 
                  className={cn(
                    "py-4 px-6 text-center border-b border-gray-200",
                    product.popularChoice ? "bg-ww-blue text-white" : "bg-gray-50 text-gray-600"
                  )}
                >
                  {product.popularChoice && (
                    <div className="text-xs font-medium mb-2 bg-white text-ww-blue py-1 px-2 rounded-full inline-block">
                      Most Popular
                    </div>
                  )}
                  <div className="text-lg font-semibold">{product.productName}</div>
                  {product.price && (
                    <div className={cn(
                      "mt-1 text-sm",
                      product.popularChoice ? "text-white/80" : "text-gray-500"
                    )}>
                      {product.price}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {featuresList.map((feature, featureIndex) => (
              <tr 
                key={featureIndex}
                className={featureIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-4 px-6 border-b border-gray-200">
                  <div className="font-medium text-gray-900">{feature.name}</div>
                  {feature.description && (
                    <div className="text-sm text-gray-500 mt-1">{feature.description}</div>
                  )}
                </td>
                
                {products.map((product, productIndex) => {
                  const featureValue = product.features[feature.name];
                  
                  return (
                    <td 
                      key={productIndex} 
                      className={cn(
                        "py-4 px-6 text-center border-b border-gray-200",
                        product.popularChoice ? "bg-ww-blue/5" : ""
                      )}
                    >
                      {typeof featureValue === 'boolean' ? (
                        featureValue ? (
                          <svg 
                            className="h-6 w-6 mx-auto text-green-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        ) : (
                          <svg 
                            className="h-6 w-6 mx-auto text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M6 18L18 6M6 6l12 12" 
                            />
                          </svg>
                        )
                      ) : (
                        <span className={cn(
                          "text-sm",
                          product.popularChoice ? "font-medium" : ""
                        )}>
                          {featureValue}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { FeatureComparison };
