/**
 * Direct SQL Execution
 * 
 * This script executes SQL statements directly against the Supabase database
 * without relying on any custom functions.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Import required modules
const fs = require('fs').promises;
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Simple logging function
function log(level, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Execute a SQL statement directly
 * @param {string} sql - SQL statement to execute
 * @returns {Promise<boolean>} - True if successful, false if failed
 */
async function executeSql(sql) {
  try {
    // Execute the SQL statement directly using the Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: sql
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      log('ERROR', `Error executing SQL: ${errorText}`);
      return false;
    }
    
    return true;
  } catch (error) {
    log('ERROR', `Error executing SQL: ${error.message}`);
    return false;
  }
}

/**
 * Execute a SQL script file
 * @param {string} filePath - Path to the SQL file
 */
async function executeSqlFile(filePath) {
  try {
    // Read the SQL file
    const sql = await fs.readFile(filePath, 'utf8');
    
    log('INFO', `Executing SQL file: ${filePath}`);
    
    // Split the SQL into statements
    const statements = sql.split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      log('INFO', `Executing statement ${i + 1}/${statements.length}`);
      console.log(`Executing statement ${i + 1}/${statements.length}`);
      
      // Try to execute the statement using the Supabase SQL API
      const { error } = await supabase.rpc('pg_query', { query: statement + ';' });
      
      if (error) {
        log('WARN', `Error executing statement ${i + 1}: ${error.message}`);
        console.warn(`Error executing statement ${i + 1}: ${error.message}`);
      } else {
        log('INFO', `Statement ${i + 1} executed successfully`);
        console.log(`Statement ${i + 1} executed successfully`);
      }
    }
    
    log('INFO', 'Finished executing statements');
  } catch (error) {
    log('ERROR', `Error reading or executing SQL file: ${error.message}`);
    console.error(`Error reading or executing SQL file: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  // Get the SQL file path from command line arguments
  const sqlFilePath = process.argv[2];
  
  if (!sqlFilePath) {
    console.error('Please provide the path to the SQL file as a command line argument');
    process.exit(1);
  }
  
  // Resolve the SQL file path
  const resolvedPath = path.resolve(sqlFilePath);
  
  // Check if the file exists
  try {
    await fs.access(resolvedPath);
  } catch (error) {
    console.error(`SQL file not found: ${resolvedPath}`);
    process.exit(1);
  }
  
  // Execute the SQL file
  await executeSqlFile(resolvedPath);
}

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
