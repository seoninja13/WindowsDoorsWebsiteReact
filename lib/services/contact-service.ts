/**
 * Contact Page Service
 * 
 * This service provides functions to fetch data for the contact page from the database.
 * It uses the database utility functions to interact with Supabase.
 */

import { fetchData, fetchBySlug } from '@/lib/database';
import { Page, ContactInformation, FormSubmission } from '@/types/database';

/**
 * Fetches contact page data from the database
 * @returns Contact page data
 */
export async function getContactPageData() {
  try {
    // Fetch the contact page from the database
    const contactPage = await fetchBySlug<Page>('pages', 'contact-us');
    
    // Fetch contact information from the database
    const contactInfo = await fetchData<ContactInformation>('contact_information', {
      eq: ['is_primary', true]
    });
    
    // Use the primary contact information if available, otherwise use the first one
    let primaryContact = contactInfo.find(info => info.is_primary);
    if (!primaryContact && contactInfo.length > 0) {
      primaryContact = contactInfo[0];
    }
    
    // If no contact information found, use placeholder data
    if (!primaryContact) {
      primaryContact = {
        id: 1,
        location_name: 'Los Angeles Showroom',
        address_line1: '123 Main Street',
        address_line2: 'Suite 100',
        city: 'Los Angeles',
        state: 'CA',
        zip_code: '90001',
        phone: '(800) 123-4567',
        email: 'info@windowworldla.com',
        hours_of_operation: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 3:00 PM\nSunday: Closed',
        google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1636129233045!5m2!1sen!2sus',
        is_primary: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    // Fetch all locations for the locations section
    const allLocations = await fetchData<ContactInformation>('contact_information', {
      order: ['is_primary', 'desc']
    });
    
    return {
      title: contactPage?.title || 'Contact Us',
      description: contactPage?.description || 'Get in touch with our team for a free consultation and estimate.',
      content: contactPage?.content || '',
      primaryContact,
      locations: allLocations.length > 0 ? allLocations : [primaryContact],
      faqs: [
        {
          id: 1,
          question: 'How do I schedule a free estimate?',
          answer: 'You can schedule a free estimate by filling out our contact form, calling our office, or visiting our showroom. One of our representatives will contact you to schedule a convenient time for a consultation.'
        },
        {
          id: 2,
          question: 'What areas do you serve?',
          answer: 'We serve the greater Los Angeles area, including Orange County, Ventura County, and San Bernardino County. Please contact us to confirm if we serve your specific location.'
        },
        {
          id: 3,
          question: 'Do you offer financing options?',
          answer: 'Yes, we offer a variety of financing options to make your window, door, or siding project affordable. Our representatives can provide details during your consultation.'
        },
        {
          id: 4,
          question: 'How long does installation take?',
          answer: 'The installation time varies depending on the size and complexity of your project. Most window installations can be completed in one day, while larger projects may take 2-3 days. Our team will provide you with a specific timeline for your project.'
        },
        {
          id: 5,
          question: 'What warranty do you offer?',
          answer: 'We offer a comprehensive lifetime warranty on our products and installation. This warranty is transferable to the next homeowner, which can add value to your home if you decide to sell.'
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching contact page data:', error);
    
    // Return placeholder data in case of error
    return {
      title: 'Contact Us',
      description: 'Get in touch with our team for a free consultation and estimate.',
      content: '',
      primaryContact: {
        id: 1,
        location_name: 'Los Angeles Showroom',
        address_line1: '123 Main Street',
        address_line2: 'Suite 100',
        city: 'Los Angeles',
        state: 'CA',
        zip_code: '90001',
        phone: '(800) 123-4567',
        email: 'info@windowworldla.com',
        hours_of_operation: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 3:00 PM\nSunday: Closed',
        google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1636129233045!5m2!1sen!2sus',
        is_primary: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      locations: [
        {
          id: 1,
          location_name: 'Los Angeles Showroom',
          address_line1: '123 Main Street',
          address_line2: 'Suite 100',
          city: 'Los Angeles',
          state: 'CA',
          zip_code: '90001',
          phone: '(800) 123-4567',
          email: 'info@windowworldla.com',
          hours_of_operation: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 3:00 PM\nSunday: Closed',
          google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1636129233045!5m2!1sen!2sus',
          is_primary: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          location_name: 'Orange County Showroom',
          address_line1: '456 Orange Avenue',
          address_line2: null,
          city: 'Anaheim',
          state: 'CA',
          zip_code: '92805',
          phone: '(800) 234-5678',
          email: 'orangecounty@windowworldla.com',
          hours_of_operation: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 3:00 PM\nSunday: Closed',
          google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212863.84931393296!2d-118.02126438380576!3d33.83539882466211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd6f5ad9f1447%3A0x687eed92cfcb83f0!2sAnaheim%2C%20CA!5e0!3m2!1sen!2sus!4v1636129321045!5m2!1sen!2sus',
          is_primary: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      faqs: [
        {
          id: 1,
          question: 'How do I schedule a free estimate?',
          answer: 'You can schedule a free estimate by filling out our contact form, calling our office, or visiting our showroom. One of our representatives will contact you to schedule a convenient time for a consultation.'
        },
        {
          id: 2,
          question: 'What areas do you serve?',
          answer: 'We serve the greater Los Angeles area, including Orange County, Ventura County, and San Bernardino County. Please contact us to confirm if we serve your specific location.'
        },
        {
          id: 3,
          question: 'Do you offer financing options?',
          answer: 'Yes, we offer a variety of financing options to make your window, door, or siding project affordable. Our representatives can provide details during your consultation.'
        },
        {
          id: 4,
          question: 'How long does installation take?',
          answer: 'The installation time varies depending on the size and complexity of your project. Most window installations can be completed in one day, while larger projects may take 2-3 days. Our team will provide you with a specific timeline for your project.'
        },
        {
          id: 5,
          question: 'What warranty do you offer?',
          answer: 'We offer a comprehensive lifetime warranty on our products and installation. This warranty is transferable to the next homeowner, which can add value to your home if you decide to sell.'
        }
      ]
    };
  }
}

/**
 * Submits a contact form to the database
 * @param formData The form data to submit
 * @returns The submitted form data
 */
export async function submitContactForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  message: string;
  productInterest?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  try {
    // Create the form submission record
    const formSubmission: Partial<FormSubmission> = {
      form_type: 'contact',
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      message: formData.message,
      product_interest: formData.productInterest,
      ip_address: formData.ipAddress,
      user_agent: formData.userAgent,
      is_processed: false,
      created_at: new Date().toISOString()
    };
    
    // Insert the form submission into the database
    const { data, error } = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formSubmission),
    }).then(res => res.json());
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}
