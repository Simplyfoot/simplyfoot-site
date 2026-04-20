'use client';

import {
    Bell,
    Calendar,
    CalendarPlus,
    ClipboardList,
    type LucideIcon,
    Mail,
    Rocket,
    User,
    UserPlus,
    Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import type { FaqCategory, FaqCategoryIcon } from '@/types/faq';

interface FaqCategoryNavProps {
    categories: readonly FaqCategory[];
    activeId: string | null;
    onNavigate: (categoryId: string) => void;
    className?: string;
}

const ICONS: Record<FaqCategoryIcon, LucideIcon> = {
    UserPlus,
    Users,
    ClipboardList,
    CalendarPlus,
    User,
    Calendar,
    Bell,
    Rocket,
    Mail,
};

/**
 * Horizontal sticky category nav. Single scrollable line on mobile (native
 * overflow-x-auto with hidden scrollbar), inline on desktop. The active
 * button is driven by the parent (IntersectionObserver), not by the last
 * click — so the pill follows scroll position naturally.
 */
export function FaqCategoryNav({
    categories,
    activeId,
    onNavigate,
    className,
}: FaqCategoryNavProps) {
    return (
        <nav
            aria-label="Catégories"
            className={cn(
                'bg-background/90 border-border supports-[backdrop-filter]:bg-background/70 sticky top-[var(--faq-nav-top,5.5rem)] z-20 -mx-4 border-b px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:shadow-sm',
                className,
            )}
        >
            {/* Wrap tabs on narrow viewports — hidden overflow-x-auto clipped
                the last labels with no scroll affordance. Wrapping keeps every
                category label fully readable and tappable. */}
            <ul className="flex flex-wrap gap-2 pb-1">
                {categories.map((cat) => {
                    const Icon = ICONS[cat.icon];
                    const active = activeId === cat.id;
                    return (
                        <li key={cat.id}>
                            <button
                                type="button"
                                onClick={() => onNavigate(cat.id)}
                                aria-pressed={active}
                                className={cn(
                                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
                                    'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                                    active
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
                                )}
                            >
                                <Icon className="size-4" aria-hidden />
                                {cat.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
