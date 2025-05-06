import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Montserrat, Open_Sans } from 'next/font/google';

// Load fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Window World LA - Replacement Windows & Doors',
  description: 'Window World of Louisiana offers high-quality replacement windows, doors, and siding at affordable prices. Free in-home estimates available.',
  keywords: 'window replacement, door replacement, vinyl siding, energy efficient windows, Los Angeles windows, Southern California windows',
  authors: [{ name: 'Window World LA' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.windowworldla.com/',
    title: 'Window World LA - Replacement Windows & Doors',
    description: 'Window World of Louisiana offers high-quality replacement windows, doors, and siding at affordable prices. Free in-home estimates available.',
    siteName: 'Window World LA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="font-open-sans text-ww-dark-gray">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
