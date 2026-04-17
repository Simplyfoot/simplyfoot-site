# Stack technique — details

## Versions installees (verifiees le 2026-04-16)

| Technologie       | Version        | Raison                                        |
| ----------------- | -------------- | --------------------------------------------- |
| Next.js           | 15.5.15        | App Router, React 19 compat, stable           |
| React             | 19.1.0         | Requis par Next 15                            |
| TypeScript        | ^5             | Strict mode absolu                            |
| Tailwind CSS      | ^4             | `@theme inline`, oklch, CSS-first config      |
| shadcn/ui         | v4 (base-nova) | Tokens oklch, `@import "shadcn/tailwind.css"` |
| next-intl         | ^4.9.1         | Routing localise, compat Next 15              |
| React Three Fiber | ^9.6.0         | Compat React 19                               |
| drei              | ^10.7.7        | Helpers R3F (Text, OrbitControls, etc.)       |
| postprocessing    | ^3.0.4         | EffectComposer, Bloom                         |
| Three.js          | ^0.183.2       | Moteur 3D sous R3F                            |
| GSAP              | ^3.15.0        | Animations scroll-based                       |
| Framer Motion     | ^12.38.0       | Animations React declaratives                 |
| Lenis             | ^1.3.23        | Smooth scroll                                 |
| Zustand           | ^5.0.12        | State management                              |
| Zod               | ^4.3.6         | Validation runtime                            |
| React Hook Form   | ^7.72.1        | Formulaires performants                       |

## PostCSS

```javascript
// postcss.config.mjs
{
    plugins: ['@tailwindcss/postcss'];
}
```

Pas d'autoprefixer (gere par @tailwindcss/postcss en v4).

## Outils qualite

| Outil           | Version | Role                             |
| --------------- | ------- | -------------------------------- |
| ESLint          | ^9      | Flat config, jsx-a11y, prettier  |
| Prettier        | ^3.8.3  | Formatage + tri classes Tailwind |
| Husky           | ^9.1.7  | Git hooks                        |
| lint-staged     | ^16.4.0 | Pre-commit selective             |
| commitlint      | ^20.5.0 | Conventional commits             |
| Vitest          | ^4.1.4  | Tests unitaires                  |
| Playwright      | ^1.59.1 | Tests E2E                        |
| Testing Library | ^16.3.2 | Tests composants React           |

## Philosophie

- Server Components par defaut, `'use client'` seulement si necessaire
- Type safety absolue (pas de any)
- i18n des le depart (pas apres coup)
- Accessibilite WCAG AA comme contrainte initiale
- Couleurs via tokens CSS ou `lib/constants.ts` (jamais hardcodees)
