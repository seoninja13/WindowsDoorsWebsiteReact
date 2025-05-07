import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Component Testing | Windows Doors Website',
  description: 'Testing page for UI components',
};

export default function TestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/testing" className="text-xl font-bold">
              Component Testing
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li className="group relative">
                  <span className="hover:underline cursor-pointer">Components</span>
                  <ul className="absolute hidden group-hover:block bg-white shadow-md rounded mt-1 py-2 w-40 z-10">
                    <li>
                      <Link href="/testing/home" className="block px-4 py-2 hover:bg-primary-50">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/testing/products" className="block px-4 py-2 hover:bg-primary-50">
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/testing/about" className="block px-4 py-2 hover:bg-primary-50">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/testing/contact" className="block px-4 py-2 hover:bg-primary-50">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/testing/ui" className="block px-4 py-2 hover:bg-primary-50">
                        UI
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="group relative">
                  <span className="hover:underline cursor-pointer">Pages</span>
                  <ul className="absolute hidden group-hover:block bg-white shadow-md rounded mt-1 py-2 w-40 z-10">
                    <li>
                      <Link href="/testing/pages" className="block px-4 py-2 hover:bg-primary-50">
                        All Pages
                      </Link>
                    </li>
                    <li>
                      <Link href="/testing/pages/home" className="block px-4 py-2 hover:bg-primary-50">
                        Home Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/testing/pages/products" className="block px-4 py-2 hover:bg-primary-50">
                        Products Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/testing/pages/about" className="block px-4 py-2 hover:bg-primary-50">
                        About Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/testing/pages/contact" className="block px-4 py-2 hover:bg-primary-50">
                        Contact Page
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <Link href="/" className="text-sm hover:underline">
              Back to Site
            </Link>
          </div>
        </Container>
      </header>
      <main className="py-8">
        {children}
      </main>
      <footer className="bg-gray-100 py-4 border-t">
        <Container>
          <div className="text-center text-gray-600 text-sm">
            <p>Windows Doors Website React - Component Testing</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
