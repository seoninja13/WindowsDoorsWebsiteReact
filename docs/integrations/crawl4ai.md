# Crawl4AI Integration Documentation

## Overview

This document provides a detailed description of the Crawl4AI integration in the Windows Doors Website React project. Crawl4AI is used to scrape and analyze the Window World LA website (https://www.windowworldla.com/) to extract its structure, content, and design for replication.

## Crawl4AI Server

The Crawl4AI server is implemented in the `/crawl4ai-server` directory and provides functionality for crawling websites, extracting content, and taking screenshots.

### Server Components

1. **Main Server (`index.js`)**: The entry point for the Crawl4AI server.
2. **Crawler (`crawler.js`)**: Implements the web crawling functionality.
3. **Parser (`parser.js`)**: Parses HTML content to extract structured data.
4. **Storage (`storage.js`)**: Handles storage of crawled data and screenshots.

### Server Configuration

The server is configured with the following options:

```javascript
// crawl4ai-server/index.js
const config = {
  baseUrl: 'https://www.windowworldla.com',
  maxPages: -1, // Unlimited pages
  concurrency: 5, // Number of concurrent requests
  delay: 1000, // Delay between requests in milliseconds
  timeout: 30000, // Request timeout in milliseconds
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  screenshot: true, // Take screenshots of pages
  screenshotViewport: { width: 1920, height: 1080 }, // Screenshot viewport size
  outputDir: '../crawl_results', // Output directory for crawled data
};
```

## Crawl4AI API

The Crawl4AI API is implemented as Next.js API routes in the `/app/api/crawl4ai` directory and provides endpoints for interacting with the Crawl4AI server.

### API Endpoints

#### 1. `/api/crawl4ai/start`

Starts a crawl of the Window World LA website.

- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "baseUrl": "https://www.windowworldla.com",
    "maxPages": -1,
    "concurrency": 5,
    "delay": 1000,
    "timeout": 30000,
    "screenshot": true
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Crawl started",
    "crawlId": "1234567890"
  }
  ```

#### 2. `/api/crawl4ai/status`

Gets the status of a crawl.

- **Method**: `GET`
- **Query Parameters**:
  - `crawlId`: The ID of the crawl
- **Response**:
  ```json
  {
    "success": true,
    "status": "in_progress",
    "pagesProcessed": 50,
    "totalPages": 100,
    "startTime": "2023-01-01T00:00:00.000Z",
    "elapsedTime": 60000
  }
  ```

#### 3. `/api/crawl4ai/results`

Gets the results of a crawl.

- **Method**: `GET`
- **Query Parameters**:
  - `crawlId`: The ID of the crawl
- **Response**:
  ```json
  {
    "success": true,
    "urls": [
      "https://www.windowworldla.com/",
      "https://www.windowworldla.com/windows",
      "https://www.windowworldla.com/doors",
      // More URLs...
    ],
    "content": {
      "https://www.windowworldla.com/": {
        "title": "Window World LA - Replacement Windows, Doors & Siding",
        "description": "Window World LA is your local source for replacement windows, doors, and siding. Schedule a free in-home estimate today!",
        "h1": "Transform Your Home with Premium Windows & Doors",
        "sections": [
          {
            "type": "hero",
            "title": "Transform Your Home with Premium Windows & Doors",
            "subtitle": "Energy-efficient solutions for every style and budget",
            "cta": "Get a Free Estimate",
            "image": "https://www.windowworldla.com/images/hero-1.jpg"
          },
          // More sections...
        ]
      },
      // More pages...
    }
  }
  ```

#### 4. `/api/crawl4ai/screenshot`

Gets a screenshot of a page.

- **Method**: `GET`
- **Query Parameters**:
  - `crawlId`: The ID of the crawl
  - `url`: The URL of the page
- **Response**: The screenshot image

## Crawl Results

The results of the Crawl4AI crawl are stored in the `/crawl_results` directory:

1. **URLs (`urls.json`)**: A list of all URLs crawled.
2. **Content (`content.json`)**: Extracted content from each page.
3. **Screenshots (`screenshots/`)**: Screenshots of each page.

### URLs Format

```json
[
  "https://www.windowworldla.com/",
  "https://www.windowworldla.com/windows",
  "https://www.windowworldla.com/doors",
  "https://www.windowworldla.com/siding",
  "https://www.windowworldla.com/about-us",
  "https://www.windowworldla.com/contact-us",
  "https://www.windowworldla.com/service-areas",
  "https://www.windowworldla.com/blog",
  // More URLs...
]
```

### Content Format

```json
{
  "https://www.windowworldla.com/": {
    "title": "Window World LA - Replacement Windows, Doors & Siding",
    "description": "Window World LA is your local source for replacement windows, doors, and siding. Schedule a free in-home estimate today!",
    "h1": "Transform Your Home with Premium Windows & Doors",
    "sections": [
      {
        "type": "hero",
        "title": "Transform Your Home with Premium Windows & Doors",
        "subtitle": "Energy-efficient solutions for every style and budget",
        "cta": "Get a Free Estimate",
        "image": "https://www.windowworldla.com/images/hero-1.jpg"
      },
      {
        "type": "products",
        "title": "Our Products",
        "items": [
          {
            "title": "Replacement Windows",
            "description": "Energy-efficient windows in a variety of styles to complement any home.",
            "image": "https://www.windowworldla.com/images/products/windows.jpg",
            "features": ["Energy Efficient", "Multiple Styles", "Custom Sizes", "Lifetime Warranty"],
            "cta": "Explore Windows",
            "url": "https://www.windowworldla.com/windows"
          },
          // More products...
        ]
      },
      // More sections...
    ]
  },
  // More pages...
}
```

## Using Crawl4AI Data

The data extracted by Crawl4AI is used to implement the Windows Doors Website React project:

### 1. URL Structure

The URL structure of the Window World LA website is replicated in the Next.js application using dynamic routes:

```
/app/
  page.tsx (Home page)
  windows/
    page.tsx (Windows category page)
    [slug]/
      page.tsx (Individual window product page)
  doors/
    page.tsx (Doors category page)
    [slug]/
      page.tsx (Individual door product page)
  siding/
    page.tsx (Siding category page)
    [slug]/
      page.tsx (Individual siding product page)
  about-us/
    page.tsx (About Us page)
  contact-us/
    page.tsx (Contact Us page)
  service-areas/
    page.tsx (Service Areas page)
    [slug]/
      page.tsx (Individual service area page)
  blog/
    page.tsx (Blog page)
    [slug]/
      page.tsx (Individual blog post page)
