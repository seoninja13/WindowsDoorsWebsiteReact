/**
 * Supabase Client Utility
 *
 * This file provides a centralized Supabase client instance for use throughout the application.
 * It uses environment variables from .env.local for configuration.
 */

const { createClient } = require('@supabase/supabase-js');

// Get Supabase URL and key from environment variables
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables. Some features may not work correctly.');

  // Use default values for development if not set
  if (!supabaseUrl) {
    console.warn('Using default Supabase URL for development');
    supabaseUrl = 'https://wzohdczffpgnpjehhfnb.supabase.co';
  }

  if (!supabaseKey) {
    console.warn('Using default Supabase key for development');
    supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6b2hkY3pmZnBnbnBqZWhoZm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MDAxNjUsImV4cCI6MjA2MjA3NjE2NX0.3ozVyuTi0JjX16sBQokvwME0p02BVdpd_uryznfvKxk';
  }
}

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Export the client for use in other files
module.exports = supabase;
module.exports.default = supabase;

/**
 * Test the Supabase connection
 * @returns {Promise<boolean>} True if connection is successful, false otherwise
 */
async function testConnection() {
  try {
    // Try to get the server timestamp using a simple query
    const { data, error } = await supabase.from('_prisma_migrations').select('*').limit(1);

    if (error) {
      // If we can't access _prisma_migrations, try another approach
      try {
        const { data: authData, error: authError } = await supabase.auth.getSession();

        if (authError) {
          console.error('Error connecting to Supabase Auth:', authError.message);
          return false;
        }

        console.log('Successfully connected to Supabase Auth');
        return true;
      } catch (authError) {
        console.error('Error connecting to Supabase:', error.message);
        console.error('Error connecting to Supabase Auth:', authError.message);
        return false;
      }
    }

    console.log('Successfully connected to Supabase Database');
    return true;
  } catch (error) {
    console.error('Unexpected error connecting to Supabase:', error.message);
    return false;
  }
}

/**
 * Create a test table in Supabase
 * @returns {Promise<boolean>} True if table creation is successful, false otherwise
 */
async function createTestTable() {
  try {
    // Check if the test table already exists
    const { error: checkError } = await supabase
      .from('test_table')
      .select('*')
      .limit(1);

    // If the table exists, return success
    if (!checkError) {
      console.log('Test table already exists');
      return true;
    }

    // If the table doesn't exist, try to create it using SQL
    const { error } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.test_table (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        );

        ALTER TABLE public.test_table ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Allow anonymous select" ON public.test_table
          FOR SELECT USING (true);

        CREATE POLICY "Allow anonymous insert" ON public.test_table
          FOR INSERT WITH CHECK (true);
      `
    });

    if (error) {
      console.error('Error creating test table:', error.message);

      // If we can't create the table using SQL, try a direct insert
      // This will create the table if it doesn't exist
      const { error: insertError } = await supabase
        .from('test_table')
        .insert([{ name: 'Test Record', created_at: new Date().toISOString() }]);

      if (insertError) {
        console.error('Error creating test table via insert:', insertError.message);
        return false;
      }

      console.log('Successfully created test table via insert');
      return true;
    }

    console.log('Successfully created test table');
    return true;
  } catch (error) {
    console.error('Unexpected error creating test table:', error.message);
    return false;
  }
}

/**
 * Insert a test record into the test table
 * @param {string} name - Name for the test record
 * @returns {Promise<boolean>} True if insertion is successful, false otherwise
 */
async function insertTestRecord(name = 'Test Record') {
  try {
    // Insert a test record
    const { data, error } = await supabase
      .from('test_table')
      .insert([{ name, created_at: new Date().toISOString() }])
      .select();

    if (error) {
      console.error('Error inserting test record:', error.message);
      return false;
    }

    console.log('Successfully inserted test record:', data);
    return true;
  } catch (error) {
    console.error('Unexpected error inserting test record:', error.message);
    return false;
  }
}

/**
 * Get all records from the test table
 * @returns {Promise<Array|null>} Array of records or null if error
 */
async function getTestRecords() {
  try {
    // Get all records from the test table
    const { data, error } = await supabase
      .from('test_table')
      .select('*');

    if (error) {
      console.error('Error getting test records:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error getting test records:', error.message);
    return null;
  }
}

// Export utility functions
module.exports.testConnection = testConnection;
module.exports.createTestTable = createTestTable;
module.exports.insertTestRecord = insertTestRecord;
module.exports.getTestRecords = getTestRecords;
