import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('token');
  if(!userToken) {
     return NextResponse.redirect(new URL('/login',request.url))
  }
  else {
   return NextResponse.next();
  }
}
export const config = {
    // allowed pages without auth token
  matcher: '/((?!_next/static|_next/image|favicon.ico|login|signup).*)',
}