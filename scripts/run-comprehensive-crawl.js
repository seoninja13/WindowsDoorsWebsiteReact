/**
 * Run Comprehensive Crawl
 *
 * This script runs a comprehensive crawl of the Window World LA website,
 * extracting all URLs, content, screenshots, UI components, images, and other assets.
 * It logs all operations using the new logging system.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Import required modules
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { URL } = require('url');
const cheerio = require('cheerio');

// Import logging utility
const {
  LogLevel,
  Crawl4AIOperation,
  Crawl4AIStatus,
  logCrawl4AIOperation,
  logger
} = require('../lib/logging');

// Base URL of the website to crawl
const BASE_URL = 'https://www.windowworldla.com';

// Output directories
const OUTPUT_DIR = path.join(__dirname, '..', 'crawl_results');
const CONTENT_DIR = path.join(OUTPUT_DIR, 'content');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');
const COMPONENTS_DIR = path.join(OUTPUT_DIR, 'components');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const URLS_FILE = path.join(OUTPUT_DIR, 'urls.json');
const SITEMAP_FILE = path.join(OUTPUT_DIR, 'sitemap.xml');

// Maximum number of pages to crawl
const MAX_PAGES = 100;

// Crawl statistics
const stats = {
  startTime: new Date().toISOString(),
  pagesCrawled: 0,
  screenshotsTaken: 0,
  failedPages: 0,
  totalLinksFound: 0,
  totalImagesFound: 0,
  componentsIdentified: 0,
  endTime: null,
  durationSeconds: 0
};

// Queue of URLs to crawl
const urlQueue = [];
// Set of URLs that have been crawled or are in the queue
const processedUrls = new Set();

/**
 * Create directory if it doesn't exist
 * @param {string} dir - Directory path
 */
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
  }
}

/**
 * Normalize a URL
 * @param {string} url - URL to normalize
 * @param {string} baseUrl - Base URL for resolving relative URLs
 * @returns {string|null} - Normalized URL or null if invalid
 */
function normalizeUrl(url, baseUrl) {
  try {
    const parsedUrl = new URL(url, baseUrl);
    return parsedUrl.href;
  } catch (error) {
    return null;
  }
}

/**
 * Check if URL belongs to the target website
 * @param {string} urlString - URL to check
 * @param {string} base - Base URL of the website
 * @returns {boolean} - True if URL belongs to the target website
 */
function isInternalUrl(urlString, base) {
  try {
    const parsedUrl = new URL(urlString, base);
    const parsedBase = new URL(base);
    return parsedUrl.hostname === parsedBase.hostname;
  } catch (error) {
    return false;
  }
}

/**
 * Extract path from URL
 * @param {string} url - URL to extract path from
 * @returns {string} - Path extracted from URL
 */
function extractPathFromUrl(url) {
  try {
    const parsedUrl = new URL(url);
    let path = parsedUrl.pathname;

    // Remove leading and trailing slashes
    path = path.replace(/^\/|\/$/g, '');

    // If path is empty, use 'home'
    if (!path) {
      path = 'home';
    }

    // Replace remaining slashes with underscores
    path = path.replace(/\//g, '_');

    return path;
  } catch (error) {
    console.error(`Error extracting path from URL ${url}:`, error);
    return 'unknown';
  }
}

/**
 * Fetch a URL
 * @param {string} url - URL to fetch
 * @returns {Promise<Object|null>} - Response data or null if failed
 */
async function fetchUrl(url) {
  try {
    const startTime = Date.now();

    logger.info('run-comprehensive-crawl.js', `Fetching ${url}`);

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const endTime = Date.now();
    const durationMs = endTime - startTime;

    logger.info('run-comprehensive-crawl.js', `Fetched ${url} in ${durationMs}ms`);

    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
      durationMs
    };
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error fetching ${url}: ${error.message}`);
    return null;
  }
}

/**
 * Extract links from HTML
 * @param {string} html - HTML content
 * @param {string} baseUrl - Base URL for resolving relative URLs
 * @returns {string[]} - Array of URLs
 */
function extractLinks(html, baseUrl) {
  try {
    const $ = cheerio.load(html);
    const links = [];

    $('a').each((i, element) => {
      const href = $(element).attr('href');
      if (href) {
        const normalizedUrl = normalizeUrl(href, baseUrl);
        if (normalizedUrl && isInternalUrl(normalizedUrl, baseUrl)) {
          links.push(normalizedUrl);
        }
      }
    });

    return [...new Set(links)]; // Remove duplicates
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error extracting links: ${error.message}`);
    return [];
  }
}

