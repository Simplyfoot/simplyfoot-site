import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer les fichiers statiques et API
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api")
  ) {
    return;
  }

  // Rediriger /fr/... vers /...
  if (pathname.startsWith("/fr")) {
    return NextResponse.redirect(new URL(pathname.replace(/^\/fr/, ""), request.url));
  }

  // Rediriger / vers /en si la langue du navigateur est anglaise
  if (pathname === "/") {
    const lang = request.headers.get("accept-language")?.split(",")[0];
    if (lang && lang.startsWith("en")) {
      return NextResponse.redirect(new URL("/en", request.url));
    }
  }
}
