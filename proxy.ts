import { NextResponse, type NextRequest } from 'next/server';
import { COMING_SOON, comingSoonHTML } from './lib/maintenance';
import { SEED_PRESENTATION_PATH } from './lib/public-pages';
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const draftPreview = searchParams.get('preview') === 'draft';
  const editor = pathname === '/admin' || ['/api/editor/content', '/api/editor/assets', '/api/editor/upload'].includes(pathname);
  const embeddedPreview = draftPreview && (pathname === '/' || pathname === '/investors')
    && request.headers.get('sec-fetch-site') === 'same-origin' && request.headers.get('sec-fetch-dest') === 'iframe';
  if (pathname === SEED_PRESENTATION_PATH || editor || embeddedPreview) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    if (editor || draftPreview) response.headers.set('Cache-Control', 'private, no-store');
    return response;
  }
  // The image picker and published deck share the existing media route.
  if (COMING_SOON && !/^\/media\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(pathname)) {
    const hiddenResource = /^\/(api|media|forecasts)(?:\/|$)/.test(pathname);
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
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/editor') || draftPreview) {
    response.headers.set('X-Robots-Tag','noindex, nofollow, noarchive');
    response.headers.set('Cache-Control','private, no-store');
  }
  return response;
}
export const config = { matcher:['/((?!_next/static|_next/image|favicon.ico|fonts/|brand/).*)'] };
