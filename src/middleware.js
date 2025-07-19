// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  
  // Add CORS headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // Handle OPTIONS (preflight) requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...Object.fromEntries(response.headers),
        'Access-Control-Max-Age': '86400', // 24 hours
      },
    })
  }

  return response
}

// تحديد المسارات التي ينطبق عليها الميدل وير
export const config = {
  matcher: '/api/:path*', // سيتم تطبيقه على جميع مسارات /api
}