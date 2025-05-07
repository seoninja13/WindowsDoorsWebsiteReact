# Logging System Documentation

## Overview

This document provides a detailed description of the logging system implemented in the Windows Doors Website React project. The logging system is designed to capture and store information about application events, errors, and user interactions to facilitate debugging, monitoring, and analysis.

## Logging Architecture

The logging system follows a modular architecture with the following components:

1. **Logger**: The core logging functionality that provides methods for logging different types of messages.
2. **Transport**: Mechanisms for storing or transmitting log messages (e.g., console, file, database).
3. **Formatter**: Formats log messages for different transports.
4. **Filter**: Filters log messages based on various criteria (e.g., log level, source).

## Logger Implementation

The logger is implemented in the `lib/logging.ts` file and provides methods for logging messages at different levels:

```typescript
// lib/logging.ts
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log levels
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

// Log sources
export enum LogSource {
  SERVER = 'server',
  CLIENT = 'client',
  DATABASE = 'database',
  API = 'api',
  CRAWL4AI = 'crawl4ai',
  CONTEXT7 = 'context7',
}

// Log entry interface
export interface LogEntry {
  level: LogLevel;
  source: LogSource;
  message: string;
  details?: any;
  timestamp: string;
  user_id?: string;
  session_id?: string;
  request_id?: string;
  url?: string;
  user_agent?: string;
  ip_address?: string;
}

/**
 * Logs a message to the console and database
 * @param level Log level
 * @param source Log source
 * @param message Log message
 * @param details Additional details
 * @param options Additional options
 */
export async function log(
  level: LogLevel,
  source: LogSource,
  message: string,
  details?: any,
  options?: {
    user_id?: string;
    session_id?: string;
    request_id?: string;
    url?: string;
    user_agent?: string;
    ip_address?: string;
  }
): Promise<void> {
  // Create log entry
  const logEntry: LogEntry = {
    level,
    source,
    message,
    details,
    timestamp: new Date().toISOString(),
    ...options,
  };

  // Log to console
  logToConsole(logEntry);

  // Log to database
  await logToDatabase(logEntry);
}

/**
 * Logs a message at DEBUG level
 */
export function debug(
  source: LogSource,
  message: string,
  details?: any,
  options?: any
): Promise<void> {
  return log(LogLevel.DEBUG, source, message, details, options);
}

/**
 * Logs a message at INFO level
 */
export function info(
  source: LogSource,
  message: string,
  details?: any,
  options?: any
): Promise<void> {
  return log(LogLevel.INFO, source, message, details, options);
}

/**
 * Logs a message at WARN level
 */
export function warn(
  source: LogSource,
  message: string,
  details?: any,
  options?: any
): Promise<void> {
  return log(LogLevel.WARN, source, message, details, options);
}

/**
 * Logs a message at ERROR level
 */
export function error(
  source: LogSource,
  message: string,
  details?: any,
  options?: any
): Promise<void> {
  return log(LogLevel.ERROR, source, message, details, options);
}

/**
 * Logs a message to the console
 * @param logEntry Log entry
 */
function logToConsole(logEntry: LogEntry): void {
  const { level, source, message, details, timestamp } = logEntry;
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] [${source}] ${message}`;

  switch (level) {
    case LogLevel.DEBUG:
      console.debug(formattedMessage, details || '');
      break;
    case LogLevel.INFO:
      console.info(formattedMessage, details || '');
      break;
    case LogLevel.WARN:
      console.warn(formattedMessage, details || '');
      break;
    case LogLevel.ERROR:
      console.error(formattedMessage, details || '');
      break;
    default:
      console.log(formattedMessage, details || '');
  }
}

/**
 * Logs a message to the database
 * @param logEntry Log entry
 */
