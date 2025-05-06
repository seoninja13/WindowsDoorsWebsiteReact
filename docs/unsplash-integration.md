# Unsplash Image Integration via Context7 MCP

This document outlines our approach for integrating Unsplash images into the Windows & Doors Website clone using the Context7 MCP server.

## Overview

To ensure legal compliance and high-quality visuals for our website, we've implemented a system to fetch images from Unsplash via the Context7 MCP server. This approach allows us to:

1. Use legally compliant images without copyright concerns
2. Access a vast library of high-quality, professional images
3. Maintain visual consistency with the original Window World LA website
4. Optimize image loading and performance

## Implementation Details

### Utility Functions

We've created utility functions in the following files:

- `lib/utils/context7.ts`: Contains functions for interacting with the Context7 MCP server to fetch Unsplash images
- `lib/utils/unsplash.ts`: Contains helper functions for working with Unsplash images

### Server Actions

We've implemented server actions in `app/actions.ts` to fetch images for different sections of the website:

- `getHeroBannerImages()`: Fetches images for the hero banner slider
- `getProductImages()`: Fetches images for product cards (windows, doors, siding)
- `getTestimonialImages()`: Fetches images for customer testimonials
- `getServiceAreaImages()`: Fetches images for service area sections

### Image Categories and Search Queries

We've identified the following image categories and search queries to match the visual style of the Window World LA website:

| Component | Search Query | Description |
|-----------|-------------|-------------|
| Hero Banner | "modern home exterior with large windows" | High-quality images of homes with prominent windows |
| Windows Products | "window styles in modern home" | Images showcasing different window styles |
| Doors Products | "entry door home exterior" | Images of elegant entry doors |
| Siding Products | "house vinyl siding" | Images of homes with vinyl siding |
| Testimonials | "happy homeowner family" | Images of satisfied homeowners |
| Service Areas | "neighborhood homes" | Images of residential neighborhoods |

## Image Optimization

To ensure optimal performance, we've implemented:

1. **Image Preloading**: The HeroBanner component preloads images to prevent flickering during transitions
2. **Loading States**: Components display loading states while images are being fetched
3. **Next.js Image Component**: We use the Next.js Image component for automatic optimization, lazy loading, and responsive sizing
4. **Quality Settings**: We've set appropriate quality parameters (90 for hero images, 80 for other images) to balance quality and performance

## Fallback Strategy

To ensure the website always displays properly, we've implemented a fallback strategy:

1. Each component first attempts to fetch images from Unsplash via Context7 MCP
2. If the fetch fails or returns empty results, the component falls back to placeholder images
3. Placeholder paths follow a consistent naming convention (e.g., `/placeholder-hero-1.jpg`)

## Future Improvements

1. **Caching**: Implement server-side caching of Unsplash images to reduce API calls
2. **Image Collections**: Create and use Unsplash collections for more consistent visual style
3. **Alt Text Generation**: Use AI to generate descriptive alt text for better accessibility
4. **Progressive Loading**: Implement progressive image loading for larger images
5. **Responsive Image Sets**: Create different image sizes for different device types

## Usage Examples

### Fetching Images in a Server Component

```tsx
// In a server component
import { getProductImages } from '@/app/actions';

export default async function ProductGallery() {
  const images = await getProductImages();
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(images).map(([key, src]) => (
        <Image 
          key={key}
          src={src} 
          alt={`${key} product`}
          width={400}
          height={300}
          className="rounded-lg"
        />
      ))}
    </div>
  );
}
```

### Using Images in a Client Component

```tsx
// In a client component that receives images as props
'use client';

interface ProductCardProps {
  title: string;
  imageSrc: string;
  // other props...
}

export function ProductCard({ title, imageSrc, ...props }: ProductCardProps) {
  return (
    <div className="card">
      <div className="relative h-64 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3>{title}</h3>
        {/* other content */}
      </div>
    </div>
  );
}
```
