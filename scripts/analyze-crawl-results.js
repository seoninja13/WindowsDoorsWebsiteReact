/**
 * Analyze Crawl Results
 *
 * This script analyzes the results of the comprehensive crawl and generates
 * a report of the website structure, pages, components, and other elements.
 */

// Import required modules
const fs = require('fs').promises;
const path = require('path');

// Simple logging function
function logger(level, source, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] [${source}] ${message}`);
  return true;
}

// Logger object
const log = {
  debug: (source, message) => logger('DEBUG', source, message),
  info: (source, message) => logger('INFO', source, message),
  warn: (source, message) => logger('WARN', source, message),
  error: (source, message) => logger('ERROR', source, message),
  fatal: (source, message) => logger('FATAL', source, message)
};

// Output directories
const OUTPUT_DIR = path.join(__dirname, '..', 'crawl_results');
const CONTENT_DIR = path.join(OUTPUT_DIR, 'content');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');
const COMPONENTS_DIR = path.join(OUTPUT_DIR, 'components');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const URLS_FILE = path.join(OUTPUT_DIR, 'urls.json');
const SITEMAP_FILE = path.join(OUTPUT_DIR, 'sitemap.xml');
const STATS_FILE = path.join(OUTPUT_DIR, 'crawl_stats.json');
const ANALYSIS_FILE = path.join(OUTPUT_DIR, 'analysis.json');
const REPORT_FILE = path.join(OUTPUT_DIR, 'report.md');

// Analysis results
const analysis = {
  totalPages: 0,
  totalScreenshots: 0,
  totalComponents: 0,
  totalImages: 0,
  pageTypes: {},
  componentTypes: {},
  imageTypes: {},
  urlStructure: {},
  missingPages: [],
  missingComponents: [],
  missingImages: []
};

/**
 * Check if a file exists
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} - True if the file exists, false otherwise
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Read JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<Object|null>} - Parsed JSON object or null if failed
 */
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    log.error('analyze-crawl-results.js', `Error reading JSON file ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Analyze URL structure
 * @param {string[]} urls - Array of URLs
 */
function analyzeUrlStructure(urls) {
  const urlStructure = {};

  for (const url of urls) {
    try {
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;

      // Skip the root path
      if (path === '/') {
        urlStructure['/'] = 'Home';
        continue;
      }

      // Split the path into segments
      const segments = path.split('/').filter(segment => segment.length > 0);

      // Build the URL structure
      let currentPath = '';
      let currentStructure = urlStructure;

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;

        if (!currentStructure[segment]) {
          currentStructure[segment] = {};
        }

        currentStructure = currentStructure[segment];
      }
    } catch (error) {
      log.error('analyze-crawl-results.js', `Error analyzing URL structure for ${url}: ${error.message}`);
    }
  }

  return urlStructure;
}

/**
 * Analyze page types
 * @param {Object[]} pages - Array of page metadata objects
 */
function analyzePageTypes(pages) {
  const pageTypes = {};

  for (const page of pages) {
    try {
      const url = page.url;
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;

      // Skip the root path
      if (path === '/') {
        if (!pageTypes['home']) {
          pageTypes['home'] = [];
        }

        pageTypes['home'].push(url);
        continue;
      }

      // Split the path into segments
      const segments = path.split('/').filter(segment => segment.length > 0);

      // Determine page type based on first segment
      const pageType = segments[0];

      if (!pageTypes[pageType]) {
        pageTypes[pageType] = [];
      }

      pageTypes[pageType].push(url);
    } catch (error) {
      log.error('analyze-crawl-results.js', `Error analyzing page type for ${page.url}: ${error.message}`);
    }
  }

  return pageTypes;
}

/**
 * Analyze component types
 * @param {Object[]} components - Array of component objects
 */
function analyzeComponentTypes(components) {
  const componentTypes = {};

  for (const component of components) {
    try {
      const type = component.type;

      if (!componentTypes[type]) {
        componentTypes[type] = 0;
      }

      componentTypes[type]++;
    } catch (error) {
      log.error('analyze-crawl-results.js', `Error analyzing component type: ${error.message}`);
    }
  }

  return componentTypes;
}

/**
 * Analyze image types
 * @param {Object[]} images - Array of image objects
 */
function analyzeImageTypes(images) {
  const imageTypes = {};

  for (const image of images) {
    try {
      const url = image.url;
      const extension = url.split('.').pop().toLowerCase();

      if (!imageTypes[extension]) {
        imageTypes[extension] = 0;
      }

      imageTypes[extension]++;
    } catch (error) {
      log.error('analyze-crawl-results.js', `Error analyzing image type: ${error.message}`);
    }
  }

  return imageTypes;
}

/**
 * Generate report
 * @param {Object} analysis - Analysis results
 * @returns {string} - Markdown report
 */
