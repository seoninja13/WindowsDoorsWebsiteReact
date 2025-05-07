import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function PagesTestingIndexPage() {
  // Define the test pages
  const testPages = [
    {
      id: 'complete-home',
      title: 'Complete Home Page',
      description: 'Test the fully integrated home page with all components',
      path: '/testing/pages/complete-home',
    },
    {
      id: 'home',
      title: 'Home Page',
      description: 'Test the complete home page',
      path: '/testing/pages/home',
    },
    {
      id: 'products',
      title: 'Products Page',
      description: 'Test the complete products page',
      path: '/testing/pages/products',
    },
    {
      id: 'about',
      title: 'About Page',
      description: 'Test the complete about page',
      path: '/testing/pages/about',
    },
    {
      id: 'contact',
      title: 'Contact Page',
      description: 'Test the complete contact page',
      path: '/testing/pages/contact',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-primary">Complete Page Testing</h1>

          <p className="text-lg mb-8 text-center text-gray-700">
            Select a page to view and test the complete page layout and functionality.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {testPages.map((page) => (
              <Link
                key={page.id}
                href={page.path}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-primary">{page.title}</h2>
                  <p className="text-gray-600">{page.description}</p>
                </div>
                <div className="bg-primary-50 px-6 py-3 text-right">
                  <span className="text-primary font-medium">View Page &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
