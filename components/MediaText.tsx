import React from 'react';
import Link from 'next/link';

interface MediaTextProps {
  content: React.ReactNode;
  imageUrl: string;
  mobileImageUrl?: string;
  mediaOnLeft?: boolean;
  backgroundColor?: 'white' | 'blue' | 'gray';
  anchorLink?: string;
  mediaSize?: 'half' | 'full';
  mediaPosition?: string;
  hasPagination?: boolean;
}

export const MediaText: React.FC<MediaTextProps> = ({
  content,
  imageUrl,
  mobileImageUrl,
  mediaOnLeft = true,
  backgroundColor = 'white',
  anchorLink = '',
  mediaSize = 'half',
  mediaPosition = '50% 50%',
  hasPagination = true
}) => {
  return (
    <section 
      id="" 
      className={`block-media-text ${backgroundColor}  `} 
      data-anchor-link={anchorLink}
    >
      <div className={`wrapper media-on-${mediaOnLeft ? 'left' : 'right'} `}>
        <div className={`media ${mediaSize} full  ${hasPagination ? 'pagination-bars' : ''}`}>
          <div className="image-container">
            <div 
              className="image lazyload" 
              data-expand="100" 
              data-bgset={`${mobileImageUrl || imageUrl} [(max-width: 800px)] | ${imageUrl}`}
              style={{ backgroundPosition: mediaPosition }}
            ></div>
          </div>
        </div>
        <div className="content">
          {content}
        </div>
      </div>
    </section>
  );
};
