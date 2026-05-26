import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { IntroSection } from '@/components/shared/home/IntroSection';
import { PartnersSection } from '@/components/shared/home/PartnersSection';
import { PilotsMarquee } from '@/components/shared/home/PilotsMarquee';
import { buildAlternates } from '@/helpers/i18n.helpers';

import type { AppLocale } from '~types/i18n.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FootHome.meta' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: buildAlternates('/foot', locale),
    };
}

export default async function FootHomePage({ params }: { params: Promise<{ locale: AppLocale }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main>
            <IntroSection brand="foot" namespace="FootHome" />
            <PilotsMarquee brand="foot" namespace="FootHome" />
            <PartnersSection brand="foot" namespace="FootHome" />
        </main>
    );
}
