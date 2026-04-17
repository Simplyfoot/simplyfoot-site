import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AboutHero } from '@/components/brands/foot/about/AboutHero';
import { Act1Section } from '@/components/brands/foot/about/Act1Section';
import { Act2Section } from '@/components/brands/foot/about/Act2Section';
import { Act3Section } from '@/components/brands/foot/about/Act3Section';
import { Act5Section } from '@/components/brands/foot/about/Act5Section';
import { TeamSection } from '@/components/brands/foot/about/TeamSection';
import { ManifestoSection } from '@/components/brands/foot/ManifestoSection';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { brandConfigs } from '@/lib/brand/config';
import { BrandProvider } from '@/lib/brand/context';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('about.meta');
    return { title: t('title'), description: t('description') };
}

export default function AProposPage() {
    return (
        <BrandProvider config={brandConfigs.foot}>
            <ScrollProgress />
            <main>
                <AboutHero />
                <Act1Section />
                <Act2Section />
                <Act3Section />
                <TeamSection />
                <ManifestoSection />
                <Act5Section />
            </main>
        </BrandProvider>
    );
}
