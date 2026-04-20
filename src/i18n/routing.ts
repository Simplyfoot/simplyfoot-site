import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['fr', 'en', 'es'],
    defaultLocale: 'fr',
    localePrefix: 'as-needed',
    // Pathnames are localized for SEO: the key is the canonical internal href
    // used in <Link>/router calls, and the value is the public URL per locale.
    // Brand names (foot, rugby, handball) are proper nouns — never translated.
    // FR is the default locale so its URLs have no /fr prefix.
    pathnames: {
        '/': '/',
        '/foot': '/foot',
        '/rugby': '/rugby',
        '/handball': '/handball',
        '/foot/about': {
            fr: '/foot/a-propos',
            en: '/foot/about',
            es: '/foot/acerca-de',
        },
        '/rugby/about': {
            fr: '/rugby/a-propos',
            en: '/rugby/about',
            es: '/rugby/acerca-de',
        },
        '/handball/about': {
            fr: '/handball/a-propos',
            en: '/handball/about',
            es: '/handball/acerca-de',
        },
        '/foot/contact': {
            fr: '/foot/contact',
            en: '/foot/contact',
            es: '/foot/contacto',
        },
        '/rugby/contact': {
            fr: '/rugby/contact',
            en: '/rugby/contact',
            es: '/rugby/contacto',
        },
        '/handball/contact': {
            fr: '/handball/contact',
            en: '/handball/contact',
            es: '/handball/contacto',
        },
        '/foot/legal/mentions-legales': {
            fr: '/foot/legal/mentions-legales',
            en: '/foot/legal/legal-notice',
            es: '/foot/legal/aviso-legal',
        },
        '/foot/legal/cgu': {
            fr: '/foot/legal/cgu',
            en: '/foot/legal/terms-of-use',
            es: '/foot/legal/condiciones-de-uso',
        },
        '/foot/legal/cgv': {
            fr: '/foot/legal/cgv',
            en: '/foot/legal/terms-of-sale',
            es: '/foot/legal/condiciones-de-venta',
        },
        '/foot/legal/privacy': {
            fr: '/foot/legal/confidentialite',
            en: '/foot/legal/privacy',
            es: '/foot/legal/privacidad',
        },
        '/foot/legal/cookies': {
            fr: '/foot/legal/cookies',
            en: '/foot/legal/cookies',
            es: '/foot/legal/cookies',
        },
        '/rugby/legal/mentions-legales': {
            fr: '/rugby/legal/mentions-legales',
            en: '/rugby/legal/legal-notice',
            es: '/rugby/legal/aviso-legal',
        },
        '/rugby/legal/cgu': {
            fr: '/rugby/legal/cgu',
            en: '/rugby/legal/terms-of-use',
            es: '/rugby/legal/condiciones-de-uso',
        },
        '/rugby/legal/cgv': {
            fr: '/rugby/legal/cgv',
            en: '/rugby/legal/terms-of-sale',
            es: '/rugby/legal/condiciones-de-venta',
        },
        '/rugby/legal/privacy': {
            fr: '/rugby/legal/confidentialite',
            en: '/rugby/legal/privacy',
            es: '/rugby/legal/privacidad',
        },
        '/rugby/legal/cookies': {
            fr: '/rugby/legal/cookies',
            en: '/rugby/legal/cookies',
            es: '/rugby/legal/cookies',
        },
        '/handball/legal/mentions-legales': {
            fr: '/handball/legal/mentions-legales',
            en: '/handball/legal/legal-notice',
            es: '/handball/legal/aviso-legal',
        },
        '/handball/legal/cgu': {
            fr: '/handball/legal/cgu',
            en: '/handball/legal/terms-of-use',
            es: '/handball/legal/condiciones-de-uso',
        },
        '/handball/legal/cgv': {
            fr: '/handball/legal/cgv',
            en: '/handball/legal/terms-of-sale',
            es: '/handball/legal/condiciones-de-venta',
        },
        '/handball/legal/privacy': {
            fr: '/handball/legal/confidentialite',
            en: '/handball/legal/privacy',
            es: '/handball/legal/privacidad',
        },
        '/handball/legal/cookies': {
            fr: '/handball/legal/cookies',
            en: '/handball/legal/cookies',
            es: '/handball/legal/cookies',
        },
    },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
