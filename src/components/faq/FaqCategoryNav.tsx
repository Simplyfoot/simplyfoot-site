'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface Category {
    id: string;
    titleKey: string;
}

interface FaqCategoryNavProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
}

export function FaqCategoryNav({
    categories,
    activeCategory,
    onCategoryChange,
}: FaqCategoryNavProps) {
    const t = useTranslations('foot');

    return (
        <nav className="scrollbar-hidden flex gap-2 overflow-x-auto" aria-label="FAQ categories">
            {categories.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    onClick={() => onCategoryChange(category.id)}
                    className={cn(
                        'min-h-10 shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                        activeCategory === category.id
                            ? 'bg-brand-primary text-white'
                            : 'bg-muted text-foreground hover:bg-muted/80',
                    )}
                >
                    {t(category.titleKey)}
                </button>
            ))}
        </nav>
    );
}
