---
name: landing-section
description: Creer une section reutilisable Hero Features CTA Stats FAQ Testimonials Pricing pour landing pages, pattern Framer Motion whileInView
---

# Skill : Section de Landing Page

## Emplacement

`components/sections/`

## Procedure

1. Verifier si une section similaire existe deja dans `sections/`
2. Si oui → adapter. Si non → creer.
3. Contenu dynamique via props
4. Container : `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
5. Padding : `py-16 lg:py-24`
6. Responsive mobile-first
7. Animation Framer Motion `whileInView` `once: true`, stagger `0.1s`
8. Variantes : `light` (bg-white), `dark` (bg-gray-900), `brand` (bg-[var(--brand-primary)])

## Template — StatsSection

```typescript
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { BrandConfig } from '@/lib/config/brands';

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  brand: BrandConfig;
  stats: Stat[];
  variant?: 'light' | 'dark' | 'brand';
  className?: string;
}

const variantStyles = {
  light: 'bg-white text-gray-900',
  dark: 'bg-gray-900 text-white',
  brand: 'bg-[var(--brand-primary)] text-white',
};

export function StatsSection({ brand, stats, variant = 'light', className }: StatsSectionProps) {
  return (
    <section className={cn('py-16 lg:py-24', variantStyles[variant], className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-bold lg:text-5xl">
                {stat.value}
              </p>
              <p className={cn(
                'mt-2 text-sm lg:text-base',
                variant === 'light' ? 'text-gray-600' : 'text-white/80'
              )}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 9 regles de construction

1. `'use client'` uniquement si animations Framer Motion ou interactivite
2. Container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
3. Padding `py-16 lg:py-24`
4. Grille responsive `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`
5. Animations `whileInView` avec `viewport={{ once: true }}`
6. Stagger entre elements : `delay: index * 0.1`
7. Duree max animation : 0.8s
8. Variantes `light` / `dark` / `brand`
9. Contenu 100% en props

## Catalogue de sections

| Section | Props cles | Variantes |
|---|---|---|
| `HeroSection` | title, subtitle, ctaLabel, ctaHref, image | centered, split, fullwidth |
| `FeatureGrid` | features[] (icon, title, description) | avec icone, avec image, compact |
| `CTASection` | title, subtitle, ctaLabel, ctaHref | light, dark, brand |
| `TestimonialSection` | testimonials[] (quote, name, role, club) | carousel, grid, featured |
| `StatsSection` | stats[] (value, label) | light, dark, brand |
| `FAQSection` | faqs[] (question, answer) | accordion |
| `PricingSection` | plans[] (name, price, features) | 2 cols, 3 cols |
| `BrandSelector` | brands[] (id, name, description) | cards, tabs |

## Checklist (10 points)

1. Emplacement correct (`components/sections/`)
2. `BrandConfig` en prop
3. Contenu en props (pas hardcode)
4. Container et padding standards
5. Responsive mobile-first
6. Animations Framer Motion `whileInView` `once: true`
7. Variantes visuelles (light/dark/brand)
8. `className` pour surcharge
9. Types exportes
10. Test mental 3 marques
