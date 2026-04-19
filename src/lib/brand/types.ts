export type BrandSlug = 'foot' | 'rugby' | 'handball';

export interface BrandMeta {
    slug: BrandSlug;
    /** Full brand label, e.g. "SimplyFoot". */
    label: string;
    /** Brand-specific part of the label, after "Simply", e.g. "Foot". Used in the Header. */
    name: string;
}
