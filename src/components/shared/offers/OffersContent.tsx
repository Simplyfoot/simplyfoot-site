'use client';

import { useState } from 'react';

import { ANNUAL_DISCOUNT, DEFAULT_LICENSEES, pickPlanForLicensees } from '@/config/offers';

import { BillingCycleToggle } from './BillingCycleToggle';
import { FeaturedPlanCard } from './FeaturedPlanCard';
import { FinalCta } from './FinalCta';
import { LicenseeSelector } from './LicenseeSelector';
import { OffersFaq } from './OffersFaq';
import { OffersHero } from './OffersHero';
import { TrustStrip } from './TrustStrip';

import type { BillingCycle } from '~types/offers.types';

/**
 * Orchestrateur de la page Offres. Client component car il porte deux états
 * interactifs partagés : cadence de facturation (mensuel/annuel) et taille
 * du club (slider de licenciés). Le slider pilote **l'unique** carte plan
 * affichée — pas de grille, pas de comparaison : une seule offre visible
 * à la fois, celle qui correspond au club.
 *
 * Parcours CRO simplifié (une décision à la fois) :
 *   1. Hero : promesse centrale (0 décision).
 *   2. Sélecteur licenciés → sélectionne le plan affiché.
 *   3. Toggle mensuel/annuel + unique carte plan.
 *   4. TrustStrip condensé (tout inclus + rassurance).
 *   5. FAQ.
 *   6. CTA final.
 */
export function OffersContent() {
    const [cycle, setCycle] = useState<BillingCycle>('monthly');
    const [licensees, setLicensees] = useState<number>(DEFAULT_LICENSEES);

    const matchedPlan = pickPlanForLicensees(licensees);

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 md:gap-24 md:py-20">
            <OffersHero />

            <div className="flex flex-col gap-8">
                <LicenseeSelector value={licensees} onChangeAction={setLicensees} />

                <div className="flex justify-center">
                    <BillingCycleToggle
                        value={cycle}
                        onChange={setCycle}
                        annualDiscount={ANNUAL_DISCOUNT}
                    />
                </div>

                <FeaturedPlanCard plan={matchedPlan} cycle={cycle} />
            </div>

            <TrustStrip />

            <OffersFaq />

            <FinalCta defaultPlanId={matchedPlan.id} />
        </div>
    );
}
