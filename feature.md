<feature_development>
<context>
Application Next.js 15.5 (App Router) + TypeScript strict. Site multi-marques regroupant **SimplyFoot**, **SimplyRugby** et **SimplyHandball** sous la holding **SIMPLY**. Chaque marque a son univers visuel mais partage l'infrastructure, le code et les composants.

Stack technique :

- Next.js 15.5 App Router, React 19.1
- TypeScript 5 strict absolu (`noUncheckedIndexedAccess`, zero `any`, zero `@ts-ignore`)
- Tailwind CSS v4 (`@theme inline`, `@import "tailwindcss"`, PAS de `tailwind.config.ts`)
- shadcn/ui v4 (composants dans `src/shadcn/`, style `base-nova`, oklch)
- next-intl v4 (routing localisé `[locale]`, `localePrefix: 'as-needed'`)
- React Three Fiber v9 + drei v10 + postprocessing v3
- GSAP 3 + `@gsap/react` + Lenis + Framer Motion
- Zustand 5 (state global), Zod 4 (validation), React Hook Form 7
- lucide-react (icônes)

Architecture établie :

- App Router avec routing localisé : `src/app/[locale]/` + segments de marque
- Séparation claire : UI (components) / Logique (lib, services) / i18n (messages, routing)
- Server Components par défaut, `'use client'` uniquement si nécessaire
- Tokens CSS comme seule source de vérité pour les couleurs de marque

Ressources disponibles :

- Composants shadcn : `src/shadcn/` (EXPLORER et UTILISER en priorité)
- Composants partagés : `src/components/shared/`
- Composants 3D : `src/components/3d/`
- Composants par marque : `src/components/brands/`
- Routing i18n : `src/i18n/routing.ts` + `src/i18n/navigation.ts`
- Messages i18n : `src/messages/{fr,en,es}.json`
- Brand registry : `src/lib/brand/`
- Config globale : `src/config/site.ts`
- Helpers i18n metadata : `src/lib/i18n/metadata.ts` (`buildAlternates`)
- Constantes partagées : `src/lib/constants.ts`

**IMPORTANT - Composants shadcn/ui** :

- TOUJOURS vérifier si un composant shadcn existe avant d'en créer un nouveau
- Les composants shadcn sont dans `src/shadcn/` (pas `src/components/ui/`)
- Composants disponibles : accordion, alert, avatar, badge, breadcrumb, button, card, carousel, checkbox, collapsible, command, dialog, drawer, dropdown-menu, form, input, navigation-menu, popover, select, separator, sheet, sidebar, skeleton, table, tabs, textarea, toggle, tooltip, etc.
- PRIORITÉ : composer avec shadcn avant de créer un composant custom
  </context>

<request_format>
Décris la fonctionnalité souhaitée avec :

1. **Objectif** : Que doit faire la fonctionnalité ?
2. **UI/UX** : Comment l'utilisateur interagit-il ? (design attendu, responsive)
3. **Logique** : Quelles règles métier / côté client vs serveur ?
4. **Contenu & i18n** : Quels textes ? Quelles routes à localiser ?
5. **Marques concernées** : foot, rugby, handball, ou toutes ?
6. **SEO** : Metadata, sitemap, alternates à prévoir ?
   </request_format>

<code_standards>
<typescript>
**Règles strictes** :

- TypeScript strict absolu : zero `any`, zero `@ts-ignore`, zero `@ts-expect-error`
- Interfaces pour toutes les props de composants (suffixe `Props`)
- Types pour les fonctions utilitaires et services
- Import explicite : `import type { Metadata } from 'next'` (jamais `import *`)
- Utiliser les types dérivés de `next-intl`, `next`, etc. (pas de duplication de types)

**Conventions de nommage** :

- camelCase : variables, fonctions, props, hooks
- PascalCase : composants, interfaces, types, enums, FICHIERS de composants
- UPPER_SNAKE_CASE : constantes globales (ex. `SIMPLY_LEGAL`, `BRAND_CONTACT`)
- Suffixe `Props` pour props : `MentionsLegalesContentProps`
- Préfixe `use` pour hooks : `useBrandColor`

**Typage des entités** :

