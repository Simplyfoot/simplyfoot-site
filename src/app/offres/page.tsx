"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { supabase } from "lib/supabaseClient";
import { handleSubscribe } from "lib/stripeHelpers";
import { Billing } from "app/_types/Order";
import ClubSelectModal from "components/modals/ClubSelectModal";
import { priceFor } from "lib/priceUtils";
import { PLANS } from "lib/plans";
import GooglePlay from "../../assets/images/google_play_store.png";
import AppStore from "../../assets/images/apple_appstore.svg";

const REMISES = [
  { icon: "🔁", titre: "Paiement annuel", desc: "-10 % immédiat" },
  { icon: "🎓", titre: "Scolaire / UNSS", desc: "-30 % sur justificatif" },
  { icon: "🤝", titre: "Groupement de clubs", desc: "Tarifs dégressifs" },
] as const;

const plateformes = [
  {
    name: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.simplyfoot.app",
    src: GooglePlay,
  },
  {
    name: "App Store",
    url: "", // TODO: ajouter le lien App Store quand l'app sera dispo
    src: AppStore,
  },
] as const;

const FAQ_ITEMS = [
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
] as const;

type ClubPresidentRow = {
  club_id: string;
  clubs: { name: string } | { name: string }[];
};

export default function OffresPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [email, setEmail] = useState("");
  const [clubs, setClubs] = useState<{ id: string; name: string }[]>([]);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showClubModal, setShowClubModal] = useState(false);

  // Définition des paliers (bornes inclusives)
  const PALIER_VALUES = [1, 31, 76, 151, 301, 501];
  const [playerCount, setPlayerCount] = useState(PALIER_VALUES[0]);

  // Trouve l'offre correspondant au nombre de joueurs
  const currentPlan = useMemo(() => {
    if (playerCount <= 30) return PLANS[0];
    if (playerCount <= 75) return PLANS[1];
    if (playerCount <= 150) return PLANS[2];
    if (playerCount <= 300) return PLANS[3];
    if (playerCount <= 500) return PLANS[4];
    return PLANS[5];
  }, [playerCount]);

  // Calcule dynamiquement le prix affiché
  const currentPrice = useMemo(() => {
    if (currentPlan.monthly === null) return null;
    return priceFor(billing, currentPlan.monthly);
  }, [currentPlan, billing]);

  const isQuoteOnly = currentPrice === null;

  async function handleClickSubscribe(planKey: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/inscription";
      return;
    }

    const { data: clubList, error } = await supabase
      .from("user_club_presidents")
      .select("club_id, clubs!inner(name)")
      .eq("user_id", user.id)
      .is("leaved_at", null)
      .returns<ClubPresidentRow[]>();

    if (error || !clubList) {
      alert("Erreur lors de la récupération de vos clubs.");
      return;
    }

    if (clubList.length === 0) {
      alert("Aucun club associé à votre compte.");
      return;
    }

    const rawEmailFromState = email.trim();
    const emailToUse = rawEmailFromState || user.email || "";

    if (clubList.length === 1) {
      const club_id = clubList[0].club_id;
      handleSubscribe(planKey, billing, emailToUse, club_id);
    } else {
      setClubs(
        clubList.map((c) => ({
          id: c.club_id,
          name: Array.isArray(c.clubs) ? c.clubs[0].name : c.clubs.name,
        }))
      );
      setSelectedPlan(planKey);
      setShowClubModal(true);
    }
  }

  return (
    <main className="relative w-full min-h-screen bg-[#14482F]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />
      {/* HERO */}
      <div className="max-w-7xl mx-auto -mt-4 px-6 pb-10">
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

          {/* Essai Gratuit */}
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#29be4f]/30 bg-[#1d3e2e]/70 p-4 text-left text-[#F8E9CA]">
            <p className="text-white font-extrabold">
              1 mois gratuit, sans stress ✨
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Testez SimplyFoot gratuitement pendant 30 jours.</li>
              <li>
                À la fin de l’essai : <strong>annulez</strong> en un clic, ou
                laissez l’abonnement démarrer automatiquement.
              </li>
              <li>
                Le plan est déterminé par le{" "}
                <strong>nombre de licenciés actifs</strong> présents dans l’app
                au moment de la bascule.
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-6 w-full">
          <div className="w-full max-w-xl flex flex-col items-center gap-4">
            <div className="mb-2 text-base font-bold text-white">
              Combien de joueurs possède votre club ?
            </div>
            {/* Slider cliquable avec curseur */}
            <div
              className="w-full relative mt-2 mb-4"
              style={{ height: 36 }}
              role="slider"
              aria-valuenow={(() => {
                const idx = PALIER_VALUES.findIndex(
                  (v) => v === playerCount
                );
                // Pour le dernier palier, retourner 501 (valeur max symbolique)
                if (idx === PALIER_VALUES.length - 1) {
                  return 501;
                }
                return PALIER_VALUES[idx + 1]
                  ? PALIER_VALUES[idx + 1] - 1
                  : playerCount;
              })()}
              aria-valuemin={PALIER_VALUES[0]}
              aria-valuemax={
                PALIER_VALUES[PALIER_VALUES.length - 2]
                  ? PALIER_VALUES[PALIER_VALUES.length - 2] - 1
                  : 500
              }
              aria-label="Sélection du nombre maximum de joueurs"
              tabIndex={0}
              onKeyDown={(e) => {
                const idx = PALIER_VALUES.findIndex(
                  (v) => v === playerCount
                );
                if (
                  e.key === "ArrowRight" &&
                  idx < PALIER_VALUES.length - 1
                ) {
                  setPlayerCount(PALIER_VALUES[idx + 1]);
                  e.preventDefault();
                } else if (e.key === "ArrowLeft" && idx > 0) {
                  setPlayerCount(PALIER_VALUES[idx - 1]);
                  e.preventDefault();
                } else if (
                  (e.key === " " || e.key === "Enter") &&
                  document.activeElement === e.currentTarget
                ) {
                  // rien, déjà sélectionné
                  e.preventDefault();
                }
              }}
            >
              <div
                className="w-full h-2 bg-[#e6f7eb] rounded-full relative cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percent = x / rect.width;
                  const idx = Math.round(
                    percent * (PALIER_VALUES.length - 1)
                  );
                  setPlayerCount(PALIER_VALUES[idx]);
                }}
              >
                {/* Curseur rond */}
                {PALIER_VALUES.map((val, idx) => {
                  const percent =
                    (idx / (PALIER_VALUES.length - 1)) * 100;
                  const isActive = playerCount === val;
                  return (
                    <div
                      key={val}
                      className={`absolute top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 ${
                        isActive ? "" : "opacity-60"
                      }`}
                      style={{ left: `calc(${percent}% - 12px)` }}
                    >
                      <button
                        aria-label={`Palier ${
                          idx + 1
                        }, jusqu'à ${
                          idx === PALIER_VALUES.length - 1
                            ? "500+"
                            : PALIER_VALUES[idx + 1] - 1
                        } joueurs`}
                        tabIndex={isActive ? 0 : -1}
                        className={`w-6 h-6 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-[#29be4f] ${
                          isActive
                            ? "bg-[#29be4f] border-[#175438] shadow-lg"
                            : "bg-white border-[#e6f7eb]"
                        } flex items-center justify-center cursor-pointer`}
                        style={{ transition: "box-shadow 0.2s" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayerCount(val);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            setPlayerCount(val);
                            e.preventDefault();
                          }
                        }}
                      >
                        {isActive && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </button>
                    </div>
                  );
                })}
                {/* Barre de progression */}
                <div
                  className="absolute top-1/2 left-0 h-2 rounded-full bg-[#29be4f] transition-all duration-400 ease-out shadow"
                  style={{
                    width: `${
                      (PALIER_VALUES.findIndex(
                        (v) => v === playerCount
                      ) /
                        (PALIER_VALUES.length - 1)) *
                      100
                    }%`,
                    transform: "translateY(-50%)",
                    zIndex: 5,
                  }}
                />
              </div>
              {/* Nombres max sous la barre */}
              <div className="flex w-full justify-between mt-2 px-1 select-none">
                {PALIER_VALUES.map((val, idx) => {
                  let label;
                  if (idx === PALIER_VALUES.length - 1) {
                    label = "501+";
                  } else {
                    label = PALIER_VALUES[idx + 1]
                      ? PALIER_VALUES[idx + 1] - 1
                      : val;
                  }
                  return (
                    <span
                      key={val}
                      className={`text-xs sm:text-sm font-semibold ${
                        playerCount === val
                          ? "text-[#29be4f]"
                          : "text-[#b3b3b362]"
                      }`}
                      style={{ minWidth: 36, textAlign: "center" }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-2xl font-extrabold text-[#29be4f] bg-white/80 rounded-full px-6 py-1 shadow border border-[#29be4f]/20">
            {(() => {
              const idx = PALIER_VALUES.findIndex(
                (v) => v === playerCount
              );
              if (idx === PALIER_VALUES.length - 1) {
                return "Plus de 501 joueurs (sur devis)";
              }
              const max = PALIER_VALUES[idx + 1]
                ? PALIER_VALUES[idx + 1] - 1
                : playerCount;
              return `Jusqu'à ${max} joueurs maximum`;
            })()}
          </div>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1d3e2e]/70 p-1 ring-1 ring-[#29be4f]/30">
            <button
              onClick={() => setBilling("monthly")}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition ${
                billing === "monthly"
                  ? "bg-[#29be4f] text-[#14482F]"
                  : "text-[#F8E9CA] hover:text-white"
              }`}
            >
              Abonnement mensuel (sans engagement)
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition ${
                billing === "yearly"
                  ? "bg-[#29be4f] text-[#14482F]"
                  : "text-[#F8E9CA] hover:text-white"
              }`}
            >
              Abonnement annuel{" "}
              <span className="ml-1 text-xs opacity-80">(-10 %)</span>
            </button>
          </div>

          {/* Affichage dynamique de l'offre */}
          <motion.article
            key={currentPlan.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className={`relative rounded-3xl border-2 bg-linear-to-br ${currentPlan.couleur} p-0.5 shadow-xl w-full max-w-2xl`}
          >
            {currentPlan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#14482F] shadow">
                {currentPlan.badge}
              </span>
            )}
            <div className="flex h-full w-full flex-col rounded-[22px] bg-[#F7F6F3] p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-[#14482F]">
                  {currentPlan.nom}
                </h2>
                <span className="text-xs font-bold text-[#175438]">
                  {currentPlan.cible}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-[#175438]">
                {currentPlan.sousTitre}
              </p>

              {/* Prix */}
              <div className="mt-6">
                {currentPrice ? (
                  <div className="space-y-2">
                    <div className="text-4xl font-extrabold text-[#14482F]">
                      {currentPrice.main}{" "}
                      <span className="text-base font-medium text-[#232729]">
                        {currentPrice.sub}
                      </span>
                    </div>
                    {currentPrice.foot && (
                      <div className="text-xs font-medium text-[#175438]/90">
                        {currentPrice.foot}
                      </div>
                    )}
                    {billing === "yearly" && currentPrice.savings && (
                      <div className="inline-block rounded-full bg-[#e6f7eb] px-3 py-1 text-xs font-bold text-[#1f853f]">
                        {currentPrice.savings}
                      </div>
                    )}
                    <div className="text-[11px] font-medium text-[#6b6f72]">
                      Tarifs indiqués HT. Paiement sécurisé par Stripe.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-3xl font-extrabold text-[#14482F]">
                      Sur devis
                    </div>
                    <div className="text-xs font-medium text-[#175438]/90">
                      Pour les structures de grande taille ou besoins
                      spécifiques, nous construisons une offre sur mesure.
                    </div>
                  </div>
                )}
              </div>

              {/* Points */}
              <ul className="mt-6 space-y-2">
                {currentPlan.points.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-[#232729]"
                  >
                    <Check className="mt-0.5 h-5 w-5 text-[#29be4f]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              {/* Bonus */}
              <div className="mt-4 italic font-medium text-[#175438]">
                {currentPlan.bonus}
              </div>

              {/* CTA */}
              {isQuoteOnly ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // à adapter si tu as une page /devis ou /contact
                    window.location.href = "/contact";
                  }}
                  className="cursor-pointer mt-6 inline-flex items-center justify-center rounded-xl bg-linear-to-br from-[#67D07C] to-[#29be4f] px-6 py-3 text-base font-extrabold text-[#14482F] shadow-lg hover:from-[#29be4f] hover:to-[#68FB7A]"
                >
                  Demander un devis personnalisé
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => handleClickSubscribe(currentPlan.key)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer mt-6 inline-flex items-center justify-center rounded-xl bg-linear-to-br from-[#67D07C] to-[#29be4f] px-6 py-3 text-base font-extrabold text-[#14482F] shadow-lg hover:from-[#29be4f] hover:to-[#68FB7A]"
                >
                  {billing === "yearly"
                    ? "Souscrire à l'année"
                    : currentPlan.ctaLabel}
                </motion.button>
              )}

              {/* Mention mois gratuit uniquement pour le mensuel et non sur devis */}
              {!isQuoteOnly && billing === "monthly" && (
                <div className="mt-2 text-center text-xs font-semibold text-[#175438]">
                  Essai 30 jours • Annulez à tout moment avant la fin de
                  l’essai
                </div>
              )}
            </div>
          </motion.article>
        </div>
      </div>

      {/* Remises */}
      <div className="mt-14 text-center">
        <h3 className="text-2xl font-extrabold text-[#29be4f]">
          Remises et offres spéciales
        </h3>
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          {REMISES.map((r) => (
            <div
              key={r.titre}
              className="flex items-center gap-3 rounded-2xl border border-[#14482F]/15 bg-[#F8E9CA] px-4 py-3 shadow"
            >
              <span className="text-xl">{r.icon}</span>
              <span>
                <span className="font-bold text-[#14482F]">
                  {r.titre}
                </span>{" "}
                <span className="text-[#232729]">{r.desc}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#F8E9CA]/80">
          Les remises scolaires / UNSS et groupements de clubs sont appliquées
          sur devis. Contactez-nous pour en bénéficier.
        </p>
      </div>

      {/* Comparatif rapide */}
      <section className="mt-16 rounded-2xl border border-[#29be4f]/20 bg-[#1d3e2e]/50 p-6">
        <h3 className="mb-6 text-center text-2xl font-bold text-white">
          Tout ce qu&#39;il faut, dès le premier plan
        </h3>
        <div className="grid grid-cols-1 gap-6 text-[#F8E9CA] md:grid-cols-3">
          <div className="rounded-xl border border-[#29be4f]/10 bg-[#232729]/70 p-5">
            <h4 className="mb-2 font-bold text-white">Organisation</h4>
            <p>
              Calendrier centralisé, présences, feuilles de match, documents
              sécurisés.
            </p>
          </div>
          <div className="rounded-xl border border-[#29be4f]/10 bg-[#232729]/70 p-5">
            <h4 className="mb-2 font-bold text-white">Motivation</h4>
            <p>
              Classements ludiques, badges, blasons 3D, objectifs partagés.
            </p>
          </div>
          <div className="rounded-xl border border-[#29be4f]/10 bg-[#232729]/70 p-5">
            <h4 className="mb-2 font-bold text-white">Performance</h4>
            <p>
              Stats essentielles, reporting avancé, coaching par IA.
            </p>
          </div>
        </div>
      </section>

      {/* Transparence Stripe */}
      <section className="mt-10 mb-6 mx-auto max-w-3xl text-center text-xs text-[#F8E9CA]/80 px-4">
        <p>
          Paiement sécurisé par Stripe. Aucun frais d’installation, aucun
          engagement en abonnement mensuel.
        </p>
        <p className="mt-1">
          Les frais de transaction Stripe standard (cartes bancaires, wallets,
          etc.) s’appliquent sur chaque paiement.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <h3 className="mb-6 text-center text-2xl font-extrabold text-[#29be4f]">
          Questions fréquentes
        </h3>
        <div className="mx-auto max-w-3xl divide-y divide-[#29be4f]/20 rounded-2xl border border-[#29be4f]/20 bg-[#1d3e2e]/50">
          {FAQ_ITEMS.map((f, i) => (
            <details key={i} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-white">
                {f.q}
                <ChevronDown className="h-5 w-5 text-[#29be4f] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-[#F8E9CA]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Apps */}
      <section className="mt-16 text-center">
        {/* TODO: A décommenter quand l'appli sera lancée 
          <h3 className="mb-4 text-2xl font-extrabold text-[#29be4f]">Téléchargez l’application SimplyFoot</h3> */}
        <div className="mt-4 mb-4 font-bold text-[#29be4f]">
          Bientôt disponible sur tous vos appareils !
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-24">
          {plateformes.map((p) =>
            p.url ? (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 rounded-xl border border-[#14482F]/10 bg-white px-6 py-3 shadow transition hover:scale-105"
              >
                <Image src={p.src} alt={p.name} width={32} height={32} />
                <span className="font-semibold text-[#14482F]">
                  {p.name}
                </span>
              </a>
            ) : (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-xl border border-dashed border-[#14482F]/30 bg-white/70 px-6 py-3 shadow-sm"
              >
                <Image src={p.src} alt={p.name} width={32} height={32} />
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-[#14482F]">
                    {p.name}
                  </span>
                  <span className="text-xs text-[#6b6f72]">
                    Bientôt disponible
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {showClubModal && (
        <ClubSelectModal
          clubs={clubs}
          selectedClub={selectedClub}
          setSelectedClub={setSelectedClub}
          onCancel={() => setShowClubModal(false)}
          onConfirm={async () => {
            if (!selectedClub || !selectedPlan) return;
            setShowClubModal(false);
            const {
              data: { user },
            } = await supabase.auth.getUser();
            const emailToUse =
              email.trim() || user?.email || "";
            handleSubscribe(
              selectedPlan,
              billing,
              emailToUse,
              selectedClub
            );
          }}
        />
      )}
    </main>
  );
}
