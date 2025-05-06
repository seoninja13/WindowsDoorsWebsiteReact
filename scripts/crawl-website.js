const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');

// Import logging utility
const {
  LogLevel,
  Crawl4AIOperation,
  Crawl4AIStatus,
  logCrawl4AIOperation,
  logger
} = require('../lib/logging');

// Configuration
const TARGET_WEBSITE = 'https://www.windowworldla.com/';
const MAX_PAGES = Number.MAX_SAFE_INTEGER; // Set to unlimited (JavaScript's maximum safe integer)
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'crawled-data');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');
const COMPONENTS_DIR = path.join(OUTPUT_DIR, 'components');

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

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}
if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
}

// Log directory creation
logger.info('crawl-website.js', `Created output directories:
  - ${OUTPUT_DIR}
  - ${SCREENSHOTS_DIR}
  - ${COMPONENTS_DIR}`);

// Store visited URLs to avoid duplicates
const visitedUrls = new Set();
const pageData = {};
const images = [];
const siteStructure = {
  pages: [],
  navigation: {},
};

/**
 * Normalize URL to avoid duplicates
 */
function normalizeUrl(urlString, base) {
  try {
    const parsedUrl = new URL(urlString, base);

    // Remove trailing slash
    let normalized = parsedUrl.href;
    if (normalized.endsWith('/') && normalized.length > 1) {
      normalized = normalized.slice(0, -1);
    }

    // Remove query parameters and hash
    const urlObj = new URL(normalized);
    urlObj.search = '';
    urlObj.hash = '';

    return urlObj.href;
  } catch (error) {
    console.error(`Error normalizing URL ${urlString}:`, error.message);
    return null;
  }
}

/**
 * Check if URL belongs to the target website
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
 * Extract links from HTML
 */
function extractLinks($, baseUrl) {
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
}

/**
 * Extract images from HTML
 */
function extractImages($, baseUrl) {
  const imageUrls = [];

  $('img').each((i, element) => {
    const src = $(element).attr('src');
    if (src) {
      const normalizedUrl = normalizeUrl(src, baseUrl);
      if (normalizedUrl) {
        const alt = $(element).attr('alt') || '';
        imageUrls.push({
          url: normalizedUrl,
          alt,
          width: $(element).attr('width') || '',
          height: $(element).attr('height') || '',
        });
      }
    }
  });

  return imageUrls;
}

/**
 * Extract page metadata
 */
function extractMetadata($) {
  const metadata = {
    title: $('title').text().trim(),
    description: $('meta[name="description"]').attr('content') || '',
    keywords: $('meta[name="keywords"]').attr('content') || '',
  };

  return metadata;
}

/**
 * Extract navigation structure
 */
function extractNavigation($, baseUrl) {
  const navigation = {};

  // Main navigation
  navigation.main = [];
  $('header nav a, .main-nav a, .primary-nav a').each((i, element) => {
    const href = $(element).attr('href');
    if (href) {
      const normalizedUrl = normalizeUrl(href, baseUrl);
      if (normalizedUrl && isInternalUrl(normalizedUrl, baseUrl)) {
        navigation.main.push({
          url: normalizedUrl,
          text: $(element).text().trim(),
        });
      }
    }
  });

  // Footer navigation
  navigation.footer = [];
  $('footer a').each((i, element) => {
    const href = $(element).attr('href');
    if (href) {
      const normalizedUrl = normalizeUrl(href, baseUrl);
      if (normalizedUrl && isInternalUrl(normalizedUrl, baseUrl)) {
        navigation.footer.push({
          url: normalizedUrl,
          text: $(element).text().trim(),
        });
      }
    }
  });

  return navigation;
}

/**
 * Extract main content
 */
