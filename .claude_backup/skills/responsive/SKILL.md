---
name: responsive
description: Patterns mobile-first Tailwind, breakpoints sm md lg xl, grilles adaptatives, touch targets 44px, typographie responsive, tests mentaux 4 tailles
---

# Skill : Responsive Mobile-First

## Principe fondamental

Le style de base = mobile. On ajoute ensuite les breakpoints pour agrandir.

```typescript
// CORRECT — Mobile-first
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

// INTERDIT — Desktop-first
<div className="grid grid-cols-3 max-sm:grid-cols-1">
```

## Breakpoints Tailwind

| Breakpoint | Pixels | Usage |
|---|---|---|
| base | 0px | Mobile (defaut) |
| `sm:` | 640px | Grand mobile / petit tablet |
| `md:` | 768px | Tablette |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Grand desktop |
| `2xl:` | 1536px | Tres grand ecran |

## Patterns par composant

### Hero

```typescript
// Centre sur mobile, split sur desktop
<section className="py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="text-center lg:text-left">
        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-base text-gray-600 lg:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
          {/* CTA full-width mobile, auto desktop */}
        </div>
      </div>
      <div className="order-first lg:order-last">
        {/* Image */}
      </div>
    </div>
  </div>
</section>
```

### Grille

```typescript
// 1 col → 2 cols → 3 cols
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
```

### Navigation

```typescript
// Hamburger mobile, barre complete desktop
<nav className="flex items-center justify-between">
  <div className="lg:hidden">{/* Bouton hamburger */}</div>
  <div className="hidden lg:flex lg:items-center lg:gap-8">
    {/* Liens navigation */}
  </div>
</nav>
```

### Typographie responsive

```typescript
<h1 className="text-3xl font-bold sm:text-4xl lg:text-6xl">
<h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
<p className="text-base lg:text-lg">
```

### Espacements responsive

```typescript
// Sections
<section className="py-16 lg:py-24">
// Container
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// Gaps
<div className="gap-6 lg:gap-8">
```

## Touch targets

Minimum 44x44px pour tous les elements interactifs sur mobile :

```typescript
<button className="min-h-[44px] min-w-[44px] px-4 py-2">
<a className="inline-flex min-h-[44px] items-center px-4 py-2">
```

## Images responsive

```typescript
import Image from 'next/image';

<Image
  src="/images/foot/hero.webp"
  alt="Description"
  width={1200}
  height={630}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="h-auto w-full rounded-xl"
/>
```

## Tests mentaux — 4 tailles

Avant livraison, verifier mentalement le rendu a :
1. **375px** — iPhone SE (mobile standard)
2. **768px** — iPad (tablette)
3. **1024px** — Laptop
4. **1440px** — Desktop large

## Interdictions

1. Desktop-first (`max-sm:`, `max-md:`)
2. `h-screen` bloquant le contenu
3. Largeurs fixes en pixels (`w-[500px]`)
4. Texte trop petit sur mobile (< `text-sm`)
5. Elements debordant horizontalement
6. Touch targets < 44px
7. Grilles qui ne s'adaptent pas
8. Images sans `sizes` attribute
