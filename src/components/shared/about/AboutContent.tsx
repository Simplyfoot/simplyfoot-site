import { BRANDS } from '@/utils/constants.utils';

import { AboutHero } from './AboutHero';
import { AboutStory } from './AboutStory';
import { AboutTeam } from './AboutTeam';

import type { AboutBrand } from '~types/about.types';

interface AboutContentProps {
    brand: AboutBrand;
}

/**
 * Page "À propos" simplifiée : hero, récit en 5 paragraphes, équipe.
 * Server-rendered de bout en bout — aucun client island.
 */
export function AboutContent({ brand }: AboutContentProps) {
    const brandLabel = BRANDS[brand].label;

    return (
        <>
            <AboutHero brandLabel={brandLabel} />
            <AboutStory />
            <AboutTeam />
        </>
    );
}
