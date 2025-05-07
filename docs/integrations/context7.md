# Context7 Integration Documentation

## Overview

This document provides a detailed description of the Context7 integration in the Windows Doors Website React project. Context7 is used as a foundation for accessing other MCP (Model Control Protocol) servers, including Unsplash for images.

## Context7 MCP Server

The Context7 MCP server provides access to various knowledge bases and services, including Unsplash for images. It is used in the project to fetch images for the website.

### Server Configuration

The Context7 MCP server is configured in the `start-context7.js` file:

```javascript
// start-context7.js
const { spawn } = require('child_process');
const path = require('path');

// Start the Context7 MCP server
const context7Process = spawn('node', [path.join(__dirname, 'context7-mcp-server/index.js')], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: 3001,
    API_KEY: process.env.CONTEXT7_API_KEY,
  },
});

// Handle process exit
context7Process.on('exit', (code) => {
  console.log(`Context7 MCP server exited with code ${code}`);
});

// Handle process errors
context7Process.on('error', (err) => {
  console.error('Failed to start Context7 MCP server:', err);
});
```

## Context7 Utility Functions

The Context7 utility functions are implemented in the `/lib/utils/context7.ts` file and provide functionality for interacting with the Context7 MCP server.

### Unsplash Image Fetching

The `fetchUnsplashImages` function fetches images from Unsplash via the Context7 MCP server:

```typescript
// lib/utils/context7.ts
import axios from 'axios';

/**
 * Fetches images from Unsplash via Context7 MCP
 * @param query The search query for Unsplash
 * @param count The number of images to fetch
 * @returns An array of image URLs
 */
export async function fetchUnsplashImages(query: string, count: number = 1): Promise<string[]> {
  try {
    // Make a request to the Context7 MCP server
    const response = await axios.post('http://localhost:3001/api/unsplash', {
      query,
      count,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CONTEXT7_API_KEY}`,
      },
    });

    // Extract the image URLs from the response
    const images = response.data.images || [];

    // Return the image URLs
    return images.map((image: any) => image.urls.regular);
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return [];
  }
}
```

## Using Context7 in the Application

The Context7 integration is used throughout the application to fetch images for various components:

### 1. Home Page

The home page uses Context7 to fetch images for the hero banner, product cards, testimonials, and service areas:

```typescript
// lib/services/home-service.ts
import { fetchUnsplashImages } from '@/lib/utils/context7';

/**
 * Fetches hero banner data from the database
 * @returns Hero banner data for the home page
 */
export async function getHeroBannerData() {
  try {
    // For now, we'll continue using Unsplash images
    // In a real implementation, we would fetch this from the database
    const heroImages = await fetchUnsplashImages('modern home exterior with large windows', 3);
    
    // Create hero slides with the images
    const heroSlides = [
      {
        id: 1,
        imageSrc: heroImages[0] || '/placeholder-hero-1.jpg',
        imageAlt: 'Modern home with beautiful windows',
        title: 'Transform Your Home with Premium Windows & Doors',
        subtitle: 'Energy-efficient solutions for every style and budget',
        primaryButtonText: 'Free Estimate',
        primaryButtonHref: '/free-estimate',
        secondaryButtonText: 'View Products',
        secondaryButtonHref: '/products',
      },
      // More slides...
    ];
    
    return heroSlides;
  } catch (error) {
    console.error('Error fetching hero banner data:', error);
    return [];
  }
}
```

### 2. Product Pages

The product pages use Context7 to fetch images for products:

```typescript
// lib/services/product-service.ts
import { fetchUnsplashImages } from '@/lib/utils/context7';

/**
 * Fetches a product by slug
 * @param slug The slug of the product to fetch
 * @returns The product with its images and related data
 */
export async function getProductBySlug(slug: string) {
  try {
    const product = await fetchBySlug<Product>('products', slug);
    
    if (!product) {
      throw new Error(`Product with slug ${slug} not found`);
    }
    
    // Fetch the product category
    const category = await fetchById<ProductCategory>('product_categories', product.category_id);
    
    if (!category) {
      throw new Error(`Category with id ${product.category_id} not found`);
    }
    
    // Fetch product images
    const images = await fetchData<ProductImage>('product_images', {
      eq: ['product_id', product.id],
      order: ['is_primary', 'desc']
    });
    
    // If no images found, use Unsplash
    let productImages = images;
    if (images.length === 0) {
      const unsplashImages = await fetchUnsplashImages(
        `${product.name} ${category.name}`,
        3
      );
      
      productImages = unsplashImages.map((src, index) => ({
        id: index + 1,
        product_id: product.id,
        image_url: src || `/placeholder-${category.slug}.jpg`,
        alt_text: `${product.name} - Image ${index + 1}`,
        is_primary: index === 0,
        display_order: index,
        created_at: new Date().toISOString()
      }));
    }
    
    // Fetch color options if available
    const colorOptions = await fetchData<ColorOption>('color_options', {
      limit: 10
    });
    
    return {
      product,
      category,
      images: productImages,
      colorOptions
    };
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    
    // Return placeholder data in case of error
    // ...
  }
}
```

### 3. About Page

The about page uses Context7 to fetch images for the hero banner, team section, and history section:

```typescript
// lib/services/about-service.ts
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
      
      // More sections...
    };
  } catch (error) {
    console.error('Error fetching about page data:', error);
    
    // Return placeholder data in case of error
    // ...
  }
}
```

### 4. Blog

The blog uses Context7 to fetch images for blog posts:

```typescript
// lib/services/blog-service.ts
import { fetchUnsplashImages } from '@/lib/utils/context7';

/**
 * Fetches a blog post by slug
 * @param slug The slug of the blog post to fetch
 * @returns The blog post
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await fetchBySlug<BlogPost>('blog_posts', slug);
    
    if (!post) {
      throw new Error(`Blog post with slug ${slug} not found`);
    }
    
    // Fetch image from Unsplash if not available
    if (!post.featured_image_url) {
      const images = await fetchUnsplashImages(
        `${post.title} home improvement`,
        1
      );
      
      post.featured_image_url = images[0] || '/placeholder-blog-post.jpg';
    }
    
    // Fetch related posts
    const relatedPosts = await fetchData<BlogPost>('blog_posts', {
      eq: ['is_published', true],
      limit: 3
    });
    
    // Filter out the current post from related posts
    const filteredRelatedPosts = relatedPosts.filter(relatedPost => relatedPost.id !== post.id);
    
    // Fetch images for related posts if needed
    const relatedPostsWithImages = await Promise.all(filteredRelatedPosts.map(async (relatedPost, index) => {
      if (!relatedPost.featured_image_url) {
        const images = await fetchUnsplashImages(
          `${relatedPost.title} home improvement`,
          1
        );
        
        return {
          ...relatedPost,
          featured_image_url: images[0] || `/placeholder-related-${index + 1}.jpg`
        };
      }
      
      return relatedPost;
    }));
    
    return {
      post,
      relatedPosts: relatedPostsWithImages
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    
    // Return placeholder data in case of error
    // ...
  }
}
```

## Running the Context7 MCP Server

The Context7 MCP server can be run in several ways:

### 1. Standalone

```bash
node start-context7.js
```

### 2. With Next.js Development Server

```bash
npm run dev:with-context7
```

### 3. With Netlify Development Server

```bash
npm run netlify:dev:with-context7
```

## Conclusion

The Context7 integration in the Windows Doors Website React project enables the fetching of images from Unsplash for various components of the application. It provides a clean and consistent way to access external services and ensures that the application has high-quality images even when the database does not have them.
