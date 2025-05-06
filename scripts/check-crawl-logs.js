/**
 * Check Crawl Logs
 *
 * This script checks the Supabase database for crawl logs.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Import required modules
const { createClient } = require('@supabase/supabase-js');

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Check crawl logs
 */
async function checkCrawlLogs() {
  try {
    console.log('Checking crawl logs in Supabase...');

    // Check if the crawl4ai_logs table exists by trying to query it
    console.log('Checking if the crawl4ai_logs table exists...');

    // Get crawl logs
    const { data: logs, error: logsError } = await supabase
      .from('crawl4ai_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);

    if (logsError) {
      console.error(`Error getting crawl logs: ${logsError.message}`);
      return;
    }

    if (!logs || logs.length === 0) {
      console.log('No crawl logs found.');
      return;
    }

    console.log(`Found ${logs.length} crawl logs:`);
    console.log(JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error(`Error checking crawl logs: ${error.message}`);
  }
}

// Run the function
checkCrawlLogs().catch(error => {
  console.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
