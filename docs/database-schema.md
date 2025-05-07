# Database Schema Documentation

> **Breadcrumb Navigation**: [README.md](../README.md) > [Documentation](./index.md) > Database Schema

## Overview

This document provides a comprehensive overview of the database schema for the Windows Doors Website React project. The schema is designed to store all content from the crawled Window World LA website, including pages, products, images, navigation, blog posts, and more.

## Database Tables

### Pages

The `pages` table stores basic information about each page on the website.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| url | VARCHAR(255) | Full URL of the page (unique) |
| path | VARCHAR(255) | Path component of the URL |
| title | VARCHAR(255) | Page title |
| description | TEXT | Meta description |
| meta_keywords | TEXT | Meta keywords |
| content | TEXT | Page content |
| screenshot_url | VARCHAR(255) | URL to the page screenshot |
| has_screenshot | BOOLEAN | Whether a screenshot exists |
| is_active | BOOLEAN | Whether the page is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Product Categories

The `product_categories` table stores main product categories (Windows, Doors, Siding, Roofing).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Category name |
| slug | VARCHAR(100) | URL-friendly name (unique) |
| description | TEXT | Category description |
| image_url | VARCHAR(255) | URL to category image |
| display_order | INTEGER | Order for display |
| is_active | BOOLEAN | Whether the category is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Products

The `products` table stores individual products within each category.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| category_id | INTEGER | Foreign key to product_categories |
| name | VARCHAR(255) | Product name |
| slug | VARCHAR(255) | URL-friendly name (unique) |
| description | TEXT | Product description |
| features | TEXT[] | Array of product features |
| benefits | TEXT[] | Array of product benefits |
| specifications | JSONB | Product specifications as JSON |
| thumbnail_url | VARCHAR(255) | URL to product thumbnail |
| display_order | INTEGER | Order for display |
| is_active | BOOLEAN | Whether the product is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Product Images

The `product_images` table stores images for each product.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| product_id | INTEGER | Foreign key to products |
| image_url | VARCHAR(255) | URL to the image |
| alt_text | VARCHAR(255) | Alternative text for the image |
| is_primary | BOOLEAN | Whether this is the primary product image |
| display_order | INTEGER | Order for display |
| created_at | TIMESTAMP | Creation timestamp |

### Color Options

The `color_options` table stores color options for products.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Color name |
| hex_code | VARCHAR(7) | Hex color code |
| image_url | VARCHAR(255) | URL to color image |
| thumbnail_url | VARCHAR(255) | URL to color thumbnail |
| category | VARCHAR(50) | Color category (e.g., 'interior', 'exterior') |
| created_at | TIMESTAMP | Creation timestamp |

### Product Color Options

The `product_color_options` table represents the many-to-many relationship between products and color options.

| Column | Type | Description |
|--------|------|-------------|
| product_id | INTEGER | Foreign key to products |
| color_option_id | INTEGER | Foreign key to color_options |
| is_default | BOOLEAN | Whether this is the default color for the product |

### Navigation

The `navigation` table stores navigation menu structure.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| parent_id | INTEGER | Foreign key to navigation (self-reference) |
| name | VARCHAR(100) | Menu item name |
| url | VARCHAR(255) | URL for the menu item |
| display_order | INTEGER | Order for display |
| menu_location | VARCHAR(50) | Menu location (e.g., 'main', 'footer') |
| is_active | BOOLEAN | Whether the menu item is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Blog Posts

The `blog_posts` table stores blog articles.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| title | VARCHAR(255) | Blog post title |
| slug | VARCHAR(255) | URL-friendly name (unique) |
| excerpt | TEXT | Short excerpt of the post |
| content | TEXT | Full post content |
| featured_image_url | VARCHAR(255) | URL to featured image |
| author | VARCHAR(100) | Author name |
| published_date | TIMESTAMP | Publication date |
| is_published | BOOLEAN | Whether the post is published |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Service Areas

The `service_areas` table stores service area locations.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Location name |
| slug | VARCHAR(100) | URL-friendly name (unique) |
| description | TEXT | Location description |
| meta_title | VARCHAR(255) | SEO title |
| meta_description | TEXT | SEO description |
| content | TEXT | Page content |
| image_url | VARCHAR(255) | URL to location image |
| is_active | BOOLEAN | Whether the location is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Testimonials

