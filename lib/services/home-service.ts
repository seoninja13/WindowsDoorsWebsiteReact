/**
 * Home Page Service
 *
 * This service provides functions to fetch data for the home page from the database.
 * It uses the database utility functions to interact with Supabase.
 */

import { fetchData, fetchById, fetchBySlug } from "@/lib/database";
import {
  ProductCategory,
  Product,
  ProductImage,
  Testimonial,
  ServiceArea,
} from "@/types/database";
import { fetchUnsplashImages } from "@/lib/utils/context7";

/**
 * Fetches hero banner data from the database
 * @returns Hero banner data for the home page
 */
export async function getHeroBannerData() {
  try {
    // For now, we'll continue using Unsplash images
    // In a real implementation, we would fetch this from the database
    const heroImages = await fetchUnsplashImages(
      "modern home exterior with large windows",
      3
    );

    // Create hero slides with the images
    const heroSlides = [
      {
        id: 1,
        imageSrc:
          heroImages[0] ||
          "/api/placeholder?width=1920&height=600&text=Modern%20Home%20with%20Beautiful%20Windows",
        imageAlt: "Modern home with beautiful windows",
        title: "Transform Your Home with Premium Windows & Doors",
        subtitle: "Energy-efficient solutions for every style and budget",
        primaryButtonText: "Free Estimate",
        primaryButtonHref: "/free-estimate",
        secondaryButtonText: "View Products",
        secondaryButtonHref: "/products",
      },
      {
        id: 2,
        imageSrc:
          heroImages[1] ||
          "/api/placeholder?width=1920&height=600&text=Elegant%20Home%20Exterior&bgColor=0077c8",
        imageAlt: "Elegant home exterior with large windows",
        title: "America's #1 Replacement Window Company",
        subtitle: "Quality craftsmanship backed by our lifetime warranty",
        primaryButtonText: "Learn More",
        primaryButtonHref: "/about",
        secondaryButtonText: "Contact Us",
        secondaryButtonHref: "/contact",
      },
      {
        id: 3,
        imageSrc:
          heroImages[2] ||
          "/api/placeholder?width=1920&height=600&text=Energy%20Efficient%20Home&bgColor=003366",
        imageAlt: "Beautiful home with modern windows",
        title: "Enhance Your Home's Energy Efficiency",
        subtitle:
          "Save on energy costs with our ENERGY STAR® certified products",
        primaryButtonText: "See Our Products",
        primaryButtonHref: "/products",
        secondaryButtonText: "Get a Quote",
        secondaryButtonHref: "/quote",
      },
    ];

    return heroSlides;
  } catch (error) {
    console.error("Error fetching hero banner data:", error);
    return [];
  }
}

/**
 * Fetches featured products from the database
 * @returns Featured products for the home page
 */
