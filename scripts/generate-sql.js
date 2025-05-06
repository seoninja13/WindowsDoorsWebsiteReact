/**
 * Generate SQL Script
 * 
 * This script reads a SQL file and generates a SQL script that can be run
 * in the Supabase SQL editor.
 */

// Import required modules
const fs = require('fs').promises;
const path = require('path');

/**
 * Generate a SQL script
 * @param {string} filePath - Path to the SQL file
 */
async function generateSqlScript(filePath) {
  try {
    // Read the SQL file
    const sql = await fs.readFile(filePath, 'utf8');
    
    console.log(`-- Generated SQL script from ${filePath}`);
    console.log(`-- Generated at ${new Date().toISOString()}`);
    console.log('');
    console.log(sql);
    
    // Save the generated script
    const outputPath = path.join(
      path.dirname(filePath),
      `${path.basename(filePath, path.extname(filePath))}-generated${path.extname(filePath)}`
    );
    
    await fs.writeFile(outputPath, sql);
    
    console.log(`\nGenerated SQL script saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error generating SQL script: ${error.message}`);
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
  
  // Generate the SQL script
  await generateSqlScript(resolvedPath);
}

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
