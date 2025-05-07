import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function UIComponentsTestPage() {
  // Define the UI component test pages
  const componentTests = [
    {
      id: 'header',
      title: 'Header Component',
      description: 'Test the site header with navigation',
      path: '/testing/ui/header',
    },
    {
      id: 'button',
      title: 'Button Component',
      description: 'Test button variants and states',
      path: '#button-section',
    },
    // Add more component tests as they are created
  ];

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">UI Components</h1>

        {/* Component Test Links */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {componentTests.map((test) => (
            <Link
              key={test.id}
              href={test.path}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-primary">{test.title}</h3>
                <p className="text-sm text-gray-600">{test.description}</p>
              </div>
              <div className="bg-primary-50 px-4 py-2 text-right">
                <span className="text-primary text-sm font-medium">View Component &rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-16">
          {/* Button Component */}
          <section id="button-section">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Button Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  The Button component is used throughout the site for calls to action. It supports different variants and sizes.
                </p>

                <h3 className="text-lg font-medium mb-4">Button Variants</h3>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>

                <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
                <div className="flex flex-wrap gap-4 mb-8 items-center">
                  <Button variant="primary" size="sm">Small Button</Button>
                  <Button variant="primary" size="md">Medium Button</Button>
                  <Button variant="primary" size="lg">Large Button</Button>
                </div>

                <h3 className="text-lg font-medium mb-4">Button with Icon</h3>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button variant="primary">
                    <span className="mr-2">&#x2709;</span> Email Us
                  </Button>
                  <Button variant="secondary">
                    <span className="mr-2">&#x260E;</span> Call Now
                  </Button>
                  <Button variant="outline">
                    View Products <span className="ml-2">&#x2192;</span>
                  </Button>
                </div>

                <h3 className="text-lg font-medium mb-4">Full Width Button</h3>
                <div className="mb-8">
                  <Button variant="primary" className="w-full">Full Width Button</Button>
                </div>

                <h3 className="text-lg font-medium mb-4">Disabled Button</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" disabled>Disabled Primary</Button>
                  <Button variant="secondary" disabled>Disabled Secondary</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b">
                <h3 className="text-lg font-medium">Component Properties</h3>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                  {`interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* More UI component sections will be added here */}
          <div className="text-center py-8">
            <p className="text-gray-500">More UI component tests will be added soon.</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
