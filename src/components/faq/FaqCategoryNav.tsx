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
  type LucideIcon,
} from 'lucide-react';
import type { FaqCategory } from 'content/faq/foot-faq';

const FAQ_ICONS: Record<string, LucideIcon> = {
  Bell,
  Calendar,
  CalendarPlus,
  ClipboardList,
  Mail,
  Rocket,
  User,
  UserPlus,
  Users,
};

interface FaqCategoryNavProps {
  categories: FaqCategory[];
  activeId?: string;
}

export function FaqCategoryNav({ categories, activeId }: FaqCategoryNavProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav aria-label="Navigation par categorie" className="overflow-x-auto pb-2 -mx-2 px-2">
      <div className="flex gap-2 min-w-max">
        {categories.map((cat) => {
          const Icon = FAQ_ICONS[cat.icon];
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 ${
                isActive
                  ? 'bg-[var(--brand-cta)] text-[var(--brand-cta-text)]'
                  : 'text-[var(--color-text-beige)]/70 ring-1 ring-[var(--brand-border)] hover:text-[var(--color-text-beige)] hover:bg-white/5'
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {cat.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
