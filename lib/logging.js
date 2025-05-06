/**
 * Logging Utility
 *
 * This file provides functions for logging various types of events to Supabase.
 * It includes functions for logging system events, Crawl4AI operations, errors,
 * performance metrics, user activities, and API requests.
 *
 * It also provides fallback logging to console and file if Supabase is not available.
 */

const supabase = require('./supabase');
const fs = require('fs').promises;
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
fs.mkdir(logsDir, { recursive: true }).catch(err => {
  console.error(`Error creating logs directory: ${err.message}`);
});

/**
 * Log to file
 * @param {string} level - Log level
 * @param {string} source - Log source
 * @param {string} message - Log message
 * @param {Object} details - Additional details
 */
async function logToFile(level, source, message, details = {}) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      source,
      message,
      details
    };

    const logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
    await fs.appendFile(
      logFile,
      `${JSON.stringify(logEntry)}\n`
    );
  } catch (error) {
    console.error(`Error logging to file: ${error.message}`);
  }
}

/**
 * Log levels
 */
const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

/**
 * Error severity levels
 */
const ErrorSeverity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

/**
 * Crawl4AI operation types
 */
const Crawl4AIOperation = {
  CRAWL_START: 'CRAWL_START',
  CRAWL_END: 'CRAWL_END',
  CRAWL_PAGE: 'CRAWL_PAGE',
  EXTRACT_CONTENT: 'EXTRACT_CONTENT',
  SCREENSHOT: 'SCREENSHOT',
  EXTRACT_COMPONENTS: 'EXTRACT_COMPONENTS',
  EXTRACT_LINKS: 'EXTRACT_LINKS',
  EXTRACT_IMAGES: 'EXTRACT_IMAGES'
};

/**
 * Crawl4AI operation status
 */
const Crawl4AIStatus = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  WARNING: 'WARNING',
  IN_PROGRESS: 'IN_PROGRESS'
};

/**
 * Log a system event
 * @param {string} level - Log level (DEBUG, INFO, WARN, ERROR, FATAL)
 * @param {string} source - Component/module that generated the log
 * @param {string} message - Log message
 * @param {Object} options - Additional options
 * @returns {Promise<string|null>} - Log ID if successful, null if failed
 */
