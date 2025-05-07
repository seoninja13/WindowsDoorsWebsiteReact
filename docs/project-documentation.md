# Windows Doors Website React - Project Documentation

## Project Overview

This project is a 100% exact clone of the Window World LA website (https://www.windowworldla.com/) using React.js frontend and Next.js backend. The site is designed to be user-friendly and SEO optimized, with a focus on providing a seamless experience for users looking for windows, doors, and related products.

## Tech Stack

- **Framework**: Next.js 15.3.1 with App Router
- **Frontend**: React 18.2.0, TypeScript, Tailwind CSS
- **Deployment**: Netlify
- **Database**: Supabase
- **Web Scraping**: Crawl4AI, Context7 MCP Server, Cheerio, Axios
- **API Integrations**: Google Maps API, Form submission APIs
- **Data Storage**: File-based storage for scraped content
- **Build Optimization**: ISR with 6-month cache (revalidate: 86400)

## Project Structure

### Root Directory

- `.env.example` - Example environment variables
- `.env.local` - Local environment variables (not committed to git)
- `.gitignore` - Git ignore file
- `netlify.toml` - Netlify configuration
- `next.config.js` - Next.js configuration
- `package.json` - Project dependencies and scripts
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `README.md` - Project readme

### App Directory (`/app`)

The app directory contains the Next.js application code using the App Router pattern:

- `actions.ts` - Server actions for data fetching
- `globals.css` - Global CSS styles
- `layout.tsx` - Root layout component
- `page.tsx` - Home page component
- `/api` - API routes for server-side functionality
  - `/api/blog/count` - API route for getting blog post count
  - `/api/submit-form` - API route for form submissions
  - `/api/crawl4ai` - API routes for Crawl4AI integration

### Components Directory (`/components`)

Contains all React components used throughout the application:

- `/ui` - UI components
  - `Button.tsx` - Button component
  - `Container.tsx` - Container component
  - `FreeEstimateForm.tsx` - Form component for free estimates
  - `HeroBanner.tsx` - Hero banner component with slider
  - `ProductCard.tsx` - Product card component
  - `ProductFeatures.tsx` - Product features component
  - `ServiceAreas.tsx` - Service areas component
  - `TestimonialSection.tsx` - Testimonial section component
  - `Header.tsx` - Header component with navigation
  - `Footer.tsx` - Footer component

### Lib Directory (`/lib`)

Contains utility functions and services:

- `database.ts` - Database utility functions for Supabase
- `logging.ts` - Logging utility functions
- `/services` - Service functions for data fetching
  - `about-service.ts` - Service for about page data
  - `blog-service.ts` - Service for blog data
  - `contact-service.ts` - Service for contact page data
  - `home-service.ts` - Service for home page data
  - `product-service.ts` - Service for product data
  - `service-area-service.ts` - Service for service area data
- `/utils` - Utility functions
  - `context7.ts` - Utility functions for Context7 MCP
  - `format.ts` - Formatting utility functions
  - `validation.ts` - Validation utility functions

### Types Directory (`/types`)

Contains TypeScript type definitions:

- `database.ts` - Type definitions for database models

### Docs Directory (`/docs`)

Contains project documentation:

- `index.md` - Documentation index
- `/architecture` - Architecture documentation
- `/daily-logs` - Daily development logs
- `/database` - Database documentation
- `/features` - Feature documentation
- `/guides` - Development guides
- `/integrations` - Integration documentation
- `/templates` - Documentation templates

### Crawl4AI Directory (`/crawl4ai-server`)

Contains code for the Crawl4AI server:

- `index.js` - Main server file
- `crawler.js` - Web crawler implementation
- `parser.js` - HTML parser
- `storage.js` - Storage utilities

### Crawl Results Directory (`/crawl_results`)

Contains the results of the Crawl4AI web scraping:

- `urls.json` - List of crawled URLs
- `content.json` - Extracted content
- `screenshots` - Screenshots of crawled pages

## Database Schema

The database schema includes the following tables:

1. `product_categories` - Product categories (Windows, Doors, etc.)
2. `products` - Individual products
3. `product_images` - Images for products
4. `color_options` - Color options for products
5. `testimonials` - Customer testimonials
6. `service_areas` - Service areas
7. `pages` - Static pages content
8. `blog_posts` - Blog posts
9. `form_submissions` - Form submissions
10. `contact_information` - Contact information

## Service Layer

The service layer provides functions to fetch data from the database and external sources:

1. `home-service.ts` - Functions for the home page
2. `product-service.ts` - Functions for product pages
3. `about-service.ts` - Functions for the about page
4. `contact-service.ts` - Functions for the contact page
5. `blog-service.ts` - Functions for the blog
6. `service-area-service.ts` - Functions for service areas

Each service provides functions to fetch data with fallback to placeholder data when database data is not available.

## API Routes

The API routes provide server-side functionality:

1. `/api/submit-form` - API route for form submissions
2. `/api/blog/count` - API route for getting the count of blog posts

## Deployment

The project is deployed on Netlify with the following configuration:

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Functions Directory**: `netlify/functions`
- **Framework**: Next.js

## Development

### Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project
- `npm run start` - Start the production server
- `npm run lint` - Lint the code
- `npm run context7` - Start the Context7 MCP server
- `npm run supabase-mcp` - Start the Supabase MCP server
- `npm run all-mcp` - Start all MCP servers
- `npm run dev:with-context7` - Start the development server with Context7 MCP
- `npm run dev:with-all-mcp` - Start the development server with all MCP servers
- `npm run netlify:dev` - Start the Netlify development server
- `npm run netlify:dev:with-context7` - Start the Netlify development server with Context7 MCP

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `CONTEXT7_API_KEY` - Context7 API key
- `UNSPLASH_ACCESS_KEY` - Unsplash API access key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key
