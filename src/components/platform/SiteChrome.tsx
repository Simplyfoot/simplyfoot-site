'use client';

import { usePathname } from 'next/navigation';

/**
 * Wraps site-level chrome (navbar, footer, etc).
 * Hides everything when on /admin routes.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return <>{children}</>;
}
