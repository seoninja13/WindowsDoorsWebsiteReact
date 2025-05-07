# Logging System Documentation

## Overview

This document provides a detailed description of the logging system implemented in the Windows Doors Website React project. The logging system is designed to capture and store information about application events, errors, and user interactions to facilitate debugging, monitoring, and analysis.

## Logging Implementation

### 1. Logging Utility

The logging utility is implemented in the `/lib/logging.ts` file and provides functions for logging different types of events:

```typescript
// lib/logging.ts
import supabase from './database';

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * Log entry interface
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  timestamp: string;
  source: string;
}

/**
 * Logs a message to the database
 * @param level Log level
 * @param message Log message
 * @param context Additional context
 * @param source Source of the log
 * @returns Promise that resolves when the log is saved
 */
export async function log(
  level: LogLevel,
  message: string,
  context?: Record<string, any>,
  source: string = 'app'
): Promise<void> {
  try {
    const logEntry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      source,
    };
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console[level === LogLevel.ERROR ? 'error' : level === LogLevel.WARN ? 'warn' : 'log'](
        `[${logEntry.timestamp}] [${logEntry.level}] [${logEntry.source}] ${logEntry.message}`,
        logEntry.context
      );
    }
    
    // Log to database in production
    if (process.env.NODE_ENV === 'production') {
      await supabase.from('logs').insert(logEntry);
    }
  } catch (error) {
    // Fallback to console logging if database logging fails
    console.error('Error logging to database:', error);
    console[level === LogLevel.ERROR ? 'error' : level === LogLevel.WARN ? 'warn' : 'log'](
      `[${new Date().toISOString()}] [${level}] [${source}] ${message}`,
      context
    );
  }
}

/**
 * Logs a debug message
 * @param message Log message
 * @param context Additional context
 * @param source Source of the log
 * @returns Promise that resolves when the log is saved
 */
export function debug(
  message: string,
  context?: Record<string, any>,
  source: string = 'app'
): Promise<void> {
  return log(LogLevel.DEBUG, message, context, source);
}

/**
 * Logs an info message
 * @param message Log message
 * @param context Additional context
 * @param source Source of the log
 * @returns Promise that resolves when the log is saved
 */
export function info(
  message: string,
  context?: Record<string, any>,
  source: string = 'app'
): Promise<void> {
  return log(LogLevel.INFO, message, context, source);
}

/**
 * Logs a warning message
 * @param message Log message
 * @param context Additional context
 * @param source Source of the log
 * @returns Promise that resolves when the log is saved
 */
export function warn(
  message: string,
  context?: Record<string, any>,
  source: string = 'app'
): Promise<void> {
  return log(LogLevel.WARN, message, context, source);
}

/**
 * Logs an error message
 * @param message Log message
 * @param error Error object
 * @param context Additional context
 * @param source Source of the log
 * @returns Promise that resolves when the log is saved
 */
export function error(
  message: string,
  error: Error | unknown,
  context?: Record<string, any>,
  source: string = 'app'
): Promise<void> {
  const errorContext = {
    ...context,
    error: error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : error,
  };
  
  return log(LogLevel.ERROR, message, errorContext, source);
}
```

### 2. Database Schema

The logging system uses a `logs` table in the Supabase database:

```sql
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  context JSONB,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source TEXT NOT NULL
);

-- Create index on timestamp for faster queries
CREATE INDEX logs_timestamp_idx ON logs (timestamp);

-- Create index on level for faster filtering
CREATE INDEX logs_level_idx ON logs (level);

-- Create index on source for faster filtering
CREATE INDEX logs_source_idx ON logs (source);
```

### 3. Error Boundary

An error boundary component is used to catch and log client-side errors:

