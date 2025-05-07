import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for generating placeholder images
 * @param request The incoming request
 * @returns A response with a placeholder image
 */
export async function GET(request: NextRequest) {
  // Get the search params
  const searchParams = request.nextUrl.searchParams;
  const width = parseInt(searchParams.get('width') || '800');
  const height = parseInt(searchParams.get('height') || '600');
  const text = searchParams.get('text') || 'Placeholder Image';
  const bgColor = searchParams.get('bgColor') || '004b8d'; // Window World blue
  const textColor = searchParams.get('textColor') || 'ffffff'; // White

  // Create an SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${bgColor}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        fill="#${textColor}" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `;

  // Return the SVG as an image
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
