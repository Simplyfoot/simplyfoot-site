import type { BlogArticle } from '@/types/blog';

import { ArticleCard } from './ArticleCard';
import { ChangelogCard } from './ChangelogCard';
import { MatchResultCard } from './MatchResultCard';

interface SmartArticleCardProps {
    article: BlogArticle;
    variant?: 'default' | 'featured' | 'compact';
    className?: string;
}

/**
 * Dispatches to the right visual card depending on the article's category
 * and available structured data. Keeps the grid rendering logic
 * category-agnostic: callers just pass an article, this picks the shape.
 */
export function SmartArticleCard({
    article,
    variant = 'default',
    className,
}: SmartArticleCardProps) {
    if (article.category === 'resultats' && article.matchData) {
        return <MatchResultCard article={article} className={className} />;
    }
    if (article.category === 'mises-a-jour' && article.changelog) {
        return <ChangelogCard article={article} className={className} />;
    }
    return <ArticleCard article={article} variant={variant} className={className} />;
}
