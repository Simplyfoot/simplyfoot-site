import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MentionsLegalesContent } from '@/components/shared/legal/MentionsLegalesContent';
import { type AppLocale } from '@/i18n/routing';
import { BRANDS } from '@/lib/brand';
import { buildAlternates } from '@/lib/i18n/metadata';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Legal.mentionsLegales.meta' });
    const brandLabel = BRANDS.handball.label;

    return {
        title: t('title', { brand: brandLabel }),
        description: t('description', { brand: brandLabel }),
        alternates: buildAlternates('/handball/legal/mentions-legales', locale),
    };
}

export default async function HandballMentionsLegalesPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main>
            <MentionsLegalesContent brand="handball" />
        </main>
    );
}
