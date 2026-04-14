import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer les fichiers statiques et API
  if (pathname.startsWith('/_next') || pathname.includes('.') || pathname.startsWith('/api')) {
    return;
  }

  // Rediriger /fr/... vers /...
  if (pathname.startsWith('/fr')) {
    return NextResponse.redirect(new URL(pathname.replace(/^\/fr/, '') || '/', request.url));
  }

  // Anciennes URLs marque (avant restructuration) → rediriger vers /foot/...
  const OLD_BRAND_ROUTES = ['/fonctionnalites', '/offres', '/gestion-club', '/gestion-equipe'];

  for (const route of OLD_BRAND_ROUTES) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      return NextResponse.redirect(new URL(`/foot${pathname}`, request.url), 301);
    }
  }

  // Anciennes pages supprimees → rediriger vers /
  const DELETED_ROUTES = ['/impatient', '/dashboard', '/connexion', '/inscription', '/admin'];

  for (const route of DELETED_ROUTES) {
    if (pathname === route) {
      return NextResponse.redirect(new URL('/', request.url), 301);
    }
  }

  // Anciennes routes EN → rediriger vers / pour l'instant
  if (pathname.startsWith('/en')) {
    return NextResponse.redirect(new URL('/', request.url), 302);
  }
}
