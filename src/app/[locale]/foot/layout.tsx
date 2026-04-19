import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';

export default function FootLayout({ children }: { children: ReactNode }) {
    return (
        <div data-brand="foot" className="flex min-h-svh flex-col">
            <div className="flex-1">{children}</div>
            <Footer brand="foot" />
        </div>
    );
}
