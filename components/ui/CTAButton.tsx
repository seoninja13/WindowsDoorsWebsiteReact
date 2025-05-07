import React from 'react';
import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  href: string;
  target?: string;
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  href,
  target = '',
  eventCategory = 'Request Free Estimate CTA',
  eventAction = 'Click',
  eventLabel = 'Header',
  className = 'header-cta-button btn js-track-event'
}) => {
  return (
    <Link
      className={className}
      href={href}
      target={target}
      data-event-category={eventCategory}
      data-event-action={eventAction}
      data-event-label={eventLabel}
    >
      {text}
    </Link>
  );
};
