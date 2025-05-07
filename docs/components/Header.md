# Header Component Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Components](./index.md) > Header

## Overview

The Header component is a crucial UI element that appears at the top of every page on the Window World LA website. It provides navigation, branding, and contact information, ensuring users can easily access key sections of the website.

## Component Structure

The Header component is composed of several sub-components:

1. **Alert Banner**: A promotional banner at the very top of the page
2. **Eyebrow Navigation**: Secondary navigation links for quick access to important pages
3. **Main Header**: Contains the logo, contact information, and CTA button
4. **Main Navigation**: Primary navigation menu with dropdown functionality
5. **Mobile Menu**: Responsive menu for mobile devices

## Implementation Details

### File Location

```
components/ui/Header.tsx
```

### Props Interface

```typescript
interface HeaderProps {
  phoneNumber?: string;
  serviceArea?: string;
  className?: string;
}
```

### Default Props

- `phoneNumber`: "(800) 786-9342"
- `serviceArea`: "Los Angeles & Surrounding Areas"
- `className`: undefined

### State Management

The component uses React's useState hook to manage:

- `mobileMenuOpen`: Controls the visibility of the mobile menu
- `activeSubmenu`: Tracks which submenu is currently active
- `isScrolled`: Determines if the user has scrolled down the page

### Key Features

1. **Shadow Effect on Scroll**: The header adds a shadow when the user scrolls down the page
2. **Dropdown Menus**: Navigation items with submenus display dropdown menus on hover
3. **Mobile Responsiveness**: The header transforms into a mobile-friendly version on smaller screens
4. **Slide-in Mobile Menu**: The mobile menu slides in from the right side of the screen
5. **Accordion-style Mobile Submenus**: Submenus in the mobile view use an accordion-style expansion

## Usage Example

```tsx
import { Header } from '@/components/ui/Header';

// Basic usage with default values
<Header />

// With custom phone number and service area
<Header 
  phoneNumber="(310) 123-4567" 
  serviceArea="Orange County & Surrounding Areas" 
/>

// With additional CSS classes
<Header className="custom-header-class" />
```

## Navigation Data Structure

The navigation data is structured as an object with keys representing each main navigation item. Each item contains:

- `label`: The display text for the navigation item
- `href`: The URL the navigation item links to
- `submenu`: An array of submenu items, each with its own label and href

Example:

```typescript
const navigationData = {
  windows: {
    label: 'Windows',
    href: '/windows',
    submenu: [
      { label: 'Double Hung Windows', href: '/windows/double-hung' },
      { label: 'Sliding Windows', href: '/windows/sliding' },
      // Additional submenu items...
    ],
  },
  // Additional navigation items...
};
```

## Styling

The component uses Tailwind CSS for styling, with the following key classes:

- `bg-white`: White background for the header
- `shadow-md`: Shadow effect when scrolled
- `z-50`: High z-index to ensure the header appears above other content
- `bg-ww-blue`: Window World blue background for the alert banner
- `bg-ww-light-gray`: Light gray background for the eyebrow navigation

## Accessibility Features

- Proper ARIA attributes for the mobile menu toggle button
- Keyboard navigation support for all interactive elements
- Semantic HTML structure with appropriate heading levels
- Focus management for dropdown menus

## Related Components

- [Container](./Container.md): Used to contain the header content
- [Button](./Button.md): Used for the CTA button
- [Logo](./Logo.md): The Window World logo component

## Testing

The Header component can be tested at:

```
/testing/ui/header
```

This test page displays the Header component in isolation and provides instructions for testing its various features.
