'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { BrandConfig } from '../config/brands';

const BrandContext = createContext<BrandConfig | null>(null);

export function BrandProvider({ brand, children }: { brand: BrandConfig; children: ReactNode }) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandConfig {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return ctx;
}
