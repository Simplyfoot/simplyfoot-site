import {
  Bus,
  ShieldCheck,
  FileText,
  CalendarDays,
  MessageCircle,
  Users,
  BarChart3,
  BadgeCheck,
  MapPin,
  Gift,
  BellRing,
  type LucideIcon,
} from 'lucide-react';
import type { FeatureItem, RoleImpact } from 'content/fonctionnalites';

const ICON_MAP: Record<string, LucideIcon> = {
  Bus,
  ShieldCheck,
  FileText,
  CalendarDays,
  MessageCircle,
  Users,
  BarChart3,
  BadgeCheck,
  MapPin,
  Gift,
  BellRing,
};

interface BrandFonctionnalitesListProps {
  features: FeatureItem[];
  rolesImpact: RoleImpact[];
  sectionTitle: string;
  impactTitle: string;
}

export function BrandFonctionnalitesList({
  features,
  rolesImpact,
  sectionTitle,
  impactTitle,
}: BrandFonctionnalitesListProps) {
  return (
    <>
      {/* Features grid */}
      <section className="mt-16" aria-labelledby="features-title">
        <h2
          id="features-title"
          className="text-center text-3xl md:text-4xl font-bold text-[var(--brand-cta)]"
        >
          {sectionTitle}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = ICON_MAP[f.icon];
            return (
              <article
                key={f.title}
                className="group rounded-2xl border border-[var(--brand-cta)]/15 bg-[var(--brand-surface)]/60 p-6 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-bg)] ring-1 ring-[var(--brand-cta)]/30">
                    {Icon ? (
                      <Icon size={24} className="text-[var(--brand-cta)]" />
                    ) : (
                      <span className="text-[var(--brand-cta)]">•</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{f.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-text-beige)]">{f.desc}</p>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--brand-cta)]/25 bg-[var(--brand-bg)]/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--brand-cta)]">
                  {f.tag}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Roles impact */}
      <section className="mt-16" aria-labelledby="impact-title">
        <h2
          id="impact-title"
          className="text-center text-3xl md:text-4xl font-bold text-[var(--brand-cta)]"
        >
          {impactTitle}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rolesImpact.map((b) => (
            <div
              key={b.role}
              className="rounded-2xl border border-[var(--brand-cta)]/15 bg-[var(--color-surface-dark)] p-6 text-[var(--color-text-beige)] shadow"
            >
              <h3 className="text-white mb-2 font-extrabold">{b.role}</h3>
              <ul className="space-y-2">
                {b.items.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-[var(--brand-cta)]">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
