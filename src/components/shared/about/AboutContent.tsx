import { BRANDS } from '@/utils/constants.utils';

import { AboutAct1 } from './AboutAct1';
import { AboutAct2 } from './AboutAct2';
import { AboutAct3 } from './AboutAct3';
import { AboutAct5 } from './AboutAct5';
import { AboutHero } from './AboutHero';
import { AboutManifesto } from './AboutManifesto';
import { AboutTeam } from './AboutTeam';

import type { AboutBrand } from '~types/about.types';

interface AboutContentProps {
    brand: AboutBrand;
}

/**
 * Orchestrateur "À propos" — compose les 7 sections narratives dans
 * l'ordre canonique. 100% server-rendered sauf les compteurs animés
 * (client island dans `<AnimatedCounter>`).
 *
 * Le composant est brand-agnostic via la prop `brand` ; la section hero
 * et l'acte 5 injectent le bon libellé / les bonnes routes de contact.
 */
export function AboutContent({ brand }: AboutContentProps) {
    const brandLabel = BRANDS[brand].label;

    return (
        <>
            <AboutHero brandLabel={brandLabel} />
            <AboutAct1 />
            <AboutAct2 />
            <AboutAct3 />
            <AboutTeam />
            <AboutManifesto />
            <AboutAct5 brand={brand} />
        </>
    );
}
