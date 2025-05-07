/**
 * Product Service
 *
 * This service provides functions to fetch product data from the database.
 * It uses the database utility functions to interact with Supabase.
 */

import {
  fetchData,
  fetchById,
  fetchBySlug,
  fetchProducts as fetchProductsWithRelations,
} from "@/lib/database";
import {
  ProductCategory,
  Product,
  ProductImage,
  ColorOption,
} from "@/types/database";
import { fetchUnsplashImages } from "@/lib/utils/context7";

/**
 * Fetches all product categories from the database
 * @returns All product categories
 */
export async function getProductCategories() {
  try {
    const categories = await fetchData<ProductCategory>("product_categories", {
      order: ["display_order", "asc"],
    });

    // Fetch images from Unsplash for categories without images
    const categoryPromises = categories.map(async (category) => {
      if (!category.image_url) {
        const images = await fetchUnsplashImages(
          category.slug === "windows"
            ? "window styles in modern home"
            : category.slug === "doors"
            ? "entry door home exterior"
            : category.slug === "vinyl-siding" || category.slug === "siding"
            ? "house vinyl siding"
            : "home exterior",
          1
        );

        return {
          ...category,
          image_url: images[0] || `/placeholder-${category.slug}.jpg`,
        };
      }

      return category;
    });

    return Promise.all(categoryPromises);
  } catch (error) {
    console.error("Error fetching product categories:", error);

    // Return placeholder data in case of error
    return [
      {
        id: 1,
        name: "Windows",
        slug: "windows",
        description:
          "Replacement windows for your home, including double-hung, sliding, casement, and more.",
        image_url: "/placeholder-windows.jpg",
        display_order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Doors",
        slug: "doors",
        description:
          "Entry doors, patio doors, and garage doors for your home.",
        image_url: "/placeholder-doors.jpg",
        display_order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Vinyl Siding",
        slug: "vinyl-siding",
        description:
          "Vinyl siding options for your home, including various series and colors.",
        image_url: "/placeholder-siding.jpg",
        display_order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 4,
        name: "Roofing",
        slug: "roofing",
        description: "Roofing options for your home.",
        image_url: "/placeholder-roofing.jpg",
        display_order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }
}

/**
 * Fetches a product category by slug
 * @param slug The slug of the category to fetch
 * @returns The product category
 */
export async function getProductCategoryBySlug(slug: string) {
  try {
    const category = await fetchBySlug<ProductCategory>(
      "product_categories",
      slug
    );

    if (!category) {
      throw new Error(`Category with slug ${slug} not found`);
    }

    // Fetch image from Unsplash if not available
    if (!category.image_url) {
      const images = await fetchUnsplashImages(
        slug === "windows"
          ? "window styles in modern home"
          : slug === "doors"
          ? "entry door home exterior"
          : slug === "vinyl-siding" || slug === "siding"
          ? "house vinyl siding"
          : "home exterior",
        1
      );

      return {
        ...category,
        image_url: images[0] || `/placeholder-${slug}.jpg`,
      };
    }

    return category;
  } catch (error) {
    console.error(`Error fetching product category with slug ${slug}:`, error);

    // Return placeholder data in case of error
    return {
      id:
        slug === "windows"
          ? 1
          : slug === "doors"
          ? 2
          : slug === "vinyl-siding"
          ? 3
          : 4,
      name:
        slug === "windows"
          ? "Windows"
          : slug === "doors"
          ? "Doors"
          : slug === "vinyl-siding"
          ? "Vinyl Siding"
          : "Roofing",
      slug,
      description: `${
        slug === "windows"
          ? "Replacement windows"
          : slug === "doors"
          ? "Entry doors"
          : slug === "vinyl-siding"
          ? "Vinyl siding"
          : "Roofing"
      } for your home.`,
      image_url: `/placeholder-${
        slug === "vinyl-siding" ? "siding" : slug
      }.jpg`,
      display_order:
        slug === "windows"
          ? 1
          : slug === "doors"
          ? 2
          : slug === "vinyl-siding"
          ? 3
          : 4,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
}

/**
 * Fetches products by category slug
 * @param categorySlug The slug of the category to fetch products for
 * @returns Products in the specified category
 */
export async function getProductsByCategory(categorySlug: string) {
  try {
    // First, get the category
    const category = await getProductCategoryBySlug(categorySlug);

    if (!category) {
      throw new Error(`Category with slug ${categorySlug} not found`);
    }

    // Fetch products in this category
    const products = await fetchData<Product>("products", {
      eq: ["category_id", category.id],
      order: ["display_order", "asc"],
    });

    // Fetch images for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const images = await fetchData<ProductImage>("product_images", {
          eq: ["product_id", product.id],
          order: ["is_primary", "desc"],
          limit: 1,
        });

        let imageSrc = "";
        if (images.length === 0) {
          // If no images found, use Unsplash
          const unsplashImages = await fetchUnsplashImages(
            `${product.name} ${category.name}`,
            1
          );
          imageSrc = unsplashImages[0] || "";
        } else {
          imageSrc = images[0].image_url;
        }

        return {
          ...product,
          image_url: imageSrc,
        };
      })
    );

    return {
      category,
      products: productsWithImages,
    };
  } catch (error) {
    console.error(
      `Error fetching products for category ${categorySlug}:`,
      error
    );

    // Return placeholder data in case of error
    const categoryName =
      categorySlug === "windows"
        ? "Windows"
        : categorySlug === "doors"
        ? "Doors"
        : categorySlug === "vinyl-siding"
        ? "Vinyl Siding"
        : "Roofing";

    return {
      category: {
        id:
          categorySlug === "windows"
            ? 1
            : categorySlug === "doors"
            ? 2
            : categorySlug === "vinyl-siding"
            ? 3
            : 4,
        name: categoryName,
        slug: categorySlug,
        description: `${
          categorySlug === "windows"
            ? "Replacement windows"
            : categorySlug === "doors"
            ? "Entry doors"
            : categorySlug === "vinyl-siding"
            ? "Vinyl siding"
            : "Roofing"
        } for your home.`,
        image_url: `/placeholder-${
          categorySlug === "vinyl-siding" ? "siding" : categorySlug
        }.jpg`,
        display_order:
          categorySlug === "windows"
            ? 1
            : categorySlug === "doors"
            ? 2
            : categorySlug === "vinyl-siding"
            ? 3
            : 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      products: [
        {
          id: 1,
          category_id:
            categorySlug === "windows"
              ? 1
              : categorySlug === "doors"
              ? 2
              : categorySlug === "vinyl-siding"
              ? 3
              : 4,
          name: `${categoryName} Product 1`,
          slug: `${categorySlug}-product-1`,
          description: `High-quality ${categoryName.toLowerCase()} for your home.`,
          features: [
            "Energy Efficient",
            "Multiple Styles",
            "Custom Sizes",
            "Professional Installation",
          ],
          benefits: [
            "Improved Energy Efficiency",
            "Enhanced Curb Appeal",
            "Increased Home Value",
          ],
          specifications: null,
          thumbnail_url: `/placeholder-${
            categorySlug === "vinyl-siding" ? "siding" : categorySlug
          }.jpg`,
          image_url: `/placeholder-${
            categorySlug === "vinyl-siding" ? "siding" : categorySlug
          }.jpg`,
          display_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 2,
          category_id:
            categorySlug === "windows"
              ? 1
              : categorySlug === "doors"
              ? 2
              : categorySlug === "vinyl-siding"
              ? 3
              : 4,
          name: `${categoryName} Product 2`,
          slug: `${categorySlug}-product-2`,
          description: `Premium ${categoryName.toLowerCase()} for your home.`,
          features: [
            "Energy Efficient",
            "Multiple Styles",
            "Custom Sizes",
            "Professional Installation",
          ],
          benefits: [
            "Improved Energy Efficiency",
            "Enhanced Curb Appeal",
            "Increased Home Value",
          ],
          specifications: null,
          thumbnail_url: `/placeholder-${
            categorySlug === "vinyl-siding" ? "siding" : categorySlug
          }.jpg`,
          image_url: `/placeholder-${
            categorySlug === "vinyl-siding" ? "siding" : categorySlug
          }.jpg`,
          display_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    };
  }
}

/**
 * Fetches a product by slug
 * @param slug The slug of the product to fetch
 * @returns The product with its images and related data
 */
export async function getProductBySlug(slug: string) {
  try {
    const product = await fetchBySlug<Product>("products", slug);

    if (!product) {
      throw new Error(`Product with slug ${slug} not found`);
    }

    // Fetch the product category
    const category = await fetchById<ProductCategory>(
      "product_categories",
      product.category_id
    );

    if (!category) {
      throw new Error(`Category with id ${product.category_id} not found`);
    }

    // Fetch product images
    const images = await fetchData<ProductImage>("product_images", {
      eq: ["product_id", product.id],
      order: ["is_primary", "desc"],
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
        created_at: new Date().toISOString(),
      }));
    }

    // Fetch color options if available
    const colorOptions = await fetchData<ColorOption>("color_options", {
      limit: 10,
    });

    return {
      product,
      category,
      images: productImages,
      colorOptions,
    };
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);

    // Return placeholder data in case of error
    // Determine category from slug
    const categorySlug = slug.includes("window")
      ? "windows"
      : slug.includes("door")
      ? "doors"
      : slug.includes("siding")
      ? "vinyl-siding"
      : "roofing";

    const categoryName =
      categorySlug === "windows"
        ? "Windows"
        : categorySlug === "doors"
        ? "Doors"
        : categorySlug === "vinyl-siding"
        ? "Vinyl Siding"
        : "Roofing";

    const productName = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      product: {
        id: 1,
        category_id:
          categorySlug === "windows"
            ? 1
            : categorySlug === "doors"
            ? 2
            : categorySlug === "vinyl-siding"
            ? 3
            : 4,
        name: productName,
        slug,
        description: `High-quality ${productName.toLowerCase()} for your home.`,
        features: [
          "Energy Efficient",
          "Multiple Styles",
          "Custom Sizes",
          "Professional Installation",
        ],
        benefits: [
          "Improved Energy Efficiency",
          "Enhanced Curb Appeal",
          "Increased Home Value",
        ],
        specifications: null,
        thumbnail_url: `/placeholder-${
          categorySlug === "vinyl-siding" ? "siding" : categorySlug
        }.jpg`,
        display_order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      category: {
        id:
          categorySlug === "windows"
            ? 1
            : categorySlug === "doors"
            ? 2
            : categorySlug === "vinyl-siding"
            ? 3
            : 4,
        name: categoryName,
        slug: categorySlug,
        description: `${
          categorySlug === "windows"
            ? "Replacement windows"
            : categorySlug === "doors"
            ? "Entry doors"
            : categorySlug === "vinyl-siding"
            ? "Vinyl siding"
            : "Roofing"
        } for your home.`,
        image_url: `/placeholder-${
          categorySlug === "vinyl-siding" ? "siding" : categorySlug
        }.jpg`,
        display_order:
          categorySlug === "windows"
            ? 1
            : categorySlug === "doors"
            ? 2
            : categorySlug === "vinyl-siding"
            ? 3
            : 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      images: [
        {
          id: 1,
          product_id: 1,
          image_url: `/placeholder-${
            categorySlug === "vinyl-siding" ? "siding" : categorySlug
          }.jpg`,
          alt_text: `${productName} - Image 1`,
          is_primary: true,
          display_order: 0,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          product_id: 1,
          image_url: `/placeholder-${
            categorySlug === "vinyl-siding" ? "siding" : categorySlug
          }-2.jpg`,
          alt_text: `${productName} - Image 2`,
          is_primary: false,
          display_order: 1,
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          product_id: 1,
          image_url: `/placeholder-${
            categorySlug === "vinyl-siding" ? "siding" : categorySlug
          }-3.jpg`,
          alt_text: `${productName} - Image 3`,
          is_primary: false,
          display_order: 2,
          created_at: new Date().toISOString(),
        },
      ],
      colorOptions: [
        {
          id: 1,
          name: "White",
          hex_code: "#FFFFFF",
          image_url: "/placeholder-color-white.jpg",
          thumbnail_url: "/placeholder-color-white-thumb.jpg",
          category: "exterior",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Beige",
          hex_code: "#F5F5DC",
          image_url: "/placeholder-color-beige.jpg",
          thumbnail_url: "/placeholder-color-beige-thumb.jpg",
          category: "exterior",
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Brown",
          hex_code: "#8B4513",
          image_url: "/placeholder-color-brown.jpg",
          thumbnail_url: "/placeholder-color-brown-thumb.jpg",
          category: "exterior",
          created_at: new Date().toISOString(),
        },
      ],
    };
  }
}

