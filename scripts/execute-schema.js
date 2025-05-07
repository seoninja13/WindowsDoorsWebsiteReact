/**
 * Execute Database Schema Script for Windows Doors Website React
 * 
 * This script executes the database schema SQL script in Supabase.
 * It reads the SQL file and executes it using the Supabase client.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Path to SQL schema file
const SCHEMA_PATH = path.join(__dirname, '../sql/database-schema.sql');

// Helper function to log progress
function logProgress(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Main function to execute the schema
async function executeSchema() {
  logProgress('Starting schema execution...');
  
  try {
    // Read SQL file
    const sql = fs.readFileSync(SCHEMA_PATH, 'utf8');
    
    // Split SQL into individual statements
    const statements = sql
      .replace(/--.*$/gm, '') // Remove comments
      .split(';')
      .filter(statement => statement.trim() !== '');
    
    logProgress(`Found ${statements.length} SQL statements to execute.`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      
      logProgress(`Executing statement ${i + 1}/${statements.length}...`);
      
      const { error } = await supabase.rpc('execute_sql', {
        sql: statement + ';'
      });
      
      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
        console.error('Statement:', statement);
      } else {
        logProgress(`Successfully executed statement ${i + 1}.`);
      }
    }
    
    logProgress('Schema execution completed successfully!');
  } catch (error) {
    console.error('Error executing schema:', error);
  }
}

// Call the main function
executeSchema()
  .then(() => {
    console.log('Script completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
