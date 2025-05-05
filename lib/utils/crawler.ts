/**
 * Utility functions for web crawling and scraping using Context7
 */

/**
 * Crawl a website and extract all URLs
 * @param baseUrl The base URL to crawl
 * @param maxPages Maximum number of pages to crawl
 * @returns Array of discovered URLs
 */
export async function crawlWebsite(baseUrl: string, maxPages: number = 100): Promise<string[]> {
  try {
    const response = await fetch('/api/crawl/extract-urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        baseUrl,
        maxPages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to crawl website: ${response.statusText}`);
    }

    const data = await response.json();
    return data.urls || [];
  } catch (error) {
    console.error('Error crawling website:', error);
    return [];
  }
}

/**
 * Extract page content from a URL
 * @param url The URL to extract content from
 * @returns Extracted page content
 */
export async function extractPageContent(url: string): Promise<any> {
  try {
    const response = await fetch('/api/crawl/extract-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to extract page content: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content || null;
  } catch (error) {
    console.error('Error extracting page content:', error);
    return null;
  }
}

/**
 * Extract site structure and navigation
 * @param baseUrl The base URL to analyze
 * @returns Site structure information
 */
export async function extractSiteStructure(baseUrl: string): Promise<any> {
  try {
    const response = await fetch('/api/crawl/extract-structure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        baseUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to extract site structure: ${response.statusText}`);
    }

    const data = await response.json();
    return data.structure || null;
  } catch (error) {
    console.error('Error extracting site structure:', error);
    return null;
  }
}

/**
 * Extract images from a URL
 * @param url The URL to extract images from
 * @returns Array of image URLs
 */
export async function extractImages(url: string): Promise<string[]> {
  try {
    const response = await fetch('/api/crawl/extract-images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to extract images: ${response.statusText}`);
    }

    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error('Error extracting images:', error);
    return [];
  }
}

/**
 * Generate sitemap from crawled URLs
 * @param urls Array of URLs to include in the sitemap
 * @returns XML sitemap content
 */
export async function generateSitemap(urls: string[]): Promise<string> {
  try {
    const response = await fetch('/api/crawl/generate-sitemap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate sitemap: ${response.statusText}`);
    }

    const data = await response.json();
    return data.sitemap || '';
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return '';
  }
}
