---
name: supabase
description: Clients Supabase browser et serveur, schema website isole, RLS policies, API Routes avec Zod, Server Actions mutations, variables environnement
---

# Skill : Data & Backend (Supabase)

## Architecture des clients

Fichiers dans `lib/supabase/` :
- `client.ts` — Client browser
- `server.ts` — Client serveur
- `admin.ts` — Client admin (scripts uniquement)
- `types.ts` — Types auto-generes
- `helpers/` — Queries/mutations reutilisables

### Client browser

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### Client serveur

```typescript
// lib/supabase/server.ts
import { createServerClient as _createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerClient() {
  const cookieStore = cookies();
  return _createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(c) {
          try {
            c.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
```

## Conventions de schema

- Tables : `snake_case` pluriel (`contact_submissions`, `testimonials`)
- Colonnes standard : `id UUID PK DEFAULT gen_random_uuid()`, `created_at TIMESTAMPTZ DEFAULT now()`, `updated_at TIMESTAMPTZ DEFAULT now()`
- Enum brand : `CHECK (brand IN ('foot', 'rugby', 'handball'))`

## RLS — Obligatoire sur chaque table

```sql
-- Activer RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Politique d'insertion publique (formulaire contact)
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Politique de lecture admin
CREATE POLICY "Allow admin read" ON contact_submissions
  FOR SELECT USING (auth.role() = 'service_role');
```

## API Routes

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  brand: z.enum(['foot', 'rugby', 'handball']),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase.from('contact_submissions').insert(parsed.data);

    if (error) {
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Requete invalide' }, { status: 400 });
  }
}
```

## Server Actions (mutations)

```typescript
'use server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';

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

## Variables d'environnement

| Variable | Cote client ? | Usage |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Oui | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Oui (protege par RLS) | Cle anonyme |
| `SUPABASE_SERVICE_ROLE_KEY` | **JAMAIS** | Scripts admin uniquement |

## Pattern helper

```typescript
// lib/supabase/helpers/testimonials.ts
import { createServerClient } from '@/lib/supabase/server';
import type { BrandId } from '@/lib/config/brands';

export async function getTestimonials(brand: BrandId) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('brand', brand)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }

  return data;
}
```

## Interdictions

- `SERVICE_ROLE_KEY` cote client — JAMAIS
- Table sans RLS active
- Appel Supabase sans gestion du cas `error`
- SQL brut dans un composant
- `createClient()` browser dans un Server Component
- API Route sans validation Zod
