# UI Components Documentation

## Overview

This document provides a detailed description of the UI components used in the Windows Doors Website React project. The components are designed to be exact visual replicas of the Window World LA website components, ensuring a consistent user experience.

## Component Structure

The UI components are organized in the `/components/ui` directory and follow a modular approach to promote reusability and maintainability.

## Core Components

### 1. `Button.tsx`

A versatile button component that supports different variants, sizes, and states.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | Button size |
| `className` | `string` | Additional CSS classes |
| `children` | `React.ReactNode` | Button content |
| `asChild` | `boolean` | Whether to render as a child component |
| `...props` | `ButtonHTMLAttributes<HTMLButtonElement>` | HTML button attributes |

#### Example Usage

```tsx
import { Button } from '@/components/ui/Button';

// Primary button
<Button variant="primary">Get a Free Estimate</Button>

// Secondary button
<Button variant="secondary">Learn More</Button>

// As a link
<Button asChild>
  <Link href="/contact">Contact Us</Link>
</Button>
```

### 2. `Container.tsx`

A container component that provides consistent padding and maximum width.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `children` | `React.ReactNode` | Container content |

#### Example Usage

```tsx
import { Container } from '@/components/ui/Container';

<Container>
  <h1>Welcome to Window World</h1>
  <p>America's #1 Replacement Window Company</p>
</Container>
```

### 3. `HeroBanner.tsx`

A hero banner component with a slider for the home page.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `slides` | `HeroSlide[]` | Array of slide data |

#### Example Usage

```tsx
import { HeroBanner } from '@/components/ui/HeroBanner';

const slides = [
  {
    id: 1,
    imageSrc: '/hero-1.jpg',
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

<HeroBanner slides={slides} />
```

### 4. `ProductCard.tsx`

A card component for displaying product information.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Product title |
| `description` | `string` | Product description |
| `imageSrc` | `string` | Product image URL |
| `imageAlt` | `string` | Product image alt text |
| `features` | `string[]` | Array of product features |
| `ctaText` | `string` | Call-to-action text |
| `ctaHref` | `string` | Call-to-action link |

#### Example Usage

```tsx
import { ProductCard } from '@/components/ui/ProductCard';

<ProductCard
  title="Replacement Windows"
  description="Energy-efficient windows in a variety of styles to complement any home."
  imageSrc="/windows.jpg"
  imageAlt="Modern replacement windows"
  features={['Energy Efficient', 'Multiple Styles', 'Custom Sizes', 'Lifetime Warranty']}
  ctaText="Explore Windows"
  ctaHref="/products/windows"
/>
```

### 5. `TestimonialSection.tsx`

A section component for displaying customer testimonials.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `testimonials` | `Testimonial[]` | Array of testimonial data |

#### Example Usage

```tsx
import { TestimonialSection } from '@/components/ui/TestimonialSection';

const testimonials = [
  {
    id: 1,
    quote: "We couldn't be happier with our new windows!",
    author: "Michael & Sarah Johnson",
    location: "Los Angeles, CA",
    rating: 5,
    imageSrc: '/testimonial-1.jpg',
  },
  // More testimonials...
];

<TestimonialSection testimonials={testimonials} />
```

### 6. `FreeEstimateForm.tsx`

A form component for requesting a free estimate.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

#### Example Usage

```tsx
import { FreeEstimateForm } from '@/components/ui/FreeEstimateForm';

<FreeEstimateForm className="my-8" />
```

### 7. `ServiceAreas.tsx`

A component for displaying service areas grouped by county.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `counties` | `County[]` | Array of county data |
| `cities` | `City[]` | Array of city data |
| `images` | `Image[]` | Array of service area images |

#### Example Usage

```tsx
import { ServiceAreas } from '@/components/ui/ServiceAreas';

<ServiceAreas
  counties={counties}
  cities={cities}
  images={images}
/>
```

### 8. `ProductFeatures.tsx`

A component for displaying product features.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Section title |
| `description` | `string` | Section description |
| `features` | `Feature[]` | Array of feature data |

#### Example Usage

