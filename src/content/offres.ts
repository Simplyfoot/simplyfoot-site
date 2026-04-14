import type { BrandId } from 'lib/config/brands';
import { getBrandDictionary } from 'lib/i18n/getDictionary';

export interface OffresContent {
  heroTitle: string;
  heroSubtitle: string;
  trialTitle: string;
  trialItems: [string, string, string];
  appTitle: string;
  appComingSoon: string;
  meta: { title: string; description: string };
}

export async function getOffresContent(brandId: BrandId): Promise<OffresContent> {
  const dict = await getBrandDictionary(brandId);
  const o = dict.offres;
  return {
    heroTitle: o.heroTitle as string,
    heroSubtitle: o.heroSubtitle as string,
    trialTitle: o.trialTitle as string,
    trialItems: [o.trialItem1 as string, o.trialItem2 as string, o.trialItem3 as string],
    appTitle: o.appTitle as string,
    appComingSoon: o.appComingSoon as string,
    meta: o.meta as { title: string; description: string },
  };
}