export async function getFeaturedProducts() {
  try {
    // Fetch product categories
    const categories = await fetchData<ProductCategory>("product_categories", {
      limit: 3,
      order: ["display_order", "asc"],
    });

    // Fetch products for each category
    const productsPromises = categories.map(async (category) => {
      // Fetch one product from each category
      const products = await fetchData<Product>("products", {
        eq: ["category_id", category.id],
        limit: 1,
      });

      if (products.length === 0) return null;

      const product = products[0];

      // Fetch product images
      const images = await fetchData<ProductImage>("product_images", {
        eq: ["product_id", product.id],
        order: ["is_primary", "desc"],
        limit: 1,
      });

      // If no images found, use Unsplash
      let imageSrc = "";
      if (images.length === 0) {
        const unsplashImages = await fetchUnsplashImages(
          category.slug === "windows"
            ? "window styles in modern home"
            : category.slug === "doors"
            ? "entry door home exterior"
            : "house vinyl siding",
          1
        );
        imageSrc = unsplashImages[0] || "";
      } else {
        imageSrc = images[0].image_url;
      }

      // Convert features array to string array if it's not already
      const features = product.features
        ? Array.isArray(product.features)
          ? product.features
          : [product.features]
        : [
            "Energy Efficient",
            "Multiple Styles",
            "Custom Sizes",
            "Professional Installation",
          ];

      return {
        id: product.id,
        title: product.name,
        description:
          product.description ||
          `High-quality ${category.name.toLowerCase()} for your home.`,
        imageSrc,
        imageAlt: `${product.name} - ${category.name}`,
        features,
        ctaText: `Explore ${category.name}`,
        ctaHref: `/products/${category.slug}`,
      };
    });

    const productCards = (await Promise.all(productsPromises)).filter(Boolean);

    // If no products found, return placeholder data
    if (productCards.length === 0) {
      return [
        {
          id: 1,
          title: "Replacement Windows",
          description:
            "Energy-efficient windows in a variety of styles to complement any home.",
          imageSrc: "/placeholder-windows.jpg",
          imageAlt: "Modern replacement windows",
          features: [
            "Energy Efficient",
            "Multiple Styles",
            "Custom Sizes",
            "Lifetime Warranty",
          ],
          ctaText: "Explore Windows",
          ctaHref: "/products/windows",
        },
        {
          id: 2,
          title: "Entry Doors",
          description:
            "Beautiful, secure entry doors that make a statement and improve energy efficiency.",
          imageSrc: "/placeholder-doors.jpg",
          imageAlt: "Elegant entry door",
          features: [
            "Secure Design",
            "Energy Efficient",
            "Multiple Styles",
            "Professional Installation",
          ],
          ctaText: "View Doors",
          ctaHref: "/products/doors",
        },
        {
          id: 3,
          title: "Vinyl Siding",
          description:
            "Durable, low-maintenance vinyl siding that enhances your home's appearance and value.",
          imageSrc: "/placeholder-siding.jpg",
          imageAlt: "Home with vinyl siding",
          features: [
            "Weather Resistant",
            "Low Maintenance",
            "Multiple Colors",
            "Professional Installation",
          ],
          ctaText: "Learn About Siding",
          ctaHref: "/products/siding",
        },
      ];
    }

    return productCards;
  } catch (error) {
    console.error("Error fetching featured products:", error);

    // Return placeholder data in case of error
    return [
      {
        id: 1,
        title: "Replacement Windows",
        description:
          "Energy-efficient windows in a variety of styles to complement any home.",
        imageSrc:
          "/api/placeholder?width=800&height=600&text=Replacement%20Windows&bgColor=004b8d",
        imageAlt: "Modern replacement windows",
        features: [
          "Energy Efficient",
          "Multiple Styles",
          "Custom Sizes",
          "Lifetime Warranty",
        ],
        ctaText: "Explore Windows",
        ctaHref: "/products/windows",
      },
      {
        id: 2,
        title: "Entry Doors",
        description:
          "Beautiful, secure entry doors that make a statement and improve energy efficiency.",
        imageSrc:
          "/api/placeholder?width=800&height=600&text=Entry%20Doors&bgColor=0077c8",
        imageAlt: "Elegant entry door",
        features: [
          "Secure Design",
          "Energy Efficient",
          "Multiple Styles",
          "Professional Installation",
        ],
        ctaText: "View Doors",
        ctaHref: "/products/doors",
      },
      {
        id: 3,
        title: "Vinyl Siding",
        description:
          "Durable, low-maintenance vinyl siding that enhances your home's appearance and value.",
        imageSrc:
          "/api/placeholder?width=800&height=600&text=Vinyl%20Siding&bgColor=e31837",
        imageAlt: "Home with vinyl siding",
        features: [
          "Weather Resistant",
          "Low Maintenance",
          "Multiple Colors",
          "Professional Installation",
        ],
        ctaText: "Learn About Siding",
        ctaHref: "/products/siding",
      },
    ];
  }
}

/**
 * Fetches testimonials from the database
 * @returns Testimonials for the home page
 */
