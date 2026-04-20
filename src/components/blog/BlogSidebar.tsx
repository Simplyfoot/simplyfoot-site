import { useTranslations } from 'next-intl';

import { REGION_LABELS } from '@/content/blog/regions';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { BlogArticle, FrenchRegion } from '@/types/blog';

import { ChangelogCard } from './ChangelogCard';

interface BlogSidebarProps {
    changelog: readonly BlogArticle[];
    popularTags: readonly { tag: string; count: number }[];
    activeRegions: readonly FrenchRegion[];
    className?: string;
}

/**
 * Right-column sidebar, desktop only. Three stacked blocks:
 * 1. Latest product changelog (links to /foot/blog/mises-a-jour)
 * 2. Popular tags as clickable pills
 * 3. Active regions (filter shortcut)
 */
export function BlogSidebar({
    changelog,
    popularTags,
    activeRegions,
    className,
}: BlogSidebarProps) {
    const t = useTranslations('Blog.sidebar');

    return (
        <aside className={cn('flex flex-col gap-8', className)} aria-label={t('label')}>
            {changelog.length > 0 && (
                <section>
                    <header className="mb-4 flex items-baseline justify-between">
                        <h2 className="font-display text-lg font-semibold">{t('changelog')}</h2>
                        <Link
                            href="/foot/blog/mises-a-jour"
                            className="text-primary text-xs hover:underline"
                        >
                            {t('seeAll')} →
                        </Link>
                    </header>
                    <ul className="flex flex-col gap-3">
                        {changelog.slice(0, 3).map((article) => (
                            <li key={article.slug}>
                                <ChangelogCard article={article} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {popularTags.length > 0 && (
                <section>
                    <h2 className="font-display mb-4 text-lg font-semibold">{t('tags')}</h2>
                    <ul className="flex flex-wrap gap-2">
                        {popularTags.map(({ tag, count }) => (
                            <li key={tag}>
                                <span className="border-border bg-card text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
                                    <span>#{tag}</span>
                                    <span className="text-foreground/50 tabular-nums">{count}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {activeRegions.length > 0 && (
                <section>
                    <h2 className="font-display mb-4 text-lg font-semibold">{t('regions')}</h2>
                    <ul className="flex flex-col gap-1.5">
                        {activeRegions.map((region) => (
                            <li key={region}>
                                <Link
                                    href={{ pathname: '/foot/blog', query: { region } }}
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    {REGION_LABELS[region]}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </aside>
    );
}
