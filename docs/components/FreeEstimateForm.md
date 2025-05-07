# FreeEstimateForm Component Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Components](./index.md) > FreeEstimateForm

## Overview

The FreeEstimateForm component is a critical conversion element that allows users to request a free estimate for Window World products and services. It appears on the homepage, product pages, and dedicated free estimate page.

## Component Structure

The FreeEstimateForm component consists of:

1. **Form Header**: Title and optional subtitle
2. **Input Fields**: Various form fields for user information
3. **Product Selection**: Checkboxes for selecting products of interest
4. **Submission Button**: Button to submit the form
5. **Success/Error Messages**: Feedback after form submission

## Implementation Details

### File Location

```
components/ui/FreeEstimateForm.tsx
```

### Props Interface

```typescript
interface FreeEstimateFormProps {
  title?: string;
  subtitle?: string;
  showProductSelection?: boolean;
  redirectUrl?: string;
  className?: string;
  onSubmitSuccess?: (formData: any) => void;
}
```

### Default Props

- `title`: "Request Your Free Estimate"
- `subtitle`: "Fill out the form below and a Window World representative will contact you shortly."
- `showProductSelection`: true
- `redirectUrl`: undefined (stays on same page after submission)
- `className`: undefined
- `onSubmitSuccess`: undefined (no callback function)

### State Management

The component uses React's useState and useEffect hooks to manage:

- `formData`: Stores all form field values
- `errors`: Tracks validation errors for each field
- `isSubmitting`: Indicates form submission in progress
- `isSubmitted`: Indicates successful form submission
- `submitError`: Stores any error message from failed submission

### Form Fields

1. **Personal Information**:
   - First Name (required)
   - Last Name (required)
   - Email Address (required)
   - Phone Number (required)
   - Address (optional)
   - City (optional)
   - State (optional)
   - Zip Code (optional)

2. **Project Information**:
   - Products of Interest (checkboxes)
   - Project Timeline (dropdown)
   - Additional Comments (textarea)

### Key Features

1. **Form Validation**: Client-side validation for required fields
2. **Error Handling**: Clear error messages for invalid inputs
3. **Loading State**: Visual feedback during form submission
4. **Success Feedback**: Confirmation message after successful submission
5. **Product Selection**: Customizable product options
6. **Responsive Design**: Adapts to different screen sizes

## Usage Example

```tsx
import { FreeEstimateForm } from '@/components/ui/FreeEstimateForm';

// Basic usage with default props
<FreeEstimateForm />

// With custom title and subtitle
<FreeEstimateForm
  title="Get Your Free Window Estimate Today"
  subtitle="Our experts will help you find the perfect windows for your home"
/>

// Without product selection
<FreeEstimateForm
  showProductSelection={false}
/>

// With redirect after submission
<FreeEstimateForm
  redirectUrl="/thank-you"
/>

// With submission callback
<FreeEstimateForm
  onSubmitSuccess={(data) => {
    console.log('Form submitted:', data);
    // Trigger analytics event, etc.
  }}
/>

// With additional CSS classes
<FreeEstimateForm
  className="custom-form-class"
/>
```

## Form Submission

The form submits data to the Window World API endpoint:

```
/api/submit-estimate-request
```

The API endpoint processes the form data and:
1. Validates the submission
2. Stores the request in the database
3. Sends notification emails to the customer and Window World staff
4. Returns a success or error response

## Styling

The component uses Tailwind CSS for styling, with the following key classes:

- `bg-white`: White background for the form
- `rounded-lg`: Rounded corners
- `shadow-md`: Medium shadow for depth
- `p-6 md:p-8`: Responsive padding
- `grid grid-cols-1 md:grid-cols-2 gap-4`: Responsive grid layout for form fields

## Accessibility Features

- Proper label associations for all form fields
- Error messages linked to corresponding fields
- Keyboard navigation support
- Required field indicators
- Focus management during form submission

## Related Components

- [Container](./Container.md): Used to contain the form
- [Button](./Button.md): Used for the submission button
- [FormInput](./FormInput.md): Used for text input fields
- [FormSelect](./FormSelect.md): Used for dropdown fields
- [FormCheckbox](./FormCheckbox.md): Used for checkbox fields

## Testing

The FreeEstimateForm component can be tested at:

```
/testing/ui/free-estimate-form
```

This test page displays the FreeEstimateForm component and provides instructions for testing its various features and validation.
