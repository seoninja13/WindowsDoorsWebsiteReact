'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';
import { Button } from './Button';
import { cn } from '@/lib/utils';

// Navigation data based on Window World LA website
const navigationData = {
  windows: {
    label: 'Windows',
    href: '/windows',
    submenu: [
      { label: 'Double Hung Windows', href: '/windows/double-hung' },
      { label: 'Sliding Windows', href: '/windows/sliding' },
      { label: 'Casement Windows', href: '/windows/casement' },
      { label: 'Bay & Bow Windows', href: '/windows/bay-bow' },
      { label: 'Awning Windows', href: '/windows/awning' },
      { label: 'Custom Windows', href: '/windows/custom' },
      { label: 'Garden Windows', href: '/windows/garden' },
      { label: 'Picture Windows', href: '/windows/picture-window' },
      { label: 'Shutters', href: '/windows/shutters' },
      { label: 'Wood Windows', href: '/windows/wood-windows' },
    ],
  },
  doors: {
    label: 'Doors',
    href: '/doors',
    submenu: [
      { label: 'Entry Doors', href: '/doors/entry' },
      { label: 'Patio Doors', href: '/doors/patio' },
      { label: 'Hinged Patio Doors', href: '/doors/hinged-patio' },
      { label: 'Garage Doors', href: '/doors/garage' },
    ],
  },
  siding: {
    label: 'Siding',
    href: '/vinyl-siding',
    submenu: [
      { label: '1000 Series Siding', href: '/vinyl-siding/1000-series' },
      { label: '1500 Series Siding', href: '/vinyl-siding/1500-series' },
      { label: '2000 Series Siding', href: '/vinyl-siding/2000-series' },
      { label: '4000 Series Siding', href: '/vinyl-siding/4000-series' },
    ],
  },
  roofing: {
    label: 'Roofing',
    href: '/roofing',
    submenu: [],
  },
  installation: {
    label: 'Installation',
    href: '/installation',
    submenu: [],
  },
  gallery: {
    label: 'Gallery',
    href: '/gallery',
    submenu: [],
  },
  aboutUs: {
    label: 'About Us',
    href: '/about',
    submenu: [
      { label: 'Why Window World', href: '/about/why-window-world' },
      { label: 'Recognition', href: '/about/recognition' },
      { label: 'Giving Back', href: '/about/giving-back' },
      { label: 'Press', href: '/about/press' },
      { label: 'Reviews', href: '/about/reviews' },
      { label: 'Careers', href: '/about/careers' },
    ],
  },
  contactUs: {
    label: 'Contact Us',
    href: '/contact',
    submenu: [
      { label: 'Service Areas', href: '/service-areas' },
    ],
  },
  financing: {
    label: 'Financing',
    href: '/financing',
    submenu: [],
  },
};

interface HeaderProps {
  phoneNumber?: string;
  serviceArea?: string;
  className?: string;
}

/**
 * Header component that exactly matches the Window World LA website header
 * Includes top bar, logo, navigation, and mobile menu
 */
