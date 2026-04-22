import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { FeaturesContent } from '@/components/features/foot/FeaturesContent';
import { daysUntilNextUpdate } from '@/config/features-foot';
import { buildAlternates } from '@/helpers/i18n.helpers';
import { BRANDS } from '@/utils/constants.utils';

import type { AppLocale } from '~types/i18n.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Features.meta' });
    const brandLabel = BRANDS.foot.label;

    return {
        title: t('title', { brand: brandLabel }),
        description: t('description', { brand: brandLabel }),
        alternates: buildAlternates('/foot/features', locale),
    };
}

export default async function FootFeaturesPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    // Calculé côté serveur pour éviter un flash d'hydratation sur le compteur.
    const daysUntilNext = daysUntilNextUpdate();

    return (
        <main>
            <FeaturesContent daysUntilNext={daysUntilNext} />
        </main>
    );
}
