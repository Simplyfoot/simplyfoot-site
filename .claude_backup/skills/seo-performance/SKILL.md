---
name: seo-performance
description: Metadata dynamiques generateMetadata, JSON-LD schema.org, Core Web Vitals LCP FID CLS, images WebP next/image, fonts next/font, accessibilite WCAG AA RGAA
---

# Skill : SEO & Performance

## Systeme de metadata

### Conventions de titres

| Type | Format |
|---|---|
| Homepage | `Simply — [tagline]` |
| Marque | `[Marque] — [promesse]` |
| Sous-page | `[Sujet] \| [Marque] — Simply` |
| Transversale | `[Sujet] \| Simply` |

### Meta descriptions

- 140-160 caracteres
- Benefice + cible + CTA implicite
- Unique par page

### Helper `buildBrandMetadata`

```typescript
import type { Metadata } from 'next';
import type { BrandConfig } from '@/lib/config/brands';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://simply.fr';

export function buildBrandMetadata(
  brand: BrandConfig,
  page: { title: string; description: string; path: string }
): Metadata {
  return {
    title: `${page.title} | ${brand.name} — Simply`,
    description: page.description,
    alternates: { canonical: `${BASE_URL}${page.path}` },
    openGraph: {
      title: `${page.title} | ${brand.name}`,
      description: page.description,
      url: `${BASE_URL}${page.path}`,
      siteName: brand.name,
      type: 'website',
      images: [brand.meta.ogImage],
    },
  };
}
```

### Utilisation dans chaque page

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const brand = getBrandConfig('foot');
  return buildBrandMetadata(brand, {
    title: 'Fonctionnalites',
    description: 'Decouvrez toutes les fonctionnalites...',
    path: '/foot/fonctionnalites',
  });
}
```

## JSON-LD

| Type | Page |
|---|---|
| `Organization` | Homepage plateforme |
| `SoftwareApplication` | Landing marque |
| `FAQPage` | Page FAQ |
| `BreadcrumbList` | Toute page avec navigation |

## Core Web Vitals — Cibles

| Metrique | Cible | Mesure |
|---|---|---|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |

## Optimisation images

- Format : WebP/AVIF via `next/image`
- `priority` uniquement sur l'image Hero
- Attribut `sizes` pour responsive
- `alt` descriptif obligatoire
- Poids max : 500KB

```typescript
import Image from 'next/image';

<Image
  src="/images/foot/hero.webp"
  alt="Interface de gestion SimplyFoot sur ordinateur"
  width={1200}
  height={630}
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Optimisation fonts

- `next/font` obligatoire
- `display: 'swap'`
- `subset: 'latin'`
- Maximum 2 familles de fonts

```typescript
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-display' });
```

## Optimisation JS

- `dynamic()` pour composants lourds sous le fold
- Lazy loading des sections non visibles au chargement
- Pas de librairies inutiles

## Accessibilite WCAG AA

| Critere | Exigence |
|---|---|
| Contraste | >= 4.5:1 texte, >= 3:1 grands textes |
| Focus | Visible sur tous les elements interactifs |
| Clavier | Navigation complete au clavier |
| ARIA | Labels sur elements interactifs sans texte visible |
| Images | `alt` descriptifs |
| Headings | Hierarchie sans saut (h1 → h2 → h3) |
| HTML | Semantique (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`) |

## Sitemap dynamique

```typescript
import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://simply.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const brands = ['foot', 'rugby', 'handball'];
  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    ...brands.map(b => ({
      url: `${baseUrl}/${b}`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];
}
```

## Interdictions

- Page sans title/description
- Images sans `alt`
- Images > 500KB
- Contraste insuffisant
- Heading sautant un niveau (h1 → h3)
- `<img>` au lieu de `next/image`
- `<a>` au lieu de `next/link`
