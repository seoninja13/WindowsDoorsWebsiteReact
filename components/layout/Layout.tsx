import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Metadata } from 'next';

interface LayoutProps {
  children: ReactNode;
  metadata?: Metadata;
}

/**
 * Main layout component that wraps all pages
 * Includes the header and footer components
 */
const Layout: React.FC<LayoutProps> = ({ children, metadata }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
