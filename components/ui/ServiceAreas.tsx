'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface County {
  id: number;
  name: string;
  active: boolean;
}

interface City {
  id: number;
  name: string;
  countyId: number;
}

interface ServiceAreaImage {
  id: number;
  src: string;
  alt: string;
}

interface ServiceAreasProps {
  counties: County[];
  cities: City[];
  images: ServiceAreaImage[];
  className?: string;
}

/**
 * ServiceAreas component to display service coverage areas
 * Exactly matches the Window World LA website design
 */
const ServiceAreas: React.FC<ServiceAreasProps> = ({
  counties,
  cities,
  images,
  className,
}) => {
  const [activeCountyId, setActiveCountyId] = useState<number>(
    counties.find(county => county.active)?.id || counties[0]?.id
  );

  // Filter cities by active county
  const filteredCities = cities.filter(city => city.countyId === activeCountyId);

  return (
    <div className={cn("w-full", className)}>
      {/* County Tabs */}
      <div className="flex flex-wrap justify-center mb-8">
        {counties.map((county) => (
          <button
            key={county.id}
            className={cn(
              "px-6 py-3 text-lg font-medium transition-colors",
              activeCountyId === county.id
                ? "text-ww-blue border-b-2 border-ww-blue"
                : "text-gray-500 hover:text-ww-blue"
            )}
            onClick={() => setActiveCountyId(county.id)}
          >
            {county.name}
          </button>
        ))}
      </div>

      {/* Service Area Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Cities List */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Cities We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
            {filteredCities.map((city) => (
              <div key={city.id} className="mb-2">
                <span className="text-ww-blue mr-2">•</span>
                <span>{city.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Area Images */}
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((image) => (
            <div key={image.id} className="relative h-48 rounded-lg overflow-hidden shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ServiceAreas };
