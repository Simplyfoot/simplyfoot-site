import type { BrandId } from 'lib/config/brands';
import { getBrandDictionary } from 'lib/i18n/getDictionary';

export interface GestionEquipeContent {
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPoints: [string, string, string, string];
  divisionsTitle: string;
  modulesTitle: string;
  ctaTitle: string;
  imageAlt: string;
  meta: { title: string; description: string };
}

export async function getGestionEquipeContent(brandId: BrandId): Promise<GestionEquipeContent> {
  const dict = await getBrandDictionary(brandId);
  const g = dict.gestionEquipe;
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
    modulesTitle: g.modulesTitle as string,
    ctaTitle: g.ctaTitle as string,
    imageAlt: g.imageAlt as string,
    meta: g.meta as { title: string; description: string },
  };
}
