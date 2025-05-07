import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function TestingIndexPage() {
  // Define the component test pages
  const componentTestPages = [
    {
      id: 'home',
      title: 'Home Page Components',
      description: 'Test components used on the home page',
      path: '/testing/home',
    },
    {
      id: 'products',
      title: 'Product Page Components',
      description: 'Test components used on product pages',
      path: '/testing/products',
    },
    {
      id: 'about',
      title: 'About Page Components',
      description: 'Test components used on the about page',
      path: '/testing/about',
    },
    {
      id: 'contact',
      title: 'Contact Page Components',
      description: 'Test components used on the contact page',
      path: '/testing/contact',
    },
    {
      id: 'ui',
      title: 'UI Components',
      description: 'Test basic UI components like buttons, inputs, etc.',
      path: '/testing/ui',
    },
  ];

  // Define the complete page test pages
  const pageTestPages = [
    {
      id: 'complete-home-page',
      title: 'Complete Home Page (New)',
      description: 'Test the fully integrated home page with all components',
      path: '/testing/pages/complete-home',
      highlight: true,
    },
    {
      id: 'home-page',
      title: 'Home Page (Basic)',
      description: 'Test the basic home page structure',
      path: '/testing/pages/home',
    },
    {
      id: 'products-page',
      title: 'Complete Products Page',
      description: 'Test the complete products page with all components integrated',
      path: '/testing/pages/products',
    },
    {
      id: 'about-page',
      title: 'Complete About Page',
      description: 'Test the complete about page with all components integrated',
      path: '/testing/pages/about',
    },
    {
      id: 'contact-page',
      title: 'Complete Contact Page',
      description: 'Test the complete contact page with all components integrated',
      path: '/testing/pages/contact',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-primary">Component Testing</h1>

          <p className="text-lg mb-8 text-center text-gray-700">
            Select a test page to view and test components used in different sections of the website.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-primary">Component Testing</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {componentTestPages.map((page) => (
              <Link
                key={page.id}
                href={page.path}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{page.title}</h3>
                  <p className="text-gray-600">{page.description}</p>
                </div>
                <div className="bg-primary-50 px-6 py-3 text-right">
                  <span className="text-primary font-medium">View Components &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6 text-primary">Complete Page Testing</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pageTestPages.map((page) => (
              <Link
                key={page.id}
                href={page.path}
                className={`block rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden ${
                  page.highlight ? 'bg-primary-50 border-2 border-primary' : 'bg-white'
                }`}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {page.title}
                    {page.highlight && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New
                      </span>
                    )}
                  </h3>
                  <p className={`${page.highlight ? 'text-gray-700' : 'text-gray-600'}`}>{page.description}</p>
                </div>
                <div className={`px-6 py-3 text-right ${page.highlight ? 'bg-primary-100' : 'bg-primary-50'}`}>
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
