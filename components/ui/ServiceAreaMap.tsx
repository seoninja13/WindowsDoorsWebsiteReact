'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ServiceArea {
  name: string;
  zipCodes: string[];
  isActive: boolean;
}

interface ServiceAreaMapProps {
  className?: string;
  title?: string;
  subtitle?: string;
  serviceAreas?: ServiceArea[];
}

/**
 * ServiceAreaMap component for displaying coverage areas
 * Shows service areas with interactive zip code lookup
 */
const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({
  className,
  title = "Our Service Areas",
  subtitle = "We proudly serve the following areas with quality window and door installation services.",
  serviceAreas = [
    { name: "Los Angeles", zipCodes: ["90001", "90002", "90003", "90004", "90005"], isActive: true },
    { name: "Orange County", zipCodes: ["92602", "92603", "92604", "92605", "92606"], isActive: false },
    { name: "San Bernardino", zipCodes: ["92401", "92402", "92403", "92404", "92405"], isActive: false },
    { name: "Riverside", zipCodes: ["92501", "92502", "92503", "92504", "92505"], isActive: false },
    { name: "Ventura", zipCodes: ["93001", "93002", "93003", "93004", "93005"], isActive: false },
  ],
}) => {
  const [areas, setAreas] = useState<ServiceArea[]>(serviceAreas);
  const [searchZip, setSearchZip] = useState('');
  const [searchResult, setSearchResult] = useState<{ found: boolean; area?: string } | null>(null);

  // Handle area tab click
  const handleAreaClick = (clickedIndex: number) => {
    setAreas(areas.map((area, index) => ({
      ...area,
      isActive: index === clickedIndex,
    })));
    setSearchResult(null);
  };

  // Handle zip code search
  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchZip.trim()) return;
    
    // Find which area contains the zip code
    const foundArea = areas.find(area => 
      area.zipCodes.includes(searchZip.trim())
    );
    
    if (foundArea) {
      setSearchResult({ found: true, area: foundArea.name });
      
      // Set the found area as active
      setAreas(areas.map(area => ({
        ...area,
        isActive: area.name === foundArea.name,
      })));
    } else {
      setSearchResult({ found: false });
    }
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}>
      {/* Header */}
      <div className="bg-ww-blue text-white p-6">
        {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
        {subtitle && <p className="text-white/80">{subtitle}</p>}
      </div>
      
      {/* Zip Code Search */}
      <div className="bg-ww-light-gray p-6 border-b border-gray-200">
        <form onSubmit={handleZipSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow">
            <label htmlFor="zipSearch" className="sr-only">Search by Zip Code</label>
            <input
              type="text"
              id="zipSearch"
              placeholder="Enter your zip code"
              value={searchZip}
              onChange={(e) => setSearchZip(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-ww-blue text-white font-medium rounded-md hover:bg-ww-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ww-blue transition-colors"
          >
            Check Availability
          </button>
        </form>
        
        {/* Search Result */}
        {searchResult && (
          <div className={`mt-4 p-4 rounded-md ${searchResult.found ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {searchResult.found ? (
              <p>
                <span className="font-medium">Good news!</span> We serve your area ({searchResult.area}).
              </p>
            ) : (
              <p>
                <span className="font-medium">We're sorry.</span> We don't currently serve this zip code. Please contact us for more information.
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Service Area Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {areas.map((area, index) => (
            <button
              key={area.name}
              className={cn(
                "px-6 py-3 text-sm font-medium whitespace-nowrap",
                "focus:outline-none focus:ring-inset focus:ring-ww-blue",
                area.isActive
                  ? "border-b-2 border-ww-blue text-ww-blue"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
              onClick={() => handleAreaClick(index)}
            >
              {area.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Active Area Content */}
      <div className="p-6">
        {areas.map((area) => (
          area.isActive && (
            <div key={area.name} className="animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4">{area.name} Service Area</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Zip Codes We Serve:</h4>
                <div className="flex flex-wrap gap-2">
                  {area.zipCodes.map((zipCode) => (
                    <span
                      key={zipCode}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {zipCode}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Available Services in {area.name}:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-ww-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Window Installation
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-ww-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Door Replacement
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-ww-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Vinyl Siding
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-ww-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Free Estimates
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-ww-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Energy Efficiency Upgrades
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-ww-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom Window Solutions
                  </li>
                </ul>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export { ServiceAreaMap };
