'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'ww';
  padding?: boolean;
}

/**
 * Container component that provides consistent width and padding
 * Matches Window World LA's container styling
 */
const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = 'div',
  maxWidth = 'ww',
  padding = true,
  ...props
}) => {
  // Map maxWidth to Tailwind classes
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
    ww: 'max-w-ww-container', // Custom Window World container width
  };

  return (
    <Component
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Container };
