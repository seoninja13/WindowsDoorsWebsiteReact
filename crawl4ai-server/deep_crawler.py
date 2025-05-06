"""
Deep Crawler for Window World LA Website

This script performs a comprehensive crawl of the Window World LA website,
takes screenshots of each page, and organizes them by URL path.
It also extracts and saves structured content for each page.

Features:
- Multi-page crawling starting from the homepage
- Screenshot capture for each page
- Content extraction (text, links, images)
- Organized file structure by URL path
- Rate limiting to avoid overloading the target site
- Progress tracking and statistics
"""

import os
import re
import json
import time
import base64
import asyncio
import argparse
from urllib.parse import urlparse, urljoin
from datetime import datetime
from typing import Dict, List, Set, Any, Optional

# Import Crawl4AI components
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

# Constants
BASE_URL = "https://www.windowworldla.com"
OUTPUT_DIR = "crawl_results"
SCREENSHOTS_DIR = os.path.join(OUTPUT_DIR, "screenshots")
CONTENT_DIR = os.path.join(OUTPUT_DIR, "content")
STATS_FILE = os.path.join(OUTPUT_DIR, "crawl_stats.json")
MAX_PAGES = 100  # Maximum number of pages to crawl
RATE_LIMIT = 2   # Seconds between requests
MAX_RETRIES = 3  # Maximum number of retries for failed requests

# Create necessary directories
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
os.makedirs(CONTENT_DIR, exist_ok=True)

# Configure logging
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename=os.path.join(OUTPUT_DIR, 'crawler.log'),
    filemode='w'
)
console = logging.StreamHandler()
console.setLevel(logging.INFO)
logging.getLogger('').addHandler(console)
logger = logging.getLogger(__name__)

