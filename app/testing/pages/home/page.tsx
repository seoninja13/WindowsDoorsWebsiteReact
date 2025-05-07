import { Container } from '@/components/ui/Container';
import { getHeroBannerData, getFeaturedProducts, getTestimonials, getProductFeatures, getServiceAreas } from '@/lib/services/home-service';

export default async function HomePageTest() {
  // Fetch data for the home page
  const heroSlides = await getHeroBannerData();
  const featuredProducts = await getFeaturedProducts();
  const testimonials = await getTestimonials();
  const productFeatures = await getProductFeatures();
  const serviceAreas = await getServiceAreas();

  return (
    <div className="min-h-screen">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-primary">Home Page Test</h1>
          <p className="text-lg text-center text-gray-700 mb-8">
            This is a test of the complete home page with all components and real data.
          </p>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-primary-50 px-6 py-3 border-b">
              <h2 className="text-xl font-semibold text-primary">Test Controls</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                The home page below is rendered with real data from the service layer. You can use these controls to test different aspects of the page:
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
                  Refresh Data
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                  Toggle Mobile View
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                  Test Performance
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Import the actual HomePage component */}
      <div className="border-t border-b border-gray-200 py-4 mb-8 bg-yellow-50">
        <Container>
          <p className="text-amber-800 text-center font-medium">
            ⚠️ Below is the actual home page component with real data ⚠️
          </p>
        </Container>
      </div>
      
      {/* This is where we would normally import the actual HomePage component */}
      {/* For now, we'll create a simplified version that shows the structure */}
      <div className="home-page">
        {/* Hero Banner Section */}
        <section className="bg-gray-100 py-16">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary">Hero Banner Section</h2>
              <p className="text-gray-600">
                This would display the HeroBanner component with {heroSlides.length} slides
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(heroSlides[0], null, 2)}
              </pre>
            </div>
          </Container>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary">Featured Products Section</h2>
              <p className="text-gray-600">
                This would display {featuredProducts.length} ProductCard components
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-xl mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-sm text-gray-500">Features: {product.features.join(', ')}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        
        {/* Product Features Section */}
        <section className="bg-gray-100 py-16">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary">Product Features Section</h2>
              <p className="text-gray-600">
                This would display the ProductFeatures component
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-4">{productFeatures.title}</h3>
              <p className="text-gray-600 mb-6">{productFeatures.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {productFeatures.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-3">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary">Testimonials Section</h2>
              <p className="text-gray-600">
                This would display the TestimonialSection component with {testimonials.length} testimonials
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <h3 className="font-bold">{testimonial.author}</h3>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote.substring(0, 100)}..."</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        
        {/* Service Areas Section */}
        <section className="bg-gray-100 py-16">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary">Service Areas Section</h2>
              <p className="text-gray-600">
                This would display the ServiceAreas component with {serviceAreas.counties.length} counties
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {serviceAreas.counties.map((county, index) => (
                  <div key={index} className={`px-4 py-2 mr-2 rounded-t-lg ${county.active ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {county.name}
                  </div>
                ))}
              </div>
              <div className="border p-4 rounded-b-lg">
                <div className="grid grid-cols-3 gap-2">
                  {serviceAreas.cities
                    .filter(city => city.countyId === serviceAreas.counties.find(c => c.active)?.id)
                    .map((city, index) => (
                      <div key={index} className="text-gray-600">{city.name}</div>
                    ))
                  }
                </div>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Free Estimate Form Section */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary">Free Estimate Form Section</h2>
              <p className="text-gray-600">
                This would display the FreeEstimateForm component
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
              <h3 className="font-bold text-xl mb-4 text-center">Get Your Free Estimate Today</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 h-12 rounded"></div>
                <div className="bg-gray-100 h-12 rounded"></div>
                <div className="bg-gray-100 h-12 rounded"></div>
                <div className="bg-gray-100 h-12 rounded"></div>
              </div>
              <div className="bg-gray-100 h-32 rounded mb-4"></div>
              <button className="w-full bg-primary text-white py-3 rounded font-medium">
                Submit Request
              </button>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
