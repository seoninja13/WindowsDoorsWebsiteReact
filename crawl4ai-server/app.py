"""
Crawl4AI Flask Server

This Flask application serves as a wrapper around the Crawl4AI library,
providing API endpoints that match those expected by the Next.js application.
It includes functionality for extracting URLs, content, images, and taking screenshots.
"""

import os
import json
import asyncio
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from dotenv import load_dotenv

# Import Crawl4AI components
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.content_filter_strategy import PruningContentFilter
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create a directory for screenshots if it doesn't exist
SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), 'screenshots')
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

# Create a directory for cache if it doesn't exist
CACHE_DIR = os.path.join(os.path.dirname(__file__), 'cache')
os.makedirs(CACHE_DIR, exist_ok=True)

# Global browser configuration
browser_config = BrowserConfig(
    headless=True,  # Run browser in headless mode
    verbose=True    # Enable verbose logging
)

# Helper function to run async code
def run_async(coro):
    """Run an async coroutine and return its result."""
    return asyncio.run(coro)

# API endpoint for Context7 compatibility
@app.route('/api/context7', methods=['POST'])
def context7_api():
    """
    Main API endpoint that handles all Crawl4AI operations.
    This mimics the Context7 API expected by the Next.js application.
    """
    try:
        data = request.json
        operation = data.get('operation')
        operation_data = data.get('data', {})

        logger.info(f"Received operation: {operation}")

        if operation == 'extractUrls':
            return extract_urls(operation_data)
        elif operation == 'extractContent':
            return extract_content(operation_data)
        elif operation == 'extractImages':
            return extract_images(operation_data)
        elif operation == 'extractStructure':
            return extract_structure(operation_data)
        else:
            return jsonify({'error': f'Unsupported operation: {operation}'}), 400

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

