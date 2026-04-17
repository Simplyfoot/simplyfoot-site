# Plan des routes — SIMPLY

## Configuration i18n

- Locales : `['fr', 'en']`
- Default : `'fr'`
- Prefix : `'as-needed'` (fr = pas de prefix, en = `/en/`)
- Middleware : `middleware.ts` a la racine
- Config : `lib/i18n/routing.ts` + `lib/i18n/request.ts`

## Routes existantes (2026-04-16)

```
/                          -> Homepage SIMPLY (scene 3D immersive)
/en                        -> Homepage (English)
/foot                      -> Homepage SimplyFoot
/rugby                     -> Homepage SimplyRugby
/handball                  -> Homepage SimplyHandball
/robots.txt                -> SEO (statique)
/sitemap.xml               -> SEO (statique)
/manifest.webmanifest      -> PWA (statique)
```

## Routes prevues (a implementer)

```
/(brands)/foot/
  blog/                    -> Blog SimplyFoot
  faq/                     -> FAQ SimplyFoot
  offres/                  -> Offres SimplyFoot

/(brands)/rugby/
  blog/                    -> Blog SimplyRugby
  faq/                     -> FAQ SimplyRugby
  offres/                  -> Offres SimplyRugby

/(brands)/handball/
  blog/                    -> Blog SimplyHandball
  faq/                     -> FAQ SimplyHandball
  offres/                  -> Offres SimplyHandball

/(legal)/
  cgu/                     -> Conditions Generales d'Utilisation
  cgv/                     -> Conditions Generales de Vente
  confidentialite/         -> Politique de confidentialite
  mentions-legales/        -> Mentions legales

/contact                   -> Page de contact
/a-propos                  -> Page a propos
```

## Structure des fichiers

```
app/
  layout.tsx               -> Root (return children, pas de html/body)
  globals.css              -> Theme complet
  favicon.ico
  robots.ts
  sitemap.ts
  manifest.ts
  [locale]/
    layout.tsx             -> Fonts + NextIntlClientProvider + locale validation
    page.tsx               -> Homepage 3D (Server Component + dynamic client)
    not-found.tsx           -> Page 404
    error.tsx              -> Error boundary
    galaxy-scene.tsx       -> Client wrapper pour dynamic() ssr:false
    homepage-overlay.tsx   -> Overlay logo + texte sur la scene 3D
    loading-screen.tsx     -> Ecran de chargement
    (brands)/
      layout.tsx           -> Wrapper pour routes de marques
      foot/page.tsx
      rugby/page.tsx
      handball/page.tsx
```

## Navigation config

Fichier : `config/navigation.ts`

- `mainNavItems` : liens principaux (Accueil, A propos, Contact)
- `brandNavItems` : liens par marque (Blog, FAQ, Offres)
