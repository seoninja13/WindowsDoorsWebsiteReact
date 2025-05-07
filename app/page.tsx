import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WysiwygBlock } from '@/components/ui/WysiwygBlock';
import { ProductGrid } from '@/components/ProductGrid';
import { MediaText } from '@/components/MediaText';
import { TestimonialsSlider } from '@/components/TestimonialsSlider';
import { ThinCta } from '@/components/ThinCta';
import { EstimateForm } from '@/components/ui/EstimateForm';
import { Footer } from '@/components/Footer';

// Mock data for the page
const heroImages = [
  {
    src: '/images/hero/ww-long-beach-ww-LB-exterior-hero-1024x427.jpg',
    mobileSrc: '/images/hero/ww-long-beach-ww-LB-exterior-hero-768x320.jpg',
    position: '50% 50%'
  },
  {
    src: '/images/hero/SHOT6_2018_TCS_KIT_MI_SL-e1724807440388-1024x683.jpg',
    mobileSrc: '/images/hero/SHOT6_2018_TCS_KIT_MI_SL-e1724807440388-768x512.jpg',
    position: '50% 50%'
  }
];

const productBlocks = [
  {
    title: 'Windows',
    content: 'Window World of Los Angeles replacement windows exceed industry standards. We offer a variety of window options that provide exterior solutions, increasing your energy efficiency and complementing your home\'s look.',
    imageUrl: '/images/products/SHOT11_2018_TCS_BDR_MI_DH_V2-768x512.jpg',
    linkUrl: 'https://windowworldla.com/windows/',
    backgroundPosition: '50% 50%'
  },
  {
    title: 'Doors',
    content: 'Window World of Los Angeles replacement doors are engineered for excellence. They increase your home\'s curb appeal and performance while still providing the quality and protection you deserve.',
    imageUrl: '/images/products/entry-door-img-1-768x768.jpg',
    linkUrl: 'https://windowworldla.com/doors/',
    backgroundPosition: '50% 50%'
  },
  {
    title: 'Siding',
    content: 'Wrap your home in Window World of Los Angeles\'s premium replacement vinyl siding. Both affordable and durable, our siding is designed to cut your home energy costs and provide protection from outdoor elements.',
    imageUrl: '/images/products/product-vinyl-siding-general-2-768x432.jpg',
    linkUrl: 'https://windowworldla.com/vinyl-siding/',
    backgroundPosition: '50% 50%'
  },
  {
    title: 'Roofing',
    content: 'Protect your home and increase its curb appeal with North America\'s leading brand of high-quality replacement roofing and expert installation.',
    imageUrl: '/images/products/ww-long-beach-Product-Roofing-TruDefinition-Duration-1-768x481-1.jpg',
    linkUrl: 'https://windowworldla.com/roofing/',
    backgroundPosition: '50% 50%'
  }
];

const smallBlocks = [
  {
    title: 'Why Go Energy-Efficient?',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.14 29.04">
        <polygon points="11.87 0 0 16.93 6.95 16.93 3.04 29.04 16.14 12.42 9.41 12.42 11.87 0" />
      </svg>
    ),
    linkUrl: 'https://windowworldla.com/windows/energy-efficient/'
  },
  {
    title: 'Our Installation Process',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.54 21.54">
        <path d="M21.09,5.63,16.22,10.5,12.14,9.4,11,5.31,15.91.44A8.3,8.3,0,0,0,5.62,11.63L.89,16.36a3,3,0,0,0,4.29,4.29l4.73-4.73A8.3,8.3,0,0,0,21.09,5.63Z" />
      </svg>
    ),
    linkUrl: 'https://windowworldla.com/installation/'
  },
  {
    title: 'View Financing Opitions',
    icon: (
      <svg className="icon-dollar-sign" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.91 23.83">
        <path d="M14.91,15.52c0-2.92-1.6-4.76-6.23-6.27-2.49-.87-3-1.35-3-2.42a1.57,1.57,0,0,1,1.72-1.6,2,2,0,0,1,2.13,2h4.94c-.09-2.84-1.82-4.69-5-5.26V0H5.55V2C2.31,2.46.39,4.45.39,7.56c0,2.91,1.53,4.61,6.18,6.1,2.36.78,3,1.45,3,2.62,0,.95-.44,1.75-2,1.75A2.4,2.4,0,0,1,5,15.67H0c.24,3.14,2.05,5.15,5.55,5.68v2.48h4V21.36C12.87,20.86,14.91,19,14.91,15.52Z" />
      </svg>
    ),
    linkUrl: 'https://windowworldla.com/financing/'
  }
];

const testimonials = [
  {
    quote: 'They were punctual, very friendly and did an amazing job with the install. I highly recommend them!',
    author: 'Carla G.',
    rating: 5,
    source: 'google'
  },
  {
    quote: 'Our experience with Window World was great! They communicated with us well using text and email. They answered all our questions as they came up. The crew were on time, polite and hard working! Windows look great and we are happy!',
    author: 'Ilya M.',
    rating: 5,
    source: 'google'
  },
  {
    quote: 'We are so delighted with our new windows. The Window World team did an awesome job. Each worker was a team player as they got the windows installed.',
    author: 'Antonia R.',
    rating: 5,
    source: 'google'
  }
];

