import { cn } from 'lib/utils/cn';
import type { FeatureDTO } from 'lib/contracts/feature.dto';
import {
  ShieldCheck,
  CalendarDays,
  FileText,
  Users,
  BarChart3,
  MessageCircle,
  LayoutDashboard,
  Video,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  CalendarDays,
  FileText,
  Users,
  BarChart3,
  MessageCircle,
  LayoutDashboard,
  Video,
  CheckCircle,
};

interface BrandModulesProps {
  title: React.ReactNode;
  modules: FeatureDTO[];
  className?: string;
}

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? LayoutDashboard;
}

export function BrandModules({ title, modules, className }: BrandModulesProps) {
  return (
    <section
      aria-labelledby="brand-modules-title"
      className={cn(
        'w-full bg-[var(--brand-surface)] py-20 border-t border-[var(--brand-border)]',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          id="brand-modules-title"
          className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-white"
        >
          {title}
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 m-0">
          {modules.map((m) => {
            const Icon = getIcon(m.iconName);
            return (
              <li
                key={m.id}
                className="bg-[var(--brand-bg)]/70 rounded-2xl p-7 flex flex-col items-center text-center border border-[var(--brand-border)] hover:border-[var(--brand-cta)]/50 transition-all duration-200 shadow-lg"
              >
                <span aria-hidden="true" className="mb-4">
                  <Icon size={36} className="text-[var(--brand-cta)]" strokeWidth={1.5} />
                </span>
                <h3 className="text-base font-extrabold text-white mb-2">
                  {m.title}
                </h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {m.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
