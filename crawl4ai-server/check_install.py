"""
Simple check to verify Crawl4AI installation.
"""

print("Checking Crawl4AI installation...")

try:
    import crawl4ai
    print(f"Crawl4AI is installed. Version: {crawl4ai.__version__}")
    
    # Check for key components
    from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
    print("Successfully imported AsyncWebCrawler, BrowserConfig, and CrawlerRunConfig")
    
    # Check if screenshot parameter exists in CrawlerRunConfig
    config = CrawlerRunConfig()
    has_screenshot = hasattr(config, 'screenshot') or 'screenshot' in dir(config)
    print(f"CrawlerRunConfig has screenshot parameter: {has_screenshot}")
    
    print("Crawl4AI installation check completed successfully!")
except ImportError as e:
    print(f"Error importing Crawl4AI: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
