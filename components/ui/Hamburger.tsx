"use client";

import React from 'react';

interface HamburgerProps {
  onClick: () => void;
  phoneNumber: string;
}

export const Hamburger: React.FC<HamburgerProps> = ({
  onClick,
  phoneNumber
}) => {
  return (
    <div className="hamburger">
      <a href={`tel:${phoneNumber}`}>
        <div className="hamburger-phone">
          <div className="phone">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M30.9,28.27a3.44,3.44,0,0,0,1-3.47,3.26,3.26,0,0,0-2.24-2.57,38.08,38.08,0,0,0-5.36-1.44,2.88,2.88,0,0,0-.72,0,3,3,0,0,0-1.52.76c-.78.63-1.54,1.29-2.31,1.94a1.16,1.16,0,0,1-1.39.25c-.27-.15-.55-.3-.81-.46a32.53,32.53,0,0,1-5-3.76,32.53,32.53,0,0,1-3.76-5c-.16-.26-.31-.54-.46-.81a1.16,1.16,0,0,1,.25-1.39c.65-.77,1.31-1.53,1.94-2.31a3,3,0,0,0,.76-1.52,2.88,2.88,0,0,0,0-.72A38.08,38.08,0,0,0,9.77,2.36,3.26,3.26,0,0,0,7.2.12a3.44,3.44,0,0,0-3.47,1C3.12,1.71,2.48,2.31,1.91,3A7.87,7.87,0,0,0,.11,6L0,7.36C0,8,.05,8.59.1,9.2A21.53,21.53,0,0,0,3.58,19.54a37.77,37.77,0,0,0,3,4.12c.28.31.57.62.87.92s.61.59.92.87a37.77,37.77,0,0,0,4.12,3A21.53,21.53,0,0,0,22.8,31.9c.61.05,1.23.07,1.84.1L26,31.89a7.87,7.87,0,0,0,3-1.8C29.69,29.52,30.29,28.88,30.9,28.27Z" />
            </svg>
          </div>
        </div>
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 13"
        onClick={onClick}
      >
        <rect className="top" width="26" height="3" />
        <rect className="bottom" y="10" width="26" height="3" />
      </svg>
    </div>
  );
};