- Types partagés dans `src/types/`
- Types de routing : `AppLocale`, `AppPathname` depuis `@/i18n/routing`
- Types de marque : `BrandSlug`, `BrandMeta` depuis `@/lib/brand`

**Type Guards vs Casts explicites** :

- PRÉFÉRER les type guards (`'property' in object`, `typeof x === 'string'`) aux casts (`as Type`)
- Les casts sont acceptables uniquement pour les frontières externes (ex. `router.replace(pathname, { locale: next as AppLocale })`)
  </typescript>

<file_structure>
**Organisation des fichiers** :

```
src/
├── app/                             # App Router
│   ├── [locale]/                    # Racine localisée
│   │   ├── layout.tsx               # Layout racine (NextIntlClientProvider)
│   │   ├── page.tsx                 # Accueil (landing multi-marque)
│   │   ├── foot/                    # Segment marque football
│   │   │   ├── layout.tsx           # Header + Footer + data-brand
│   │   │   ├── page.tsx             # Home foot
│   │   │   ├── legal/
│   │   │   │   └── mentions-legales/page.tsx
│   │   │   └── [...slug]/page.tsx   # Catch-all (404 brand-scoped)
│   │   ├── rugby/
│   │   └── handball/
│   ├── robots.ts                    # SEO
│   ├── sitemap.ts                   # SEO (utilise getPathname pour alternates)
│   └── manifest.ts                  # PWA
│
├── components/
│   ├── shared/                      # Réutilisables cross-marque
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── MobileNav.tsx
│   │   └── legal/
│   ├── 3d/                          # Three.js / R3F (toujours dynamic import)
│   ├── simmo/                       # Mascotte
│   ├── brands/                      # Composants par marque
│   └── blog/
│
├── shadcn/                          # shadcn primitives (NE PAS MODIFIER)
│
├── lib/
│   ├── brand/                       # Brand registry, css-vars
│   ├── i18n/                        # Helpers metadata (buildAlternates)
│   ├── simmo/
│   ├── hooks/
│   ├── constants.ts                 # Couleurs partagées (pour Three.js / JS)
│   └── utils.ts                     # cn(), helpers génériques
│
├── content/                         # Données statiques (blog, faq)
├── config/                          # site.ts, nav, regions
├── messages/                        # fr.json, en.json, es.json (next-intl)
├── types/                           # Types partagés
├── i18n/                            # routing.ts, navigation.ts, request.ts
└── middleware.ts                    # next-intl middleware
```

**Conventions de nommage de fichiers** :

