# Database Schema Documentation

## Overview

This document provides a detailed description of the database schema for the Windows Doors Website React project. The database is implemented using Supabase, a PostgreSQL-based backend as a service.

## Tables

### 1. `product_categories`

Stores information about product categories such as Windows, Doors, Siding, etc.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `name` | `text` | Category name (e.g., "Windows", "Doors") |
| `slug` | `text` | URL-friendly version of the name (e.g., "windows", "doors") |
| `description` | `text` | Category description |
| `image_url` | `text` | URL to the category image |
| `display_order` | `integer` | Order in which to display the category |
| `is_active` | `boolean` | Whether the category is active |
| `created_at` | `timestamp` | Creation timestamp |
| `updated_at` | `timestamp` | Last update timestamp |

### 2. `products`

Stores information about individual products.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `category_id` | `integer` | Foreign key to `product_categories` |
| `name` | `text` | Product name |
| `slug` | `text` | URL-friendly version of the name |
| `description` | `text` | Product description |
| `features` | `jsonb` | Array of product features |
| `benefits` | `jsonb` | Array of product benefits |
| `specifications` | `jsonb` | Product specifications |
| `thumbnail_url` | `text` | URL to the product thumbnail |
| `display_order` | `integer` | Order in which to display the product |
| `is_active` | `boolean` | Whether the product is active |
| `created_at` | `timestamp` | Creation timestamp |
| `updated_at` | `timestamp` | Last update timestamp |

### 3. `product_images`

Stores images for products.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `product_id` | `integer` | Foreign key to `products` |
| `image_url` | `text` | URL to the image |
| `alt_text` | `text` | Alternative text for the image |
| `is_primary` | `boolean` | Whether this is the primary image for the product |
| `display_order` | `integer` | Order in which to display the image |
| `created_at` | `timestamp` | Creation timestamp |

### 4. `color_options`

Stores color options for products.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `name` | `text` | Color name |
| `hex_code` | `text` | Hex color code |
| `image_url` | `text` | URL to the color image |
| `thumbnail_url` | `text` | URL to the color thumbnail |
| `category` | `text` | Color category (e.g., "exterior", "interior") |
| `created_at` | `timestamp` | Creation timestamp |

### 5. `testimonials`

Stores customer testimonials.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `customer_name` | `text` | Customer name |
| `location` | `text` | Customer location |
| `review_text` | `text` | Testimonial text |
| `rating` | `integer` | Rating (1-5) |
| `is_featured` | `boolean` | Whether the testimonial is featured |
| `created_at` | `timestamp` | Creation timestamp |

### 6. `service_areas`

Stores service areas.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `name` | `text` | Service area name (e.g., "Los Angeles, CA") |
| `slug` | `text` | URL-friendly version of the name |
| `description` | `text` | Service area description |
| `meta_title` | `text` | SEO meta title |
| `meta_description` | `text` | SEO meta description |
| `content` | `text` | HTML content for the service area page |
| `image_url` | `text` | URL to the service area image |
| `is_active` | `boolean` | Whether the service area is active |
| `created_at` | `timestamp` | Creation timestamp |
| `updated_at` | `timestamp` | Last update timestamp |

### 7. `pages`

Stores content for static pages.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `title` | `text` | Page title |
| `slug` | `text` | URL-friendly version of the title |
| `description` | `text` | Page description |
| `content` | `text` | HTML content for the page |
| `meta_title` | `text` | SEO meta title |
| `meta_description` | `text` | SEO meta description |
| `screenshot_url` | `text` | URL to the page screenshot |
| `is_published` | `boolean` | Whether the page is published |
| `created_at` | `timestamp` | Creation timestamp |
| `updated_at` | `timestamp` | Last update timestamp |

### 8. `blog_posts`

Stores blog posts.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `title` | `text` | Blog post title |
| `slug` | `text` | URL-friendly version of the title |
| `excerpt` | `text` | Blog post excerpt |
| `content` | `text` | HTML content for the blog post |
| `featured_image_url` | `text` | URL to the featured image |
| `author` | `text` | Author name |
| `published_date` | `timestamp` | Publication date |
| `is_published` | `boolean` | Whether the blog post is published |
| `created_at` | `timestamp` | Creation timestamp |
| `updated_at` | `timestamp` | Last update timestamp |

### 9. `form_submissions`

Stores form submissions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `form_type` | `text` | Type of form (e.g., "contact", "estimate") |
| `first_name` | `text` | First name |
| `last_name` | `text` | Last name |
| `email` | `text` | Email address |
| `phone` | `text` | Phone number |
| `address` | `text` | Address |
| `city` | `text` | City |
| `state` | `text` | State |
| `zip_code` | `text` | ZIP code |
| `message` | `text` | Message |
| `product_interest` | `text` | Product of interest |
| `ip_address` | `text` | IP address |
| `user_agent` | `text` | User agent |
| `is_processed` | `boolean` | Whether the submission has been processed |
| `created_at` | `timestamp` | Creation timestamp |

### 10. `contact_information`

Stores contact information for locations.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `integer` | Primary key |
| `location_name` | `text` | Location name |
| `address_line1` | `text` | Address line 1 |
| `address_line2` | `text` | Address line 2 |
| `city` | `text` | City |
| `state` | `text` | State |
| `zip_code` | `text` | ZIP code |
| `phone` | `text` | Phone number |
| `email` | `text` | Email address |
| `hours_of_operation` | `text` | Hours of operation |
| `google_maps_url` | `text` | Google Maps embed URL |
| `is_primary` | `boolean` | Whether this is the primary location |
| `created_at` | `timestamp` | Creation timestamp |
| `updated_at` | `timestamp` | Last update timestamp |

## Relationships

1. `products.category_id` → `product_categories.id`
2. `product_images.product_id` → `products.id`

## Indexes

1. `product_categories_slug_idx` on `product_categories.slug`
2. `products_slug_idx` on `products.slug`
3. `service_areas_slug_idx` on `service_areas.slug`
4. `pages_slug_idx` on `pages.slug`
5. `blog_posts_slug_idx` on `blog_posts.slug`

## Database Functions

### `get_products_by_category(category_slug text)`

Returns products in a specific category.

```sql
CREATE OR REPLACE FUNCTION get_products_by_category(category_slug text)
RETURNS TABLE (
  id integer,
  name text,
  slug text,
  description text,
  features jsonb,
  category_name text,
  category_slug text,
  image_url text
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.slug,
    p.description,
    p.features,
    pc.name as category_name,
    pc.slug as category_slug,
    pi.image_url
  FROM
    products p
    JOIN product_categories pc ON p.category_id = pc.id
    LEFT JOIN (
      SELECT DISTINCT ON (product_id) product_id, image_url
      FROM product_images
      ORDER BY product_id, is_primary DESC
    ) pi ON p.id = pi.product_id
  WHERE
    pc.slug = category_slug
    AND p.is_active = true
  ORDER BY
    p.display_order ASC;
END;
$$ LANGUAGE plpgsql;
```