```

### 2. Content Structure

The content structure of the Window World LA website is replicated in the Next.js application using the extracted content:

```typescript
// app/page.tsx
export default async function Home() {
  // Fetch data from the database via our service functions
  const heroSlides = await getHeroBannerData();
  const productCards = await getFeaturedProducts();
  const testimonials = await getTestimonials();
  const serviceAreas = await getServiceAreas();
  const productFeatures = await getProductFeatures();

  return (
    <main>
      <HeroBanner slides={heroSlides} />
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCards.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </Container>
      </section>
      <TestimonialSection testimonials={testimonials} />
      <ProductFeatures {...productFeatures} />
      <ServiceAreas {...serviceAreas} />
      <section className="py-16 bg-gray-100">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Get a Free Estimate</h2>
          <FreeEstimateForm />
        </Container>
      </section>
    </main>
  );
}
```

### 3. Visual Design

The visual design of the Window World LA website is replicated in the Next.js application using Tailwind CSS:

```typescript
// components/ui/HeroBanner.tsx
export function HeroBanner({ slides }: HeroBannerProps) {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Slider slides={slides.map((slide) => (
          <div key={slide.id} className="relative h-[600px]">
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Container>
                <div className="max-w-2xl text-white text-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl mb-8">{slide.subtitle}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild variant="primary" size="lg">
                      <Link href={slide.primaryButtonHref}>{slide.primaryButtonText}</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href={slide.secondaryButtonHref}>{slide.secondaryButtonText}</Link>
                    </Button>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        ))} />
      </div>
    </section>
  );
}
```

## Conclusion

The Crawl4AI integration in the Windows Doors Website React project enables the extraction of the structure, content, and design of the Window World LA website for replication. The extracted data is used to implement the Next.js application, ensuring a 100% exact clone of the original website.