- Composants : PascalCase.tsx (`Header.tsx`, `MentionsLegalesContent.tsx`)
- Helpers : camelCase.ts (`metadata.ts`, `constants.ts`)
- Routes App Router : `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` (convention Next.js)
- Segments dynamiques : `[param]`, `[...slug]`, `[locale]`
- Groupes de route : `(group)` (sans impact sur l'URL)

**INTERDICTIONS** :

- PAS de dossier par composant (ex: `Button/Button.tsx` ❌)
- PAS d'`index.tsx` pour composants (export nommé direct)
- PAS d'`export default` dans `src/components/` (sauf composants chargés via `next/dynamic`)
- DANS `src/app/` : `export default` obligatoire pour pages/layouts (requis par Next.js)
- PAS de kebab-case pour les fichiers de composants
  </file_structure>

<component_structure>
**Ordre strict dans un fichier composant** :

1. Directive (`'use client'` ou `'use server'` si nécessaire) EN PREMIÈRE LIGNE
2. Imports (groupés et ordonnés — voir `<imports_conventions>`)
3. Interfaces TypeScript (props)
4. Sous-composants si nécessaire
5. Composant principal (export nommé)

**Server vs Client Components** :

- Par DÉFAUT : server component (async possible, `getTranslations`)
- Ajouter `'use client'` UNIQUEMENT si :
    - Hooks React (`useState`, `useEffect`, `useTransition`, etc.)
    - Event handlers (`onClick`, `onChange`)
    - Hooks next-intl côté client (`useTranslations`, `useLocale`, `usePathname`, `useRouter`)
    - Browser APIs (`window`, `document`, `localStorage`)
    - Librairies client-only (GSAP interactions, Three.js, Framer Motion)

**Client components** : minimiser la surface client. Extraire la logique interactive dans un composant client dédié et garder le reste en server component.

**Composants 3D / Three.js** :

- TOUJOURS dans `next/dynamic` avec `ssr: false` et `fallback`
- Exception à la règle no-default-export : ces composants PEUVENT utiliser `export default` pour simplifier le dynamic import
  </component_structure>

<imports_conventions>
**Ordre des imports** :

1. React (`type ReactNode`, `useState`, `useEffect`, etc.)
2. Next.js (`next/image`, `next/link`, `next/dynamic`, `type Metadata`)
3. Librairies externes (classées) :
    - next-intl (`useTranslations`, `getTranslations`, `useLocale`)
    - lucide-react (icônes)
    - @tanstack/react-query
    - react-hook-form, zod
    - gsap, framer-motion, @react-three/fiber
4. `@/components/shared/...`
5. `@/components/...` (autres)
6. `@/shadcn/...`
7. `@/i18n/...`
8. `@/lib/...`
9. `@/config/...`
10. `@/types/...`

**Règles** :

- Séparer les groupes par une ligne vide
- `import type` pour les imports type-only
- Utiliser `Link` de `@/i18n/navigation` (PAS `next/link`) pour tous les liens internes
- Utiliser `useRouter` / `usePathname` de `@/i18n/navigation` (PAS `next/navigation`)
- `useLocale` / `useTranslations` depuis `next-intl` directement
- `getTranslations` / `setRequestLocale` depuis `next-intl/server`
  </imports_conventions>

<styling_with_tailwind>
**Tailwind v4 (PAS de `tailwind.config.ts`)** :

- Configuration via `@theme inline` dans le CSS
- Tokens de marque exposés via `[data-brand="..."]` dans `src/styles/themes/` et appliqués au layout de marque

**Utiliser `cn()`** depuis `@/lib/utils` pour merger des classes conditionnelles.

**Couleurs** :

- `primary-50` à `primary-950` : couleur de marque active (change selon `data-brand`)
- `secondary-*` : couleur complémentaire de marque
- `background`, `foreground`, `muted`, `muted-foreground`, `card`, `border`, `ring`, `accent`, `destructive` : tokens shadcn (thème clair/sombre)

**INTERDICTIONS** :

- ZERO couleur hex/rgb hardcodée dans les composants (toujours via tokens ou `lib/constants.ts` pour les contextes non-CSS comme Three.js)
- ZERO couleur nommée Tailwind (`blue-500`, `red-600`) : utiliser les tokens sémantiques ou les tokens primary/secondary
- Pas de `style={{ ... }}` inline pour des couleurs (sauf exception justifiée dans `lib/constants.ts`)

**Responsive** :

- Mobile-first : styles par défaut = mobile, breakpoints ajoutent des styles desktop
- Breakpoints Tailwind : `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- Préférer `md:` comme pivot desktop (768px+)

**Focus / Accessibilité** :

- CHAQUE élément interactif DOIT avoir un focus ring visible (WCAG AA)
- Utiliser `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`
  </styling_with_tailwind>

<internationalization>
**Stack : next-intl v4 avec routing localisé**

**3 locales** : `fr` (défaut, pas de préfixe), `en`, `es`. `localePrefix: 'as-needed'`.

**TEXTE : ZÉRO texte en dur dans les composants publics** — tout passe par `next-intl`.

**Dans les server components** :

```ts
import { getTranslations } from 'next-intl/server';

const t = await getTranslations('Namespace');
const t = await getTranslations({ locale, namespace: 'Namespace' }); // pour generateMetadata
```

**Dans les client components** :

```ts
import { useTranslations } from 'next-intl';
const t = useTranslations('Namespace');
```

**Fichiers de traduction** : `src/messages/{fr,en,es}.json`. Toute clé ajoutée en FR DOIT exister dans EN et ES, sinon build cassé.

**Interpolation** : `t('key', { brand: 'SimplyFoot' })` avec `{brand}` dans la valeur JSON.

**ROUTES LOCALISÉES (SEO critique)** :

- Les pathnames sont déclarés dans `src/i18n/routing.ts` au format `{ fr, en, es }` pour produire des URLs traduites :
    ```ts
    '/foot/legal/mentions-legales': {
        fr: '/foot/legal/mentions-legales',
        en: '/foot/legal/legal-notice',
        es: '/foot/legal/aviso-legal',
    }
    ```
- Les noms de marque (`foot`, `rugby`, `handball`) sont des **noms propres** et ne se traduisent JAMAIS
- Les slugs de contenu (`about`, `contact`, `mentions-legales`, etc.) DOIVENT être traduits
- Dans les `<Link href="...">` : utiliser la clé canonique (valeur FR par défaut), next-intl résout vers la locale active

**Quand ajouter une nouvelle route** :

1. Créer la page `src/app/[locale]/<segment>/page.tsx`
2. Déclarer le pathname localisé dans `src/i18n/routing.ts`
3. Ajouter dans `src/app/sitemap.ts` pour l'indexation Google
4. Implémenter `generateMetadata` avec `buildAlternates(href, locale)` pour les `<link rel="alternate" hreflang>`

**Metadata avec alternates** :

```ts
import { buildAlternates } from '@/lib/i18n/metadata';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MyPage.meta' });
    return {
        title: t('title'),
        description: t('description'),
        alternates: buildAlternates('/canonical/path', locale),
    };
}
```

</internationalization>

<seo>
**Référencement Google — exigences systématiques** :

1. **`generateMetadata` sur CHAQUE route publique** :
    - `title` et `description` via i18n (par locale)
    - `alternates` via `buildAlternates` (canonical + hreflang pour les 3 locales + `x-default`)
    - `openGraph` si contenu partageable
    - Pas de `robots: 'noindex'` sauf justification explicite

2. **Sitemap** (`src/app/sitemap.ts`) :
    - Toute nouvelle route publique DOIT y être ajoutée
    - Les alternates par locale sont générés automatiquement via `getPathname`

3. **Structure sémantique** :
    - `<h1>` UNIQUE par page, textuel, avec le sujet de la page
    - Hiérarchie `<h2>` → `<h3>` cohérente, pas de saut de niveau
    - `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>` utilisés à bon escient
    - `<nav aria-label="...">` nommé quand plusieurs nav sur la page

4. **Liens** :
    - Utiliser `<Link>` de `@/i18n/navigation` pour tous les liens internes (pas `<a>`)
    - `<a target="_blank">` DOIT avoir `rel="noopener noreferrer"`
    - Ancres de section : `id` sur les `<section>` (permet deep-link + table des matières)

5. **Images** :
    - `next/image` obligatoire (pas `<img>`)
    - `alt` descriptif (ou `alt=""` + `aria-hidden` si purement décoratif)
    - `priority` sur les images au-dessus du fold
    - `width`/`height` explicites pour éviter le CLS

6. **Performance** :
    - Composants 3D / heavy uniquement en `dynamic()` avec `ssr: false`
    - Pas de JS client inutile : server components par défaut
    - Fonts via `next/font`

7. **robots.txt** : `src/app/robots.ts` déjà en place, pas bloquer les routes de production
   </seo>

<accessibility>
**WCAG AA minimum — exigences systématiques** :

1. **Focus visible** :
    - CHAQUE élément interactif (`<button>`, `<a>`, `<input>`, etc.) DOIT avoir un focus ring visible
    - Utiliser `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`
    - Ne JAMAIS supprimer l'outline sans alternative

2. **Navigation clavier** :
    - Tab order logique (suivre le flux visuel)
    - Escape ferme les modals / drawers / menus
    - Enter / Space activent boutons et liens
    - Flèches naviguent dans les menus (géré par Radix dans shadcn)

3. **Labels et descriptions** :
    - CHAQUE `<input>` DOIT avoir un `<label>` associé ou un `aria-label`
    - `<button>` sans texte → `aria-label` obligatoire (ex. bouton icône)
    - `<Image alt="">` descriptif, ou `alt=""` + `aria-hidden="true"` si décoratif
    - Boutons d'icône : `aria-label` traduit via i18n

4. **Rôles et états** :
    - `<nav aria-label="...">` pour nommer les navigations
    - `aria-expanded`, `aria-controls` sur les triggers de menus/drawers
    - `aria-current="page"` sur le lien actif
    - `aria-hidden="true"` sur les icônes décoratives (lucide par défaut)
    - Utiliser les composants shadcn/Radix → gèrent la plupart des ARIA nativement

5. **Contraste** :
    - Texte vs fond : ratio minimum 4.5:1 (AA normal), 3:1 (AA large)
    - Vérifier `text-primary-foreground` sur `bg-primary-600`, etc.
    - Ne pas baisser l'opacité en dessous de 70% pour du texte

6. **Tailles de touch** :
    - Zones cliquables minimum 44×44px sur mobile
    - `size="sm"` sur mobile → vérifier que ça reste tappable (utiliser `size="icon"` avec padding si besoin)

7. **Réduction de mouvement** :
    - Animations GSAP / Framer / CSS doivent respecter `prefers-reduced-motion`
    - Wrapper : `useReducedMotion()` de Framer Motion ou media query CSS

8. **Validation systématique** :
    - Lighthouse Accessibility ≥ 95 sur chaque page publique
    - Tester au clavier : Tab, Shift+Tab, Enter, Escape, flèches
      </accessibility>

<shadcn_components_priority>
**Règle d'or : EXPLORER `src/shadcn/` AVANT de créer un composant**

Avant de créer un nouveau composant, VÉRIFIE :

1. Existe-t-il un composant shadcn équivalent dans `src/shadcn/` ?
2. Si oui, UTILISE-LE en priorité
3. Si non, peut-on le composer à partir de plusieurs composants shadcn ?
4. Si non, DEMANDE confirmation avant de créer un composant custom

**Composants shadcn disponibles** (liste non-exhaustive) :

- Layout : `Separator`, `ScrollArea`, `ResizablePanelGroup`, `AspectRatio`
- Typography : `(natif via Tailwind)`
- Inputs : `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Switch`, `Slider`, `InputOTP`, `Calendar`
- Buttons : `Button`, `Toggle`, `ToggleGroup`
- Feedback : `Alert`, `Sonner` (toasts), `Progress`, `Spinner`, `Skeleton`
- Overlay : `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, `Popover`, `Tooltip`, `HoverCard`, `ContextMenu`, `DropdownMenu`, `Menubar`, `Command`
- Data Display : `Avatar`, `Badge`, `Card`, `Table`, `Empty`, `Item`, `Kbd`
- Navigation : `NavigationMenu`, `Tabs`, `Breadcrumb`, `Pagination`, `Sidebar`
- Forms : `Form` (wrap react-hook-form), `Label`, `Field`
- Utils : `Collapsible`, `Accordion`, `Carousel`, `Chart`, `Direction`

