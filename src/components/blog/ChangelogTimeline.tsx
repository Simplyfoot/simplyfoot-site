import { cn } from '@/lib/utils';
import type { BlogArticle } from '@/types/blog';

import { ChangelogCard } from './ChangelogCard';

interface ChangelogTimelineProps {
    entries: readonly BlogArticle[];
    className?: string;
}

/**
 * Vertical timeline for the full product changelog. Each entry sits to the
 * right of a vertical rail with a filled dot — an Linear.app-inspired
 * layout that scales gracefully from mobile (single column, no rail) to
 * desktop.
 */
export function ChangelogTimeline({ entries, className }: ChangelogTimelineProps) {
    if (entries.length === 0) {
        return null;
    }

    return (
        <ol className={cn('relative flex flex-col gap-10', className)}>
            <span
                aria-hidden
                className="bg-border absolute top-2 bottom-2 left-[7px] hidden w-px md:block"
            />
            {entries.map((article) => (
                <li key={article.slug} className="relative md:pl-10">
                    <span
                        aria-hidden
                        className="border-primary bg-background absolute top-6 left-0 hidden size-4 rounded-full border-2 md:block"
                    />
                    <ChangelogCard article={article} inline />
                </li>
            ))}
        </ol>
    );
}
