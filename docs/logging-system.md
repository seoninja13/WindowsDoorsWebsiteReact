# Logging System

> **Breadcrumb Navigation**: [README.md](../README.md) > [Documentation](./index.md) > Logging System

## Overview

This document describes the comprehensive logging system implemented for the Windows Doors Website React project. The logging system is designed to track all system activities, including Crawl4AI operations, errors, performance metrics, user activities, and API requests.

## Architecture

The logging system consists of the following components:

1. **Database Tables**: A set of tables in Supabase for storing different types of logs
2. **JavaScript Utility**: A utility library for logging from the Next.js application
3. **Python Utility**: A utility library for logging from the Crawl4AI server
4. **SQL Functions**: Functions for logging operations directly from SQL
5. **RLS Policies**: Row Level Security policies for controlling access to logs

## Database Schema

The logging system uses the following tables in Supabase:

### System Logs

The `logging.system_logs` table stores general purpose logs for all system activities:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| timestamp | TIMESTAMPTZ | When the log was created |
| level | VARCHAR | Log level (DEBUG, INFO, WARN, ERROR, FATAL) |
| source | VARCHAR | Component/module that generated the log |
| message | TEXT | Log message |
| details | JSONB | Additional structured data |
| user_id | UUID | User who triggered the action |
| session_id | VARCHAR | Session identifier |
| request_id | VARCHAR | Request identifier for tracing |
| ip_address | VARCHAR | IPv4 or IPv6 address |
| user_agent | TEXT | Browser/client information |
| created_at | TIMESTAMPTZ | When the record was created |

### Crawl4AI Logs

The `logging.crawl4ai_logs` table stores logs specific to Crawl4AI operations:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| timestamp | TIMESTAMPTZ | When the log was created |
| operation | VARCHAR | Operation type (CRAWL_START, CRAWL_PAGE, etc.) |
| url | TEXT | URL being crawled |
| status | VARCHAR | Operation status (SUCCESS, FAILURE, WARNING, IN_PROGRESS) |
| duration_ms | INTEGER | Operation duration in milliseconds |
| page_title | TEXT | Title of the page being crawled |
| content_extracted | BOOLEAN | Whether content was successfully extracted |
| screenshot_captured | BOOLEAN | Whether screenshot was successfully captured |
| components_identified | INTEGER | Number of UI components identified |
| links_extracted | INTEGER | Number of links extracted |
| images_extracted | INTEGER | Number of images extracted |
| error_message | TEXT | Error message if operation failed |
| details | JSONB | Additional structured data |
| created_at | TIMESTAMPTZ | When the record was created |

### Error Logs

The `logging.error_logs` table stores detailed logs for errors and exceptions:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| timestamp | TIMESTAMPTZ | When the log was created |
| error_type | VARCHAR | Type of error |
| error_message | TEXT | Error message |
| stack_trace | TEXT | Stack trace if available |
| component | VARCHAR | Component where error occurred |
| severity | VARCHAR | Error severity (LOW, MEDIUM, HIGH, CRITICAL) |
| user_id | UUID | User who encountered the error |
| session_id | VARCHAR | Session identifier |
| request_id | VARCHAR | Request identifier |
| url | TEXT | URL where error occurred |
| request_data | JSONB | Request data that caused the error |
| environment_info | JSONB | Environment information (browser, OS, etc.) |
| resolved | BOOLEAN | Whether the error has been resolved |
| resolution_notes | TEXT | Notes on how the error was resolved |
| created_at | TIMESTAMPTZ | When the record was created |
| resolved_at | TIMESTAMPTZ | When the error was resolved |

### Performance Logs

The `logging.performance_logs` table stores logs for performance metrics:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| timestamp | TIMESTAMPTZ | When the log was created |
| component | VARCHAR | Component being measured |
| operation | VARCHAR | Operation being performed |
| duration_ms | INTEGER | Duration in milliseconds |
| memory_usage_kb | INTEGER | Memory usage in kilobytes |
| cpu_usage_percent | NUMERIC | CPU usage percentage |
| request_count | INTEGER | Number of requests |
| error_count | INTEGER | Number of errors |
| user_count | INTEGER | Number of users |
| details | JSONB | Additional metrics |
| created_at | TIMESTAMPTZ | When the record was created |

### User Activity Logs

The `logging.user_activity_logs` table stores logs for user actions:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| timestamp | TIMESTAMPTZ | When the log was created |
| user_id | UUID | User who performed the action |
| action | VARCHAR | Action performed |
| resource_type | VARCHAR | Type of resource acted upon |
| resource_id | VARCHAR | ID of resource acted upon |
| previous_state | JSONB | State before action |
| new_state | JSONB | State after action |
| ip_address | VARCHAR | IP address |
| user_agent | TEXT | Browser/client information |
| session_id | VARCHAR | Session identifier |
| success | BOOLEAN | Whether the action was successful |
| failure_reason | TEXT | Reason for failure if unsuccessful |
| created_at | TIMESTAMPTZ | When the record was created |

### API Request Logs

The `logging.api_request_logs` table stores logs for API requests:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| timestamp | TIMESTAMPTZ | When the log was created |
| method | VARCHAR | HTTP method |
| endpoint | TEXT | API endpoint |
| status_code | INTEGER | HTTP status code |
| duration_ms | INTEGER | Request duration in milliseconds |
| request_size_bytes | INTEGER | Size of request in bytes |
| response_size_bytes | INTEGER | Size of response in bytes |
| user_id | UUID | User who made the request |
| client_id | VARCHAR | Client application ID |
| ip_address | VARCHAR | IP address |
| user_agent | TEXT | Browser/client information |
| request_headers | JSONB | Request headers |
| request_params | JSONB | Request parameters |
| request_body | JSONB | Request body |
| response_body | JSONB | Response body |
| error_message | TEXT | Error message if request failed |
| created_at | TIMESTAMPTZ | When the record was created |

