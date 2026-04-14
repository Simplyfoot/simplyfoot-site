import type { Metadata } from 'next';
import Image from 'next/image';
import { getBrandConfig, BRAND_IDS } from 'lib/config/brands';
import type { BrandId } from 'lib/config/brands';
import { buildBrandMetadata, buildSoftwareApplicationJsonLd } from 'lib/seo/metadata';
import { getLandingContent } from 'content/landing';
import { BrandHero } from 'components/brand/BrandHero';
import { BrandManifest } from 'components/brand/BrandManifest';
import { BrandBenefits } from 'components/brand/BrandBenefits';
import { BrandModules } from 'components/brand/BrandModules';
import { BrandTestimonials } from 'components/brand/BrandTestimonials';
import { HandballIllustration } from 'components/brand/illustrations/HandballIllustration';
import { getBrandDictionary } from 'lib/i18n/getDictionary';
import Image3 from 'assets/images/3.jpg';
import SimoFootball from 'assets/images/Simofootball.png';
import LogoRugby from 'assets/images/logoSimplRugby.png';

export async function generateStaticParams() {
  return BRAND_IDS.map((brand) => ({ brand }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  const config = getBrandConfig(brand);
  const dict = await getBrandDictionary(config.id as BrandId);
  return buildBrandMetadata(config, {
    title: dict.meta.title,
    description: dict.meta.description,
    path: `/${config.slug}`,
  });
}

function FootIllustration() {
  return (
    <div className="relative w-[280px] h-[320px] md:w-[350px] md:h-[400px]">
      <Image
        src={SimoFootball}
        alt="Simmo, la mascotte SimplyFoot, en action avec un ballon"
        fill
        className="object-contain drop-shadow-2xl"
        priority
      />
    </div>
  );
}

function RugbyVisual() {
  return (
    <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
      <Image
        src={LogoRugby}
        alt="Logo SimplyRugby"
        fill
        className="object-contain drop-shadow-2xl"
        priority
      />
    </div>
  );
}

const SPORT_ILLUSTRATION: Record<BrandId, React.ReactNode> = {
  foot: <FootIllustration />,
  rugby: <RugbyVisual />,
  handball: <HandballIllustration className="w-[280px] h-[380px] md:w-[320px] md:h-[430px]" />,
};

const SPORT_LAYOUT: Record<BrandId, 'left' | 'center' | 'right'> = {
  foot: 'left',
  rugby: 'center',
  handball: 'right',
};

export default async function BrandLandingPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const config = getBrandConfig(brand);
  const content = await getLandingContent(config.id as BrandId);

  const jsonLd = buildSoftwareApplicationJsonLd(config);
  const brandId = config.id as BrandId;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="w-full flex flex-col items-center bg-[var(--brand-bg)] text-white">
      {/* HERO */}
      <BrandHero
        title={
          <>
            <span className="text-[var(--brand-cta)]">{content.hero.accent}</span>
            <br />
            <span className="block">{content.hero.title}</span>
          </>
        }
        subtitle={
          <>
            {content.hero.subtitle}
            <br />
            <span className="font-semibold text-[var(--color-text-beige)]">
              {content.hero.subtitleHighlight}
            </span>
          </>
        }
        actions={[
          { label: content.cta.requestDemo, href: `/${config.slug}/offres` },
          { label: 'Voir les fonctionnalités', href: `/${config.slug}/fonctionnalites`, variant: 'secondary' },
        ]}
        backgroundImage={brandId === 'foot' ? Image3 : undefined}
        illustration={SPORT_ILLUSTRATION[brandId]}
        layout={SPORT_LAYOUT[brandId]}
        stats={content.stats}
      />

      {/* MANIFESTE */}
      <BrandManifest manifest={content.manifest} />

      {/* BENEFICES */}
      <BrandBenefits title={content.benefitsTitle} benefits={content.benefits} />

      {/* MODULES */}
      <BrandModules
        title={
          <>
            Les <span className="text-[var(--brand-bg)]">{content.modulesTitleAccent}</span>{' '}
            {config.name}
          </>
        }
        modules={content.modules}
      />

      {/* TEMOIGNAGES */}
      <BrandTestimonials title={content.testimonialsTitle} testimonials={content.testimonials} />
    </div>
    </>
  );
}
