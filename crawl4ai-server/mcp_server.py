"""
Crawl4AI MCP Server

This script runs Crawl4AI as an MCP (Model Context Protocol) server,
allowing it to be used directly by Windsurf and other MCP clients.
It implements screenshot functionality and other Crawl4AI features.
"""

import os
import json
import base64
import asyncio
import logging
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv

# Import Crawl4AI components
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.content_filter_strategy import PruningContentFilter
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator

# Import MCP server components
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sse_starlette.sse import EventSourceResponse
import uvicorn

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create directories for screenshots and cache if they don't exist
SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), 'screenshots')
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

CACHE_DIR = os.path.join(os.path.dirname(__file__), 'cache')
os.makedirs(CACHE_DIR, exist_ok=True)

# Global browser configuration
browser_config = BrowserConfig(
    headless=True,  # Run browser in headless mode
    verbose=True,   # Enable verbose logging
    base_directory=CACHE_DIR  # Set cache directory
)

# Initialize FastAPI app
app = FastAPI(title="Crawl4AI MCP Server")

# Define MCP tool schema
TOOL_SCHEMA = {
    "name": "crawl4ai",
    "description": "A web crawler and scraper for extracting content, taking screenshots, and more.",
    "functions": [
        {
            "name": "crawl",
            "description": "Crawl a URL and extract content, optionally taking a screenshot.",
            "parameters": {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "description": "The URL to crawl"
                    },
                    "take_screenshot": {
                        "type": "boolean",
                        "description": "Whether to take a screenshot of the page",
                        "default": True
                    },
                    "extract_links": {
                        "type": "boolean",
                        "description": "Whether to extract links from the page",
                        "default": True
                    },
                    "extract_images": {
                        "type": "boolean",
                        "description": "Whether to extract images from the page",
                        "default": True
                    },
                    "max_pages": {
                        "type": "integer",
                        "description": "Maximum number of pages to crawl (for multi-page crawls)",
                        "default": 1
                    }
                },
                "required": ["url"]
            }
        },
        {
            "name": "extract_urls",
            "description": "Extract all URLs from a website.",
            "parameters": {
                "type": "object",
                "properties": {
                    "base_url": {
                        "type": "string",
                        "description": "The base URL to crawl"
                    },
                    "max_pages": {
                        "type": "integer",
                        "description": "Maximum number of pages to crawl",
                        "default": 100
                    }
                },
                "required": ["base_url"]
            }
        },
        {
            "name": "extract_structure",
            "description": "Extract site structure and navigation from a website.",
            "parameters": {
                "type": "object",
                "properties": {
                    "base_url": {
                        "type": "string",
                        "description": "The base URL to analyze"
                    },
                    "max_depth": {
                        "type": "integer",
                        "description": "Maximum depth to crawl",
                        "default": 2
                    }
                },
                "required": ["base_url"]
            }
        }
    ]
}

# MCP request handler
async def handle_mcp_request(request_data: Dict[str, Any]) -> Dict[str, Any]:
    """Handle an MCP request and return the response."""
    try:
        function_name = request_data.get("function")
        parameters = request_data.get("parameters", {})
        
        logger.info(f"Received MCP request: {function_name}")
        
        if function_name == "crawl":
            return await handle_crawl(parameters)
        elif function_name == "extract_urls":
            return await handle_extract_urls(parameters)
        elif function_name == "extract_structure":
            return await handle_extract_structure(parameters)
        else:
            return {
                "error": f"Unsupported function: {function_name}"
            }
    
    except Exception as e:
        logger.error(f"Error processing MCP request: {str(e)}", exc_info=True)
        return {
            "error": str(e)
        }

