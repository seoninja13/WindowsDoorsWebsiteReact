/**
 * Comprehensive Crawl Script
 *
 * This script performs a comprehensive crawl of the Window World LA website,
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

// Import logging utility
const {
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
 * Extract URLs from the website
 * @returns {Promise<string[]>} - Array of URLs
 */
async function extractUrls() {
  try {
    const startTime = Date.now();

    logger.info('comprehensive-crawl.js', `Extracting URLs from ${BASE_URL}`);

    const response = await axios.post('http://localhost:3000/api/crawl/extract-urls', {
      baseUrl: BASE_URL,
      maxPages: MAX_PAGES
    });

    const urls = response.data.urls || [];

    const endTime = Date.now();
    const durationMs = endTime - startTime;

    await logCrawl4AIOperation(
      Crawl4AIOperation.EXTRACT_LINKS,
      BASE_URL,
      Crawl4AIStatus.SUCCESS,
      {
        durationMs,
        linksExtracted: urls.length,
        details: {
          maxPages: MAX_PAGES
        }
      }
    );

    logger.info('comprehensive-crawl.js', `Extracted ${urls.length} URLs in ${durationMs}ms`);

    return urls;
  } catch (error) {
    logger.error('comprehensive-crawl.js', `Error extracting URLs: ${error.message}`);

    await logCrawl4AIOperation(
      Crawl4AIOperation.EXTRACT_LINKS,
      BASE_URL,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );

    return [];
  }
}

/**
 * Extract content from a URL
 * @param {string} url - URL to extract content from
 * @returns {Promise<Object|null>} - Extracted content or null if failed
 */
async function extractContent(url) {
  try {
    const startTime = Date.now();

    logger.info('comprehensive-crawl.js', `Extracting content from ${url}`);

    const response = await axios.post('http://localhost:3000/api/crawl/extract-content', {
      url
    });

    const content = response.data.content || {};

    const endTime = Date.now();
    const durationMs = endTime - startTime;

    await logCrawl4AIOperation(
      Crawl4AIOperation.EXTRACT_CONTENT,
      url,
      Crawl4AIStatus.SUCCESS,
      {
        durationMs,
        pageTitle: content.title,
        contentExtracted: true,
        details: {
          contentLength: content.html ? content.html.length : 0
        }
      }
    );

    logger.info('comprehensive-crawl.js', `Extracted content from ${url} in ${durationMs}ms`);

    return content;
  } catch (error) {
    logger.error('comprehensive-crawl.js', `Error extracting content from ${url}: ${error.message}`);

    await logCrawl4AIOperation(
      Crawl4AIOperation.EXTRACT_CONTENT,
      url,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );

    return null;
  }
}

/**
 * Capture screenshot of a URL
 * @param {string} url - URL to capture screenshot of
 * @param {string} outputPath - Path to save screenshot to
 * @returns {Promise<boolean>} - True if successful, false if failed
 */
