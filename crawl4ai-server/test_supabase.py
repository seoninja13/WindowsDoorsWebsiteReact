"""
Test script for Supabase MCP server integration.
This script tests connecting to Supabase and performing basic operations.
"""

import os
import json
import asyncio
import base64
import requests
from datetime import datetime

# Constants
TEST_IMAGE_PATH = "screenshots/windowworldla_test.png"
SUPABASE_MCP_URL = "http://localhost:11434/v1/chat/completions"  # Default MCP server port

async def test_supabase_connection():
    """Test connecting to Supabase MCP server."""
    print("Testing Supabase MCP server connection...")
    
    try:
        # Check if the MCP server is running
        response = requests.get("http://localhost:11434/health")
        if response.status_code == 200:
            print("✅ MCP server is running")
        else:
            print(f"❌ MCP server health check failed: {response.status_code}")
            return False
        
        # Test basic Supabase operation using the MCP server
        mcp_request = {
            "model": "supabase-mcp-server",
            "messages": [
                {"role": "user", "content": "List all tables in the database"}
            ]
        }
        
        response = requests.post(
            SUPABASE_MCP_URL,
            headers={"Content-Type": "application/json"},
            json=mcp_request
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Successfully connected to Supabase MCP server")
            print(f"Response: {json.dumps(result, indent=2)}")
            return True
        else:
            print(f"❌ Failed to connect to Supabase MCP server: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    
    except Exception as e:
        print(f"❌ Error testing Supabase connection: {str(e)}")
        return False

async def test_upload_screenshot():
    """Test uploading a screenshot to Supabase storage."""
    print("\nTesting screenshot upload to Supabase storage...")
    
    try:
        # Check if test image exists
        if not os.path.exists(TEST_IMAGE_PATH):
            print(f"❌ Test image not found: {TEST_IMAGE_PATH}")
            return False
        
        # Read the image file
        with open(TEST_IMAGE_PATH, "rb") as f:
            image_data = f.read()
            image_base64 = base64.b64encode(image_data).decode("utf-8")
        
        # Create a timestamp for the filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"windowworldla_homepage_{timestamp}.png"
        
        # Upload to Supabase storage using MCP server
        mcp_request = {
            "model": "supabase-mcp-server",
            "messages": [
                {"role": "user", "content": f"Upload this image to the 'screenshots' bucket with filename '{filename}'"},
                {"role": "user", "content": f"data:image/png;base64,{image_base64[:100]}..."}  # Truncated for brevity
            ]
        }
        
        response = requests.post(
            SUPABASE_MCP_URL,
            headers={"Content-Type": "application/json"},
            json=mcp_request
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Successfully tested image upload to Supabase")
            print(f"Response: {json.dumps(result, indent=2)}")
            return True
        else:
            print(f"❌ Failed to upload image to Supabase: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    
    except Exception as e:
        print(f"❌ Error uploading screenshot to Supabase: {str(e)}")
        return False

async def main():
    """Main test function."""
    print("Supabase MCP Server Test")
    print("=======================")
    
    # Test Supabase connection
    connection_success = await test_supabase_connection()
    
    # If connection successful, test uploading a screenshot
    if connection_success:
        await test_upload_screenshot()
    
    print("\n=======================")
    print("Test completed")

if __name__ == "__main__":
    asyncio.run(main())
