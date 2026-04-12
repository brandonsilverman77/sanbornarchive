import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Redirect /art_collection/[slug] → /map/[slug]
  if (path.startsWith('/art_collection/')) {
    let slug = path.replace('/art_collection/', '');

    // Strip common suffixes from old URL format
    slug = slug
      .replace(/-cover-page$/, '')
      .replace(/-title-page$/, '');

    // Handle pagination paths like /art_collection/page/77
    if (slug.startsWith('page/')) {
      return NextResponse.redirect(new URL('/maps', request.url), 301);
    }

    return NextResponse.redirect(new URL(`/map/${slug}`, request.url), 301);
  }

  // Redirect /art_state/[state]/page/[n] → /maps/[state]
  if (path.startsWith('/art_state/')) {
    const parts = path.replace('/art_state/', '').split('/');
    const state = parts[0] || '';
    return NextResponse.redirect(new URL(`/maps/${state}`, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/art_collection/:path*', '/art_state/:path*'],
};
