'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Building, Trophy, Crown, Check } from 'lucide-react';
import { cn } from 'lib/utils/cn';

const CLUB_SIZES = [
  { id: 'xs', label: 'Petit club', range: '1 à 30 licenciés', monthly: 4.99, Icon: Shield },
  { id: 'sm', label: 'Club local', range: '31 à 75 licenciés', monthly: 9.99, Icon: Users },
  { id: 'md', label: 'Club régional', range: '76 à 150 licenciés', monthly: 14.99, Icon: Building },
  { id: 'lg', label: 'Grand club', range: '151 à 300 licenciés', monthly: 24.99, Icon: Trophy },
  { id: 'xl', label: 'Club élite', range: '300+ licenciés', monthly: null, Icon: Crown },
] as const;

const FEATURES = [
  'Toutes les fonctionnalités incluses',
  'Gestion complète du club',
  'Gestion des équipes et effectifs',
  'Convocations automatisées',
  'Communication club intégrée',
  'Applications mobiles iOS & Android',
  'Support réactif par email',
  'Sécurité & conformité RGPD',
  'Mise en route accompagnée',
  'Mises à jour incluses',
];

const eur = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});

interface PricingCalculatorProps {
  brandName: string;
  trialTitle: string;
  trialItems: [string, string, string];
}

export function PricingCalculator({ brandName: _brandName, trialTitle, trialItems }: PricingCalculatorProps) {
  const [selected, setSelected] = useState<string>('sm');
  const [isAnnual, setIsAnnual] = useState(true);

  const plan = CLUB_SIZES.find((s) => s.id === selected)!;

  const pricing = plan.monthly
    ? isAnnual
      ? {
          display: eur.format(+(plan.monthly * 12 * 0.9 / 12).toFixed(2)),
          total: eur.format(+(plan.monthly * 12 * 0.9).toFixed(2)),
          savings: eur.format(+(plan.monthly * 12 * 0.1).toFixed(2)),
          period: 'mois (facturé annuellement)',
        }
      : {
          display: eur.format(plan.monthly),
          total: eur.format(plan.monthly),
          savings: null,
          period: 'mois',
        }
    : null;

  return (
    <div className="mt-12 space-y-10">
      {/* Step 1: Club size selector */}
      <div>
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Combien de licenciés dans votre club ?
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {CLUB_SIZES.map((size) => {
            const isActive = selected === size.id;
            return (
              <button
                key={size.id}
                onClick={() => setSelected(size.id)}
                className={cn(
                  'group relative flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-5 transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'border-[var(--brand-cta)] bg-[var(--brand-cta)]/10 shadow-lg shadow-[var(--brand-cta)]/10 scale-[1.02]'
                    : 'border-[var(--brand-border)] bg-[var(--brand-surface)]/30 hover:border-[var(--brand-cta)]/50 hover:bg-[var(--brand-surface)]/50',
                )}
              >
                <size.Icon
                  className={cn(
                    'h-7 w-7 transition-colors',
                    isActive ? 'text-[var(--brand-cta)]' : 'text-white/40 group-hover:text-white/60',
                  )}
                  strokeWidth={1.5}
                />
                <span className={cn('text-sm font-bold', isActive ? 'text-white' : 'text-white/70')}>
                  {size.label}
                </span>
                <span className="text-[11px] text-[var(--color-text-beige)]/70">{size.range}</span>
                {size.monthly && (
                  <span className={cn('text-xs font-semibold', isActive ? 'text-[var(--brand-cta)]' : 'text-white/40')}>
                    dès {eur.format(size.monthly)}/mois
                  </span>
                )}
                {!size.monthly && (
                  <span className="text-xs font-semibold text-[var(--brand-cta)]">Sur devis</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Price display */}
      {pricing ? (
        <div className="mx-auto max-w-2xl">
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-surface)]/70 p-1 ring-1 ring-[var(--brand-cta)]/30">
              <button
                onClick={() => setIsAnnual(false)}
                className={cn(
                  'cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-all',
                  !isAnnual
                    ? 'bg-[var(--brand-cta)] text-[var(--brand-bg)]'
                    : 'text-[var(--color-text-beige)] hover:text-white',
                )}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={cn(
                  'cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-all',
                  isAnnual
                    ? 'bg-[var(--brand-cta)] text-[var(--brand-bg)]'
                    : 'text-[var(--color-text-beige)] hover:text-white',
                )}
              >
                Annuel <span className="ml-1 text-xs opacity-80">(-10%)</span>
              </button>
            </div>
          </div>

          {/* Price card */}
          <div className="rounded-3xl border-2 border-[var(--brand-cta)]/30 bg-[var(--color-surface-card)] p-8 md:p-10 text-center shadow-2xl">
            <p className="text-sm font-semibold text-[var(--color-text-dark)]/60 uppercase tracking-wide mb-2">
              {plan.label} — {plan.range}
            </p>
            <div className="text-5xl md:text-6xl font-extrabold text-[var(--brand-bg)] mb-1">
              {pricing.display}
            </div>
            <p className="text-sm text-[var(--color-text-dark)]/70 mb-2">
              / {pricing.period}
            </p>
            {isAnnual && pricing.savings && (
              <p className="inline-block rounded-full bg-[var(--brand-cta)]/15 px-3 py-1 text-xs font-bold text-[var(--brand-cta)] mb-6">
                Économisez {pricing.savings}/an
              </p>
            )}
            {!isAnnual && <div className="mb-6" />}

            {/* Features */}
            <ul className="text-left space-y-2 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-surface-dark)]">
                  <Check className="h-4 w-4 mt-0.5 text-[var(--brand-cta)] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/impatient"
              className="block w-full rounded-xl bg-[var(--brand-cta)] py-4 text-center text-lg font-extrabold text-[var(--brand-bg)] shadow-lg hover:bg-[var(--brand-cta-hover)] transition-colors"
            >
              Essayer gratuitement — 1 mois offert
            </Link>
            <p className="mt-3 text-xs text-[var(--color-text-dark)]/50">
              Essai 30 jours • Annulez à tout moment
            </p>
          </div>

          {/* Reassurance */}
          <div className="mt-6 rounded-2xl border border-[var(--brand-cta)]/30 bg-[var(--brand-surface)]/70 p-5 text-left">
            <p className="text-white font-extrabold">{trialTitle} ✨</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--color-text-beige)]">
              {trialItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* 300+ : contact us */
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-3xl border-2 border-[var(--brand-cta)]/30 bg-[var(--color-surface-card)] p-10 shadow-2xl">
            <Crown className="mx-auto h-12 w-12 text-[var(--brand-cta)] mb-4" />
            <h3 className="text-2xl font-extrabold text-[var(--brand-bg)] mb-2">
              Votre club a des besoins spécifiques
            </h3>
            <p className="text-[var(--color-text-dark)]/70 mb-6">
              Avec plus de 300 licenciés, vous avez besoin d&apos;un accompagnement sur mesure.
              Parlons-en.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-[var(--brand-cta)] px-8 py-4 text-lg font-extrabold text-[var(--brand-bg)] shadow-lg hover:bg-[var(--brand-cta-hover)] transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
