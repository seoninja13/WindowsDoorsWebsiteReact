-- SQL Script for Creating Logging Tables in Supabase
-- This script creates tables for comprehensive logging of all system activities
-- including Crawl4AI operations, user actions, errors, and performance metrics.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schema for logging
CREATE SCHEMA IF NOT EXISTS logging;

-- System Log Table
-- General purpose logging table for all system activities
CREATE TABLE IF NOT EXISTS logging.system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    level VARCHAR(10) NOT NULL, -- 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'
    source VARCHAR(100) NOT NULL, -- Component/module that generated the log
    message TEXT NOT NULL,
    details JSONB, -- Additional structured data
    user_id UUID, -- Optional reference to user who triggered the action
    session_id VARCHAR(100), -- Optional session identifier
    request_id VARCHAR(100), -- Optional request identifier for tracing
    ip_address VARCHAR(45), -- IPv4 or IPv6 address
    user_agent TEXT, -- Browser/client information
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_system_logs_timestamp ON logging.system_logs (timestamp);
-- Create index on level for filtering by log level
CREATE INDEX IF NOT EXISTS idx_system_logs_level ON logging.system_logs (level);
-- Create index on source for filtering by component
CREATE INDEX IF NOT EXISTS idx_system_logs_source ON logging.system_logs (source);

-- Crawl4AI Logs Table
-- Specific logging table for Crawl4AI operations
CREATE TABLE IF NOT EXISTS logging.crawl4ai_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    operation VARCHAR(50) NOT NULL, -- 'CRAWL_START', 'CRAWL_PAGE', 'EXTRACT_CONTENT', 'SCREENSHOT', etc.
    url TEXT, -- URL being crawled
    status VARCHAR(20) NOT NULL, -- 'SUCCESS', 'FAILURE', 'WARNING', 'IN_PROGRESS'
    duration_ms INTEGER, -- Operation duration in milliseconds
    page_title TEXT, -- Title of the page being crawled
    content_extracted BOOLEAN, -- Whether content was successfully extracted
    screenshot_captured BOOLEAN, -- Whether screenshot was successfully captured
    components_identified INTEGER, -- Number of UI components identified
    links_extracted INTEGER, -- Number of links extracted
    images_extracted INTEGER, -- Number of images extracted
    error_message TEXT, -- Error message if operation failed
    details JSONB, -- Additional structured data
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_crawl4ai_logs_timestamp ON logging.crawl4ai_logs (timestamp);
-- Create index on operation for filtering by operation type
CREATE INDEX IF NOT EXISTS idx_crawl4ai_logs_operation ON logging.crawl4ai_logs (operation);
-- Create index on status for filtering by status
CREATE INDEX IF NOT EXISTS idx_crawl4ai_logs_status ON logging.crawl4ai_logs (status);
-- Create index on URL for filtering by URL
CREATE INDEX IF NOT EXISTS idx_crawl4ai_logs_url ON logging.crawl4ai_logs (url);

-- Error Logs Table
-- Detailed logging for errors and exceptions
CREATE TABLE IF NOT EXISTS logging.error_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    error_type VARCHAR(100) NOT NULL, -- Type of error
    error_message TEXT NOT NULL, -- Error message
    stack_trace TEXT, -- Stack trace if available
    component VARCHAR(100) NOT NULL, -- Component where error occurred
    severity VARCHAR(20) NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    user_id UUID, -- User who encountered the error
    session_id VARCHAR(100), -- Session identifier
    request_id VARCHAR(100), -- Request identifier
    url TEXT, -- URL where error occurred
    request_data JSONB, -- Request data that caused the error
    environment_info JSONB, -- Environment information (browser, OS, etc.)
    resolved BOOLEAN DEFAULT FALSE, -- Whether the error has been resolved
    resolution_notes TEXT, -- Notes on how the error was resolved
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ -- When the error was resolved
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_error_logs_timestamp ON logging.error_logs (timestamp);
-- Create index on error_type for filtering by error type
CREATE INDEX IF NOT EXISTS idx_error_logs_error_type ON logging.error_logs (error_type);
-- Create index on severity for filtering by severity
CREATE INDEX IF NOT EXISTS idx_error_logs_severity ON logging.error_logs (severity);
-- Create index on resolved for filtering by resolution status
CREATE INDEX IF NOT EXISTS idx_error_logs_resolved ON logging.error_logs (resolved);

