import React from 'react';
import { Header } from '@/components/ui/Header';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { ProductCard } from '@/components/ui/ProductCard';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { ProductFeatures } from '@/components/ui/ProductFeatures';
import { ServiceAreas } from '@/components/ui/ServiceAreas';
import { FreeEstimateForm } from '@/components/ui/FreeEstimateForm';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getHeroBannerData, getFeaturedProducts, getTestimonials, getProductFeatures, getServiceAreas } from '@/lib/services/home-service';

export default async function CompleteHomePage() {
  // Fetch data for the home page
  const heroSlides = await getHeroBannerData();
  const featuredProducts = await getFeaturedProducts();
  const testimonials = await getTestimonials();
  const productFeatures = await getProductFeatures();
  const serviceAreas = await getServiceAreas();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner slides={heroSlides} />
      
      {/* Main Content */}
      <main>
        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-ww-dark-gray">
                Window, Door & Siding Replacement in Los Angeles, CA
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 text-ww-dark-gray">
                Take Your Home To New Heights With Window World of Los Angeles
              </h2>
              <p className="text-gray-600 mb-8">
                Window World of Los Angeles is your local source for replacement windows, doors, and siding. 
                Our products are designed to enhance your home's beauty, comfort, and energy efficiency. 
                With our professional installation and industry-leading warranty, you can trust Window World 
                to deliver quality products and exceptional service.
              </p>
              <Button href="/free-estimate" variant="primary" size="lg">
                Request Free Estimate
              </Button>
            </div>
          </Container>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ww-dark-gray">Our Products</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our selection of high-quality windows, doors, and siding products designed to enhance your home.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
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
          </Container>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <Container>
            <TestimonialSection testimonials={testimonials} />
          </Container>
        </section>
        
        {/* Product Features Section */}
        <ProductFeatures {...productFeatures} />
        
        {/* Service Areas Section */}
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ww-dark-gray">Areas We Serve</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Window World of Los Angeles proudly serves homeowners throughout Los Angeles County and surrounding areas.
              </p>
            </div>
            
            <ServiceAreas {...serviceAreas} />
          </Container>
        </section>
        
        {/* Free Estimate Form Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <FreeEstimateForm />
            </div>
          </Container>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-ww-dark-blue text-white py-12">
        <Container>
          <div className="text-center">
            <p className="mb-4">© {new Date().getFullYear()} Window World of Los Angeles. All Rights Reserved.</p>
            <p className="text-sm text-white/70">
              This is a test page for the Window World LA website clone. The actual footer would include navigation, 
              contact information, social media links, and other elements.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
