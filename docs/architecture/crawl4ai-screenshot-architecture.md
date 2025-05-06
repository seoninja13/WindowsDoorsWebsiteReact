# Crawl4AI Screenshot Architecture

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > Crawl4AI Screenshot Architecture

## Overview

This document describes the architecture and implementation of the screenshot functionality in Crawl4AI, which is used to capture visual references of the Window World LA website for our cloning project.

## Architecture

The screenshot functionality is implemented as part of the Crawl4AI web scraping system. It uses Puppeteer, a Node.js library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol, to take screenshots of web pages.

### Components

1. **Puppeteer**: Used to launch a headless Chrome browser and take screenshots
2. **File System**: Used to save screenshots to disk
3. **Logging System**: Used to log the progress and results of the screenshot process
4. **Directory Structure**: Organized to mirror the URL structure of the website

### Flow

1. The crawler visits a URL
2. The page content is extracted
3. A screenshot is taken of the page
4. The screenshot is saved to disk
5. The path to the screenshot is stored in the page data
6. The process is repeated for all URLs on the website

## Implementation

### Screenshot Function

The core of the screenshot functionality is the `takeScreenshot` function:

```javascript
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
```

### Directory Structure

The directory structure for screenshots is created dynamically based on the URL structure:

```javascript
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
```

### Integration with Crawl Process

The screenshot functionality is integrated into the `crawlPage` function:

```javascript
async function crawlPage(url) {
  // ... (code omitted for brevity)

  // Take screenshot
  const urlPath = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '_');

  // Create directory structure (code shown above)

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

  // ... (code omitted for brevity)
}
```

## Configuration

The screenshot functionality is configured with the following parameters:

- **Viewport Size**: 1920x1080 pixels
- **Wait Time**: 2000ms (2 seconds) after page load to allow for lazy-loaded content
- **Timeout**: 60000ms (60 seconds) for page load
- **Full Page**: Screenshots capture the full page, not just the viewport
- **Format**: PNG format for high-quality images

## Output

The screenshots are saved to the `public/crawled-data/screenshots` directory, with subdirectories that mirror the URL structure of the website. For example:

- `public/crawled-data/screenshots/root/www_windowworldla_com_.png` (home page)
- `public/crawled-data/screenshots/windows/double-hung/www_windowworldla_com_windows_double_hung.png` (double-hung windows page)

## Logging

The screenshot process is logged to the Supabase database using the logging system:

- **System Logs**: General information about the screenshot process
- **Crawl4AI Logs**: Specific information about each screenshot operation
- **Error Logs**: Information about any errors that occur during the screenshot process

## Usage in the Project

The screenshots captured by Crawl4AI serve as visual references for recreating the Window World LA website. They provide a pixel-perfect reference for how each page should look, which is invaluable for ensuring that our clone matches the original site exactly.

## Challenges and Solutions

### Challenge 1: Puppeteer waitForTimeout Issue

**Problem**: The `page.waitForTimeout(2000)` method was causing errors because it's not available in the version of Puppeteer we're using.

**Solution**: Replaced it with a standard JavaScript Promise-based timeout:

```javascript
await new Promise(resolve => setTimeout(resolve, 2000));
```

### Challenge 2: Screenshot Directory Structure

**Problem**: The original code was saving all screenshots in a flat directory, making it difficult to organize and navigate.

**Solution**: Created a directory structure that mirrors the URL structure of the website, making it easier to find specific screenshots.

### Challenge 3: Directory Creation

**Problem**: The code was assuming that the screenshot directories already existed, which could cause errors if they didn't.

**Solution**: Added checks to ensure the directories exist before taking screenshots, and created them if they didn't.

## Future Improvements

1. **Parallel Processing**: Implement parallel processing to take screenshots of multiple pages simultaneously
2. **Selective Screenshots**: Add the ability to take screenshots of specific elements on a page
3. **Comparison Tools**: Add tools to compare screenshots to detect changes
4. **Mobile Screenshots**: Add the ability to take screenshots at different viewport sizes to test responsive design