**Quand créer un composant custom** :

- Composition de plusieurs primitives shadcn avec logique métier (ex. `LanguageSwitcher`, `MobileNav`)
- Composant propre au domaine SIMPLY / marque (ex. `SimmoMascot`, `BrandHero`)
- Variante visuelle très spécifique non couverte

**Processus de décision** :

```
Besoin d'un composant ?
  ↓
Existe dans shadcn ? → OUI → UTILISER shadcn
  ↓ NON
Composition shadcn possible ? → OUI → Créer dans shared/ ou brands/
  ↓ NON
DEMANDER confirmation avant custom
```

**JAMAIS modifier** les fichiers dans `src/shadcn/` (hors mise à jour shadcn CLI).
</shadcn_components_priority>

<dry_principle>
**Principe DRY — APPLIQUER RIGOUREUSEMENT**

Avant d'écrire du code, TOUJOURS se demander :

- Y a-t-il des patterns similaires que je peux fusionner ?
- Puis-je utiliser des clés i18n dynamiques au lieu de conditions multiples ?
- Une seule fonction peut-elle gérer plusieurs cas (brand, locale, etc.) ?
- Le composant peut-il être partagé entre les 3 marques via props ?

**Exemple — factoriser entre marques** :

**MAUVAIS** (3 composants quasi-identiques par marque) :