class DeepCrawler:
    """Deep crawler for Window World LA website."""
    
    def __init__(self, base_url: str, max_pages: int = MAX_PAGES, rate_limit: float = RATE_LIMIT):
        """Initialize the deep crawler."""
        self.base_url = base_url
        self.max_pages = max_pages
        self.rate_limit = rate_limit
        self.visited_urls: Set[str] = set()
        self.queue: List[str] = []
        self.failed_urls: Dict[str, str] = {}
        self.stats = {
            "start_time": datetime.now().isoformat(),
            "pages_crawled": 0,
            "screenshots_taken": 0,
            "failed_pages": 0,
            "total_links_found": 0,
            "total_images_found": 0,
            "end_time": None,
            "duration_seconds": None
        }
        
        # Configure the browser
        self.browser_config = BrowserConfig(
            headless=True,
            verbose=True
        )
    
    def normalize_url(self, url: str) -> str:
        """Normalize URL by removing fragments and trailing slashes."""
        # Remove fragment
        url = url.split('#')[0]
        # Remove trailing slash if present
        if url.endswith('/') and url != self.base_url + '/':
            url = url[:-1]
        return url
    
    def is_valid_url(self, url: str) -> bool:
        """Check if URL is valid and belongs to the target domain."""
        parsed_url = urlparse(url)
        parsed_base = urlparse(self.base_url)
        
        # Check if URL is from the same domain
        if parsed_url.netloc != parsed_base.netloc:
            return False
        
        # Skip certain file types
        skip_extensions = ['.pdf', '.zip', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.webm', '.mp3']
        if any(parsed_url.path.endswith(ext) for ext in skip_extensions):
            return False
        
        return True
    
    def get_path_from_url(self, url: str) -> str:
        """Extract path from URL for organizing files."""
        parsed_url = urlparse(url)
        path = parsed_url.path.strip('/')
        
        # Use 'home' for the homepage
        if not path:
            return 'home'
        
        # Replace special characters with underscores
        path = re.sub(r'[^a-zA-Z0-9/]', '_', path)
        return path
    
    async def crawl_page(self, url: str, crawler: AsyncWebCrawler) -> Optional[Dict[str, Any]]:
        """Crawl a single page, take screenshot, and extract content."""
        logger.info(f"Crawling page: {url}")
        
        # Perform the crawl with retries
        for attempt in range(MAX_RETRIES):
            try:
                # Create a simple run config with screenshot enabled
                run_config = CrawlerRunConfig()
                run_config.screenshot = True
                run_config.extract_links = True
                run_config.extract_media = True
                
                result = await crawler.arun(
                    url=url,
                    config=run_config
                )
                
                if result.success:
                    return self.process_result(url, result)
                else:
                    logger.warning(f"Crawl failed for {url}: {result.error_message if hasattr(result, 'error_message') else 'Unknown error'}")
                    time.sleep(self.rate_limit)  # Wait before retry
            except Exception as e:
                logger.error(f"Error crawling {url}: {str(e)}")
                time.sleep(self.rate_limit)  # Wait before retry
        
        # All retries failed
        self.failed_urls[url] = f"Failed after {MAX_RETRIES} attempts"
        self.stats["failed_pages"] += 1
        return None
    
    def process_result(self, url: str, result: Any) -> Dict[str, Any]:
        """Process crawl result, save screenshot and content."""
        path = self.get_path_from_url(url)
        
        # Create directories for this path
        screenshot_path = os.path.join(SCREENSHOTS_DIR, path)
        content_path = os.path.join(CONTENT_DIR, path)
        os.makedirs(screenshot_path, exist_ok=True)
        os.makedirs(content_path, exist_ok=True)
        
        # Save screenshot if available
        screenshot_file = None
        if hasattr(result, 'screenshot') and result.screenshot:
            screenshot_file = os.path.join(screenshot_path, "screenshot.png")
            with open(screenshot_file, 'wb') as f:
                f.write(base64.b64decode(result.screenshot))
            self.stats["screenshots_taken"] += 1
            logger.info(f"Screenshot saved to: {screenshot_file}")
        
        # Extract and save links
        links = []
        if hasattr(result, 'links') and result.links and 'all' in result.links:
            links = [
                {"url": link.get("url"), "text": link.get("text", "")}
                for link in result.links["all"]
                if "url" in link
            ]
            self.stats["total_links_found"] += len(links)
            
            # Add new URLs to the queue
            for link_info in links:
                link_url = link_info["url"]
                if self.is_valid_url(link_url):
                    normalized_url = self.normalize_url(link_url)
                    if normalized_url not in self.visited_urls and normalized_url not in self.queue:
                        self.queue.append(normalized_url)
        
        # Extract and save images
        images = []
        if hasattr(result, 'media') and result.media and 'images' in result.media:
            images = [
                {"url": img.get("url"), "alt": img.get("alt", "")}
                for img in result.media["images"]
                if "url" in img
            ]
            self.stats["total_images_found"] += len(images)
        
        # Get title and description from metadata if available
        title = ""
        description = ""
        if hasattr(result, 'metadata') and result.metadata:
            title = result.metadata.get("title", "")
            description = result.metadata.get("description", "")
        
        # Save content data
        content_data = {
            "url": url,
            "title": title,
            "description": description,
            "path": path,
            "crawl_time": datetime.now().isoformat(),
            "links": links,
            "images": images,
            "screenshot_file": screenshot_file,
            "has_screenshot": bool(hasattr(result, 'screenshot') and result.screenshot)
        }
        
        # Save markdown content if available
        if hasattr(result, 'markdown'):
            markdown_content = result.markdown.fit_markdown if hasattr(result.markdown, "fit_markdown") else str(result.markdown)
            markdown_file = os.path.join(content_path, "content.md")
            with open(markdown_file, 'w', encoding='utf-8') as f:
                f.write(f"# {content_data['title']}\n\n")
                f.write(f"URL: {url}\n\n")
                f.write(markdown_content)
        
        # Save HTML content if available
        if hasattr(result, 'cleaned_html') or hasattr(result, 'html'):
            html_content = result.cleaned_html if hasattr(result, 'cleaned_html') and result.cleaned_html else result.html if hasattr(result, 'html') else ""
            html_file = os.path.join(content_path, "content.html")
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(html_content)
        
        # Save metadata
        metadata_file = os.path.join(content_path, "metadata.json")
        with open(metadata_file, 'w', encoding='utf-8') as f:
            json.dump(content_data, f, indent=2)
        
        logger.info(f"Content saved for: {url}")
        return content_data
    
    async def run(self) -> Dict[str, Any]:
        """Run the deep crawler."""
        logger.info(f"Starting deep crawl of {self.base_url} (max pages: {self.max_pages})")
        
        # Start with the base URL
        self.queue.append(self.base_url)
        
        async with AsyncWebCrawler(config=self.browser_config) as crawler:
            while self.queue and self.stats["pages_crawled"] < self.max_pages:
                # Get next URL from queue
                url = self.queue.pop(0)
                normalized_url = self.normalize_url(url)
                
                # Skip if already visited
                if normalized_url in self.visited_urls:
                    continue
                
                # Mark as visited
                self.visited_urls.add(normalized_url)
                
                # Crawl the page
                result = await self.crawl_page(normalized_url, crawler)
                if result:
                    self.stats["pages_crawled"] += 1
                
                # Rate limiting
                time.sleep(self.rate_limit)
                
                # Save progress periodically
                if self.stats["pages_crawled"] % 5 == 0:
                    self.save_stats()
        
        # Save final stats
        self.stats["end_time"] = datetime.now().isoformat()
        start_time = datetime.fromisoformat(self.stats["start_time"])
        end_time = datetime.fromisoformat(self.stats["end_time"])
        self.stats["duration_seconds"] = (end_time - start_time).total_seconds()
        self.save_stats()
        
        logger.info(f"Crawl completed. Pages crawled: {self.stats['pages_crawled']}")
        return self.stats
    
    def save_stats(self) -> None:
        """Save crawl statistics to file."""
        with open(STATS_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.stats, f, indent=2)

async def main():
    """Main function to run the deep crawler."""
    parser = argparse.ArgumentParser(description='Deep Crawler for Window World LA Website')
    parser.add_argument('--max-pages', type=int, default=MAX_PAGES, help=f'Maximum number of pages to crawl (default: {MAX_PAGES})')
    parser.add_argument('--rate-limit', type=float, default=RATE_LIMIT, help=f'Seconds between requests (default: {RATE_LIMIT})')
    args = parser.parse_args()
    
    # Create and run the deep crawler
    crawler = DeepCrawler(BASE_URL, args.max_pages, args.rate_limit)
    stats = await crawler.run()
    
    # Print summary
    print("\nCrawl Summary:")
    print(f"Pages crawled: {stats['pages_crawled']}")
    print(f"Screenshots taken: {stats['screenshots_taken']}")
    print(f"Failed pages: {stats['failed_pages']}")
    print(f"Total links found: {stats['total_links_found']}")
    print(f"Total images found: {stats['total_images_found']}")
    print(f"Duration: {stats['duration_seconds']:.2f} seconds")
    print(f"\nResults saved to: {os.path.abspath(OUTPUT_DIR)}")

if __name__ == "__main__":
    print("Window World LA Deep Crawler")
    print("===========================")
    
    # Run the async main function
    asyncio.run(main())
    
    print("===========================")
    print("Crawl completed")
