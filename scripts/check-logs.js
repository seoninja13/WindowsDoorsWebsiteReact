/**
 * Check Logs
 * 
 * This script checks the Supabase database for logs from the crawl process.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Import required modules
const supabase = require('../lib/supabase');

/**
 * Get system logs
 * @param {number} limit - Maximum number of logs to retrieve
 * @returns {Promise<Array>} - Array of logs
 */
async function getSystemLogs(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('system_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error getting system logs:', error.message);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error getting system logs:', error.message);
    return [];
  }
}

/**
 * Get Crawl4AI logs
 * @param {number} limit - Maximum number of logs to retrieve
 * @returns {Promise<Array>} - Array of logs
 */
async function getCrawl4AILogs(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('crawl4ai_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error getting Crawl4AI logs:', error.message);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error getting Crawl4AI logs:', error.message);
    return [];
  }
}

/**
 * Get error logs
 * @param {number} limit - Maximum number of logs to retrieve
 * @returns {Promise<Array>} - Array of logs
 */
async function getErrorLogs(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('error_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error getting error logs:', error.message);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error getting error logs:', error.message);
    return [];
  }
}

/**
 * Get performance logs
 * @param {number} limit - Maximum number of logs to retrieve
 * @returns {Promise<Array>} - Array of logs
 */
async function getPerformanceLogs(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('performance_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error getting performance logs:', error.message);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error getting performance logs:', error.message);
    return [];
  }
}

/**
 * Count logs by type
 * @returns {Promise<Object>} - Object with log counts
 */
async function countLogs() {
  try {
    // Count system logs
    const { count: systemCount, error: systemError } = await supabase
      .from('system_logs')
      .select('*', { count: 'exact', head: true });
    
    if (systemError) {
      console.error('Error counting system logs:', systemError.message);
    }
    
    // Count Crawl4AI logs
    const { count: crawl4AICount, error: crawl4AIError } = await supabase
      .from('crawl4ai_logs')
      .select('*', { count: 'exact', head: true });
    
    if (crawl4AIError) {
      console.error('Error counting Crawl4AI logs:', crawl4AIError.message);
    }
    
    // Count error logs
    const { count: errorCount, error: errorError } = await supabase
      .from('error_logs')
      .select('*', { count: 'exact', head: true });
    
    if (errorError) {
      console.error('Error counting error logs:', errorError.message);
    }
    
    // Count performance logs
    const { count: performanceCount, error: performanceError } = await supabase
      .from('performance_logs')
      .select('*', { count: 'exact', head: true });
    
    if (performanceError) {
      console.error('Error counting performance logs:', performanceError.message);
    }
    
    return {
      systemCount: systemCount || 0,
      crawl4AICount: crawl4AICount || 0,
      errorCount: errorCount || 0,
      performanceCount: performanceCount || 0,
      totalCount: (systemCount || 0) + (crawl4AICount || 0) + (errorCount || 0) + (performanceCount || 0)
    };
  } catch (error) {
    console.error('Unexpected error counting logs:', error.message);
    return {
      systemCount: 0,
      crawl4AICount: 0,
      errorCount: 0,
      performanceCount: 0,
      totalCount: 0
    };
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Checking logs in Supabase...');
    
    // Count logs
    const counts = await countLogs();
    
    console.log('Log counts:');
    console.log(`- System logs: ${counts.systemCount}`);
    console.log(`- Crawl4AI logs: ${counts.crawl4AICount}`);
    console.log(`- Error logs: ${counts.errorCount}`);
    console.log(`- Performance logs: ${counts.performanceCount}`);
    console.log(`- Total logs: ${counts.totalCount}`);
    
    // Get recent system logs
    const systemLogs = await getSystemLogs(5);
    
    if (systemLogs.length > 0) {
      console.log('\nRecent system logs:');
      systemLogs.forEach(log => {
        console.log(`[${log.timestamp}] [${log.level}] [${log.source}] ${log.message}`);
      });
    } else {
      console.log('\nNo system logs found.');
    }
    
    // Get recent Crawl4AI logs
    const crawl4AILogs = await getCrawl4AILogs(5);
    
    if (crawl4AILogs.length > 0) {
      console.log('\nRecent Crawl4AI logs:');
      crawl4AILogs.forEach(log => {
        console.log(`[${log.timestamp}] [${log.operation}] [${log.status}] ${log.url}`);
      });
    } else {
      console.log('\nNo Crawl4AI logs found.');
    }
    
    // Get recent error logs
    const errorLogs = await getErrorLogs(5);
    
    if (errorLogs.length > 0) {
      console.log('\nRecent error logs:');
      errorLogs.forEach(log => {
        console.log(`[${log.timestamp}] [${log.severity}] [${log.component}] ${log.error_message}`);
      });
    } else {
      console.log('\nNo error logs found.');
    }
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
  } finally {
    // Exit the process
    process.exit(0);
  }
}

// Run the main function
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
