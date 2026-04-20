import { cn } from '@/lib/utils';
import type { BlogArticle } from '@/types/blog';

import { ArticleCard } from './ArticleCard';

interface BlogHeroProps {
    articles: readonly BlogArticle[];
    className?: string;
}

/**
 * Asymmetric magazine-style hero. 1 large featured article + up to 2 compact
 * secondary slots. If only 1 pinned article exists, the grid collapses to
 * a single full-width tile gracefully.
 */
export function BlogHero({ articles, className }: BlogHeroProps) {
    if (articles.length === 0) {
        return null;
    }
    const [primary, ...rest] = articles;
    if (!primary) {
        return null;
    }
    const secondary = rest.slice(0, 2);

    return (
        <section
            aria-label="Articles à la une"
            className={cn(
                'grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2',
                secondary.length === 0 && 'lg:grid-cols-1 lg:grid-rows-1',
                className,
            )}
        >
            <ArticleCard
                article={primary}
                variant="featured"
                className={secondary.length === 0 ? 'lg:col-span-1 lg:row-span-1' : undefined}
            />
            {secondary.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="compact" />
            ))}
        </section>
    );
}
