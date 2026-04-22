'use client';

import { useState } from 'react';

import { DEFAULT_LICENSEES, pickPlanForLicensees } from '@/config/offers';

import { AllIncludedBanner } from './AllIncludedBanner';
import { BenefitsSection } from './BenefitsSection';
import { FinalCta } from './FinalCta';
import { LicenseeSelector } from './LicenseeSelector';
import { OffersFaq } from './OffersFaq';
import { OffersHero } from './OffersHero';
import { PlansGrid } from './PlansGrid';
import { ReassuranceSection } from './ReassuranceSection';

import type { BillingCycle } from '~types/offers.types';

/**
 * Orchestrateur de la page Offres. Client component car il porte deux états
 * interactifs partagés : cadence de facturation (mensuel/annuel) et taille
 * du club (slider de licenciés). Ces deux inputs pilotent la surbrillance
 * du plan recommandé et les prix affichés sur les cartes.
 *
 * L'ordre des sections suit un parcours CRO-first :
 *   1. Hero + toggle (5 s)
 *   2. Sélecteur licenciés → surbrillance plan (10 s)
 *   3. Grille des 6 plans (décision)
 *   4. "Toutes les fonctionnalités incluses" (désambiguïsation)
 *   5. Bénéfices produit (preuve de valeur)
 *   6. Rassurance (levée d'objections)
 *   7. FAQ (dernières hésitations)
 *   8. CTA final (repli haute conversion)
 */
export function OffersContent() {
    const [cycle, setCycle] = useState<BillingCycle>('monthly');
    const [licensees, setLicensees] = useState<number>(DEFAULT_LICENSEES);

    const recommendedPlan = pickPlanForLicensees(licensees);

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 md:gap-24 md:py-20">
            <OffersHero cycle={cycle} onCycleChange={setCycle} />

            <LicenseeSelector value={licensees} onChange={setLicensees} />

            <PlansGrid cycle={cycle} selectedLicensees={licensees} />

            <AllIncludedBanner />

            <BenefitsSection />

            <ReassuranceSection />

            <OffersFaq />

            <FinalCta defaultPlanId={recommendedPlan.id} />
        </div>
    );
}
