import type { Metadata } from 'next';
import { getBrandConfig, BRAND_IDS } from 'lib/config/brands';
import type { BrandId } from 'lib/config/brands';
import { buildBrandMetadata, buildBreadcrumbJsonLd } from 'lib/seo/metadata';
import { siteConfig } from 'lib/config/site';
import { getGestionEquipeContent } from 'content/gestion-equipe';
import { BrandGestionEquipe } from 'components/brand/BrandGestionEquipe';

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
  const content = await getGestionEquipeContent(config.id as BrandId);
  return buildBrandMetadata(config, {
    title: content.meta.title,
    description: content.meta.description,
    path: `/${config.slug}/gestion-equipe`,
  });
}

export default async function GestionEquipePage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const config = getBrandConfig(brand);
  const content = await getGestionEquipeContent(config.id as BrandId);

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Simply', url: siteConfig.url },
    { name: config.name, url: `${siteConfig.url}/${config.slug}` },
    { name: "Gestion d'équipe", url: `${siteConfig.url}/${config.slug}/gestion-equipe` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <BrandGestionEquipe brand={config} content={content} />
    </>
  );
}
