import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { ProductCard } from '@/components/ui/ProductCard';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { ProductFeatures } from '@/components/ui/ProductFeatures';
import { ServiceAreas } from '@/components/ui/ServiceAreas';
import { FreeEstimateForm } from '@/components/ui/FreeEstimateForm';
import { fetchUnsplashImages } from '@/lib/utils/context7';

export default async function ComponentTestingPage() {
  // Fetch images for testing
  const heroImages = await fetchUnsplashImages('modern home exterior with large windows', 3);
  const productImage = await fetchUnsplashImages('window styles in modern home', 1);
  const testimonialImages = await fetchUnsplashImages('happy homeowner family', 3);
  const serviceAreaImages = await fetchUnsplashImages('neighborhood homes', 4);

  // Hero banner slides data
  const heroSlides = [
    {
      id: 1,
      imageSrc: heroImages[0] || '/api/placeholder?width=1920&height=600&text=Modern%20Home%20with%20Beautiful%20Windows',
      imageAlt: 'Modern home with beautiful windows',
      title: 'Transform Your Home with Premium Windows & Doors',
      subtitle: 'Energy-efficient solutions for every style and budget',
      primaryButtonText: 'Free Estimate',
      primaryButtonHref: '/free-estimate',
      secondaryButtonText: 'View Products',
      secondaryButtonHref: '/products',
    },
    {
      id: 2,
      imageSrc: heroImages[1] || '/api/placeholder?width=1920&height=600&text=Elegant%20Home%20Exterior&bgColor=0077c8',
      imageAlt: 'Elegant home exterior with large windows',
      title: 'America\'s #1 Replacement Window Company',
      subtitle: 'Quality craftsmanship backed by our lifetime warranty',
      primaryButtonText: 'Learn More',
      primaryButtonHref: '/about',
      secondaryButtonText: 'Contact Us',
      secondaryButtonHref: '/contact',
    },
    {
      id: 3,
      imageSrc: heroImages[2] || '/api/placeholder?width=1920&height=600&text=Energy%20Efficient%20Home&bgColor=003366',
      imageAlt: 'Beautiful home with modern windows',
      title: 'Enhance Your Home\'s Energy Efficiency',
      subtitle: 'Save on energy costs with our ENERGY STAR® certified products',
      primaryButtonText: 'See Our Products',
      primaryButtonHref: '/products',
      secondaryButtonText: 'Get a Quote',
      secondaryButtonHref: '/quote',
    },
  ];

  // Product card data
  const productCardData = {
    id: 1,
    title: 'Replacement Windows',
    description: 'Energy-efficient windows in a variety of styles to complement any home.',
    imageSrc: productImage[0] || '/api/placeholder?width=800&height=600&text=Replacement%20Windows&bgColor=004b8d',
    imageAlt: 'Modern replacement windows',
    features: ['Energy Efficient', 'Multiple Styles', 'Custom Sizes', 'Lifetime Warranty'],
    ctaText: 'Explore Windows',
    ctaHref: '/products/windows',
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "We couldn't be happier with our new windows! The installation team was professional and efficient, and the quality of the windows is outstanding. Our home is noticeably more comfortable and our energy bills have decreased.",
      author: "Michael & Sarah Johnson",
      location: "Los Angeles, CA",
      rating: 5,
      imageSrc: testimonialImages[0] || '/placeholder-testimonial-1.jpg',
    },
    {
      id: 2,
      quote: "The entire process from consultation to installation was seamless. The sales representative was knowledgeable and helped us choose the perfect windows for our home. The installation crew was respectful of our property and completed the job ahead of schedule.",
      author: "David Rodriguez",
      location: "Pasadena, CA",
      rating: 5,
      imageSrc: testimonialImages[1] || '/placeholder-testimonial-2.jpg',
    },
    {
      id: 3,
      quote: "We recently had our entry door replaced and couldn't be more pleased with the results. The door is beautiful and has significantly improved our home's curb appeal. The installation was quick and professional.",
      author: "Jennifer & Robert Chen",
      location: "Santa Monica, CA",
      rating: 5,
      imageSrc: testimonialImages[2] || '/placeholder-testimonial-3.jpg',
    },
  ];

  // Service areas data
  const serviceAreas = {
    counties: [
      { id: 1, name: "Los Angeles County", active: true },
      { id: 2, name: "Orange County", active: false },
      { id: 3, name: "Ventura County", active: false },
      { id: 4, name: "San Bernardino County", active: false },
    ],
    cities: [
      { id: 1, name: "Los Angeles", countyId: 1 },
      { id: 2, name: "Pasadena", countyId: 1 },
      { id: 3, name: "Santa Monica", countyId: 1 },
      { id: 4, name: "Long Beach", countyId: 1 },
      { id: 5, name: "Glendale", countyId: 1 },
      { id: 6, name: "Burbank", countyId: 1 },
      { id: 7, name: "Anaheim", countyId: 2 },
      { id: 8, name: "Irvine", countyId: 2 },
      { id: 9, name: "Huntington Beach", countyId: 2 },
      { id: 10, name: "Oxnard", countyId: 3 },
      { id: 11, name: "Ventura", countyId: 3 },
      { id: 12, name: "San Bernardino", countyId: 4 },
      { id: 13, name: "Rancho Cucamonga", countyId: 4 },
    ],
    images: serviceAreaImages.map((src, i) => ({
      id: i + 1,
      src: src || `/placeholder-service-area-${i + 1}.jpg`,
      alt: `Service area ${i + 1}`,
    })),
  };

  // Product features data
  const productFeatures = {
    title: "Why Choose Our Windows & Doors",
    description: "Our products are designed to provide superior performance, energy efficiency, and lasting beauty for your home.",
    features: [
      {
        id: 1,
        title: "Energy Efficiency",
        description: "Our windows and doors are ENERGY STAR® certified to help reduce your energy costs and improve comfort.",
        icon: "⚡",
      },
      {
        id: 2,
        title: "Lifetime Warranty",
        description: "We stand behind our products with a comprehensive lifetime warranty for your peace of mind.",
        icon: "🛡️",
      },
      {
        id: 3,
        title: "Professional Installation",
        description: "Our factory-trained installers ensure your windows and doors are installed correctly for optimal performance.",
        icon: "🔧",
      },
      {
        id: 4,
        title: "Custom Solutions",
        description: "We offer a wide range of styles, colors, and options to match your home's architecture and your personal preferences.",
        icon: "🏠",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Component Testing Page</h1>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Button Component</h2>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Hero Banner Component</h2>
            <div className="mb-8">
              <HeroBanner slides={heroSlides} />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Product Card Component</h2>
            <div className="mb-8 max-w-md mx-auto">
              <ProductCard {...productCardData} />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Testimonial Section Component</h2>
            <div className="mb-8">
              <TestimonialSection testimonials={testimonials} />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Product Features Component</h2>
            <div className="mb-8">
              <ProductFeatures {...productFeatures} />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Service Areas Component</h2>
            <div className="mb-8">
              <ServiceAreas {...serviceAreas} />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Free Estimate Form Component</h2>
            <div className="mb-8 max-w-2xl mx-auto">
              <FreeEstimateForm />
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
