# Skill: Ajouter un composant de marque

## Quand utiliser

Composant qui s'affiche dans les pages de marque (`/foot`, `/rugby`, `/handball`) et utilise les tokens de marque dynamiques.

## Procedure

1. Creer `components/brands/BrandXxx.tsx`

```tsx
'use client';

import { useBrand } from '@/lib/brand/context';
import { useTranslations } from 'next-intl';

interface BrandHeroProps {
    title?: string;
}

export function BrandHero({ title }: BrandHeroProps) {
    const brand = useBrand();
    const t = useTranslations(`brands.${brand.slug}`);

    return (
        <section aria-label={t('heroLabel')} className="bg-brand-bg text-foreground">
            <h1 className="text-brand-primary">{title ?? t('heroTitle')}</h1>
        </section>
    );
}
```

## Regles

- Utiliser `useBrand()` pour acceder a la config de la marque active
- Les couleurs via classes Tailwind `brand-*` (jamais hex)
- Les textes via `useTranslations(\`brands.${brand.slug}\`)` pour namespace par marque
- Le composant doit fonctionner IDENTIQUEMENT pour les 3 marques
- Tester visuellement avec chaque marque avant de commiter
