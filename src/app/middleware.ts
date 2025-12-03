import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simple middleware - NextAuth handles auth protection in components
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/chat/:path*"],
};