```tsx
// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { error } from '@/lib/logging';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error
    this.logError(error, errorInfo);
  }

  logError = async (error: Error, errorInfo: ErrorInfo): Promise<void> => {
    try {
      await error(
        'Uncaught error in component',
        error,
        {
          componentStack: errorInfo.componentStack,
        },
        'client'
      );
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
      console.error('Original error:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-800 mb-2">Something went wrong</h2>
          <p className="text-red-700">
            We're sorry, but an error occurred. Please try refreshing the page or contact support if the problem persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 4. Global Error Handler

A global error handler is implemented to catch and log unhandled exceptions and promise rejections:

```typescript
// lib/error-handler.ts
import { error } from './logging';

/**
 * Sets up global error handlers
 */
export function setupGlobalErrorHandlers(): void {
  if (typeof window !== 'undefined') {
    // Handle uncaught exceptions
    window.addEventListener('error', (event) => {
      error(
        'Uncaught exception',
        event.error || new Error(event.message),
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
        'client'
      );
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      error(
        'Unhandled promise rejection',
        event.reason,
        {
          promise: event.promise,
        },
        'client'
      );
    });
  }
}
```

### 5. API Error Handling

API routes include error handling and logging:

```typescript
// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { insertRecord } from '@/lib/database';
import { FormSubmission } from '@/types/database';
import { error, info } from '@/lib/logging';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.json();
    
    // Log the form submission attempt
    info(
      'Form submission attempt',
      {
        formType: formData.form_type,
        email: formData.email,
      },
      'api'
    );
    
    // Validate the form data
    if (!formData.form_type) {
      return NextResponse.json(
        { error: { message: 'Form type is required' } },
        { status: 400 }
      );
    }
    
    // ... more validation
    
    // Add IP address and user agent if not provided
    if (!formData.ip_address) {
      formData.ip_address = request.headers.get('x-forwarded-for') || request.ip || '';
    }
    
    if (!formData.user_agent) {
      formData.user_agent = request.headers.get('user-agent') || '';
    }
    
    // Insert the form submission into the database
    const data = await insertRecord<FormSubmission>('form_submissions', formData);
    
    if (!data) {
      throw new Error('Failed to insert form submission');
    }
    
    // Log the successful form submission
    info(
      'Form submission successful',
      {
        formType: formData.form_type,
        email: formData.email,
        id: data.id,
      },
      'api'
    );
    
    // Return success response
    return NextResponse.json(
      { data, success: true },
      { status: 201 }
    );
  } catch (err) {
    // Log the error
    error(
      'Error submitting form',
      err,
      {
        url: request.url,
        method: request.method,
      },
      'api'
    );
    
    // Return error response
    return NextResponse.json(
      { error: { message: 'Failed to submit form' } },
      { status: 500 }
    );
  }
}
```

### 6. User Interaction Logging

User interactions are logged to track user behavior:

```typescript
// lib/analytics.ts
import { info } from './logging';

/**
 * Logs a page view
 * @param url Page URL
 * @param referrer Referrer URL
 */
export function logPageView(url: string, referrer?: string): void {
  info(
    'Page view',
    {
      url,
      referrer,
      userAgent: navigator.userAgent,
    },
    'analytics'
  );
}

/**
 * Logs a user interaction
 * @param action Action performed
 * @param category Category of the action
 * @param label Label for the action
 * @param value Value associated with the action
 */
export function logInteraction(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  info(
    'User interaction',
    {
      action,
      category,
      label,
      value,
      url: window.location.href,
      userAgent: navigator.userAgent,
    },
    'analytics'
  );
}
```

## Using the Logging System

### 1. Logging Information

```typescript
import { info } from '@/lib/logging';

// Log an informational message
info(
  'User logged in',
  {
    userId: user.id,
    email: user.email,
  },
  'auth'
);
```

### 2. Logging Warnings

```typescript
import { warn } from '@/lib/logging';

// Log a warning
warn(
  'Rate limit approaching',
  {
    userId: user.id,
    requestCount: requestCount,
    limit: rateLimit,
  },
  'api'
);
```

### 3. Logging Errors

```typescript
import { error } from '@/lib/logging';