/**
 * Fetches related products for a given product
 * @param productId The ID of the product to fetch related products for
 * @param categoryId The ID of the category the product belongs to
 * @param limit The maximum number of related products to fetch
 * @returns Related products
 */
export async function getRelatedProducts(
  productId: number,
  categoryId: number,
  limit: number = 3
) {
  try {
    // Fetch products in the same category, excluding the current product
    const products = await fetchData<Product>("products", {
      eq: ["category_id", categoryId],
      limit: limit + 1, // Fetch one extra to account for the current product
    });

    // Filter out the current product
    const relatedProducts = products
      .filter((product) => product.id !== productId)
      .slice(0, limit);

    // Fetch images for each product
    const productsWithImages = await Promise.all(
      relatedProducts.map(async (product) => {
        const images = await fetchData<ProductImage>("product_images", {
          eq: ["product_id", product.id],
          order: ["is_primary", "desc"],
          limit: 1,
        });

        let imageSrc = "";
        if (images.length === 0) {
          // If no images found, use placeholder
          imageSrc = `/placeholder-product-${product.id}.jpg`;
        } else {
          imageSrc = images[0].image_url;
        }

        return {
          ...product,
          image_url: imageSrc,
        };
      })
    );

    return productsWithImages;
  } catch (error) {
    console.error(
      `Error fetching related products for product ${productId}:`,
      error
    );

    // Return placeholder data in case of error
    return [
      {
        id: productId + 1,
        category_id: categoryId,
        name: "Related Product 1",
        slug: "related-product-1",
        description: "Related product description.",
        features: ["Energy Efficient", "Multiple Styles", "Custom Sizes"],
        benefits: ["Improved Energy Efficiency", "Enhanced Curb Appeal"],
        specifications: null,
        thumbnail_url: "/placeholder-related-1.jpg",
        image_url: "/placeholder-related-1.jpg",
        display_order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: productId + 2,
        category_id: categoryId,
        name: "Related Product 2",
        slug: "related-product-2",
        description: "Related product description.",
        features: ["Energy Efficient", "Multiple Styles", "Custom Sizes"],
        benefits: ["Improved Energy Efficiency", "Enhanced Curb Appeal"],
        specifications: null,
        thumbnail_url: "/placeholder-related-2.jpg",
        image_url: "/placeholder-related-2.jpg",
        display_order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }
}