async function captureScreenshot(url, outputPath) {
  try {
    const startTime = Date.now();

    logger.info('comprehensive-crawl.js', `Capturing screenshot of ${url}`);

    const response = await axios.post('http://localhost:3000/api/crawl/capture-screenshot', {
      url
    }, {
      responseType: 'arraybuffer'
    });

    await fs.writeFile(outputPath, response.data);

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

    logger.info('comprehensive-crawl.js', `Captured screenshot of ${url} in ${durationMs}ms`);

    return true;
  } catch (error) {
    logger.error('comprehensive-crawl.js', `Error capturing screenshot of ${url}: ${error.message}`);

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
 * Extract images from a URL
 * @param {string} url - URL to extract images from
 * @returns {Promise<Object[]>} - Array of image objects
 */
async function extractImages(url) {
  try {
    const startTime = Date.now();

    logger.info('comprehensive-crawl.js', `Extracting images from ${url}`);

    const response = await axios.post('http://localhost:3000/api/crawl/extract-images', {
      url
    });

    const images = response.data.images || [];

    const endTime = Date.now();
    const durationMs = endTime - startTime;

    await logCrawl4AIOperation(
      Crawl4AIOperation.EXTRACT_IMAGES,
      url,
      Crawl4AIStatus.SUCCESS,
      {
        durationMs,
        imagesExtracted: images.length,
        details: {
          imageUrls: images.map(img => img.url)
        }
      }
    );

    logger.info('comprehensive-crawl.js', `Extracted ${images.length} images from ${url} in ${durationMs}ms`);

    return images;
  } catch (error) {
    logger.error('comprehensive-crawl.js', `Error extracting images from ${url}: ${error.message}`);

    await logCrawl4AIOperation(
      Crawl4AIOperation.EXTRACT_IMAGES,
      url,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );

    return [];
  }
}

/**
 * Extract UI components from a URL
 * @param {string} url - URL to extract components from
 * @returns {Promise<Object[]>} - Array of component objects
 */
async function extractComponents(url) {
  try {
    const startTime = Date.now();

    logger.info('comprehensive-crawl.js', `Extracting components from ${url}`);

    const response = await axios.post('http://localhost:3000/api/crawl/extract-components', {
      url
    });

    const components = response.data.components || [];

    const endTime = Date.now();
    const durationMs = endTime - startTime;

    await logCrawl4AIOperation(
      Crawl4AIOperation.EXTRACT_COMPONENTS,
      url,
      Crawl4AIStatus.SUCCESS,
      {
        durationMs,
        componentsIdentified: components.length,
        details: {
          componentTypes: components.map(comp => comp.type)
        }
      }
    );

    logger.info('comprehensive-crawl.js', `Extracted ${components.length} components from ${url} in ${durationMs}ms`);

    return components;
  } catch (error) {
    logger.error('comprehensive-crawl.js', `Error extracting components from ${url}: ${error.message}`);

    await logCrawl4AIOperation(
      Crawl4AIOperation.EXTRACT_COMPONENTS,
      url,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );

    return [];
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

    // Extract content
    const content = await extractContent(url);

    if (!content) {
      stats.failedPages++;
      return;
    }

    // Save content
    await fs.writeFile(
      path.join(contentDir, 'content.html'),
      content.html || ''
    );

    await fs.writeFile(
      path.join(contentDir, 'content.md'),
      content.markdown || ''
    );

    // Save metadata
    const metadata = {
      url,
      title: content.title || '',
      description: content.description || '',
      path: urlPath,
      crawl_time: new Date().toISOString()
    };

    await fs.writeFile(
      path.join(contentDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    // Capture screenshot
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');
    const screenshotSuccess = await captureScreenshot(url, screenshotPath);

    if (screenshotSuccess) {
      stats.screenshotsTaken++;
      metadata.screenshot_file = screenshotPath;
      metadata.has_screenshot = true;
    } else {
      metadata.has_screenshot = false;
    }

    // Extract images
    const images = await extractImages(url);
    stats.totalImagesFound += images.length;
    metadata.images = images;

    // Save images metadata
    await fs.writeFile(
      path.join(imagesDir, 'images.json'),
      JSON.stringify(images, null, 2)
    );

    // Extract components
    const components = await extractComponents(url);
    stats.componentsIdentified += components.length;
    metadata.components = components;

    // Save components metadata
    await fs.writeFile(
      path.join(componentsDir, 'components.json'),
      JSON.stringify(components, null, 2)
    );

    // Update metadata with images and components
    await fs.writeFile(
      path.join(contentDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    // Extract links from content
    const links = [];
    if (content.links) {
      for (const link of content.links) {
        const normalizedUrl = normalizeUrl(link, BASE_URL);
        if (normalizedUrl && isInternalUrl(normalizedUrl, BASE_URL) && !processedUrls.has(normalizedUrl)) {
          links.push(normalizedUrl);
          urlQueue.push(normalizedUrl);
          processedUrls.add(normalizedUrl);
        }
      }
    }

    metadata.links = links;
    stats.totalLinksFound += links.length;

    // Update metadata with links
    await fs.writeFile(
      path.join(contentDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    // Log crawl success
    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_PAGE,
      url,
      Crawl4AIStatus.SUCCESS,
      {
        pageTitle: content.title,
        contentExtracted: true,
        screenshotCaptured: screenshotSuccess,
        componentsIdentified: components.length,
        linksExtracted: links.length,
        imagesExtracted: images.length
      }
    );

    // Increment pages crawled
    stats.pagesCrawled++;

    logger.info('comprehensive-crawl.js', `Successfully processed ${url}`);
  } catch (error) {
    logger.error('comprehensive-crawl.js', `Error processing ${url}: ${error.message}`);

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

    logger.info('comprehensive-crawl.js', `Crawl statistics saved to ${path.join(OUTPUT_DIR, 'crawl_stats.json')}`);
  } catch (error) {
    logger.error('comprehensive-crawl.js', `Error saving crawl statistics: ${error.message}`);
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

    logger.info('comprehensive-crawl.js', `Starting comprehensive crawl of ${BASE_URL}`);

    // Create output directories
    await ensureDir(OUTPUT_DIR);
    await ensureDir(CONTENT_DIR);
    await ensureDir(SCREENSHOTS_DIR);
    await ensureDir(COMPONENTS_DIR);
    await ensureDir(IMAGES_DIR);

    // Extract URLs
    const urls = await extractUrls();

    // Add URLs to queue
    for (const url of urls) {
      if (!processedUrls.has(url)) {
        urlQueue.push(url);
        processedUrls.add(url);
      }
    }

    logger.info('comprehensive-crawl.js', `Added ${urlQueue.length} URLs to the queue`);

    // Process URLs
    while (urlQueue.length > 0 && stats.pagesCrawled < MAX_PAGES) {
      const url = urlQueue.shift();
      await processUrl(url);

      // Log progress
      logger.info('comprehensive-crawl.js', `Progress: ${stats.pagesCrawled}/${MAX_PAGES} pages crawled`);
    }

    // Save statistics
    await saveStats();

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

    logger.info('comprehensive-crawl.js', `Comprehensive crawl completed. Processed ${stats.pagesCrawled} pages.`);
  } catch (error) {
    logger.error('comprehensive-crawl.js', `Error in main function: ${error.message}`);

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