import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function RugbyLayout({ children }: { children: ReactNode }) {
    return (
        <div data-brand="rugby" className="flex min-h-svh flex-col">
            <Header brand="rugby" />
            <div className="flex-1">{children}</div>
            <Footer brand="rugby" />
        </div>
    );
}
