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

    // TODO Tailwind: className="relative h-svh w-full overflow-hidden bg-simply-black"
    // TODO Tailwind: className="absolute inset-0"
    return (
        <main>
            <div>
                <GalaxyScene />
            </div>
            <HomepageOverlay />
        </main>
    );
}
