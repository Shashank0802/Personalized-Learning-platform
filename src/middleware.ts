import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getVercelError, isVercelError } from './utils/vercel-errors';

export async function middleware(request: NextRequest) {
  try {
    // Get the response from the next handler
    const response = await NextResponse.next();

    // Check for Vercel-specific error headers
    const vercelErrorCode = response.headers.get('x-vercel-error');
    
    if (vercelErrorCode && isVercelError(vercelErrorCode)) {
      const error = getVercelError(vercelErrorCode);
      
      // Create a new response with the error details
      return new NextResponse(
        JSON.stringify({
          error: {
            code: error.code,
            message: error.message,
            statusCode: error.statusCode,
            category: error.category
          }
        }),
        {
          status: error.statusCode,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0'
          }
        }
      );
    }

    return response;
  } catch (error) {
    // Handle unexpected errors
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INTERNAL_UNEXPECTED_ERROR',
          message: 'An unexpected error occurred',
          statusCode: 500,
          category: 'Internal'
        }
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 