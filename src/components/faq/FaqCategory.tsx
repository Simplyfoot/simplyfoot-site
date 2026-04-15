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
import type { FaqCategory as FaqCategoryType } from 'content/faq/foot-faq';
import { FaqAccordion } from './FaqAccordion';

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

interface FaqCategoryProps {
  category: FaqCategoryType;
}

export function FaqCategory({ category }: FaqCategoryProps) {
  const IconComponent = FAQ_ICONS[category.icon];

  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-32">
      <div className="flex items-center gap-3 mb-4">
        {IconComponent && <IconComponent className="h-6 w-6 text-[var(--brand-cta)]" />}
        <h2 id={`${category.id}-title`} className="text-xl font-bold text-[var(--color-text-beige)] sm:text-2xl">
          {category.title}
        </h2>
      </div>
      <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] overflow-hidden">
        {category.items.map((item) => (
          <FaqAccordion key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}
