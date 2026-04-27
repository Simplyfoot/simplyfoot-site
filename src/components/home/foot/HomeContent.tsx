import { HomeFinalCta } from './HomeFinalCta';
import { HomeHero } from './HomeHero';
import { HomeRoleTriptych } from './HomeRoleTriptych';
import { PilotClubsCarousel } from './PilotClubsCarousel';

/**
 * Orchestrateur de la home `/foot/` — version courte. Quatre sections,
 * trois "écrans" en moyenne sur desktop, contenu humain et marketing :
 *
 *   1. Hero — promesse + CTA principal + iPhone mockup + planète 3D.
 *   2. PilotClubsCarousel — preuve sociale immédiate (clubs partenaires
 *      en marquise infinie).
 *   3. RoleTriptych — trois rôles, trois mockups, lien vers Features.
 *   4. FinalCta — invitation pilote.
 *
 * Décision produit du 2026-04-27 : retrait des sections `HomeWhisper`,
 * `HomeManifesto`, `HomeMockupHero`, `HomeNumbers` et de l'innovation
 * teaser pour réduire le scroll de moitié et garder un focus marketing
 * fort. Les composants supprimés sont récupérables via git.
 */
export function HomeContent() {
    return (
        <>
            <HomeHero />
            <PilotClubsCarousel />
            <HomeRoleTriptych />
            <HomeFinalCta />
        </>
    );
}