async function logToDatabase(logEntry: LogEntry): Promise<void> {
  try {
    // Insert log entry into the database
    const { error } = await supabase.from('logs').insert([logEntry]);

    if (error) {
      console.error('Error logging to database:', error);
    }
  } catch (error) {
    console.error('Error logging to database:', error);
  }
}
```

## Database Schema

The logging system uses a `logs` table in the Supabase database to store log entries:

```sql
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  level VARCHAR(10) NOT NULL,
  source VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  details JSONB,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id VARCHAR(255),
  session_id VARCHAR(255),
  request_id VARCHAR(255),
  url TEXT,
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX logs_level_idx ON logs (level);
CREATE INDEX logs_source_idx ON logs (source);
CREATE INDEX logs_timestamp_idx ON logs (timestamp);
CREATE INDEX logs_user_id_idx ON logs (user_id);
CREATE INDEX logs_session_id_idx ON logs (session_id);
CREATE INDEX logs_request_id_idx ON logs (request_id);
```

## Usage Examples

### Server-Side Logging

```typescript
// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { insertRecord } from '@/lib/database';
import { FormSubmission } from '@/types/database';
import { error, info, LogSource } from '@/lib/logging';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.json();
    
    // Log the form submission
    info(
      LogSource.API,
      'Form submission received',
      { formType: formData.form_type },
      {
        request_id: request.headers.get('x-request-id'),
        url: request.url,
        user_agent: request.headers.get('user-agent'),
        ip_address: request.headers.get('x-forwarded-for') || request.ip,
      }
    );
    
    // Validate the form data
    if (!formData.form_type) {
      error(
        LogSource.API,
        'Form submission validation failed',
        { error: 'Form type is required' },
        {
          request_id: request.headers.get('x-request-id'),
          url: request.url,
        }
      );
      
      return NextResponse.json(
        { error: { message: 'Form type is required' } },
        { status: 400 }
      );
    }
    
    // ... more validation
    
    // Insert the form submission into the database
    const data = await insertRecord<FormSubmission>('form_submissions', formData);
    
    if (!data) {
      throw new Error('Failed to insert form submission');
    }
    
    // Log the successful form submission
    info(
      LogSource.API,
      'Form submission successful',
      { formId: data.id, formType: data.form_type },
      {
        request_id: request.headers.get('x-request-id'),
        url: request.url,
      }
    );
    
    // Return success response
    return NextResponse.json(
      { data, success: true },
      { status: 201 }
    );
  } catch (error) {
    // Log the error
    error(
      LogSource.API,
      'Form submission failed',
      { error: error.message },
      {
        request_id: request.headers.get('x-request-id'),
        url: request.url,
      }
    );
    
    // Return error response
    return NextResponse.json(
      { error: { message: 'Failed to submit form' } },
      { status: 500 }
    );
  }
}
```

### Client-Side Logging

```typescript
// components/ui/FreeEstimateForm.tsx
'use client';

import { useState } from 'react';
import { Button } from './Button';
import { LogSource } from '@/lib/logging';

export function FreeEstimateForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Log the form submission attempt
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: 'info',
          source: LogSource.CLIENT,
          message: 'Free estimate form submission attempt',
          details: { formData },
          url: window.location.href,
          user_agent: navigator.userAgent,
        }),
      });
      
      // Submit the form
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_type: 'estimate',
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to submit form');
      }
      
      // Log the successful form submission
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: 'info',
          source: LogSource.CLIENT,
          message: 'Free estimate form submission successful',
          details: { formId: result.data.id },
          url: window.location.href,
          user_agent: navigator.userAgent,
        }),
      });
      
      // Reset the form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Show success message
      alert('Thank you for your submission! We will contact you shortly.');
    } catch (error) {
      // Log the error
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: 'error',
          source: LogSource.CLIENT,
          message: 'Free estimate form submission failed',
          details: { error: error.message },
          url: window.location.href,
          user_agent: navigator.userAgent,
        }),
      });
      
      // Show error message
      alert('Failed to submit form. Please try again later.');
    }
  };
  
  // ... form JSX
}
```

## Conclusion

The logging system in the Windows Doors Website React project provides comprehensive logging capabilities for both server-side and client-side code. It captures detailed information about application events, errors, and user interactions, which can be used for debugging, monitoring, and analysis.
