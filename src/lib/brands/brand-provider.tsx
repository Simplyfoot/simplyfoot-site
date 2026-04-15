'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { BrandConfig } from '../config/brands';

const BrandContext = createContext<BrandConfig | null>(null);

/**
 * Fournisseur de contexte React pour la marque active.
 * Rend la configuration de marque accessible a tous les composants enfants.
 * @param brand - Configuration de la marque courante
 * @param children - Composants enfants
 */
export function BrandProvider({ brand, children }: { brand: BrandConfig; children: ReactNode }) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

/**
 * Hook pour acceder a la configuration de la marque active.
 * Doit etre utilise dans un composant enfant de BrandProvider.
 * @returns La configuration de la marque courante
 * @throws Si utilise en dehors d'un BrandProvider
 */
export function useBrand(): BrandConfig {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return ctx;
}
