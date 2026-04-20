import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { StickyLegalBar } from '@/components/shared/StickyLegalBar';

export default function FootLayout({ children }: { children: ReactNode }) {
    return (
        <div data-brand="foot" className="bg-secondary-50 flex min-h-svh flex-col">
            <Header brand="foot" />
            <div className="flex-1">{children}</div>
            <Footer brand="foot" />
            <StickyLegalBar brand="foot" />
        </div>
    );
}
