import type { BrandSlug } from '@/lib/brand';

/**
 * Legal information for the SIMPLY holding entity. Shared across all brands
 * (foot, rugby, handball) since they are all part of the same SAS.
 */
export const SIMPLY_LEGAL = {
    entity: 'SAS',
    capital: '2 000€',
    siret: '991 139 171',
    tva: 'FR89991139171',
    address: '60 rue François 1er, 75008 Paris',
} as const;

interface BrandContact {
    email: string;
    phone: string;
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
        phone: '+33 6 82 84 56 41',
        socials: {
            facebook: 'https://facebook.com/simplyfoot',
            linkedin: 'https://linkedin.com/company/simplyfoot',
            instagram: 'https://instagram.com/simplyfoot',
        },
    },
    rugby: {
        email: 'contact@simplyrugby.fr',
        phone: '+33 6 82 84 56 41',
        socials: {
            facebook: '',
            linkedin: '',
            instagram: '',
        },
    },
    handball: {
        email: 'contact@simplyhandball.fr',
        phone: '+33 6 82 84 56 41',
        socials: {
            facebook: '',
            linkedin: '',
            instagram: '',
        },
    },
};
