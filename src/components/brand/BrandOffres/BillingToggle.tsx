'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';

type Billing = 'monthly' | 'yearly';

const MotionLink = motion.create(Link);

const eur = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});

function priceFor(billing: Billing, monthlyBase: number) {
  if (billing === 'monthly') {
    return { main: `${eur.format(monthlyBase)}`, sub: '/ mois TTC', foot: '', savings: null as string | null };
  }
  const annualNoDisc = monthlyBase * 12;
  const annualTotal = +(annualNoDisc * 0.9).toFixed(2);
  const equiv = +(annualTotal / 12).toFixed(2);
  const save = +(annualNoDisc - annualTotal).toFixed(2);
  return {
    main: `${eur.format(annualTotal)}`,
    sub: '/ an TTC (–10% vs mensuel)',
    foot: `soit ${eur.format(equiv)}/mois en moyenne`,
    savings: `Économisez ${eur.format(save)}/an`,
  };
}

type Plan = {
  key: string;
  nom: string;
  cible: string;
  monthly: number | null;
  sousTitre: string;
  points: readonly string[];
  bonus: string;
  badge?: string;
  cta: { label: string; href: string };
};

const PLANS: readonly Plan[] = [
  {
    key: 'mini',
    nom: 'Mini Club',
    cible: '1 à 30 licenciés',
    monthly: 4.99,
    sousTitre: 'Tous les outils pour bien démarrer',
    points: ['Calendrier, compositions, documents', 'Stats essentielles joueur/équipe', 'Support de mise en route'],
    bonus: "Le choix malin pour passer à l'action",
    badge: 'Découverte',
    cta: { label: 'Commencer le mois gratuit', href: '/impatient' },
  },
  {
    key: 'local',
    nom: 'Local Club',
    cible: '31 à 75 licenciés',
    monthly: 9.99,
    sousTitre: 'Impliquer tout le club et les familles',
    points: ['Toutes les fonctionnalités', 'Présences & évaluations multi-équipes', '1 compte parent par joueur'],
    bonus: 'Notre plan le plus choisi',
    badge: 'Meilleur choix',
    cta: { label: 'Commencer le mois gratuit', href: '/impatient' },
  },
  {
    key: 'regional',
    nom: 'Régional Club',
    cible: '76 à 150 licenciés',
    monthly: 14.99,
    sousTitre: 'La performance au cœur du projet',
    points: ['Reporting avancé (assiduité, blessures)', 'Espace président / staff dédié', 'Synchronisation fédérale (option)'],
    bonus: 'Grandir comme les pros',
    badge: 'Performance',
    cta: { label: 'Commencer le mois gratuit', href: '/impatient' },
  },
  {
    key: 'grand',
    nom: 'Grand Club',
    cible: '151 à 300 licenciés',
    monthly: 19.99,
    sousTitre: 'Gestion fluide pour effectif XXL',
    points: ['Outils de performance illimités', 'Docs illimités par joueur', 'Priorité support'],
    bonus: 'Plus de limites pour le staff',
    cta: { label: 'Commencer le mois gratuit', href: '/impatient' },
  },
  {
    key: 'maxi',
    nom: 'Maxi Club',
    cible: '301 à 500 licenciés',
    monthly: 29.99,
    sousTitre: 'La référence, sans compromis',
    points: ['Multi-sites & multi-équipes', 'Comptes illimités (dirigeants, éducateurs, parents)', 'Intégrations API (calendrier ligue)'],
    bonus: 'Pensé pour les clubs structurés',
    cta: { label: 'Commencer le mois gratuit', href: '/impatient' },
  },
  {
    key: 'district',
    nom: 'District+ / Ville',
    cible: '+ de 500 licenciés',
    monthly: null,
    sousTitre: "L'excellence sur-mesure",
    points: ['Interface custom, intégrations poussées', 'Accompagnement premium & SLA', 'Interlocuteur dédié'],
    bonus: 'Pensé pour groupements et collectivités',
    cta: { label: 'Parler à un expert', href: '/impatient' },
  },
] as const;

const VALUE_ICONS = [
  { t: 'Mise en route accompagnée' },
  { t: 'Sécurité & RGPD' },
  { t: 'Applications mobiles' },
  { t: 'Support réactif' },
] as const;

