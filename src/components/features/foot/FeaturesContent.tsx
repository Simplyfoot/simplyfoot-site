import { DifferentiationSection } from './DifferentiationSection';
import { FeatureGrid } from './FeatureGrid';
import { FeaturesFaq } from './FeaturesFaq';
import { FeaturesFinalCta } from './FeaturesFinalCta';
import { FeaturesHero } from './FeaturesHero';
import { FeaturesPromise } from './FeaturesPromise';
import { FeaturesTimelineSection } from './FeaturesTimelineSection';
import { HumanDimension } from './HumanDimension';
import { InnovationTeaser } from './InnovationTeaser';
import { PilotCommitment } from './PilotCommitment';
import { ProblemSection } from './ProblemSection';
import { ProfileSelector } from './ProfileSelector';
import { SocialProof } from './SocialProof';

interface FeaturesContentProps {
    /** Nombre de jours avant la prochaine MAJ — calculé côté serveur. */
    daysUntilNext: number;
}

/**
 * Orchestrateur landing `/foot/features`. Ordre narratif de la V3 :
 * promesse → empathie → résumé chiffré → projection par rôle →
 * matérialisation (features + roadmap) → teasing innovation → pièces
 * émotionnelles (humain + différenciation + preuves) → engagement →
 * désamorçage (FAQ) → CTA final.
 *
 * Chaque section est autonome (import direct, pas de prop-drilling),
 * laissant chaque composant décider de son besoin de `'use client'`.
 * L'orchestrateur reste un Server Component pour bénéficier de la
 * résolution i18n serveur.
 */
export function FeaturesContent({ daysUntilNext }: FeaturesContentProps) {
    return (
        <>
            <FeaturesHero />

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 py-16 sm:px-6 md:gap-32 md:py-24">
                <ProblemSection />
                <FeaturesPromise />
                <ProfileSelector />
                <FeatureGrid />
                <FeaturesTimelineSection daysUntilNext={daysUntilNext} />
                <InnovationTeaser />
                <HumanDimension />
                <DifferentiationSection />
                <SocialProof />
                <PilotCommitment />
                <FeaturesFaq />
                <FeaturesFinalCta />
            </div>
        </>
    );
}