```tsx
// src/components/foot/FootMentionsLegales.tsx
// src/components/rugby/RugbyMentionsLegales.tsx
// src/components/handball/HandballMentionsLegales.tsx
```

**BON** (un composant partagé + prop brand) :

```tsx
// src/components/shared/legal/MentionsLegalesContent.tsx
interface Props { brand: BrandSlug }
export async function MentionsLegalesContent({ brand }: Props) { ... }

// src/app/[locale]/foot/legal/mentions-legales/page.tsx
<MentionsLegalesContent brand="foot" />
```

**Exemple — clés i18n dynamiques** :

**MAUVAIS** (switch / if-else) :

```tsx
if (key === 'presentation') text = t('sections.presentation.body');
else if (key === 'object') text = t('sections.object.body');
// ...
```

**BON** (clé dynamique dans une boucle) :

```tsx
{
    sectionKeys.map((key) => (
        <section id={key}>
            <h2>{t(`sections.${key}.title`)}</h2>
            <p>{t(`sections.${key}.body`)}</p>
        </section>
    ));
}
```

**Exemple — réutilisation de config partagée** :

- `SIMPLY_LEGAL` (capital, RCS, TVA, adresse) dans `src/config/site.ts` — utilisé par Footer, mentions légales, CGV, etc.
- `BRAND_CONTACT[brand]` pour email / téléphone / socials par marque
- `BRANDS[brand]` pour label / emoji / metadata par marque

