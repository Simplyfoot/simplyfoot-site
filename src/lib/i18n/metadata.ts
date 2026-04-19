import { getPathname } from '@/i18n/navigation';
import { type AppLocale, type AppPathname, routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/constants';

type Alternates = {
    canonical: string;
    languages: Record<string, string>;
};

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
