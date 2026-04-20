import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { BlogHero } from '@/components/blog/BlogHero';
import { BlogHomeClient } from '@/components/blog/BlogHomeClient';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { LiveResultsTicker } from '@/components/blog/LiveResultsTicker';
import { type AppLocale } from '@/i18n/routing';
import {
    getActiveRegions,
    getArticles,
    getChangelog,
    getFeaturedArticles,
    getLatestResults,
    getPopularTags,
} from '@/lib/blog/service';
import type { FrenchRegion } from '@/types/blog';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Blog.meta');
    return { title: t('title'), description: t('description') };
}

interface BlogHomePageProps {
    params: Promise<{ locale: AppLocale }>;
}

export default async function BlogHomePage({ params }: BlogHomePageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Blog');
    const [featured, initial, ticker, changelog, tags, regions] = await Promise.all([
        getFeaturedArticles('foot', 3),
        getArticles({ brand: 'foot', perPage: 9 }),
        getLatestResults('foot', 8),
        getChangelog('foot'),
        getPopularTags('foot', 10),
        getActiveRegions('foot'),
    ]);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 md:px-6 lg:py-14">
            <header className="flex max-w-[60ch] flex-col gap-2">
                <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('hero.eyebrow')}
                </span>
                <h1 className="font-display text-foreground text-3xl font-bold md:text-4xl">
                    {t('hero.title')}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">
                    {t('hero.subtitle')}
                </p>
            </header>

            <BlogHero articles={featured} />

            <LiveResultsTicker results={ticker} />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
                <Suspense fallback={null}>
                    <BlogHomeClient
                        initialArticles={initial.items}
                        initialTotal={initial.total}
                        initialTotalPages={initial.totalPages}
                    />
                </Suspense>
                <BlogSidebar
                    changelog={changelog}
                    popularTags={tags}
                    activeRegions={regions as readonly FrenchRegion[]}
                    className="hidden lg:flex"
                />
            </div>
        </main>
    );
}
