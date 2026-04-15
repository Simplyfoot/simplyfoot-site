import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getBrandConfig, BRAND_IDS, isValidBrand } from 'lib/config/brands';
import { buildBrandMetadata } from 'lib/seo/metadata';
import { footFaq } from 'content/faq/foot-faq';
import { FaqPageClient } from './FaqPageClient';

export function generateStaticParams() {
  return BRAND_IDS.map((brand) => ({ brand }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  if (!isValidBrand(brand)) return {};
  const config = getBrandConfig(brand);
  return buildBrandMetadata(config, {
    title: `FAQ ${config.name} \u2014 Foire Aux Questions`,
    description: `Retrouvez toutes les r\u00e9ponses aux questions fr\u00e9quentes sur ${config.name} : inscription, \u00e9quipes, convocations, calendrier, notifications et support.`,
    path: `/${config.slug}/faq`,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  if (!isValidBrand(brand)) notFound();
  const config = getBrandConfig(brand);

  // Only foot has full FAQ for now
  if (brand !== 'foot') {
    return (
      <div className="relative min-h-screen w-full bg-[var(--brand-bg)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 brand-halo" />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-[var(--color-text-beige)] sm:text-4xl">
            FAQ {config.name}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-beige)]/60">
            La FAQ {config.name} sera bient\u00f4t disponible. En attendant, consultez la{' '}
            <Link href="/foot/faq" className="text-[var(--brand-cta)] underline underline-offset-2 hover:opacity-80">
              FAQ SimplyFoot
            </Link>{' '}
            ou contactez-nous.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-[var(--brand-cta)] px-6 py-3 text-sm font-bold text-[var(--brand-cta-text)] transition-colors hover:opacity-90"
            >
              Nous contacter
            </Link>
            <Link
              href="/foot/faq"
              className="rounded-xl border border-[var(--brand-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-beige)] transition-colors hover:bg-white/5"
            >
              Voir la FAQ SimplyFoot
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[var(--brand-bg)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 brand-halo" />
      <FaqPageClient categories={footFaq} brandName={config.name} />
    </div>
  );
}
