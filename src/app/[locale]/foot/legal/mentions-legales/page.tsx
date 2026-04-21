import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MentionsLegalesContent } from '@/components/shared/legal/MentionsLegalesContent';
import { buildAlternates } from '@/helpers/i18n.helpers';
import { BRANDS } from '@/utils/constants.utils';

import type { AppLocale } from '~types/i18n.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Legal.mentionsLegales.meta' });
    const brandLabel = BRANDS.foot.label;

    return {
        title: t('title', { brand: brandLabel }),
        description: t('description', { brand: brandLabel }),
        alternates: buildAlternates('/foot/legal/mentions-legales', locale),
    };
}

export default async function FootMentionsLegalesPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main>
            <MentionsLegalesContent brand="foot" />
        </main>
    );
}
