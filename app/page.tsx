import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative h-full">
          {/* This will be replaced with actual image from the scraping */}
          <div className="absolute inset-0 bg-gray-300"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              America's Largest Exterior Remodeler
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Quality Windows, Doors & Siding at Affordable Prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schedule-appointment" className="btn-primary">
                Schedule Free Estimate
              </Link>
              <Link href="/products" className="btn-secondary">
                View Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Overview Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Windows */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300 relative"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Replacement Windows</h3>
                <p className="text-gray-600 mb-4">
                  Energy-efficient windows in a variety of styles to complement any home.
                </p>
                <Link href="/products/windows" className="text-ww-blue hover:underline font-medium">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Doors */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300 relative"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Entry Doors</h3>
                <p className="text-gray-600 mb-4">
                  Beautiful, secure entry doors that enhance your home's curb appeal.
                </p>
                <Link href="/products/doors" className="text-ww-blue hover:underline font-medium">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Siding */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300 relative"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Vinyl Siding</h3>
                <p className="text-gray-600 mb-4">
                  Low-maintenance, durable siding options to protect and beautify your home.
                </p>
                <Link href="/products/siding" className="text-ww-blue hover:underline font-medium">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Window World</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-ww-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">America's #1 Choice</h3>
              <p className="text-gray-600">Largest exterior remodeler in the country</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ww-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">$</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">Quality products at reasonable prices</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ww-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">★</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Limited Lifetime Warranty</h3>
              <p className="text-gray-600">Products backed by industry-leading warranty</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ww-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">♥</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">Over 1 million satisfied customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-ww-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Home?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Schedule your free in-home estimate today and discover the Window World difference.
          </p>
          <Link href="/schedule-appointment" className="btn-secondary inline-block">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
