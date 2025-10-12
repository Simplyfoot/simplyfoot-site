"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import GooglePlay from "../../assets/images/google_play_store.png";
import AppStore from "../../assets/images/apple_appstore.svg";

// ------- Helpers -------
const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

type Billing = "monthly" | "yearly";

/**
 * Prix:
 * - Mensuel: montant mensuel
 * - Annuel: TOTAL à l’année (–10% vs mensuel), + équivalent mensuel et économies/an
 */
function priceFor(billing: Billing, monthlyBase: number) {
  if (billing === "monthly") {
    return {
      main: `${eur.format(monthlyBase)}`,
      sub: "/ mois TTC",
      foot: "",
      savings: null as string | null,
    };
  }
  const annualNoDisc = monthlyBase * 12;
  const annualTotal = +(annualNoDisc * 0.9).toFixed(2); // –10%
  const equiv = +(annualTotal / 12).toFixed(2);
  const save = +(annualNoDisc - annualTotal).toFixed(2);
  return {
    main: `${eur.format(annualTotal)}`,
    sub: "/ an TTC (–10% vs mensuel)",
    foot: `soit ${eur.format(equiv)}/mois en moyenne`,
    savings: `Économisez ${eur.format(save)}/an`,
  };
}
const plateformes = [
  { name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.simplyfoot.app", src: GooglePlay },
  { name: "App Store", url: "https://apps.apple.com/app/simplyfoot/id6446304301", src: AppStore },
] as const;

type Plan = {
  key: string;
  nom: string;
  couleur: string;
  cible: string;
  monthly: number | null; // base mensuelle servant au calcul
  sousTitre: string;
  points: readonly string[];
  bonus: string;
  badge?: string;
  cta: { label: string; href: string };
};

const PLANS: readonly Plan[] = [
  {
    key: "mini",
    nom: "Mini Club",
    couleur: "from-lime-400 to-lime-600",
    cible: "1 à 30 licenciés",
    monthly: 4.99,
    sousTitre: "Tout SimplyFoot pour bien démarrer",
    points: [
      "Calendrier, compositions, documents",
      "Stats essentielles joueur/équipe",
      "Support de mise en route",
    ],
    bonus: "Le choix malin pour passer à l'action",
    badge: "Découverte",
    cta: { label: "Commencer le mois gratuit", href: "/inscription?plan=mini" },
  },
  {
    key: "local",
    nom: "Local Club",
    couleur: "from-yellow-400 to-yellow-600",
    cible: "31 à 75 licenciés",
    monthly: 9.99,
    sousTitre: "Impliquer tout le club et les familles",
    points: [
      "Toutes les fonctionnalités",
      "Présences & évaluations multi-équipes",
      "1 compte parent par joueur",
    ],
    bonus: "Notre plan le plus choisi",
    badge: "Meilleur choix",
    cta: { label: "Commencer le mois gratuit", href: "/inscription?plan=local" },
  },
  {
    key: "regional",
    nom: "Régional Club",
    couleur: "from-emerald-400 to-emerald-600",
    cible: "76 à 150 licenciés",
    monthly: 14.99,
    sousTitre: "La performance au cœur du projet",
    points: [
      "Reporting avancé (assiduité, blessures)",
      "Espace président / staff dédié",
      "Synchronisation FFF (option)",
    ],
    bonus: "Grandir comme les pros",
    badge: "Performance",
    cta: { label: "Commencer le mois gratuit", href: "/inscription?plan=regional" },
  },
  {
    key: "grand",
    nom: "Grand Club",
    couleur: "from-sky-400 to-sky-600",
    cible: "151 à 300 licenciés",
    monthly: 19.99,
    sousTitre: "Gestion fluide pour effectif XXL",
    points: [
      "Outils de performance illimités",
      "Docs illimités par joueur",
      "Priorité support",
    ],
    bonus: "Plus de limites pour le staff",
    cta: { label: "Commencer le mois gratuit", href: "/inscription?plan=grand" },
  },
  {
    key: "maxi",
    nom: "Maxi Club",
    couleur: "from-cyan-400 to-cyan-600",
    cible: "301 à 500 licenciés",
    monthly: 29.99,
    sousTitre: "La référence, sans compromis",
    points: [
      "Multi-sites & multi-équipes",
      "Comptes illimités (dirigeants, éducateurs, parents)",
      "Intégrations API (calendrier ligue)",
    ],
    bonus: "Pensé pour les clubs structurés",
    cta: { label: "Commencer le mois gratuit", href: "/inscription?plan=maxi" },
  },
  {
    key: "district",
    nom: "District+ / Ville",
    couleur: "from-rose-500 to-rose-700",
    cible: "+ de 500 licenciés",
    monthly: null,
    sousTitre: "L’excellence sur-mesure",
    points: [
      "Interface custom, intégrations poussées",
      "Accompagnement premium & SLA",
      "Interlocuteur dédié",
    ],
    bonus: "Pensé pour groupements et collectivités",
    cta: { label: "Parler à un expert", href: "/contact?type=district" },
  },
] as const;

const REMISES = [
  { icon: "🔁", titre: "Paiement annuel", desc: "-10 % immédiat" },
  { icon: "🎓", titre: "Scolaire / UNSS", desc: "-30 % sur justificatif" },
  { icon: "🤝", titre: "Groupement de clubs", desc: "Tarifs dégressifs" },
] as const;

const VALUE_ICONS = [
  { t: "Mise en route accompagnée" },
  { t: "Sécurité & RGPD" },
  { t: "Applications mobiles" },
  { t: "Support réactif" },
] as const;

// ------- Page -------
export default function OffresPage() {
  // On met en avant l'annuel par défaut
  const [billing, setBilling] = useState<Billing>("yearly");

  const plans = useMemo(
    () =>
      PLANS.map((p) => {
        const price = p.monthly == null ? null : priceFor(billing, p.monthly);
        return { ...p, price };
      }),
    [billing]
  );

  return (
    <main className="relative w-full min-h-screen bg-[#14482F]">
      {/* halo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Choisissez l’offre <span className="text-[#5BE37D]">qui fait gagner du temps</span>
          </h1>
          <p className="mt-4 text-[#F8E9CA] text-lg md:text-xl font-medium">
            Toutes les fonctionnalités, sans limites cachées. Concentrez-vous sur le terrain, on s’occupe du reste.
          </p>

          {/* Essai Gratuit */}
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#5BE37D]/30 bg-[#1d3e2e]/70 p-4 text-left text-[#F8E9CA]">
            <p className="text-white font-extrabold">1 mois gratuit, sans stress ✨</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Testez SimplyFoot gratuitement pendant 30 jours.</li>
              <li>
                À la fin de l’essai : <strong>annulez</strong> en un clic, ou laissez l’abonnement démarrer
                automatiquement.
              </li>
              <li>
                Le plan est déterminé par le <strong>nombre de licenciés actifs</strong> présents dans l’app au moment
                de la bascule.
              </li>
            </ul>
          </div>

          {/* Toggle facturation */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1d3e2e]/70 p-1 ring-1 ring-[#5BE37D]/30">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                billing === "monthly" ? "bg-[#5BE37D] text-[#14482F]" : "text-[#F8E9CA] hover:text-white"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                billing === "yearly" ? "bg-[#5BE37D] text-[#14482F]" : "text-[#F8E9CA] hover:text-white"
              }`}
            >
              Annuel <span className="ml-1 text-xs opacity-80">(-10 %)</span>
            </button>
          </div>

          {/* Value icons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {VALUE_ICONS.map((v) => (
              <span
                key={v.t}
                className="inline-flex items-center gap-2 rounded-full border border-[#5BE37D]/30 bg-[#1d3e2e]/50 px-3 py-1 text-xs font-semibold text-[#F8E9CA]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#5BE37D]" /> {v.t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* GRID OFFRES */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((offre) => (
            <motion.article
              key={offre.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl border-2 bg-gradient-to-br ${offre.couleur} p-[2px] shadow-xl transition-shadow hover:shadow-2xl`}
            >
              {/* Badge */}
              {offre.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#14482F] shadow">
                  {offre.badge}
                </span>
              )}

              <div className="flex h-full w-full flex-col rounded-[22px] bg-[#F7F6F3] p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-[#14482F]">{offre.nom}</h2>
                  <span className="text-xs font-bold text-[#175438]">{offre.cible}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[#175438]">{offre.sousTitre}</p>

                {/* Price */}
                <div className="mt-6">
                  {offre.price ? (
                    <div className="space-y-1">
                      <div className="text-4xl font-extrabold text-[#14482F]">
                        {offre.price.main}{" "}
                        <span className="text-base font-medium text-[#232729]">{offre.price.sub}</span>
                      </div>
                      {offre.price.foot && (
                        <div className="text-xs font-medium text-[#175438]/90">{offre.price.foot}</div>
                      )}
                      {/* Économies en annuel */}
                      {billing === "yearly" && offre.price.savings && (
                        <div className="inline-block rounded-full bg-[#e6f7eb] px-3 py-1 text-xs font-bold text-[#1f853f]">
                          {offre.price.savings}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-3xl font-extrabold text-[#14482F]">Sur devis</div>
                  )}
                </div>

                {/* Points */}
                <ul className="mt-6 space-y-2">
                  {offre.points.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-[#232729]">
                      <Check className="mt-0.5 h-5 w-5 text-[#5BE37D]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Bonus */}
                <div className="mt-4 italic font-medium text-[#175438]">{offre.bonus}</div>

                {/* CTA */}
                <motion.a
                  href={offre.cta.href}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#67D07C] to-[#5BE37D] px-6 py-3 text-base font-extrabold text-[#14482F] shadow-lg hover:from-[#5BE37D] hover:to-[#68FB7A] focus:outline-none focus:ring-2 focus:ring-[#67D07C]"
                >
                  {offre.cta.label}
                </motion.a>

                <div className="mt-2 text-center text-xs font-semibold text-[#175438]">
                  Essai 30 jours • Annulez à tout moment avant la fin de l’essai
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Remises */}
        <div className="mt-14 text-center">
          <h3 className="text-2xl font-extrabold text-[#5BE37D]">Remises et offres spéciales</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            {REMISES.map((r) => (
              <div
                key={r.titre}
                className="flex items-center gap-3 rounded-2xl border border-[#14482F]/15 bg-[#F8E9CA] px-4 py-3 shadow"
              >
                <span className="text-xl">{r.icon}</span>
                <span>
                  <span className="font-bold text-[#14482F]">{r.titre}</span>{" "}
                  <span className="text-[#232729]">{r.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparatif rapide */}
        <section className="mt-16 rounded-2xl border border-[#5BE37D]/20 bg-[#1d3e2e]/50 p-6">
          <h3 className="mb-6 text-center text-2xl font-bold text-white">Tout ce qu&#39;il faut, dès le premier plan</h3>
          <div className="grid grid-cols-1 gap-6 text-[#F8E9CA] md:grid-cols-3">
            <div className="rounded-xl border border-[#5BE37D]/10 bg-[#232729]/70 p-5">
              <h4 className="mb-2 font-bold text-white">Organisation</h4>
              <p>Calendrier centralisé, présences, feuilles de match, documents sécurisés.</p>
            </div>
            <div className="rounded-xl border border-[#5BE37D]/10 bg-[#232729]/70 p-5">
              <h4 className="mb-2 font-bold text-white">Motivation</h4>
              <p>Classements ludiques, badges, blasons 3D, objectifs partagés.</p>
            </div>
            <div className="rounded-xl border border-[#5BE37D]/10 bg-[#232729]/70 p-5">
              <h4 className="mb-2 font-bold text-white">Performance</h4>
              <p>Stats essentielles, reporting avancé, coaching par IA.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-extrabold text-[#5BE37D]">Questions fréquentes</h3>
          <div className="mx-auto max-w-3xl divide-y divide-[#5BE37D]/20 rounded-2xl border border-[#5BE37D]/20 bg-[#1d3e2e]/50">
            {[
              {
                q: "Comment fonctionne l’essai gratuit de 30 jours ?",
                a: "Créez votre compte et profitez de toutes les fonctionnalités sans frais. Avant la fin de l’essai, vous pouvez annuler en un clic. Sinon, l’abonnement démarre automatiquement au plan correspondant au nombre de licenciés actifs présents dans votre application au moment de la bascule.",
              },
              {
                q: "Puis-je changer de plan si le nombre de licenciés évolue ?",
                a: "Oui. Le plan s’adapte automatiquement au volume de licenciés actifs. Vous pouvez aussi changer de plan manuellement depuis votre espace de facturation.",
              },
              {
                q: "Y a-t-il un engagement ?",
                a: "En mensuel, aucun engagement : vous arrêtez quand vous voulez. En annuel, vous bénéficiez de 10% de remise pour un règlement en une fois.",
              },
            ].map((f, i) => (
              <details key={i} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-white">
                  {f.q}
                  <ChevronDown className="h-5 w-5 text-[#5BE37D] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-[#F8E9CA]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Apps */}
        <section className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-extrabold text-[#5BE37D]">Téléchargez l’application SimplyFoot</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {plateformes.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 rounded-xl border border-[#14482F]/10 bg-white px-6 py-3 shadow transition hover:scale-105"
              >
                <Image src={p.src} alt={p.name} width={32} height={32} />
                <span className="font-semibold text-[#14482F]">{p.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-6 font-bold text-[#5BE37D]">Bientôt disponible sur tous vos appareils !</div>
        </section>
      </div>
    </main>
  );
}



