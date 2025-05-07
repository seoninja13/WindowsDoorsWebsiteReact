# ServiceAreas Component Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Components](./index.md) > ServiceAreas

## Overview

The ServiceAreas component displays the geographic areas served by Window World of Los Angeles. It typically includes a map visualization and a list of cities or regions. This component is used on the homepage and dedicated service areas page.

## Component Structure

The ServiceAreas component consists of:

1. **Map Container**: Interactive map showing the service area
2. **Area List**: List of cities or regions served
3. **Section Header**: Title and optional subtitle
4. **Optional CTA**: Call-to-action button for more information

## Implementation Details

### File Location

```
components/ui/ServiceAreas.tsx
```

### Props Interface

```typescript
interface ServiceArea {
  id: number;
  name: string;
  slug: string;
  county?: string;
}

interface MapCoordinates {
  lat: number;
  lng: number;
  zoom: number;
}

interface ServiceAreasProps {
  title?: string;
  subtitle?: string;
  areas: ServiceArea[];
  mapCenter?: MapCoordinates;
  showMap?: boolean;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}
```

### Default Props

- `title`: "Areas We Serve"
- `subtitle`: undefined
- `mapCenter`: { lat: 34.0522, lng: -118.2437, zoom: 9 } (Los Angeles)
- `showMap`: true
- `ctaText`: "View All Service Areas"
- `ctaHref`: "/service-areas"
- `className`: undefined

### Key Features

1. **Interactive Map**: Google Maps integration showing the service area
2. **Organized Area List**: Areas grouped by county or region
3. **Responsive Design**: Adapts to different screen sizes
4. **Map Markers**: Highlights key service locations on the map
5. **Area Filtering**: Optional filtering by county or region
6. **Map Toggle**: Option to show or hide the map

## Usage Example

```tsx
import { ServiceAreas } from '@/components/ui/ServiceAreas';

// Basic usage with required props
<ServiceAreas areas={serviceAreas} />

// With custom title and subtitle
<ServiceAreas
  areas={serviceAreas}
  title="Window World of Los Angeles Service Areas"
  subtitle="We proudly serve homeowners throughout Los Angeles County and surrounding areas"
/>

// Without map display
<ServiceAreas
  areas={serviceAreas}
  showMap={false}
/>

// With custom map center and zoom
<ServiceAreas
  areas={serviceAreas}
  mapCenter={{ lat: 34.1478, lng: -118.1445, zoom: 10 }} // Pasadena
/>

// With custom CTA
<ServiceAreas
  areas={serviceAreas}
  ctaText="Check If We Serve Your Area"
  ctaHref="/service-areas/check"
/>

// With additional CSS classes
<ServiceAreas
  areas={serviceAreas}
  className="custom-service-areas-class"
/>
```

## Service Area Data Structure

Each area in the `areas` array should have the following structure:

```typescript
{
  id: 1,
  name: "Los Angeles",
  slug: "los-angeles",
  county: "Los Angeles County" // Optional
}
```

## Map Integration

The component uses the Google Maps JavaScript API for the interactive map. The API key is loaded from environment variables:

```typescript
// In .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Styling

The component uses Tailwind CSS for styling, with the following key classes:

- `bg-white`: White background for the section
- `h-[400px] md:h-[500px]`: Responsive height for the map container
- `rounded-lg`: Rounded corners for the map container
- `shadow-md`: Medium shadow for depth
- `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4`: Responsive grid for the area list

## Accessibility Features

- Keyboard accessible map controls
- Screen reader support for map markers
- Semantic HTML structure for the area list
- Sufficient color contrast for text readability

## Related Components

- [Container](./Container.md): Used to contain the section content
- [Button](./Button.md): Used for the call-to-action button
- [GoogleMap](./GoogleMap.md): Wrapper component for Google Maps integration

## Testing

The ServiceAreas component can be tested at:

```
/testing/ui/service-areas
```

This test page displays the ServiceAreas component with sample data and provides instructions for testing its features.
