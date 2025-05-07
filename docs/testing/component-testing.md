# Component Testing Documentation

## Overview

This document provides instructions for testing UI components in the Windows Doors Website React project. The component testing section allows developers to view and interact with individual UI components in isolation, making it easier to verify their appearance and functionality.

## Testing Structure

The testing section is organized into two main categories:

1. **Component Testing** - Test individual UI components in isolation
2. **Complete Page Testing** - Test complete pages with all components integrated

This structure allows developers to test both individual components and how they work together on complete pages.

### Component Testing Pages

1. **Testing Index** (`/testing`) - Main entry point with links to all test pages
2. **Home Page Components** (`/testing/home`) - Components used on the home page
3. **Product Page Components** (`/testing/products`) - Components used on product pages
4. **About Page Components** (`/testing/about`) - Components used on the about page
5. **Contact Page Components** (`/testing/contact`) - Components used on the contact page
6. **UI Components** (`/testing/ui`) - Basic UI components like buttons, inputs, etc.

### Complete Page Testing Pages

1. **Pages Index** (`/testing/pages`) - Links to all complete page tests
2. **Complete Home Page** (`/testing/pages/home`) - Test the complete home page
3. **Complete Products Page** (`/testing/pages/products`) - Test the complete products page
4. **Complete About Page** (`/testing/pages/about`) - Test the complete about page
5. **Complete Contact Page** (`/testing/pages/contact`) - Test the complete contact page

### Accessing the Component Testing Pages

1. Start the Netlify Dev server:
   ```bash
   npm run netlify:dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8888/testing
   ```

### Components by Page

#### Home Page Components (`/testing/home`)

1. **Hero Banner Component**
   - Slider with multiple slides
   - Each slide has an image, title, subtitle, and call-to-action buttons
   - Used on the home page and product category pages

2. **Product Card Component**
   - Card displaying product information with image, title, description, features, and CTA
   - Used on the home page to showcase product categories

3. **Testimonial Section Component**
   - Section displaying customer testimonials with quotes, author information, and ratings
   - Used on the home page to build trust with potential customers

4. **Product Features Component**
   - Section displaying product features with icons, titles, and descriptions
   - Used on the home page to highlight key benefits

5. **Service Areas Component**
   - Section displaying service areas grouped by county with tabs and city lists
   - Used on the home page to show the company's service coverage

6. **Free Estimate Form Component**
   - Form for requesting a free estimate with input fields and validation
   - Used on the home page for lead generation

#### Product Page Components (`/testing/products`)

1. **Product Card Component**
   - Card displaying product information with image, title, description, features, and CTA
   - Used on product category pages to showcase individual products

2. **Product Features Component**
   - Section displaying product features with icons, titles, and descriptions
   - Used on product pages to highlight key benefits

#### About Page Components (`/testing/about`)

1. **Testimonial Section Component**
   - Section displaying customer testimonials with quotes, author information, and ratings
   - Used on the about page to build trust with potential customers

#### Contact Page Components (`/testing/contact`)

1. **Free Estimate Form Component**
   - Form for requesting a free estimate with input fields and validation
   - Used on the contact page for lead generation

2. **Service Areas Component**
   - Section displaying service areas grouped by county with tabs and city lists
   - Used on the contact page to show the company's service coverage

#### UI Components (`/testing/ui`)

1. **Button Component**
   - Primary, Secondary, Outline, and Ghost variants
   - Different sizes: Small, Medium, Large
   - With and without icons
   - Full width and disabled states
   - Used throughout the site for calls to action

## Testing Process

When testing components, consider the following aspects:

### Visual Testing

1. **Layout**: Verify that the component layout matches the design specifications
2. **Responsiveness**: Test the component at different screen sizes to ensure it adapts correctly
3. **Typography**: Check that fonts, sizes, weights, and colors match the design
4. **Spacing**: Verify that margins, padding, and spacing between elements are consistent
5. **Colors**: Ensure that colors match the brand guidelines
6. **Images**: Check that images are displayed correctly and are properly sized

### Functional Testing

1. **Interactions**: Test all interactive elements (buttons, links, forms, etc.)
2. **Animations**: Verify that animations and transitions work as expected
3. **State Changes**: Test components that have different states (hover, active, disabled, etc.)
4. **Form Validation**: Test form components with valid and invalid inputs
5. **Error Handling**: Verify that components handle errors gracefully

### Accessibility Testing

1. **Keyboard Navigation**: Test that all interactive elements can be accessed and used with a keyboard
2. **Screen Reader Compatibility**: Verify that components work with screen readers
3. **Color Contrast**: Ensure that text has sufficient contrast against its background
4. **Focus Indicators**: Check that focus indicators are visible and follow a logical order

## Adding New Components to the Testing Page

To add a new component to the testing page:

1. Import the component at the top of `app/component-testing/page.tsx`
2. Create sample data for the component
3. Add a new section to the page with a heading and the component

Example:

```tsx
// Import the component
import { NewComponent } from '@/components/ui/NewComponent';

// In the component function, create sample data
const newComponentData = {
  // Sample data properties
};

// In the return statement, add a new section
<section className="mb-16">
  <h2 className="text-2xl font-semibold mb-4 border-b pb-2">New Component</h2>
  <div className="mb-8">
    <NewComponent {...newComponentData} />
  </div>
</section>
```

## Troubleshooting

### Component Not Rendering

If a component is not rendering on the testing page:

1. Check the console for errors
2. Verify that the component is imported correctly
3. Check that the sample data matches the component's props
4. Ensure that any required context providers are present

### Styling Issues

If a component's styling doesn't match the design:

1. Check the component's CSS classes
2. Verify that the Tailwind configuration includes all necessary colors, spacing, etc.
3. Check for any global styles that might be affecting the component

### Performance Issues

If a component is causing performance issues:

1. Check for unnecessary re-renders
2. Verify that images are optimized
3. Check for any expensive calculations or operations

## Conclusion

The component testing page is a valuable tool for verifying the appearance and functionality of UI components. By testing components in isolation, developers can identify and fix issues before they affect the entire application.

Last Updated: May 9, 2025
