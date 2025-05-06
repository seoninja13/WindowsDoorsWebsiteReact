'use server';

import { fetchUnsplashImages } from '@/lib/utils/context7';

/**
 * Fetches hero banner images from Unsplash via Context7 MCP
 * @returns An array of image URLs for the hero banner
 */
export async function getHeroBannerImages(): Promise<string[]> {
  return fetchUnsplashImages('modern home exterior with large windows', 3);
}

/**
 * Fetches product images from Unsplash via Context7 MCP
 * @returns An object containing image URLs for different product types
 */
export async function getProductImages(): Promise<Record<string, string>> {
  const [windowsImage, doorsImage, sidingImage] = await Promise.all([
    fetchUnsplashImages('window styles in modern home', 1),
    fetchUnsplashImages('entry door home exterior', 1),
    fetchUnsplashImages('house vinyl siding', 1)
  ]);

  return {
    windows: windowsImage[0] || '',
    doors: doorsImage[0] || '',
    siding: sidingImage[0] || '',
  };
}

/**
 * Fetches testimonial images from Unsplash via Context7 MCP
 * @returns An array of image URLs for testimonials
 */
export async function getTestimonialImages(): Promise<string[]> {
  return fetchUnsplashImages('happy homeowner family', 3);
}

/**
 * Fetches service area images from Unsplash via Context7 MCP
 * @returns An array of image URLs for service areas
 */
export async function getServiceAreaImages(): Promise<string[]> {
  return fetchUnsplashImages('neighborhood homes', 4);
}
