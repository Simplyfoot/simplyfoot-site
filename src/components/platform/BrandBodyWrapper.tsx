'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function BrandBodyWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const currentBrand = useMemo(() => {
    if (pathname.startsWith('/foot')) return 'foot';
    if (pathname.startsWith('/rugby')) return 'rugby';
    if (pathname.startsWith('/handball')) return 'handball';
    return undefined;
  }, [pathname]);

  return (
    <div data-brand={currentBrand} className="flex flex-col min-h-dvh">
      {children}
    </div>
  );
}
