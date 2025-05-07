import { Container } from '@/components/ui/Container';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { fetchUnsplashImages } from '@/lib/utils/context7';

export default async function AboutComponentsTestPage() {
  // Fetch images for testing
  const testimonialImages = await fetchUnsplashImages('happy homeowner family', 3);
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "We couldn't be happier with our new windows! The installation team was professional and efficient, and the quality of the windows is outstanding. Our home is noticeably more comfortable and our energy bills have decreased.",
      author: "Michael & Sarah Johnson",
      location: "Los Angeles, CA",
      rating: 5,
      imageSrc: testimonialImages[0] || '/api/placeholder?width=400&height=400&text=M%26S&bgColor=333333',
    },
    {
      id: 2,
      quote: "The entire process from consultation to installation was seamless. The sales representative was knowledgeable and helped us choose the perfect windows for our home. The installation crew was respectful of our property and completed the job ahead of schedule.",
      author: "David Rodriguez",
      location: "Pasadena, CA",
      rating: 5,
      imageSrc: testimonialImages[1] || '/api/placeholder?width=400&height=400&text=DR&bgColor=333333',
    },
    {
      id: 3,
      quote: "We recently had our entry door replaced and couldn't be more pleased with the results. The door is beautiful and has significantly improved our home's curb appeal. The installation was quick and professional.",
      author: "Jennifer & Robert Chen",
      location: "Santa Monica, CA",
      rating: 5,
      imageSrc: testimonialImages[2] || '/api/placeholder?width=400&height=400&text=J%26R&bgColor=333333',
    },
  ];

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">About Page Components</h1>
        
        <div className="space-y-16">
          {/* Testimonial Section Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Testimonial Section Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
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
          
          {/* More component sections will be added here */}
          <div className="text-center py-8">
            <p className="text-gray-500">More about page component tests will be added soon.</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
