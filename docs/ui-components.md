# UI Components and Design System

> **Breadcrumb Navigation**: [README.md](../README.md) > [Documentation](./index.md) > UI Components and Design System

## Overview

This document provides a comprehensive overview of the UI components and design system implemented for the Window World LA website clone. The design system is built to ensure 100% visual parity with the original website while maintaining accessibility and best practices.

## Design System

### Colors

The color palette is based on Window World LA's brand colors:

| Name | Hex Code | Usage |
|------|----------|-------|
| Primary Blue | `#004b8d` | Primary brand color, used for buttons, links, and accents |
| Light Blue | `#0077c8` | Secondary brand color, used for hover states and accents |
| Dark Blue | `#003366` | Used for hover states on primary blue elements |
| Red | `#e31837` | Used for secondary buttons and important callouts |
| Light Gray | `#f5f5f5` | Used for backgrounds and hover states |
| Gray | `#e0e0e0` | Used for borders and dividers |
| Dark Gray | `#333333` | Used for text |
| Footer Background | `#1a1a1a` | Used for the footer background |

### Typography

The typography system uses two primary fonts:

| Font | Usage |
|------|-------|
| Montserrat | Used for headings, navigation, and buttons |
| Open Sans | Used for body text and form elements |

Font sizes are defined as follows:

| Name | Size | Usage |
|------|------|-------|
| heading-xl | 42px | Main headings on landing pages |
| heading-lg | 36px | Section headings |
| heading-md | 28px | Subsection headings |
| heading-sm | 22px | Card headings |
| body-lg | 18px | Large body text |
| body | 16px | Standard body text |
| body-sm | 14px | Small body text, captions |
| nav | 16px | Navigation text |

### Spacing

The spacing system is based on a 4px grid:

| Name | Size | Usage |
|------|------|-------|
| ww-section | 80px | Vertical spacing between sections |
| ww-container | 1200px | Maximum container width |

### Shadows

| Name | Value | Usage |
|------|-------|-------|
| ww | `0 2px 4px rgba(0, 0, 0, 0.1)` | Standard shadow for cards and elements |
| ww-lg | `0 4px 8px rgba(0, 0, 0, 0.15)` | Larger shadow for elevated cards |
| ww-xl | `0 8px 16px rgba(0, 0, 0, 0.2)` | Extra large shadow for modals |

### Border Radius

| Name | Value | Usage |
|------|-------|-------|
| ww | 4px | Standard border radius for buttons and inputs |
| ww-lg | 8px | Larger border radius for cards |

## Components

### Button

The Button component is a versatile component that can be used for various actions throughout the site.

#### Variants

- **Primary**: Blue background with white text
- **Secondary**: Red background with white text
- **Outline**: Blue border with blue text, changes to white text on blue background on hover
- **White**: White background with blue text
- **Ghost**: Transparent background with blue text, light gray background on hover

#### Sizes

- **Small**: Smaller padding and font size
- **Medium**: Standard size
- **Large**: Larger padding and font size

#### Features

- Can be rendered as a button or a link based on the presence of the `href` prop
- Supports loading state with a spinner
- Supports icons on the left or right
- Can be full width
- Includes focus and hover states

#### Usage

```tsx
// As a button
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// As a link
<Button href="/contact" variant="outline" size="sm">
  Contact Us
</Button>

// With an icon
<Button
  variant="secondary"
  icon={<PhoneIcon />}
  iconPosition="left"
>
  Call Now
</Button>

// Loading state
<Button variant="primary" loading>
  Submitting...
</Button>
```

### Container

The Container component provides consistent width and padding for content sections.

#### Features

- Configurable maximum width
- Optional padding
- Can be rendered as any HTML element

#### Usage

```tsx
// Default container
<Container>
  <p>Content goes here</p>
</Container>

// With custom width
<Container maxWidth="sm">
  <p>Narrower content</p>
</Container>

// As a different HTML element
<Container as="section" className="bg-gray-100">
  <p>Section content</p>
</Container>
```

### Header

The Header component is the main navigation component for the site.

#### Features

- Top bar with contact information and quick links
- Main navigation with dropdown menus
- Mobile responsive menu with slide-in animation
- "Free Estimate" CTA button
- Shadow effect on scroll

#### Structure

The Header is composed of:

1. **Top Bar**: Contains phone number, service area information, and quick links
2. **Main Navigation**: Contains the logo, navigation links with dropdowns, and CTA button
3. **Mobile Menu**: Slide-in menu for mobile devices with accordion-style submenus

#### Navigation Data

The navigation structure is defined in a data object that maps all main sections and their submenus:

```tsx
const navigationData = {
  windows: {
    label: 'Windows',
    href: '/windows',
    submenu: [
      { label: 'Double Hung Windows', href: '/windows/double-hung' },
      // Additional submenu items...
    ],
  },
  // Additional navigation sections...
};
```

## Utility Functions

### Class Name Utility

The `cn` function combines multiple class names and merges Tailwind CSS classes:

```tsx
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Formatting Utilities

- `formatPhoneNumber`: Formats a phone number to (XXX) XXX-XXXX format
- `truncateText`: Truncates text to a specified length and adds ellipsis
- `formatPrice`: Formats a price with dollar sign and commas
- `slugify`: Generates a URL-friendly slug from a string

## Implementation Details

### Tailwind Configuration

The Tailwind configuration has been updated to include all the design system tokens:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'ww-blue': '#004b8d',
        // Additional colors...
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      // Additional theme extensions...
    },
  },
};
```

### Global CSS

The global CSS file includes:

1. Font imports
2. Base styles for typography
3. Component classes for buttons, cards, forms, and sections

## Next Steps

### Priority 1 (Critical)
1. Complete the Footer component
   - Implement all sections and links
   - Add social media icons and copyright information
   - Ensure responsive behavior

2. Create Card component for product displays
   - Implement hover effects and transitions
   - Add call-to-action buttons
   - Create responsive variants

3. Implement Home page Hero section
   - Create banner slider with auto-play
   - Add call-to-action buttons
   - Ensure responsive behavior

4. Build Form components
   - Create Input, Select, and Checkbox components
   - Implement form validation
   - Build the "Free Estimate" form

## Related Documentation

- [Crawl4AI Analysis](./crawl4ai-analysis.md)
- [Project Tasks](./project-tasks.md)
- [Priority List](./priority-list.md)
- [Daily Log](./daily-log.md)

Last Updated: May 8, 2025
