export type BrandSlug = 'foot' | 'rugby' | 'handball';

export interface BrandMeta {
    slug: BrandSlug;
    /** Libellé complet de la marque, ex : "SimplyFoot". */
    label: string;
    /** Partie spécifique du libellé après "Simply", ex : "Foot". Utilisé dans le Header. */
    name: string;
    /** Emoji du sport utilisé dans les textes (ex : headline 404). */
    emoji: string;
}
