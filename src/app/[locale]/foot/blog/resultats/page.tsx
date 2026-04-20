import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MatchResultCard } from '@/components/blog/MatchResultCard';
import { type AppLocale } from '@/i18n/routing';
import { getLatestResults } from '@/lib/blog/service';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Blog.meta');
    return { title: t('titleResultats'), description: t('descriptionResultats') };
}

interface ResultatsPageProps {
    params: Promise<{ locale: AppLocale }>;
}

export default async function ResultatsPage({ params }: ResultatsPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const [t, results] = await Promise.all([
        getTranslations('Blog.resultatsPage'),
        getLatestResults('foot', 50),
    ]);

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-6 lg:py-14">
            <header className="flex max-w-[60ch] flex-col gap-2">
                <h1 className="font-display text-foreground text-3xl font-bold md:text-4xl">
                    {t('title')}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">{t('subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {results.map((article) => (
                    <MatchResultCard key={article.slug} article={article} />
                ))}
            </div>
        </main>
    );
}
