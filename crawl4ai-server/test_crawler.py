"""
Test script for Crawl4AI with screenshot functionality.
This script crawls the Window World LA website and takes screenshots.
"""

import os
import asyncio
import base64
from datetime import datetime

# Import Crawl4AI components
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

# Create directories for screenshots if they don't exist
SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), 'screenshots')
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

# Target URL to crawl
TARGET_URL = "https://www.windowworldla.com/"

# Configure the browser
browser_config = BrowserConfig(
    headless=True,  # Run browser in headless mode
    verbose=True    # Enable verbose logging
)

async def test_crawl():
    """Test crawling the Window World LA website with screenshots."""
    print(f"Starting crawl of {TARGET_URL}")

    # Configure the crawler run with screenshot enabled
    run_config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,  # Don't use cache for testing
        screenshot=True               # Enable screenshot capture
    )

    # Create timestamp for this crawl
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    try:
        # Initialize the crawler
        async with AsyncWebCrawler(config=browser_config) as crawler:
            print("Crawler initialized, starting crawl...")

            # Perform the crawl
            result = await crawler.arun(
                url=TARGET_URL,
                config=run_config
            )

            print(f"Crawl completed: success={result.success}")

            # Process and save screenshot if available
            if result.screenshot:
                print("Screenshot captured!")

                # Generate a filename with timestamp
                filename = f"windowworldla_homepage_{timestamp}.png"
                filepath = os.path.join(SCREENSHOT_DIR, filename)

                # Save the screenshot to disk
                with open(filepath, 'wb') as f:
                    f.write(base64.b64decode(result.screenshot))

                print(f"Screenshot saved to: {filepath}")
            else:
                print("No screenshot was captured.")

            # Print some stats about the crawl
            print("\nCrawl Statistics:")
            print(f"- Title: {result.metadata.get('title', 'N/A') if result.metadata else 'N/A'}")
            print(f"- URL: {result.url}")

            # Print links count if available
            if result.links and 'all' in result.links:
                print(f"- Links found: {len(result.links['all'])}")

                # Print first 5 links
                print("\nSample Links:")
                for i, link in enumerate(result.links['all'][:5]):
                    print(f"  {i+1}. {link.get('url', 'N/A')} - {link.get('text', 'N/A')}")

            # Print images count if available
            if result.media and 'images' in result.media:
                print(f"\n- Images found: {len(result.media['images'])}")

                # Print first 5 image URLs
                print("\nSample Images:")
                for i, img in enumerate(result.media['images'][:5]):
                    print(f"  {i+1}. {img.get('url', 'N/A')}")

            return result.success

    except Exception as e:
        print(f"Error during crawl: {str(e)}")
        return False

if __name__ == "__main__":
    print("Crawl4AI Test Script")
    print("====================")

    # Run the async test function
    success = asyncio.run(test_crawl())

    print("\n====================")
    print(f"Test {'succeeded' if success else 'failed'}")
