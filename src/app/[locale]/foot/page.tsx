import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { HomeContent } from '@/components/home/foot/HomeContent';
import { buildAlternates } from '@/helpers/i18n.helpers';
import { BRANDS } from '@/utils/constants.utils';

import type { AppLocale } from '~types/i18n.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Home.meta' });
    const brandLabel = BRANDS.foot.label;

    return {
        title: t('title'),
        description: t('description'),
        alternates: buildAlternates('/foot', locale),
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: brandLabel,
            locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        },
    };
}

export default async function FootHomePage({ params }: { params: Promise<{ locale: AppLocale }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <HomeContent />;
}
