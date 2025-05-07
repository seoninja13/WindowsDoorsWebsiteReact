import React from 'react';
import Link from 'next/link';

interface ProductBlockProps {
  title: string;
  content: string;
  imageUrl: string;
  linkUrl: string;
  target?: string;
  backgroundPosition?: string;
}

interface SmallBlockProps {
  title: string;
  icon: React.ReactNode;
  linkUrl: string;
  linkText?: string;
  target?: string;
}

export const ProductGrid: React.FC<{
  largeBlocks: ProductBlockProps[];
  smallBlocks: SmallBlockProps[];
  columns?: 2 | 3 | 4;
}> = ({ 
  largeBlocks, 
  smallBlocks,
  columns = 4
}) => {
  return (
    <section className="block-product-grid">
      <div className={`large-blocks even-columns columns-${columns}`}>
        {largeBlocks.map((block, index) => (
          <Link 
            key={index}
            className="block lazyload" 
            href={block.linkUrl} 
            target={block.target || ''}
            data-expand="100" 
            data-bgset={block.imageUrl}
            style={{ backgroundPosition: block.backgroundPosition || '50% 50%' }}
          >
            <div className="overlay">
              <h2 className="title">{block.title}</h2>
              <div className="content">{block.content}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="small-blocks">
        {smallBlocks.map((block, index) => (
          <Link 
            key={index}
            className="block" 
            href={block.linkUrl} 
            target={block.target || ''}
          >
            <div className="icon">{block.icon}</div>
            <div className="title">{block.title}</div>
            <div className="link">
              {block.linkText || 'Learn More'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.09 32">
                <polygon points="0 27.91 4.09 32 20.09 16 16 11.91 4.09 0 0 4.09 11.91 16 0 27.91" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
