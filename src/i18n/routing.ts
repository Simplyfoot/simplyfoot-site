import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['fr', 'en', 'es'],
    defaultLocale: 'fr',
    localePrefix: 'as-needed',
    pathnames: {
        '/': '/',
    },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
