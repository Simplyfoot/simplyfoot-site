import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface QuoteCardProps {
    /** Index 0-based de la citation dans `About.act3.quotes.*`. */
    index: number;
    className?: string;
}

/**
 * Citation de club pilote. Bordure gauche verte, icône guillemet, fond
 * crème. Le texte vient de `About.act3.quotes.{index}` dans les messages.
 */
export function QuoteCard({ index, className }: QuoteCardProps) {
    const t = useTranslations('About.act3.quotes');

    return (
        <figure
            className={cn(
                'border-border border-l-primary bg-story-cream-light flex h-full flex-col gap-3 rounded-xl border border-l-[3px] p-5',
                className,
            )}
        >
            <Quote className="text-primary/50 size-5" aria-hidden />
            <blockquote className="text-foreground/85 max-w-[55ch] text-base leading-relaxed italic">
                « {t(`${index}.text`)} »
            </blockquote>
            <figcaption className="text-muted-foreground mt-auto text-xs font-medium">
                — {t(`${index}.author`)}
            </figcaption>
        </figure>
    );
}
