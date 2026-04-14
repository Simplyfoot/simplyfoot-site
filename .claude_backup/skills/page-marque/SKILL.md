---
name: page-marque
description: Creer une page pour un sport dans app/(brands)/[brand]/, generateMetadata dynamique, composants brand/ et sections/, contenu depuis i18n
---

# Skill : Creation de Page Marque

## Types de pages

| Type | Emplacement | Exemple |
|---|---|---|
| Landing marque | `app/(brands)/foot/page.tsx` | Page d'accueil SimplyFoot |
| Sous-page | `app/(brands)/foot/fonctionnalites/page.tsx` | Page fonctionnalites |
| Transversale | `app/(platform)/contact/page.tsx` | Page contact (toutes marques) |

## Procedure de creation

### 1. Creer le fichier page

```typescript
// app/(brands)/foot/fonctionnalites/page.tsx
import type { Metadata } from 'next';
import { getBrandConfig } from '@/lib/config/brands';
import { buildBrandMetadata } from '@/lib/seo/metadata';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CTASection } from '@/components/sections/CTASection';

const brand = getBrandConfig('foot');

export async function generateMetadata(): Promise<Metadata> {
  return buildBrandMetadata(brand, {
    title: 'Fonctionnalites',
    description: 'Decouvrez toutes les fonctionnalites de SimplyFoot pour gerer votre club de football amateur.',
    path: '/foot/fonctionnalites',
  });
}

export default function FootFeaturesPage() {
  return (
    <main>
      <HeroSection
        brand={brand}
        title="Tout ce dont votre club a besoin"
        subtitle="De la convocation au bilan de saison, SimplyFoot couvre chaque aspect de la vie de votre club."
        ctaLabel="Essayer gratuitement"
        ctaHref="/demo"
      />
      <FeatureGrid brand={brand} features={getFeatures('foot')} />
      <CTASection
        brand={brand}
        title="Pret a simplifier la gestion de votre club ?"
        ctaLabel="Demander une demo"
        ctaHref="/demo"
      />
    </main>
  );
}
```

### 2. Verifier la replicabilite

La meme page doit fonctionner pour les 3 sports en changeant uniquement :
- `getBrandConfig('foot')` → `getBrandConfig('rugby')` ou `getBrandConfig('handball')`
- Les textes de contenu (adaptes au sport)
- Le chemin dans `buildBrandMetadata`

### 3. Structure UX obligatoire

```
Hero → Contenu principal → CTA final
```

Chaque page doit avoir au minimum un Hero et un CTA.

### 4. Contenu depuis la configuration

Le contenu specifique a chaque sport est importe depuis `content/[sport]/` ou passe en props.
Jamais de texte hardcode dans les composants partages.

## Checklist (8 points)

1. Fichier dans `app/(brands)/[sport]/[page]/page.tsx`
2. `generateMetadata()` avec `buildBrandMetadata()`
3. Composants `brand/` et `sections/` parametres avec `BrandConfig`
4. Structure Hero → Contenu → CTA
5. Contenu adapte au sport (pas de copier-coller)
6. Responsive mobile-first
7. Fonctionne pour les 3 marques en changeant la config
8. Textes en francais, realistes, sans lorem ipsum
