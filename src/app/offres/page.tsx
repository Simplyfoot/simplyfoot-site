"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { supabase } from "lib/supabaseClient";
import { handleSubscribe } from "lib/stripeHelpers";
import { Billing } from "app/_types/Order";
import ClubSelectModal from "components/modals/ClubSelectModal";
import { priceFor } from "lib/priceUtils";
import { PLANS } from "lib/plans";


/* =========================================================================
   🔹 PAGE OFFRES
   ========================================================================= */
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
            Toutes les fonctionnalités, sans limites cachées.
          </p>
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
              className={`relative rounded-3xl border-2 bg-gradient-to-br ${offre.couleur} p-[2px] shadow-xl`}
            >
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