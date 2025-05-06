/**
 * Logging Test Script
 * 
 * This script tests the logging functionality by creating various types of logs
 * in Supabase. It tests system logs, Crawl4AI logs, error logs, performance logs,
 * user activity logs, and API request logs.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Import the logging utility
const {
  LogLevel,
  ErrorSeverity,
  Crawl4AIOperation,
  Crawl4AIStatus,
  logSystemEvent,
  logCrawl4AIOperation,
  logError,
  logPerformance,
  logUserActivity,
  logAPIRequest,
  logger
} = require('../lib/logging');

/**
 * Run all tests
 */
async function runTests() {
  console.log('Logging Test');
  console.log('============');
  
  // Test 1: System Logs
  console.log('\n1. Testing system logs...');
  const systemLogId = await logger.info('test-logging.js', 'Testing system logs');
  console.log(`System log created with ID: ${systemLogId || 'Failed'}`);
  
  // Test 2: Crawl4AI Logs
  console.log('\n2. Testing Crawl4AI logs...');
  const crawl4aiLogId = await logCrawl4AIOperation(
    Crawl4AIOperation.CRAWL_PAGE,
    'https://www.windowworldla.com/',
    Crawl4AIStatus.SUCCESS,
    {
      durationMs: 1500,
      pageTitle: 'Window World LA - Replacement Windows & Doors',
      contentExtracted: true,
      screenshotCaptured: true,
      componentsIdentified: 25,
      linksExtracted: 42,
      imagesExtracted: 15,
      details: {
        browser: 'Chrome',
        viewport: { width: 1920, height: 1080 }
      }
    }
  );
  console.log(`Crawl4AI log created with ID: ${crawl4aiLogId || 'Failed'}`);
  
  // Test 3: Error Logs
  console.log('\n3. Testing error logs...');
  const errorLogId = await logError(
    'ValidationError',
    'Invalid URL format',
    'Crawler',
    ErrorSeverity.MEDIUM,
    {
      stackTrace: 'Error: Invalid URL format\n    at validateUrl (/app/crawler.js:42:11)\n    at crawlPage (/app/crawler.js:78:3)',
      url: 'https://invalid-url',
      environmentInfo: {
        nodeVersion: process.version,
        platform: process.platform
      }
    }
  );
  console.log(`Error log created with ID: ${errorLogId || 'Failed'}`);
  
  // Test 4: Performance Logs
  console.log('\n4. Testing performance logs...');
  const performanceLogSuccess = await logPerformance(
    'ImageProcessor',
    'optimizeImage',
    250,
    {
      memoryUsageKb: 1024,
      cpuUsagePercent: 15.5,
      details: {
        imageSize: '1200x800',
        format: 'webp',
        compressionLevel: 80
      }
    }
  );
  console.log(`Performance log created: ${performanceLogSuccess ? 'Success' : 'Failed'}`);
  
  // Test 5: User Activity Logs
  console.log('\n5. Testing user activity logs...');
  const userActivityLogSuccess = await logUserActivity(
    'SUBMIT_FORM',
    true,
    {
      resourceType: 'form',
      resourceId: 'contact-form',
      newState: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'I need a quote for window replacement'
      },
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  );
  console.log(`User activity log created: ${userActivityLogSuccess ? 'Success' : 'Failed'}`);
  
  // Test 6: API Request Logs
  console.log('\n6. Testing API request logs...');
  const apiRequestLogSuccess = await logAPIRequest(
    'POST',
    '/api/contact',
    200,
    120,
    {
      requestSizeBytes: 1024,
      responseSizeBytes: 512,
      requestParams: { formId: 'contact-form' },
      requestBody: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'I need a quote for window replacement'
      },
      responseBody: { success: true, message: 'Form submitted successfully' }
    }
  );
  console.log(`API request log created: ${apiRequestLogSuccess ? 'Success' : 'Failed'}`);
  
  // Summary
  console.log('\n============');
  console.log('Test Summary:');
  console.log(`System Log: ${systemLogId ? '✅ Success' : '❌ Failed'}`);
  console.log(`Crawl4AI Log: ${crawl4aiLogId ? '✅ Success' : '❌ Failed'}`);
  console.log(`Error Log: ${errorLogId ? '✅ Success' : '❌ Failed'}`);
  console.log(`Performance Log: ${performanceLogSuccess ? '✅ Success' : '❌ Failed'}`);
  console.log(`User Activity Log: ${userActivityLogSuccess ? '✅ Success' : '❌ Failed'}`);
  console.log(`API Request Log: ${apiRequestLogSuccess ? '✅ Success' : '❌ Failed'}`);
  console.log('============');
  
  // Exit with appropriate code
  const success = systemLogId && crawl4aiLogId && errorLogId && 
                 performanceLogSuccess && userActivityLogSuccess && apiRequestLogSuccess;
  process.exit(success ? 0 : 1);
}

// Run the tests
runTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
});
