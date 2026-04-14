---
name: design-system
description: Tokens de design, CSS custom properties, palettes couleur 50-950, composants UI pattern avec cva, typographie, espacements, icones Lucide, animations Framer Motion
---

# Skill : Design System Engineer

## Hierarchie des composants

| Dossier | Role | Dependance marque |
|---|---|---|
| `components/ui/` | Primitifs design system | Zero — 100% agnostique |
| `components/brand/` | Composants mutualises | Accepte `BrandConfig` en props |
| `components/sections/` | Sections reutilisables | Compose ui/ et brand/ |
| `components/platform/` | Header, Footer, BrandSelector | Niveau plateforme |

## Pattern composant UI obligatoire

```typescript
// components/ui/Button.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-dark)]',
        secondary: 'border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10',
        ghost: 'hover:bg-gray-100 text-gray-700',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
);
Button.displayName = 'Button';
export { Button, buttonVariants };
```

## Checklist composant UI (10 points)

1. `forwardRef` si composant interactif
2. Types exportes (`interface ButtonProps`)
3. Variantes via `cva` (class-variance-authority)
4. `className` accepte et fusionne via `cn()`
5. `displayName` defini
6. Aucune couleur en dur — CSS variables uniquement
7. Aucun texte en dur
8. Aucun import de `BrandConfig`
9. States : hover, focus-visible, disabled
10. Responsive mobile-first

## Systeme de couleurs — CSS Custom Properties

### Definition dans `styles/globals.css`

```css
:root {
  --brand-primary: #1a1a2e;
  --brand-primary-light: #2d2d4a;
  --brand-primary-dark: #0f0f1a;
  --brand-accent: #6366f1;
  --brand-gradient: linear-gradient(135deg, #1a1a2e 0%, #6366f1 100%);
}

[data-brand="foot"] {
  --brand-primary: #1B5E20;
  --brand-primary-light: #2E7D32;
  --brand-primary-dark: #0D3B12;
  --brand-accent: #66BB6A;
  --brand-gradient: linear-gradient(135deg, #1B5E20 0%, #66BB6A 100%);
}

[data-brand="rugby"] {
  --brand-primary: #1A237E;
  --brand-primary-light: #283593;
  --brand-primary-dark: #0D1259;
  --brand-accent: #5C6BC0;
  --brand-gradient: linear-gradient(135deg, #1A237E 0%, #5C6BC0 100%);
}

[data-brand="handball"] {
  --brand-primary: #E65100;
  --brand-primary-light: #EF6C00;
  --brand-primary-dark: #BF360C;
  --brand-accent: #FFA726;
  --brand-gradient: linear-gradient(135deg, #E65100 0%, #FFA726 100%);
}
```

### Application via `data-brand`

```typescript
// app/(brands)/layout.tsx
export default function BrandLayout({ children, params }: {
  children: React.ReactNode;
  params: { sport: string };
}) {
  return <div data-brand={params.sport}>{children}</div>;
}
```

### Utilisation dans les composants

```typescript
// CORRECT
<div className="bg-[var(--brand-primary)] text-white">
<div className="hover:bg-[var(--brand-primary-dark)]">

// INTERDIT
<div className="bg-green-800">
<div className={brand.id === 'foot' ? 'bg-green-800' : 'bg-blue-900'}>
```

## Typographie

| Element | Font | Mobile | Desktop | Poids |
|---|---|---|---|---|
| H1 Hero | `font-display` | `text-3xl` | `lg:text-6xl` | `font-bold` |
| H2 Section | `font-display` | `text-2xl` | `lg:text-4xl` | `font-bold` |
| H3 | `font-display` | `text-xl` | `lg:text-2xl` | `font-semibold` |
| Body | `font-sans` | `text-base` | `lg:text-lg` | `font-normal` |

## Espacements standards

| Usage | Classes |
|---|---|
| Entre sections | `py-16 lg:py-24` |
| Padding section | `px-4 sm:px-6 lg:px-8` |
| Container | `max-w-7xl mx-auto` |
| Gap grille | `gap-6 lg:gap-8` |

## Icones

Lucide React uniquement. Aucun melange de librairies d'icones.

## Animations

Framer Motion uniquement :
- `whileInView` avec `once: true`
- Duree max 0.8s
- Stagger 0.1s entre elements
- Respecter `prefers-reduced-motion`

## Interdictions

- `ButtonFoot.tsx` / `ButtonRugby.tsx` — un seul composant parametre
- `!important` dans les styles
- `style={{}}` inline
- Melange de librairies d'icones
- Espacement arbitraire `mt-[37px]`
