import { ChevronDown } from 'lucide-react';
import type { BrandConfig } from 'lib/config/brands';
import type { OffresContent } from 'content/offres';
import { PricingCalculator } from './PricingCalculator';

const REMISES = [
  { icon: '🔁', titre: 'Paiement annuel', desc: '-10 % immédiat' },
  { icon: '🎓', titre: 'Scolaire / UNSS', desc: '-30 % sur justificatif' },
  { icon: '🤝', titre: 'Groupement de clubs', desc: 'Tarifs dégressifs' },
] as const;

const FAQ = [
  {
    q: "Comment fonctionne l'essai gratuit de 30 jours ?",
    a: "Créez votre compte et profitez de toutes les fonctionnalités sans frais. Avant la fin de l'essai, vous pouvez annuler en un clic. Sinon, l'abonnement démarre automatiquement au plan correspondant au nombre de licenciés actifs.",
  },
  {
    q: 'Puis-je changer de plan si le nombre de licenciés évolue ?',
    a: "Oui. Le plan s'adapte automatiquement au volume de licenciés actifs. Vous pouvez aussi changer de plan manuellement depuis votre espace de facturation.",
  },
  {
    q: "Y a-t-il un engagement ?",
    a: "En mensuel, aucun engagement : vous arrêtez quand vous voulez. En annuel, vous bénéficiez de 10% de remise pour un règlement en une fois.",
  },
] as const;

interface BrandOffresProps {
  brand: BrandConfig;
  content: OffresContent;
}

export function BrandOffres({ brand, content }: BrandOffresProps) {
  return (
    <div className="relative w-full min-h-screen bg-[var(--brand-bg)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 brand-halo" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {content.heroTitle}
          </h1>
          <p className="mt-4 text-[var(--color-text-beige)] text-lg md:text-xl font-medium">
            {content.heroSubtitle}
          </p>
        </div>

        {/* Pricing Calculator */}
        <PricingCalculator
          brandName={brand.name}
          trialTitle={content.trialTitle}
          trialItems={content.trialItems}
        />

        {/* Remises */}
        <div className="mt-14 text-center">
          <h3 className="text-2xl font-extrabold text-[var(--brand-cta)]">
            Remises et offres spéciales
          </h3>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            {REMISES.map((r) => (
              <div
                key={r.titre}
                className="flex items-center gap-3 rounded-2xl border border-[var(--brand-bg)]/15 bg-[var(--color-text-beige)] px-4 py-3 shadow"
              >
                <span className="text-xl">{r.icon}</span>
                <span>
                  <span className="font-bold text-[var(--brand-bg)]">{r.titre}</span>{' '}
                  <span className="text-[var(--color-surface-dark)]">{r.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16" aria-labelledby="faq-title">
          <h3 id="faq-title" className="mb-6 text-center text-2xl font-extrabold text-[var(--brand-cta)]">
            Questions fréquentes
          </h3>
          <div className="mx-auto max-w-3xl divide-y divide-[var(--brand-cta)]/20 rounded-2xl border border-[var(--brand-cta)]/20 bg-[var(--brand-surface)]/50">
            {FAQ.map((f, i) => (
              <details key={i} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-white">
                  {f.q}
                  <ChevronDown className="h-5 w-5 text-[var(--brand-cta)] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-[var(--color-text-beige)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