/**
 * Extract images from HTML
 * @param {string} html - HTML content
 * @param {string} baseUrl - Base URL for resolving relative URLs
 * @returns {Object[]} - Array of image objects
 */
function extractImages(html, baseUrl) {
  try {
    const $ = cheerio.load(html);
    const images = [];

    $('img').each((i, element) => {
      const src = $(element).attr('src');
      if (src) {
        const normalizedUrl = normalizeUrl(src, baseUrl);
        if (normalizedUrl) {
          images.push({
            url: normalizedUrl,
            alt: $(element).attr('alt') || '',
            width: $(element).attr('width') || '',
            height: $(element).attr('height') || ''
          });
        }
      }
    });

    return images;
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error extracting images: ${error.message}`);
    return [];
  }
}

/**
 * Extract metadata from HTML
 * @param {string} html - HTML content
 * @returns {Object} - Metadata object
 */
function extractMetadata(html) {
  try {
    const $ = cheerio.load(html);

    return {
      title: $('title').text().trim(),
      description: $('meta[name="description"]').attr('content') || '',
      keywords: $('meta[name="keywords"]').attr('content') || ''
    };
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error extracting metadata: ${error.message}`);
    return {
      title: '',
      description: '',
      keywords: ''
    };
  }
}

/**
 * Extract UI components from HTML
 * @param {string} html - HTML content
 * @returns {Object[]} - Array of component objects
 */
function extractComponents(html) {
  try {
    const $ = cheerio.load(html);
    const components = [];

    // Extract header
    const header = $('header');
    if (header.length > 0) {
      components.push({
        type: 'header',
        html: header.html() || '',
        classes: header.attr('class') || ''
      });
    }

    // Extract footer
    const footer = $('footer');
    if (footer.length > 0) {
      components.push({
        type: 'footer',
        html: footer.html() || '',
        classes: footer.attr('class') || ''
      });
    }

    // Extract navigation
    const nav = $('nav');
    if (nav.length > 0) {
      components.push({
        type: 'navigation',
        html: nav.html() || '',
        classes: nav.attr('class') || ''
      });
    }

    // Extract forms
    $('form').each((i, element) => {
      components.push({
        type: 'form',
        html: $(element).html() || '',
        classes: $(element).attr('class') || '',
        action: $(element).attr('action') || '',
        method: $(element).attr('method') || ''
      });
    });

    // Extract sliders/carousels
    $('.slider, .carousel, .slideshow').each((i, element) => {
      components.push({
        type: 'slider',
        html: $(element).html() || '',
        classes: $(element).attr('class') || ''
      });
    });

    // Extract cards
    $('.card').each((i, element) => {
      components.push({
        type: 'card',
        html: $(element).html() || '',
        classes: $(element).attr('class') || ''
      });
    });

    return components;
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error extracting components: ${error.message}`);
    return [];
  }
}

/**
 * Take a screenshot of a URL
 * @param {string} url - URL to screenshot
 * @param {string} outputPath - Path to save screenshot to
 * @returns {Promise<boolean>} - True if successful, false if failed
 */
async function takeScreenshot(url, outputPath) {
  try {
    const startTime = Date.now();

    logger.info('run-comprehensive-crawl.js', `Taking screenshot of ${url}`);

    // Use puppeteer to take a screenshot
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for any lazy-loaded content
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({ path: outputPath, fullPage: true });

    await browser.close();

    const endTime = Date.now();
    const durationMs = endTime - startTime;

    await logCrawl4AIOperation(
      Crawl4AIOperation.SCREENSHOT,
      url,
      Crawl4AIStatus.SUCCESS,
      {
        durationMs,
        screenshotCaptured: true,
        details: {
          outputPath
        }
      }
    );

    logger.info('run-comprehensive-crawl.js', `Took screenshot of ${url} in ${durationMs}ms`);

    return true;
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error taking screenshot of ${url}: ${error.message}`);

    await logCrawl4AIOperation(
      Crawl4AIOperation.SCREENSHOT,
      url,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );

    return false;
  }
}