-- Performance Logs Table
-- Logging for performance metrics
CREATE TABLE IF NOT EXISTS logging.performance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    component VARCHAR(100) NOT NULL, -- Component being measured
    operation VARCHAR(100) NOT NULL, -- Operation being performed
    duration_ms INTEGER NOT NULL, -- Duration in milliseconds
    memory_usage_kb INTEGER, -- Memory usage in kilobytes
    cpu_usage_percent NUMERIC(5,2), -- CPU usage percentage
    request_count INTEGER, -- Number of requests
    error_count INTEGER, -- Number of errors
    user_count INTEGER, -- Number of users
    details JSONB, -- Additional metrics
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_performance_logs_timestamp ON logging.performance_logs (timestamp);
-- Create index on component for filtering by component
CREATE INDEX IF NOT EXISTS idx_performance_logs_component ON logging.performance_logs (component);
-- Create index on operation for filtering by operation
CREATE INDEX IF NOT EXISTS idx_performance_logs_operation ON logging.performance_logs (operation);

-- User Activity Logs Table
-- Logging for user actions
CREATE TABLE IF NOT EXISTS logging.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID, -- User who performed the action
    action VARCHAR(100) NOT NULL, -- Action performed
    resource_type VARCHAR(100), -- Type of resource acted upon
    resource_id VARCHAR(100), -- ID of resource acted upon
    previous_state JSONB, -- State before action
    new_state JSONB, -- State after action
    ip_address VARCHAR(45), -- IP address
    user_agent TEXT, -- Browser/client information
    session_id VARCHAR(100), -- Session identifier
    success BOOLEAN NOT NULL, -- Whether the action was successful
    failure_reason TEXT, -- Reason for failure if unsuccessful
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_timestamp ON logging.user_activity_logs (timestamp);
-- Create index on user_id for filtering by user
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_user_id ON logging.user_activity_logs (user_id);
-- Create index on action for filtering by action
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_action ON logging.user_activity_logs (action);
-- Create index on resource_type for filtering by resource type
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_resource_type ON logging.user_activity_logs (resource_type);

-- API Request Logs Table
-- Logging for API requests
CREATE TABLE IF NOT EXISTS logging.api_request_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    method VARCHAR(10) NOT NULL, -- HTTP method
    endpoint TEXT NOT NULL, -- API endpoint
    status_code INTEGER NOT NULL, -- HTTP status code
    duration_ms INTEGER NOT NULL, -- Request duration in milliseconds
    request_size_bytes INTEGER, -- Size of request in bytes
    response_size_bytes INTEGER, -- Size of response in bytes
    user_id UUID, -- User who made the request
    client_id VARCHAR(100), -- Client application ID
    ip_address VARCHAR(45), -- IP address
    user_agent TEXT, -- Browser/client information
    request_headers JSONB, -- Request headers
    request_params JSONB, -- Request parameters
    request_body JSONB, -- Request body
    response_body JSONB, -- Response body
    error_message TEXT, -- Error message if request failed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_api_request_logs_timestamp ON logging.api_request_logs (timestamp);
-- Create index on endpoint for filtering by endpoint
CREATE INDEX IF NOT EXISTS idx_api_request_logs_endpoint ON logging.api_request_logs (endpoint);
-- Create index on status_code for filtering by status code
CREATE INDEX IF NOT EXISTS idx_api_request_logs_status_code ON logging.api_request_logs (status_code);
-- Create index on method for filtering by HTTP method
CREATE INDEX IF NOT EXISTS idx_api_request_logs_method ON logging.api_request_logs (method);

