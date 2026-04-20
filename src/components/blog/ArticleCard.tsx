import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { localizedArticleHref } from '@/lib/blog/href';
import { cn } from '@/lib/utils';
import type { BlogArticle } from '@/types/blog';

interface ArticleCardProps {
    article: BlogArticle;
    variant?: 'default' | 'featured' | 'compact';
    className?: string;
}

/**
 * Standard media card used across the blog grid and sidebars. Three visual
 * variants: `featured` for the hero's large slot, `default` for the grid,
 * `compact` for the secondary hero slots and sidebar lists.
 */
export function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
    const t = useTranslations('Blog');
    const locale = useLocale();
    const isFeatured = variant === 'featured';
    const isCompact = variant === 'compact';

    return (
        <Link
            href={localizedArticleHref(article.slug, locale)}
            className={cn(
                'group border-border bg-card flex flex-col overflow-hidden rounded-xl border transition-all',
                'hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg',
                'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
                isFeatured && 'lg:col-span-2 lg:row-span-2',
                className,
            )}
        >
            <div
                className={cn(
                    'bg-muted relative w-full overflow-hidden',
                    isFeatured ? 'aspect-[16/9]' : isCompact ? 'aspect-[16/10]' : 'aspect-[16/9]',
                )}
            >
                {article.imageUrl ? (
                    <Image
                        src={article.imageUrl}
                        alt={article.imageAlt ?? ''}
                        fill
                        sizes={
                            isFeatured
                                ? '(max-width: 1024px) 100vw, 66vw'
                                : '(max-width: 768px) 100vw, 33vw'
                        }
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="from-primary/10 to-primary/30 flex h-full w-full items-center justify-center bg-gradient-to-br">
                        <span className="font-display text-primary/60 text-2xl font-semibold">
                            {article.title.slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}
                <span className="bg-background/90 text-foreground absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur">
                    {t(`categories.${article.category}`)}
                </span>
            </div>

            <div className={cn('flex flex-col gap-2 p-5', isFeatured && 'gap-3 p-6')}>
                <h3
                    className={cn(
                        'font-display text-foreground group-hover:text-primary font-semibold',
                        isFeatured ? 'text-2xl leading-tight' : 'text-lg leading-snug',
                    )}
                >
                    {article.title}
                </h3>

                {!isCompact && (
                    <p className="text-muted-foreground line-clamp-2 max-w-[60ch] text-sm leading-relaxed">
                        {article.excerpt}
                    </p>
                )}

                <div className="text-muted-foreground mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs">
                    <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" aria-hidden />
                        {t('readingMinutes', { minutes: article.readingMinutes })}
                    </span>
                    {article.region && (
                        <>
                            <span aria-hidden>·</span>
                            <span className="uppercase">{article.region}</span>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}

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
