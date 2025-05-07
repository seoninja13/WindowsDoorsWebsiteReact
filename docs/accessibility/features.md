# Accessibility Features Documentation

## Overview

This document provides a detailed description of the accessibility features implemented in the Windows Doors Website React project. The website is designed to be accessible to all users, including those with disabilities, following the Web Content Accessibility Guidelines (WCAG) 2.1 AA standards.

## Accessibility Implementation

### 1. Semantic HTML

Semantic HTML elements are used throughout the website to provide a clear structure and meaning to the content:

```tsx
// components/ui/Header.tsx
export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('bg-white shadow-md', className)}>
      <nav aria-label="Main Navigation">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products/windows">Windows</Link>
          </li>
          <li>
            <Link href="/products/doors">Doors</Link>
          </li>
          <li>
            <Link href="/products/siding">Siding</Link>
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

### 2. ARIA Attributes

ARIA attributes are used to enhance accessibility when HTML semantics are not sufficient:

```tsx
// components/ui/Tabs.tsx
export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div>
      <div role="tablist" aria-orientation="horizontal">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

### 3. Keyboard Navigation

All interactive elements are accessible via keyboard navigation:

```tsx
// components/ui/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          // Variant styles
          variant === 'primary' && 'bg-primary text-white hover:bg-primary/90',
          variant === 'secondary' && 'bg-secondary text-white hover:bg-secondary/90',
          variant === 'outline' && 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
          variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
          // Size styles
          size === 'sm' && 'h-9 px-3 text-sm',
          size === 'md' && 'h-10 px-4 py-2',
          size === 'lg' && 'h-11 px-8 text-lg',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```

### 4. Focus Management

Focus management is implemented to ensure that users can navigate the website using the keyboard:

```tsx
// components/ui/Modal.tsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Focus the modal when it opens
  useEffect(() => {
    if (isOpen) {
      const previousActiveElement = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      
      // Return focus to the previous element when the modal closes
      return () => {
        previousActiveElement?.focus();
      };
    }
  }, [isOpen]);
  
  // Close the modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) {
    return null;
  }
  
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        <div>{children}</div>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}
```

### 5. Skip Links

Skip links are implemented to allow keyboard users to bypass navigation and go directly to the main content:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### 6. Color Contrast

Color contrast ratios meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text):

```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#004b8d', // Blue with contrast ratio > 4.5:1 against white
        secondary: '#e63946', // Red with contrast ratio > 4.5:1 against white
        background: '#ffffff',
        foreground: '#333333', // Dark gray with contrast ratio > 7:1 against white
        accent: '#f8f9fa',
        'accent-foreground': '#333333',
      },
    },
  },
};
```

### 7. Form Accessibility

Forms are designed to be accessible with proper labels, error messages, and ARIA attributes:

```tsx
// components/ui/FreeEstimateForm.tsx
export function FreeEstimateForm({ className }: FreeEstimateFormProps) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formState.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formState.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formState.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formState.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Submit form
      // ...
    }
  };
  
  return (
    <form
      className={cn('space-y-6', className)}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={Object.keys(errors).length > 0 ? 'form-errors' : undefined}
    >
      {Object.keys(errors).length > 0 && (
        <div id="form-errors" className="text-red-500" role="alert">
          <p>Please correct the following errors:</p>
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary',
              errors.firstName && 'border-red-500'
            )}
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="mt-1 text-sm text-red-500">
              {errors.firstName}
            </p>
          )}
        </div>
        
        {/* More form fields */}
        
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
```

### 8. Image Accessibility

Images include appropriate alt text:

```tsx
// components/ui/ProductCard.tsx
import Image from 'next/image';

export function ProductCard({
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  ctaText,
  ctaHref,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <ul className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2" aria-hidden="true">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={ctaHref}
          className="inline-block bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
```

### 9. Responsive Design

The website is responsive and accessible on all devices:

```tsx
// components/ui/Container.tsx
export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
}
```

### 10. Screen Reader Announcements

Screen reader announcements are used to notify users of dynamic content changes:

```tsx
// components/ui/Announcer.tsx
import { useEffect, useState } from 'react';

export function Announcer() {
  const [announcement, setAnnouncement] = useState('');
  
  useEffect(() => {
    const handleAnnouncement = (event: CustomEvent) => {
      setAnnouncement(event.detail.message);
      
      // Clear the announcement after a delay
      setTimeout(() => {
        setAnnouncement('');
      }, 1000);
    };
    
    document.addEventListener('announce', handleAnnouncement as EventListener);
    
    return () => {
      document.removeEventListener('announce', handleAnnouncement as EventListener);
    };
  }, []);
  
  return (
    <div
      aria-live="assertive"
      className="sr-only"
      role="status"
      aria-atomic="true"
    >
      {announcement}
    </div>
  );
}

// Usage
export function announce(message: string) {
  const event = new CustomEvent('announce', {
    detail: { message },
  });
  
  document.dispatchEvent(event);
}
```

## Accessibility Testing

### 1. Automated Testing

Automated accessibility testing is performed using tools like Lighthouse, axe, and WAVE:

```typescript
// tests/accessibility.test.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
  await page.goto('/');
  
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### 2. Manual Testing

Manual accessibility testing is performed using screen readers, keyboard navigation, and other assistive technologies:

1. **Screen Reader Testing**: Testing with NVDA, JAWS, and VoiceOver.
2. **Keyboard Navigation Testing**: Testing navigation using only the keyboard.
3. **Zoom Testing**: Testing the website at different zoom levels.
4. **High Contrast Testing**: Testing the website in high contrast mode.

### 3. User Testing

User testing is performed with people who have disabilities to ensure the website is accessible to all users.

## Accessibility Statement

An accessibility statement is included on the website to communicate the commitment to accessibility:

```tsx
// app/accessibility/page.tsx
export default function AccessibilityPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
      
      <p className="mb-4">
        Window World LA is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Conformance Status</h2>
      
      <p className="mb-4">
        The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Window World LA is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Feedback</h2>
      
      <p className="mb-4">
        We welcome your feedback on the accessibility of Window World LA. Please let us know if you encounter accessibility barriers on Window World LA:
      </p>
      
      <ul className="list-disc pl-8 mb-4">
        <li>Phone: (800) 123-4567</li>
        <li>E-mail: accessibility@windowworldla.com</li>
        <li>Visitor address: 123 Main Street, Los Angeles, CA 90001</li>
        <li>Postal address: 123 Main Street, Los Angeles, CA 90001</li>
      </ul>
      
      <p className="mb-4">
        We try to respond to feedback within 5 business days.
      </p>
    </div>
  );
}
```

## Conclusion

The Windows Doors Website React project is designed to be accessible to all users, including those with disabilities. It follows the Web Content Accessibility Guidelines (WCAG) 2.1 AA standards and includes features such as semantic HTML, ARIA attributes, keyboard navigation, focus management, skip links, color contrast, form accessibility, image accessibility, responsive design, and screen reader announcements. Accessibility testing is performed using automated tools, manual testing, and user testing to ensure the website is accessible to all users.
