# Windows Doors Website React - Project Structure Documentation

> **Breadcrumb Navigation**: [README.md](../README.md) > [Documentation](./index.md) > Project Structure

This document provides a comprehensive overview of the project directory structure and the work completed so far.

## Project Overview

The goal of this project is to create a 100% exact clone of the Window World LA website (https://www.windowworldla.com/) using React.js frontend and Next.js backend. The project uses Next.js with App Router, React, TypeScript, and Tailwind CSS.

## Directory Structure

```
WindowsDoorsWebsiteReact/
├── app/                      # Next.js App Router directory
├── components/               # React components
├── crawl4ai-server/          # Crawl4AI server for web scraping
│   ├── logger.py             # Python logging utility for Crawl4AI
├── docs/                     # Project documentation
│   ├── project-structure.md  # This document
├── lib/                      # Utility libraries
│   ├── logging.js            # Logging utility for Supabase
│   ├── supabase.js           # Supabase client configuration
├── public/                   # Static assets
│   ├── crawled-data/         # Data extracted from Window World LA website
│       ├── components/       # Extracted UI components
│       ├── screenshots/      # Screenshots of pages
│       ├── images.json       # Extracted images metadata
│       ├── pages.json        # Extracted pages content
│       ├── site-structure.json # Site structure metadata
│       ├── sitemap.xml       # Generated sitemap
│       ├── urls.txt          # List of crawled URLs
├── scripts/                  # Utility scripts
│   ├── analyze-crawl-results.js # Script to analyze crawl results
│   ├── check-crawl-logs.js   # Script to check crawl logs in Supabase
│   ├── check-logs.js         # Script to check logs in Supabase
│   ├── crawl-website.js      # Script to crawl Window World LA website
│   ├── direct-sql.js         # Script to execute SQL directly
│   ├── execute-sql.js        # Script to execute SQL via Supabase
│   ├── generate-sql.js       # Script to generate SQL for Supabase
│   ├── run-comprehensive-crawl.js # Script for comprehensive crawl
│   ├── simple-crawl.js       # Simplified crawl script
│   ├── test-logging.js       # Script to test logging functionality
│   ├── test-supabase.js      # Script to test Supabase connection
├── sql/                      # SQL scripts
│   ├── logging-tables.sql    # SQL to create logging tables
│   ├── logging-tables-generated.sql # Generated SQL for logging tables
│   ├── update-rls-policies.sql # SQL to update RLS policies
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
```

## Completed Work

### 1. Project Setup

- Set up Next.js 15.3.1 with App Router
- Configured TypeScript and Tailwind CSS
- Set up environment variables for Supabase connection
- Created project documentation structure

### 2. Supabase Integration

- Created Supabase client configuration in `lib/supabase.js`
- Set up environment variables for Supabase connection
- Created logging tables in Supabase:
  - `system_logs`: General purpose logging table
  - `crawl4ai_logs`: Specific logging table for Crawl4AI operations
  - `error_logs`: Detailed logging for errors and exceptions
  - `performance_logs`: Logging for performance metrics
  - `user_activity_logs`: Logging for user actions
  - `api_request_logs`: Logging for API requests
- Created RLS policies to allow anonymous access for inserting and selecting logs
- Tested Supabase connection and logging functionality

### 3. Logging System

- Implemented comprehensive logging system in `lib/logging.js`
- Created utility functions for logging different types of events:
  - `logSystemEvent`: Log system events
  - `logCrawl4AIOperation`: Log Crawl4AI operations
  - `logError`: Log errors
  - `logPerformance`: Log performance metrics
  - `logUserActivity`: Log user activities
  - `logAPIRequest`: Log API requests
- Created convenience methods for system logging:
  - `logger.debug`: Log debug messages
  - `logger.info`: Log info messages
  - `logger.warn`: Log warning messages
  - `logger.error`: Log error messages
  - `logger.fatal`: Log fatal messages

### 4. Web Scraping

- Implemented web scraping functionality in `scripts/crawl-website.js`
- Created utility functions for extracting different types of content:
  - `extractLinks`: Extract links from HTML
  - `extractImages`: Extract images from HTML
  - `extractMetadata`: Extract metadata from HTML
  - `extractNavigation`: Extract navigation from HTML
  - `extractMainContent`: Extract main content from HTML
  - `extractComponents`: Extract UI components from HTML
- Implemented screenshot functionality using Puppeteer
- Created comprehensive crawl script in `scripts/run-comprehensive-crawl.js`
- Created simplified crawl script in `scripts/simple-crawl.js`
- Created script to analyze crawl results in `scripts/analyze-crawl-results.js`

### 5. Data Extraction

- Extracted data from Window World LA website:
  - Pages: Over 100 pages extracted, including product pages, service pages, about pages, and more
  - Components: UI components extracted from each page, including headers, footers, navigation menus, forms, sliders, and cards
  - Images: Information about images used on the website, including URLs, alt text, dimensions, and more
  - Navigation: Navigation structure of the website, including main navigation and footer navigation
- Saved extracted data to `public/crawled-data/` directory
- Logged all extraction operations to Supabase for monitoring and analysis
- Created script to analyze the extracted data and generate a report

### 6. Utility Scripts

- Created utility scripts for various tasks:
  - `scripts/check-logs.js`: Check logs in Supabase
  - `scripts/check-crawl-logs.js`: Check crawl logs in Supabase
  - `scripts/direct-sql.js`: Execute SQL directly
  - `scripts/execute-sql.js`: Execute SQL via Supabase
  - `scripts/generate-sql.js`: Generate SQL for Supabase
  - `scripts/test-logging.js`: Test logging functionality
  - `scripts/test-supabase.js`: Test Supabase connection
  - `scripts/analyze-crawl-results.js`: Analyze crawl results and generate a report

### 7. SQL Scripts

- Created SQL scripts for database setup:
  - `sql/logging-tables.sql`: SQL to create logging tables
  - `sql/logging-tables-generated.sql`: Generated SQL for logging tables
  - `sql/update-rls-policies.sql`: SQL to update RLS policies for anonymous access

### 8. Documentation

- Created comprehensive documentation of the project directory structure
- Created daily logs to document progress
- Created project tasks document to track remaining tasks
- Created priority list document to track immediate next steps

## Next Steps

### Immediate Next Steps

1. **Complete Data Extraction**: Allow the crawl process to complete and extract all data from the Window World LA website.
2. **Fix Screenshot Functionality**: Investigate and fix the issues with Puppeteer screenshot functionality.
3. **Analyze Extracted Data**: Use the `analyze-crawl-results.js` script to analyze the extracted data and generate a report.

### Short-Term Next Steps

1. **UI Component Development**: Begin developing React components based on the extracted UI components.
2. **Routing Implementation**: Implement dynamic routing with ISR based on the extracted URL structure.
3. **Content Integration**: Integrate the extracted content into the React components.
4. **Image Optimization**: Optimize and integrate the extracted images.

### Medium-Term Next Steps

1. **Responsive Design**: Ensure the website is responsive and matches the original at all breakpoints.
2. **SEO Optimization**: Implement SEO optimization based on the extracted metadata.
3. **Testing**: Test the website for visual and functional parity with the original.
4. **Performance Optimization**: Optimize the website for performance.

## NPM Scripts

The following NPM scripts are available:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "context7": "node scripts/context7-server.js",
  "all-mcp": "node scripts/all-mcp-server.js",
  "dev:with-context7": "concurrently \"npm run dev\" \"npm run context7\"",
  "dev:with-all-mcp": "concurrently \"npm run dev\" \"npm run all-mcp\"",
  "crawl": "node scripts/crawl-website.js",
  "crawl:comprehensive": "node scripts/run-comprehensive-crawl.js",
  "crawl:simple": "node scripts/simple-crawl.js",
  "analyze:crawl": "node scripts/analyze-crawl-results.js",
  "check:logs": "node scripts/check-logs.js",
  "test:logging": "node scripts/test-logging.js",
  "setup:logging": "node scripts/direct-sql.js sql/logging-tables.sql",
  "execute:sql": "node scripts/execute-sql.js",
  "direct:sql": "node scripts/direct-sql.js",
  "generate:sql": "node scripts/generate-sql.js"
}
```

## Conclusion

The project has made significant progress in setting up the infrastructure and extracting data from the Window World LA website. We have successfully:

1. Set up the Next.js project with TypeScript and Tailwind CSS
2. Created a comprehensive logging system using Supabase
3. Implemented web scraping functionality to extract data from the Window World LA website
4. Extracted over 100 pages, UI components, images, and navigation structure
5. Created utility scripts for various tasks
6. Created SQL scripts for database setup
7. Created comprehensive documentation

The next phase will focus on using the extracted data to create an exact clone of the website using React.js and Next.js. This will involve developing UI components, implementing routing, integrating content, optimizing images, ensuring responsive design, implementing SEO optimization, and testing for visual and functional parity with the original website.
