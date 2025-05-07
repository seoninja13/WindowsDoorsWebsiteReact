import { Container } from '@/components/ui/Container';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { ProductCard } from '@/components/ui/ProductCard';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { ProductFeatures } from '@/components/ui/ProductFeatures';
import { ServiceAreas } from '@/components/ui/ServiceAreas';
import { FreeEstimateForm } from '@/components/ui/FreeEstimateForm';
import { fetchUnsplashImages } from '@/lib/utils/context7';
import { getHeroBannerData, getFeaturedProducts, getTestimonials, getProductFeatures, getServiceAreas } from '@/lib/services/home-service';

export default async function HomeComponentsTestPage() {
  // Fetch data for the home page components
  const heroSlides = await getHeroBannerData();
  const featuredProducts = await getFeaturedProducts();
  const testimonials = await getTestimonials();
  const productFeatures = await getProductFeatures();
  const serviceAreas = await getServiceAreas();

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">Home Page Components</h1>

        <div className="space-y-16">
          {/* Hero Banner Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Hero Banner Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  The hero banner component displays a slider with multiple slides, each containing an image, title, subtitle, and call-to-action buttons.
                </p>
                <div className="-mx-6 -mb-6">
                  <HeroBanner slides={heroSlides} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b">
                <h3 className="text-lg font-medium">Component Properties</h3>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                  {`interface HeroBannerProps {
  slides: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
  }[];
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Product Card Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Product Card Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  The Product Card component displays information about a product, including an image, title, description, features, and a call-to-action button.
                </p>
                <div className="max-w-md mx-auto">
                  <ProductCard {...featuredProducts[0]} />
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

          {/* Product Features Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Product Features Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  The Product Features component displays a section highlighting key features of products with icons, titles, and descriptions.
                </p>
                <ProductFeatures {...productFeatures} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b">
                <h3 className="text-lg font-medium">Component Properties</h3>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                  {`interface ProductFeaturesProps {
  title: string;
  description: string;
  features: {
    id: number;
    title: string;
    description: string;
    icon: string;
  }[];
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Testimonial Section Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Testimonial Section Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  The Testimonial Section component displays customer testimonials with quotes, author information, and ratings.
                </p>
                <div className="-mx-6">
                  <TestimonialSection testimonials={testimonials} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b">
                <h3 className="text-lg font-medium">Component Properties</h3>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                  {`interface TestimonialSectionProps {
  testimonials: {
    id: number;
    quote: string;
    author: string;
    location: string;
    rating: number;
    imageSrc?: string;
  }[];
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Service Areas Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Service Areas Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  The Service Areas component displays the areas served by the company, organized by county with tabs and city lists.
                </p>
                <ServiceAreas {...serviceAreas} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b">
                <h3 className="text-lg font-medium">Component Properties</h3>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                  {`interface ServiceAreasProps {
  counties: {
    id: number;
    name: string;
    active: boolean;
  }[];
  cities: {
    id: number;
    name: string;
    countyId: number;
  }[];
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Free Estimate Form Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Free Estimate Form Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  The Free Estimate Form component allows users to request a free estimate by filling out a form with their contact information and project details.
                </p>
                <div className="max-w-2xl mx-auto">
                  <FreeEstimateForm />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b">
                <h3 className="text-lg font-medium">Component Properties</h3>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                  {`interface FreeEstimateFormProps {
  // This component doesn't take any props currently
}`}
                </pre>
              </div>
            </div>
          </section>

          <div className="text-center py-8">
            <p className="text-gray-500">
              To view the complete home page with all components integrated, visit the <a href="/testing/pages/home" className="text-primary hover:underline">Home Page Test</a>.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