/**
 * Home page component
 * Exactly matches the Window World LA homepage layout
 */
export default function Home() {
  return (
    <>
      <Header />
      <Hero
        backgroundImages={heroImages}
        formTitle="Los Angeles' Leader in Windows, Doors, & Siding"
        formSubtitle="Request Your Free Estimate"
        formImage="/images/form/ww-long-beach-the-fam-kris-shot1-300x195.png"
      />
      <section id="main" className="wp-content">
        <div className="wrapper">
          <WysiwygBlock
            content={
              <>
                <h1 style={{ textAlign: 'center', fontSize: '30px' }}>Window, Door &amp; Siding Replacement in Los Angeles, CA</h1>
                <h3 style={{ textAlign: 'center' }}>Take Your Home To New Heights With Window World of Los Angeles</h3>
                <p style={{ textAlign: 'center' }}>
                  Window World of Los Angeles is the go-to choice for quality replacement windows, doors, siding and roofing. We've helped thousands of Southern Los Angeles homeowners enhance their homes' beauty and energy efficiency with our trusted products. Our <a href="https://windowworldla.com/warranty/">lifetime limited warranty</a> and Good Housekeeping Seal recognition back all of them.
                </p>
                <p style={{ textAlign: 'center' }}>
                  Discover how we can revitalize your home whether you're in Los Angeles or elsewhere in Southern Los Angeles County. Schedule your <a href="https://windowworldla.com/free-estimate-request/" rel="noopener">free in-home estimate</a> today!
                </p>
              </>
            }
          />

          <ProductGrid
            largeBlocks={productBlocks}
            smallBlocks={smallBlocks}
          />

          <MediaText
            content={
              <>
                <h4>Serving Los Angeles, CA and Surrounding Areas</h4>
                <h2 style={{ fontSize: '22px' }}>Los Angeles's Most Trusted Home Remodeler</h2>
                <p>We make enhancing your home's look and performance as stress-free as possible. See how Window World of Los Angeles can transform your home in three simple steps:</p>
                <ul>
                  <li><strong>Step 1</strong>: Contact us to schedule your free in-home estimate.</li>
                  <li><strong>Step 2</strong>: We'll measure and custom order your replacement windows, doors, siding and/or roofing.</li>
                  <li><strong>Step 3</strong>: Your replacement products are professionally installed for instant savings and curb appeal.</li>
                </ul>
                <p><a className="btn-clear" href="https://windowworldla.com/free-estimate-request/">Get Started Today</a></p>
              </>
            }
            imageUrl="/images/content/ww-long-beach-ww-long-beach-owner-photo-768x499-copy-1.jpg"
            mediaOnLeft={true}
          />

          <MediaText
            content={
              <>
                <h2 style={{ fontSize: '22px' }}>Backed by Our Industry-Leading Warranty</h2>
                <p>Your investment is secure with the nation's strongest lifetime limited warranty. Plus, our products are backed by the Good Housekeeping Seal, ensuring quality and trust in every installation. When you choose Window World of Los Angeles for your home improvement project, you receive much more than just high-quality windows and doors. You gain peace of mind with the assurance that we stand behind our products with a lifetime warranty. As the nation's largest home remodeler, we are committed to supporting you long after your purchase.</p>
                <p><a className="btn-clear" href="https://windowworldla.com/warranty/">Learn More</a></p>
              </>
            }
            imageUrl="/images/content/ww-long-beach-WW_2018_PIXUS_004-Southwest_FullHouse_RGB-768x576.jpg"
            mediaOnLeft={false}
          />

          <TestimonialsSlider
            title="What Your Neighbors Are Saying"
            subtitle="5-Star Google Ratings"
            testimonials={testimonials}
          />

          <ThinCta
            title="Schedule Your Free In-Home Estimate Today"
            buttonText="Request Free Estimate"
            buttonUrl="https://windowworldla.com/free-estimate-request/"
            backgroundImage="/images/cta/ww-long-beach-ww-sca-exterior-hero-4-e1725481858682-1024x528.jpg"
            mobileBackgroundImage="/images/cta/ww-long-beach-ww-sca-exterior-hero-4-e1725481858682-768x396.jpg"
            backgroundPosition="50% 35%"
          />
        </div>
      </section>
      <Footer
        columns={[
          {
            title: 'Products',
            links: [
              { text: 'Windows', url: '/windows/' },
              { text: 'Doors', url: '/doors/' },
              { text: 'Vinyl Siding', url: '/vinyl-siding/' },
              { text: 'Roofing', url: '/roofing/' }
            ]
          },
          {
            title: 'About',
            links: [
              { text: 'About Us', url: '/about/' },
              { text: 'Reviews', url: '/about/reviews/' },
              { text: 'Service Areas', url: '/service-areas/' },
              { text: 'Financing', url: '/financing/' },
              { text: 'Warranty', url: '/warranty/' }
            ]
          },
          {
            title: 'Resources',
            links: [
              { text: 'Blog', url: '/blog/' },
              { text: 'FAQs', url: '/faqs/' },
              { text: 'Contact Us', url: '/contact/' },
              { text: 'Free Estimate', url: '/free-estimate-request/' }
            ]
          }
        ]}
        address="1234 Main Street, Los Angeles, CA 90001"
        phoneNumber="(310) 919-2352"
      />
    </>
  );
}
