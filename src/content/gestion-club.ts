import type { BrandId } from 'lib/config/brands';
import { getBrandDictionary } from 'lib/i18n/getDictionary';

export interface GestionClubContent {
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPoints: [string, string, string, string];
  divisionsTitle: string;
  divisionsSubtitle: string;
  modulesTitle: string;
  dashboardTitle: string;
  dashboardPoints: [string, string, string, string];
  ctaTitle: string;
  cta1Label: string;
  imageAlt: string;
  meta: { title: string; description: string };
}

export async function getGestionClubContent(brandId: BrandId): Promise<GestionClubContent> {
  const dict = await getBrandDictionary(brandId);
  const g = dict.gestionClub;
  return {
    heroTag: g.heroTag as string,
    heroTitle: g.heroTitle as string,
    heroSubtitle: g.heroSubtitle as string,
    heroPoints: [
      g.heroPoint1 as string,
      g.heroPoint2 as string,
      g.heroPoint3 as string,
      g.heroPoint4 as string,
    ],
    divisionsTitle: g.divisionsTitle as string,
    divisionsSubtitle: g.divisionsSubtitle as string,
    modulesTitle: g.modulesTitle as string,
    dashboardTitle: g.dashboardTitle as string,
    dashboardPoints: [
      g.dashboardPoint1 as string,
      g.dashboardPoint2 as string,
      g.dashboardPoint3 as string,
      g.dashboardPoint4 as string,
    ],
    ctaTitle: g.ctaTitle as string,
    cta1Label: g.cta1Label as string,
    imageAlt: g.imageAlt as string,
    meta: g.meta as { title: string; description: string },
  };
}
