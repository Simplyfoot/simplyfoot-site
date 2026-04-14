'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Syncs the data-brand attribute on <body> during client-side navigation.
 * The initial render is handled by an inline script in layout.tsx.
 */
export function BrandBodySync() {
  const pathname = usePathname();

  useEffect(() => {
    const brand = pathname.startsWith('/foot')
      ? 'foot'
      : pathname.startsWith('/rugby')
        ? 'rugby'
        : pathname.startsWith('/handball')
          ? 'handball'
          : 'platform';

    document.body.setAttribute('data-brand', brand);
  }, [pathname]);

  return null;
}
