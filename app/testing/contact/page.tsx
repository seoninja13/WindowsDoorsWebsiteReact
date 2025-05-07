import { Container } from '@/components/ui/Container';
import { FreeEstimateForm } from '@/components/ui/FreeEstimateForm';
import { ServiceAreas } from '@/components/ui/ServiceAreas';
import { fetchUnsplashImages } from '@/lib/utils/context7';

export default async function ContactComponentsTestPage() {
  // Fetch images for testing
  const serviceAreaImages = await fetchUnsplashImages('neighborhood homes', 4);
  
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
    images: [
      {
        id: 1,
        src: serviceAreaImages[0] || '/api/placeholder?width=600&height=400&text=Los%20Angeles&bgColor=0077c8',
        alt: "Los Angeles service area",
      },
      {
        id: 2,
        src: serviceAreaImages[1] || '/api/placeholder?width=600&height=400&text=Orange%20County&bgColor=0077c8',
        alt: "Orange County service area",
      },
      {
        id: 3,
        src: serviceAreaImages[2] || '/api/placeholder?width=600&height=400&text=Ventura%20County&bgColor=0077c8',
        alt: "Ventura County service area",
      },
      {
        id: 4,
        src: serviceAreaImages[3] || '/api/placeholder?width=600&height=400&text=San%20Bernardino&bgColor=0077c8',
        alt: "San Bernardino service area",
      },
    ],
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">Contact Page Components</h1>
        
        <div className="space-y-16">
          {/* Free Estimate Form Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Free Estimate Form Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
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
          
          {/* Service Areas Component */}
          <section>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="bg-primary-50 px-6 py-3 border-b">
                <h2 className="text-xl font-semibold text-primary">Service Areas Component</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
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
          
          {/* More component sections will be added here */}
          <div className="text-center py-8">
            <p className="text-gray-500">More contact page component tests will be added soon.</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
