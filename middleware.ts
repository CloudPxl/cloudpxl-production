import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that do NOT require authentication
const PUBLIC_ROUTES = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get('cpxl_session')?.value === '1'

  // Allow public routes through unconditionally
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    // If already authenticated and hitting /login, redirect to the app
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // Protect everything else — redirect unauthenticated visitors to /login
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|assets|logo|cloud-hero|.*\\..*).*)'],
}
