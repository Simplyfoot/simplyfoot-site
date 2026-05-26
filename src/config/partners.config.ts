import type { BrandSlug } from '~types/brand.types';

/**
 * Logo file naming convention
 * ---------------------------
 * Tout logo de club pilote ou de partenaire vit dans
 * `public/brands/<brand>/` et suit un préfixe imposé pour permettre une
 * intégration "drop-in" sans toucher au code des composants :
 *
 *   - Clubs pilotes : `logo_club_<slug>.png`
 *   - Partenaires   : `logo_partner_<slug>.png`
 *
 * Pour ajouter un nouveau club / partenaire :
 *   1. Déposer le PNG (idéalement 256×256, fond transparent) dans le bon dossier
 *      en respectant le préfixe ci-dessus.
 *   2. Ajouter une entrée { slug, name, url? } dans la marque correspondante
 *      du registre exporté ci-dessous.
 *
 * Le composant correspondant ne s'affiche pas si la liste est vide → la marque
 * peut démarrer sans aucun pilote / partenaire sans casser la page.
 */

export interface PartnerEntry {
    /** Slug utilisé pour construire le nom de fichier du logo. */
    slug: string;
    /** Nom affiché en `alt` du logo et en tooltip. */
    name: string;
    /** URL externe optionnelle (site officiel). */
    url?: string;
}

export const PILOT_CLUBS: Record<BrandSlug, ReadonlyArray<PartnerEntry>> = {
    foot: [
        {
            slug: 'USSM',
            name: 'U.S. Saint-Mandrier',
            url: 'https://var.fff.fr/recherche-clubs?scl=1725',
        },
        { slug: 'US_La_Cadiere', name: 'U.S. Cadièrenne', url: 'https://uslacadiere.fr/' },
        { slug: 'beaussetanne', name: 'J.S. Beaussetanne', url: 'https://www.jsbeausset.com/' },
        {
            slug: 'fc_carnoules',
            name: 'FC Carnoules',
            url: 'https://var.fff.fr/recherche-clubs?scl=180654',
        },
        { slug: 'fc_cournon', name: 'FC Cournon', url: 'https://fccournon.com/' },
        {
            slug: 'ollioulaise',
            name: 'U.S. Ollioulaise',
            url: 'https://var.fff.fr/recherche-clubs?scl=7319',
        },
        { slug: 'us_mer', name: 'US Mer', url: 'https://var.fff.fr/recherche-clubs?scl=2399' },
    ],
    rugby: [],
    handball: [],
};

export const BRAND_PARTNERS: Record<BrandSlug, ReadonlyArray<PartnerEntry>> = {
    foot: [],
    rugby: [],
    handball: [],
};

export function getPilotLogoSrc(brand: BrandSlug, slug: string): string {
    return `/brands/${brand}/logo_club_${slug}.png`;
}

export function getPartnerLogoSrc(brand: BrandSlug, slug: string): string {
    return `/brands/${brand}/logo_partner_${slug}.png`;
}
