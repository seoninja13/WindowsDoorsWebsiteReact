# HeroBanner Component Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Components](./index.md) > HeroBanner

## Overview

The HeroBanner component is a prominent UI element that appears at the top of the homepage and key landing pages. It features a slider with multiple slides, each containing a background image, title, subtitle, and call-to-action buttons. The component is designed to capture user attention and drive conversions.

## Component Structure

The HeroBanner component consists of:

1. **Slide Container**: The main container that holds all slides
2. **Individual Slides**: Each slide contains a background image, overlay, and content
3. **Navigation Arrows**: Left and right arrows for manual navigation
4. **Slide Indicators**: Dots at the bottom indicating the current slide and total number of slides

## Implementation Details

### File Location

```
components/ui/HeroBanner.tsx
```

### Props Interface

```typescript
interface BannerSlide {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

interface HeroBannerProps {
  slides: BannerSlide[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
}
```

### Default Props

- `autoplay`: true
- `interval`: 5000 (5 seconds)
- `className`: undefined

### State Management

The component uses React's useState and useEffect hooks to manage:

- `currentSlide`: Tracks the index of the currently displayed slide
- `isTransitioning`: Prevents rapid slide changes during transitions
- `imagesLoaded`: Ensures images are preloaded before displaying the slider

### Key Features

1. **Automatic Slideshow**: Automatically transitions between slides at a configurable interval
2. **Manual Navigation**: Allows users to navigate slides using arrows or indicator dots
3. **Image Preloading**: Preloads all slide images to prevent flickering during transitions
4. **Responsive Design**: Adapts to different screen sizes while maintaining aspect ratio
5. **Loading State**: Displays a loading indicator while images are being loaded
6. **Customizable Interval**: Allows customization of the autoplay interval

## Usage Example

```tsx
import { HeroBanner } from '@/components/ui/HeroBanner';

// Basic usage with required props
<HeroBanner slides={heroSlides} />

// With autoplay disabled
<HeroBanner slides={heroSlides} autoplay={false} />

// With custom interval (10 seconds)
<HeroBanner slides={heroSlides} interval={10000} />

// With additional CSS classes
<HeroBanner slides={heroSlides} className="custom-banner-class" />
```

## Slide Data Structure

Each slide in the `slides` array should have the following structure:

```typescript
{
  id: 1,
  imageSrc: '/images/hero/slide1.jpg',
  imageAlt: 'Modern home with beautiful windows',
  title: 'Transform Your Home with Premium Windows & Doors',
  subtitle: 'Energy-efficient solutions for every style and budget',
  primaryButtonText: 'Free Estimate',
  primaryButtonHref: '/free-estimate',
  secondaryButtonText: 'View Products',
  secondaryButtonHref: '/products',
}
```

## Styling

The component uses Tailwind CSS for styling, with the following key classes:

- `h-[600px]`: Fixed height for the banner
- `bg-black/50`: Semi-transparent black overlay for better text readability
- `transition-opacity duration-500`: Smooth fade transition between slides
- `object-cover`: Ensures images cover the entire container while maintaining aspect ratio

## Accessibility Features

- Proper alt text for all images
- ARIA labels for navigation buttons
- Keyboard navigation support
- Focus management for interactive elements

## Related Components

- [Button](./Button.md): Used for the call-to-action buttons
- [Image](https://nextjs.org/docs/api-reference/next/image): Next.js Image component for optimized image loading

## Testing

The HeroBanner component can be tested at:

```
/testing/home
```

This test page displays the HeroBanner component with sample slides and provides instructions for testing its various features.
