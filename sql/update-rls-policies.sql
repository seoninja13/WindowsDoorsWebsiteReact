-- Update RLS policies for logging tables
-- This script updates the RLS policies to allow anonymous access for inserting logs

-- Drop existing policies
DROP POLICY IF EXISTS insert_logs ON system_logs;
DROP POLICY IF EXISTS insert_logs ON crawl4ai_logs;
DROP POLICY IF EXISTS insert_logs ON error_logs;
DROP POLICY IF EXISTS insert_logs ON performance_logs;
DROP POLICY IF EXISTS insert_logs ON user_activity_logs;
DROP POLICY IF EXISTS insert_logs ON api_request_logs;

DROP POLICY IF EXISTS admin_select_logs ON system_logs;
DROP POLICY IF EXISTS admin_select_logs ON crawl4ai_logs;
DROP POLICY IF EXISTS admin_select_logs ON error_logs;
DROP POLICY IF EXISTS admin_select_logs ON performance_logs;
DROP POLICY IF EXISTS admin_select_logs ON user_activity_logs;
DROP POLICY IF EXISTS admin_select_logs ON api_request_logs;

-- Create policy for anonymous users to insert logs
CREATE POLICY insert_logs ON system_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY insert_logs ON crawl4ai_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY insert_logs ON error_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY insert_logs ON performance_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY insert_logs ON user_activity_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY insert_logs ON api_request_logs FOR INSERT TO anon WITH CHECK (true);

-- Create policy for anonymous users to select logs
CREATE POLICY select_logs ON system_logs FOR SELECT TO anon USING (true);
CREATE POLICY select_logs ON crawl4ai_logs FOR SELECT TO anon USING (true);
CREATE POLICY select_logs ON error_logs FOR SELECT TO anon USING (true);
CREATE POLICY select_logs ON performance_logs FOR SELECT TO anon USING (true);
CREATE POLICY select_logs ON user_activity_logs FOR SELECT TO anon USING (true);
CREATE POLICY select_logs ON api_request_logs FOR SELECT TO anon USING (true);

-- Create policy for authenticated users to insert logs
CREATE POLICY insert_logs_auth ON system_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs_auth ON crawl4ai_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs_auth ON error_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs_auth ON performance_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs_auth ON user_activity_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY insert_logs_auth ON api_request_logs FOR INSERT TO authenticated WITH CHECK (true);

-- Create policy for authenticated users to select logs
CREATE POLICY select_logs_auth ON system_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY select_logs_auth ON crawl4ai_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY select_logs_auth ON error_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY select_logs_auth ON performance_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY select_logs_auth ON user_activity_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY select_logs_auth ON api_request_logs FOR SELECT TO authenticated USING (true);
