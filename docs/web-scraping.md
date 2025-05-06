# Web Scraping Documentation

> **Breadcrumb Navigation**: [README.md](../README.md) > [Documentation](./index.md) > Web Scraping

## Overview

This document provides detailed information about the web scraping functionality implemented in the Windows Doors Website React project. The web scraping functionality is used to create a 100% exact clone of the Window World LA website (https://www.windowworldla.com/), preserving all functionality, design elements, and content.

Our goal is to extract and replicate:
- All pages and their complete structure
- All functionality including interactive elements
- All design elements and styling
- All content including text, images, and videos
- All technical elements including SEO metadata, scripts, and APIs
- All navigation and user flows

## Technologies Used

- **Crawl4AI**: Primary web scraping tool for extracting complete website content and functionality
- **Context7 MCP Server**: Provides the foundation for web scraping and access to other MCP servers
- **Cheerio**: For HTML parsing and DOM manipulation
- **Axios**: For HTTP requests and API interactions
- **Next.js API Routes**: For exposing scraping functionality to the frontend
- **React.js**: For rebuilding the frontend components exactly as they appear in the original site
- **Tailwind CSS**: For recreating the exact styling of the original website

## Implementation Details

### Crawl4AI Integration

Crawl4AI is our primary web scraping tool used to create a 100% exact clone of the Window World LA website. It's designed to extract all aspects of the website including structure, content, functionality, and technical elements.

#### Key Features

- **Complete Website Extraction**: Crawls and extracts all pages, content, and assets
- **Functionality Preservation**: Captures interactive elements and JavaScript functionality
- **SEO Element Extraction**: Extracts all SEO metadata, structured data, and canonical links
- **Responsive Design Capture**: Preserves responsive design elements for all screen sizes
- **Accessibility Preservation**: Maintains all accessibility features from the original site

#### Integration with React.js and Next.js

The extracted content and functionality are seamlessly integrated with our React.js frontend and Next.js backend to create an exact replica of the original website.

### Context7 MCP Server

The Context7 MCP (Multi-Context Processing) server is used as the foundation for our web scraping functionality. It provides access to other MCP servers and a standardized way to interact with various services, including web scraping.

#### Configuration

The Context7 MCP server is configured in the `context7-config.json` file:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

#### Starting the Server

The Context7 MCP server can be started using the following command:

```bash
npm run context7
```

This will start the server on port 3001 by default.

### Crawler Script

The crawler script (`scripts/crawl-website.js`) is a Node.js script that crawls the Window World LA website and extracts content, structure, and assets. It uses Axios to make HTTP requests and Cheerio to parse HTML.

#### Usage

```bash
npm run crawl
```

#### Functionality

The crawler script performs the following tasks:

1. **URL Extraction**: Extracts all URLs from the website
2. **Content Extraction**: Extracts content from each page
3. **Image Extraction**: Extracts images and other assets
4. **Structure Analysis**: Analyzes the site structure and navigation
5. **Sitemap Generation**: Generates a sitemap based on the extracted URLs

#### Output

The crawler script saves the extracted data to the `public/crawled-data` directory:

- `pages.json`: Contains the content of each page
- `images.json`: Contains information about all images
- `site-structure.json`: Contains information about the site structure and navigation
- `urls.txt`: Contains a list of all URLs
- `sitemap.xml`: Contains an XML sitemap
- `screenshots/`: Directory containing screenshots of all pages
- `crawl-stats.json`: Contains statistics about the crawl process

As of May 6, 2025, the crawler has successfully completed a comprehensive crawl of the Window World LA website, extracting 199 pages, taking 199 screenshots, and identifying 656 UI components. For detailed information about the completed crawl, see the [Crawl4AI Completion Analysis](./crawl4ai-completion-analysis.md) document.

### API Routes

The API routes in the `app/api/crawl` directory provide a way to interact with the Context7 MCP server from the frontend. They allow the crawler admin interface to extract content, structure, and assets from the Window World LA website.

#### Available Routes

- `app/api/crawl/extract-urls`: Extracts URLs from a website
- `app/api/crawl/extract-content`: Extracts content from a specific URL
- `app/api/crawl/extract-structure`: Extracts site structure from a website
- `app/api/crawl/extract-images`: Extracts images from a specific URL
- `app/api/crawl/generate-sitemap`: Generates a sitemap from a list of URLs

### Crawler Admin Interface

The crawler admin interface (`app/admin/crawler/page.tsx`) provides a user-friendly way to interact with the web scraping functionality. It allows you to extract content, structure, and assets from the Window World LA website and view the results.

#### Usage

1. Start the Context7 MCP server and Next.js development server:

```bash
npm run dev:with-context7
```

2. Navigate to http://localhost:3000/admin/crawler

3. Enter the base URL (https://www.windowworldla.com/) and the maximum number of pages to crawl.

4. Click "Start Crawling" to begin the crawling process.

5. Once the crawling is complete, you can:
   - View the list of crawled URLs
   - Extract content from specific pages
   - Extract images from specific pages
   - View the site structure
   - Generate a sitemap

## Utility Functions

The `lib/utils/crawler.ts` file contains utility functions for interacting with the web scraping functionality from the frontend. These functions are used by the crawler admin interface.

### Available Functions

- `crawlWebsite`: Crawls a website and extracts all URLs
- `extractPageContent`: Extracts content from a specific URL
- `extractSiteStructure`: Extracts site structure from a website
- `extractImages`: Extracts images from a specific URL
- `generateSitemap`: Generates a sitemap from a list of URLs

## Best Practices

When creating a 100% exact clone of the Window World LA website, keep the following best practices in mind:

### Web Scraping Best Practices

1. **Respect Robots.txt**: Always check the robots.txt file of the website you're crawling to ensure you're allowed to crawl it.
2. **Rate Limiting**: Implement rate limiting to avoid overloading the target website.
3. **User Agent**: Use a descriptive user agent to identify your crawler.
4. **Error Handling**: Implement robust error handling to deal with network issues, malformed HTML, etc.
5. **Data Storage**: Store the extracted data in a structured format for easy access.

### Exact Cloning Best Practices

1. **Pixel-Perfect Replication**: Ensure all visual elements match the original website exactly.
2. **Functionality Matching**: All interactive elements should work exactly as they do on the original site.
3. **Content Accuracy**: All text, images, and media should be identical to the original.
4. **SEO Preservation**: Maintain all SEO elements including meta tags, structured data, and canonical links.
5. **Responsive Design Matching**: Ensure the clone behaves identically across all screen sizes.
6. **Performance Parity**: The clone should load and perform as well as or better than the original site.
7. **Accessibility Maintenance**: Preserve all accessibility features from the original site.
8. **Cross-Browser Compatibility**: Ensure the clone works identically across all major browsers.

### Integration Best Practices

1. **Component Mapping**: Map each original website component to a React component.
2. **Style Extraction**: Extract and apply exact styling using Tailwind CSS.
3. **State Management**: Implement state management that mirrors the original site's behavior.
4. **API Integration**: Recreate all API calls and data flows.
5. **Route Matching**: Ensure all routes and URLs match the original site structure.

## Troubleshooting

### Common Issues

#### Context7 MCP Server Won't Start

**Symptoms**:
- Error when running `npm run context7`
- Server starts but shows errors

**Solutions**:
1. Check if Node.js is installed and up to date
2. Check if the Context7 MCP package is installed
3. Check if port 3001 is already in use

#### Crawler Script Fails

**Symptoms**:
- Error when running `npm run crawl`
- Script runs but doesn't extract data

**Solutions**:
1. Check if the target website is accessible
2. Check if the target website has changed its structure
3. Check if you're being blocked by the target website

## Related Documentation

- [Crawl4AI Analysis](./crawl4ai-analysis.md)
- [Crawl4AI Completion Analysis](./crawl4ai-completion-analysis.md)
- [Crawl4AI Screenshot Architecture](./architecture/crawl4ai-screenshot-architecture.md)
- [UI Components and Design System](./ui-components.md)
- [Project Tasks](./project-tasks.md)
- [Priority List](./priority-list.md)
- [Website Architecture](./architecture/website-architecture.md)
- [Data Flow](./architecture/data-flow.md)
- [New Developer Guide](./guides/new-developer-guide.md)

Last Updated: May 6, 2025