try {
  // Some operation that might fail
  await submitForm(formData);
} catch (err) {
  // Log the error
  error(
    'Error submitting form',
    err,
    {
      formData,
    },
    'form'
  );
  
  // Handle the error
  setError('Failed to submit form. Please try again.');
}
```

### 4. Using the Error Boundary

```tsx
// app/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { setupGlobalErrorHandlers } from '@/lib/error-handler';

// Set up global error handlers
if (typeof window !== 'undefined') {
  setupGlobalErrorHandlers();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

## Log Analysis

### 1. Querying Logs

Logs can be queried using the Supabase dashboard or API:

```typescript
// scripts/analyze-logs.ts
import supabase from '../lib/database';

async function analyzeLogs() {
  // Get error logs from the last 24 hours
  const { data: errorLogs, error: errorLogsError } = await supabase
    .from('logs')
    .select('*')
    .eq('level', 'error')
    .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .order('timestamp', { ascending: false });
  
  if (errorLogsError) {
    console.error('Error fetching error logs:', errorLogsError);
    return;
  }
  
  console.log(`Found ${errorLogs.length} error logs in the last 24 hours`);
  
  // Analyze error logs
  const errorsBySource = errorLogs.reduce((acc, log) => {
    acc[log.source] = (acc[log.source] || 0) + 1;
    return acc;
  }, {});
  
  console.log('Errors by source:', errorsBySource);
  
  // Get most common error messages
  const errorMessages = errorLogs.map(log => log.message);
  const errorMessageCounts = errorMessages.reduce((acc, message) => {
    acc[message] = (acc[message] || 0) + 1;
    return acc;
  }, {});
  
  const sortedErrorMessages = Object.entries(errorMessageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  console.log('Most common error messages:', sortedErrorMessages);
}

analyzeLogs();
```

### 2. Log Visualization

Logs can be visualized using tools like Grafana or custom dashboards:

```typescript
// pages/admin/logs.tsx
import { useEffect, useState } from 'react';
import supabase from '@/lib/database';
import { LogEntry, LogLevel } from '@/lib/logging';

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<{
    level?: LogLevel;
    source?: string;
    startDate?: string;
    endDate?: string;
  }>({});
  
  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      
      try {
        let query = supabase
          .from('logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100);
        
        if (filter.level) {
          query = query.eq('level', filter.level);
        }
        
        if (filter.source) {
          query = query.eq('source', filter.source);
        }
        
        if (filter.startDate) {
          query = query.gte('timestamp', filter.startDate);
        }
        
        if (filter.endDate) {
          query = query.lte('timestamp', filter.endDate);
        }
        
        const { data, error: fetchError } = await query;
        
        if (fetchError) {
          throw fetchError;
        }
        
        setLogs(data || []);
      } catch (err) {
        setError('Failed to fetch logs');
        console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLogs();
  }, [filter]);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Logs</h1>
      
      {/* Filter controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Level
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm"
            value={filter.level || ''}
            onChange={(e) => setFilter({ ...filter, level: e.target.value as LogLevel || undefined })}
          >
            <option value="">All Levels</option>
            <option value={LogLevel.DEBUG}>Debug</option>
            <option value={LogLevel.INFO}>Info</option>
            <option value={LogLevel.WARN}>Warning</option>
            <option value={LogLevel.ERROR}>Error</option>
          </select>
        </div>
        
        {/* More filter controls */}
      </div>
      
      {/* Logs table */}
      {loading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Context
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.level === LogLevel.ERROR
                          ? 'bg-red-100 text-red-800'
                          : log.level === LogLevel.WARN
                          ? 'bg-yellow-100 text-yellow-800'
                          : log.level === LogLevel.INFO
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.source}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.message}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(log.context, null, 2)}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

## Conclusion

The logging system in the Windows Doors Website React project provides comprehensive logging capabilities for debugging, monitoring, and analysis. It includes functions for logging different types of events, error boundaries for catching client-side errors, global error handlers for unhandled exceptions, and API error handling. The logs are stored in a Supabase database and can be queried and visualized for analysis.
