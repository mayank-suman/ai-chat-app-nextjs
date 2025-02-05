import { getLoggedInUser } from '@/lib/server/appwrite';
import { NextResponse, NextRequest } from 'next/server';

// Specify the public routes
const publicRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  // Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const user = await getLoggedInUser();

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Redirect to / if the user is authenticated and tries to access a public route
  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Continue to the next middleware
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo-dark.svg|logo-light.svg).*)',
  ],
};