/**
 * Process a URL
 * @param {string} url - URL to process
 */
async function processUrl(url) {
  try {
    // Skip if URL has already been processed
    if (processedUrls.has(url)) {
      return;
    }

    // Mark URL as processed
    processedUrls.add(url);

    // Extract path from URL
    const urlPath = extractPathFromUrl(url);

    // Create directories for this URL
    const contentDir = path.join(CONTENT_DIR, urlPath);
    const screenshotDir = path.join(SCREENSHOTS_DIR, urlPath);
    const componentsDir = path.join(COMPONENTS_DIR, urlPath);
    const imagesDir = path.join(IMAGES_DIR, urlPath);

    await ensureDir(contentDir);
    await ensureDir(screenshotDir);
    await ensureDir(componentsDir);
    await ensureDir(imagesDir);

    // Log crawl start
    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_PAGE,
      url,
      Crawl4AIStatus.IN_PROGRESS
    );

    // Fetch URL
    const response = await fetchUrl(url);

    if (!response) {
      stats.failedPages++;

      await logCrawl4AIOperation(
        Crawl4AIOperation.CRAWL_PAGE,
        url,
        Crawl4AIStatus.FAILURE,
        {
          errorMessage: 'Failed to fetch URL'
        }
      );

      return;
    }

    const html = response.data;

    // Extract metadata
    const metadata = extractMetadata(html);

    // Save HTML content
    await fs.writeFile(
      path.join(contentDir, 'content.html'),
      html
    );

    // Extract links
    const links = extractLinks(html, url);
    stats.totalLinksFound += links.length;

    // Extract images
    const images = extractImages(html, url);
    stats.totalImagesFound += images.length;

    // Extract components
    const components = extractComponents(html);
    stats.componentsIdentified += components.length;

    // Take screenshot
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');
    const screenshotSuccess = await takeScreenshot(url, screenshotPath);

    if (screenshotSuccess) {
      stats.screenshotsTaken++;
    }

    // Save metadata
    const pageMetadata = {
      url,
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      path: urlPath,
      crawl_time: new Date().toISOString(),
      links,
      images,
      components,
      screenshot_file: screenshotSuccess ? screenshotPath : null,
      has_screenshot: screenshotSuccess
    };

    await fs.writeFile(
      path.join(contentDir, 'metadata.json'),
      JSON.stringify(pageMetadata, null, 2)
    );

    // Save images metadata
    await fs.writeFile(
      path.join(imagesDir, 'images.json'),
      JSON.stringify(images, null, 2)
    );

    // Save components metadata
    await fs.writeFile(
      path.join(componentsDir, 'components.json'),
      JSON.stringify(components, null, 2)
    );

    // Add new URLs to queue
    for (const link of links) {
      if (!processedUrls.has(link)) {
        urlQueue.push(link);
        processedUrls.add(link);
      }
    }

    // Log crawl success
    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_PAGE,
      url,
      Crawl4AIStatus.SUCCESS,
      {
        durationMs: response.durationMs,
        pageTitle: metadata.title,
        contentExtracted: true,
        screenshotCaptured: screenshotSuccess,
        componentsIdentified: components.length,
        linksExtracted: links.length,
        imagesExtracted: images.length
      }
    );

    // Increment pages crawled
    stats.pagesCrawled++;

    logger.info('run-comprehensive-crawl.js', `Successfully processed ${url}`);
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error processing ${url}: ${error.message}`);

    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_PAGE,
      url,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );

    stats.failedPages++;
  }
}

/**
 * Save crawl statistics
 */
async function saveStats() {
  try {
    stats.endTime = new Date().toISOString();
    stats.durationSeconds = (new Date(stats.endTime) - new Date(stats.startTime)) / 1000;

    await ensureDir(OUTPUT_DIR);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'crawl_stats.json'),
      JSON.stringify(stats, null, 2)
    );

    logger.info('run-comprehensive-crawl.js', `Crawl statistics saved to ${path.join(OUTPUT_DIR, 'crawl_stats.json')}`);
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error saving crawl statistics: ${error.message}`);
  }
}

