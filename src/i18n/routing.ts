import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['fr', 'en', 'es'],
    defaultLocale: 'fr',
    localePrefix: 'as-needed',
    pathnames: {
        '/': '/',
        '/foot': '/foot',
        '/rugby': '/rugby',
        '/handball': '/handball',
        // Brand-scoped contact + legal pages. Content is shared across brands
        // but the URL stays in the user's current navigation theme.
        '/foot/about': '/foot/about',
        '/rugby/about': '/rugby/about',
        '/handball/about': '/handball/about',
        '/foot/contact': '/foot/contact',
        '/rugby/contact': '/rugby/contact',
        '/handball/contact': '/handball/contact',
        '/foot/legal/mentions-legales': '/foot/legal/mentions-legales',
        '/foot/legal/cgu': '/foot/legal/cgu',
        '/foot/legal/cgv': '/foot/legal/cgv',
        '/foot/legal/privacy': '/foot/legal/privacy',
        '/foot/legal/cookies': '/foot/legal/cookies',
        '/rugby/legal/mentions-legales': '/rugby/legal/mentions-legales',
        '/rugby/legal/cgu': '/rugby/legal/cgu',
        '/rugby/legal/cgv': '/rugby/legal/cgv',
        '/rugby/legal/privacy': '/rugby/legal/privacy',
        '/rugby/legal/cookies': '/rugby/legal/cookies',
        '/handball/legal/mentions-legales': '/handball/legal/mentions-legales',
        '/handball/legal/cgu': '/handball/legal/cgu',
        '/handball/legal/cgv': '/handball/legal/cgv',
        '/handball/legal/privacy': '/handball/legal/privacy',
        '/handball/legal/cookies': '/handball/legal/cookies',
    },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
