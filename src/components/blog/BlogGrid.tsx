import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import type { BlogArticle } from '@/types/blog';

import { SmartArticleCard } from './SmartArticleCard';

interface BlogGridProps {
    articles: readonly BlogArticle[];
    className?: string;
}

export function BlogGrid({ articles, className }: BlogGridProps) {
    const t = useTranslations('Blog');

    if (articles.length === 0) {
        return (
            <div
                className={cn(
                    'border-border bg-card flex min-h-[40vh] items-center justify-center rounded-xl border border-dashed p-8 text-center',
                    className,
                )}
            >
                <div>
                    <p className="font-display text-lg font-semibold">{t('empty.title')}</p>
                    <p className="text-muted-foreground mt-2 max-w-[45ch] text-sm">
                        {t('empty.description')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn('grid grid-cols-1 gap-5 md:grid-cols-2', className)}>
            {articles.map((article) => (
                <SmartArticleCard key={article.slug} article={article} />
            ))}
        </div>
    );
}
