# Marques — configuration detaillee

## SIMPLY (holding)

- Fond homepage : noir pur `#000000`
- Fond site interieur : beige `#F8E9CA`
- Couleur accent : bleu Simply `#151B6B`
- Texte muted : taupe `#6B5D4B`
- Typographie : Inter (corps), Poppins (display)

## SimplyFoot

- Slug : `foot`
- Route : `/foot`
- Primary : `#567E66` (vert sauge)
- Primary dark : `#3D5C4A`
- Primary light : `#7A9E8A`
- Surface dark : `#1A2E22`
- Simmo : vert

## SimplyRugby

- Slug : `rugby`
- Route : `/rugby`
- Primary : `#8B1A1A` (rouge sang)
- Primary dark : `#5C1010`
- Primary light : `#C04040`
- Surface dark : `#2A1010`
- Simmo : rouge

## SimplyHandball

- Slug : `handball`
- Route : `/handball`
- Primary : `#1A237E` (bleu nuit)
- Primary dark : `#0D1252`
- Primary light : `#3F51B5`
- Surface dark : `#0A0E2A`
- Simmo : bleu

## Fichiers sources

- Types : `types/brand.ts` (`BrandSlug`, `BrandConfig`, `BrandColors`)
- Config JS : `lib/brand/config.ts` (`brandConfigs`, `getBrandConfig()`)
- Tokens CSS : `lib/brand/tokens.css` (variables CSS par `[data-brand]`)
- Constantes 3D : `lib/constants.ts` (`SIMPLY_COLORS`, `BRAND_COLORS`)
- Context React : `lib/brand/context.tsx` (`BrandProvider`, `useBrand()`)

## Regle d'or

Chaque marque a son univers visuel MAIS toutes partagent le beige `#F8E9CA` comme fond du site interieur. La distinction se fait par les accents (primary, secondary).