-- Create a view for recent system logs
CREATE OR REPLACE VIEW logging.recent_system_logs AS
SELECT * FROM logging.system_logs
ORDER BY timestamp DESC
LIMIT 1000;

-- Create a view for recent error logs
CREATE OR REPLACE VIEW logging.recent_error_logs AS
SELECT * FROM logging.error_logs
ORDER BY timestamp DESC
LIMIT 1000;

-- Create a view for recent Crawl4AI logs
CREATE OR REPLACE VIEW logging.recent_crawl4ai_logs AS
SELECT * FROM logging.crawl4ai_logs
ORDER BY timestamp DESC
LIMIT 1000;

-- Create a function to log system events
CREATE OR REPLACE FUNCTION logging.log_system_event(
    p_level VARCHAR,
    p_source VARCHAR,
    p_message TEXT,
    p_details JSONB DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_session_id VARCHAR DEFAULT NULL,
    p_request_id VARCHAR DEFAULT NULL,
    p_ip_address VARCHAR DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO logging.system_logs (
        level, source, message, details, user_id, session_id, request_id, ip_address, user_agent
    ) VALUES (
        p_level, p_source, p_message, p_details, p_user_id, p_session_id, p_request_id, p_ip_address, p_user_agent
    ) RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to log Crawl4AI operations
CREATE OR REPLACE FUNCTION logging.log_crawl4ai_operation(
    p_operation VARCHAR,
    p_url TEXT,
    p_status VARCHAR,
    p_duration_ms INTEGER DEFAULT NULL,
    p_page_title TEXT DEFAULT NULL,
    p_content_extracted BOOLEAN DEFAULT NULL,
    p_screenshot_captured BOOLEAN DEFAULT NULL,
    p_components_identified INTEGER DEFAULT NULL,
    p_links_extracted INTEGER DEFAULT NULL,
    p_images_extracted INTEGER DEFAULT NULL,
    p_error_message TEXT DEFAULT NULL,
    p_details JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO logging.crawl4ai_logs (
        operation, url, status, duration_ms, page_title, content_extracted, screenshot_captured,
        components_identified, links_extracted, images_extracted, error_message, details
    ) VALUES (
        p_operation, p_url, p_status, p_duration_ms, p_page_title, p_content_extracted, p_screenshot_captured,
        p_components_identified, p_links_extracted, p_images_extracted, p_error_message, p_details
    ) RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to log errors
CREATE OR REPLACE FUNCTION logging.log_error(
    p_error_type VARCHAR,
    p_error_message TEXT,
    p_component VARCHAR,
    p_severity VARCHAR,
    p_stack_trace TEXT DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_session_id VARCHAR DEFAULT NULL,
    p_request_id VARCHAR DEFAULT NULL,
    p_url TEXT DEFAULT NULL,
    p_request_data JSONB DEFAULT NULL,
    p_environment_info JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO logging.error_logs (
        error_type, error_message, stack_trace, component, severity, user_id, session_id,
        request_id, url, request_data, environment_info
    ) VALUES (
        p_error_type, p_error_message, p_stack_trace, p_component, p_severity, p_user_id, p_session_id,
        p_request_id, p_url, p_request_data, p_environment_info
    ) RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for the logging tables
ALTER TABLE logging.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE logging.crawl4ai_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE logging.error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE logging.performance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE logging.user_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE logging.api_request_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to insert logs
CREATE POLICY insert_logs ON logging.system_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs ON logging.crawl4ai_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs ON logging.error_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs ON logging.performance_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs ON logging.user_activity_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs ON logging.api_request_logs FOR INSERT TO authenticated WITH CHECK (true);

-- Create policy for admins to view all logs
CREATE POLICY admin_select_logs ON logging.system_logs FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_select_logs ON logging.crawl4ai_logs FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_select_logs ON logging.error_logs FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_select_logs ON logging.performance_logs FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_select_logs ON logging.user_activity_logs FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_select_logs ON logging.api_request_logs FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
