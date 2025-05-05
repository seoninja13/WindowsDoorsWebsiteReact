'use client';

import { useState, useEffect } from 'react';
import { 
  crawlWebsite, 
  extractPageContent, 
  extractSiteStructure, 
  extractImages, 
  generateSitemap 
} from '@/lib/utils/crawler';

export default function CrawlerAdmin() {
  const [baseUrl, setBaseUrl] = useState('https://www.windowworldla.com/');
  const [maxPages, setMaxPages] = useState(100);
  const [crawledUrls, setCrawledUrls] = useState<string[]>([]);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [pageContent, setPageContent] = useState<any>(null);
  const [siteStructure, setSiteStructure] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [sitemap, setSitemap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('urls');
  const [progress, setProgress] = useState(0);

  const handleCrawl = async () => {
    try {
      setLoading(true);
      setError('');
      setProgress(10);
      
      const urls = await crawlWebsite(baseUrl, maxPages);
      setCrawledUrls(urls);
      
      setProgress(100);
    } catch (error: any) {
      setError(error.message || 'An error occurred while crawling');
    } finally {
      setLoading(false);
    }
  };

  const handleExtractContent = async () => {
    if (!selectedUrl) {
      setError('Please select a URL first');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setProgress(10);
      
      const content = await extractPageContent(selectedUrl);
      setPageContent(content);
      
      setProgress(100);
    } catch (error: any) {
      setError(error.message || 'An error occurred while extracting content');
    } finally {
      setLoading(false);
    }
  };

  const handleExtractStructure = async () => {
    try {
      setLoading(true);
      setError('');
      setProgress(10);
      
      const structure = await extractSiteStructure(baseUrl);
      setSiteStructure(structure);
      
      setProgress(100);
    } catch (error: any) {
      setError(error.message || 'An error occurred while extracting site structure');
    } finally {
      setLoading(false);
    }
  };

  const handleExtractImages = async () => {
    if (!selectedUrl) {
      setError('Please select a URL first');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setProgress(10);
      
      const imageUrls = await extractImages(selectedUrl);
      setImages(imageUrls);
      
      setProgress(100);
    } catch (error: any) {
      setError(error.message || 'An error occurred while extracting images');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSitemap = async () => {
    if (crawledUrls.length === 0) {
      setError('Please crawl the website first');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setProgress(10);
      
      const sitemapXml = await generateSitemap(crawledUrls);
      setSitemap(sitemapXml);
      
      setProgress(100);
    } catch (error: any) {
      setError(error.message || 'An error occurred while generating sitemap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Website Crawler Admin</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Crawl Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Base URL</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Max Pages</label>
            <input
              type="number"
              value={maxPages}
              onChange={(e) => setMaxPages(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              disabled={loading}
            />
          </div>
        </div>
        <button
          onClick={handleCrawl}
          disabled={loading}
          className="bg-ww-blue text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Crawling...' : 'Start Crawling'}
        </button>
      </div>
      
      {loading && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-ww-blue h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">Processing... {progress}%</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('urls')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'urls'
                  ? 'border-ww-blue text-ww-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              URLs ({crawledUrls.length})
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-ww-blue text-ww-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Page Content
            </button>
            <button
              onClick={() => setActiveTab('structure')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'structure'
                  ? 'border-ww-blue text-ww-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Site Structure
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'images'
                  ? 'border-ww-blue text-ww-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Images ({images.length})
            </button>
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sitemap'
                  ? 'border-ww-blue text-ww-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sitemap
            </button>
          </nav>
        </div>
        
        {activeTab === 'urls' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Crawled URLs</h3>
            {crawledUrls.length > 0 ? (
              <div className="mb-4">
                <select
                  value={selectedUrl}
                  onChange={(e) => setSelectedUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                >
                  <option value="">Select a URL</option>
                  {crawledUrls.map((url, index) => (
                    <option key={index} value={url}>
                      {url}
                    </option>
                  ))}
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={handleExtractContent}
                    disabled={!selectedUrl || loading}
                    className="bg-ww-blue text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Extract Content
                  </button>
                  <button
                    onClick={handleExtractImages}
                    disabled={!selectedUrl || loading}
                    className="bg-ww-blue text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Extract Images
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No URLs crawled yet. Start crawling to see results.</p>
            )}
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">URL List</h4>
              <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
                {crawledUrls.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {crawledUrls.map((url, index) => (
                      <li key={index} className="text-sm">{url}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No URLs available</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'content' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Page Content</h3>
            {selectedUrl ? (
              <div>
                <p className="mb-2">
                  <span className="font-medium">Selected URL:</span> {selectedUrl}
                </p>
                <button
                  onClick={handleExtractContent}
                  disabled={loading}
                  className="bg-ww-blue text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
                >
                  {loading ? 'Extracting...' : 'Extract Content'}
                </button>
                
                {pageContent ? (
                  <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap">
                      {JSON.stringify(pageContent, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-gray-500">No content extracted yet</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Please select a URL first</p>
            )}
          </div>
        )}
        
        {activeTab === 'structure' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Site Structure</h3>
            <button
              onClick={handleExtractStructure}
              disabled={loading}
              className="bg-ww-blue text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
            >
              {loading ? 'Extracting...' : 'Extract Site Structure'}
            </button>
            
            {siteStructure ? (
              <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(siteStructure, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">No structure extracted yet</p>
            )}
          </div>
        )}
        
        {activeTab === 'images' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Images</h3>
            {selectedUrl ? (
              <div>
                <p className="mb-2">
                  <span className="font-medium">Selected URL:</span> {selectedUrl}
                </p>
                <button
                  onClick={handleExtractImages}
                  disabled={loading}
                  className="bg-ww-blue text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
                >
                  {loading ? 'Extracting...' : 'Extract Images'}
                </button>
                
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((imageUrl, index) => (
                      <div key={index} className="bg-gray-100 p-2 rounded">
                        <div className="h-32 bg-gray-200 relative">
                          {/* This will be replaced with actual image */}
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs text-center p-2 overflow-hidden">
                            {imageUrl}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No images extracted yet</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Please select a URL first</p>
            )}
          </div>
        )}
        
        {activeTab === 'sitemap' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Sitemap</h3>
            <button
              onClick={handleGenerateSitemap}
              disabled={crawledUrls.length === 0 || loading}
              className="bg-ww-blue text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
            >
              {loading ? 'Generating...' : 'Generate Sitemap'}
            </button>
            
            {sitemap ? (
              <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">{sitemap}</pre>
              </div>
            ) : (
              <p className="text-gray-500">No sitemap generated yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
