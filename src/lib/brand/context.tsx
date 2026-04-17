'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { BrandConfig } from '@/types/brand';

const BrandContext = createContext<BrandConfig | null>(null);

export function BrandProvider({ config, children }: { config: BrandConfig; children: ReactNode }) {
    return (
        <BrandContext.Provider value={config}>
            <div data-brand={config.slug}>{children}</div>
        </BrandContext.Provider>
    );
}

export function useBrand(): BrandConfig {
    const ctx = useContext(BrandContext);
    if (!ctx) {
        throw new Error('useBrand must be used within a BrandProvider');
    }
    return ctx;
}