The `testimonials` table stores customer reviews and testimonials.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| customer_name | VARCHAR(100) | Customer name |
| location | VARCHAR(100) | Customer location |
| rating | INTEGER | Rating (1-5) |
| review_text | TEXT | Review text |
| product_type | VARCHAR(100) | Product type reviewed |
| review_date | TIMESTAMP | Review date |
| is_featured | BOOLEAN | Whether the review is featured |
| is_approved | BOOLEAN | Whether the review is approved |
| created_at | TIMESTAMP | Creation timestamp |

### FAQ Categories

The `faq_categories` table stores FAQ categories.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Category name |
| slug | VARCHAR(100) | URL-friendly name (unique) |
| display_order | INTEGER | Order for display |
| created_at | TIMESTAMP | Creation timestamp |

### FAQs

The `faqs` table stores frequently asked questions.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| category_id | INTEGER | Foreign key to faq_categories |
| question | TEXT | Question text |
| answer | TEXT | Answer text |
| display_order | INTEGER | Order for display |
| is_active | BOOLEAN | Whether the FAQ is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Gallery Categories

The `gallery_categories` table stores gallery categories.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Category name |
| slug | VARCHAR(100) | URL-friendly name (unique) |
| description | TEXT | Category description |
| display_order | INTEGER | Order for display |
| created_at | TIMESTAMP | Creation timestamp |

### Gallery Images

The `gallery_images` table stores gallery images.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| category_id | INTEGER | Foreign key to gallery_categories |
| image_url | VARCHAR(255) | URL to the image |
| thumbnail_url | VARCHAR(255) | URL to image thumbnail |
| title | VARCHAR(255) | Image title |
| description | TEXT | Image description |
| alt_text | VARCHAR(255) | Alternative text for the image |
| display_order | INTEGER | Order for display |
| created_at | TIMESTAMP | Creation timestamp |

### Contact Information

The `contact_information` table stores contact information.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| location_name | VARCHAR(100) | Location name |
| address_line1 | VARCHAR(255) | Address line 1 |
| address_line2 | VARCHAR(255) | Address line 2 |
| city | VARCHAR(100) | City |
| state | VARCHAR(50) | State |
| zip_code | VARCHAR(20) | ZIP code |
| phone | VARCHAR(20) | Phone number |
| email | VARCHAR(100) | Email address |
| hours_of_operation | TEXT | Hours of operation |
| google_maps_url | TEXT | Google Maps URL |
| is_primary | BOOLEAN | Whether this is the primary location |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Form Submissions

The `form_submissions` table stores form submissions (contact forms, estimate requests, etc.).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| form_type | VARCHAR(50) | Form type (e.g., 'contact', 'estimate') |
| first_name | VARCHAR(100) | First name |
| last_name | VARCHAR(100) | Last name |
| email | VARCHAR(100) | Email address |
| phone | VARCHAR(20) | Phone number |
| address | VARCHAR(255) | Address |
| city | VARCHAR(100) | City |
| state | VARCHAR(50) | State |
| zip_code | VARCHAR(20) | ZIP code |
| message | TEXT | Message text |
| product_interest | VARCHAR(100) | Product of interest |
| submission_data | JSONB | Additional form data as JSON |
| ip_address | VARCHAR(45) | IP address |
| user_agent | TEXT | User agent |
| is_processed | BOOLEAN | Whether the submission has been processed |
| created_at | TIMESTAMP | Creation timestamp |

## Entity Relationship Diagram

```
pages
  |
  |-- products <-- product_categories
  |     |
  |     |-- product_images
  |     |
  |     |-- product_color_options --> color_options
  |
  |-- blog_posts
  |
  |-- service_areas
  |
  |-- navigation
  |
  |-- testimonials
  |
  |-- faqs <-- faq_categories
  |
  |-- gallery_images <-- gallery_categories
  |
  |-- contact_information
  |
  |-- form_submissions
```

## Database Setup

To set up the database, run the following commands:

```bash
# Set up the database schema
npm run setup:db

# Populate the database with data from the crawled website
npm run populate:db

# Or run both commands in sequence
npm run db:reset
```

## Indexes

The following indexes are created for better performance:

- `idx_pages_path` on `pages(path)`
- `idx_products_category_id` on `products(category_id)`
- `idx_product_images_product_id` on `product_images(product_id)`
- `idx_navigation_parent_id` on `navigation(parent_id)`
- `idx_blog_posts_slug` on `blog_posts(slug)`
- `idx_service_areas_slug` on `service_areas(slug)`
- `idx_faqs_category_id` on `faqs(category_id)`
- `idx_gallery_images_category_id` on `gallery_images(category_id)`
