import type { ReactNode } from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function BrandsLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
