import type { BrandSlug } from '~types/brand.types';

/**
 * Legal information for the SIMPLY holding entity. Shared across all brands
 * (foot, rugby, handball) since they are all part of the same SAS.
 */
export const SIMPLY_LEGAL = {
    entity: 'SAS',
    capital: '2 000 €',
    rcs: '991 139 171 R.C.S Paris',
    tva: 'FR 89 991139171',
    address: '60 rue François 1er, 75008 Paris',
} as const;

interface BrandContact {
    email: string;
    socials: {
        facebook: string;
        linkedin: string;
        instagram: string;
    };
}

/**
 * Per-brand communication channels. Each sub-brand may have its own email,
 * phone and social presence. Stubs for rugby / handball — fill in once those
 * brands go live.
 */
export const BRAND_CONTACT: Record<BrandSlug, BrandContact> = {
    foot: {
        email: 'contact@simplyfoot.fr',
        socials: {
            facebook: 'https://facebook.com/simplyfoot',
            linkedin: 'https://linkedin.com/company/simplyfoot',
            instagram: 'https://instagram.com/simplyfoot',
        },
    },
    // TODO: update with rugby-specific contact info once available
    rugby: {
        email: 'contact@simplyfoot.fr',
        socials: {
            facebook: 'https://facebook.com/simplyfoot',
            linkedin: 'https://linkedin.com/company/simplyfoot',
            instagram: 'https://instagram.com/simplyfoot',
        },
    },
    // TODO: update with handball-specific contact info once available
    handball: {
        email: 'contact@simplyfoot.fr',
        socials: {
            facebook: 'https://facebook.com/simplyfoot',
            linkedin: 'https://linkedin.com/company/simplyfoot',
            instagram: 'https://instagram.com/simplyfoot',
        },
    },
};