interface BillingToggleProps {
  trialTitle: string;
  trialItems: [string, string, string];
}

export function BillingToggle({ trialTitle, trialItems }: BillingToggleProps) {
  const [billing, setBilling] = useState<Billing>('yearly');
  const prefersReduced = useReducedMotion();

  const plans = useMemo(
    () => PLANS.map((p) => ({ ...p, price: p.monthly == null ? null : priceFor(billing, p.monthly) })),
    [billing],
  );

  return (
    <>
      {/* Trial box + toggle + value icons */}
      <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[var(--brand-cta)]/30 bg-[var(--brand-surface)]/70 p-4 text-left text-[var(--color-text-beige)]">
        <p className="text-white font-extrabold">{trialTitle} ✨</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
          {trialItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand-surface)]/70 p-1 ring-1 ring-[var(--brand-cta)]/30">
        <button
          onClick={() => setBilling('monthly')}
          className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition ${
            billing === 'monthly' ? 'bg-[var(--brand-cta)] text-[var(--brand-bg)]' : 'text-[var(--color-text-beige)] hover:text-white'
          }`}
        >
          Mensuel
        </button>
        <button
          onClick={() => setBilling('yearly')}
          className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition ${
            billing === 'yearly' ? 'bg-[var(--brand-cta)] text-[var(--brand-bg)]' : 'text-[var(--color-text-beige)] hover:text-white'
          }`}
        >
          Annuel <span className="ml-1 text-xs opacity-80">(-10 %)</span>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {VALUE_ICONS.map((v) => (
          <span
            key={v.t}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-cta)]/30 bg-[var(--brand-surface)]/50 px-3 py-1 text-xs font-semibold text-[var(--color-text-beige)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-cta)]" /> {v.t}
          </span>
        ))}
      </div>

      {/* Plans grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((offre) => (
          <article
            key={offre.key}
            className="relative rounded-3xl border-2 border-[var(--brand-cta)]/40 bg-gradient-to-br from-[var(--brand-cta)]/20 to-[var(--brand-bg)] p-[2px] shadow-xl transition-shadow hover:shadow-2xl"
          >
            {offre.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--brand-bg)] shadow">
                {offre.badge}
              </span>
            )}
            <div className="flex h-full w-full flex-col rounded-[22px] bg-[var(--color-surface-card)] p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-[var(--brand-bg)]">{offre.nom}</h2>
                <span className="text-xs font-bold text-[var(--color-text-dark)]">{offre.cible}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-dark)]">{offre.sousTitre}</p>

              <div className="mt-6">
                {offre.price ? (
                  <div className="space-y-1">
                    <div className="text-4xl font-extrabold text-[var(--brand-bg)]">
                      {offre.price.main}{' '}
                      <span className="text-base font-medium text-[var(--color-surface-dark)]">{offre.price.sub}</span>
                    </div>
                    {offre.price.foot && (
                      <div className="text-xs font-medium text-[var(--color-text-dark)]/90">{offre.price.foot}</div>
                    )}
                    {billing === 'yearly' && offre.price.savings && (
                      <div className="inline-block rounded-full bg-[var(--brand-cta)]/15 px-3 py-1 text-xs font-bold text-[var(--brand-cta)]">
                        {offre.price.savings}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-3xl font-extrabold text-[var(--brand-bg)]">Sur devis</div>
                )}
              </div>

              <ul className="mt-6 space-y-2">
                {offre.points.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-[var(--color-surface-dark)]">
                    <Check className="mt-0.5 h-5 w-5 text-[var(--brand-cta)]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 italic font-medium text-[var(--color-text-dark)]">{offre.bonus}</div>

              <MotionLink
                href={offre.cta.href}
                whileHover={prefersReduced ? {} : { scale: 1.04 }}
                whileTap={prefersReduced ? {} : { scale: 0.98 }}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-cta-hover)] to-[var(--brand-cta)] px-6 py-3 text-base font-extrabold text-[var(--brand-bg)] shadow-lg hover:from-[var(--brand-cta)] hover:to-[var(--brand-cta-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-cta-hover)]"
              >
                {offre.cta.label}
              </MotionLink>

              <div className="mt-2 text-center text-xs font-semibold text-[var(--color-text-dark)]">
                Essai 30 jours • Annulez à tout moment avant la fin de l&apos;essai
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
