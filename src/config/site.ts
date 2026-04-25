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

interface BrandSocials {
    facebook: string | null;
    linkedin: string | null;
    instagram: string | null;
    tiktok: string | null;
    twitter: string | null;
    youtube: string | null;
}

interface BrandContact {
    /** Adresse email principale (`mailto:`). */
    email: string;
    /** Numéro au format E.164 — utilisé pour `tel:` et `wa.me/`. */
    phone: string;
    /** Numéro affiché dans l'UI (français usuel). */
    phoneDisplay: string;
    /**
     * Numéro WhatsApp au format E.164 SANS le `+` initial — utilisé tel quel
     * dans l'URL `https://wa.me/<digits>`. Peut différer de `phone` si la
     * marque a une hotline dédiée.
     */
    whatsapp: string;
    socials: BrandSocials;
}

/**
 * Per-brand communication channels. Each sub-brand may have its own email,
 * phone and social presence. Stubs for rugby / handball — fill in once those
 * brands go live.
 *
 * `null` socials = plateforme prévue mais pas encore active. L'UI doit
 * afficher la carte en état désactivé (badge "Bientôt") plutôt qu'un lien
 * mort `href="#"`.
 */
export const BRAND_CONTACT: Record<BrandSlug, BrandContact> = {
    foot: {
        email: 'contact@simplyfoot.fr',
        phone: '+33699948866',
        phoneDisplay: '06 99 94 88 66',
        whatsapp: '33699948866',
        socials: {
            facebook: 'https://facebook.com/simplyfoot',
            linkedin: 'https://linkedin.com/company/simplyfoot',
            instagram: 'https://instagram.com/simplyfoot',
            tiktok: null,
            twitter: null,
            youtube: null,
        },
    },
    // Note: shares foot contact channels until rugby has dedicated socials/email.
    rugby: {
        email: 'contact@simplyfoot.fr',
        phone: '+33699948866',
        phoneDisplay: '06 99 94 88 66',
        whatsapp: '33699948866',
        socials: {
            facebook: 'https://facebook.com/simplyfoot',
            linkedin: 'https://linkedin.com/company/simplyfoot',
            instagram: 'https://instagram.com/simplyfoot',
            tiktok: null,
            twitter: null,
            youtube: null,
        },
    },
    // Note: shares foot contact channels until handball has dedicated socials/email.
    handball: {
        email: 'contact@simplyfoot.fr',
        phone: '+33699948866',
        phoneDisplay: '06 99 94 88 66',
        whatsapp: '33699948866',
        socials: {
            facebook: 'https://facebook.com/simplyfoot',
            linkedin: 'https://linkedin.com/company/simplyfoot',
            instagram: 'https://instagram.com/simplyfoot',
            tiktok: null,
            twitter: null,
            youtube: null,
        },
    },
};
