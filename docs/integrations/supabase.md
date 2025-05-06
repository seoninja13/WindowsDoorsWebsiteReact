# Supabase Integration

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Integrations](./index.md) > Supabase Integration

## Overview

This document describes the integration of Supabase with the Windows Doors Website React project. Supabase provides a PostgreSQL database, authentication, storage, and other services that are used throughout the application.

## Configuration

### Environment Variables

The Supabase integration uses the following environment variables defined in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Supabase Client

The Supabase client is initialized in `lib/supabase.js` and exported for use throughout the application:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export default supabase;
```

## Database Schema

The Supabase database schema includes the following tables:

1. **pages**: Stores page metadata, URLs, titles, and screenshot references
2. **links**: Stores relationships between pages
3. **images**: Tracks images found on pages
4. **test_table**: Used for testing the Supabase connection

## SQL Functions

The following SQL functions are defined in `sql/supabase-functions.sql`:

1. **get_service_status()**: Returns the current status of the Supabase service
2. **create_test_table()**: Creates a test table for testing the Supabase connection

## Usage

### Basic Usage

To use the Supabase client in a component:

```javascript
import supabase from '@/lib/supabase';

// Query data
const { data, error } = await supabase.from('pages').select('*');
```

### Testing the Connection

To test the Supabase connection:

```bash
npm run test:supabase
```

This will run the test script in `scripts/test-supabase.js`, which tests the connection to Supabase and performs basic operations.

## Integration with Crawl4AI

The Supabase integration is used with Crawl4AI to store crawled data:

1. Crawl4AI extracts content and takes screenshots of web pages
2. Screenshots are uploaded to Supabase Storage
3. Page metadata is stored in the Supabase database
4. Links and images are tracked in their respective tables

## Troubleshooting

### Common Issues

1. **Connection Errors**

   - Error: `Failed to connect to Supabase`
   - Solution: Verify that the Supabase URL and API key are correct in `.env.local`

2. **Authentication Errors**

   - Error: `Invalid API key or JWT`
   - Solution: Check the Supabase API key in `.env.local`

3. **Storage Errors**

   - Error: `Failed to upload file to Supabase Storage`
   - Solution: Verify that the Supabase Storage bucket exists and the API key has the necessary permissions

## Related Documentation

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase JavaScript Client](https://supabase.io/docs/reference/javascript)
- [Crawl4AI Integration](../web-scraping/crawl4ai-implementation.md)
- [Web Scraping](../web-scraping.md)

Last Updated: May 6, 2025
