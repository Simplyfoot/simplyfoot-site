'use client';

import {
    Bell,
    Calendar,
    CalendarPlus,
    ClipboardList,
    Mail,
    Rocket,
    User,
    UserPlus,
    Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import type { FaqIcon } from '~types/faq.types';

interface FaqSidebarItem {
    id: string;
    icon: FaqIcon;
    title: string;
}

interface FaqSidebarProps {
    items: readonly FaqSidebarItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
    label: string;
}

const ICONS: Record<FaqIcon, typeof UserPlus> = {
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

export function FaqSidebar({ items, activeId, onSelect, label }: FaqSidebarProps) {
    return (
        <nav
            aria-label={label}
            className="min-w-0 lg:sticky lg:top-24 lg:self-start"
            data-slot="faq-sidebar"
        >
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {items.map((item) => {
                    const Icon = ICONS[item.icon];
                    const isActive = item.id === activeId;

                    return (
                        <li key={item.id} className="lg:w-full">
                            <button
                                type="button"
                                onClick={() => onSelect(item.id)}
                                aria-current={isActive ? 'true' : undefined}
                                className={cn(
                                    'focus-visible:ring-ring flex min-h-11 w-full items-center gap-2 rounded-full border px-4 text-left text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none lg:rounded-md',
                                    isActive
                                        ? 'bg-primary-600 border-primary-600 text-primary-foreground'
                                        : 'bg-background border-border text-foreground hover:bg-muted',
                                )}
                            >
                                <Icon className="size-4 shrink-0" aria-hidden="true" />
                                <span>{item.title}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
