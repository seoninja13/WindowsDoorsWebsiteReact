# Crawl4AI MCP Server for Windows Doors Website

This server runs Crawl4AI as an MCP (Model Context Protocol) server, allowing it to be used directly by Windsurf and other MCP clients. It implements screenshot functionality and other Crawl4AI features needed for the Windows Doors Website project.

## Features

- **URL Extraction**: Crawls websites and extracts all URLs
- **Content Extraction**: Extracts content from URLs and generates markdown
- **Image Extraction**: Extracts images from URLs
- **Structure Extraction**: Extracts site structure and navigation
- **Screenshot Capture**: Takes screenshots of web pages
- **MCP Integration**: Implements the MCP protocol for direct integration with Windsurf

## Installation

1. Make sure you have Python 3.8+ installed
2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the setup command for Crawl4AI:
   ```bash
   crawl4ai-setup
   ```

## Running the MCP Server

To start the server:

```bash
python mcp_server.py
```

By default, the server runs on port 8051. You can change this by setting the `PORT` environment variable in the `.env` file.

## MCP Configuration

To connect to the MCP server from Windsurf, use the following configuration:

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

## API Endpoints

### MCP Endpoints

- **GET /sse**: SSE endpoint for MCP communication
- **POST /sse/request**: Endpoint for handling MCP requests

### MCP Functions

- `crawl`: Crawl a URL and extract content, optionally taking a screenshot
- `extract_urls`: Extract all URLs from a website
- `extract_structure`: Extract site structure and navigation from a website

### Health Check

- **GET /health**: Returns the health status of the server

## Configuration

Configuration options can be set in the `.env` file:

- `PORT`: The port to run the server on (default: 8051)
- `CACHE_MODE`: The cache mode to use (default: ENABLED)
- `LOG_LEVEL`: The logging level (default: INFO)

## Integration with Windows Doors Website

This MCP server enables the Windows Doors Website project to:

1. Crawl the Window World LA website
2. Extract content, images, and structure
3. Take screenshots of each page for visual reference
4. Use the extracted content to build a visually identical website

Screenshots are saved to the `screenshots` directory and can be accessed programmatically through the MCP API.

## Future Enhancements

### Supabase Integration

Currently, all crawled data and screenshots are stored locally in the filesystem. In the future, this will be enhanced to store results in Supabase:

- **Content Storage**: Structured content will be stored in Supabase tables
- **Screenshot Storage**: Screenshots will be uploaded to Supabase Storage
- **Metadata Indexing**: URLs, titles, and other metadata will be indexed for quick retrieval
- **Versioning**: Multiple crawl versions can be maintained to track changes over time

This integration will allow for better persistence, sharing capabilities between team members, and integration with the main application.