function generateReport(analysis) {
  let report = '# Crawl Results Analysis\n\n';

  // Add summary
  report += '## Summary\n\n';
  report += `- Total Pages: ${analysis.totalPages}\n`;
  report += `- Total Screenshots: ${analysis.totalScreenshots}\n`;
  report += `- Total Components: ${analysis.totalComponents}\n`;
  report += `- Total Images: ${analysis.totalImages}\n\n`;

  // Add page types
  report += '## Page Types\n\n';
  report += '| Type | Count |\n';
  report += '|------|-------|\n';

  for (const [type, urls] of Object.entries(analysis.pageTypes)) {
    report += `| ${type} | ${urls.length} |\n`;
  }

  report += '\n';

  // Add component types
  report += '## Component Types\n\n';
  report += '| Type | Count |\n';
  report += '|------|-------|\n';

  for (const [type, count] of Object.entries(analysis.componentTypes)) {
    report += `| ${type} | ${count} |\n`;
  }

  report += '\n';

  // Add image types
  report += '## Image Types\n\n';
  report += '| Type | Count |\n';
  report += '|------|-------|\n';

  for (const [type, count] of Object.entries(analysis.imageTypes)) {
    report += `| ${type} | ${count} |\n`;
  }

  report += '\n';

  // Add URL structure
  report += '## URL Structure\n\n';
  report += '```\n';
  report += JSON.stringify(analysis.urlStructure, null, 2);
  report += '\n```\n\n';

  // Add missing pages
  if (analysis.missingPages.length > 0) {
    report += '## Missing Pages\n\n';

    for (const page of analysis.missingPages) {
      report += `- ${page}\n`;
    }

    report += '\n';
  }

  // Add missing components
  if (analysis.missingComponents.length > 0) {
    report += '## Missing Components\n\n';

    for (const component of analysis.missingComponents) {
      report += `- ${component}\n`;
    }

    report += '\n';
  }

  // Add missing images
  if (analysis.missingImages.length > 0) {
    report += '## Missing Images\n\n';

    for (const image of analysis.missingImages) {
      report += `- ${image}\n`;
    }

    report += '\n';
  }

  return report;
}

/**
 * Main function
 */
async function main() {
  try {
    log.info('analyze-crawl-results.js', 'Starting analysis of crawl results');

    // Check if crawl results exist
    const statsExists = await fileExists(STATS_FILE);
    const urlsExists = await fileExists(URLS_FILE);

    if (!statsExists || !urlsExists) {
      log.error('analyze-crawl-results.js', 'Crawl results not found');
      console.error('Crawl results not found. Please run the comprehensive crawl first.');
      process.exit(1);
    }

    // Read crawl statistics
    const stats = await readJsonFile(STATS_FILE);

    if (!stats) {
      log.error('analyze-crawl-results.js', 'Failed to read crawl statistics');
      console.error('Failed to read crawl statistics');
      process.exit(1);
    }

    // Read URLs
    const urls = await readJsonFile(URLS_FILE);

    if (!urls) {
      log.error('analyze-crawl-results.js', 'Failed to read URLs');
      console.error('Failed to read URLs');
      process.exit(1);
    }

    // Analyze URL structure
    analysis.urlStructure = analyzeUrlStructure(urls);

    // Read page metadata
    const pages = [];
    const components = [];
    const images = [];

    for (const url of urls) {
      try {
        const parsedUrl = new URL(url);
        const path = parsedUrl.pathname;

        // Extract path from URL
        let urlPath = path;

        // Remove leading and trailing slashes
        urlPath = urlPath.replace(/^\/|\/$/g, '');

        // If path is empty, use 'home'
        if (!urlPath) {
          urlPath = 'home';
        }

        // Replace remaining slashes with underscores
        urlPath = urlPath.replace(/\//g, '_');

        // Read page metadata
        const metadataPath = `${CONTENT_DIR}/${urlPath}/metadata.json`;
        const metadata = await readJsonFile(metadataPath);

        if (metadata) {
          pages.push(metadata);

          // Check if screenshot exists
          if (metadata.has_screenshot) {
            analysis.totalScreenshots++;
          }

          // Add components
          if (metadata.components) {
            components.push(...metadata.components);
            analysis.totalComponents += metadata.components.length;
          }

          // Add images
          if (metadata.images) {
            images.push(...metadata.images);
            analysis.totalImages += metadata.images.length;
          }
        }
      } catch (error) {
        log.error('analyze-crawl-results.js', `Error reading metadata for ${url}: ${error.message}`);
      }
    }

    // Update analysis
    analysis.totalPages = pages.length;
    analysis.pageTypes = analyzePageTypes(pages);
    analysis.componentTypes = analyzeComponentTypes(components);
    analysis.imageTypes = analyzeImageTypes(images);

    // Save analysis
    await fs.writeFile(
      ANALYSIS_FILE,
      JSON.stringify(analysis, null, 2)
    );

    // Generate report
    const report = generateReport(analysis);

    // Save report
    await fs.writeFile(
      REPORT_FILE,
      report
    );

    log.info('analyze-crawl-results.js', `Analysis completed and saved to ${ANALYSIS_FILE}`);
    log.info('analyze-crawl-results.js', `Report generated and saved to ${REPORT_FILE}`);

    console.log(`Analysis completed and saved to ${ANALYSIS_FILE}`);
    console.log(`Report generated and saved to ${REPORT_FILE}`);
  } catch (error) {
    log.error('analyze-crawl-results.js', `Error in main function: ${error.message}`);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
