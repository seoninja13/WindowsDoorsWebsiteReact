import Image from 'next/image';
import Link from 'next/link';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { ProductCard } from '@/components/ui/ProductCard';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { FreeEstimateForm } from '@/components/ui/FreeEstimateForm';
import { ServiceAreas } from '@/components/ui/ServiceAreas';
import { ProductFeatures } from '@/components/ui/ProductFeatures';
import { getHeroBannerImages, getProductImages, getTestimonialImages, getServiceAreaImages } from './actions';

/**
 * Home page component
 * Exactly matches the Window World LA homepage layout
 */
export default async function Home() {
  // Fetch images from Unsplash via Context7 MCP
  const heroBannerImages = await getHeroBannerImages();
  const productImages = await getProductImages();
  const testimonialImages = await getTestimonialImages();
  const serviceAreaImages = await getServiceAreaImages();

  // Hero banner slides data
  const heroSlides = [
    {
      id: 1,
      imageSrc: heroBannerImages[0] || '/placeholder-hero-1.jpg',
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
      imageSrc: heroBannerImages[1] || '/placeholder-hero-2.jpg',
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
      imageSrc: heroBannerImages[2] || '/placeholder-hero-3.jpg',
      imageAlt: 'Beautiful home with modern windows',
      title: 'Enhance Your Home\'s Energy Efficiency',
      subtitle: 'Save on energy costs with our ENERGY STAR® certified products',
      primaryButtonText: 'See Our Products',
      primaryButtonHref: '/products',
      secondaryButtonText: 'Get a Quote',
      secondaryButtonHref: '/quote',
    },
  ];

  // Product cards data
  const productCards = [
    {
      id: 1,
      title: 'Replacement Windows',
      description: 'Energy-efficient windows in a variety of styles to complement any home.',
      imageSrc: productImages.windows || '/placeholder-windows.jpg',
      imageAlt: 'Modern replacement windows',
      features: ['Energy Efficient', 'Multiple Styles', 'Custom Sizes', 'Lifetime Warranty'],
      ctaText: 'Explore Windows',
      ctaHref: '/products/windows',
    },
    {
      id: 2,
      title: 'Entry Doors',
      description: 'Beautiful, secure entry doors that make a statement and improve energy efficiency.',
      imageSrc: productImages.doors || '/placeholder-doors.jpg',
      imageAlt: 'Elegant entry door',
      features: ['Secure Design', 'Energy Efficient', 'Multiple Styles', 'Professional Installation'],
      ctaText: 'View Doors',
      ctaHref: '/products/doors',
    },
    {
      id: 3,
      title: 'Vinyl Siding',
      description: 'Durable, low-maintenance vinyl siding that enhances your home\'s appearance and value.',
      imageSrc: productImages.siding || '/placeholder-siding.jpg',
      imageAlt: 'Home with vinyl siding',
      features: ['Weather Resistant', 'Low Maintenance', 'Multiple Colors', 'Professional Installation'],
      ctaText: 'Learn About Siding',
      ctaHref: '/products/siding',
    },
  ];

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
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Banner */}
      <HeroBanner slides={heroSlides} />

      {/* Products Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Products</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our wide range of high-quality windows, doors, and siding products designed to enhance your home's beauty, comfort, and energy efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCards.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt}
                features={product.features}
                ctaText={product.ctaText}
                ctaHref={product.ctaHref}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
            </p>
          </div>

          <TestimonialSection testimonials={testimonials} />
        </div>
      </section>

      {/* Product Features Section */}
      <ProductFeatures
        title={productFeatures.title}
        description={productFeatures.description}
        features={productFeatures.features}
      />

      {/* Service Areas Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Areas We Serve</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We proudly serve homeowners throughout Southern California. Check if your area is covered by our services.
            </p>
          </div>

          <ServiceAreas
            counties={serviceAreas.counties}
            cities={serviceAreas.cities}
            images={serviceAreas.images}
          />
        </div>
      </section>

      {/* Free Estimate Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Estimate Today</h2>
              <p className="text-lg text-gray-600 mb-6">
                Ready to transform your home? Fill out the form to schedule your free, no-obligation consultation and estimate.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-ww-blue mr-2">✓</span>
                  <span>Professional consultation with a window and door expert</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ww-blue mr-2">✓</span>
                  <span>Detailed pricing with available financing options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ww-blue mr-2">✓</span>
                  <span>No pressure, no obligation quote</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ww-blue mr-2">✓</span>
                  <span>Virtual consultations available</span>
                </li>
              </ul>
            </div>
            <div>
              <FreeEstimateForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
