import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PrivacyContent } from '@/components/shared/legal/PrivacyContent';
import { buildAlternates } from '@/helpers/i18n.helpers';
import { BRANDS } from '@/utils/constants.utils';

import type { AppLocale } from '~types/i18n.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Legal.privacy.meta' });
    const brandLabel = BRANDS.foot.label;

    return {
        title: t('title', { brand: brandLabel }),
        description: t('description', { brand: brandLabel }),
        alternates: buildAlternates('/foot/legal/privacy', locale),
    };
}

export default async function FootPrivacyPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main>
            <PrivacyContent brand="foot" />
        </main>
    );
}
