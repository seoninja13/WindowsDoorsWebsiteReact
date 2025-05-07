# UI Components Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > Components

## Overview

This section documents all UI components used in the Window World LA website clone. Each component is designed to match the original Window World LA website exactly in terms of visual appearance and functionality.

## Component Categories

### Layout Components

These components define the overall structure and layout of the pages:

- [Container](./Container.md): Constrains content to a maximum width and adds consistent padding
- [Section](./Section.md): Defines a section of content with consistent spacing
- [Grid](./Grid.md): Creates responsive grid layouts for content

### Navigation Components

These components handle site navigation:

- [Header](./Header.md): Main site header with navigation, logo, and contact information
- [Footer](./Footer.md): Site footer with links, contact information, and copyright
- [Breadcrumbs](./Breadcrumbs.md): Shows the current page location in the site hierarchy
- [Pagination](./Pagination.md): Handles pagination for multi-page content

### Content Components

These components display various types of content:

- [HeroBanner](./HeroBanner.md): Large banner with background image, text, and call-to-action
- [ProductCard](./ProductCard.md): Displays product information in a card format
- [TestimonialSection](./TestimonialSection.md): Displays customer testimonials in a carousel
- [ProductFeatures](./ProductFeatures.md): Highlights key features of products
- [ServiceAreas](./ServiceAreas.md): Shows service areas with map and list
- [Gallery](./Gallery.md): Displays images in a grid or carousel format
- [Accordion](./Accordion.md): Expandable content sections for FAQs or product details

### Form Components

These components handle user input:

- [FreeEstimateForm](./FreeEstimateForm.md): Form for requesting a free estimate
- [ContactForm](./ContactForm.md): Form for contacting Window World
- [FormInput](./FormInput.md): Text input field with label and validation
- [FormSelect](./FormSelect.md): Dropdown select field with label and validation
- [FormCheckbox](./FormCheckbox.md): Checkbox input with label
- [FormRadio](./FormRadio.md): Radio button input with label
- [FormTextarea](./FormTextarea.md): Multi-line text input with label and validation

### Interactive Components

These components provide interactive functionality:

- [Button](./Button.md): Various button styles for calls-to-action
- [Tabs](./Tabs.md): Tabbed interface for switching between content sections
- [Modal](./Modal.md): Popup dialog for additional content or confirmations
- [Tooltip](./Tooltip.md): Small popup with additional information
- [Dropdown](./Dropdown.md): Dropdown menu for navigation or selection

### Utility Components

These components provide utility functionality:

- [Icon](./Icon.md): SVG icons used throughout the site
- [Image](./Image.md): Optimized image component with lazy loading
- [Video](./Video.md): Video player component
- [Loader](./Loader.md): Loading indicator for async operations
- [Alert](./Alert.md): Displays messages to the user

## Component Documentation Structure

Each component documentation file follows a consistent structure:

1. **Overview**: Brief description of the component and its purpose
2. **Component Structure**: Breakdown of the component's parts
3. **Implementation Details**: Technical details about the component
4. **Usage Example**: Code examples showing how to use the component
5. **Props Interface**: Description of the component's props
6. **Styling**: Information about the component's styling
7. **Accessibility Features**: Accessibility considerations
8. **Related Components**: Links to related components
9. **Testing**: Information about how to test the component

## Best Practices

When using these components, follow these best practices:

1. **Consistency**: Use components consistently throughout the site
2. **Props**: Provide all required props and consider optional props for customization
3. **Accessibility**: Ensure all components are used in an accessible manner
4. **Responsive Design**: Test components at all screen sizes
5. **Performance**: Be mindful of component performance, especially for image-heavy components

## Testing Components

All components can be tested individually at:

```
/testing/ui/[component-name]
```

For example, to test the Button component:

```
/testing/ui/button
```

## Contributing to Component Documentation

When documenting a new component or updating existing documentation:

1. Follow the established documentation structure
2. Include code examples for all common use cases
3. Document all props, including types and default values
4. Include information about accessibility features
5. Add links to related components
6. Include testing instructions
