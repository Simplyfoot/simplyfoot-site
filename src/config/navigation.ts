import type { BrandSlug } from '@/types/brand';

export interface NavItem {
    labelKey: string;
    href: string;
}

export const mainNavItems: NavItem[] = [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.about', href: '/a-propos' },
    { labelKey: 'nav.contact', href: '/contact' },
];

export const brandNavItems: Record<BrandSlug, NavItem[]> = {
    foot: [
        { labelKey: 'nav.home', href: '/foot' },
        { labelKey: 'nav.offers', href: '/foot/offres' },
        { labelKey: 'nav.pilotProgram', href: '/foot/programme-pilote' },
        { labelKey: 'nav.faq', href: '/foot/faq' },
        { labelKey: 'nav.blog', href: '/foot/blog' },
        { labelKey: 'nav.aboutUs', href: '/foot/a-propos' },
        { labelKey: 'nav.contact', href: '/foot/contact' },
    ],
    rugby: [
        { labelKey: 'nav.home', href: '/rugby' },
        { labelKey: 'nav.blog', href: '/rugby/blog' },
        { labelKey: 'nav.faq', href: '/rugby/faq' },
        { labelKey: 'nav.offers', href: '/rugby/offres' },
    ],
    handball: [
        { labelKey: 'nav.home', href: '/handball' },
        { labelKey: 'nav.blog', href: '/handball/blog' },
        { labelKey: 'nav.faq', href: '/handball/faq' },
        { labelKey: 'nav.offers', href: '/handball/offres' },
    ],
};
