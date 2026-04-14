# Simply — Plateforme multi-marques sportive

## Build & test
- `npm run dev` — serveur de dev
- `npm run build` — verifier le build (OBLIGATOIRE avant livraison)
- `npm run lint` — ESLint + jsx-a11y
- `npm run format` — Prettier sur tout src/

## Stack
Next.js 15 App Router · React 19 · TypeScript strict · Tailwind CSS 4 · Supabase · Framer Motion · Lucide React · cva · clsx + tailwind-merge

## Architecture — 3 couches

| Couche | Route group | Perimetre |
|---|---|---|
| Plateforme | `app/(platform)/` | Contact, a-propos, blog, pages legales |
| Marque | `app/(brands)/[brand]/` | Landing sport, fonctionnalites, offres |
| Partage | `components/` | ui/ brand/ sections/ platform/ |

```
src/
├── app/(platform)/      # Pages plateforme (pas de brand context)
├── app/(brands)/[brand]/ # Pages marque (foot, rugby, handball)
├── components/ui/       # Primitifs agnostiques (Button, Card, Badge)
├── components/brand/    # Composants parametres par BrandConfig
├── components/sections/ # Sections reutilisables
├── components/platform/ # Header, Footer, BrandSwitcher
├── lib/config/          # brands.ts (source unique), company.ts, site.ts
├── lib/brands/          # BrandProvider, configs par sport
├── content/             # Contenus statiques par marque
└── locales/fr/          # i18n (common.json + {sport}.json)
```

## Marques

| Marque | Route | Primary 500 | CTA |
|---|---|---|---|
| SimplyFoot | `/foot` | `#1B5E20` | `#29be4f` |
| SimplyRugby | `/rugby` | `#1A237E` | `#5C6BC0` |
| SimplyHandball | `/handball` | `#E65100` | `#EF6C00` |

## Theming
- SOURCE UNIQUE : `lib/brands/{sport}.config.ts` → theme avec palettes 50-950
- CSS genere par `lib/config/brand-tokens.ts` → injecte dans `<style>` du layout
- Composants utilisent `bg-brand-cta`, `text-brand-primary-500`, `var(--brand-bg)` etc.
- JAMAIS de couleur hex en dur dans les composants

## Code style
- TypeScript strict, ZERO `any`
- Server Components par defaut, `'use client'` uniquement si interactivite
- Imports : React/Next → libs externes → composants → lib → types
- Composants : PascalCase. Hooks : `use` prefix. Fichiers : PascalCase ou camelCase
- `cn()` pour combiner classes (clsx + tailwind-merge)
- `cva` pour variantes de composants (Button, Card, Badge)
- `forwardRef` + `displayName` sur composants interactifs
- Mobile-first : styles base = mobile, puis `sm:` → `md:` → `lg:`

## i18n
- Francais uniquement pour le moment, pret pour multi-langue
- ZERO texte en dur — tout via `locales/fr/{common,foot,rugby,handball}.json`
- `getDictionary(locale, section)` pour charger les traductions

## IMPORTANT
- YOU MUST ne modifier QUE les fichiers dans le perimetre demande
- YOU MUST verifier `npm run build` apres chaque modification
- JAMAIS de couleur de marque en dur — CSS variables uniquement
- JAMAIS dupliquer un composant par sport — mutualiser dans `brand/`
- JAMAIS de `<img>` ou `<a>` interne — utiliser `next/image` et `next/link`
- JAMAIS oublier `generateMetadata()` sur les pages publiques
- Respecter `prefers-reduced-motion` sur toutes les animations

## Git
Format : `type(scope): description`
Types : feat | fix | refactor | style | docs | perf | chore
Scopes : platform | foot | rugby | handball | ui | api | config
