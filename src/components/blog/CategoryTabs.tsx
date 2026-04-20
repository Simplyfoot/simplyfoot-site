'use client';

import { BookOpen, type LucideIcon, Newspaper, Quote, Rocket, Scale, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import type { BlogCategory } from '@/types/blog';

interface CategoryTabsProps {
    value: BlogCategory | null;
    onChange: (category: BlogCategory | null) => void;
    className?: string;
}

const CATEGORY_ICONS: Record<BlogCategory, LucideIcon> = {
    resultats: Trophy,
    actualites: Newspaper,
    'mises-a-jour': Rocket,
    guides: BookOpen,
    temoignages: Quote,
    reglementation: Scale,
};

const CATEGORY_ORDER: readonly BlogCategory[] = [
    'resultats',
    'actualites',
    'mises-a-jour',
    'guides',
    'temoignages',
    'reglementation',
];

/**
 * Horizontal tabs — 6 categories + "Tout". Scrollable on mobile, inline on
 * desktop. Selected category is reflected in the URL by the parent via
 * `?category=...`.
 */
export function CategoryTabs({ value, onChange, className }: CategoryTabsProps) {
    const t = useTranslations('Blog');

    // Wrap tabs on narrow viewports so no word is ever clipped. Hidden
    // scrollbar caused words to be cut on mobile with no scroll affordance;
    // wrap keeps every label fully visible and tappable.
    return (
        <nav
            aria-label={t('categories.label')}
            className={cn('flex w-full flex-wrap gap-2 pb-1', className)}
        >
            <TabButton
                active={value === null}
                onClick={() => onChange(null)}
                label={t('categories.all')}
            />
            {CATEGORY_ORDER.map((cat) => {
                const Icon = CATEGORY_ICONS[cat];
                return (
                    <TabButton
                        key={cat}
                        active={value === cat}
                        onClick={() => onChange(cat)}
                        icon={Icon}
                        label={t(`categories.${cat}`)}
                    />
                );
            })}
        </nav>
    );
}

function TabButton({
    active,
    onClick,
    icon: Icon,
    label,
}: {
    active: boolean;
    onClick: () => void;
    icon?: LucideIcon;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
        >
            {Icon && <Icon className="size-4" aria-hidden />}
            {label}
        </button>
    );
}
