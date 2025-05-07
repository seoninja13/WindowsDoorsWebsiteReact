/**
 * Database Types for Windows Doors Website React
 * 
 * This file contains TypeScript interfaces that correspond to the database schema.
 * These types help maintain type safety when working with database data in the application.
 */

export interface Page {
  id: number;
  url: string;
  path: string;
  title: string;
  description: string | null;
  meta_keywords: string | null;
  content: string | null;
  screenshot_url: string | null;
  has_screenshot: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  features: string[] | null;
  benefits: string[] | null;
  specifications: Record<string, any> | null;
  thumbnail_url: string | null;
  display_order: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  display_order: number | null;
  created_at: string;
}

export interface ColorOption {
  id: number;
  name: string;
  hex_code: string | null;
  image_url: string | null;
  thumbnail_url: string | null;
  category: string | null;
  created_at: string;
}

export interface ProductColorOption {
  product_id: number;
  color_option_id: number;
  is_default: boolean;
}

export interface NavigationItem {
  id: number;
  parent_id: number | null;
  name: string;
  url: string;
  display_order: number | null;
  menu_location: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author: string | null;
  published_date: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceArea {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  content: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  location: string | null;
  rating: number | null;
  review_text: string;
  product_type: string | null;
  review_date: string | null;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface FaqCategory {
  id: number;
  name: string;
  slug: string;
  display_order: number | null;
  created_at: string;
}

export interface Faq {
  id: number;
  category_id: number | null;
  question: string;
  answer: string;
  display_order: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  display_order: number | null;
  created_at: string;
}

export interface GalleryImage {
  id: number;
  category_id: number | null;
  image_url: string;
  thumbnail_url: string | null;
  title: string | null;
  description: string | null;
  alt_text: string | null;
  display_order: number | null;
  created_at: string;
}

export interface ContactInformation {
  id: number;
  location_name: string;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  phone: string | null;
  email: string | null;
  hours_of_operation: string | null;
  google_maps_url: string | null;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface FormSubmission {
  id: number;
  form_type: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  message: string | null;
  product_interest: string | null;
  submission_data: Record<string, any> | null;
  ip_address: string | null;
  user_agent: string | null;
  is_processed: boolean;
  created_at: string;
}

// Database interface that includes all tables
export interface Database {
  pages: Page[];
  product_categories: ProductCategory[];
  products: Product[];
  product_images: ProductImage[];
  color_options: ColorOption[];
  product_color_options: ProductColorOption[];
  navigation: NavigationItem[];
  blog_posts: BlogPost[];
  service_areas: ServiceArea[];
  testimonials: Testimonial[];
  faq_categories: FaqCategory[];
  faqs: Faq[];
  gallery_categories: GalleryCategory[];
  gallery_images: GalleryImage[];
  contact_information: ContactInformation[];
  form_submissions: FormSubmission[];
}
