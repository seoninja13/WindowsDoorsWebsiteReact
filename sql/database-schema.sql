-- SQL Script for Creating Database Schema for Windows Doors Website React
-- This script creates tables for storing content from the Window World LA website

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Pages Table
-- Stores basic information about each page on the website
CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL UNIQUE,
    path VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    meta_keywords TEXT,
    content TEXT,
    screenshot_url VARCHAR(255),
    has_screenshot BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Categories Table
-- Stores main product categories (Windows, Doors, Siding, Roofing)
CREATE TABLE IF NOT EXISTS product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    display_order INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
-- Stores individual products within each category
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES product_categories(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    features TEXT[],
    benefits TEXT[],
    specifications JSONB,
    thumbnail_url VARCHAR(255),
    display_order INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Images Table
-- Stores images for each product
CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Color Options Table
-- Stores color options for products
CREATE TABLE IF NOT EXISTS color_options (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    hex_code VARCHAR(7),
    image_url VARCHAR(255),
    thumbnail_url VARCHAR(255),
    category VARCHAR(50), -- e.g., 'interior', 'exterior', 'frame', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Color Options Table
-- Many-to-many relationship between products and color options
CREATE TABLE IF NOT EXISTS product_color_options (
    product_id INTEGER REFERENCES products(id),
    color_option_id INTEGER REFERENCES color_options(id),
    is_default BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (product_id, color_option_id)
);

-- Navigation Table
-- Stores navigation menu structure
CREATE TABLE IF NOT EXISTS navigation (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES navigation(id),
    name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    display_order INTEGER,
    menu_location VARCHAR(50), -- e.g., 'main', 'footer', 'mobile'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
-- Stores blog articles
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url VARCHAR(255),
    author VARCHAR(100),
    published_date TIMESTAMP WITH TIME ZONE,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Areas Table
-- Stores service area locations
CREATE TABLE IF NOT EXISTS service_areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    content TEXT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
-- Stores customer reviews and testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    product_type VARCHAR(100),
    review_date TIMESTAMP WITH TIME ZONE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ Categories Table
-- Stores FAQ categories
CREATE TABLE IF NOT EXISTS faq_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs Table
-- Stores frequently asked questions
CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES faq_categories(id),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Categories Table
-- Stores gallery categories
CREATE TABLE IF NOT EXISTS gallery_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Images Table
-- Stores gallery images
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES gallery_categories(id),
    image_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    alt_text VARCHAR(255),
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Information Table
-- Stores contact information
CREATE TABLE IF NOT EXISTS contact_information (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(100),
    hours_of_operation TEXT,
    google_maps_url TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form Submissions Table
-- Stores form submissions (contact forms, estimate requests, etc.)
CREATE TABLE IF NOT EXISTS form_submissions (
    id SERIAL PRIMARY KEY,
    form_type VARCHAR(50) NOT NULL, -- e.g., 'contact', 'estimate', 'survey'
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    message TEXT,
    product_interest VARCHAR(100),
    submission_data JSONB, -- Additional form data
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_pages_path ON pages(path);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_navigation_parent_id ON navigation(parent_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_service_areas_slug ON service_areas(slug);
CREATE INDEX idx_faqs_category_id ON faqs(category_id);
CREATE INDEX idx_gallery_images_category_id ON gallery_images(category_id);
