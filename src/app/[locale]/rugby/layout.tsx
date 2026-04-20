import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { StickyLegalBar } from '@/components/shared/StickyLegalBar';

export default function RugbyLayout({ children }: { children: ReactNode }) {
    return (
        <div data-brand="rugby" className="bg-analogous-2-50 flex min-h-svh flex-col">
            <Header brand="rugby" />
            <div className="flex-1">{children}</div>
            <Footer brand="rugby" />
            <StickyLegalBar brand="rugby" />
        </div>
    );
}
