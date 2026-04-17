# Skill: Ajouter une page

## Procedure

1. Creer le fichier `app/[locale]/<chemin>/page.tsx`

```tsx
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

// 1. Metadata (OBLIGATOIRE pour routes publiques)
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('pageNamespace.meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

// 2. Page (export DEFAULT pour app/*/page.tsx)
export default async function MyPage() {
    const t = await getTranslations('pageNamespace');
    return (
        <main>
            <h1>{t('title')}</h1>
        </main>
    );
}
```

2. Ajouter les cles i18n (skill `add-i18n-string`)
3. Si c'est une page de marque : ajouter sous `app/[locale]/(brands)/<slug>/`
4. Creer un `loading.tsx` si route dynamique
5. Mettre a jour `config/navigation.ts` si la page doit apparaitre dans la nav
6. Mettre a jour `app/sitemap.ts` pour le SEO

## Checklist

- [ ] `generateMetadata` present
- [ ] Cles i18n creees (fr + en)
- [ ] Section avec `aria-label`
- [ ] Au moins un `<h1>`
- [ ] Loading state si route dynamique
- [ ] Sitemap mis a jour