export async function getTestimonials() {
  try {
    // Fetch testimonials from the database
    const dbTestimonials = await fetchData<Testimonial>("testimonials", {
      eq: ["is_featured", true],
      limit: 3,
      order: ["created_at", "desc"],
    });

    // If testimonials found, format them for the UI
    if (dbTestimonials.length > 0) {
      // Fetch images from Unsplash for testimonials
      const testimonialImages = await fetchUnsplashImages(
        "happy homeowner family",
        3
      );

      return dbTestimonials.map((testimonial, index) => ({
        id: testimonial.id,
        quote: testimonial.review_text,
        author: testimonial.customer_name,
        location: testimonial.location || "Los Angeles, CA",
        rating: testimonial.rating || 5,
        imageSrc: testimonialImages[index] || "",
      }));
    }

    // If no testimonials found, return placeholder data
    return [
      {
        id: 1,
        quote:
          "We couldn't be happier with our new windows! The installation team was professional and efficient, and the quality of the windows is outstanding. Our home is noticeably more comfortable and our energy bills have decreased.",
        author: "Michael & Sarah Johnson",
        location: "Los Angeles, CA",
        rating: 5,
        imageSrc:
          "/api/placeholder?width=400&height=400&text=M%26S&bgColor=333333",
      },
      {
        id: 2,
        quote:
          "The entire process from consultation to installation was seamless. The sales representative was knowledgeable and helped us choose the perfect windows for our home. The installation crew was respectful of our property and completed the job ahead of schedule.",
        author: "David Rodriguez",
        location: "Pasadena, CA",
        rating: 5,
        imageSrc:
          "/api/placeholder?width=400&height=400&text=DR&bgColor=333333",
      },
      {
        id: 3,
        quote:
          "We recently had our entry door replaced and couldn't be more pleased with the results. The door is beautiful and has significantly improved our home's curb appeal. The installation was quick and professional.",
        author: "Jennifer & Robert Chen",
        location: "Santa Monica, CA",
        rating: 5,
        imageSrc:
          "/api/placeholder?width=400&height=400&text=J%26R&bgColor=333333",
      },
    ];
  } catch (error) {
    console.error("Error fetching testimonials:", error);

    // Return placeholder data in case of error
    return [
      {
        id: 1,
        quote:
          "We couldn't be happier with our new windows! The installation team was professional and efficient, and the quality of the windows is outstanding. Our home is noticeably more comfortable and our energy bills have decreased.",
        author: "Michael & Sarah Johnson",
        location: "Los Angeles, CA",
        rating: 5,
        imageSrc: "/placeholder-testimonial-1.jpg",
      },
      {
        id: 2,
        quote:
          "The entire process from consultation to installation was seamless. The sales representative was knowledgeable and helped us choose the perfect windows for our home. The installation crew was respectful of our property and completed the job ahead of schedule.",
        author: "David Rodriguez",
        location: "Pasadena, CA",
        rating: 5,
        imageSrc: "/placeholder-testimonial-2.jpg",
      },
      {
        id: 3,
        quote:
          "We recently had our entry door replaced and couldn't be more pleased with the results. The door is beautiful and has significantly improved our home's curb appeal. The installation was quick and professional.",
        author: "Jennifer & Robert Chen",
        location: "Santa Monica, CA",
        rating: 5,
        imageSrc: "/placeholder-testimonial-3.jpg",
      },
    ];
  }
}

/**
 * Fetches service areas from the database
 * @returns Service areas for the home page
 */
