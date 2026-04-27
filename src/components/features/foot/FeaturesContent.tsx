import { CurrentFeaturesList } from './CurrentFeaturesList';
import { FeaturesFinalCta } from './FeaturesFinalCta';
import { FeaturesHero } from './FeaturesHero';

/**
 * Page `/foot/features` — version courte et concrète. Trois sections :
 *
 *   1. Hero — promesse simple ("voici ce qu'on fait aujourd'hui").
 *   2. CurrentFeaturesList — 4 cartes égales pour les 4 fonctionnalités
 *      réellement disponibles : événements, calendrier, messagerie, rôles.
 *   3. FinalCta — invitation programme pilote.
 *
 * Décision produit du 2026-04-27 : retrait des sections roadmap, problem,
 * promise, profile-selector, differentiation, human, innovation teaser,
 * social proof, pilot commitment et FAQ — la page ne promet que ce qui
 * est livré, le reste arrive avec les clubs pilotes. Composants
 * supprimés du disque ; restauration via `git log` si besoin.
 */
export function FeaturesContent() {
    return (
        <>
            <FeaturesHero />
            <CurrentFeaturesList />
            <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
                <FeaturesFinalCta />
            </div>
        </>
    );
}
