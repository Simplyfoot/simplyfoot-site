import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function FootLayout({ children }: { children: ReactNode }) {
    return (
        <div data-brand="foot" className="flex min-h-svh flex-col">
            <Header brand="foot" />
            <div className="flex-1">{children}</div>
            <Footer brand="foot" />
        </div>
    );
}