export async function getServiceAreas() {
  try {
    // Fetch service areas from the database
    const serviceAreas = await fetchData<ServiceArea>("service_areas", {
      eq: ["is_active", true],
      order: ["name", "asc"],
    });

    // Group service areas by county
    const counties = new Map();

    serviceAreas.forEach((area) => {
      // Extract county from name (assuming format like "City, County")
      const nameParts = area.name.split(",");
      const city = nameParts[0].trim();
      const county =
        nameParts.length > 1 ? nameParts[1].trim() : "Los Angeles County";

      if (!counties.has(county)) {
        counties.set(county, {
          id: counties.size + 1,
          name: county,
          active: counties.size === 0, // First county is active by default
          cities: [],
        });
      }

      counties.get(county).cities.push({
        id: area.id,
        name: city,
        countyId: counties.get(county).id,
      });
    });

    // Convert to arrays for the UI
    const countiesArray = Array.from(counties.values());
    const citiesArray = countiesArray.flatMap((county) => county.cities);

    // Fetch images from Unsplash for service areas
    const serviceAreaImages = await fetchUnsplashImages(
      "neighborhood homes",
      4
    );
    const images = serviceAreaImages.map((src, i) => ({
      id: i + 1,
      src: src || `/placeholder-service-area-${i + 1}.jpg`,
      alt: `Service area ${i + 1}`,
    }));

    return {
      counties: countiesArray,
      cities: citiesArray,
      images,
    };
  } catch (error) {
    console.error("Error fetching service areas:", error);

    // Return placeholder data in case of error
    return {
      counties: [
        { id: 1, name: "Los Angeles County", active: true },
        { id: 2, name: "Orange County", active: false },
        { id: 3, name: "Ventura County", active: false },
        { id: 4, name: "San Bernardino County", active: false },
      ],
      cities: [
        { id: 1, name: "Los Angeles", countyId: 1 },
        { id: 2, name: "Pasadena", countyId: 1 },
        { id: 3, name: "Santa Monica", countyId: 1 },
        { id: 4, name: "Long Beach", countyId: 1 },
        { id: 5, name: "Glendale", countyId: 1 },
        { id: 6, name: "Burbank", countyId: 1 },
        { id: 7, name: "Anaheim", countyId: 2 },
        { id: 8, name: "Irvine", countyId: 2 },
        { id: 9, name: "Huntington Beach", countyId: 2 },
        { id: 10, name: "Oxnard", countyId: 3 },
        { id: 11, name: "Ventura", countyId: 3 },
        { id: 12, name: "San Bernardino", countyId: 4 },
        { id: 13, name: "Rancho Cucamonga", countyId: 4 },
      ],
      images: [
        {
          id: 1,
          src: "/api/placeholder?width=600&height=400&text=Los%20Angeles&bgColor=0077c8",
          alt: "Los Angeles service area",
        },
        {
          id: 2,
          src: "/api/placeholder?width=600&height=400&text=Orange%20County&bgColor=0077c8",
          alt: "Orange County service area",
        },
        {
          id: 3,
          src: "/api/placeholder?width=600&height=400&text=Ventura%20County&bgColor=0077c8",
          alt: "Ventura County service area",
        },
        {
          id: 4,
          src: "/api/placeholder?width=600&height=400&text=San%20Bernardino&bgColor=0077c8",
          alt: "San Bernardino service area",
        },
      ],
    };
  }
}

/**
 * Fetches product features for the home page
 * @returns Product features for the home page
 */
export async function getProductFeatures() {
  // For now, we'll use hardcoded data
  // In a real implementation, we would fetch this from the database
  return {
    title: "Why Choose Our Windows & Doors",
    description:
      "Our products are designed to provide superior performance, energy efficiency, and lasting beauty for your home.",
    features: [
      {
        id: 1,
        title: "Energy Efficiency",
        description:
          "Our windows and doors are ENERGY STAR® certified to help reduce your energy costs and improve comfort.",
        icon: "⚡",
      },
      {
        id: 2,
        title: "Lifetime Warranty",
        description:
          "We stand behind our products with a comprehensive lifetime warranty for your peace of mind.",
        icon: "🛡️",
      },
      {
        id: 3,
        title: "Professional Installation",
        description:
          "Our factory-trained installers ensure your windows and doors are installed correctly for optimal performance.",
        icon: "🔧",
      },
      {
        id: 4,
        title: "Custom Solutions",
        description:
          "We offer a wide range of styles, colors, and options to match your home's architecture and your personal preferences.",
        icon: "🏠",
      },
    ],
  };
}
