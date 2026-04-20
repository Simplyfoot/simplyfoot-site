import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { localizedArticleHref } from '@/lib/blog/href';
import { cn } from '@/lib/utils';
import type { BlogArticle, ChangelogEntry } from '@/types/blog';

interface ChangelogCardProps {
    article: BlogArticle;
    className?: string;
    /** When true, omit the title link — used inside the full timeline view. */
    inline?: boolean;
}

/**
 * Structured changelog card. Each entry is colour-coded by type (feature,
 * improvement, fix, breaking). Used in the homepage sidebar AND on
 * /foot/blog/mises-a-jour (timeline variant).
 */
export function ChangelogCard({ article, className, inline = false }: ChangelogCardProps) {
    const t = useTranslations('Blog');
    const locale = useLocale();
    const changelog = article.changelog;
    if (!changelog) {
        return null;
    }

    const heading = (
        <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="inline-flex items-center gap-2">
                <span className="font-display text-primary text-lg font-bold">
                    {changelog.version}
                </span>
                <span className="text-foreground text-sm font-medium">{article.title}</span>
            </span>
            <time
                dateTime={changelog.releaseDate}
                className="text-muted-foreground text-xs tabular-nums"
            >
                {formatDate(changelog.releaseDate)}
            </time>
        </div>
    );

    const content = (
        <ul className="mt-4 flex flex-col gap-2">
            {changelog.entries.map((entry, i) => (
                <ChangelogEntryRow key={i} entry={entry} />
            ))}
        </ul>
    );

    const footerLink = !inline && (
        <p className="text-muted-foreground mt-4 text-xs">
            <span className="text-primary underline-offset-4 hover:underline">
                {t('readReleaseNotes')} →
            </span>
        </p>
    );

    if (inline) {
        return (
            <div className={cn('border-border bg-card rounded-xl border p-5', className)}>
                {heading}
                {content}
            </div>
        );
    }

    return (
        <Link
            href={localizedArticleHref(article.slug, locale)}
            className={cn(
                'border-border bg-card block rounded-xl border p-5 transition-all',
                'hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md',
                'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
                className,
            )}
        >
            {heading}
            {content}
            {footerLink}
        </Link>
    );
}

function ChangelogEntryRow({ entry }: { entry: ChangelogEntry }) {
    const { icon, label, colour } = ENTRY_STYLES[entry.type];
    return (
        <li className="text-foreground/90 flex items-start gap-2.5 text-sm leading-relaxed">
            <span
                className={cn(
                    'mt-0.5 inline-flex h-5 shrink-0 items-center rounded-full px-2 text-[10px] font-semibold tracking-wide uppercase',
                    colour,
                )}
                aria-label={label}
            >
                {icon}
            </span>
            <span className="max-w-[60ch]">{entry.text}</span>
        </li>
    );
}

const ENTRY_STYLES: Record<
    ChangelogEntry['type'],
    { icon: string; label: string; colour: string }
> = {
    feature: { icon: '✨', label: 'Nouveau', colour: 'bg-primary/15 text-primary' },
    improvement: {
        icon: '⚡',
        label: 'Amélioration',
        colour: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    },
    fix: {
        icon: '🐛',
        label: 'Correctif',
        colour: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    },
    breaking: {
        icon: '⚠️',
        label: 'Breaking',
        colour: 'bg-red-500/15 text-red-600 dark:text-red-400',
    },
};

function formatDate(iso: string): string {
    try {
        return new Date(iso).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
}
