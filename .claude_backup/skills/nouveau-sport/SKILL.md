---
name: nouveau-sport
description: Ajouter une nouvelle marque sport a la plateforme Simply, procedure 7 etapes config CSS routes contenu assets navigation
---

# Skill : Ajout d'un Nouveau Sport

## Regle critique

**Aucun composant partage ne doit etre modifie.** Les composants `brand/`, `sections/`, `ui/` et `platform/` restent intacts.

## Procedure en 7 etapes

### Etape 1 — Configuration dans `lib/config/brands.ts`

Ajouter l'objet `BrandConfig` pour le nouveau sport :

```typescript
{
  id: 'basket',
  name: 'SimplyBasket',
  sport: 'Basketball',
  slug: 'basket',
  colors: {
    primary: '#E53935',
    primaryLight: '#EF5350',
    primaryDark: '#B71C1C',
    accent: '#FF8A80',
    gradient: 'linear-gradient(135deg, #E53935 0%, #FF8A80 100%)',
  },
  meta: {
    title: 'SimplyBasket — Gestion de club basketball',
    description: 'L\'outil de gestion tout-en-un pour les clubs de basketball amateur.',
    ogImage: '/images/basket/og.jpg',
  },
  content: {
    heroTitle: 'Votre club de basket, simplifie',
    heroSubtitle: 'Gerez vos equipes, matchs et licencies depuis une seule plateforme.',
    heroImage: '/images/basket/hero.webp',
    tagline: 'La gestion de club basketball, simplifiee.',
  },
}
```

### Etape 2 — CSS variables dans `styles/globals.css`

```css
[data-brand="basket"] {
  --brand-primary: #E53935;
  --brand-primary-light: #EF5350;
  --brand-primary-dark: #B71C1C;
  --brand-accent: #FF8A80;
  --brand-gradient: linear-gradient(135deg, #E53935 0%, #FF8A80 100%);
}
```

### Etape 3 — Type `BrandId` mis a jour

```typescript
export type BrandId = 'foot' | 'rugby' | 'handball' | 'basket';
```

### Etape 4 — Routes

Creer `app/(brands)/basket/page.tsx` :

```typescript
import { BrandLanding } from '@/components/brand/BrandLanding';
import { getBrandConfig } from '@/lib/config/brands';
import type { Metadata } from 'next';

const brand = getBrandConfig('basket');

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: brand.meta.title,
    description: brand.meta.description,
    openGraph: {
      title: brand.name,
      description: brand.meta.description,
      images: [brand.meta.ogImage],
    },
  };
}

export default function BasketPage() {
  return <BrandLanding brand={brand} />;
}
```

### Etape 5 — Contenu dans `content/basket/`

Creer les fichiers de contenu specifiques au sport avec le vocabulaire adapte.

### Etape 6 — Assets dans `public/images/basket/`

- `hero.webp` — Image hero
- `og.jpg` — Image OpenGraph (1200x630)
- Autres images specifiques

### Etape 7 — Navigation dans `lib/config/navigation.ts`

Ajouter le sport dans la configuration de navigation.

## Checklist (10 points)

1. Config ajoutee dans `brands.ts`
2. CSS variables definies dans `globals.css`
3. Type `BrandId` mis a jour
4. Route `app/(brands)/[sport]/page.tsx` creee
5. `generateMetadata()` present sur la page
6. Contenu dans `content/[sport]/`
7. Assets dans `public/images/[sport]/`
8. Navigation mise a jour
9. **Aucun composant partage modifie**
10. Test : la page s'affiche correctement avec les bonnes couleurs
