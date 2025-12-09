"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "lib/AuthProvider";
import {
  getActivePresidentClubs,
  getClubDetails,
  updateUser,
  updateClub,
} from "lib/supabaseQueries";
import { useDashboard } from "app/hooks/useDashboard";
import { useSubscriptionData } from "app/hooks/useSubscriptionData";
import { OrdersTable } from "components/dashboard/OrdersTable";
import { RingCountdown } from "components/dashboard/RingCountdown";
import EditUserModal from "components/modals/EditUserModal";
import ClubModal from "components/modals/ClubModal";
import ConfirmModal from "components/modals/ConfirmModal";
import { PLAN_NAMES } from "lib/plans";
import { formatDate } from "lib/utils";
import { Club } from "app/_types/Club";
import {
  User2,
  ShoppingCart,
  ShieldCheck,
  Crown,
  Pencil,
  Plus,
  Clipboard,
  Check,
} from "lucide-react";

export default function UserDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data, loading } = useDashboard();

  const [clubs, setClubs] = useState<{ club_id: string; club_name: string }[]>([]);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [clubData, setClubData] = useState<Club | null>(null);

  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [editClubModalOpen, setEditClubModalOpen] = useState(false);
  const [addClubModalOpen, setAddClubModalOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const { subscription, orders } = useSubscriptionData(selectedClub);

  const userData = {
    firstname: data?.firstname || '',
    lastname: data?.lastname || '',
    email: data?.email || '',
    gender: data?.gender || null,
    gender_other_label: data?.gender_other_label || null,
    id: user?.id || undefined,
  };

  // === CHARGEMENT CLUBS ===
  useEffect(() => {
    const fetchClubs = async () => {
      if (!user?.id) return;

      const clubsList = await getActivePresidentClubs(user.id);

      const sortedClubs = [...clubsList].sort((a, b) =>
        a.club_name.localeCompare(b.club_name, "fr", { sensitivity: "base" })
      );

      setClubs(sortedClubs);

      if (sortedClubs.length === 1) {
        setSelectedClub(sortedClubs[0].club_id);
      }
    };

    fetchClubs();
  }, [user]);


  useEffect(() => {
    if (clubs.length > 0 && !selectedClub) {
      // Sélectionne automatiquement le premier club
      setSelectedClub(clubs[0].club_id);
    }
  }, [clubs, selectedClub]);

  // === CHARGEMENT DÉTAILS CLUB ===
  useEffect(() => {
    if (!selectedClub) return;

    const fetchClubDetails = async () => {
      const details = await getClubDetails(selectedClub);

      if (!details) return;
      setClubData(details);
    };
    fetchClubDetails();
  }, [selectedClub]);

  // === REDIRECTION SI PAS CONNECTÉ ===
  useEffect(() => {
    // Attendre que l'auth soit chargé avant de rediriger
    if (!authLoading && !user) {
      router.push("/connexion");
    }
  }, [user, authLoading, router]);

  if (authLoading || loading || !data)
    return (
      <main className="min-h-screen bg-[#14482F] flex items-center justify-center text-white">
        Chargement du tableau de bord...
      </main>
    );

  // === HANDLERS ===
  const handleEditUser = async (form: {
    firstname: string;
    lastname: string;
    email: string;
  }) => {
    if (!user?.id) return;
    try {
      await updateUser(user.id, form);
      // Recharger les données après mise à jour
      window.location.reload();
    } catch (err) {
      console.error("❌ Erreur mise à jour utilisateur :", err);
    } finally {
      setEditUserModalOpen(false);
    }
  };

  const handleEditClub = async (updatedClubData: Club) => {
    if (!selectedClub) return;
    try {
      await updateClub(selectedClub, updatedClubData);
      setClubData(updatedClubData);
    } catch (err) {
      console.error("❌ Erreur mise à jour club :", err);
    } finally {
      setEditClubModalOpen(false);
    }
  };

  const handleAddClub = (clubData: any) => {
    console.log("🏗️ Nouveau club :", clubData);
    setAddClubModalOpen(false);
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    try {
      const res = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: subscription.stripe_subscription_id }),
      });
      const { success, error } = await res.json();
      if (error) throw new Error(error);
      alert("Votre essai a été annulé avec succès.");
    } catch (err) {
      alert("Erreur lors de l’annulation de l’essai.");
      console.error(err);
    } finally {
      setShowCancelModal(false);
    }
  };

  // === AFFICHAGE ===
  return (
    <main className="min-h-screen bg-[#14482F] relative mt-[-60px] mb-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* === HEADER === */}
        <header className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Bonjour {data?.gender === "FEMALE" ? "Présidente" : "Président"} {data.firstname} 👋🏼
          </h1>
          <p className="text-sm text-white/70">
            Bienvenue sur votre espace personnel. Gérez votre compte, vos clubs et vos abonnements SimplyFoot.
          </p>
        </header>

        {/* === INFOS UTILISATEUR === */}
        <section className="mb-8 rounded-3xl border border-[#29be4f]/20 bg-linear-to-br from-[#1e3b2d] to-[#163224] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#29be4f] text-[#14482F] shadow ring-2 ring-[#29be4f]/40">
                <User2 className="h-8 w-8" />
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#1e3b2d]" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2">Mes informations</h2>
              <p className="mt-1 text-xl font-extrabold text-white leading-tight">
                {data.firstname} {data.lastname}
              </p>
              <p className="text-sm text-[#F8E9CA]/60">{data.email}</p>
            </div>
          </div>
          <button
            onClick={() => setEditUserModalOpen(true)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[#29be4f]/50 bg-[#29be4f]/10 px-5 py-2 text-sm font-semibold text-[#29be4f] hover:bg-[#29be4f]/20 transition-all duration-200"
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </button>
        </section>

        {/* === CLUBS === */}
        <button
          onClick={() => setAddClubModalOpen(true)}
          className="cursor-pointer inline-flex items-center justify-center mb-4 gap-2 rounded-full border border-[#29be4f]/50 bg-[#29be4f]/10 px-5 py-2 text-sm font-semibold text-[#29be4f] hover:bg-[#29be4f]/20 transition-all duration-200"
        >
          <Plus className="h-4 w-4" /> Ajouter un club
        </button>

        <section className="mb-8 rounded-3xl border border-[#29be4f]/20 bg-linear-to-br from-[#1e3b2d] to-[#163224] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-5">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#29be4f] text-[#14482F] shadow ring-2 ring-[#29be4f]/40">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2">Mon club</h2>

              {clubs.length > 1 ? (
                <select
                  className="mt-1 cursor-pointer rounded-lg border border-[#29be4f]/30 bg-[#1d3e2e] px-3 py-2 text-sm text-[#F8E9CA]"
                  value={selectedClub ?? ""}
                  onChange={(e) => setSelectedClub(e.target.value)}
                >
                  <option value="">— Sélectionnez un club —</option>
                  {clubs.map((club) => (
                    <option key={club.club_id} value={club.club_id}>
                      {club.club_name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-xl font-extrabold text-white leading-tight">
                  {clubs[0]?.club_name ?? "Aucun club actif"}
                </p>
              )}
            </div>
          </div>

          {/* Code club */}
          {clubData?.code && subscription && (
            <div className="mt-4 sm:mt-0 sm:text-left">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2">Code club</h2>
              <div className="flex items-center gap-2 text-sm text-[#F8E9CA]/80">
                <span>{clubData.code}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(clubData.code as string);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="cursor-pointer flex items-center gap-1 text-[#29be4f] hover:text-[#63f286] text-xs font-semibold transition"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" /> Copié !
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3 w-3" /> Copier
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setEditClubModalOpen(true)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[#29be4f]/50 bg-[#29be4f]/10 px-5 py-2 text-sm font-semibold text-[#29be4f] hover:bg-[#29be4f]/20 transition-all duration-200"
          >
            <Pencil className="h-4 w-4" /> Modifier
          </button>
        </section>

        {/* === ABONNEMENT + COMMANDES === */}
        {subscription ? (
          <>
            <section className="grid gap-6 lg:grid-cols-3">
              {/* Abonnement */}
              <div className="rounded-2xl border border-[#29be4f]/20 bg-[#232729] p-6 text-white">
                <div className="mb-3 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-[#29be4f]" />
                  <span className="text-sm font-bold text-[#F8E9CA]/70 uppercase tracking-wide">
                    Mon abonnement
                  </span>
                  <span
                    className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${subscription.active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                      }`}
                  >
                    {subscription.active ? "Actif" : "Inactif"}
                  </span>
                </div>

                <div className="text-2xl font-extrabold">
                  {PLAN_NAMES[subscription.plan] ?? subscription.plan}
                </div>
                <div className="mt-1 text-sm text-white/80">
                  Du <strong>{formatDate(subscription.start)}</strong> au{" "}
                  <strong>{formatDate(subscription.end)}</strong>
                </div>
                <div className="mt-5">
                  <RingCountdown start={subscription.start} end={subscription.end} />
                </div>
                <div className="mt-5 text-center">
                  <p className="text-xs text-white/50">
                    Vous pouvez annuler votre essai à tout moment.
                  </p>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="mt-2 cursor-pointer text-xs text-white/50 font-semibold hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    Annuler ma période d’essai
                  </button>
                </div>
              </div>

              {/* Commandes */}
              <div className="rounded-2xl border border-[#29be4f]/20 bg-[#F8E9CA] p-6">
                <div className="mb-3 flex items-center gap-2 text-[#14482F]">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">Mes commandes</span>
                </div>
                <div className="text-4xl font-extrabold text-[#14482F]">{orders.length}</div>
                <div className="text-sm text-[#14482F]/80">
                  Dernier achat : <strong>{orders[0]?.date ? formatDate(orders[0].date) : "—"}</strong>
                </div>
              </div>

              {/* Statut */}
              <div className="rounded-2xl border border-[#29be4f]/20 bg-[#1d3e2e]/70 p-6 text-white">
                <div className="mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#29be4f]" />
                  <span className="text-sm font-bold uppercase tracking-wide">Accès & statut</span>
                </div>
                <div className="text-3xl font-extrabold">
                  {subscription.active ? "Accès actif" : "Accès suspendu"}
                </div>
                <p className="mt-2 text-sm text-white/80">
                  {subscription.active
                    ? "Profitez de toutes les fonctionnalités SimplyFoot."
                    : "Renouvelez pour réactiver votre accès."}
                </p>
              </div>
            </section>

              <OrdersTable orders={orders} />

          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-10 space-y-4">
            <p className="text-white/80 text-lg">
              Aucun abonnement actif pour le club <strong>{clubData?.name}</strong>.
            </p>
            <p className="text-[#F8E9CA]/70 text-sm max-w-md">
              Souscrivez à l’une de nos formules SimplyFoot pour débloquer toutes les fonctionnalités et gérer votre club en toute simplicité.
            </p>
            <a
              href="/offres"
              className="inline-flex items-center justify-center rounded-full border border-[#29be4f]/50 bg-[#29be4f]/10 px-6 py-2 text-sm font-semibold text-[#29be4f] hover:bg-[#29be4f]/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              Voir les formules
            </a>
          </div>
        )}

        {/* === SUPPORT === */}
        <section className="mt-20 rounded-2xl border border-[#29be4f]/20 bg-[#14482F] p-6 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="text-lg font-extrabold">Besoin d’aide ou d’un support ?</div>
            <div className="sm:ml-auto text-[#29be4f]">Contactez l’équipe SimplyFoot.</div>
            <a
              href="mailto:contact@simplyfoot.fr"
              className="inline-flex items-center justify-center rounded-xl bg-[#29be4f] px-5 py-2 font-extrabold text-[#14482F] hover:bg-[#63f286]"
            >
              Nous écrire
            </a>
          </div>
        </section>
      </div>

      {/* === MODALES === */}
      <EditUserModal
        isOpen={editUserModalOpen}
        onClose={() => setEditUserModalOpen(false)}
        onSave={handleEditUser}
        userData={userData}
      />

      <ClubModal
        isOpen={editClubModalOpen}
        mode="edit"
        clubId={selectedClub}
        clubData={clubData}
        onSave={handleEditClub}
        onClose={() => setEditClubModalOpen(false)}
      />

      <ClubModal
        isOpen={addClubModalOpen}
        mode="add"
        userId={userData?.id}
        onSave={handleAddClub}
        onClose={() => setAddClubModalOpen(false)}
      />

      <ConfirmModal
        isOpen={showCancelModal}
        title="Annuler la période d’essai"
        message="Êtes-vous sûr de vouloir annuler votre période d’essai ? Vous perdrez l’accès immédiatement."
        confirmLabel="Annuler la période d’essai"
        confirmTone="danger"
        onConfirm={handleCancelSubscription}
        onClose={() => setShowCancelModal(false)}
      />
    </main>
  );
}
