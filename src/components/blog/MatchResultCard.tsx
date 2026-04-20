import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { localizedArticleHref } from '@/lib/blog/href';
import { cn } from '@/lib/utils';
import type { BlogArticle, MatchEvent } from '@/types/blog';

interface MatchResultCardProps {
    article: BlogArticle;
    className?: string;
}

/**
 * Compact scoreboard card for articles with matchData. Shows competition,
 * teams, final score, stadium and goal events. Winning team highlighted in
 * bold + primary colour. Renders nothing if the article has no matchData.
 */
export function MatchResultCard({ article, className }: MatchResultCardProps) {
    const t = useTranslations('Blog');
    const locale = useLocale();
    const match = article.matchData;
    if (!match) {
        return null;
    }

    const homeWins = match.homeScore > match.awayScore;
    const awayWins = match.awayScore > match.homeScore;

    return (
        <Link
            href={localizedArticleHref(article.slug, locale)}
            className={cn(
                'group border-border border-l-primary bg-card block rounded-xl border border-l-4 p-5 transition-all',
                'hover:-translate-y-0.5 hover:shadow-md',
                'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
                className,
            )}
        >
            <div className="text-muted-foreground mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-medium">{match.competition}</span>
                <time dateTime={match.date}>{formatDate(match.date)}</time>
            </div>

            <div className="flex flex-col gap-2">
                <TeamRow name={match.homeTeam} score={match.homeScore} winner={homeWins} />
                <div className="bg-border h-px w-full" />
                <TeamRow name={match.awayTeam} score={match.awayScore} winner={awayWins} />
            </div>

            {match.events.length > 0 && (
                <ul className="text-muted-foreground mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    {match.events.map((e, i) => (
                        <li key={`${e.minute}-${i}`} className="inline-flex items-center gap-1">
                            <EventIcon type={e.type} />
                            <span className="tabular-nums">{e.minute}&#39;</span>
                            <span>{e.player}</span>
                        </li>
                    ))}
                </ul>
            )}

            <p className="text-muted-foreground mt-4 inline-flex items-center gap-1.5 text-xs">
                <MapPin className="size-3" aria-hidden />
                {match.stadium}
            </p>

            <p className="text-foreground/80 group-hover:text-foreground mt-3 line-clamp-2 text-sm">
                {t('readFullReport')} →
            </p>
        </Link>
    );
}

function TeamRow({ name, score, winner }: { name: string; score: number; winner: boolean }) {
    return (
        <div
            className={cn(
                'flex items-baseline justify-between gap-3',
                winner ? 'text-foreground' : 'text-muted-foreground',
            )}
        >
            <span className={cn('text-base', winner && 'font-semibold')}>{name}</span>
            <span
                className={cn(
                    'font-display text-2xl tabular-nums',
                    winner ? 'text-primary font-bold' : 'font-semibold',
                )}
            >
                {score}
            </span>
        </div>
    );
}

function EventIcon({ type }: { type: MatchEvent['type'] }) {
    switch (type) {
        case 'goal':
            return <span aria-label="But">⚽</span>;
        case 'card-yellow':
            return <span aria-label="Carton jaune">🟨</span>;
        case 'card-red':
            return <span aria-label="Carton rouge">🟥</span>;
        case 'substitution':
            return <span aria-label="Changement">🔁</span>;
    }
}

function formatDate(iso: string): string {
    try {
        return new Date(iso).toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
}
