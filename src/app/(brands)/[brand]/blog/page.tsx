import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getBrandConfig, BRAND_IDS } from 'lib/config/brands';
import type { BrandId } from 'lib/config/brands';
import { buildBrandMetadata } from 'lib/seo/metadata';
import { BlogPageClient } from './BlogPageClient';

export function generateStaticParams() {
  return BRAND_IDS.map((brand) => ({ brand }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  const config = getBrandConfig(brand);
  return buildBrandMetadata(config, {
    title: `Actualités ${config.name}`,
    description: `Toute l'actualité ${config.sport} amateur : conseils, résultats, témoignages et mises à jour ${config.name}.`,
    path: `/${config.slug}/blog`,
  });
}

export default async function BlogListPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const config = getBrandConfig(brand);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 brand-halo" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Actualités <span className="text-[var(--brand-cta)]">{config.name}</span>
          </h1>
          <p className="mt-3 text-lg text-[var(--color-text-beige)]/70 max-w-2xl mx-auto">
            Conseils, résultats, témoignages et nouveautés pour votre club de {config.sport} amateur.
          </p>
        </div>
        <Suspense fallback={<div className="text-center text-white/40 py-20">Chargement...</div>}>
          <BlogPageClient brandSlug={config.slug} brandId={config.id as BrandId} />
        </Suspense>
      </div>
    </div>
  );
}
