import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';
import { getCurrentUser } from '@/lib/appwrite/account';

export function middleware(request: NextRequest, event: NextFetchEvent) {
  console.log(
    '🚀 ~ file: middleware.ts ~ line 1 ~ middleware ~ request',
    request,
  );
  event.waitUntil(getCurrentUser());

  return NextResponse.next();

  //   const isAuthenticated = authenticate(request);

  //   // If the user is authenticated, continue as normal
  //   if (isAuthenticated) {
  //     return NextResponse.next();
  //   }

  //   // Redirect to login page if not authenticated
  //   return NextResponse.redirect(new URL('/login', request.url));
}

// export const config = {
//   matcher: '/dashboard/:path*',
// };
