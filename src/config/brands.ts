import type { BrandSlug } from '~types/brand.types';

/* ═══════════════════════════════════════════════════════════════════════════
   Feature flag — marques activées publiquement.
   ───────────────────────────────────────────────────────────────────────────
   Source de vérité unique pour décider quelles marques sont visibles côté
   visiteur (landing, sitemap, routes). Tout ce qui n'est pas dans la liste
   ci-dessous est masqué :

   - `LandingContent` n'affiche que les cartes des marques actives.
   - `[locale]/<brand>/layout.tsx` appelle `notFound()` (404) pour les
     marques désactivées — toutes leurs sous-routes deviennent invisibles.
   - `sitemap.ts` n'émet pas d'entrée pour les marques désactivées.

   ─── PROTOCOLE POUR RÉACTIVER UNE MARQUE ──────────────────────────────────
   1. Ouvrir ce fichier.
   2. Ajouter le slug à `ENABLED_BRAND_SLUGS` (ex. `['foot', 'rugby']`).
   3. Sauvegarder. C'est tout.

      Effet immédiat (rebuild) :
      • La carte du sport réapparaît sur la landing `/`.
      • Les routes `/<brand>` et toutes ses sous-routes redeviennent
        accessibles (plus de 404).
      • Le sitemap réémet les URLs correspondantes (SEO réactivé).

   Désactiver une marque : retirer son slug de `ENABLED_BRAND_SLUGS`.
   Aucun fichier à supprimer, rien d'autre à toucher.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Marques exposées au public. Modifier ce tuple suffit à tout
 * (dés)activer — voir le protocole en tête de fichier.
 *
 * Toute la chaîne (landing, sitemap, route guards) lit cette liste, donc
 * il n'y a qu'un seul endroit à toucher pour basculer une marque.
 */
export const ENABLED_BRAND_SLUGS = ['foot'] as const satisfies readonly BrandSlug[];

export type EnabledBrandSlug = (typeof ENABLED_BRAND_SLUGS)[number];

/**
 * Vérifie qu'une marque est exposée publiquement. Utilisé par les layouts
 * `[locale]/<brand>/layout.tsx` pour rendre 404 les marques désactivées,
 * et par le sitemap pour filtrer les URLs émises.
 */
export function isBrandEnabled(slug: BrandSlug): boolean {
    return (ENABLED_BRAND_SLUGS as readonly BrandSlug[]).includes(slug);
}
