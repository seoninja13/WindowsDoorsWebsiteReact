'use client';

import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles that apply to all button variants
  'inline-flex items-center justify-center font-montserrat font-medium rounded-ww transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      // Different visual variants
      variant: {
        primary: 'bg-ww-blue text-white hover:bg-ww-dark-blue focus:ring-ww-blue',
        secondary: 'bg-ww-red text-white hover:bg-[#c31530] focus:ring-ww-red',
        outline: 'border-2 border-ww-blue text-ww-blue hover:bg-ww-blue hover:text-white focus:ring-ww-blue',
        white: 'bg-white text-ww-blue hover:bg-ww-light-gray focus:ring-white',
        ghost: 'bg-transparent hover:bg-ww-light-gray text-ww-blue hover:text-ww-dark-blue',
      },
      // Different size variants
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
      // Full width option
      fullWidth: {
        true: 'w-full',
      },
    },
    // Default variants
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// Define the props for our Button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Button component that matches Window World LA's design system
 * Can be rendered as a button or a link based on the presence of href prop
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      href,
      children,
      loading = false,
      disabled,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    // If loading or disabled, override the disabled prop
    const isDisabled = loading || disabled;

    // If href is provided, render as a Link
    if (href) {
      return (
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant, size, fullWidth, className }),
            isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {icon && iconPosition === 'left' && !loading && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </Link>
      );
    }

    // Otherwise render as a button
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          isDisabled && 'opacity-50 cursor-not-allowed'
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && iconPosition === 'left' && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