```tsx
import { ProductFeatures } from '@/components/ui/ProductFeatures';

<ProductFeatures
  title="Why Choose Our Windows & Doors"
  description="Our products are designed to provide superior performance, energy efficiency, and lasting beauty for your home."
  features={[
    {
      id: 1,
      title: "Energy Efficiency",
      description: "Our windows and doors are ENERGY STAR® certified to help reduce your energy costs and improve comfort.",
      icon: "⚡",
    },
    // More features...
  ]}
/>
```

### 9. `Header.tsx`

A header component with navigation menu.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

#### Example Usage

```tsx
import { Header } from '@/components/ui/Header';

<Header />
```

### 10. `Footer.tsx`

A footer component with contact information and links.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

#### Example Usage

```tsx
import { Footer } from '@/components/ui/Footer';

<Footer />
```

## Page-Specific Components

### 1. `ProductCategoryPage.tsx`

A component for displaying a product category page.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `category` | `ProductCategory` | Category data |
| `products` | `Product[]` | Array of product data |

#### Example Usage

```tsx
import { ProductCategoryPage } from '@/components/pages/ProductCategoryPage';

<ProductCategoryPage
  category={category}
  products={products}
/>
```

### 2. `ProductDetailPage.tsx`

A component for displaying a product detail page.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `product` | `Product` | Product data |
| `category` | `ProductCategory` | Category data |
| `images` | `ProductImage[]` | Array of product images |
| `colorOptions` | `ColorOption[]` | Array of color options |
| `relatedProducts` | `Product[]` | Array of related products |

#### Example Usage

```tsx
import { ProductDetailPage } from '@/components/pages/ProductDetailPage';

<ProductDetailPage
  product={product}
  category={category}
  images={images}
  colorOptions={colorOptions}
  relatedProducts={relatedProducts}
/>
```

### 3. `AboutPage.tsx`

A component for displaying the about page.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `AboutPageData` | About page data |

#### Example Usage

```tsx
import { AboutPage } from '@/components/pages/AboutPage';

<AboutPage data={aboutData} />
```

### 4. `ContactPage.tsx`

A component for displaying the contact page.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `ContactPageData` | Contact page data |

#### Example Usage

```tsx
import { ContactPage } from '@/components/pages/ContactPage';

<ContactPage data={contactData} />
```

### 5. `BlogPage.tsx`

A component for displaying the blog page.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `posts` | `BlogPost[]` | Array of blog posts |
| `pagination` | `Pagination` | Pagination data |

#### Example Usage

```tsx
import { BlogPage } from '@/components/pages/BlogPage';

<BlogPage
  posts={posts}
  pagination={pagination}
/>
```

### 6. `BlogPostPage.tsx`

A component for displaying a blog post page.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `post` | `BlogPost` | Blog post data |
| `relatedPosts` | `BlogPost[]` | Array of related posts |

#### Example Usage

```tsx
import { BlogPostPage } from '@/components/pages/BlogPostPage';

<BlogPostPage
  post={post}
  relatedPosts={relatedPosts}
/>
```

## Utility Components

### 1. `Slider.tsx`

A reusable slider component.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `slides` | `React.ReactNode[]` | Array of slide content |
| `autoPlay` | `boolean` | Whether to auto-play the slider |
| `interval` | `number` | Auto-play interval in milliseconds |

#### Example Usage

```tsx
import { Slider } from '@/components/ui/Slider';

<Slider
  slides={[
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ]}
  autoPlay={true}
  interval={5000}
/>
```

### 2. `Tabs.tsx`

A reusable tabs component.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `Tab[]` | Array of tab data |
| `defaultTab` | `string` | Default active tab ID |

#### Example Usage

```tsx
import { Tabs } from '@/components/ui/Tabs';

<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Tab 1 content</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Tab 2 content</div> },
    { id: 'tab3', label: 'Tab 3', content: <div>Tab 3 content</div> },
  ]}
  defaultTab="tab1"
/>
```

## Conclusion

The UI components in the Windows Doors Website React project are designed to be exact visual replicas of the Window World LA website components, ensuring a consistent user experience. They follow a modular approach to promote reusability and maintainability, and are organized in a logical directory structure.
