import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { StickyLegalBar } from '@/components/shared/StickyLegalBar';
import { isBrandEnabled } from '@/config/features';

export default function HandballLayout({ children }: { children: ReactNode }) {
    if (!isBrandEnabled('handball')) {
        notFound();
    }

    return (
        <div data-brand="handball" className="bg-analogous-2-50 flex min-h-svh flex-col">
            <Header brand="handball" />
            <div className="flex-1">{children}</div>
            <Footer brand="handball" />
            <StickyLegalBar brand="handball" />
        </div>
    );
}