async function logSystemEvent(level, source, message, options = {}) {
  try {
    const { data, error } = await supabase
      .from('system_logs')
      .insert([{
        level,
        source,
        message,
        details: options.details || null,
        user_id: options.userId || null,
        session_id: options.sessionId || null,
        request_id: options.requestId || null,
        ip_address: options.ipAddress || null,
        user_agent: options.userAgent || null
      }])
      .select();

    if (error) {
      console.error('Error logging system event:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error logging system event:', error.message);
    return null;
  }
}

/**
 * Log a Crawl4AI operation
 * @param {string} operation - Operation type
 * @param {string} url - URL being crawled
 * @param {string} status - Operation status
 * @param {Object} options - Additional options
 * @returns {Promise<string|null>} - Log ID if successful, null if failed
 */
async function logCrawl4AIOperation(operation, url, status, options = {}) {
  try {
    const { data, error } = await supabase
      .from('crawl4ai_logs')
      .insert([{
        operation,
        url,
        status,
        duration_ms: options.durationMs || null,
        page_title: options.pageTitle || null,
        content_extracted: options.contentExtracted || null,
        screenshot_captured: options.screenshotCaptured || null,
        components_identified: options.componentsIdentified || null,
        links_extracted: options.linksExtracted || null,
        images_extracted: options.imagesExtracted || null,
        error_message: options.errorMessage || null,
        details: options.details || null
      }])
      .select();

    if (error) {
      console.error('Error logging Crawl4AI operation:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error logging Crawl4AI operation:', error.message);
    return null;
  }
}

/**
 * Log an error
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 * @param {string} component - Component where error occurred
 * @param {string} severity - Error severity
 * @param {Object} options - Additional options
 * @returns {Promise<string|null>} - Log ID if successful, null if failed
 */
async function logError(errorType, errorMessage, component, severity, options = {}) {
  try {
    const { data, error } = await supabase
      .from('error_logs')
      .insert([{
        error_type: errorType,
        error_message: errorMessage,
        component,
        severity,
        stack_trace: options.stackTrace || null,
        user_id: options.userId || null,
        session_id: options.sessionId || null,
        request_id: options.requestId || null,
        url: options.url || null,
        request_data: options.requestData || null,
        environment_info: options.environmentInfo || null
      }])
      .select();

    if (error) {
      console.error('Error logging error:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error logging error:', error.message);
    return null;
  }
}

/**
 * Log performance metrics
 * @param {string} component - Component being measured
 * @param {string} operation - Operation being performed
 * @param {number} durationMs - Duration in milliseconds
 * @param {Object} options - Additional options
 * @returns {Promise<boolean>} - True if successful, false if failed
 */
async function logPerformance(component, operation, durationMs, options = {}) {
  try {
    const { error } = await supabase
      .from('performance_logs')
      .insert([{
        component,
        operation,
        duration_ms: durationMs,
        memory_usage_kb: options.memoryUsageKb || null,
        cpu_usage_percent: options.cpuUsagePercent || null,
        request_count: options.requestCount || null,
        error_count: options.errorCount || null,
        user_count: options.userCount || null,
        details: options.details || null
      }]);

    if (error) {
      console.error('Error logging performance metrics:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error logging performance metrics:', error.message);
    return false;
  }
}

/**
 * Log user activity
 * @param {string} action - Action performed
 * @param {boolean} success - Whether the action was successful
 * @param {Object} options - Additional options
 * @returns {Promise<boolean>} - True if successful, false if failed
 */
async function logUserActivity(action, success, options = {}) {
  try {
    const { error } = await supabase
      .from('user_activity_logs')
      .insert([{
        user_id: options.userId || null,
        action,
        resource_type: options.resourceType || null,
        resource_id: options.resourceId || null,
        previous_state: options.previousState || null,
        new_state: options.newState || null,
        ip_address: options.ipAddress || null,
        user_agent: options.userAgent || null,
        session_id: options.sessionId || null,
        success,
        failure_reason: options.failureReason || null
      }]);

    if (error) {
      console.error('Error logging user activity:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error logging user activity:', error.message);
    return false;
  }
}

/**
 * Log API request
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @param {number} statusCode - HTTP status code
 * @param {number} durationMs - Request duration in milliseconds
 * @param {Object} options - Additional options
 * @returns {Promise<boolean>} - True if successful, false if failed
 */
async function logAPIRequest(method, endpoint, statusCode, durationMs, options = {}) {
  try {
    const { error } = await supabase
      .from('api_request_logs')
      .insert([{
        method,
        endpoint,
        status_code: statusCode,
        duration_ms: durationMs,
        request_size_bytes: options.requestSizeBytes || null,
        response_size_bytes: options.responseSizeBytes || null,
        user_id: options.userId || null,
        client_id: options.clientId || null,
        ip_address: options.ipAddress || null,
        user_agent: options.userAgent || null,
        request_headers: options.requestHeaders || null,
        request_params: options.requestParams || null,
        request_body: options.requestBody || null,
        response_body: options.responseBody || null,
        error_message: options.errorMessage || null
      }]);

    if (error) {
      console.error('Error logging API request:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error logging API request:', error.message);
    return false;
  }
}

// Convenience methods for system logging
const logger = {
  debug: (source, message, options = {}) => logSystemEvent(LogLevel.DEBUG, source, message, options),
  info: (source, message, options = {}) => logSystemEvent(LogLevel.INFO, source, message, options),
  warn: (source, message, options = {}) => logSystemEvent(LogLevel.WARN, source, message, options),
  error: (source, message, options = {}) => logSystemEvent(LogLevel.ERROR, source, message, options),
  fatal: (source, message, options = {}) => logSystemEvent(LogLevel.FATAL, source, message, options)
};

// Export all logging functions and constants
module.exports = {
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
};
