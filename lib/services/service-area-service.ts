/**
 * Service Area Service
 * 
 * This service provides functions to fetch service area data from the database.
 * It uses the database utility functions to interact with Supabase.
 */

import { fetchData, fetchBySlug } from '@/lib/database';
import { ServiceArea, Testimonial } from '@/types/database';
import { fetchUnsplashImages } from '@/lib/utils/context7';

/**
 * Fetches all service areas from the database
 * @returns All service areas grouped by county
 */
export async function getAllServiceAreas() {
  try {
    // Fetch service areas from the database
    const serviceAreas = await fetchData<ServiceArea>('service_areas', {
      eq: ['is_active', true],
      order: ['name', 'asc']
    });
    
    // Group service areas by county
    const counties = new Map();
    
    serviceAreas.forEach(area => {
      // Extract county from name (assuming format like "City, County")
      const nameParts = area.name.split(',');
      const city = nameParts[0].trim();
      const county = nameParts.length > 1 ? nameParts[1].trim() : 'Los Angeles County';
      
      if (!counties.has(county)) {
        counties.set(county, {
          id: counties.size + 1,
          name: county,
          slug: county.toLowerCase().replace(/\s+/g, '-'),
          cities: []
        });
      }
      
      counties.get(county).cities.push({
        id: area.id,
        name: city,
        slug: area.slug,
        countyId: counties.get(county).id
      });
    });
    
    // Convert to arrays for the UI
    const countiesArray = Array.from(counties.values());
    
    // Fetch images from Unsplash for counties
    const countyImages = await fetchUnsplashImages('neighborhood homes', countiesArray.length);
    
    // Add images to counties
    countiesArray.forEach((county, index) => {
      county.image_url = countyImages[index] || `/placeholder-county-${index + 1}.jpg`;
    });
    
    return {
      counties: countiesArray
    };
  } catch (error) {
    console.error('Error fetching service areas:', error);
    
    // Return placeholder data in case of error
    return {
      counties: [
        {
          id: 1,
          name: 'Los Angeles County',
          slug: 'los-angeles-county',
          image_url: '/placeholder-county-1.jpg',
          cities: [
            { id: 1, name: 'Los Angeles', slug: 'los-angeles', countyId: 1 },
            { id: 2, name: 'Pasadena', slug: 'pasadena', countyId: 1 },
            { id: 3, name: 'Santa Monica', slug: 'santa-monica', countyId: 1 },
            { id: 4, name: 'Long Beach', slug: 'long-beach', countyId: 1 },
            { id: 5, name: 'Glendale', slug: 'glendale', countyId: 1 }
          ]
        },
        {
          id: 2,
          name: 'Orange County',
          slug: 'orange-county',
          image_url: '/placeholder-county-2.jpg',
          cities: [
            { id: 6, name: 'Anaheim', slug: 'anaheim', countyId: 2 },
            { id: 7, name: 'Irvine', slug: 'irvine', countyId: 2 },
            { id: 8, name: 'Huntington Beach', slug: 'huntington-beach', countyId: 2 }
          ]
        },
        {
          id: 3,
          name: 'Ventura County',
          slug: 'ventura-county',
          image_url: '/placeholder-county-3.jpg',
          cities: [
            { id: 9, name: 'Oxnard', slug: 'oxnard', countyId: 3 },
            { id: 10, name: 'Ventura', slug: 'ventura', countyId: 3 }
          ]
        }
      ]
    };
  }
}

/**
 * Fetches a service area by slug
 * @param slug The slug of the service area to fetch
 * @returns The service area with related data
 */
