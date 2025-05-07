import React from 'react';

interface WysiwygBlockProps {
  content: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  anchorLink?: string;
}

export const WysiwygBlock: React.FC<WysiwygBlockProps> = ({
  content,
  size = 'medium',
  anchorLink = ''
}) => {
  return (
    <section id="" className={`block-wysiwyg ${size}`} data-anchor-link={anchorLink}>
      {content}
    </section>
  );
};