async def handle_crawl(parameters: Dict[str, Any]) -> Dict[str, Any]:
    """Handle the crawl function."""
    url = parameters.get("url")
    take_screenshot = parameters.get("take_screenshot", True)
    extract_links = parameters.get("extract_links", True)
    extract_images = parameters.get("extract_images", True)
    max_pages = parameters.get("max_pages", 1)
    
    if not url:
        return {"error": "url is required"}
    
    logger.info(f"Crawling {url} (screenshot: {take_screenshot})")
    
    # Configure the crawler
    run_config = CrawlerRunConfig(
        cache_mode=CacheMode.ENABLED,
        # Enable screenshot capture if requested
        screenshot=take_screenshot,
        # Configure link and image extraction
        extract_links=extract_links,
        extract_media=extract_images,
        # Configure markdown generation with content filtering
        markdown_generator=DefaultMarkdownGenerator(
            content_filter=PruningContentFilter(
                threshold=0.48,
                threshold_type="fixed",
                min_word_threshold=0
            )
        ),
        # Set max pages for multi-page crawls
        max_pages=max_pages
    )
    
    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(
            url=url,
            config=run_config
        )
        
        # Process the result
        response = {
            "url": result.url,
            "title": result.metadata.get("title", "") if result.metadata else "",
            "description": result.metadata.get("description", "") if result.metadata else "",
            "markdown": result.markdown.fit_markdown if hasattr(result.markdown, "fit_markdown") else str(result.markdown),
            "success": result.success
        }
        
        # Add links if extracted
        if extract_links and result.links and "all" in result.links:
            response["links"] = [
                {"url": link.get("url"), "text": link.get("text", "")}
                for link in result.links["all"]
                if "url" in link
            ]
        
        # Add images if extracted
        if extract_images and result.media and "images" in result.media:
            response["images"] = [
                {"url": img.get("url"), "alt": img.get("alt", "")}
                for img in result.media["images"]
                if "url" in img
            ]
        
        # Add screenshot if taken
        if take_screenshot and result.screenshot:
            # Generate a filename based on the URL
            filename = f"{base64.urlsafe_b64encode(url.encode()).decode()[:10]}.png"
            filepath = os.path.join(SCREENSHOT_DIR, filename)
            
            # Save the screenshot to disk
            with open(filepath, "wb") as f:
                f.write(base64.b64decode(result.screenshot))
            
            # Add screenshot info to response
            response["screenshot"] = {
                "path": filepath,
                "filename": filename,
                "data_uri": f"data:image/png;base64,{result.screenshot[:100]}..." # Truncated for brevity
            }
        
        return response

async def handle_extract_urls(parameters: Dict[str, Any]) -> Dict[str, Any]:
    """Handle the extract_urls function."""
    base_url = parameters.get("base_url")
    max_pages = parameters.get("max_pages", 100)
    
    if not base_url:
        return {"error": "base_url is required"}
    
    logger.info(f"Extracting URLs from {base_url} (max pages: {max_pages})")
    
    # Configure the crawler
    run_config = CrawlerRunConfig(
        cache_mode=CacheMode.ENABLED,
        extract_links=True,
        max_pages=max_pages
    )
    
    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(
            url=base_url,
            config=run_config
        )
        
        # Extract URLs from the links dictionary
        urls = []
        if result.links and "all" in result.links:
            for link_info in result.links["all"]:
                if "url" in link_info:
                    urls.append(link_info["url"])
        
        return {
            "urls": urls,
            "count": len(urls)
        }

async def handle_extract_structure(parameters: Dict[str, Any]) -> Dict[str, Any]:
    """Handle the extract_structure function."""
    base_url = parameters.get("base_url")
    max_depth = parameters.get("max_depth", 2)
    
    if not base_url:
        return {"error": "base_url is required"}
    
    logger.info(f"Extracting structure from {base_url} (max depth: {max_depth})")
    
    # Configure the crawler
    run_config = CrawlerRunConfig(
        cache_mode=CacheMode.ENABLED,
        extract_links=True,
        max_depth=max_depth
    )
    
    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(
            url=base_url,
            config=run_config
        )
        
        # Process links to create a site structure
        structure = {
            "navigation": [],
            "sections": []
        }
        
        if result.links and "all" in result.links:
            # Group links by their path depth
            nav_links = []
            for link_info in result.links["all"]:
                if "url" in link_info and link_info["url"].startswith(base_url):
                    # Extract path from URL
                    path = link_info["url"][len(base_url):].strip("/")
                    depth = len(path.split("/")) if path else 0
                    
                    # Main navigation links are typically at depth 1
                    if depth == 1:
                        nav_links.append({
                            "url": link_info["url"],
                            "text": link_info.get("text", path),
                            "path": path
                        })
            
            structure["navigation"] = nav_links
        
        return structure

# SSE endpoint for MCP
@app.get("/sse")
async def sse_endpoint(request: Request):
    """SSE endpoint for MCP communication."""
    async def event_generator():
        # Send the tool schema as the first event
        yield {
            "event": "tools",
            "data": json.dumps(TOOL_SCHEMA)
        }
        
        # Keep the connection alive
        while True:
            if await request.is_disconnected():
                break
            
            # Send a heartbeat every 30 seconds
            await asyncio.sleep(30)
            yield {
                "event": "heartbeat",
                "data": json.dumps({"timestamp": asyncio.get_event_loop().time()})
            }
    
    return EventSourceResponse(event_generator())

# MCP request endpoint
@app.post("/sse/request")
async def mcp_request_endpoint(request: Request):
    """Endpoint for handling MCP requests."""
    try:
        request_data = await request.json()
        response = await handle_mcp_request(request_data)
        return JSONResponse(response)
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return JSONResponse({"error": str(e)}, status_code=500)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "crawl4ai-mcp-server",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    # Get port from environment variable or use default
    port = int(os.environ.get("PORT", 8051))
    
    logger.info(f"Starting Crawl4AI MCP server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
