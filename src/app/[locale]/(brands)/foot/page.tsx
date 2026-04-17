import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AppScreenshots } from '@/components/brands/foot/AppScreenshots';
import { CartesRevolution } from '@/components/brands/foot/CartesRevolution';
import { CtaFinal } from '@/components/brands/foot/CtaFinal';
import { FeaturesGrid } from '@/components/brands/foot/FeaturesGrid';
import { HeroFoot } from '@/components/brands/foot/HeroFoot';
import { OffresPreview } from '@/components/brands/foot/OffresPreview';
import { PilotBanner } from '@/components/brands/foot/PilotBanner';
import { PilotClubsCarousel } from '@/components/brands/foot/PilotClubsCarousel';
import { ProfileCards } from '@/components/brands/foot/ProfileCards';
import { Roadmap } from '@/components/brands/foot/Roadmap';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { brandConfigs } from '@/lib/brand/config';
import { BrandProvider } from '@/lib/brand/context';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('foot.meta');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function FootPage() {
    return (
        <BrandProvider config={brandConfigs.foot}>
            <ScrollProgress />
            <main>
                <section aria-label="Hero">
                    <HeroFoot />
                </section>

                <section aria-label="Programme pilote">
                    <PilotBanner />
                </section>

                <section aria-label="Clubs pilotes">
                    <PilotClubsCarousel />
                </section>

                <section aria-label="Cartes SimplyFoot — Revenus pour le club">
                    <CartesRevolution />
                </section>

                <section aria-label="Profils">
                    <ProfileCards />
                </section>

                <section aria-label="Fonctionnalités">
                    <FeaturesGrid />
                </section>

                <section aria-label="Captures d'écran">
                    <AppScreenshots />
                </section>

                <section aria-label="Aperçu des offres">
                    <OffresPreview />
                </section>

                <section aria-label="Roadmap">
                    <Roadmap />
                </section>

                <section aria-label="Appel à l'action">
                    <CtaFinal />
                </section>
            </main>
        </BrandProvider>
    );
}
