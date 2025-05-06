# Supabase MCP Server Integration

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Integrations](./index.md) > Supabase MCP Server Integration

## Overview

This document describes the integration of the Supabase MCP (Model Context Protocol) server with the Windows Doors Website React project. The Supabase MCP server allows the project to interact with Supabase directly through the Model Context Protocol, enabling storage of crawled data, screenshots, and other content.

## Configuration

### Supabase MCP Server Configuration

The Supabase MCP server is configured in the `supabase-mcp-config.json` file:

```json
{
  "mcpServers": {
    "supabase-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@alexander-zuev/supabase-mcp-server",
        "--key",
        "YOUR_SUPABASE_ANON_KEY",
        "--profile",
        "YOUR_SUPABASE_PROJECT_ID",
        "--url",
        "https://YOUR_SUPABASE_PROJECT_ID.supabase.co"
      ]
    }
  }
}
```

### Environment Variables

The Supabase MCP server uses the following environment variables defined in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## Usage

### Starting the Supabase MCP Server

To start the Supabase MCP server:

```bash
npm run supabase-mcp
```

### Starting All MCP Servers

To start all MCP servers (Context7 and Supabase):

```bash
npm run all-mcp
```

### Starting the Development Server with All MCP Servers

To start the Next.js development server with all MCP servers:

```bash
npm run dev:with-all-mcp
```

### Testing the Supabase Connection

To test the Supabase connection:

```bash
npm run test:supabase
```

## Functionality

The Supabase MCP server provides the following functionality:

1. **Database Operations**: Query and manipulate data in Supabase tables
2. **Storage Operations**: Upload and retrieve files from Supabase Storage
3. **Authentication**: Manage user authentication and authorization
4. **Real-time Subscriptions**: Subscribe to real-time database changes

## Database Schema

The Supabase database schema includes the following tables:

1. **pages**: Stores page metadata, URLs, titles, and screenshot references
2. **links**: Stores relationships between pages
3. **images**: Tracks images found on pages

## Integration with Crawl4AI

The Supabase MCP server is integrated with Crawl4AI to store crawled data:

1. Crawl4AI extracts content and takes screenshots of web pages
2. Screenshots are uploaded to Supabase Storage
3. Page metadata is stored in the Supabase database
4. Links and images are tracked in their respective tables

## Troubleshooting

### Common Issues

1. **Connection Errors**

   - Error: `Failed to connect to Supabase MCP server`
   - Solution: Verify that the Supabase MCP server is running and the configuration is correct

2. **Authentication Errors**

   - Error: `Invalid API key or JWT`
   - Solution: Check the Supabase API key in the configuration and environment variables

3. **Storage Errors**

   - Error: `Failed to upload file to Supabase Storage`
   - Solution: Verify that the Supabase Storage bucket exists and the API key has the necessary permissions

## Related Documentation

- [Supabase Documentation](https://supabase.io/docs)
- [Model Context Protocol](https://github.com/smithery-io/mcp)
- [Crawl4AI Integration](../web-scraping/crawl4ai-implementation.md)
- [Web Scraping](../web-scraping.md)

Last Updated: May 6, 2025
