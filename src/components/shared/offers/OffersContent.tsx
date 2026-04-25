'use client';

import { useState } from 'react';

import { ANNUAL_DISCOUNT, DEFAULT_SIZE } from '@/config/offers';

import { FinalCta } from './FinalCta';
import { ModulesBlock } from './ModulesBlock';
import { OffersFaq } from './OffersFaq';
import { OffersHero } from './OffersHero';
import { PricingControls } from './PricingControls';
import { ReversionHighlight } from './ReversionHighlight';
import { TierComparison } from './TierComparison';
import { TrustStrip } from './TrustStrip';

import type { BillingCycle, ClubSize } from '~types/offers.types';

/**
 * Orchestrateur de la page `/foot/offers` — aligné modèle économique V2.1.
 *
 * Flux narratif :
 *   1. Hero : pitch "logiciel qui rapporte".
 *   2. ReversionHighlight : le différenciateur take-rate, en force.
 *   3. Bloc tarifs unifié — `PricingControls` (sticky) + `TierComparison`
 *      groupés dans le même parent. La barre se "stuck" en haut du
 *      viewport tant que l'utilisateur navigue dans les cartes, puis se
 *      libère naturellement quand on scrolle au-delà (parent CSS borné).
 *      Aucun aller-retour scroll : l'utilisateur change taille/cadence
 *      sans quitter les cartes des yeux.
 *   4. ModulesBlock : les 3 add-ons STARTER (inclus dans CLUB).
 *   5. TrustStrip : rassurance condensée.
 *   6. FAQ pricing.
 *   7. CTA final.
 */
export function OffersContent() {
    const [cycle, setCycle] = useState<BillingCycle>('monthly');
    const [size, setSize] = useState<ClubSize>(DEFAULT_SIZE);

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 md:gap-24 md:py-20">
            <OffersHero />

            <ReversionHighlight />

            <div className="relative flex flex-col gap-6">
                <PricingControls
                    size={size}
                    cycle={cycle}
                    onSizeChange={setSize}
                    onCycleChange={setCycle}
                    annualDiscount={ANNUAL_DISCOUNT}
                    className="sticky top-20 z-20 mx-auto w-full max-w-4xl"
                />
                <TierComparison size={size} cycle={cycle} />
            </div>

            <ModulesBlock />

            <TrustStrip />

            <OffersFaq />

            <FinalCta defaultPlanId="club" defaultSize={size} defaultCycle={cycle} />
        </div>
    );
}
