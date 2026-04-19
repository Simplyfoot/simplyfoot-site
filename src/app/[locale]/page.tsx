import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { type AppLocale } from '@/i18n/routing';
import { buildAlternates } from '@/lib/i18n/metadata';

import { GalaxyScene } from './galaxy-scene';
import { HomepageOverlay } from './homepage-overlay';

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
        <main className="relative h-svh w-full overflow-hidden bg-black">
            <div className="absolute inset-0">
                <GalaxyScene />
            </div>
            <HomepageOverlay />
        </main>
    );
}
