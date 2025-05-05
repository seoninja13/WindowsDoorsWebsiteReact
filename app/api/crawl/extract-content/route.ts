import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Use Context7 to extract page content
    const context7Response = await fetch('http://localhost:3001/api/context7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'extractContent',
        data: {
          url,
        },
      }),
    });

    if (!context7Response.ok) {
      throw new Error(`Context7 API error: ${context7Response.statusText}`);
    }

    const data = await context7Response.json();
    
    return NextResponse.json({
      success: true,
      content: data.content || null,
    });
  } catch (error: any) {
    console.error('Error extracting content:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