export async function getServiceAreaBySlug(slug: string) {
  try {
    const serviceArea = await fetchBySlug<ServiceArea>('service_areas', slug);
    
    if (!serviceArea) {
      throw new Error(`Service area with slug ${slug} not found`);
    }
    
    // Extract city and county from name
    const nameParts = serviceArea.name.split(',');
    const city = nameParts[0].trim();
    const county = nameParts.length > 1 ? nameParts[1].trim() : 'Los Angeles County';
    
    // Fetch testimonials for this service area
    const testimonials = await fetchData<Testimonial>('testimonials', {
      eq: ['location', city],
      limit: 3,
      order: ['created_at', 'desc']
    });
    
    // Fetch images from Unsplash
    const areaImages = await fetchUnsplashImages(`${city} neighborhood homes`, 3);
    const testimonialImages = await fetchUnsplashImages('happy homeowner family', testimonials.length);
    
    // Format testimonials with images
    const formattedTestimonials = testimonials.map((testimonial, index) => ({
      id: testimonial.id,
      quote: testimonial.review_text,
      author: testimonial.customer_name,
      location: testimonial.location || city,
      rating: testimonial.rating || 5,
      imageSrc: testimonialImages[index] || `/placeholder-testimonial-${index + 1}.jpg`,
    }));
    
    // If no testimonials found, use placeholder data
    if (formattedTestimonials.length === 0) {
      formattedTestimonials.push(
        {
          id: 1,
          quote: `We couldn't be happier with our new windows! The installation team was professional and efficient, and the quality of the windows is outstanding. Our home in ${city} is noticeably more comfortable and our energy bills have decreased.`,
          author: "Michael & Sarah Johnson",
          location: city,
          rating: 5,
          imageSrc: '/placeholder-testimonial-1.jpg',
        },
        {
          id: 2,
          quote: `The entire process from consultation to installation was seamless. The sales representative was knowledgeable and helped us choose the perfect windows for our ${city} home. The installation crew was respectful of our property and completed the job ahead of schedule.`,
          author: "David Rodriguez",
          location: city,
          rating: 5,
          imageSrc: '/placeholder-testimonial-2.jpg',
        }
      );
    }
    
    // Fetch nearby service areas in the same county
    const nearbyAreas = await fetchData<ServiceArea>('service_areas', {
      eq: ['is_active', true],
      limit: 5,
      order: ['name', 'asc']
    });
    
    // Filter out the current service area and keep only those in the same county
    const nearbyServiceAreas = nearbyAreas
      .filter(area => area.id !== serviceArea.id && area.name.includes(county))
      .slice(0, 4)
      .map(area => ({
        id: area.id,
        name: area.name.split(',')[0].trim(), // Extract city name
        slug: area.slug
      }));
    
    return {
      serviceArea: {
        ...serviceArea,
        city,
        county,
        heroImage: areaImages[0] || '/placeholder-service-area-hero.jpg',
        galleryImages: areaImages.map((src, i) => ({
          id: i + 1,
          src: src || `/placeholder-service-area-${i + 1}.jpg`,
          alt: `${city} - Image ${i + 1}`,
        }))
      },
      testimonials: formattedTestimonials,
      nearbyServiceAreas: nearbyServiceAreas.length > 0 ? nearbyServiceAreas : [
        { id: 101, name: 'Nearby City 1', slug: 'nearby-city-1' },
        { id: 102, name: 'Nearby City 2', slug: 'nearby-city-2' },
        { id: 103, name: 'Nearby City 3', slug: 'nearby-city-3' },
        { id: 104, name: 'Nearby City 4', slug: 'nearby-city-4' }
      ]
    };
  } catch (error) {
    console.error(`Error fetching service area with slug ${slug}:`, error);
    
    // Return placeholder data in case of error
    const cityName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return {
      serviceArea: {
        id: 1,
        name: `${cityName}, Los Angeles County`,
        slug,
        description: `We proudly serve homeowners in ${cityName} with high-quality replacement windows, doors, and siding.`,
        meta_title: `Window & Door Replacement in ${cityName} | Window World LA`,
        meta_description: `Window World LA provides premium replacement windows, doors, and siding to homeowners in ${cityName}. Schedule your free estimate today!`,
        content: `<h2>Window & Door Replacement in ${cityName}</h2><p>Window World LA is proud to serve homeowners in ${cityName} with high-quality replacement windows, doors, and siding. Our products are designed to enhance your home's beauty, comfort, and energy efficiency.</p><h3>Our Services in ${cityName}</h3><ul><li>Replacement Windows</li><li>Entry Doors</li><li>Patio Doors</li><li>Vinyl Siding</li><li>Professional Installation</li></ul><p>Our team of experts is dedicated to providing exceptional service to ${cityName} homeowners. From your initial consultation to the final installation, we'll ensure your complete satisfaction with your home improvement project.</p>`,
        image_url: '/placeholder-service-area-hero.jpg',
        city: cityName,
        county: 'Los Angeles County',
        heroImage: '/placeholder-service-area-hero.jpg',
        galleryImages: [
          { id: 1, src: '/placeholder-service-area-1.jpg', alt: `${cityName} - Image 1` },
          { id: 2, src: '/placeholder-service-area-2.jpg', alt: `${cityName} - Image 2` },
          { id: 3, src: '/placeholder-service-area-3.jpg', alt: `${cityName} - Image 3` }
        ],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      testimonials: [
        {
          id: 1,
          quote: `We couldn't be happier with our new windows! The installation team was professional and efficient, and the quality of the windows is outstanding. Our home in ${cityName} is noticeably more comfortable and our energy bills have decreased.`,
          author: "Michael & Sarah Johnson",
          location: cityName,
          rating: 5,
          imageSrc: '/placeholder-testimonial-1.jpg',
        },
        {
          id: 2,
          quote: `The entire process from consultation to installation was seamless. The sales representative was knowledgeable and helped us choose the perfect windows for our ${cityName} home. The installation crew was respectful of our property and completed the job ahead of schedule.`,
          author: "David Rodriguez",
          location: cityName,
          rating: 5,
          imageSrc: '/placeholder-testimonial-2.jpg',
        }
      ],
      nearbyServiceAreas: [
        { id: 101, name: 'Nearby City 1', slug: 'nearby-city-1' },
        { id: 102, name: 'Nearby City 2', slug: 'nearby-city-2' },
        { id: 103, name: 'Nearby City 3', slug: 'nearby-city-3' },
        { id: 104, name: 'Nearby City 4', slug: 'nearby-city-4' }
      ]
    };
  }
}
