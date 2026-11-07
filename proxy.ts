import { NextResponse, type NextRequest } from 'next/server';
import { COMING_SOON, comingSoonHTML } from './lib/maintenance';
export function proxy(request: NextRequest) {
  if (COMING_SOON) {
    const hiddenResource = /^\/(api|media|forecasts)(?:\/|$)/.test(request.nextUrl.pathname);
    return new NextResponse(hiddenResource ? 'Temporarily unavailable' : comingSoonHTML, {
      status: hiddenResource ? 503 : 200,
      headers: {
        'Content-Type': hiddenResource ? 'text/plain; charset=utf-8' : 'text/html; charset=utf-8',
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  }
  const response = NextResponse.next();
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/editor') || request.nextUrl.searchParams.get('preview')==='draft') {
    response.headers.set('X-Robots-Tag','noindex, nofollow, noarchive');
    response.headers.set('Cache-Control','private, no-store');
  }
  return response;
}
export const config = { matcher:['/((?!_next/static|_next/image|favicon.ico|fonts/|brand/).*)'] };
