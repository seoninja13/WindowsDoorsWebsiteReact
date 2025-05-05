'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { formatPhoneNumber } from '@/lib/utils';

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
      { label: 'Energy Efficient Windows', href: '/windows/energy-efficient' },
      { label: 'Window Style Finder', href: '/window-style-finder' },
    ],
  },
  doors: {
    label: 'Doors',
    href: '/doors',
    submenu: [
      { label: 'Entry Doors', href: '/doors/entry' },
      { label: 'Patio Doors', href: '/doors/patio' },
      { label: 'Hinged Patio Doors', href: '/hinged-patio-doors' },
      { label: 'Garage Doors', href: '/doors/garage' },
    ],
  },
  vinylSiding: {
    label: 'Vinyl Siding',
    href: '/vinyl-siding',
    submenu: [
      { label: '1000 Series', href: '/vinyl-siding/1000-series' },
      { label: '1500 Series', href: '/vinyl-siding/1500-series' },
      { label: '2000 Series', href: '/vinyl-siding/2000-series' },
      { label: '4000 Series', href: '/vinyl-siding/4000-series' },
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

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const phoneNumber = '(800) 786-9342';

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
    <header className={`bg-white w-full z-50 ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
      {/* Top Bar */}
      <div className="bg-ww-blue text-white py-2">
        <Container>
          <div className="flex justify-between items-center">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="flex items-center hover:text-gray-200 transition-colors">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                {phoneNumber}
              </a>
              <span className="text-gray-300">|</span>
              <span>Serving Los Angeles & Surrounding Areas</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/free-estimate" className="hover:text-gray-200 transition-colors">
                Schedule Free Estimate
              </Link>
              <Link href="/financing" className="hover:text-gray-200 transition-colors">
                Financing
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <Container>
        <div className="py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <div className="h-16 w-64 relative">
                {/* Placeholder for actual logo - will be replaced with Image component */}
                <div className="absolute inset-0 flex items-center justify-center bg-white text-ww-blue font-bold text-xl">
                  WINDOW WORLD LA
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {Object.entries(navigationData).map(([key, item]) => (
              <div key={key} className="relative group">
                <Link
                  href={item.href}
                  className="text-ww-dark-gray hover:text-ww-blue font-montserrat font-medium py-2 inline-flex items-center"
                  onMouseEnter={() => item.submenu.length > 0 && setActiveSubmenu(key)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {item.label}
                  {item.submenu.length > 0 && (
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu.length > 0 && (
                  <div
                    className={`absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50 transition-all duration-300 transform origin-top-left
                    ${activeSubmenu === key ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                    onMouseEnter={() => setActiveSubmenu(key)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-ww-dark-gray hover:bg-ww-light-gray hover:text-ww-blue transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Button
              href="/free-estimate"
              variant="primary"
              size="sm"
              className="ml-2"
            >
              Free Estimate
            </Button>
          </nav>

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
      </Container>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden
        ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMobileMenu}
      />

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
              Schedule Free Estimate
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

export default Header;
