/**
 * Test script for Supabase integration
 * This script tests the Supabase client utility functions for the Windows Doors Website project.
 */

const { uploadScreenshot, savePageMetadata, savePageLinks, getCrawledPages } = require('./supabase-client');
const path = require('path');
const fs = require('fs');

// Test data
const testScreenshotPath = path.join(__dirname, '../../crawl4ai-server/screenshots/windowworldla_test.png');
const testFileName = `test_${Date.now()}.png`;
const testPageMetadata = {
  url: 'https://www.windowworldla.com/',
  title: 'Window World LA - Home',
  description: 'Window World LA is your local source for replacement windows, doors, and siding.',
  path: 'home',
  has_screenshot: true,
  crawl_time: new Date().toISOString()
};
const testLinks = [
  { url: 'https://www.windowworldla.com/windows/', text: 'Windows' },
  { url: 'https://www.windowworldla.com/doors/', text: 'Doors' },
  { url: 'https://www.windowworldla.com/about-us/', text: 'About Us' }
];

/**
 * Run all tests
 */
async function runTests() {
  console.log('Starting Supabase integration tests...');
  console.log('======================================');
  
  // Test 1: Upload screenshot
  console.log('\n1. Testing screenshot upload...');
  if (!fs.existsSync(testScreenshotPath)) {
    console.log(`❌ Test screenshot not found at: ${testScreenshotPath}`);
  } else {
    console.log(`Found test screenshot: ${testScreenshotPath}`);
    const uploadResult = await uploadScreenshot(testScreenshotPath, testFileName);
    
    if (uploadResult.success) {
      console.log('✅ Screenshot upload successful!');
      console.log(`Public URL: ${uploadResult.data.publicUrl}`);
      
      // Update metadata with screenshot URL
      testPageMetadata.screenshot_url = uploadResult.data.publicUrl;
    } else {
      console.log('❌ Screenshot upload failed:', uploadResult.error);
    }
  }
  
  // Test 2: Save page metadata
  console.log('\n2. Testing page metadata save...');
  const metadataResult = await savePageMetadata(testPageMetadata);
  
  if (metadataResult.success) {
    console.log('✅ Page metadata save successful!');
    console.log(`Saved record ID: ${metadataResult.data[0]?.id}`);
  } else {
    console.log('❌ Page metadata save failed:', metadataResult.error);
  }
  
  // Test 3: Save page links
  console.log('\n3. Testing page links save...');
  const linksResult = await savePageLinks(testPageMetadata.url, testLinks);
  
  if (linksResult.success) {
    console.log('✅ Page links save successful!');
    console.log(`Saved ${linksResult.data?.length} links`);
  } else {
    console.log('❌ Page links save failed:', linksResult.error);
  }
  
  // Test 4: Get crawled pages
  console.log('\n4. Testing get crawled pages...');
  const pagesResult = await getCrawledPages();
  
  if (pagesResult.success) {
    console.log('✅ Get crawled pages successful!');
    console.log(`Retrieved ${pagesResult.data?.length} pages`);
    console.log('First page:', pagesResult.data?.[0]);
  } else {
    console.log('❌ Get crawled pages failed:', pagesResult.error);
  }
  
  console.log('\n======================================');
  console.log('Supabase integration tests completed!');
}

// Run the tests
runTests().catch(error => {
  console.error('Error running tests:', error);
});
