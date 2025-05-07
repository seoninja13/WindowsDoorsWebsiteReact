/**
 * About Page Service
 * 
 * This service provides functions to fetch data for the about page from the database.
 * It uses the database utility functions to interact with Supabase.
 */

import { fetchData, fetchBySlug } from '@/lib/database';
import { Page } from '@/types/database';
import { fetchUnsplashImages } from '@/lib/utils/context7';

/**
 * Fetches about page data from the database
 * @returns About page data
 */
export async function getAboutPageData() {
  try {
    // Fetch the about page from the database
    const aboutPage = await fetchBySlug<Page>('pages', 'about-us');
    
    if (!aboutPage) {
      throw new Error('About page not found');
    }
    
    // Fetch images from Unsplash
    const aboutImages = await fetchUnsplashImages('window installation team professional', 3);
    
    return {
      title: aboutPage.title,
      description: aboutPage.description || 'Learn about our company and our commitment to quality windows and doors.',
      content: aboutPage.content || '',
      heroImage: aboutPage.screenshot_url || aboutImages[0] || '/placeholder-about-hero.jpg',
      teamImage: aboutImages[1] || '/placeholder-about-team.jpg',
      historyImage: aboutImages[2] || '/placeholder-about-history.jpg',
      
      // Company history section
      history: {
        title: 'Our History',
        content: `
          <p>For over 25 years, we've been providing homeowners with high-quality replacement windows, doors, and siding. What started as a small family business has grown into one of America's largest exterior remodelers, but our commitment to quality and customer satisfaction remains the same.</p>
          <p>Founded in 1995, our company began with a simple mission: to provide homeowners with quality products at affordable prices, installed by professionals who care. Over the years, we've expanded our product offerings and service areas, but we've never lost sight of our original mission.</p>
          <p>Today, we're proud to be recognized as America's #1 replacement window company, with locations across the country serving millions of satisfied customers.</p>
        `
      },
      
      // Mission and values section
      mission: {
        title: 'Our Mission & Values',
        content: `
          <p>Our mission is to enhance the beauty, comfort, and energy efficiency of your home with high-quality windows, doors, and exterior products installed with expert craftsmanship.</p>
          <h3>Our Core Values:</h3>
          <ul>
            <li><strong>Quality:</strong> We offer only the highest quality products that meet or exceed industry standards.</li>
            <li><strong>Integrity:</strong> We conduct our business with honesty, transparency, and fairness.</li>
            <li><strong>Customer Focus:</strong> We put our customers first, listening to their needs and exceeding their expectations.</li>
            <li><strong>Professionalism:</strong> Our team members are knowledgeable, skilled, and committed to excellence.</li>
            <li><strong>Community:</strong> We give back to the communities we serve through charitable initiatives and environmental responsibility.</li>
          </ul>
        `
      },
      
      // Team section
      team: {
        title: 'Our Team',
        content: `
          <p>Our success is built on the dedication and expertise of our team. From our knowledgeable sales consultants to our skilled installers, every member of our team is committed to providing you with an exceptional experience.</p>
          <p>Our installers are factory-trained professionals who take pride in their craftsmanship. They treat your home with respect and ensure that your new windows, doors, or siding are installed correctly for optimal performance and longevity.</p>
          <p>Our customer service team is always ready to assist you with any questions or concerns, and our management team is dedicated to maintaining the highest standards of quality and service.</p>
        `
      },
      
      // Why choose us section
      whyChooseUs: {
        title: 'Why Choose Us',
        reasons: [
          {
            id: 1,
            title: 'Quality Products',
            description: 'We offer only the highest quality windows, doors, and siding products that are built to last.',
            icon: '🏆'
          },
          {
            id: 2,
            title: 'Expert Installation',
            description: 'Our factory-trained installers ensure your products are installed correctly for optimal performance.',
            icon: '🔧'
          },
          {
            id: 3,
            title: 'Lifetime Warranty',
            description: 'We stand behind our products and installation with a comprehensive lifetime warranty.',
            icon: '🛡️'
          },
          {
            id: 4,
            title: 'Affordable Financing',
            description: 'We offer flexible financing options to make your home improvement project affordable.',
            icon: '💰'
          },
          {
            id: 5,
            title: 'Energy Efficiency',
            description: 'Our products are designed to improve your home\'s energy efficiency and reduce your utility bills.',
            icon: '⚡'
          },
          {
            id: 6,
            title: 'Customer Satisfaction',
            description: 'Our commitment to customer satisfaction has earned us thousands of positive reviews.',
            icon: '⭐'
          }
        ]
      },
      
      // Certifications and awards section
      certifications: {
        title: 'Certifications & Awards',
        items: [
          {
            id: 1,
            name: 'ENERGY STAR® Partner',
            description: 'We offer ENERGY STAR® certified products that meet strict energy efficiency guidelines.',
            logo: '/placeholder-energy-star.jpg'
          },
          {
            id: 2,
            name: 'Better Business Bureau A+ Rating',
            description: 'We maintain an A+ rating with the Better Business Bureau.',
            logo: '/placeholder-bbb.jpg'
          },
          {
            id: 3,
            name: 'EPA Lead-Safe Certified Firm',
            description: 'Our installers follow EPA lead-safe practices for homes built before 1978.',
            logo: '/placeholder-epa.jpg'
          },
          {
            id: 4,
            name: 'Angie\'s List Super Service Award',
            description: 'We\'ve earned the Angie\'s List Super Service Award multiple years in a row.',
            logo: '/placeholder-angies-list.jpg'
          }
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching about page data:', error);
    
    // Return placeholder data in case of error
    return {
      title: 'About Us',
      description: 'Learn about our company and our commitment to quality windows and doors.',
      content: '',
      heroImage: '/placeholder-about-hero.jpg',
      teamImage: '/placeholder-about-team.jpg',
      historyImage: '/placeholder-about-history.jpg',
      
      // Company history section
      history: {
        title: 'Our History',
        content: `
          <p>For over 25 years, we've been providing homeowners with high-quality replacement windows, doors, and siding. What started as a small family business has grown into one of America's largest exterior remodelers, but our commitment to quality and customer satisfaction remains the same.</p>
          <p>Founded in 1995, our company began with a simple mission: to provide homeowners with quality products at affordable prices, installed by professionals who care. Over the years, we've expanded our product offerings and service areas, but we've never lost sight of our original mission.</p>
          <p>Today, we're proud to be recognized as America's #1 replacement window company, with locations across the country serving millions of satisfied customers.</p>
        `
      },
      
      // Mission and values section
      mission: {
        title: 'Our Mission & Values',
        content: `
          <p>Our mission is to enhance the beauty, comfort, and energy efficiency of your home with high-quality windows, doors, and exterior products installed with expert craftsmanship.</p>
          <h3>Our Core Values:</h3>
          <ul>
            <li><strong>Quality:</strong> We offer only the highest quality products that meet or exceed industry standards.</li>
            <li><strong>Integrity:</strong> We conduct our business with honesty, transparency, and fairness.</li>
            <li><strong>Customer Focus:</strong> We put our customers first, listening to their needs and exceeding their expectations.</li>
            <li><strong>Professionalism:</strong> Our team members are knowledgeable, skilled, and committed to excellence.</li>
            <li><strong>Community:</strong> We give back to the communities we serve through charitable initiatives and environmental responsibility.</li>
          </ul>
        `
      },
      
      // Team section
      team: {
        title: 'Our Team',
        content: `
          <p>Our success is built on the dedication and expertise of our team. From our knowledgeable sales consultants to our skilled installers, every member of our team is committed to providing you with an exceptional experience.</p>
          <p>Our installers are factory-trained professionals who take pride in their craftsmanship. They treat your home with respect and ensure that your new windows, doors, or siding are installed correctly for optimal performance and longevity.</p>
          <p>Our customer service team is always ready to assist you with any questions or concerns, and our management team is dedicated to maintaining the highest standards of quality and service.</p>
        `
      },
      
      // Why choose us section
      whyChooseUs: {
        title: 'Why Choose Us',
        reasons: [
          {
            id: 1,
            title: 'Quality Products',
            description: 'We offer only the highest quality windows, doors, and siding products that are built to last.',
            icon: '🏆'
          },
          {
            id: 2,
            title: 'Expert Installation',
            description: 'Our factory-trained installers ensure your products are installed correctly for optimal performance.',
            icon: '🔧'
          },
          {
            id: 3,
            title: 'Lifetime Warranty',
            description: 'We stand behind our products and installation with a comprehensive lifetime warranty.',
            icon: '🛡️'
          },
          {
            id: 4,
            title: 'Affordable Financing',
            description: 'We offer flexible financing options to make your home improvement project affordable.',
            icon: '💰'
          },
          {
            id: 5,
            title: 'Energy Efficiency',
            description: 'Our products are designed to improve your home\'s energy efficiency and reduce your utility bills.',
            icon: '⚡'
          },
          {
            id: 6,
            title: 'Customer Satisfaction',
            description: 'Our commitment to customer satisfaction has earned us thousands of positive reviews.',
            icon: '⭐'
          }
        ]
      },
      
      // Certifications and awards section
      certifications: {
        title: 'Certifications & Awards',
        items: [
          {
            id: 1,
            name: 'ENERGY STAR® Partner',
            description: 'We offer ENERGY STAR® certified products that meet strict energy efficiency guidelines.',
            logo: '/placeholder-energy-star.jpg'
          },
          {
            id: 2,
            name: 'Better Business Bureau A+ Rating',
            description: 'We maintain an A+ rating with the Better Business Bureau.',
            logo: '/placeholder-bbb.jpg'
          },
          {
            id: 3,
            name: 'EPA Lead-Safe Certified Firm',
            description: 'Our installers follow EPA lead-safe practices for homes built before 1978.',
            logo: '/placeholder-epa.jpg'
          },
          {
            id: 4,
            name: 'Angie\'s List Super Service Award',
            description: 'We\'ve earned the Angie\'s List Super Service Award multiple years in a row.',
            logo: '/placeholder-angies-list.jpg'
          }
        ]
      }
    };
  }
}
