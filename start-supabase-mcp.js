/**
 * Start Supabase MCP Server
 * 
 * This script starts the Supabase MCP server for the Windows Doors Website React project.
 * It reads the configuration from supabase-mcp-config.json and spawns the server process.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the Supabase MCP configuration
const configPath = path.join(__dirname, 'supabase-mcp-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Extract the command and arguments from the configuration
const { command, args } = config.mcpServers['supabase-mcp-server'];

// Start the Supabase MCP server
console.log('Starting Supabase MCP server...');
const supabaseMcp = spawn(command, args, {
  stdio: 'inherit',
  shell: true,
});

// Handle errors
supabaseMcp.on('error', (error) => {
  console.error('Failed to start Supabase MCP server:', error);
});

// Handle process exit
supabaseMcp.on('close', (code) => {
  console.log(`Supabase MCP server exited with code ${code}`);
});
