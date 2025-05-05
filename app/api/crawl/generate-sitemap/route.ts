import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'Valid URLs array is required' }, { status: 400 });
    }

    // Use Context7 to generate sitemap
    const context7Response = await fetch('http://localhost:3001/api/context7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'generateSitemap',
        data: {
          urls,
        },
      }),
    });

    if (!context7Response.ok) {
      throw new Error(`Context7 API error: ${context7Response.statusText}`);
    }

    const data = await context7Response.json();
    
    return NextResponse.json({
      success: true,
      sitemap: data.sitemap || '',
    });
  } catch (error: any) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