const Header: React.FC<HeaderProps> = ({
  phoneNumber = '(800) 786-9342',
  serviceArea = 'Los Angeles & Surrounding Areas',
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setActiveSubmenu(null);
    }
  };

  const toggleSubmenu = (key: string) => {
    setActiveSubmenu(activeSubmenu === key ? null : key);
  };

  return (
    <header className={cn(
      "bg-white w-full z-50 transition-shadow duration-300",
      isScrolled ? "shadow-md" : "",
      className
    )}>
      {/* Alert Banner */}
      <div className="bg-ww-blue text-white py-2 text-center text-sm">
        <Container>
          <div className="flex justify-center">
            <span>Voted as the #1 Home Remodeler in the U.S. by Remodeler Magazine.</span>
            <Link href="/about/why-window-world" className="text-white underline ml-1">
              Learn More!
            </Link>
          </div>
        </Container>
      </div>

      {/* Eyebrow Banner */}
      <div className="bg-ww-light-gray py-2">
        <Container>
          <ul className="flex justify-end list-none">
            <li className="ml-5 text-sm">
              <Link href="/about/reviews">Reviews</Link>
            </li>
            <li className="ml-5 text-sm">
              <Link href="/financing">Financing</Link>
            </li>
            <li className="ml-5 text-sm">
              <Link href="/service-areas">Service Areas</Link>
            </li>
            <li className="ml-5 text-sm font-bold">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </Container>
      </div>

      {/* Main Navigation */}
      <Container>
        <div className="py-4 flex flex-wrap items-center">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/" className="block w-48">
              <Image
                src="/images/logo/window-world-logo-blue.svg"
                alt="Window World Logo"
                width={240}
                height={92}
                priority
              />
            </Link>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                type="button"
                className="text-ww-dark-gray p-2 rounded-md"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Phone and CTA Button */}
          <div className="hidden lg:flex flex-col items-end ml-auto">
            <div className="info">
              <div className="text-sm text-ww-dark-gray">{serviceArea}</div>
              <a 
                className="text-lg font-bold text-ww-blue flex items-center" 
                href={`tel:${phoneNumber.replace(/\D/g, '')}`}
              >
                <div className="w-5 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M30.9,28.27a3.44,3.44,0,0,0,1-3.47,3.26,3.26,0,0,0-2.24-2.57,38.08,38.08,0,0,0-5.36-1.44,2.88,2.88,0,0,0-.72,0,3,3,0,0,0-1.52.76c-.78.63-1.54,1.29-2.31,1.94a1.16,1.16,0,0,1-1.39.25c-.27-.15-.55-.3-.81-.46a32.53,32.53,0,0,1-5-3.76,32.53,32.53,0,0,1-3.76-5c-.16-.26-.31-.54-.46-.81a1.16,1.16,0,0,1,.25-1.39c.65-.77,1.31-1.53,1.94-2.31a3,3,0,0,0,.76-1.52,2.88,2.88,0,0,0,0-.72A38.08,38.08,0,0,0,9.77,2.36,3.26,3.26,0,0,0,7.2.12a3.44,3.44,0,0,0-3.47,1C3.12,1.71,2.48,2.31,1.91,3A7.87,7.87,0,0,0,.11,6L0,7.36C0,8,.05,8.59.1,9.2A21.53,21.53,0,0,0,3.58,19.54a37.77,37.77,0,0,0,3,4.12c.28.31.57.62.87.92s.61.59.92.87a37.77,37.77,0,0,0,4.12,3A21.53,21.53,0,0,0,22.8,31.9c.61.05,1.23.07,1.84.1L26,31.89a7.87,7.87,0,0,0,3-1.8C29.69,29.52,30.29,28.88,30.9,28.27Z" />
                  </svg>
                </div>
                {phoneNumber}
              </a>
            </div>
            <Link
              className="bg-ww-green text-white py-2 px-4 rounded font-bold mt-2 inline-block"
              href="/free-estimate"
            >
              Request Free Estimate
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="w-full mt-4 hidden lg:block">
            <ul className="flex list-none justify-between">
              {Object.entries(navigationData).map(([key, item]) => (
                <li
                  key={key}
                  className={`${item.submenu.length > 0 ? 'relative' : ''}`}
                >
                  <Link 
                    href={item.href}
                    className="text-ww-dark-gray hover:text-ww-blue"
                    onMouseEnter={() => item.submenu.length > 0 && setActiveSubmenu(key)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    {item.label}
                    {item.submenu.length > 0 && (
                      <div
                        className="inline-block w-3 ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSubmenu(key);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 20.69" fill="currentColor">
                          <polygon points="16 20.69 0 4.69 4.69 0 16 11.31 27.31 0 32 4.69 16 20.69" />
                        </svg>
                      </div>
                    )}
                  </Link>
                  {item.submenu.length > 0 && (
                    <div 
                      className={`absolute top-full left-0 bg-white shadow-md min-w-[200px] z-10 ${activeSubmenu === key ? 'block' : 'hidden'}`}
                      onMouseEnter={() => setActiveSubmenu(key)}
                      onMouseLeave={() => setActiveSubmenu(null)}
                    >
                      <ul className="list-none py-2">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href} className="py-1 px-4">
                            <Link 
                              href={subItem.href}
                              className="text-ww-dark-gray hover:text-ww-blue"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden
        ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden
        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-ww-blue">Menu</h2>
            <button
              type="button"
              className="text-ww-dark-gray"
              onClick={toggleMobileMenu}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            {Object.entries(navigationData).map(([key, item]) => (
              <div key={key} className="border-b border-gray-200">
                <div className="flex justify-between items-center py-3">
                  <Link
                    href={item.href}
                    className="text-ww-dark-gray font-medium"
                    onClick={() => item.submenu.length === 0 && toggleMobileMenu()}
                  >
                    {item.label}
                  </Link>
                  {item.submenu.length > 0 && (
                    <button
                      type="button"
                      className="p-1 rounded-md text-ww-dark-gray"
                      onClick={() => toggleSubmenu(key)}
                    >
                      <svg
                        className={`h-5 w-5 transform transition-transform duration-200 ${activeSubmenu === key ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {item.submenu.length > 0 && (
                  <div
                    className={`pl-4 overflow-hidden transition-all duration-300 ${
                      activeSubmenu === key ? 'max-h-96 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block py-2 text-sm text-ww-dark-gray hover:text-ww-blue"
                        onClick={toggleMobileMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-6 space-y-4">
            <Button
              href="/free-estimate"
              variant="primary"
              fullWidth
              onClick={toggleMobileMenu}
            >
              Request Free Estimate
            </Button>

            <div className="text-center">
              <a
                href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                className="inline-flex items-center text-ww-blue font-medium"
                onClick={toggleMobileMenu}
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
