/**
 * Database Utility Functions for Windows Doors Website React
 * 
 * This file contains utility functions for interacting with the Supabase database.
 * It provides a centralized way to perform CRUD operations on the database tables.
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Generic function to fetch data from a table
 * @param table The table name to fetch data from
 * @param query Optional query parameters
 * @returns The fetched data
 */
export async function fetchData<T>(
  table: keyof Database,
  query?: {
    select?: string;
    eq?: [string, any];
    order?: [string, 'asc' | 'desc'];
    limit?: number;
    range?: [number, number];
  }
): Promise<T[]> {
  let queryBuilder = supabase.from(table).select(query?.select || '*');

  if (query?.eq) {
    queryBuilder = queryBuilder.eq(query.eq[0], query.eq[1]);
  }

  if (query?.order) {
    queryBuilder = queryBuilder.order(query.order[0], { ascending: query.order[1] === 'asc' });
  }

  if (query?.limit) {
    queryBuilder = queryBuilder.limit(query.limit);
  }

  if (query?.range) {
    queryBuilder = queryBuilder.range(query.range[0], query.range[1]);
  }

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

  return data as T[];
}

/**
 * Generic function to fetch a single record by ID
 * @param table The table name to fetch data from
 * @param id The ID of the record to fetch
 * @returns The fetched record
 */
export async function fetchById<T>(table: keyof Database, id: number): Promise<T | null> {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).single();

  if (error) {
    console.error(`Error fetching ${table} by ID:`, error);
    return null;
  }

  return data as T;
}

/**
 * Generic function to fetch a single record by slug
 * @param table The table name to fetch data from
 * @param slug The slug of the record to fetch
 * @returns The fetched record
 */
export async function fetchBySlug<T>(table: keyof Database, slug: string): Promise<T | null> {
  const { data, error } = await supabase.from(table).select('*').eq('slug', slug).single();

  if (error) {
    console.error(`Error fetching ${table} by slug:`, error);
    return null;
  }

  return data as T;
}

/**
 * Generic function to insert a record
 * @param table The table name to insert data into
 * @param record The record to insert
 * @returns The inserted record
 */
export async function insertRecord<T>(table: keyof Database, record: Partial<T>): Promise<T | null> {
  const { data, error } = await supabase.from(table).insert(record).select().single();

  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    return null;
  }

  return data as T;
}

/**
 * Generic function to update a record
 * @param table The table name to update data in
 * @param id The ID of the record to update
 * @param record The updated record data
 * @returns The updated record
 */
export async function updateRecord<T>(
  table: keyof Database,
  id: number,
  record: Partial<T>
): Promise<T | null> {
  const { data, error } = await supabase.from(table).update(record).eq('id', id).select().single();

  if (error) {
    console.error(`Error updating ${table}:`, error);
    return null;
  }

  return data as T;
}

/**
 * Generic function to delete a record
 * @param table The table name to delete data from
 * @param id The ID of the record to delete
 * @returns True if deletion was successful, false otherwise
 */
export async function deleteRecord(table: keyof Database, id: number): Promise<boolean> {
  const { error } = await supabase.from(table).delete().eq('id', id);

  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    return false;
  }

  return true;
}

/**
 * Function to fetch pages with their related data
 * @param path Optional path to filter by
 * @returns The fetched pages with related data
 */
export async function fetchPages(path?: string) {
  let query = supabase.from('pages').select('*');

  if (path) {
    query = query.eq('path', path);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }

  return data;
}

/**
 * Function to fetch products with their related data
 * @param categorySlug Optional category slug to filter by
 * @returns The fetched products with related data
 */
export async function fetchProducts(categorySlug?: string) {
  let query = supabase
    .from('products')
    .select(`
      *,
      product_category:product_categories(*),
      product_images(*)
    `);

  if (categorySlug) {
    query = query.eq('product_category.slug', categorySlug);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data;
}

/**
 * Function to fetch blog posts with their related data
 * @param limit Optional limit of posts to fetch
 * @returns The fetched blog posts
 */
export async function fetchBlogPosts(limit?: number) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_date', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }

  return data;
}

export default supabase;
