# ProductFeatures Component Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Components](./index.md) > ProductFeatures

## Overview

The ProductFeatures component showcases the key features and benefits of Window World products. It's typically used on the homepage and product category pages to highlight the advantages of choosing Window World products.

## Component Structure

The ProductFeatures component consists of:

1. **Section Header**: Title and optional subtitle
2. **Feature Grid**: A grid layout of individual feature cards
3. **Feature Cards**: Each containing an icon, title, and description
4. **Optional CTA**: A call-to-action button at the bottom of the section

## Implementation Details

### File Location

```
components/ui/ProductFeatures.tsx
```

### Props Interface

```typescript
interface Feature {
  id: number;
  icon: React.ReactNode | string;
  title: string;
  description: string;
}

interface ProductFeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  ctaText?: string;
  ctaHref?: string;
  backgroundColor?: 'white' | 'light-gray' | 'blue';
  className?: string;
}
```

### Default Props

- `title`: "Why Choose Window World"
- `subtitle`: undefined
- `ctaText`: undefined (no CTA button if not provided)
- `ctaHref`: "#"
- `backgroundColor`: "light-gray"
- `className`: undefined

### Key Features

1. **Flexible Layout**: Adapts to different numbers of features (2, 3, 4, or 6)
2. **Customizable Background**: Supports different background colors
3. **Icon Support**: Accepts both SVG icons and icon paths
4. **Responsive Design**: Adjusts layout based on screen size
5. **Optional CTA**: Includes an optional call-to-action button

## Usage Example

```tsx
import { ProductFeatures } from '@/components/ui/ProductFeatures';

// Basic usage with required props
<ProductFeatures features={features} />

// With custom title and subtitle
<ProductFeatures
  features={features}
  title="The Window World Difference"
  subtitle="Discover what sets our products apart from the competition"
/>

// With call-to-action button
<ProductFeatures
  features={features}
  ctaText="Learn More About Our Quality"
  ctaHref="/about/quality"
/>

// With custom background color
<ProductFeatures
  features={features}
  backgroundColor="blue"
/>

// With additional CSS classes
<ProductFeatures
  features={features}
  className="custom-features-class"
/>
```

## Feature Data Structure

Each feature in the `features` array should have the following structure:

```typescript
{
  id: 1,
  icon: <svg>...</svg>, // React SVG component
  // OR
  icon: "/images/icons/energy-efficient.svg", // Path to SVG file
  title: "Energy Efficient",
  description: "Our windows are ENERGY STAR® certified, helping you save on heating and cooling costs year-round."
}
```

## Styling

The component uses Tailwind CSS for styling, with the following key classes:

- `bg-gray-50`: Light gray background (default)
- `bg-white`: White background (optional)
- `bg-ww-blue text-white`: Blue background with white text (optional)
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`: Responsive grid layout
- `rounded-lg`: Rounded corners for feature cards
- `shadow-md`: Medium shadow for depth

## Accessibility Features

- Proper alt text for icons
- Semantic HTML structure
- Sufficient color contrast for text readability
- Keyboard navigation support

## Related Components

- [Container](./Container.md): Used to contain the section content
- [Button](./Button.md): Used for the call-to-action button
- [Icon](./Icon.md): Used for feature icons

## Testing

The ProductFeatures component can be tested at:

```
/testing/ui/product-features
```

This test page displays the ProductFeatures component with various configurations and provides instructions for testing its features.