function extractMainContent($) {
  // Try to find main content area
  let content = $('main').html() || $('article').html() || $('#content').html() || $('.content').html();

  // If no specific content area found, use body content
  if (!content) {
    content = $('body').html();
  }

  return content;
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

    logger.info('crawl-website.js', `Taking screenshot of ${url}`);

    // Ensure the directory for the screenshot exists
    const screenshotDir = path.dirname(outputPath);
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
      logger.info('crawl-website.js', `Created screenshot directory: ${screenshotDir}`);
    }

    // Use puppeteer to take a screenshot
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for any lazy-loaded content
    // In newer versions of Puppeteer, waitForTimeout is not directly on the page object
    await new Promise(resolve => setTimeout(resolve, 2000));

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

    logger.info('crawl-website.js', `Took screenshot of ${url} in ${durationMs}ms`);

    return true;
  } catch (error) {
    logger.error('crawl-website.js', `Error taking screenshot of ${url}: ${error.message}`);

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
 * Extract UI components from HTML
 * @param {object} $ - Cheerio instance
 * @returns {Object[]} - Array of component objects
 */
function extractComponents($) {
  try {
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
    logger.error('crawl-website.js', `Error extracting components: ${error.message}`);
    return [];
  }
}

/**
 * Crawl a single page
 */
async function crawlPage(url) {
  if (visitedUrls.has(url)) {
    return [];
  }

  logger.info('crawl-website.js', `Crawling: ${url}`);

  // Log crawl start
  await logCrawl4AIOperation(
    Crawl4AIOperation.CRAWL_PAGE,
    url,
    Crawl4AIStatus.IN_PROGRESS
  );

  visitedUrls.add(url);

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract page data
    const links = extractLinks($, url);
    const pageImages = extractImages($, url);
    const metadata = extractMetadata($);
    const navigation = extractNavigation($, url);
    const content = extractMainContent($);
    const components = extractComponents($);

    // Update statistics
    stats.totalLinksFound += links.length;
    stats.totalImagesFound += pageImages.length;
    stats.componentsIdentified += components.length;

    // Take screenshot
    const urlPath = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '_');

    // Create a more organized directory structure for screenshots
    // Extract domain and path parts
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const pathParts = urlObj.pathname.split('/').filter(part => part);

    // Create a path that includes domain and path structure
    let screenshotDir = SCREENSHOTS_DIR;
    if (pathParts.length > 0) {
      // If there's a path, create a subdirectory structure
      screenshotDir = path.join(SCREENSHOTS_DIR, ...pathParts);
    } else {
      // If it's the root page, put it in a 'root' directory
      screenshotDir = path.join(SCREENSHOTS_DIR, 'root');
    }

    const screenshotPath = path.join(screenshotDir, `${urlPath}.png`);
    const screenshotSuccess = await takeScreenshot(url, screenshotPath);

    if (screenshotSuccess) {
      stats.screenshotsTaken++;
    }

    // Store page data
    pageData[url] = {
      url,
      metadata,
      content,
      images: pageImages,
      components,
      screenshot: screenshotSuccess ? screenshotPath : null,
    };

    // Add to site structure
    siteStructure.pages.push({
      url,
      title: metadata.title,
    });

    // Store navigation data
    if (url === TARGET_WEBSITE) {
      siteStructure.navigation = navigation;
    }

    // Add images to global list
    images.push(...pageImages);

    // Save components
    fs.writeFileSync(
      path.join(COMPONENTS_DIR, `${urlPath}.json`),
      JSON.stringify(components, null, 2)
    );

    // Log crawl success
    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_PAGE,
      url,
      Crawl4AIStatus.SUCCESS,
      {
        durationMs: 0,
        pageTitle: metadata.title,
        contentExtracted: true,
        screenshotCaptured: screenshotSuccess,
        componentsIdentified: components.length,
        linksExtracted: links.length,
        imagesExtracted: pageImages.length
      }
    );

    // Increment pages crawled
    stats.pagesCrawled++;

    return links;
  } catch (error) {
    logger.error('crawl-website.js', `Error crawling ${url}: ${error.message}`);

    // Log crawl failure
    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_PAGE,
      url,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );

    stats.failedPages++;
    return [];
  }
}

/**
 * Main crawl function
 */
async function crawl(startUrl, maxPages) {
  // Log crawl start
  await logCrawl4AIOperation(
    Crawl4AIOperation.CRAWL_START,
    startUrl,
    Crawl4AIStatus.IN_PROGRESS,
    {
      details: {
        maxPages
      }
    }
  );

  logger.info('crawl-website.js', `Starting crawl of ${startUrl} (max ${maxPages} pages)`);

  const urlsToVisit = [startUrl];
  let pageCount = 0;

  while (urlsToVisit.length > 0 && pageCount < maxPages) {
    const currentUrl = urlsToVisit.shift();
    const newLinks = await crawlPage(currentUrl);

    // Add new links to the queue
    for (const link of newLinks) {
      if (!visitedUrls.has(link) && !urlsToVisit.includes(link)) {
        urlsToVisit.push(link);
      }
    }

    pageCount++;

    // Log progress
    logger.info('crawl-website.js', `Progress: ${pageCount}/${maxPages} pages crawled, ${urlsToVisit.length} URLs in queue`);
  }

  // Update statistics
  stats.endTime = new Date().toISOString();
  stats.durationSeconds = (new Date(stats.endTime) - new Date(stats.startTime)) / 1000;

  // Log crawl end
  await logCrawl4AIOperation(
    Crawl4AIOperation.CRAWL_END,
    startUrl,
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

  logger.info('crawl-website.js', `Crawling complete. Visited ${visitedUrls.size} pages in ${stats.durationSeconds} seconds.`);
}

/**
 * Save crawled data to files
 */
function saveData() {
  // Save page data
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'pages.json'),
    JSON.stringify(pageData, null, 2)
  );

  // Save images list
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'images.json'),
    JSON.stringify(images, null, 2)
  );

  // Save site structure
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'site-structure.json'),
    JSON.stringify(siteStructure, null, 2)
  );

  // Save URLs list
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'urls.txt'),
    Array.from(visitedUrls).join('\n')
  );

  // Save statistics
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'crawl-stats.json'),
    JSON.stringify(stats, null, 2)
  );

  // Generate sitemap
  const sitemap = generateSitemap(Array.from(visitedUrls));
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'sitemap.xml'),
    sitemap
  );

  logger.info('crawl-website.js', `Data saved to ${OUTPUT_DIR}`);
}

/**
 * Generate XML sitemap
 */
function generateSitemap(urls) {
  const today = new Date().toISOString().split('T')[0];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  }

  sitemap += '</urlset>';

  return sitemap;
}

// Run the crawler
(async () => {
  try {
    logger.info('crawl-website.js', `Starting crawl of ${TARGET_WEBSITE} (max ${MAX_PAGES} pages)`);
    await crawl(TARGET_WEBSITE, MAX_PAGES);
    saveData();
    logger.info('crawl-website.js', 'Crawl completed successfully');
  } catch (error) {
    logger.error('crawl-website.js', `Crawl failed: ${error.message}`);

    // Log crawl failure
    await logCrawl4AIOperation(
      Crawl4AIOperation.CRAWL_END,
      TARGET_WEBSITE,
      Crawl4AIStatus.FAILURE,
      {
        errorMessage: error.message
      }
    );
  }
})();
