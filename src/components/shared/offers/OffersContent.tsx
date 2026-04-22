'use client';

import { useState } from 'react';

import { ANNUAL_DISCOUNT, DEFAULT_SIZE } from '@/config/offers';

import { BillingCycleToggle } from './BillingCycleToggle';
import { FinalCta } from './FinalCta';
import { ModulesBlock } from './ModulesBlock';
import { OffersFaq } from './OffersFaq';
import { OffersHero } from './OffersHero';
import { ReversionHighlight } from './ReversionHighlight';
import { SizeSelector } from './SizeSelector';
import { TierComparison } from './TierComparison';
import { TrustStrip } from './TrustStrip';

import type { BillingCycle, ClubSize } from '~types/offers.types';

/**
 * Orchestrateur de la page `/foot/offers` — aligné modèle économique V2.1.
 *
 * Flux narratif :
 *   1. Hero : pitch "logiciel qui rapporte".
 *   2. ReversionHighlight : le différenciateur take-rate, en force.
 *   3. SizeSelector + BillingCycleToggle : les deux inputs utilisateurs.
 *   4. TierComparison : 3 tiers (DÉCOUVERTE / STARTER / CLUB) en colonnes,
 *      prix adaptés à la taille et à la cadence.
 *   5. ModulesBlock : les 3 add-ons STARTER (inclus dans CLUB).
 *   6. TrustStrip : rassurance condensée.
 *   7. FAQ pricing (9 questions dont take-rate et modules).
 *   8. CTA final.
 *
 * Les deux états locaux — `size` et `cycle` — sont co-propagés vers
 * TierComparison pour le pricing live. Le tier recommandé (CLUB) est
 * pré-sélectionné implicitement via `plan.recommended` dans la config.
 */
export function OffersContent() {
    const [cycle, setCycle] = useState<BillingCycle>('monthly');
    const [size, setSize] = useState<ClubSize>(DEFAULT_SIZE);

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 md:gap-24 md:py-20">
            <OffersHero />

            <ReversionHighlight />

            <div className="flex flex-col gap-6">
                <SizeSelector value={size} onChangeAction={setSize} />

                <div className="flex justify-center">
                    <BillingCycleToggle
                        value={cycle}
                        onChange={setCycle}
                        annualDiscount={ANNUAL_DISCOUNT}
                    />
                </div>

                <TierComparison size={size} cycle={cycle} />
            </div>

            <ModulesBlock />

            <TrustStrip />

            <OffersFaq />

            <FinalCta defaultPlanId="club" defaultSize={size} defaultCycle={cycle} />
        </div>
    );
}
