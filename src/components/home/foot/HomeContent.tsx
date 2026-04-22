import { InnovationTeaser } from '@/components/features/foot/InnovationTeaser';

import { HomeFinalCta } from './HomeFinalCta';
import { HomeHero } from './HomeHero';
import { HomeManifesto } from './HomeManifesto';
import { HomeMockupHero } from './HomeMockupHero';
import { HomeNumbers } from './HomeNumbers';
import { HomeRoleTriptych } from './HomeRoleTriptych';
import { HomeWhisper } from './HomeWhisper';

/**
 * Orchestrateur de la home `/foot/`. Enchaînement cinématique en 8
 * scènes, alternance sombre/clair pour le rythme, zéro redite avec la
 * landing Features.
 *
 * Ordre narratif :
 *   1. Hero sobre — promesse en un titre.
 *   2. Whisper — douleur reconnue.
 *   3. Manifesto — 5 lignes qui nomment les rôles et scellent la promesse.
 *   4. Mockup hero — UNE image iconique.
 *   5. Triptyque rôles — 3 mockups posés, lien vers Features.
 *   6. Numbers — 3 chiffres cinémas plein écran.
 *   7. Innovation teaser — seule pièce mutualisée (déjà cinématique).
 *   8. CTA final — question ouverte, SIMO.
 *
 * Les sections plein-viewport (Hero / Manifesto / MockupHero / Numbers /
 * FinalCta) débordent du conteneur pour produire un vrai rythme bande-
 * annonce ; les sections "respiration" (Whisper / Triptyque) gardent
 * leurs paddings naturels.
 */
export function HomeContent() {
    return (
        <>
            <HomeHero />
            <HomeWhisper />
            <HomeManifesto />
            <HomeMockupHero />
            <HomeRoleTriptych />
            <HomeNumbers />
            <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
                <InnovationTeaser />
            </div>
            <HomeFinalCta />
        </>
    );
}
