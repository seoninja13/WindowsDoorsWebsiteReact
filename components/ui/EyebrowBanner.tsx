import React from 'react';
import Link from 'next/link';

interface EyebrowLink {
  id: string;
  text: string;
  url: string;
  isContact?: boolean;
}

interface EyebrowBannerProps {
  links?: EyebrowLink[];
}

const defaultLinks: EyebrowLink[] = [
  { id: 'reviews', text: 'Reviews', url: '/about/reviews/' },
  { id: 'financing', text: 'Financing', url: '/financing/' },
  { id: 'service-areas', text: 'Service Areas', url: '/service-areas/' },
  { id: 'contact', text: 'Contact', url: '/contact/', isContact: true }
];

export const EyebrowBanner: React.FC<EyebrowBannerProps> = ({
  links = defaultLinks
}) => {
  return (
    <div className="eyebrow-banner">
      <div className="wrapper">
        <ul className="menu">
          {links.map((link) => (
            <li 
              key={link.id} 
              className={`menu-item ${link.isContact ? 'contact-headset' : ''}`}
            >
              <Link href={link.url}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
