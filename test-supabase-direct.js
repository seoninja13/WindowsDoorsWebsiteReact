/**
 * Direct Supabase Connection Test
 * 
 * This script tests connecting directly to Supabase without using the MCP server.
 * It uses the Supabase JavaScript client to connect to Supabase and perform basic operations.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or key not found in environment variables');
  process.exit(1);
}

console.log('Supabase Direct Connection Test');
console.log('===============================');
console.log(`Supabase URL: ${supabaseUrl}`);
console.log(`Supabase Key: ${supabaseKey.substring(0, 10)}...`);

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test connection by getting the server timestamp
    console.log('\nTesting connection to Supabase...');
    
    // Try to get the server time using a simple query
    const { data, error } = await supabase
      .from('test_table')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error(`❌ Error connecting to Supabase: ${error.message}`);
      
      // Try to create the test table if it doesn't exist
      console.log('\nAttempting to create test_table...');
      const { error: createError } = await supabase
        .rpc('create_test_table');
      
      if (createError) {
        console.error(`❌ Error creating test table: ${createError.message}`);
        
        // Try a different approach - check if we can at least get the user
        console.log('\nTrying to get user session...');
        const { data: user, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error(`❌ Error getting user: ${userError.message}`);
          return false;
        } else {
          console.log('✅ Successfully connected to Supabase Auth');
          console.log(`User: ${JSON.stringify(user)}`);
          return true;
        }
      } else {
        console.log('✅ Successfully created test_table');
        return true;
      }
    } else {
      console.log('✅ Successfully connected to Supabase');
      console.log(`Data: ${JSON.stringify(data)}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Unexpected error: ${error.message}`);
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    console.log('\n===============================');
    console.log(`Test ${success ? 'passed ✅' : 'failed ❌'}`);
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error(`❌ Fatal error: ${error.message}`);
    process.exit(1);
  });
