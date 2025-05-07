# API Routes Documentation

## Overview

This document provides a detailed description of the API routes used in the Windows Doors Website React project. The API routes are implemented using Next.js API routes and provide server-side functionality for the application.

## API Routes

### 1. `/api/submit-form`

Handles form submissions from the contact and free estimate forms.

#### Request

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "form_type": "contact",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "address": "123 Main St",
    "city": "Los Angeles",
    "state": "CA",
    "zip_code": "90001",
    "message": "I'm interested in replacement windows for my home.",
    "product_interest": "windows",
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0 ..."
  }
  ```

#### Response

- **Success (201)**:
  ```json
  {
    "data": {
      "id": 1,
      "form_type": "contact",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "address": "123 Main St",
      "city": "Los Angeles",
      "state": "CA",
      "zip_code": "90001",
      "message": "I'm interested in replacement windows for my home.",
      "product_interest": "windows",
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0 ...",
      "is_processed": false,
      "created_at": "2023-01-01T00:00:00.000Z"
    },
    "success": true
  }
  ```

- **Error (400)**:
  ```json
  {
    "error": {
      "message": "Form type is required"
    }
  }
  ```

- **Error (500)**:
  ```json
  {
    "error": {
      "message": "Failed to submit form"
    }
  }
  ```

#### Implementation

```typescript
// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { insertRecord } from '@/lib/database';
import { FormSubmission } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.json();
    
    // Validate the form data
    if (!formData.form_type) {
      return NextResponse.json(
        { error: { message: 'Form type is required' } },
        { status: 400 }
      );
    }
    
    // ... more validation
    
    // Add IP address and user agent if not provided
    if (!formData.ip_address) {
      formData.ip_address = request.headers.get('x-forwarded-for') || request.ip || '';
    }
    
    if (!formData.user_agent) {
      formData.user_agent = request.headers.get('user-agent') || '';
    }
    
    // Insert the form submission into the database
    const data = await insertRecord<FormSubmission>('form_submissions', formData);
    
    if (!data) {
      throw new Error('Failed to insert form submission');
    }
    
    // Return success response
    return NextResponse.json(
      { data, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Return error response
    return NextResponse.json(
      { error: { message: 'Failed to submit form' } },
      { status: 500 }
    );
  }
}
```

### 2. `/api/blog/count`

Returns the count of published blog posts.

#### Request

- **Method**: `GET`

#### Response

- **Success (200)**:
  ```json
  {
    "count": 10,
    "success": true
  }
  ```

- **Error (500)**:
  ```json
  {
    "error": {
      "message": "Failed to get blog post count"
    }
  }
  ```

#### Implementation

```typescript
// app/api/blog/count/route.ts
import { NextResponse } from 'next/server';
import supabase from '@/lib/database';

export async function GET() {
  try {
    // Get the count of published blog posts
    const { count, error } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true);
    
    if (error) {
      throw error;
    }
    
    // Return the count
    return NextResponse.json(
      { count, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting blog post count:', error);
    
    // Return error response
    return NextResponse.json(
      { error: { message: 'Failed to get blog post count' } },
      { status: 500 }
    );
  }
}
```

### 3. `/api/products`

Returns a list of products, optionally filtered by category.

#### Request

- **Method**: `GET`
- **Query Parameters**:
  - `category`: (optional) Category slug to filter by
  - `limit`: (optional) Maximum number of products to return
  - `offset`: (optional) Offset for pagination

#### Response

- **Success (200)**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Double-Hung Windows",
        "slug": "double-hung-windows",
        "description": "Our most popular window style...",
        "features": ["Energy Efficient", "Easy to Clean"],
        "category": {
          "id": 1,
          "name": "Windows",
          "slug": "windows"
        },
        "image_url": "/images/products/double-hung-windows.jpg"
      },
      // More products...
    ],
    "success": true
  }
  ```

- **Error (500)**:
  ```json
  {
    "error": {
      "message": "Failed to get products"
    }
  }
  ```

#### Implementation

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;
    
    // Fetch products
    const products = await fetchProducts(limit, offset);
    
    // Filter by category if provided
    const filteredProducts = category
      ? products.filter(product => product.product_categories.slug === category)
      : products;
    
    // Return the products
    return NextResponse.json(
      { data: filteredProducts, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting products:', error);
    
    // Return error response
    return NextResponse.json(
      { error: { message: 'Failed to get products' } },
      { status: 500 }
    );
  }
}
```

### 4. `/api/products/[slug]`

Returns a specific product by slug.

#### Request

- **Method**: `GET`
- **URL Parameters**:
  - `slug`: Product slug

#### Response

- **Success (200)**:
  ```json
  {
    "data": {
      "id": 1,
      "name": "Double-Hung Windows",
      "slug": "double-hung-windows",
      "description": "Our most popular window style...",
      "features": ["Energy Efficient", "Easy to Clean"],
      "category": {
        "id": 1,
        "name": "Windows",
        "slug": "windows"
      },
      "images": [
        {
          "id": 1,
          "image_url": "/images/products/double-hung-windows-1.jpg",
          "alt_text": "Double-Hung Windows - Image 1",
          "is_primary": true
        },
        // More images...
      ],
      "colorOptions": [
        {
          "id": 1,
          "name": "White",
          "hex_code": "#FFFFFF",
          "image_url": "/images/colors/white.jpg"
        },
        // More color options...
      ]
    },
    "success": true
  }
  ```

- **Error (404)**:
  ```json
  {
    "error": {
      "message": "Product not found"
    }
  }
  ```

- **Error (500)**:
  ```json
  {
    "error": {
      "message": "Failed to get product"
    }
  }
  ```

#### Implementation

```typescript
// app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchBySlug } from '@/lib/database';
import { Product, ProductCategory, ProductImage, ColorOption } from '@/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // Fetch the product
    const product = await fetchBySlug<Product>('products', slug);
    
    if (!product) {
      return NextResponse.json(
        { error: { message: 'Product not found' } },
        { status: 404 }
      );
    }
    
    // Fetch the category
    const category = await fetchById<ProductCategory>('product_categories', product.category_id);
    
    // Fetch the images
    const images = await fetchData<ProductImage>('product_images', {
      eq: ['product_id', product.id],
      order: ['is_primary', 'desc']
    });
    
    // Fetch the color options
    const colorOptions = await fetchData<ColorOption>('color_options', {
      limit: 10
    });
    
    // Return the product with related data
    return NextResponse.json(
      {
        data: {
          ...product,
          category,
          images,
          colorOptions
        },
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting product:', error);
    
    // Return error response
    return NextResponse.json(
      { error: { message: 'Failed to get product' } },
      { status: 500 }
    );
  }
}
```

## Conclusion

The API routes in the Windows Doors Website React project provide server-side functionality for the application, including form submissions and data retrieval. They are implemented using Next.js API routes and follow RESTful principles.
