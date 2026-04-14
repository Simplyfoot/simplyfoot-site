import Link from 'next/link';
import type { BrandConfig } from 'lib/config/brands';
import type { FonctionnalitesContent } from 'content/fonctionnalites';
import { BrandFonctionnalitesList } from './BrandFonctionnalitesList';

interface BrandFonctionnalitesProps {
  brand: BrandConfig;
  content: FonctionnalitesContent;
}

export function BrandFonctionnalites({ brand, content }: BrandFonctionnalitesProps) {
  return (
    <div className="relative min-h-screen w-full bg-[var(--brand-bg)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 brand-halo" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Hero */}
        <section aria-labelledby="fonc-hero-title" className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-cta)]/40 bg-[var(--brand-surface)]/50 px-3 py-1 text-xs font-semibold text-[var(--color-text-beige)]/90">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cta)]" />
            {content.heroTag}
          </span>
          <h1 id="fonc-hero-title" className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {content.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg md:text-xl font-medium text-[var(--color-text-beige)]">
            {content.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${brand.slug}/offres`}
              className="rounded-xl bg-[var(--brand-cta)] px-8 py-4 text-lg font-extrabold text-[var(--brand-bg)] shadow-xl transition hover:bg-[var(--brand-cta-hover)] active:scale-[.98]"
            >
              Essayer gratuitement
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-[var(--color-text-beige)]/60 px-8 py-4 text-lg font-bold text-[var(--color-text-beige)] transition hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)] active:scale-[.98]"
            >
              Demander une démo
            </Link>
          </div>
        </section>

        {/* Animated features + roles (client component) */}
        <BrandFonctionnalitesList
          features={content.features}
          rolesImpact={content.rolesImpact}
          sectionTitle={content.sectionTitle}
          impactTitle={content.impactTitle}
        />

        {/* CTA final */}
        <section aria-labelledby="fonc-cta-title" className="mt-16 text-center">
          <h2 id="fonc-cta-title" className="text-3xl md:text-4xl font-extrabold text-white">{content.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-[var(--color-text-beige)]">
            {content.ctaSubtitle}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${brand.slug}/offres`}
              className="rounded-xl bg-[var(--brand-cta)] px-8 py-4 text-lg font-extrabold text-[var(--brand-bg)] shadow-xl transition hover:bg-[var(--brand-cta-hover)] active:scale-[.98]"
            >
              Découvrir les offres
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
