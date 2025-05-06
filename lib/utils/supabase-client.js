/**
 * Supabase client utility for the Windows Doors Website project
 * This module provides functions for interacting with Supabase for storing
 * crawled data, screenshots, and other content from the Window World LA website.
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://angry-hyena-re0di8.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZ3J5LWh5ZW5hLXJlMGRpOCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE1MDQ0NjAwLCJleHAiOjIwMzA2MjA2MDB9.ea6a680f-20bb-4968-bcaa-1568439806c4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload a screenshot to Supabase Storage
 * @param {string} filePath - Path to the screenshot file
 * @param {string} fileName - Name to use for the file in Supabase
 * @param {string} bucket - Storage bucket name (default: 'screenshots')
 * @returns {Promise<Object>} - Upload result
 */
async function uploadScreenshot(filePath, fileName, bucket = 'screenshots') {
  try {
    // Read the file
    const fs = require('fs');
    const fileData = fs.readFileSync(filePath);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileData, {
        contentType: 'image/png',
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading screenshot:', error);
      return { success: false, error };
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return { 
      success: true, 
      data: {
        ...data,
        publicUrl: urlData?.publicUrl
      }
    };
  } catch (error) {
    console.error('Error in uploadScreenshot:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Save page metadata to Supabase database
 * @param {Object} metadata - Page metadata
 * @returns {Promise<Object>} - Save result
 */
async function savePageMetadata(metadata) {
  try {
    const { data, error } = await supabase
      .from('pages')
      .upsert({
        url: metadata.url,
        title: metadata.title,
        description: metadata.description,
        path: metadata.path,
        screenshot_url: metadata.screenshot_url,
        crawl_time: metadata.crawl_time || new Date().toISOString(),
        has_screenshot: metadata.has_screenshot || false
      })
      .select();
    
    if (error) {
      console.error('Error saving page metadata:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error in savePageMetadata:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Save links from a page to Supabase database
 * @param {string} pageUrl - URL of the page containing the links
 * @param {Array} links - Array of link objects
 * @returns {Promise<Object>} - Save result
 */
async function savePageLinks(pageUrl, links) {
  try {
    // Format links for database
    const formattedLinks = links.map(link => ({
      source_url: pageUrl,
      target_url: link.url,
      text: link.text,
      created_at: new Date().toISOString()
    }));
    
    const { data, error } = await supabase
      .from('links')
      .upsert(formattedLinks)
      .select();
    
    if (error) {
      console.error('Error saving page links:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error in savePageLinks:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all crawled pages from Supabase
 * @returns {Promise<Object>} - Query result
 */
async function getCrawledPages() {
  try {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('crawl_time', { ascending: false });
    
    if (error) {
      console.error('Error getting crawled pages:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error in getCrawledPages:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  supabase,
  uploadScreenshot,
  savePageMetadata,
  savePageLinks,
  getCrawledPages
};