**Checklist avant de valider du code** :

- [ ] Pas de composants quasi-identiques par marque → factoriser avec prop `brand`
- [ ] Pas de blocs if/else sur la locale ou la marque → utiliser clés i18n dynamiques / tables
- [ ] Pas de duplication de couleurs/valeurs → pointer vers `SIMPLY_LEGAL`, `BRAND_CONTACT`, tokens CSS
- [ ] Pas de composants custom quand shadcn suffit
- [ ] `generateMetadata` factorisé via `buildAlternates`, pas réécrit à la main
      </dry_principle>

<brand_system>
**Système multi-marques** :

- 3 marques : `foot` ⚽, `rugby` 🏉, `handball` 🤾
- Slug : `BrandSlug = 'foot' | 'rugby' | 'handball'`
- Registry : `BRANDS` dans `src/lib/brand/registry.ts` (label, name, emoji)
- Layouts par marque : `src/app/[locale]/<brand>/layout.tsx` pose `data-brand="<brand>"` sur un wrapper
- Couleurs par marque : CSS dans `src/styles/themes/<brand>.css` (vars exposées via `[data-brand="..."]`)
- `src/lib/brand/css-vars.ts` : hooks / helpers pour lire les couleurs CSS depuis JS (Three.js, Canvas)

**Règles** :

- Un composant partagé prend `brand: BrandSlug` en prop
- Les couleurs sont UNIQUEMENT via tokens Tailwind (`bg-primary-600`) → s'adaptent automatiquement via `data-brand`
- JAMAIS de logique `if brand === 'foot'` pour les couleurs → utiliser les tokens
- Le contenu textuel peut différer par marque via `BRANDS[brand].label` ou des traductions spécifiques
  </brand_system>

<metadata_and_routing>
**generateMetadata systématique** :

```ts
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MyPage.meta' });
    return {
        title: t('title'),
        description: t('description'),
        alternates: buildAlternates('/canonical/path', locale),
    };
}
```

**Pages de layout** :

```ts
export default async function MyPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale); // CRITIQUE : permet le rendu statique
    return <main>...</main>;
}
```

**Déclaration d'une nouvelle route localisée** :

1. Ajouter l'entrée dans `routing.ts` :
    ```ts
    '/foot/new-page': {
        fr: '/foot/nouvelle-page',
        en: '/foot/new-page',
        es: '/foot/nueva-pagina',
    }
    ```
2. Créer `src/app/[locale]/foot/new-page/page.tsx`
3. Ajouter à `src/app/sitemap.ts`
4. Traduire les textes dans `fr/en/es.json`

**Liens internes** :

```tsx
import { Link } from '@/i18n/navigation';
<Link href="/foot/new-page">...</Link>; // Résolu vers la locale active
```

</metadata_and_routing>

<forms_with_react_hook_form>
**Stack** : React Hook Form 7 + Zod 4 + shadcn `Form`.

