import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if user has session data
    const sessionToken = request.cookies.get('session')?.value
    
    // If no session token and not already on home page, redirect to home
    if (!sessionToken && request.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    
    return NextResponse.next()
}

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
}