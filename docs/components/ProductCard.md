# ProductCard Component Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Components](./index.md) > ProductCard

## Overview

The ProductCard component displays information about a single product or product category. It's used on the homepage, product listing pages, and category pages to showcase Window World's offerings in an attractive and informative way.

## Component Structure

The ProductCard component consists of:

1. **Image Container**: Displays the product image
2. **Content Container**: Contains the title, description, features, and CTA
3. **Title**: The product or category name
4. **Description**: A brief description of the product
5. **Features List**: Bullet points highlighting key features
6. **Call-to-Action Button**: A button linking to the product detail page

## Implementation Details

### File Location

```
components/ui/ProductCard.tsx
```

### Props Interface

```typescript
interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}
```

### Default Props

- `features`: [] (empty array)
- `ctaText`: "Learn More"
- `ctaHref`: "#"
- `className`: undefined

### Key Features

1. **Responsive Design**: Adapts to different screen sizes and container widths
2. **Hover Effects**: Subtle animations on hover to improve user experience
3. **Flexible Content**: Supports variable-length titles, descriptions, and feature lists
4. **Optimized Images**: Uses Next.js Image component for optimized loading
5. **Customizable CTA**: Allows customization of the call-to-action button text and link

## Usage Example

```tsx
import { ProductCard } from '@/components/ui/ProductCard';

// Basic usage with required props
<ProductCard
  title="Double Hung Windows"
  description="Our most popular window style, offering versatility and classic appeal."
  imageSrc="/images/products/double-hung-windows.jpg"
  imageAlt="Double hung window in a modern home"
/>

// With features list
<ProductCard
  title="Double Hung Windows"
  description="Our most popular window style, offering versatility and classic appeal."
  imageSrc="/images/products/double-hung-windows.jpg"
  imageAlt="Double hung window in a modern home"
  features={[
    "Energy-efficient design",
    "Easy to clean and maintain",
    "Available in various colors and finishes",
    "Tilt-in sashes for convenient cleaning"
  ]}
/>

// With custom CTA
<ProductCard
  title="Double Hung Windows"
  description="Our most popular window style, offering versatility and classic appeal."
  imageSrc="/images/products/double-hung-windows.jpg"
  imageAlt="Double hung window in a modern home"
  ctaText="View Double Hung Windows"
  ctaHref="/windows/double-hung"
/>

// With additional CSS classes
<ProductCard
  title="Double Hung Windows"
  description="Our most popular window style, offering versatility and classic appeal."
  imageSrc="/images/products/double-hung-windows.jpg"
  imageAlt="Double hung window in a modern home"
  className="custom-card-class"
/>
```

## Styling

The component uses Tailwind CSS for styling, with the following key classes:

- `bg-white`: White background for the card
- `rounded-lg`: Rounded corners
- `shadow-md`: Medium shadow for depth
- `hover:shadow-lg`: Larger shadow on hover
- `transition-shadow duration-300`: Smooth transition for the shadow effect
- `aspect-[4/3]`: 4:3 aspect ratio for the image container

## Accessibility Features

- Proper alt text for images
- Semantic HTML structure
- Keyboard navigation support
- Sufficient color contrast for text readability

## Related Components

- [Button](./Button.md): Used for the call-to-action button
- [Image](https://nextjs.org/docs/api-reference/next/image): Next.js Image component for optimized image loading

## Testing

The ProductCard component can be tested at:

```
/testing/ui/product-card
```

This test page displays the ProductCard component with various configurations and provides instructions for testing its features.
