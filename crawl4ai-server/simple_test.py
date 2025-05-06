"""
Simple test script for Crawl4AI with screenshot functionality.
"""

import asyncio
import base64
import os
from datetime import datetime
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

# Create screenshots directory
os.makedirs('screenshots', exist_ok=True)

async def main():
    # Basic browser config
    browser_config = BrowserConfig(
        headless=True,
        verbose=True
    )
    
    # Create crawler instance
    async with AsyncWebCrawler(config=browser_config) as crawler:
        print("Crawler initialized, starting crawl...")
        
        # Configure the run with screenshot enabled
        run_config = CrawlerRunConfig(
            screenshot=True  # Enable screenshot capture
        )
        
        # Crawl the target URL
        result = await crawler.arun(
            url="https://www.windowworldla.com/",
            config=run_config
        )
        
        print(f"Crawl completed: success={result.success}")
        
        # Save screenshot if available
        if result.screenshot:
            print("Screenshot captured!")
            
            # Generate timestamp for unique filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"windowworldla_test_{timestamp}.png"
            filepath = os.path.join("screenshots", filename)
            
            # Save the screenshot
            with open(filepath, "wb") as f:
                f.write(base64.b64decode(result.screenshot))
            
            print(f"Screenshot saved to: {filepath}")
        else:
            print("No screenshot was captured.")

if __name__ == "__main__":
    print("Simple Crawl4AI Test")
    print("===================")
    
    # Run the async main function
    asyncio.run(main())
    
    print("===================")
    print("Test completed")
