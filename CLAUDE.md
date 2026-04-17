# SIMPLY — Instructions permanentes pour Claude Code

> Ce fichier est lu automatiquement a chaque session. Garde-le concis et actionnable.
> Details et archives vivent dans `.claude/memory/`.

## Identite du projet

Plateforme multi-marques regroupant **SimplyFoot**, **SimplyRugby** et **SimplyHandball** sous la holding **SIMPLY**. Chaque marque a son univers (couleur, culture sportive) mais partage l'infrastructure.

## Stack verrouillee (ne pas devier sans ADR)

- **Next.js 15.5** App Router, React 19.1
- **TypeScript 5** strict absolu (`noUncheckedIndexedAccess`, etc.)
- **Tailwind CSS v4** (`@theme inline`, `@import "tailwindcss"`, PAS de `tailwind.config.ts`)
- **shadcn/ui** v4 (composants copies dans `src/components/ui/`, style `base-nova`, oklch)
- **next-intl v4** (routing localise `[locale]`, `localePrefix: 'as-needed'`)
- **React Three Fiber v9** + drei v10 + postprocessing v3
- **GSAP 3** + `@gsap/react` + Lenis + Framer Motion
- **Zustand 5** (state global), **Zod 4** (validation), **React Hook Form 7**

## Commandes de reference

```bash
npm run dev              # Serveur developpement (Turbopack)
npm run build            # Build production
npm run type-check       # tsc --noEmit
npm run lint             # ESLint flat config
npm run lint:fix         # ESLint autofix
npm run prettier:fix     # Prettier write
npm run prettier:check   # Prettier check
npm run check-all        # type-check + lint + prettier:check
```

**Regle d'or** : `npm run check-all` DOIT passer avant chaque commit.

## Invariants (ne JAMAIS violer)

1. Zero `any`, zero `@ts-ignore`, zero `@ts-expect-error`
2. Zero couleur hex hardcodee dans les composants (toujours via tokens ou `lib/constants.ts`)
3. Zero texte en dur dans les composants publics (toujours via `next-intl`)
4. Zero `console.log` en code livre (uniquement `console.warn` / `console.error`)
5. Zero `export default` dans `src/components/` (sauf composants charges via `next/dynamic`)
6. Chaque composant R3F/Three.js est dans `dynamic()` avec `ssr: false` et fallback
7. Chaque route publique a `generateMetadata`
8. Chaque element interactif a un focus ring visible (WCAG AA)

## Structure de dossiers (resume)

```
src/app/[locale]/            -> Pages (routing localise)
src/app/robots.ts            -> SEO
src/app/sitemap.ts           -> SEO
src/app/manifest.ts          -> PWA
src/components/ui/           -> shadcn primitives
src/components/{shared,3d,simmo,brands,blog}/
src/lib/{brand,simmo,hooks,i18n}/
src/lib/constants.ts         -> Couleurs partagees (pour Three.js / contextes non-CSS)
src/content/{blog,faq}/      -> Donnees statiques
src/config/                  -> Metadonnees, nav, regions
src/messages/{fr,en}.json    -> Traductions
src/types/                   -> Types partages
src/middleware.ts            -> Next-intl routing
```

Details -> `.claude/memory/context/routing-map.md`

## Comment travailler avec moi

### Debut de session

Lis **dans cet ordre** :

1. Ce fichier (CLAUDE.md)
2. `.claude/memory/INDEX.md` (table des matieres)
3. `.claude/memory/iterations/` derniere entree (ou on s'est arrete)
4. L'agent pertinent pour la tache demandee (`.claude/agents/`)

### Pendant la session

- Suis le mandat de l'agent actif
- Consulte `.claude/skills/` pour les procedures repetables
- Si tu decouvres un piege -> cree une entree dans `memory/learnings/`
- Si tu es bloque -> documente dans `memory/blockers/` AVANT de contourner
- Pour toute decision structurelle -> propose un ADR dans `memory/decisions/`

### Fin de session

1. Execute `npm run check-all`
2. Cree une entree dans `memory/iterations/` (template disponible)
3. Mets a jour `memory/INDEX.md` si necessaire

## Contrats d'interaction entre agents

Un agent ne peut modifier que son territoire (voir son fichier `.md`).
Pour sortir de son territoire, il doit :

1. Documenter la raison
2. Appeler l'agent competent (via handoff explicite)
3. Ne JAMAIS modifier silencieusement un fichier hors territoire

## Ce que tu ne dois PAS faire

- Refactoriser en dehors du scope demande
- Ajouter des dependances sans ADR
- Supprimer un fichier sans verifier 2x qu'il n'est importe nulle part
- Modifier `.env*`, `node_modules/`, `.next/`, `public/` sans raison explicite
- Toucher au code admin si la tache concerne le public (et vice-versa)

## En cas de doute

Demande. Ne devine pas. Un message clarificateur vaut mieux qu'une PR ratee.
