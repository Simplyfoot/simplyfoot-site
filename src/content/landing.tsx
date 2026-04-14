import type { BrandId } from 'lib/config/brands';
import type { FeatureDTO } from 'lib/contracts/feature.dto';
import type { TestimonialDTO } from 'lib/contracts/testimonial.dto';
import { getBrandDictionary, getDictionary } from 'lib/i18n/getDictionary';

export interface LandingHeroContent {
  accent: string;
  title: string;
  subtitle: string;
  subtitleHighlight: string;
  statline: string;
}

export interface ManifestContent {
  eyebrow: string;
  phrase: string;
  statement: string;
}

export interface LandingContent {
  hero: LandingHeroContent;
  manifest: ManifestContent;
  benefitsTitle: string;
  benefits: FeatureDTO[];
  modulesTitle: string;
  modulesTitleAccent: string;
  modules: FeatureDTO[];
  testimonialsTitle: string;
  testimonials: TestimonialDTO[];
  partnersSubtitle: string;
  clubLogosSubtitle: string;
  stats: { value: string; label: string }[];
  cta: { requestDemo: string };
}

function toBenefits(items: { title: string; description: string; icon: string }[]): FeatureDTO[] {
  return items.map((item, i) => ({
    id: `b-${i}`,
    title: item.title,
    description: item.description,
    iconName: item.icon,
    tag: null,
    category: 'benefit' as const,
  }));
}

function toModules(items: { title: string; description: string; icon: string }[]): FeatureDTO[] {
  return items.map((item, i) => ({
    id: `m-${i}`,
    title: item.title,
    description: item.description,
    iconName: item.icon,
    tag: null,
    category: 'module' as const,
  }));
}

function toTestimonials(
  items: { authorName: string; authorRole: string; quote: string; avatarUrl: string | null }[],
): TestimonialDTO[] {
  return items.map((item, i) => ({
    id: `t-${i}`,
    authorName: item.authorName,
    authorRole: item.authorRole,
    quote: item.quote,
    avatarUrl: item.avatarUrl,
    rating: 5,
  }));
}

export async function getLandingContent(brandId: BrandId): Promise<LandingContent> {
  const [brandDict, commonDict] = await Promise.all([
    getBrandDictionary(brandId),
    getDictionary('fr', 'common'),
  ]);

  return {
    hero: {
      accent: brandDict.hero.accent,
      title: brandDict.hero.title,
      subtitle: brandDict.hero.subtitle,
      subtitleHighlight: brandDict.hero.subtitleHighlight,
      statline: brandDict.hero.statline,
    },
    manifest: {
      eyebrow: brandDict.manifest.eyebrow,
      phrase: brandDict.manifest.phrase,
      statement: brandDict.manifest.statement,
    },
    benefitsTitle: brandDict.benefits.title,
    benefits: toBenefits(brandDict.benefits.items),
    modulesTitle: brandDict.modules.title,
    modulesTitleAccent: brandDict.modules.titleAccent,
    modules: toModules(brandDict.modules.items),
    testimonialsTitle: commonDict.sections.testimonialsTitle,
    testimonials: toTestimonials(brandDict.testimonials),
    partnersSubtitle: brandDict.partners.subtitle,
    clubLogosSubtitle: brandDict.clubLogos.subtitle,
    stats: [
      { value: commonDict.stats.hundredPercent, label: commonDict.stats.dedicatedAmateur },
      { value: brandDict.hero.statline, label: '' },
    ],
    cta: {
      requestDemo: commonDict.cta.requestDemo,
    },
  };
}
