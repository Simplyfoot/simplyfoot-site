"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import GooglePlay from "../../assets/images/google_play_store.png";
import AppStore from "../../assets/images/apple_appstore.svg";

const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

type Billing = "monthly" | "yearly";

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
  const annualTotal = +(annualNoDisc * 0.9).toFixed(2);
  const equiv = +(annualTotal / 12).toFixed(2);
  const save = +(annualNoDisc - annualTotal).toFixed(2);
  return {
    main: `${eur.format(annualTotal)}`,
    sub: "/ an TTC (–10% vs mensuel)",
    foot: `soit ${eur.format(equiv)}/mois en moyenne`,
    savings: `Économisez ${eur.format(save)}/an`,
  };
}

/* =========================================================================
   Fonction d’abonnement Stripe
   ========================================================================= */
async function handleSubscribe(planKey: string, billing: Billing, email: string) {
  const cleanEmail = email.trim();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    alert("Merci de renseigner une adresse email valide 🙂");
    return;
  }
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planKey, email: cleanEmail, billing }),
    });
    const { url, error } = await res.json();
    if (error) throw new Error(error);
    window.location.href = url;
  } catch (err) {
    console.error("Erreur abonnement :", err);
    alert("Une erreur est survenue lors de la création de la session Stripe.");
  }
}

/* =========================================================================
   PAGE
   ========================================================================= */
export default function OffresPage() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = useMemo(() => {
    return PLANS.map((p) => {
      const price = p.monthly == null ? null : priceFor(billing, p.monthly);
      return { ...p, price };
    });
  }, [billing]);

  return (
    <main className="relative w-full min-h-screen bg-[#14482F]">
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
            Choisissez l’offre{" "}
            <span className="text-[#29be4f]">qui fait gagner du temps</span>
          </h1>
          <p className="mt-4 text-[#F8E9CA] text-lg md:text-xl font-medium">
            Toutes les fonctionnalités, sans limites cachées. Concentrez-vous
            sur le terrain, on s’occupe du reste.
          </p>

          {/* Toggle facturation */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1d3e2e]/70 p-1 ring-1 ring-[#29be4f]/30">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                billing === "monthly"
                  ? "bg-[#29be4f] text-[#14482F]"
                  : "text-[#F8E9CA] hover:text-white"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                billing === "yearly"
                  ? "bg-[#29be4f] text-[#14482F]"
                  : "text-[#F8E9CA] hover:text-white"
              }`}
            >
              Annuel{" "}
              <span className="ml-1 text-xs opacity-80">(-10 %)</span>
            </button>
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
              className={`relative rounded-3xl border-2 bg-gradient-to-br ${offre.couleur} p-[2px] shadow-xl`}
            >
              {offre.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#14482F] shadow">
                  {offre.badge}
                </span>
              )}
              <div className="flex h-full w-full flex-col rounded-[22px] bg-[#F7F6F3] p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-[#14482F]">
                    {offre.nom}
                  </h2>
                  <span className="text-xs font-bold text-[#175438]">
                    {offre.cible}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-[#175438]">
                  {offre.sousTitre}
                </p>

                {/* Prix */}
                <div className="mt-6">
                  {offre.price ? (
                    <div className="space-y-1">
                      <div className="text-4xl font-extrabold text-[#14482F]">
                        {offre.price.main}{" "}
                        <span className="text-base font-medium text-[#232729]">
                          {offre.price.sub}
                        </span>
                      </div>
                      {offre.price.foot && (
                        <div className="text-xs font-medium text-[#175438]/90">
                          {offre.price.foot}
                        </div>
                      )}
                      {billing === "yearly" && offre.price.savings && (
                        <div className="inline-block rounded-full bg-[#e6f7eb] px-3 py-1 text-xs font-bold text-[#1f853f]">
                          {offre.price.savings}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-3xl font-extrabold text-[#14482F]">
                      Sur devis
                    </div>
                  )}
                </div>

                {/* Points */}
                <ul className="mt-6 space-y-2">
                  {offre.points.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-[#232729]"
                    >
                      <Check className="mt-0.5 h-5 w-5 text-[#29be4f]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 italic font-medium text-[#175438]">
                  {offre.bonus}
                </div>

                {/* CTA */}
                {offre.key === "district" ? (
                  <motion.a
                    href="/contact?type=district"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#67D07C] to-[#29be4f] px-6 py-3 text-base font-extrabold text-[#14482F] shadow-lg hover:from-[#29be4f] hover:to-[#68FB7A]"
                  >
                    {offre.ctaLabel}
                  </motion.a>
                ) : (
                  <motion.button
                    onClick={() => {
                      setSelectedPlan(offre.key);
                      setShowModal(true);
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#67D07C] to-[#29be4f] px-6 py-3 text-base font-extrabold text-[#14482F] shadow-lg hover:from-[#29be4f] hover:to-[#68FB7A]"
                  >
                    {offre.ctaLabel}
                  </motion.button>
                )}

                <div className="mt-2 text-center text-xs font-semibold text-[#175438]">
                  Essai 30 jours • Annulez à tout moment avant la fin de l’essai
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* MODALE EMAIL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-white p-6 w-80 text-center shadow-lg"
          >
            <h3 className="text-xl font-extrabold text-[#14482F] mb-2">
              Votre email
            </h3>
            <p className="text-sm text-[#232729]/80 mb-4">
              Indiquez votre adresse email pour finaliser l’abonnement.
            </p>
            <input
              type="email"
              placeholder="adresse@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
            <div className="mt-5 flex gap-3 justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  const cleanEmail = email.trim();
                  if (!cleanEmail || !cleanEmail.includes("@")) {
                    alert("Merci de renseigner une adresse email valide 🙂");
                    return;
                  }
                  if (selectedPlan) {
                    setShowModal(false);
                    handleSubscribe(selectedPlan, billing, cleanEmail);
                  }
                }}
                disabled={!email}
                className="rounded-lg bg-[#29be4f] px-5 py-2 text-sm font-extrabold text-[#14482F] hover:bg-[#63f286] disabled:opacity-60"
              >
                Continuer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}

/* =========================================================================
   DONNÉES DES PLANS
   ========================================================================= */
const PLANS = [
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
    ctaLabel: "Commencer le mois gratuit",
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
    ctaLabel: "Commencer le mois gratuit",
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
    ctaLabel: "Commencer le mois gratuit",
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
    ctaLabel: "Commencer le mois gratuit",
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
    ctaLabel: "Commencer le mois gratuit",
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
    ctaLabel: "Parler à un expert",
  },
];
