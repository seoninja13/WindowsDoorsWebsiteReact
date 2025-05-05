# Website Architecture

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > Website Architecture

## Overview

This document outlines the architecture of the Windows Doors Website React project, including system components, data flow, and deployment strategy.

## System Architecture

```mermaid
graph TD
    subgraph "Frontend (Next.js)"
        A[Next.js App Router] --> B[Dynamic Routes]
        B --> C1[Product Pages]
        B --> C2[Gallery Pages]
        B --> C3[Static Pages]

        D[Components] --> D1[ProductCatalog]
        D --> D2[QuoteForm]
        D --> D3[Gallery]
        D --> D4[ContactForm]
        D --> D5[Testimonials]
    end

    subgraph "Data Sources"
        F[CMS] --> F1[Product Data]
        F --> F2[Content]
        F --> F3[Images]

        G[Database] --> G1[User Data]
        G --> G2[Quote Requests]
        G --> G3[Analytics]
        G --> G4[Testimonials]
    end

    subgraph "API Layer"
        H[API Routes] --> H1[/api/products]
        H --> H2[/api/quotes]
        H --> H3[/api/contact]
        H --> H4[/api/testimonials]

        I[External APIs] --> I1[Email Service]
        I --> I2[Analytics]
        I --> I3[CRM Integration]
    end

    A --> H
    H --> F
    H --> G
    H --> I
```

## Component Architecture

```mermaid
graph TD
    subgraph "Page Components"
        A[Layout] --> B[Header]
        A --> C[Footer]
        A --> D[Main Content]
        
        D --> E1[HomePage]
        D --> E2[ProductPage]
        D --> E3[GalleryPage]
        D --> E4[ContactPage]
        D --> E5[QuotePage]
        D --> E6[AboutPage]
    end

    subgraph "Feature Components"
        F[ProductCatalog] --> F1[ProductList]
        F1 --> F2[ProductCard]
        F2 --> F3[ProductDetails]
        
        G[QuoteSystem] --> G1[QuoteForm]
        G1 --> G2[ProductSelector]
        G1 --> G3[CustomerInfo]
        
        H[Gallery] --> H1[GalleryGrid]
        H1 --> H2[GalleryItem]
        H2 --> H3[Lightbox]
        
        I[ContactSystem] --> I1[ContactForm]
        I1 --> I2[LocationSelector]
        I1 --> I3[FormValidation]
        
        J[Testimonials] --> J1[TestimonialList]
        J1 --> J2[TestimonialCard]
        J2 --> J3[RatingStars]
    end

    subgraph "UI Components"
        K[Button]
        L[Input]
        M[Select]
        N[Modal]
        O[Carousel]
        P[Tabs]
        Q[Accordion]
    end

    E1 --> F
    E1 --> J
    E2 --> F3
    E3 --> H
    E4 --> I
    E5 --> G
    
    F --> K
    G --> L
    G --> M
    H --> N
    J --> O
    E6 --> P
    E6 --> Q
```

## Data Flow

```mermaid
flowchart LR
    subgraph "Data Sources"
        A1[CMS]
        A2[Database]
    end

    subgraph "Server-Side"
        B1[getStaticProps]
        B2[getServerSideProps]
        B3[API Routes]
    end

    subgraph "Client-Side"
        C1[React Components]
        C2[State Management]
        C3[Form Handling]
    end

    subgraph "User Interaction"
        D1[Page View]
        D2[Form Submission]
        D3[Product Selection]
    end

    A1 --> B1
    A2 --> B1
    A1 --> B2
    A2 --> B2
    
    B1 --> C1
    B2 --> C1
    
    C1 --> C2
    C2 --> C3
    
    C1 --> D1
    C3 --> D2
    C1 --> D3
    
    D2 --> B3
    D3 --> C2
    
    B3 --> A2
```

## Deployment Architecture

```mermaid
flowchart TD
    subgraph "Development Environment"
        A1[Local Next.js Dev]
        A2[Local API Testing]
    end

    subgraph "CI/CD Pipeline"
        B1[GitHub Repository]
        B2[GitHub Actions]
        B3[Build Process]
    end

    subgraph "Production Environment"
        C1[CDN]
        C2[API Server]
        C3[Database]
    end

    subgraph "External Services"
        D1[CMS]
        D2[Email Service]
        D3[Analytics]
    end

    A1 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> C1
    B3 --> C2
    
    C2 --> C3
    C2 --> D1
    C2 --> D2
    C1 --> D3
```

## Related Documentation

- [Component Architecture](./component-architecture.md)
- [Data Flow](./data-flow.md)
- [SEO Structure](./seo-structure.md)
- [URL Structure](./url-structure.md)

Last Updated: May 5, 2025
