---
name: architecture
description: Routing Next.js App Router, layouts, route groups (platform)/(brands), arborescence multi-marques, middleware, redirections, ajout de nouveau sport
---

# Skill : Architecture Plateforme

## Activation

Ce skill s'active pour : creation de page, routing, layouts, restructuration, ajout de sport, navigation, redirections, middleware.

## Contexte

Stack : Next.js 14+ App Router. Architecture 3 couches obligatoire :

| Couche | Perimetre | Route group |
|---|---|---|
| **Plateforme** | Commun a tout l'ecosysteme | `app/(platform)/` |
| **Marque** | Parametre par sport, structure identique | `app/(brands)/[sport]/` |
| **Specifique** | N'existe que pour un sport donne (RARE) | Sous-composant dedie, justifie |

## Structure de fichiers

```
src/app/
├── (platform)/              # Pages niveau plateforme
│   ├── layout.tsx           # Layout plateforme (header/footer globaux neutres)
│   ├── page.tsx             # Homepage ecosysteme
│   ├── contact/page.tsx
│   ├── demo/page.tsx
│   ├── offres/page.tsx
│   └── a-propos/page.tsx
├── (brands)/                # Pages niveau marque
│   ├── layout.tsx           # Layout marque (injecte BrandProvider + data-brand)
│   ├── foot/
│   │   ├── page.tsx         # Landing SimplyFoot
│   │   ├── fonctionnalites/page.tsx
│   │   └── [...slug]/page.tsx
│   ├── rugby/
│   │   ├── page.tsx
│   │   └── [...slug]/page.tsx
│   └── handball/
│       ├── page.tsx
│       └── [...slug]/page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── api/
│   └── [endpoint]/route.ts
└── layout.tsx               # Root layout (html, body, providers, fonts)
```

## Principes de routing

### Root Layout (`app/layout.tsx`)

Contient uniquement : `<html>`, `<body>`, providers globaux (ThemeProvider, Supabase, Analytics), chargement des fonts, metadata par defaut. Aucune logique metier.

### Route groups

Chaque route group a son propre `layout.tsx` quand le layout visuel differe.

### Parametrisation des pages marque

Les pages marque ne sont JAMAIS dupliquees manuellement. Utiliser un composant partage parametre :

```typescript
// app/(brands)/foot/page.tsx
import { BrandLanding } from '@/components/brand/BrandLanding';
import { getBrandConfig } from '@/lib/config/brands';

export default function FootPage() {
  const brand = getBrandConfig('foot');
  return <BrandLanding brand={brand} />;
}
```

### Metadata dynamiques

Chaque page publique doit avoir `generateMetadata()` :

```typescript
import type { Metadata } from 'next';
import { getBrandConfig } from '@/lib/config/brands';

export async function generateMetadata(): Promise<Metadata> {
  const brand = getBrandConfig('foot');
  return {
    title: `${brand.name} — Gestion de club ${brand.sport}`,
    description: brand.meta.description,
    openGraph: {
      title: brand.name,
      description: brand.meta.description,
      images: [brand.meta.ogImage],
    },
  };
}
```

### Fichiers loading.tsx et error.tsx

Presents dans chaque route significative pour gerer les etats de chargement et d'erreur.

### Middleware

Pour redirections, detection locale, protection de routes. Fichier `middleware.ts` a la racine de `src/`.

## Ajout d'un nouveau sport — 7 etapes

1. **Config** dans `lib/config/brands.ts` — ajouter l'objet BrandConfig
2. **CSS variables** dans `styles/globals.css` — ajouter `[data-brand="..."]`
3. **Type `BrandId`** mis a jour dans les types
4. **Route** `app/(brands)/[sport]/page.tsx` avec composants existants
5. **Contenu** dans `content/[sport]/`
6. **Assets** dans `public/images/[sport]/`
7. **Navigation** dans `lib/config/navigation.ts`

**Regle critique : aucun composant partage ne doit etre modifie.**

## Interdictions

- Dossiers plats `/simplyfoot-pages/` — App Router uniquement
- Dupliquer un layout par sport quand un parametre suffit
- Routes API sans validation Zod
- Pages publiques sans `generateMetadata()`
- Logique metier dans un layout
