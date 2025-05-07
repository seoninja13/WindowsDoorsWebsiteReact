import { NextResponse } from 'next/server';
import supabase from '@/lib/database';

/**
 * API route for getting the count of published blog posts
 * @returns The response object with the count
 */
export async function GET() {
  try {
    // Get the count of published blog posts
    const { count, error } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true);
    
    if (error) {
      throw error;
    }
    
    // Return the count
    return NextResponse.json(
      { count, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting blog post count:', error);
    
    // Return error response
    return NextResponse.json(
      { error: { message: 'Failed to get blog post count' } },
      { status: 500 }
    );
  }
}
