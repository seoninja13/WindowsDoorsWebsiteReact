const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the Context7 configuration
const configPath = path.join(__dirname, 'context7-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Start the Context7 MCP server
const context7 = spawn('npx', ['-y', '@upstash/context7-mcp@latest'], {
  stdio: 'inherit',
  shell: true,
});

console.log('Starting Context7 MCP server...');

context7.on('error', (error) => {
  console.error('Failed to start Context7 MCP server:', error);
});

context7.on('close', (code) => {
  console.log(`Context7 MCP server exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Stopping Context7 MCP server...');
  context7.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Stopping Context7 MCP server...');
  context7.kill();
  process.exit();
});
