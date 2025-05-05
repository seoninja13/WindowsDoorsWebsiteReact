const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Configuration
const TARGET_WEBSITE = 'https://www.windowworldla.com/';
const MAX_PAGES = 100;
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'crawled-data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

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
 * Crawl a single page
 */
async function crawlPage(url) {
  if (visitedUrls.has(url)) {
    return [];
  }
  
  console.log(`Crawling: ${url}`);
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
    
    // Store page data
    pageData[url] = {
      url,
      metadata,
      content,
      images: pageImages,
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
    
    return links;
  } catch (error) {
    console.error(`Error crawling ${url}:`, error.message);
    return [];
  }
}

/**
 * Main crawl function
 */
async function crawl(startUrl, maxPages) {
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
  }
  
  console.log(`Crawling complete. Visited ${visitedUrls.size} pages.`);
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
  
  // Generate sitemap
  const sitemap = generateSitemap(Array.from(visitedUrls));
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'sitemap.xml'),
    sitemap
  );
  
  console.log(`Data saved to ${OUTPUT_DIR}`);
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
  console.log(`Starting crawl of ${TARGET_WEBSITE} (max ${MAX_PAGES} pages)`);
  await crawl(TARGET_WEBSITE, MAX_PAGES);
  saveData();
})();