**Pattern** :

```tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/form';
import { Input } from '@/shadcn/input';
import { Button } from '@/shadcn/button';

const schema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
    const t = useTranslations('ContactForm');
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: '', name: '' },
    });

    const onSubmit = async (values: FormValues) => { ... };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('emailLabel')}</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit">{t('submit')}</Button>
            </form>
        </Form>
    );
}
```

**Règles** :

- Schéma Zod déclaré hors composant (constant)
- `defaultValues` explicites
- Messages d'erreur via i18n (passer un `errorMap` Zod ou utiliser `.refine` avec clés traduites)
- Validation côté client ET serveur (ne jamais faire confiance au client seul pour la logique métier)
  </forms_with_react_hook_form>

<data_fetching>
**Server Components (par défaut)** :

- `fetch()` natif Next.js avec caching auto
- Pas de React Query côté serveur
- `async` dans le composant

**Client Components (si nécessaire)** :

- `@tanstack/react-query` pour les mutations et données dynamiques
- `useQuery` pour la lecture, `useMutation` pour l'écriture
- `QueryClientProvider` à poser dans le layout client

**Règle** : privilégier server components quand possible pour les perfs et le SEO.
</data_fetching>

<state_management>
**Zustand** pour l'état global côté client :

- UN store par domaine fonctionnel
- Pas de store si un contexte ou une prop suffit
- Stores dans `src/lib/hooks/` ou `src/stores/` (à convenir selon croissance)

**Avant de créer un nouveau store, DEMANDER validation avec justification**.

**URL state** : privilégier `searchParams` et `router.replace` pour l'état navigable.
</state_management>

<formatting>
**Prettier + ESLint** :
- Configuration déjà définie (Tailwind plugin, import order)
- Indentation 4 espaces
- Single quotes
- Trailing commas
- Semi-colons

**Commentaires** :

- EN FRANÇAIS dans la documentation/commentaires métier (le projet est français)
- EN ANGLAIS pour les commentaires techniques génériques
- Uniquement si nécessaire pour expliquer le POURQUOI
- JSDoc pour les fonctions utilitaires publiques complexes

**INTERDIT** :

- Commentaires évidents (`// boucle sur les items`, `// retourne le résultat`)
- Commentaires qui décrivent CE QUE le code fait au lieu de POURQUOI
- `console.log` en code livré (uniquement `console.warn` / `console.error`)

**Commandes de vérification** :

```bash
npm run type-check     # tsc --noEmit
npm run lint           # ESLint
npm run lint:fix       # ESLint --fix
npm run prettier:fix   # Prettier --write
npm run prettier:check # Prettier --check
npm run check-all      # type-check + lint + prettier:check
```

**Règle d'or** : `npm run check-all` DOIT passer avant chaque commit.
</formatting>

<error_handling>
**Next.js App Router** :

- `error.tsx` pour les erreurs à un niveau de route (client component)
- `not-found.tsx` pour les 404 brand-scoped
- `loading.tsx` pour les états de chargement

**Validation** :

- Zod à chaque frontière (formulaires, API routes, parsing externe)
- Pas de validation sur l'état interne si TypeScript garantit le type

**Guards** :

- `hasLocale(routing.locales, locale)` + `notFound()` pour les locales invalides
- Type guards pour les unions discriminées
  </error_handling>

<invariants>
**À NE JAMAIS violer (rappel critique)** :

1. Zero `any`, zero `@ts-ignore`, zero `@ts-expect-error`
2. Zero couleur hex hardcodée dans les composants
3. Zero texte en dur dans les composants publics (toujours via next-intl)
4. Zero `console.log` en code livré
5. Zero `export default` dans `src/components/` (sauf composants 3D via `next/dynamic`)
6. Chaque composant R3F/Three.js est dans `dynamic()` avec `ssr: false` et fallback
7. Chaque route publique a `generateMetadata` avec `buildAlternates`
8. Chaque élément interactif a un focus ring visible (WCAG AA)
9. Chaque nouvelle clé i18n existe en FR + EN + ES (sinon build cassé)
10. Chaque nouvelle route est déclarée dans `routing.ts` (pathnames localisés) ET `sitemap.ts`
    </invariants>
    </code_standards>

