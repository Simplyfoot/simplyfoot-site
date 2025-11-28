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

const VALUE_ICONS = [
  { t: "Mise en route accompagnée" },
  { t: "Sécurité & RGPD" },
  { t: "Applications mobiles" },
  { t: "Support réactif" },
] as const;

const plateformes = [
  { name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.simplyfoot.app", src: GooglePlay },
  { name: "App Store", url: "", src: AppStore }, //TODO: ajouter le lien App Store quand l'app sera dispo
] as const;

export default function OffresPage() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [email, setEmail] = useState("");
  const [clubs, setClubs] = useState<{ id: string; name: string }[]>([]);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showClubModal, setShowClubModal] = useState(false);

  const plans = useMemo(() => {
    return PLANS.map((p) => ({
      ...p,
      price: p.monthly ? priceFor(billing, p.monthly) : null,
    }));
  }, [billing]);

  type ClubPresidentRow = {
    club_id: string;
    clubs: { name: string } | { name: string }[];
  };

  async function handleClickSubscribe(planKey: string) {
    const { data: { user } } = await supabase.auth.getUser();
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

    if (clubList.length === 1) {
      const club_id = clubList[0].club_id;
      const emailToUse = user.email ?? email;
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
      <div className="max-w-7xl mx-auto px-6 py-16">
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
            Toutes les fonctionnalités, sans limites cachées. Concentrez-vous sur le terrain, on s’occupe du reste.
          </p>

          {/* Essai Gratuit */}
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#29be4f]/30 bg-[#1d3e2e]/70 p-4 text-left text-[#F8E9CA]">
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

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1d3e2e]/70 p-1 ring-1 ring-[#29be4f]/30">
            <button
              onClick={() => setBilling("monthly")}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition ${billing === "monthly"
                ? "bg-[#29be4f] text-[#14482F]"
                : "text-[#F8E9CA] hover:text-white"
                }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition ${billing === "yearly"
                ? "bg-[#29be4f] text-[#14482F]"
                : "text-[#F8E9CA] hover:text-white"
                }`}
            >
              Annuel{" "}
              <span className="ml-1 text-xs opacity-80">(-10 %)</span>
            </button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {VALUE_ICONS.map((v) => (
              <span
                key={v.t}
                className="inline-flex items-center gap-2 rounded-full border border-[#29be4f]/30 bg-[#1d3e2e]/50 px-3 py-1 text-xs font-semibold text-[#F8E9CA]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#29be4f]" /> {v.t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* OFFRES */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((offre) => (
            <motion.article
              key={offre.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl border-2 bg-linear-to-br ${offre.couleur} p-0.5 shadow-xl`}
            >

              {/* Badge */}
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

                {/* Bonus */}
                <div className="mt-4 italic font-medium text-[#175438]">{offre.bonus}</div>

                <motion.button
                  onClick={() => handleClickSubscribe(offre.key)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#67D07C] to-[#29be4f] px-6 py-3 text-base font-extrabold text-[#14482F] shadow-lg hover:from-[#29be4f] hover:to-[#68FB7A]"
                >
                  {offre.ctaLabel}
                </motion.button>

                <div className="mt-2 text-center text-xs font-semibold text-[#175438]">
                  Essai 30 jours • Annulez à tout moment avant la fin de l’essai
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Remises */}
      <div className="mt-14 text-center">
        <h3 className="text-2xl font-extrabold text-[#29be4f]">Remises et offres spéciales</h3>
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
      <section className="mt-16 rounded-2xl border border-[#29be4f]/20 bg-[#1d3e2e]/50 p-6">
        <h3 className="mb-6 text-center text-2xl font-bold text-white">Tout ce qu&#39;il faut, dès le premier plan</h3>
        <div className="grid grid-cols-1 gap-6 text-[#F8E9CA] md:grid-cols-3">
          <div className="rounded-xl border border-[#29be4f]/10 bg-[#232729]/70 p-5">
            <h4 className="mb-2 font-bold text-white">Organisation</h4>
            <p>Calendrier centralisé, présences, feuilles de match, documents sécurisés.</p>
          </div>
          <div className="rounded-xl border border-[#29be4f]/10 bg-[#232729]/70 p-5">
            <h4 className="mb-2 font-bold text-white">Motivation</h4>
            <p>Classements ludiques, badges, blasons 3D, objectifs partagés.</p>
          </div>
          <div className="rounded-xl border border-[#29be4f]/10 bg-[#232729]/70 p-5">
            <h4 className="mb-2 font-bold text-white">Performance</h4>
            <p>Stats essentielles, reporting avancé, coaching par IA.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h3 className="mb-6 text-center text-2xl font-extrabold text-[#29be4f]">Questions fréquentes</h3>
        <div className="mx-auto max-w-3xl divide-y divide-[#29be4f]/20 rounded-2xl border border-[#29be4f]/20 bg-[#1d3e2e]/50">
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
        <div className="mt-4 mb-4 font-bold text-[#29be4f]">Bientôt disponible sur tous vos appareils !</div>
        <div className="flex flex-wrap justify-center gap-8 mb-24">
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
            const { data: { user } } = await supabase.auth.getUser();
            const emailToUse = email.trim() || user?.email || "";
            handleSubscribe(selectedPlan, billing, emailToUse, selectedClub);
          }}
        />
      )}
    </main>
  );
}