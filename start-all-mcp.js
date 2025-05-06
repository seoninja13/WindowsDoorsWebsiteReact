/**
 * Start All MCP Servers
 * 
 * This script starts all MCP servers for the Windows Doors Website React project.
 * It reads the configurations from context7-config.json and supabase-mcp-config.json
 * and spawns the server processes.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the Context7 configuration
const context7ConfigPath = path.join(__dirname, 'context7-config.json');
const context7Config = JSON.parse(fs.readFileSync(context7ConfigPath, 'utf8'));

// Read the Supabase MCP configuration
const supabaseConfigPath = path.join(__dirname, 'supabase-mcp-config.json');
const supabaseConfig = JSON.parse(fs.readFileSync(supabaseConfigPath, 'utf8'));

// Start the Context7 MCP server
console.log('Starting Context7 MCP server...');
const context7 = spawn('npx', ['-y', '@upstash/context7-mcp@latest'], {
  stdio: 'inherit',
  shell: true,
});

// Handle errors for Context7 MCP server
context7.on('error', (error) => {
  console.error('Failed to start Context7 MCP server:', error);
});

// Handle process exit for Context7 MCP server
context7.on('close', (code) => {
  console.log(`Context7 MCP server exited with code ${code}`);
});

// Extract the command and arguments from the Supabase MCP configuration
const { command, args } = supabaseConfig.mcpServers['supabase-mcp-server'];

// Start the Supabase MCP server
console.log('Starting Supabase MCP server...');
const supabaseMcp = spawn(command, args, {
  stdio: 'inherit',
  shell: true,
});

// Handle errors for Supabase MCP server
supabaseMcp.on('error', (error) => {
  console.error('Failed to start Supabase MCP server:', error);
});

// Handle process exit for Supabase MCP server
supabaseMcp.on('close', (code) => {
  console.log(`Supabase MCP server exited with code ${code}`);
});

console.log('All MCP servers started. Press Ctrl+C to stop all servers.');
