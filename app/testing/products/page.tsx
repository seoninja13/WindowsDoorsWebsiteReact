import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/ui/ProductCard';
import { fetchUnsplashImages } from '@/lib/utils/context7';

export default async function ProductsComponentsTestPage() {
  // Fetch images for testing
  const productImages = await fetchUnsplashImages('window styles in modern home', 3);
  
  // Product card data
  const productCardData = {
    id: 1,
    title: 'Replacement Windows',
    description: 'Energy-efficient windows in a variety of styles to complement any home.',
    imageSrc: productImages[0] || '/api/placeholder?width=800&height=600&text=Replacement%20Windows&bgColor=004b8d',
    imageAlt: 'Modern replacement windows',
    features: ['Energy Efficient', 'Multiple Styles', 'Custom Sizes', 'Lifetime Warranty'],
    ctaText: 'Explore Windows',
    ctaHref: '/products/windows',
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">Product Page Components</h1>
        
        <div className="space-y-16">
          {/* Product Card Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Product Card Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  The Product Card component displays information about a product, including an image, title, description, features, and a call-to-action button.
                </p>
                <div className="max-w-md mx-auto">
                  <ProductCard {...productCardData} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b">
                <h3 className="text-lg font-medium">Component Properties</h3>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                  {`interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features?: string[];
  ctaText: string;
  ctaHref: string;
}`}
                </pre>
              </div>
            </div>
          </section>
          
          {/* More component sections will be added here */}
          <div className="text-center py-8">
            <p className="text-gray-500">More product component tests will be added soon.</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
