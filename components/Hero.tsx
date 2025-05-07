import React from 'react';
import { EstimateForm } from './ui/EstimateForm';

interface HeroProps {
  backgroundImages: {
    src: string;
    position?: string;
    mobileSrc?: string;
  }[];
  formTitle: string;
  formSubtitle: string;
  formId?: string;
  formImage?: string;
  overlayType?: 'black' | 'blue' | 'none';
}

export const Hero: React.FC<HeroProps> = ({
  backgroundImages,
  formTitle,
  formSubtitle,
  formId = 'header',
  formImage = '/images/form/window-world-family.png',
  overlayType = 'black'
}) => {
  return (
    <section className={`hero form-center overlay-${overlayType}`} data-anchor-link="top">
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className="image lazyload" 
          data-bgset={`${image.mobileSrc || image.src} [(max-width: 800px)] | ${image.src}`} 
          style={{ backgroundPosition: image.position || '50% 50%' }}
        ></div>
      ))}
      
      <EstimateForm 
        title={formTitle}
        subtitle={formSubtitle}
        formId={formId}
        bottomImage={formImage}
      />
    </section>
  );
};
