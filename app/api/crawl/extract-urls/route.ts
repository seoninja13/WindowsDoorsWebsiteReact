import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { baseUrl, maxPages } = await request.json();

    if (!baseUrl) {
      return NextResponse.json({ error: 'Base URL is required' }, { status: 400 });
    }

    // Use Context7 to extract URLs
    const context7Response = await fetch('http://localhost:3001/api/context7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'extractUrls',
        data: {
          baseUrl,
          maxPages: maxPages || 100,
        },
      }),
    });

    if (!context7Response.ok) {
      throw new Error(`Context7 API error: ${context7Response.statusText}`);
    }

    const data = await context7Response.json();
    
    return NextResponse.json({
      success: true,
      urls: data.urls || [],
      count: data.urls?.length || 0,
    });
  } catch (error: any) {
    console.error('Error extracting URLs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
