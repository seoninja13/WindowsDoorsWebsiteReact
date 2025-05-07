# SEO Strategy Documentation

## Overview

This document provides a detailed description of the SEO strategy for the Windows Doors Website React project. The SEO strategy is designed to ensure that the website ranks well in search engines and attracts organic traffic.

## SEO Implementation

### 1. Metadata

Each page includes appropriate metadata for SEO:

```typescript
// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Window World LA - Replacement Windows, Doors & Siding',
    template: '%s | Window World LA',
  },
  description: 'Window World LA is your local source for replacement windows, doors, and siding. Schedule a free in-home estimate today!',
  keywords: 'replacement windows, entry doors, patio doors, vinyl siding, Los Angeles, energy efficient windows',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.windowworldla.com',
    title: 'Window World LA - Replacement Windows, Doors & Siding',
    description: 'Window World LA is your local source for replacement windows, doors, and siding. Schedule a free in-home estimate today!',
    siteName: 'Window World LA',
    images: [
      {
        url: 'https://www.windowworldla.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Window World LA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Window World LA - Replacement Windows, Doors & Siding',
    description: 'Window World LA is your local source for replacement windows, doors, and siding. Schedule a free in-home estimate today!',
    images: ['https://www.windowworldla.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
    yandex: 'verification_token',
    yahoo: 'verification_token',
    other: {
      me: ['info@windowworldla.com'],
    },
  },
};
```

### 2. Dynamic Metadata

For dynamic pages, metadata is generated based on the page content:

```typescript
// app/products/[slug]/page.tsx
import { Metadata } from 'next';
import { getProductCategoryBySlug } from '@/lib/services/product-service';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getProductCategoryBySlug(params.slug);
  
  return {
    title: `${category.name} | Window World LA`,
    description: category.description || `Explore our selection of ${category.name.toLowerCase()} for your home. Schedule a free in-home estimate today!`,
    openGraph: {
      title: `${category.name} | Window World LA`,
      description: category.description || `Explore our selection of ${category.name.toLowerCase()} for your home. Schedule a free in-home estimate today!`,
      images: [
        {
          url: category.image_url || 'https://www.windowworldla.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
  };
}
```

### 3. Structured Data

Structured data is included on relevant pages to enhance search engine understanding:

```typescript
// app/products/[slug]/[productSlug]/page.tsx
import { getProductBySlug } from '@/lib/services/product-service';

export default async function ProductPage({ params }: { params: { slug: string, productSlug: string } }) {
  const { product, category, images, colorOptions } = await getProductBySlug(params.productSlug);
  
  // Structured data for the product
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images.map(image => image.image_url),
    brand: {
      '@type': 'Brand',
      name: 'Window World',
    },
    category: category.name,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      url: `https://www.windowworldla.com/products/${category.slug}/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'Window World LA',
      },
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  );
}
```

### 4. Canonical URLs

Canonical URLs are included on all pages to prevent duplicate content issues:

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="canonical"
          href={`https://www.windowworldla.com${pathname}`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 5. XML Sitemap

An XML sitemap is generated to help search engines discover and index all pages:

```typescript
// app/sitemap.ts
import { getProductCategories, getProductsByCategory } from '@/lib/services/product-service';
import { getAllServiceAreas } from '@/lib/services/service-area-service';
import { getBlogPosts } from '@/lib/services/blog-service';

export default async function sitemap() {
  const baseUrl = 'https://www.windowworldla.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-estimate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
  
  // Product categories
  const categories = await getProductCategories();
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/products/${category.slug}`,
    lastModified: new Date(category.updated_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  
  // Products
  const productPages = [];
  for (const category of categories) {
    const { products } = await getProductsByCategory(category.slug);
    productPages.push(
      ...products.map(product => ({
        url: `${baseUrl}/products/${category.slug}/${product.slug}`,
        lastModified: new Date(product.updated_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    );
  }
  
  // Service areas
  const { counties } = await getAllServiceAreas();
  const serviceAreaPages = [];
  for (const county of counties) {
    serviceAreaPages.push({
      url: `${baseUrl}/service-areas/${county.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
    
    for (const city of county.cities) {
      serviceAreaPages.push({
        url: `${baseUrl}/service-areas/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }
  
  // Blog posts
  const { posts } = await getBlogPosts(1, 100);
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];
  
  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...serviceAreaPages,
    ...blogPages,
  ];
}
```

### 6. Robots.txt

A robots.txt file is included to guide search engine crawlers:

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: 'https://www.windowworldla.com/sitemap.xml',
  };
}
```

## SEO Best Practices

### 1. URL Structure

The URL structure is clean, descriptive, and follows a logical hierarchy:

- Home page: `/`
- Product categories: `/products/[category-slug]`
- Products: `/products/[category-slug]/[product-slug]`
- About page: `/about-us`
- Contact page: `/contact-us`
- Service areas: `/service-areas/[area-slug]`
- Blog: `/blog`
- Blog posts: `/blog/[post-slug]`

### 2. Page Speed Optimization

Several techniques are used to optimize page speed:

1. **Image Optimization**: Images are optimized using Next.js Image component.
2. **Code Splitting**: JavaScript is split into smaller chunks.
3. **Lazy Loading**: Components and images are lazy-loaded.
4. **Caching**: Static pages are cached using ISR with a 6-month revalidation period.
5. **Minification**: JavaScript and CSS files are minified.
6. **Compression**: Assets are compressed using Brotli and Gzip.

### 3. Mobile Responsiveness

The website is fully responsive and provides a good user experience on all devices:

1. **Responsive Design**: The layout adapts to different screen sizes.
2. **Touch-Friendly**: Interactive elements are sized appropriately for touch.
3. **Viewport Configuration**: The viewport is properly configured.
4. **Mobile-First Approach**: The design follows a mobile-first approach.

### 4. Content Strategy

The content strategy focuses on providing valuable information to users:

1. **Keyword Research**: Content is optimized for relevant keywords.
2. **Unique Content**: Each page has unique and valuable content.
3. **Heading Structure**: Proper heading structure (H1, H2, H3, etc.) is used.
4. **Internal Linking**: Pages are linked to each other in a logical way.
5. **External Linking**: Authoritative external sources are linked when appropriate.

### 5. Local SEO

Local SEO is optimized for the Los Angeles area:

1. **Service Area Pages**: Each service area has its own page with unique content.
2. **Google Maps Integration**: Google Maps is embedded on service area pages.
3. **Local Business Schema**: Local business structured data is included.
4. **NAP Consistency**: Name, Address, and Phone number are consistent across the site.
5. **Local Keywords**: Content is optimized for local keywords.

## SEO Monitoring and Improvement

### 1. Analytics Integration

Google Analytics is integrated to monitor website performance:

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Search Console Integration

Google Search Console is used to monitor search performance and identify issues.

### 3. Regular Content Updates

The blog is regularly updated with new content to keep the site fresh and relevant.

### 4. Performance Monitoring

Website performance is regularly monitored using tools like Lighthouse and PageSpeed Insights.

## Conclusion

The SEO strategy for the Windows Doors Website React project is comprehensive and follows best practices to ensure good search engine visibility and organic traffic. It includes proper metadata, structured data, canonical URLs, XML sitemap, robots.txt, and follows SEO best practices for URL structure, page speed, mobile responsiveness, content, and local SEO.
