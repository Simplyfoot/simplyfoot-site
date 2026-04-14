---
name: ui-component
description: Creer un primitif design system dans components/ui/, pattern cva forwardRef displayName, zero dependance marque, variantes et etats
---

# Skill : Composant UI (Design System)

## Emplacement

Tous les primitifs UI vont dans `components/ui/`.

## 10 regles absolues

1. **Zero dependance marque** — jamais importer `BrandConfig`
2. **Variantes via `cva`** (class-variance-authority)
3. **`className` accepte** et fusionne via `cn()`
4. **`forwardRef`** si composant interactif (bouton, input, etc.)
5. **`displayName`** defini sur le composant
6. **Types exportes** (`interface ButtonProps`, `export { Button, buttonVariants }`)
7. **Aucun texte en dur** — tout en props
8. **States** : hover, focus-visible, disabled
9. **Couleurs de marque via CSS variable** (`var(--brand-primary)`)
10. **Responsive mobile-first**

## Template — Badge

```typescript
// components/ui/Badge.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        brand: 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        neutral: 'bg-gray-100 text-gray-800',
      },
    },
    defaultVariants: { variant: 'brand' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
Badge.displayName = 'Badge';
export { badgeVariants };
```

## Template — Input avec forwardRef

```typescript
// components/ui/Input.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm',
            'placeholder:text-gray-400',
            'focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
export { Input };
```

## Checklist (10 points)

1. Fichier dans `components/ui/`
2. Aucun import de `BrandConfig` ou config de marque
3. Variantes via `cva`
4. `className` accepte et fusionne via `cn()`
5. `forwardRef` si interactif
6. `displayName` defini
7. Types exportes
8. States hover, focus-visible, disabled geres
9. Couleurs de marque via `var(--brand-primary)` uniquement
10. Accessibilite (aria-*, labels, roles)
