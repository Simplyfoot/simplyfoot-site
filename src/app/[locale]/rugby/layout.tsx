import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { StickyLegalBar } from '@/components/shared/StickyLegalBar';
import { isBrandEnabled } from '@/config/brands';

export default function RugbyLayout({ children }: { children: ReactNode }) {
    // Garde feature-flag : tant que `rugby` n'est pas dans `ENABLED_BRAND_SLUGS`
    // (`src/config/brands.ts`), toutes les routes `/rugby/*` répondent 404.
    if (!isBrandEnabled('rugby')) {
        notFound();
    }

    return (
        <div data-brand="rugby" className="bg-analogous-2-50 flex min-h-svh flex-col">
            <Header brand="rugby" />
            <div className="flex-1">{children}</div>
            <Footer brand="rugby" />
            <StickyLegalBar brand="rugby" />
        </div>
    );
}
