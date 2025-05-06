# Crawl4AI Implementation for Windows Doors Website

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Web Scraping](../web-scraping.md) > Crawl4AI Implementation

**Date**: 2025-05-06
**Author**: Cascade AI
**Version**: 1.1.0

## Overview

This document details the implementation of Crawl4AI for extracting content and capturing screenshots from the Window World LA website. The implementation enables us to maintain visual parity with the original site while complying with legal requirements by using our own implementation rather than directly copying their assets.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Screenshot Functionality](#screenshot-functionality)
4. [Deep Crawler Implementation](#deep-crawler-implementation)
5. [Directory Structure](#directory-structure)
6. [Usage Guide](#usage-guide)
7. [Future Enhancements](#future-enhancements)
8. [Troubleshooting](#troubleshooting)

## Installation

Crawl4AI is installed as a Python package with browser automation capabilities:

```bash
pip install crawl4ai
crawl4ai-setup  # Sets up browser components
```

The installation includes:

- Core Crawl4AI library (v0.6.2)
- Playwright browser automation
- Required dependencies

## Configuration

### Browser Configuration

The browser is configured using the `BrowserConfig` class:

```python
browser_config = BrowserConfig(
    headless=True,  # Run browser in headless mode
    verbose=True    # Enable verbose logging
)
```

### Crawler Configuration

For each crawl operation, we configure the crawler using `CrawlerRunConfig`:

```python
run_config = CrawlerRunConfig()
run_config.screenshot = True     # Enable screenshot capture
run_config.extract_links = True  # Extract links
run_config.extract_media = True  # Extract images
```

## Screenshot Functionality

Screenshots are captured by setting `screenshot=True` in the `CrawlerRunConfig` object. The screenshots are returned as base64-encoded strings in the `CrawlResult` object.

### Screenshot Processing

1. Screenshots are captured during page crawling
2. Base64-encoded data is decoded to binary
3. Binary data is saved as PNG files
4. Files are organized by URL path for easy reference

### Example Code

```python
# Configure the crawler with screenshot enabled
run_config = CrawlerRunConfig()
run_config.screenshot = True

# Perform the crawl
result = await crawler.arun(
    url="https://www.windowworldla.com/",
    config=run_config
)

# Save the screenshot
if result.screenshot:
    with open("screenshot.png", "wb") as f:
        f.write(base64.b64decode(result.screenshot))
```

## Deep Crawler Implementation

We've implemented a comprehensive deep crawler that:

1. Starts from the homepage
2. Follows internal links to discover all pages
3. Takes screenshots of each page
4. Extracts content, links, and images
5. Organizes everything in a structured directory format

### Key Components

- **URL Normalization**: Removes fragments and trailing slashes
- **URL Validation**: Ensures URLs belong to the target domain
- **Path Extraction**: Converts URLs to directory paths
- **Rate Limiting**: Prevents overwhelming the target website
- **Error Handling**: Retries failed requests and logs errors

### Crawling Process

1. Start with the homepage URL
2. Crawl the page and extract content
3. Save screenshot and content
4. Extract links from the page
5. Add new URLs to the queue
6. Process the next URL in the queue
7. Repeat until all pages are crawled or max pages is reached

## Directory Structure

The crawler creates a structured directory system:

```
crawl_results/
├── content/
│   └── [path]/
│       ├── content.html  # Raw HTML content
│       ├── content.md    # Markdown content
│       └── metadata.json # Page metadata
├── screenshots/
│   └── [path]/
│       └── screenshot.png # Page screenshot
├── crawler.log           # Crawl log
└── crawl_stats.json      # Crawl statistics
```

### Path Mapping

URLs are mapped to directory paths using this logic:

- Homepage (`https://www.windowworldla.com/`) → `home`
- About page (`https://www.windowworldla.com/about-us/`) → `about-us`
- Windows page (`https://www.windowworldla.com/windows/`) → `windows`

## Usage Guide

### Basic Usage

To run a simple test crawl:

```bash
cd crawl4ai-server
python simple_test.py
```

### Deep Crawling

To perform a deep crawl with multiple pages:

```bash
cd crawl4ai-server
python deep_crawler.py --max-pages 10 --rate-limit 3
```

Parameters:
- `--max-pages`: Maximum number of pages to crawl (default: unlimited)
- `--rate-limit`: Seconds between requests (default: 2)

### Comprehensive Crawling

For a comprehensive crawl of the entire website:

```bash
npm run crawl:comprehensive
```

This will crawl the entire website with no page limit, taking screenshots of all pages and extracting all content, components, and navigation structure.

### Crawl Results

As of May 6, 2025, we have successfully completed a comprehensive crawl of the Window World LA website with the following results:

```json
{
  "startTime": "2025-05-06T19:54:39.581Z",
  "pagesCrawled": 199,
  "screenshotsTaken": 199,
  "failedPages": 1,
  "totalLinksFound": 6115,
  "totalImagesFound": 547,
  "componentsIdentified": 656,
  "endTime": "2025-05-06T20:30:01.912Z",
  "durationSeconds": 2122.331
}
```

For a detailed analysis of the crawl results, see the [Crawl4AI Completion Analysis](../crawl4ai-completion-analysis.md) document.

### Accessing Results

Screenshots are saved to:
- `public/crawled-data/screenshots/[path]/[filename].png`

Content and metadata are saved to:
- `public/crawled-data/pages.json`: Contains all the extracted page content
- `public/crawled-data/images.json`: Contains metadata for all extracted images
- `public/crawled-data/site-structure.json`: Contains the site structure including navigation
- `public/crawled-data/components/[path]/components.json`: Contains UI components extracted from each page

Crawl statistics are saved to:
- `public/crawled-data/crawl-stats.json`: Contains statistics about the crawl process

## Future Enhancements

### Supabase Integration

Currently, all crawled data and screenshots are stored locally in the filesystem. In the future, this will be enhanced to store results in Supabase:

- **Content Storage**: Structured content will be stored in Supabase tables
- **Screenshot Storage**: Screenshots will be uploaded to Supabase Storage
- **Metadata Indexing**: URLs, titles, and other metadata will be indexed for quick retrieval
- **Versioning**: Multiple crawl versions can be maintained to track changes over time

This integration will allow for better persistence, sharing capabilities between team members, and integration with the main application.

### Supabase MCP Server

We've begun implementing Supabase integration using the Supabase MCP server. This allows us to interact with Supabase directly through the Model Context Protocol:

```json
{
  "mcpServers": {
    "supabase-mcp-server": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@smithery/cli@latest",
        "run",
        "@alexander-zuev/supabase-mcp-server",
        "--key",
        "ea6a680f-20bb-4968-bcaa-1568439806c4",
        "--profile",
        "angry-hyena-RE0DI8"
      ]
    }
  }
}
```

The Supabase MCP server provides the following capabilities:

- **Database Operations**: Query and manipulate data in Supabase tables
- **Storage Operations**: Upload and retrieve files from Supabase Storage
- **Authentication**: Manage user authentication and authorization
- **Real-time Subscriptions**: Subscribe to real-time database changes

To test the Supabase MCP server integration, we've created a test script (`test-supabase.py`) that verifies connectivity and tests basic operations like uploading screenshots to Supabase Storage.

### Next.js Supabase Integration

We've also set up the official Next.js integration with Supabase, following the recommended structure for Next.js App Router:

1. **Environment Variables**: Added `.env.local` with Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://wzohdczffpgnpjehhfnb.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[API_KEY]
   ```

2. **Utility Files**:
   - `utils/supabase/server.ts`: Server-side Supabase client
   - `utils/supabase/client.ts`: Client-side Supabase client
   - `utils/supabase/middleware.ts`: Middleware for authentication

3. **Database Schema**: Created TypeScript definitions in `types/supabase.ts` for:
   - `pages` table: Stores page metadata, URLs, titles, and screenshot references
   - `links` table: Stores relationships between pages
   - `images` table: Tracks images found on pages

This integration allows us to:
- Store crawled data in a structured database
- Upload screenshots to Supabase Storage
- Build admin interfaces for managing crawled content
- Implement authentication for secure access

### MCP Integration

The Crawl4AI implementation can be integrated with Model Context Protocol (MCP) servers, allowing for direct interaction with AI systems:

```json
{
  "mcpServers": {
    "crawl4ai-rag": {
      "transport": "sse",
      "serverUrl": "http://localhost:8051/sse"
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Missing Dependencies**

   - Error: `ModuleNotFoundError: No module named 'fastapi'`
   - Solution: Install required packages with `pip install fastapi uvicorn sse-starlette`

2. **Browser Automation Issues**

   - Error: Playwright-related errors
   - Solution: Run `crawl4ai-setup` or `python -m playwright install chromium`

3. **Rate Limiting**

   - Issue: Target website may block requests if too frequent
   - Solution: Increase `rate-limit` parameter (e.g., `--rate-limit 5`)

### Logs

Logs are saved to:
- `crawl4ai-server/crawl_results/crawler.log`

### Support

For additional support, refer to:
- [Crawl4AI Documentation](https://docs.crawl4ai.com/)
- [GitHub Repository](https://github.com/unclecode/crawl4ai)