## JavaScript Utility

The JavaScript utility (`lib/logging.js`) provides functions for logging from the Next.js application:

```javascript
const { logger } = require('../lib/logging');

// Log a system event
logger.info('MyComponent', 'User logged in successfully', {
  userId: '123',
  ipAddress: '192.168.1.1'
});

// Log an error
logError('ValidationError', 'Invalid input', 'FormComponent', ErrorSeverity.MEDIUM, {
  stackTrace: new Error().stack,
  url: '/contact'
});

// Log a Crawl4AI operation
logCrawl4AIOperation(Crawl4AIOperation.CRAWL_PAGE, 'https://example.com', Crawl4AIStatus.SUCCESS, {
  durationMs: 1500,
  pageTitle: 'Example Page'
});

// Log performance metrics
logPerformance('ImageProcessor', 'optimizeImage', 250, {
  memoryUsageKb: 1024,
  cpuUsagePercent: 15.5
});

// Log user activity
logUserActivity('SUBMIT_FORM', true, {
  resourceType: 'form',
  resourceId: 'contact-form'
});

// Log API request
logAPIRequest('POST', '/api/contact', 200, 120, {
  requestBody: { name: 'John', email: 'john@example.com' },
  responseBody: { success: true }
});
```

## Python Utility

The Python utility (`crawl4ai-server/logger.py`) provides functions for logging from the Crawl4AI server:

```python
from logger import debug, info, warn, error, fatal
from logger import log_crawl4ai_operation, log_error, log_performance
from logger import Crawl4AIOperation, Crawl4AIStatus, ErrorSeverity
from logger import track_performance, handle_exceptions

# Log a system event
info('Crawler', 'Starting crawl', url='https://example.com')

# Log a Crawl4AI operation
log_crawl4ai_operation(
    Crawl4AIOperation.CRAWL_PAGE,
    'https://example.com',
    Crawl4AIStatus.SUCCESS,
    duration_ms=1500,
    page_title='Example Page'
)

# Log an error
log_error(
    'ValidationError',
    'Invalid URL',
    'Crawler',
    ErrorSeverity.MEDIUM,
    url='https://example.com'
)

# Log performance metrics
log_performance(
    'ImageProcessor',
    'optimizeImage',
    250,
    memory_usage_kb=1024,
    cpu_usage_percent=15.5
)

# Use decorators for performance tracking and exception handling
@track_performance('Crawler', 'crawlPage')
@handle_exceptions('Crawler', ErrorSeverity.HIGH)
def crawl_page(url):
    # Function implementation
    pass
```

## SQL Functions

The SQL functions provide a way to log directly from SQL:

```sql
-- Log a system event
SELECT logging.log_system_event(
    'INFO',
    'Database',
    'User created',
    '{"userId": "123"}'::jsonb
);

-- Log a Crawl4AI operation
SELECT logging.log_crawl4ai_operation(
    'CRAWL_PAGE',
    'https://example.com',
    'SUCCESS',
    1500,
    'Example Page',
    true,
    true,
    10,
    20,
    5,
    NULL,
    '{"browser": "Chrome"}'::jsonb
);

-- Log an error
SELECT logging.log_error(
    'DatabaseError',
    'Connection failed',
    'Database',
    'HIGH',
    'Stack trace...',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '{"dbVersion": "13.4"}'::jsonb
);
```

## Setup and Configuration

### Setting Up the Logging Tables

To set up the logging tables in Supabase:

1. Run the SQL script to create the tables:

```bash
npm run setup:logging
```

2. Verify that the tables were created successfully:

```bash
npm run test:logging
```

### Configuring Logging Levels

The logging system supports the following log levels:

- **DEBUG**: Detailed information for debugging purposes
- **INFO**: General information about system operation
- **WARN**: Warning messages that don't affect normal operation
- **ERROR**: Error messages that affect normal operation
- **FATAL**: Critical errors that prevent the system from functioning

You can configure the logging level in the environment variables:

```
NEXT_PUBLIC_LOG_LEVEL=INFO
```

## Best Practices

### When to Log

- **System Events**: Log important system events like startup, shutdown, and configuration changes
- **User Actions**: Log user actions like form submissions, logins, and logouts
- **Errors**: Log all errors with appropriate severity levels
- **Performance**: Log performance metrics for critical operations
- **API Requests**: Log API requests for debugging and monitoring

### What to Log

- **Context**: Include enough context to understand what happened
- **Identifiers**: Include identifiers like user IDs, session IDs, and request IDs
- **Timestamps**: Include timestamps for all logs
- **Structured Data**: Use structured data (JSON) for additional details
- **Sensitive Data**: Never log sensitive data like passwords or API keys

### How to Log

- **Use the Right Level**: Use the appropriate log level for each message
- **Be Concise**: Keep log messages concise and to the point
- **Be Consistent**: Use consistent formatting and terminology
- **Use Categories**: Categorize logs by component and operation
- **Include Metadata**: Include metadata like user IDs, IP addresses, and timestamps

## Related Documentation

- [Supabase Integration](./integrations/supabase.md)
- [Crawl4AI Implementation](./web-scraping/crawl4ai-implementation.md)
- [Error Handling](./error-handling.md)
- [Performance Monitoring](./performance-monitoring.md)

Last Updated: May 8, 2025
