import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ChangelogTimeline } from '@/components/blog/ChangelogTimeline';
import { type AppLocale } from '@/i18n/routing';
import { getChangelog } from '@/lib/blog/service';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Blog.meta');
    return { title: t('titleChangelog'), description: t('descriptionChangelog') };
}

interface ChangelogPageProps {
    params: Promise<{ locale: AppLocale }>;
}

export default async function ChangelogPage({ params }: ChangelogPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const [t, changelog] = await Promise.all([
        getTranslations('Blog.changelogPage'),
        getChangelog('foot'),
    ]);

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 md:px-6 lg:py-14">
            <header className="flex max-w-[60ch] flex-col gap-2">
                <h1 className="font-display text-foreground text-3xl font-bold md:text-4xl">
                    {t('title')}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">{t('subtitle')}</p>
            </header>

            <ChangelogTimeline entries={changelog} />
        </main>
    );
}
