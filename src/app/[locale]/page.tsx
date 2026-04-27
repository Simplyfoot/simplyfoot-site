import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildAlternates } from '@/helpers/i18n.helpers';

import { LandingContent } from './landing-content';

import type { AppLocale } from '~types/i18n.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'HomePage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        alternates: buildAlternates('/', locale),
    };
}

export default async function HomePage({ params }: { params: Promise<{ locale: AppLocale }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main>
            <LandingContent />
        </main>
    );
}
