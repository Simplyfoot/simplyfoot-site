import type { BrandId } from 'lib/config/brands';
import { getBrandDictionary } from 'lib/i18n/getDictionary';

export interface FeatureItem {
  title: string;
  desc: string;
  tag: string;
  icon: string;
}

export interface RoleImpact {
  role: string;
  items: string[];
}

export interface FonctionnalitesContent {
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  sectionTitle: string;
  impactTitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  features: FeatureItem[];
  rolesImpact: RoleImpact[];
  meta: { title: string; description: string };
}

export async function getFonctionnalitesContent(
  brandId: BrandId,
): Promise<FonctionnalitesContent> {
  const dict = await getBrandDictionary(brandId);
  const f = dict.fonctionnalites as FonctionnalitesContent;
  return f;
}
