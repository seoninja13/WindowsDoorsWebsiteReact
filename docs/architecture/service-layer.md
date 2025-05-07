# Service Layer Documentation

## Overview

The service layer in the Windows Doors Website React project provides a clean separation between the UI components and the data sources. It encapsulates the logic for fetching data from the database and external sources, and provides fallback mechanisms to ensure the application works even when the database is not available.

## Service Files

### 1. `home-service.ts`

Provides functions to fetch data for the home page.

#### Functions

- `getHeroBannerData()`: Fetches hero banner data for the home page.
- `getFeaturedProducts()`: Fetches featured products for the home page.
- `getTestimonials()`: Fetches testimonials for the home page.
- `getServiceAreas()`: Fetches service areas for the home page.
- `getProductFeatures()`: Fetches product features for the home page.

#### Example Usage

```typescript
import { 
  getHeroBannerData, 
  getFeaturedProducts, 
  getTestimonials, 
  getServiceAreas,
  getProductFeatures 
} from '@/lib/services/home-service';

export default async function Home() {
  const heroSlides = await getHeroBannerData();
  const productCards = await getFeaturedProducts();
  const testimonials = await getTestimonials();
  const serviceAreas = await getServiceAreas();
  const productFeatures = await getProductFeatures();
  
  // Use the data in your component
}
```

### 2. `product-service.ts`

Provides functions to fetch product data.

#### Functions

- `getProductCategories()`: Fetches all product categories.
- `getProductCategoryBySlug(slug: string)`: Fetches a product category by slug.
- `getProductsByCategory(categorySlug: string)`: Fetches products in a specific category.
- `getProductBySlug(slug: string)`: Fetches a product by slug.
- `getRelatedProducts(productId: number, categoryId: number, limit: number = 3)`: Fetches related products for a given product.

#### Example Usage

```typescript
import { 
  getProductCategories, 
  getProductsByCategory 
} from '@/lib/services/product-service';

export default async function ProductsPage() {
  const categories = await getProductCategories();
  
  // Use the data in your component
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { category, products } = await getProductsByCategory(params.slug);
  
  // Use the data in your component
}
```

### 3. `about-service.ts`

Provides functions to fetch data for the about page.

#### Functions

- `getAboutPageData()`: Fetches about page data.

#### Example Usage

```typescript
import { getAboutPageData } from '@/lib/services/about-service';

export default async function AboutPage() {
  const aboutData = await getAboutPageData();
  
  // Use the data in your component
}
```

### 4. `contact-service.ts`

Provides functions to fetch data for the contact page and handle form submissions.

#### Functions

- `getContactPageData()`: Fetches contact page data.
- `submitContactForm(formData: ContactFormData)`: Submits a contact form.

#### Example Usage

```typescript
import { 
  getContactPageData, 
  submitContactForm 
} from '@/lib/services/contact-service';

export default async function ContactPage() {
  const contactData = await getContactPageData();
  
  // Use the data in your component
}

// In a form submission handler
const handleSubmit = async (formData: ContactFormData) => {
  try {
    await submitContactForm(formData);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### 5. `blog-service.ts`

Provides functions to fetch blog data.

#### Functions

- `getBlogPosts(page: number = 1, limit: number = 9)`: Fetches blog posts with pagination.
- `getBlogPostBySlug(slug: string)`: Fetches a blog post by slug.

#### Example Usage

```typescript
import { 
  getBlogPosts, 
  getBlogPostBySlug 
} from '@/lib/services/blog-service';

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { posts, pagination } = await getBlogPosts(page);
  
  // Use the data in your component
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { post, relatedPosts } = await getBlogPostBySlug(params.slug);
  
  // Use the data in your component
}
```

### 6. `service-area-service.ts`

Provides functions to fetch service area data.

#### Functions

- `getAllServiceAreas()`: Fetches all service areas grouped by county.
- `getServiceAreaBySlug(slug: string)`: Fetches a service area by slug.

#### Example Usage

```typescript
import { 
  getAllServiceAreas, 
  getServiceAreaBySlug 
} from '@/lib/services/service-area-service';

export default async function ServiceAreasPage() {
  const { counties } = await getAllServiceAreas();
  
  // Use the data in your component
}

export default async function ServiceAreaPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { serviceArea, testimonials, nearbyServiceAreas } = await getServiceAreaBySlug(params.slug);
  
  // Use the data in your component
}
```

## Error Handling and Fallbacks

All service functions include error handling and fallback mechanisms to ensure the application works even when the database is not available. For example:

```typescript
export async function getHeroBannerData() {
  try {
    // Try to fetch data from the database
    // ...
  } catch (error) {
    console.error('Error fetching hero banner data:', error);
    
    // Return placeholder data in case of error
    return [
      {
        id: 1,
        imageSrc: '/placeholder-hero-1.jpg',
        imageAlt: 'Modern home with beautiful windows',
        title: 'Transform Your Home with Premium Windows & Doors',
        subtitle: 'Energy-efficient solutions for every style and budget',
        primaryButtonText: 'Free Estimate',
        primaryButtonHref: '/free-estimate',
        secondaryButtonText: 'View Products',
        secondaryButtonHref: '/products',
      },
      // ...
    ];
  }
}
```

## Database Utility Functions

The service layer uses database utility functions from `lib/database.ts` to interact with Supabase:

- `fetchData<T>(table: string, options?: FetchOptions)`: Fetches data from a table with optional filters.
- `fetchById<T>(table: string, id: number)`: Fetches a record by ID.
- `fetchBySlug<T>(table: string, slug: string)`: Fetches a record by slug.
- `insertRecord<T>(table: string, record: Partial<T>)`: Inserts a record into a table.
- `updateRecord<T>(table: string, id: number, record: Partial<T>)`: Updates a record in a table.
- `deleteRecord(table: string, id: number)`: Deletes a record from a table.
- `fetchBlogPosts(limit: number = 10, offset: number = 0)`: Fetches blog posts with related data.
- `fetchProducts(limit: number = 10, offset: number = 0)`: Fetches products with related data.

## External Data Sources

In addition to the database, the service layer also fetches data from external sources:

- `fetchUnsplashImages(query: string, count: number = 1)`: Fetches images from Unsplash via Context7 MCP.

## Conclusion

The service layer provides a clean separation between the UI components and the data sources, making it easier to maintain and extend the application. It encapsulates the logic for fetching data from the database and external sources, and provides fallback mechanisms to ensure the application works even when the database is not available.
