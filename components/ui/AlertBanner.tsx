import React from 'react';
import Link from 'next/link';

interface AlertBannerProps {
  text: string;
  linkText?: string;
  linkUrl?: string;
  color?: 'blue' | 'red' | 'green';
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  text,
  linkText,
  linkUrl,
  color = 'blue'
}) => {
  return (
    <div className={`alert-banner ${color}`}>
      <div className="wrapper">
        <div className="content">
          {text}
          {linkText && linkUrl && (
            <Link href={linkUrl} className="link" target="">
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
