"use client";

import React, { useState } from 'react';
import { AlertBanner } from './ui/AlertBanner';
import { EyebrowBanner } from './ui/EyebrowBanner';
import { Logo } from './ui/Logo';
import { PhoneButton } from './ui/PhoneButton';
import { CTAButton } from './ui/CTAButton';
import { Hamburger } from './ui/Hamburger';
import { MainNavigation } from './ui/MainNavigation';

// Mock data for navigation - in a real app, this would come from an API or CMS
const mainMenuItems = [
  {
    id: 'windows',
    text: 'Windows',
    url: '/windows/',
    hasChildren: true,
    className: 'products',
    subMenuItems: [
      { id: 'double-hung', text: 'Double-Hung Windows', url: '/windows/double-hung/' },
      { id: 'sliding', text: 'Sliding Windows', url: '/windows/sliding/' },
      { id: 'casement', text: 'Casement Windows', url: '/windows/casement/' },
      { id: 'bay-bow', text: 'Bay & Bow Windows', url: '/windows/bay-bow/' },
      { id: 'awning', text: 'Awning Windows', url: '/windows/awning/' },
      { id: 'custom', text: 'Custom Windows', url: '/windows/custom/' },
      { id: 'garden', text: 'Garden Windows', url: '/windows/garden/' },
      { id: 'picture', text: 'Picture Windows', url: '/windows/picture-window/' },
      { id: 'shutters', text: 'Shutters', url: '/windows/shutters/' }
    ]
  },
  {
    id: 'doors',
    text: 'Doors',
    url: '/doors/',
    hasChildren: true,
    className: 'products',
    subMenuItems: [
      { id: 'entry', text: 'Entry Doors', url: '/doors/entry/' },
      { id: 'patio', text: 'Patio Doors', url: '/doors/patio/' },
      { id: 'hinged-patio', text: 'Hinged Patio Doors', url: '/hinged-patio-doors/' },
      { id: 'garage', text: 'Garage Doors', url: '/doors/garage/' }
    ]
  },
  {
    id: 'siding',
    text: 'Siding',
    url: '/vinyl-siding/',
    hasChildren: true,
    className: 'products',
    subMenuItems: [
      { id: '1000-series', text: '1000 Series Siding', url: '/vinyl-siding/1000-series/' },
      { id: '1500-series', text: '1500 Series Siding', url: '/vinyl-siding/1500-series/' },
      { id: '2000-series', text: '2000 Series Siding', url: '/vinyl-siding/2000-series/' },
      { id: '4000-series', text: '4000 Series Siding', url: '/vinyl-siding/4000-series/' }
    ]
  },
  {
    id: 'roofing',
    text: 'Roofing',
    url: '/roofing/',
    className: 'products no-divider'
  },
  {
    id: 'about',
    text: 'About',
    url: '/about/',
    hasChildren: true,
    className: 'menu-align-top menu-hide-mobile menu-hide-medium'
  }
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <AlertBanner
        text="Voted as the #1 Home Remodeler in the U.S. by Remodeler Magazine."
        linkText="Learn More!"
        linkUrl="https://windowworldla.com/about/why-window-world/"
      />
      <EyebrowBanner />
      <div className="header-wrapper">
        <div className="logo-nav">
          <Logo href="https://www.windowworldla.com" />
          <Hamburger
            onClick={toggleMobileMenu}
            phoneNumber="(310) 919-2352"
          />
        </div>
        <div className="location-info">
          <PhoneButton
            phoneNumber="(310) 919-2352"
            location="Los Angeles"
          />
          <CTAButton
            text="Request Free Estimate"
            href="https://windowworldla.com/free-estimate-request/"
          />
        </div>
        <MainNavigation menuItems={mainMenuItems} />
        <div className={`quick-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <MainNavigation menuItems={mainMenuItems} />
          <div className="eyebrow-menu">
            <EyebrowBanner />
          </div>
          <CTAButton
            text="Request Free Estimate"
            href="https://windowworldla.com/free-estimate-request/"
          />
        </div>
      </div>
    </header>
  );
};
