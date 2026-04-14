---
name: frontend
description: Server Components vs Client Components, TypeScript strict, data fetching, formulaires React Hook Form + Zod, Server Actions, gestion etat, helper cn(), imports
---

# Skill : Developpeur Frontend Senior

## Server Components par defaut

`'use client'` uniquement si :
- `useState` / `useEffect` / `useRef`
- Evenements DOM (onClick, onChange, etc.)
- APIs navigateur (localStorage, window, etc.)
- Librairies client-only

**Strategie de separation** : si un composant est 80% serveur / 20% interactif, extraire la partie interactive dans un Client Component enfant.

## TypeScript strict

```typescript
// CORRECT — Interfaces pour props
interface HeroSectionProps {
  brand: BrandConfig;
  title: string;
  subtitle: string;
}

// CORRECT — unknown + validation si type inconnu
function process(data: unknown) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) return;
  // utiliser parsed.data
}

// INTERDIT
function process(data: any) {}
```

Regles :
- Aucun `any` — utiliser `unknown` + validation
- Interfaces pour toutes les props
- Types exportes
- Validation Zod sur les inputs externes

## Data Fetching serveur (defaut)

```typescript
export default async function FootPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('brand', 'foot');

  if (error) console.error('Failed:', error);

  return <TestimonialSection testimonials={data ?? []} />;
}
```

## Data Fetching client (si necessaire)

Utiliser `useSWR` pour le cache et la revalidation cote client.

## Server Actions (mutations)

```typescript
'use server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  brand: z.enum(['foot', 'rugby', 'handball']),
  message: z.string().min(10),
});

export async function submitContact(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = createServerClient();
  const { error } = await supabase.from('contacts').insert(parsed.data);
  if (error) {
    return { success: false, errors: { _form: ['Erreur serveur.'] } };
  }

  return { success: true };
}
```

## Formulaires : React Hook Form + Zod

Combiner React Hook Form pour la gestion d'etat du formulaire et Zod pour la validation.

## Gestion d'etat — Ordre de preference

1. **Props** — passer les donnees directement
2. **URL state** — `searchParams`, `useSearchParams`
3. **React Context** — etat partage dans un sous-arbre
4. **Zustand** — dernier recours, etat global complexe

## Helper cn()

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Ordre des imports (strict)

1. React / Next.js
2. Librairies externes
3. Composants (ui → brand → sections)
4. Lib (config → hooks → utils)
5. Types (`import type`)

## Conventions de nommage

| Element | Convention | Exemple |
|---|---|---|
| Composants | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase + `use` | `useBrand.ts` |
| Utilitaires | camelCase | `formatDate.ts` |
| Types | PascalCase + suffixe | `BrandConfig`, `HeroSectionProps` |
| Routes API | kebab-case | `api/contact-form/route.ts` |

## Interdictions

- `console.log` livre en production
- `useEffect` pour data fetching si Server Component possible
- `any` dans le code
- `<a href>` pour liens internes — utiliser `next/link`
- `<img>` — utiliser `next/image`
- Dependances non demandees
- Ignorer le cas `error` des appels Supabase/fetch
- Imports inutilises
