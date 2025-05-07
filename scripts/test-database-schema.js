/**
 * Test Database Schema Script for Windows Doors Website React
 * 
 * This script tests the database schema by performing basic CRUD operations
 * on each table to verify that the schema is set up correctly.
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to log progress
function logProgress(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Helper function to test a table
async function testTable(tableName, sampleRecord) {
  logProgress(`Testing table: ${tableName}`);
  
  try {
    // Insert a test record
    logProgress(`Inserting test record into ${tableName}...`);
    const { data: insertData, error: insertError } = await supabase
      .from(tableName)
      .insert(sampleRecord)
      .select();
    
    if (insertError) {
      console.error(`Error inserting into ${tableName}:`, insertError);
      return false;
    }
    
    const insertedId = insertData[0].id;
    logProgress(`Successfully inserted record with ID ${insertedId}.`);
    
    // Fetch the record
    logProgress(`Fetching record from ${tableName}...`);
    const { data: fetchData, error: fetchError } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', insertedId)
      .single();
    
    if (fetchError) {
      console.error(`Error fetching from ${tableName}:`, fetchError);
      return false;
    }
    
    logProgress(`Successfully fetched record with ID ${insertedId}.`);
    
    // Update the record
    logProgress(`Updating record in ${tableName}...`);
    const updateRecord = { ...sampleRecord, updated_at: new Date().toISOString() };
    const { data: updateData, error: updateError } = await supabase
      .from(tableName)
      .update(updateRecord)
      .eq('id', insertedId)
      .select();
    
    if (updateError) {
      console.error(`Error updating ${tableName}:`, updateError);
      return false;
    }
    
    logProgress(`Successfully updated record with ID ${insertedId}.`);
    
    // Delete the record
    logProgress(`Deleting record from ${tableName}...`);
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .eq('id', insertedId);
    
    if (deleteError) {
      console.error(`Error deleting from ${tableName}:`, deleteError);
      return false;
    }
    
    logProgress(`Successfully deleted record with ID ${insertedId}.`);
    
    return true;
  } catch (error) {
    console.error(`Error testing table ${tableName}:`, error);
    return false;
  }
}

// Main function to test the database schema
async function testDatabaseSchema() {
  logProgress('Starting database schema test...');
  
  // Test product_categories table
  const productCategoryResult = await testTable('product_categories', {
    name: 'Test Category',
    slug: 'test-category-' + Date.now(),
    description: 'This is a test category.',
    display_order: 999,
    is_active: true
  });
  
  // Test pages table
  const pagesResult = await testTable('pages', {
    url: 'https://example.com/test-page-' + Date.now(),
    path: 'test-page-' + Date.now(),
    title: 'Test Page',
    description: 'This is a test page.',
    content: 'Test content for the page.',
    is_active: true
  });
  
  // Test blog_posts table
  const blogPostsResult = await testTable('blog_posts', {
    title: 'Test Blog Post',
    slug: 'test-blog-post-' + Date.now(),
    content: 'This is a test blog post content.',
    is_published: true,
    published_date: new Date().toISOString()
  });
  
  // Test service_areas table
  const serviceAreasResult = await testTable('service_areas', {
    name: 'Test Service Area',
    slug: 'test-service-area-' + Date.now(),
    description: 'This is a test service area.',
    is_active: true
  });
  
  // Test contact_information table
  const contactInformationResult = await testTable('contact_information', {
    location_name: 'Test Location',
    address_line1: '123 Test St',
    city: 'Test City',
    state: 'TS',
    zip_code: '12345',
    phone: '555-555-5555',
    email: 'test@example.com',
    is_primary: false
  });
  
  // Log results
  logProgress('Test results:');
  logProgress(`product_categories: ${productCategoryResult ? 'PASS' : 'FAIL'}`);
  logProgress(`pages: ${pagesResult ? 'PASS' : 'FAIL'}`);
  logProgress(`blog_posts: ${blogPostsResult ? 'PASS' : 'FAIL'}`);
  logProgress(`service_areas: ${serviceAreasResult ? 'PASS' : 'FAIL'}`);
  logProgress(`contact_information: ${contactInformationResult ? 'PASS' : 'FAIL'}`);
  
  // Overall result
  const overallResult = productCategoryResult && pagesResult && blogPostsResult && 
                        serviceAreasResult && contactInformationResult;
  
  if (overallResult) {
    logProgress('All tests passed! The database schema is set up correctly.');
  } else {
    logProgress('Some tests failed. Please check the errors above.');
  }
  
  return overallResult;
}

// Call the main function
testDatabaseSchema()
  .then(result => {
    console.log('Script completed with result:', result ? 'SUCCESS' : 'FAILURE');
    process.exit(result ? 0 : 1);
  })
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
