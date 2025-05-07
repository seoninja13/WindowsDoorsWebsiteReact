/**
 * Database Population Script for Windows Doors Website React
 *
 * This script populates the Supabase database with initial data from the crawled website.
 * It reads data from the crawled-data directory and inserts it into the appropriate tables.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Paths to crawled data files
const SITE_STRUCTURE_PATH = path.join(__dirname, '../public/crawled-data/site-structure.json');
const PAGES_PATH = path.join(__dirname, '../public/crawled-data/pages.json');
const IMAGES_PATH = path.join(__dirname, '../public/crawled-data/images.json');
const SCREENSHOTS_DIR = path.join(__dirname, '../public/crawled-data/screenshots');

// Helper function to log progress
function logProgress(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Helper function to read JSON file
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Helper function to extract path from URL
function extractPathFromUrl(url) {
  try {
    const urlObj = new URL(url);
    let path = urlObj.pathname;

    // Remove trailing slash if present
    if (path.endsWith('/') && path !== '/') {
      path = path.slice(0, -1);
    }

    // Use 'home' for the root path
    if (path === '/') {
      return 'home';
    }

    // Remove leading slash
    return path.startsWith('/') ? path.substring(1) : path;
  } catch (error) {
    console.error(`Error extracting path from URL ${url}:`, error);
    return url;
  }
}

// Helper function to determine product category from URL
function determineProductCategory(url) {
  const path = extractPathFromUrl(url);

  if (path.includes('windows')) {
    return 'windows';
  } else if (path.includes('doors')) {
    return 'doors';
  } else if (path.includes('vinyl-siding') || path.includes('siding')) {
    return 'siding';
  } else if (path.includes('roofing')) {
    return 'roofing';
  }

  return null;
}

// Helper function to determine if a page is a product page
function isProductPage(url) {
  const productCategories = ['windows', 'doors', 'vinyl-siding', 'roofing'];
  const path = extractPathFromUrl(url);

  return productCategories.some(category => path.includes(category));
}

// Helper function to determine if a page is a blog post
function isBlogPost(url) {
  const path = extractPathFromUrl(url);
  return path.startsWith('blog/') && path !== 'blog/' && !path.includes('page/');
}

// Helper function to determine if a page is a service area
function isServiceArea(url) {
  const path = extractPathFromUrl(url);
  return path.startsWith('service-areas/') && path !== 'service-areas/';
}

// Main function to populate the database
async function populateDatabase() {
  logProgress('Starting database population...');

  try {
    // Read crawled data
    const siteStructure = readJsonFile(SITE_STRUCTURE_PATH);
    const pages = readJsonFile(PAGES_PATH);
    const images = readJsonFile(IMAGES_PATH);

    if (!siteStructure || !pages || !images) {
      throw new Error('Failed to read crawled data files.');
    }

    // Populate product categories
    await populateProductCategories();

    // Populate pages
    await populatePages(siteStructure, pages);

    // Populate navigation
    await populateNavigation(siteStructure);

    // Populate products
    await populateProducts(siteStructure, pages);

    // Populate blog posts
    await populateBlogPosts(siteStructure, pages);

    // Populate service areas
    await populateServiceAreas(siteStructure, pages);

    // Populate images
    await populateImages(images);

    logProgress('Database population completed successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

// Function to populate product categories
async function populateProductCategories() {
  logProgress('Populating product categories...');

  const categories = [
    {
      name: 'Windows',
      slug: 'windows',
      description: 'Replacement windows for your home, including double-hung, sliding, casement, and more.',
      display_order: 1
    },
    {
      name: 'Doors',
      slug: 'doors',
      description: 'Entry doors, patio doors, and garage doors for your home.',
      display_order: 2
    },
    {
      name: 'Vinyl Siding',
      slug: 'vinyl-siding',
      description: 'Vinyl siding options for your home, including various series and colors.',
      display_order: 3
    },
    {
      name: 'Roofing',
      slug: 'roofing',
      description: 'Roofing options for your home.',
      display_order: 4
    }
  ];

  for (const category of categories) {
    const { data, error } = await supabase
      .from('product_categories')
      .upsert(category, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Error inserting product category ${category.name}:`, error);
    } else {
      logProgress(`Inserted product category: ${category.name}`);
    }
  }
}

// Function to populate pages
async function populatePages(siteStructure, pages) {
  logProgress('Populating pages...');

  for (const page of siteStructure.pages) {
    if (!page.url || !page.title) continue;

    const path = extractPathFromUrl(page.url);
    const pageData = pages[page.url];

    // Skip product pages, blog posts, and service areas (they'll be handled separately)
    if (isProductPage(page.url) || isBlogPost(page.url) || isServiceArea(page.url)) {
      continue;
    }

    const pageRecord = {
      url: page.url,
      path,
      title: page.title,
      description: pageData?.metadata?.description || null,
      meta_keywords: pageData?.metadata?.keywords || null,
      content: pageData?.content || null,
      screenshot_url: `/crawled-data/screenshots/${path}/screenshot.png`,
      has_screenshot: fs.existsSync(path.join(SCREENSHOTS_DIR, path, 'screenshot.png'))
    };

    const { data, error } = await supabase
      .from('pages')
      .upsert(pageRecord, { onConflict: 'url' })
      .select();

    if (error) {
      console.error(`Error inserting page ${page.url}:`, error);
    } else {
      logProgress(`Inserted page: ${page.url}`);
    }
  }
}

// Function to populate navigation
async function populateNavigation(siteStructure) {
  logProgress('Populating navigation...');

  // Process main navigation
  if (siteStructure.navigation && siteStructure.navigation.main) {
    for (let i = 0; i < siteStructure.navigation.main.length; i++) {
      const item = siteStructure.navigation.main[i];

      const navRecord = {
        parent_id: null,
        name: item.text || extractPathFromUrl(item.url),
        url: item.url,
        display_order: i,
        menu_location: 'main'
      };

      const { data, error } = await supabase
        .from('navigation')
        .upsert(navRecord, { onConflict: ['url', 'menu_location'] })
        .select();

      if (error) {
        console.error(`Error inserting navigation item ${item.url}:`, error);
      } else {
        logProgress(`Inserted navigation item: ${item.url}`);
      }
    }
  }

  // Process footer navigation
  if (siteStructure.navigation && siteStructure.navigation.footer) {
    for (let i = 0; i < siteStructure.navigation.footer.length; i++) {
      const item = siteStructure.navigation.footer[i];

      const navRecord = {
        parent_id: null,
        name: item.text || extractPathFromUrl(item.url),
        url: item.url,
        display_order: i,
        menu_location: 'footer'
      };

      const { data, error } = await supabase
        .from('navigation')
        .upsert(navRecord, { onConflict: ['url', 'menu_location'] })
        .select();

      if (error) {
        console.error(`Error inserting navigation item ${item.url}:`, error);
      } else {
        logProgress(`Inserted navigation item: ${item.url}`);
      }
    }
  }
}

// Function to populate products
async function populateProducts(siteStructure, pages) {
  logProgress('Populating products...');

  // Get product category IDs
  const { data: categories, error: categoriesError } = await supabase
    .from('product_categories')
    .select('id, slug');

  if (categoriesError) {
    console.error('Error fetching product categories:', categoriesError);
    return;
  }

  const categoryMap = categories.reduce((map, category) => {
    map[category.slug] = category.id;
    return map;
  }, {});

  for (const page of siteStructure.pages) {
    if (!page.url || !page.title) continue;

    // Check if this is a product page
    const categorySlug = determineProductCategory(page.url);
    if (!categorySlug || !categoryMap[categorySlug]) continue;

    const path = extractPathFromUrl(page.url);
    const pageData = pages[page.url];

    // Skip category index pages
    if (path === 'windows' || path === 'doors' || path === 'vinyl-siding' || path === 'roofing') {
      continue;
    }

    // Extract product name from title
    let productName = page.title;
    if (productName.includes('|')) {
      productName = productName.split('|')[0].trim();
    }

    const productSlug = path.split('/').pop();

    const productRecord = {
      category_id: categoryMap[categorySlug],
      name: productName,
      slug: productSlug,
      description: pageData?.content || null,
      thumbnail_url: `/crawled-data/screenshots/${path}/screenshot.png`,
      is_active: true
    };

    const { data, error } = await supabase
      .from('products')
      .upsert(productRecord, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Error inserting product ${productSlug}:`, error);
    } else {
      logProgress(`Inserted product: ${productName}`);
    }
  }
}

// Function to populate blog posts
async function populateBlogPosts(siteStructure, pages) {
  logProgress('Populating blog posts...');

  for (const page of siteStructure.pages) {
    if (!page.url || !page.title) continue;

    // Check if this is a blog post
    if (!isBlogPost(page.url)) continue;

    const path = extractPathFromUrl(page.url);
    const pageData = pages[page.url];
    const slug = path.split('/').pop();

    const blogPostRecord = {
      title: page.title,
      slug,
      content: pageData?.content || '',
      featured_image_url: `/crawled-data/screenshots/${path}/screenshot.png`,
      is_published: true,
      published_date: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(blogPostRecord, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Error inserting blog post ${slug}:`, error);
    } else {
      logProgress(`Inserted blog post: ${page.title}`);
    }
  }
}

// Function to populate service areas
async function populateServiceAreas(siteStructure, pages) {
  logProgress('Populating service areas...');

  for (const page of siteStructure.pages) {
    if (!page.url || !page.title) continue;

    // Check if this is a service area page
    if (!isServiceArea(page.url)) continue;

    const path = extractPathFromUrl(page.url);
    const pageData = pages[page.url];
    const slug = path.split('/').pop();

    // Extract location name from title
    let locationName = page.title;
    if (locationName.includes('|')) {
      locationName = locationName.split('|')[0].trim();
    }

    const serviceAreaRecord = {
      name: locationName,
      slug,
      description: pageData?.metadata?.description || null,
      meta_title: page.title,
      meta_description: pageData?.metadata?.description || null,
      content: pageData?.content || null,
      image_url: `/crawled-data/screenshots/${path}/screenshot.png`,
      is_active: true
    };

    const { data, error } = await supabase
      .from('service_areas')
      .upsert(serviceAreaRecord, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Error inserting service area ${slug}:`, error);
    } else {
      logProgress(`Inserted service area: ${locationName}`);
    }
  }
}

// Function to populate images
async function populateImages(images) {
  logProgress('Populating images...');

  // Get product IDs
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, slug');

  if (productsError) {
    console.error('Error fetching products:', productsError);
    return;
  }

  const productMap = products.reduce((map, product) => {
    map[product.slug] = product.id;
    return map;
  }, {});

  // Process each image
  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    // Skip duplicate images
    if (i > 0 && images.findIndex(img => img.url === image.url) < i) {
      continue;
    }

    // Try to determine which product this image belongs to
    let productId = null;
    for (const [slug, id] of Object.entries(productMap)) {
      if (image.url.includes(slug)) {
        productId = id;
        break;
      }
    }

    // If we couldn't determine a product, skip this image
    if (!productId) continue;

    const imageRecord = {
      product_id: productId,
      image_url: image.url,
      alt_text: image.alt || null,
      is_primary: i === 0, // Make the first image primary
      display_order: i
    };

    const { data, error } = await supabase
      .from('product_images')
      .upsert(imageRecord, { onConflict: ['product_id', 'image_url'] })
      .select();

    if (error) {
      console.error(`Error inserting image ${image.url}:`, error);
    } else {
      logProgress(`Inserted image: ${image.url}`);
    }
  }
}

// Call the main function
populateDatabase()
  .then(() => {
    console.log('Script completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
