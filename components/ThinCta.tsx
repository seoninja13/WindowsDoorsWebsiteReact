import React from 'react';
import Link from 'next/link';

interface ThinCtaProps {
  title: string;
  buttonText: string;
  buttonUrl: string;
  backgroundImage: string;
  mobileBackgroundImage?: string;
  backgroundPosition?: string;
  anchorLink?: string;
  buttonTarget?: string;
}

export const ThinCta: React.FC<ThinCtaProps> = ({
  title,
  buttonText,
  buttonUrl,
  backgroundImage,
  mobileBackgroundImage,
  backgroundPosition = '50% 50%',
  anchorLink = '',
  buttonTarget = ''
}) => {
  return (
    <section 
      id="" 
      className="block-thin-cta image default lazyload" 
      data-bgset={`${mobileBackgroundImage || backgroundImage} [(max-width: 800px)] | ${backgroundImage}`} 
      data-expand="100" 
      style={{ backgroundPosition }} 
      data-anchor-link={anchorLink}
    >
      <div className="wrapper">
        <div className="block">
          <h2>{title}</h2>
          <Link className="btn" href={buttonUrl} target={buttonTarget}>
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};
