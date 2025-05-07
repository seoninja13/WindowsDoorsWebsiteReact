"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface SubMenuItem {
  id: string;
  text: string;
  url: string;
  icon?: React.ReactNode;
}

interface MenuItem {
  id: string;
  text: string;
  url: string;
  subMenuItems?: SubMenuItem[];
  hasChildren?: boolean;
  className?: string;
}

interface MainNavigationProps {
  menuItems: MenuItem[];
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  menuItems
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (id: string) => {
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  return (
    <div className="main-menu">
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`${item.className || ''} ${item.hasChildren ? 'menu-item-has-children' : ''}`}
          >
            <Link href={item.url}>
              {item.text}
              {item.hasChildren && (
                <div
                  className="dropdown"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(item.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 20.69">
                    <polygon points="16 20.69 0 4.69 4.69 0 16 11.31 27.31 0 32 4.69 16 20.69" />
                  </svg>
                </div>
              )}
            </Link>
            {item.hasChildren && item.subMenuItems && (
              <div className={`sub-menu-wrap ${activeSubmenu === item.id ? 'open' : ''}`}>
                <ul className="sub-menu">
                  {item.subMenuItems.map((subItem) => (
                    <li key={subItem.id}>
                      <Link href={subItem.url}>
                        {subItem.text}
                        {subItem.icon && <div className="icon">{subItem.icon}</div>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
