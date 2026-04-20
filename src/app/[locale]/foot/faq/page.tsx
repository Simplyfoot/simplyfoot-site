import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { FaqClient } from '@/components/faq/FaqClient';
import { FaqFooterCta } from '@/components/faq/FaqFooterCta';
import { FAQ_CATEGORIES } from '@/content/faq/foot-faq';
import { type AppLocale } from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Faq.meta');
    return { title: t('title'), description: t('description') };
}

interface FaqPageProps {
    params: Promise<{ locale: AppLocale }>;
}

export default async function FaqPage({ params }: FaqPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Faq');

    return (
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-10 md:px-6 lg:py-14">
            <header className="flex max-w-[60ch] flex-col gap-3">
                <h1 className="font-display text-foreground text-3xl font-bold md:text-4xl">
                    {t('hero.title')}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">
                    {t('hero.subtitle')}
                </p>
            </header>

            <FaqClient categories={FAQ_CATEGORIES} />

            <FaqFooterCta />
        </main>
    );
}
