import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function HandballLayout({ children }: { children: ReactNode }) {
    return (
        <div data-brand="handball" className="flex min-h-svh flex-col">
            <Header brand="handball" />
            <div className="flex-1">{children}</div>
            <Footer brand="handball" />
        </div>
    );
}
