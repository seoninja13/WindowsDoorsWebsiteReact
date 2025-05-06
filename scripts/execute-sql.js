/**
 * Execute SQL Script
 *
 * This script executes a SQL script file directly against the Supabase database.
 * It reads the SQL file, connects to Supabase, and executes the SQL statements.
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
 * Execute a SQL script file
 * @param {string} filePath - Path to the SQL file
 */
async function executeSqlFile(filePath) {
  try {
    // Read the SQL file
    const sql = await fs.readFile(filePath, 'utf8');

    log('INFO', `Executing SQL file: ${filePath}`);

    // Execute the SQL statements directly using the REST API
    const { data, error } = await supabase.from('_rpc').select('*').execute('execute_sql', { sql });

    if (error) {
      log('ERROR', `Error executing SQL file: ${error.message}`);
      console.error(`Error executing SQL file: ${error.message}`);

      // Try an alternative approach - split the SQL into statements
      log('INFO', 'Trying alternative approach - splitting SQL into statements');
      console.log('Trying alternative approach - splitting SQL into statements');

      // Split the SQL into statements (simple approach, may not work for all SQL)
      const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

      // Execute each statement separately
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i].trim();

        if (statement.length === 0) {
          continue;
        }

        log('INFO', `Executing statement ${i + 1}/${statements.length}`);
        console.log(`Executing statement ${i + 1}/${statements.length}`);

        try {
          // Try to execute the statement directly using the Supabase REST API
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`
            },
            body: JSON.stringify({ sql: statement + ';' })
          });

          if (!response.ok) {
            const errorData = await response.json();
            log('WARN', `Error executing statement ${i + 1}: ${JSON.stringify(errorData)}`);
            console.warn(`Error executing statement ${i + 1}: ${JSON.stringify(errorData)}`);
          } else {
            log('INFO', `Statement ${i + 1} executed successfully`);
            console.log(`Statement ${i + 1} executed successfully`);
          }
        } catch (execError) {
          log('WARN', `Error executing statement ${i + 1}: ${execError.message}`);
          console.warn(`Error executing statement ${i + 1}: ${execError.message}`);
        }
      }

      log('INFO', 'Finished executing statements');
      console.log('Finished executing statements');
    } else {
      log('INFO', 'SQL file executed successfully');
      console.log('SQL file executed successfully');
    }
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
