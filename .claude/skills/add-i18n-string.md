# Skill: Ajouter une cle i18n

## Quand utiliser

Quand tu as un texte a afficher dans un composant public.

## Procedure

1. Choisir le namespace approprie :
    - Texte transverse -> `common.*`
    - Texte specifique a une page -> `<nom-page>.*`
    - Texte de marque -> `brands.<slug>.*`

2. Ajouter la cle dans `messages/fr.json`
3. Ajouter la cle dans `messages/en.json` (traduction ou `"[EN] ..."`)

4. Utiliser dans le composant :

```tsx
// Server Component
import { getTranslations } from 'next-intl/server';

export default async function Page() {
    const t = await getTranslations('home.hero');
    return <h1>{t('title')}</h1>;
}
```

```tsx
// Client Component
'use client';
import { useTranslations } from 'next-intl';

export function HeroCTA() {
    const t = useTranslations('common.cta');
    return <button>{t('demo')}</button>;
}
```

## Checklist

- [ ] Parite fr/en respectee
- [ ] Namespace coherent
- [ ] Pas d'interpolation en dur (utiliser `{variable}`)
- [ ] Les aria-label sont AUSSI traduits
