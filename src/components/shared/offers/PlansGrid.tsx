import { pickPlanForLicensees, PLANS } from '@/config/offers';
import { cn } from '@/lib/utils';

import { PlanCard } from './PlanCard';

import type { BillingCycle } from '~types/offers.types';

interface PlansGridProps {
    cycle: BillingCycle;
    /** Nombre de licenciés choisi par l'utilisateur — le plan correspondant est mis en surbrillance. */
    selectedLicensees: number;
    className?: string;
}

/**
 * Grille des 6 plans. Colonnes responsives 1 / 2 / 3 — sur 3 colonnes
 * desktop, le plan recommandé tombe naturellement au centre de la ligne du
 * haut grâce à l'ordre de la config. Le plan assorti au slider a une
 * bordure verte renforcée.
 */
export function PlansGrid({ cycle, selectedLicensees, className }: PlansGridProps) {
    const recommendedBySize = pickPlanForLicensees(selectedLicensees);

    return (
        <section
            aria-label="Plans"
            className={cn('grid grid-cols-1 gap-5 pt-4 sm:grid-cols-2 xl:grid-cols-3', className)}
        >
            {PLANS.map((plan) => (
                <PlanCard
                    key={plan.id}
                    plan={plan}
                    cycle={cycle}
                    highlighted={plan.id === recommendedBySize.id}
                />
            ))}
        </section>
    );
}
