import { cn } from 'lib/utils/cn';
import type { FeatureDTO } from 'lib/contracts/feature.dto';
import {
  CheckCircle,
  AlarmClock,
  Users,
  Star,
  ShieldCheck,
  CalendarDays,
  FileText,
  BarChart3,
  MessageCircle,
  LayoutDashboard,
  Video,
  Zap,
  Activity,
  Compass,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  CheckCircle,
  AlarmClock,
  Users,
  Star,
  ShieldCheck,
  CalendarDays,
  FileText,
  BarChart3,
  MessageCircle,
  LayoutDashboard,
  Video,
  Zap,
  Activity,
  Compass,
  Trophy,
};

interface BrandBenefitsProps {
  title: string;
  benefits: FeatureDTO[];
  className?: string;
}

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? CheckCircle;
}

export function BrandBenefits({ title, benefits, className }: BrandBenefitsProps) {
  return (
    <section
      className={cn('w-full max-w-6xl mx-auto px-6 mt-0 mb-20 relative z-20', className)}
      aria-labelledby="brand-benefits-title"
    >
      <h2
        id="brand-benefits-title"
        className="text-3xl md:text-4xl font-extrabold text-brand-text text-center mt-10 mb-10"
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b) => {
          const Icon = getIcon(b.iconName);
          return (
            <article
              key={b.id}
              className="bg-[var(--color-surface-dark)]/95 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center border border-[var(--brand-border)]
                         hover:-translate-y-1 hover:border-[var(--brand-cta)]/40 transition-all duration-200 group backdrop-blur-sm"
            >
              <div className="mb-3" aria-hidden="true">
                <Icon className="w-10 h-10 text-[var(--brand-cta)]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-extrabold text-brand-text mb-2">{b.title}</h3>
              <p className="text-base text-[var(--color-text-beige)] font-medium">
                {b.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
