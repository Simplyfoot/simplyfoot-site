import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/utils/constants.utils';

import type { AppLocale, AppPathname } from '~types/i18n.types';

type Alternates = {
    canonical: string;
    languages: Record<string, string>;
};

/**
 * Construit le bloc `alternates` de la `Metadata` Next.js pour une page
 * donnée : URL canonique + `hreflang` pour chaque locale + `x-default`.
 *
 * À appeler depuis chaque `generateMetadata` pour garantir une indexation
 * correcte des URLs localisées (SEO multi-langue).
 */
export function buildAlternates(href: AppPathname, currentLocale: AppLocale): Alternates {
    const languages: Record<string, string> = {};

    for (const locale of routing.locales) {
        languages[locale] = `${SITE_URL}${getPathname({ locale, href })}`;
    }

    languages['x-default'] = `${SITE_URL}${getPathname({
        locale: routing.defaultLocale,
        href,
    })}`;

    return {
        canonical: `${SITE_URL}${getPathname({ locale: currentLocale, href })}`,
        languages,
    };
}
