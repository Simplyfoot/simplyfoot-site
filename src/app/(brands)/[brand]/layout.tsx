import { notFound } from 'next/navigation';
import { getBrandConfig, isValidBrand, BRAND_IDS } from 'lib/config/brands';
import { BrandProvider } from 'lib/brands/brand-provider';

export function generateStaticParams() {
  return BRAND_IDS.map((brand) => ({ brand }));
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;

  if (!isValidBrand(brand)) notFound();

  const config = getBrandConfig(brand);

  return (
    <div data-brand={config.id}>
      <BrandProvider brand={config}>{children}</BrandProvider>
    </div>
  );
}
