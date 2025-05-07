import React from 'react';
import { Header } from '@/components/ui/Header';
import { Container } from '@/components/ui/Container';

export default function HeaderTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Test the Header component */}
      <Header />
      
      <Container className="py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-ww-blue">Header Component Test</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              This page demonstrates the Header component that exactly matches the Window World LA website header.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Features</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Alert banner with promotional message</li>
              <li>Eyebrow navigation with quick links</li>
              <li>Main navigation with dropdown menus</li>
              <li>Responsive design with mobile menu</li>
              <li>Phone number and location information</li>
              <li>Call-to-action button for free estimates</li>
              <li>Shadow effect on scroll</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Implementation Details</h2>
            <p className="mb-4">
              The Header component is implemented using:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>React with TypeScript</li>
              <li>Tailwind CSS for styling</li>
              <li>Next.js Image component for optimized images</li>
              <li>React hooks for state management</li>
              <li>Responsive design with mobile-first approach</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Testing Instructions</h2>
            <p className="mb-4">
              To test the Header component:
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li>Verify that the alert banner and eyebrow navigation are displayed correctly</li>
              <li>Hover over navigation items to see dropdown menus</li>
              <li>Resize the browser window to see responsive behavior</li>
              <li>Click the mobile menu button on small screens</li>
              <li>Test dropdown functionality in the mobile menu</li>
              <li>Scroll down to see the shadow effect</li>
              <li>Verify that all links are working correctly</li>
            </ol>
          </div>
        </div>
      </Container>
    </div>
  );
}