<development_workflow>
<feature_implementation_steps>

1. **Analyse** : Comprendre le besoin, identifier marques concernées, locales impactées, SEO
2. **Exploration** : Chercher composants shadcn / helpers / patterns existants avant de créer
3. **Architecture** : Décider server vs client, composants partagés vs par marque
4. **Routes & i18n** : Déclarer pathnames localisés dans `routing.ts`, clés i18n dans les 3 JSON
5. **Composants** : Composer à partir de shadcn, extraire dans `shared/` si réutilisable
6. **Pages** : Implémenter `page.tsx` + `generateMetadata` avec `buildAlternates`
7. **SEO** : Ajouter au `sitemap.ts`, vérifier `<h1>` unique et hiérarchie
8. **Accessibilité** : Focus ring, aria-label, navigation clavier, contrastes
9. **Vérification** : `npm run check-all` + test manuel FR/EN/ES + mobile/desktop
   </feature_implementation_steps>

<file_creation_order>

1. Types (`src/types/`) si nouveaux
2. Traductions (`src/messages/{fr,en,es}.json`)
3. Routing pathnames (`src/i18n/routing.ts`)
4. Helpers / lib (`src/lib/`) si nouveaux
5. Composants shared (`src/components/shared/`)
6. Composants par marque si spécifiques (`src/components/brands/`)
7. Pages (`src/app/[locale]/...`)
8. Sitemap (`src/app/sitemap.ts`)
   </file_creation_order>
   </development_workflow>

<output_format>
**ACTION PAR DÉFAUT : APPLIQUER LES MODIFICATIONS AUTOMATIQUEMENT**

Pour chaque fichier à créer ou modifier, APPLIQUE directement les changements.

**EXCEPTIONS — Demander confirmation AVANT d'appliquer** :

1. Création d'un nouveau store global (Zustand)
2. Création d'un nouveau namespace i18n majeur
3. Modification du `routing.ts` pour ajouter/retirer des locales
4. Modification de fichiers de config (`next.config.ts`, `tsconfig.json`, `package.json`, `.env*`)
5. Ajout d'une dépendance npm (demander et proposer un ADR)
6. Suppression de fichiers (vérifier 2× qu'ils ne sont importés nulle part)
7. Modifications qui touchent plusieurs marques en même temps

Pour ces cas, AFFICHE d'abord le plan et DEMANDE confirmation.

**Structure de réponse** :

1. Bref résumé de l'implémentation (2-3 lignes)
2. Application directe des modifications
3. Explications uniquement si logique complexe
4. `npm run check-all` à la fin si le code touche au TS/lint/format

**Règles** :

- Minimiser la répétition de code dans les réponses
- Code et commentaires en français (métier) ou anglais (technique générique)
- Respecter l'ordre des imports et la structure des fichiers
- Toujours livrer un état qui passe `check-all`
  </output_format>

<checklist_pre_commit>
Avant de considérer une feature terminée :

- [ ] `npm run check-all` passe (type-check + lint + prettier)
- [ ] Textes traduits en FR, EN et ES (pas de clé manquante)
- [ ] Routes publiques nouvelles déclarées dans `routing.ts` (pathnames localisés)
- [ ] Routes publiques nouvelles ajoutées au `sitemap.ts`
- [ ] `generateMetadata` avec `buildAlternates` sur chaque page publique
- [ ] `<h1>` unique et hiérarchie de titres cohérente
- [ ] Tous les éléments interactifs ont un focus ring visible
- [ ] Tous les boutons/liens sans texte visible ont un `aria-label` traduit
- [ ] Images via `next/image` avec `alt` descriptif
- [ ] Composants 3D en `dynamic()` avec `ssr: false` + fallback
- [ ] Pas de composant custom quand un shadcn suffit
- [ ] Pas de code dupliqué entre marques (factoriser avec prop `brand`)
- [ ] Testé visuellement en desktop ET mobile (< 768px)
- [ ] Testé au clavier (Tab, Enter, Escape)
- [ ] Testé dans les 3 locales (FR, EN, ES)
      </checklist_pre_commit>
      </feature_development>