/**
 * Save URLs to file
 */
async function saveUrls() {
  try {
    await ensureDir(OUTPUT_DIR);
    await fs.writeFile(
      URLS_FILE,
      JSON.stringify([...processedUrls], null, 2)
    );

    logger.info('run-comprehensive-crawl.js', `URLs saved to ${URLS_FILE}`);
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error saving URLs: ${error.message}`);
  }
}

/**
 * Generate sitemap
 */
async function generateSitemap() {
  try {
    const urls = [...processedUrls];

    // Generate XML sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const url of urls) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${url}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      sitemap += '    <changefreq>monthly</changefreq>\n';
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '  </url>\n';
    }

    sitemap += '</urlset>';

    await ensureDir(OUTPUT_DIR);
    await fs.writeFile(SITEMAP_FILE, sitemap);

    logger.info('run-comprehensive-crawl.js', `Sitemap generated and saved to ${SITEMAP_FILE}`);
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error generating sitemap: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Log crawl start
    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_START,
      BASE_URL,
      Crawl4AIStatus.IN_PROGRESS,
      {
        details: {
          maxPages: MAX_PAGES
        }
      }
    );

    logger.info('run-comprehensive-crawl.js', `Starting comprehensive crawl of ${BASE_URL}`);

    // Create output directories
    await ensureDir(OUTPUT_DIR);
    await ensureDir(CONTENT_DIR);
    await ensureDir(SCREENSHOTS_DIR);
    await ensureDir(COMPONENTS_DIR);
    await ensureDir(IMAGES_DIR);

    // Add base URL to queue
    urlQueue.push(BASE_URL);
    processedUrls.add(BASE_URL);

    // Process URLs
    while (urlQueue.length > 0 && stats.pagesCrawled < MAX_PAGES) {
      const url = urlQueue.shift();
      await processUrl(url);

      // Log progress
      logger.info('run-comprehensive-crawl.js', `Progress: ${stats.pagesCrawled}/${MAX_PAGES} pages crawled, ${urlQueue.length} URLs in queue`);
    }

    // Save statistics
    await saveStats();

    // Save URLs
    await saveUrls();

    // Generate sitemap
    await generateSitemap();

    // Log crawl end
    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_END,
      BASE_URL,
      Crawl4AIStatus.SUCCESS,
      {
        durationMs: stats.durationSeconds * 1000,
        details: {
          pagesCrawled: stats.pagesCrawled,
          screenshotsTaken: stats.screenshotsTaken,
          failedPages: stats.failedPages,
          totalLinksFound: stats.totalLinksFound,
          totalImagesFound: stats.totalImagesFound,
          componentsIdentified: stats.componentsIdentified
        }
      }
    );

    logger.info('run-comprehensive-crawl.js', `Comprehensive crawl completed. Processed ${stats.pagesCrawled} pages.`);
  } catch (error) {
    logger.error('run-comprehensive-crawl.js', `Error in main function: ${error.message}`);

    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_END,
      BASE_URL,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );
  }
}

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
