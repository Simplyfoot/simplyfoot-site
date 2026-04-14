---
name: brand-component
description: Creer un composant mutualise brand/ parametre par BrandConfig, decision mutualiser vs specialiser, pattern CSS variables, test mental 3 marques
---

# Skill : Composant Mutualise (brand/)

## Arbre de decision

La structure change entre sports ?

- **NON** → `components/brand/` parametre par `BrandConfig`
- **PARTIELLEMENT** → `components/brand/` avec variantes
- **OUI totalement** → `components/[sport]/` (RARE, a justifier)

**Regle : 90% des cas doivent etre mutualises.**

## Template

```typescript
// components/brand/FeatureCard.tsx
import { cn } from '@/lib/utils';
import type { BrandConfig } from '@/lib/config/brands';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface FeatureCardProps {
  brand: BrandConfig;
  feature: Feature;
  className?: string;
}

export function FeatureCard({ brand, feature, className }: FeatureCardProps) {
  return (
    <div className={cn(
      'rounded-xl border border-gray-100 bg-white p-6 hover:shadow-lg transition-shadow',
      className
    )}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand-primary)]/10">
        <feature.icon className="h-6 w-6 text-[var(--brand-primary)]" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
      <p className="text-sm text-gray-600">{feature.description}</p>
    </div>
  );
}
```

## Regles pour les props

1. `BrandConfig` en premiere prop
2. `className` optionnel pour surcharge de styles
3. `variant` si plusieurs variantes visuelles
4. Tout le contenu textuel en props — jamais hardcode

## Regles de couleurs

```typescript
// CORRECT — CSS variable
<div className="bg-[var(--brand-primary)] text-white">
<div className="text-[var(--brand-accent)]">
<div className="border-[var(--brand-primary)]">

// CORRECT — Opacite sur variable
<div className="bg-[var(--brand-primary)]/10">

// INTERDIT — Couleur en dur
<div className="bg-green-800">

// INTERDIT — Condition par marque
<div className={brand.id === 'foot' ? 'bg-green-800' : 'bg-blue-900'}>

// INTERDIT — Import de couleur depuis config
<div style={{ backgroundColor: brand.colors.primary }}>
```

## Test mental 3 marques

Avant de livrer, verifier mentalement :
1. **Vert (foot)** — le composant rend bien avec `--brand-primary: #1B5E20`
2. **Bleu (rugby)** — le composant rend bien avec `--brand-primary: #1A237E`
3. **Orange (handball)** — le composant rend bien avec `--brand-primary: #E65100`

Si un des trois ne rend pas bien, le composant n'est pas correctement parametre.

## Gestion des variantes sans duplication

```typescript
interface CTASectionProps {
  brand: BrandConfig;
  variant?: 'light' | 'dark' | 'brand';
  title: string;
  ctaLabel: string;
  ctaHref: string;
}

const variantStyles = {
  light: 'bg-white text-gray-900',
  dark: 'bg-gray-900 text-white',
  brand: 'bg-[var(--brand-primary)] text-white',
};

export function CTASection({ brand, variant = 'light', title, ctaLabel, ctaHref }: CTASectionProps) {
  return (
    <section className={cn('py-16 lg:py-24', variantStyles[variant])}>
      {/* ... */}
    </section>
  );
}
```

## Checklist (8 points)

1. `BrandConfig` en prop (pas importe depuis config)
2. CSS variables pour toutes les couleurs de marque
3. Contenu textuel en props (pas hardcode)
4. `className` accepte pour surcharge
5. Test mental vert/bleu/orange passe
6. Responsive mobile-first
7. Types exportes
8. Pas de logique conditionnelle par sport pour les styles
