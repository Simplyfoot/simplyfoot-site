import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Link as IntlLink } from '@/i18n/navigation';
import { localizedArticleHref } from '@/lib/blog/href';
import { cn } from '@/lib/utils';
import type { BlogArticle } from '@/types/blog';

interface LiveResultsTickerProps {
    results: readonly BlogArticle[];
    className?: string;
}

/**
 * Horizontal scores ticker inspired by beIN Sports. Each chip links to the
 * match report. Pure CSS overflow-x-auto with snap scrolling — no JS.
 */
export function LiveResultsTicker({ results, className }: LiveResultsTickerProps) {
    const t = useTranslations('Blog');
    const locale = useLocale();
    if (results.length === 0) {
        return null;
    }

    return (
        <section
            aria-label={t('ticker.title')}
            className={cn(
                'w-full overflow-hidden rounded-xl bg-[#1A2E22] text-[#F8E9CA]',
                className,
            )}
        >
            <div className="flex items-center">
                <span className="flex shrink-0 items-center gap-2 border-r border-white/10 px-4 py-3 text-xs font-semibold tracking-wider uppercase">
                    <span
                        className="inline-block size-1.5 animate-pulse rounded-full bg-red-500"
                        aria-hidden
                    />
                    {t('ticker.label')}
                </span>

                <ul className="flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-4 py-3 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {results.map((article) => {
                        const m = article.matchData;
                        if (!m) {
                            return null;
                        }
                        return (
                            <li
                                key={article.slug}
                                className="flex shrink-0 snap-start items-center gap-3"
                            >
                                <span aria-hidden>⚽</span>
                                <Link
                                    href={localizedArticleHref(article.slug, locale)}
                                    className="inline-flex items-baseline gap-2 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                                >
                                    <span>{m.homeTeam}</span>
                                    <span className="font-display text-base font-bold tabular-nums">
                                        {m.homeScore}-{m.awayScore}
                                    </span>
                                    <span>{m.awayTeam}</span>
                                </Link>
                                <span aria-hidden className="text-white/20">
                                    │
                                </span>
                            </li>
                        );
                    })}
                    <li className="shrink-0 snap-start">
                        <IntlLink
                            href="/foot/blog/resultats"
                            className="inline-flex items-center gap-1 text-xs font-medium text-white/80 transition-colors hover:text-white"
                        >
                            {t('ticker.seeAll')}
                            <ChevronRight className="size-3" aria-hidden />
                        </IntlLink>
                    </li>
                </ul>
            </div>
        </section>
    );
}