def extract_urls(data):
    """Extract URLs from a website."""
    base_url = data.get('baseUrl')
    max_pages = data.get('maxPages', 100)

    if not base_url:
        return jsonify({'error': 'baseUrl is required'}), 400

    logger.info(f"Extracting URLs from {base_url} (max pages: {max_pages})")

    # Configure the crawler for URL extraction
    async def crawl_urls():
        run_config = CrawlerRunConfig(
            cache_mode=CacheMode.ENABLED,
            max_pages=max_pages,
            # Enable link extraction
            extract_links=True
        )

        async with AsyncWebCrawler(config=browser_config) as crawler:
            result = await crawler.arun(
                url=base_url,
                config=run_config
            )

            # Extract all URLs from the links dictionary
            urls = []
            if result.links and 'all' in result.links:
                for link_info in result.links['all']:
                    if 'url' in link_info:
                        urls.append(link_info['url'])

            return urls

    try:
        urls = run_async(crawl_urls())
        return jsonify({
            'success': True,
            'urls': urls,
            'count': len(urls)
        })
    except Exception as e:
        logger.error(f"Error extracting URLs: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

def extract_content(data):
    """Extract content from a URL, including taking a screenshot."""
    url = data.get('url')

    if not url:
        return jsonify({'error': 'url is required'}), 400

    logger.info(f"Extracting content from {url}")

    # Configure the crawler for content extraction with screenshot
    async def crawl_content():
        run_config = CrawlerRunConfig(
            cache_mode=CacheMode.ENABLED,
            # Enable screenshot capture
            screenshot=True,
            # Configure markdown generation with content filtering
            markdown_generator=DefaultMarkdownGenerator(
                content_filter=PruningContentFilter(
                    threshold=0.48,
                    threshold_type="fixed",
                    min_word_threshold=0
                )
            )
        )

        async with AsyncWebCrawler(config=browser_config) as crawler:
            result = await crawler.arun(
                url=url,
                config=run_config
            )

            # Process the result
            content = {
                'title': result.metadata.get('title', '') if result.metadata else '',
                'description': result.metadata.get('description', '') if result.metadata else '',
                'markdown': result.markdown.fit_markdown if hasattr(result.markdown, 'fit_markdown') else str(result.markdown),
                'html': result.cleaned_html or result.html,
            }

            # Save screenshot if available
            if result.screenshot:
                # Generate a filename based on the URL
                filename = f"{base64.urlsafe_b64encode(url.encode()).decode()[:10]}.png"
                filepath = os.path.join(SCREENSHOT_DIR, filename)

                # Save the screenshot to disk
                with open(filepath, 'wb') as f:
                    f.write(base64.b64decode(result.screenshot))

                # Add screenshot info to content
                content['screenshot'] = {
                    'path': filepath,
                    'url': f"/screenshots/{filename}",
                    'data': result.screenshot  # Base64-encoded screenshot data
                }

            return content

    try:
        content = run_async(crawl_content())
        return jsonify({
            'success': True,
            'content': content
        })
    except Exception as e:
        logger.error(f"Error extracting content: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

def extract_images(data):
    """Extract images from a URL."""
    url = data.get('url')

    if not url:
        return jsonify({'error': 'url is required'}), 400

    logger.info(f"Extracting images from {url}")

    # Configure the crawler for image extraction
    async def crawl_images():
        run_config = CrawlerRunConfig(
            cache_mode=CacheMode.ENABLED,
            # Enable media extraction (images)
            extract_media=True
        )

        async with AsyncWebCrawler(config=browser_config) as crawler:
            result = await crawler.arun(
                url=url,
                config=run_config
            )

            # Extract all image URLs from the media dictionary
            images = []
            if result.media and 'images' in result.media:
                for image_info in result.media['images']:
                    if 'url' in image_info:
                        images.append(image_info['url'])

            return images

    try:
        images = run_async(crawl_images())
        return jsonify({
            'success': True,
            'images': images,
            'count': len(images)
        })
    except Exception as e:
        logger.error(f"Error extracting images: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

def extract_structure(data):
    """Extract site structure from a URL."""
    base_url = data.get('baseUrl')

    if not base_url:
        return jsonify({'error': 'baseUrl is required'}), 400

    logger.info(f"Extracting structure from {base_url}")

    # Configure the crawler for structure extraction
    async def crawl_structure():
        run_config = CrawlerRunConfig(
            cache_mode=CacheMode.ENABLED,
            # Enable link extraction
            extract_links=True,
            # Limit depth to get main navigation
            max_depth=2
        )

        async with AsyncWebCrawler(config=browser_config) as crawler:
            result = await crawler.arun(
                url=base_url,
                config=run_config
            )

            # Process links to create a site structure
            structure = {
                'navigation': [],
                'sections': []
            }

            if result.links and 'all' in result.links:
                # Group links by their path depth
                nav_links = []
                for link_info in result.links['all']:
                    if 'url' in link_info and link_info['url'].startswith(base_url):
                        # Extract path from URL
                        path = link_info['url'][len(base_url):].strip('/')
                        depth = len(path.split('/')) if path else 0

                        # Main navigation links are typically at depth 1
                        if depth == 1:
                            nav_links.append({
                                'url': link_info['url'],
                                'text': link_info.get('text', path),
                                'path': path
                            })

                structure['navigation'] = nav_links

            return structure

    try:
        structure = run_async(crawl_structure())
        return jsonify({
            'success': True,
            'structure': structure
        })
    except Exception as e:
        logger.error(f"Error extracting structure: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

# Route to serve screenshots
@app.route('/screenshots/<filename>', methods=['GET'])
def serve_screenshot(filename):
    """Serve screenshot files."""
    filepath = os.path.join(SCREENSHOT_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, 'rb') as f:
            image_data = f.read()
        return image_data, 200, {'Content-Type': 'image/png'}
    else:
        return jsonify({'error': 'Screenshot not found'}), 404

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'service': 'crawl4ai-server',
        'version': '1.0.0'
    })

if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 3001))

    logger.info(f"Starting Crawl4AI server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)
