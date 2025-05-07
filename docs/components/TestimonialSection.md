# TestimonialSection Component Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Components](./index.md) > TestimonialSection

## Overview

The TestimonialSection component displays customer testimonials in a carousel format. It's used on the homepage and other key pages to showcase customer satisfaction and build trust with potential customers.

## Component Structure

The TestimonialSection component consists of:

1. **Section Header**: Title and optional subtitle
2. **Testimonial Carousel**: Rotating display of customer testimonials
3. **Navigation Controls**: Arrows and dots for manual navigation
4. **Individual Testimonials**: Each containing a quote, customer name, location, and optional image

## Implementation Details

### File Location

```
components/ui/TestimonialSection.tsx
```

### Props Interface

```typescript
interface Testimonial {
  id: number;
  quote: string;
  customerName: string;
  customerLocation: string;
  customerImage?: string;
  rating?: number; // 1-5 stars
  projectType?: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  interval?: number;
  className?: string;
}
```

### Default Props

- `title`: "What Our Customers Say"
- `subtitle`: undefined
- `autoplay`: true
- `interval`: 6000 (6 seconds)
- `className`: undefined

### State Management

The component uses React's useState and useEffect hooks to manage:

- `currentTestimonial`: Tracks the index of the currently displayed testimonial
- `isTransitioning`: Prevents rapid testimonial changes during transitions

### Key Features

1. **Automatic Rotation**: Automatically cycles through testimonials at a configurable interval
2. **Manual Navigation**: Allows users to navigate testimonials using arrows or indicator dots
3. **Star Rating Display**: Shows customer ratings using star icons
4. **Responsive Design**: Adapts to different screen sizes
5. **Customizable Header**: Allows customization of the section title and subtitle
6. **Pause on Hover**: Pauses the automatic rotation when the user hovers over the carousel

## Usage Example

```tsx
import { TestimonialSection } from '@/components/ui/TestimonialSection';

// Basic usage with required props
<TestimonialSection testimonials={testimonials} />

// With custom title and subtitle
<TestimonialSection
  testimonials={testimonials}
  title="Customer Reviews"
  subtitle="See what our satisfied customers have to say about our products and services"
/>

// With autoplay disabled
<TestimonialSection testimonials={testimonials} autoplay={false} />

// With custom interval (10 seconds)
<TestimonialSection testimonials={testimonials} interval={10000} />

// With additional CSS classes
<TestimonialSection testimonials={testimonials} className="custom-testimonial-class" />
```

## Testimonial Data Structure

Each testimonial in the `testimonials` array should have the following structure:

```typescript
{
  id: 1,
  quote: "Window World transformed our home with beautiful, energy-efficient windows. The installation was quick and professional, and we've already noticed a difference in our energy bills!",
  customerName: "John Smith",
  customerLocation: "Los Angeles, CA",
  customerImage: "/images/testimonials/john-smith.jpg", // Optional
  rating: 5, // Optional, 1-5 stars
  projectType: "Window Replacement" // Optional
}
```

## Styling

The component uses Tailwind CSS for styling, with the following key classes:

- `bg-white`: White background for the section
- `rounded-lg`: Rounded corners for the testimonial cards
- `shadow-md`: Medium shadow for depth
- `text-ww-blue`: Window World blue for the section title
- `transition-opacity duration-500`: Smooth fade transition between testimonials

## Accessibility Features

- Proper ARIA labels for navigation buttons
- Keyboard navigation support
- Pause on focus for better keyboard user experience
- Sufficient color contrast for text readability

## Related Components

- [StarRating](./StarRating.md): Used to display customer ratings
- [Button](./Button.md): Used for navigation arrows
- [Image](https://nextjs.org/docs/api-reference/next/image): Next.js Image component for customer photos

## Testing

The TestimonialSection component can be tested at:

```
/testing/ui/testimonial-section
```

This test page displays the TestimonialSection component with sample testimonials and provides instructions for testing its various features.
