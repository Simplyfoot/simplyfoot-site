"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";
import { useDashboard } from "app/hooks/useDashboard";
import { getActivePresidentClubs } from "lib/supabaseQueries";
import { OrdersTable } from "components/dashboard/OrdersTable";
import { RingCountdown } from "components/dashboard/RingCountdown";
import { SeatUsage } from "components/dashboard/SeatUsage";
import { formatDate } from "lib/utils";
import {
  User2,
  ShoppingCart,
  ShieldCheck,
  Crown,
  Pencil,
  Plus,
} from "lucide-react";
import EditUserModal from "components/modals/EditUserModal";
import EditClubModal, { ClubData } from "components/modals/EditClubModal";
import AddClubModal from "components/modals/AddClubModal";

export default function UserDashboard() {
  const { data, loading } = useDashboard();
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [editClubModalOpen, setEditClubModalOpen] = useState(false);
  const [clubs, setClubs] = useState<{ club_id: string; club_name: string }[]>(
    []
  );
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [addClubModalOpen, setAddClubModalOpen] = useState(false);

  const handleAddClub = (clubData: any) => {
    console.log("🏗️ Nouveau club :", clubData);
    setAddClubModalOpen(false);
  };

  // Récupération des clubs dont l'utilisateur est président
  useEffect(() => {
    (async () => {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;
      if (!userId) return;

      const clubsList = await getActivePresidentClubs(userId);
      setClubs(clubsList);

      if (clubsList.length === 1) {
        setSelectedClub(clubsList[0].club_id);
      }
    })();
  }, []);

  if (loading)
    return (
      <main className="min-h-screen bg-[#14482F] flex items-center justify-center text-white">
        Chargement du tableau de bord...
      </main>
    );

  if (!data)
    return (
      <main className="min-h-screen bg-[#14482F] flex items-center justify-center text-white">
        <p>Veuillez vous connecter pour accéder à votre tableau de bord.</p>
      </main>
    );

  const { subscription: sub } = data;
  const lastOrderDate = data.orders[0]?.date;

  const userData = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
  };

  const handleEditUser = (updatedUserData: typeof userData) => {
    console.log("✅ Utilisateur modifié :", updatedUserData);
    setEditUserModalOpen(false);
  };

  const handleEditClub = (updatedClubData: ClubData) => {
    console.log("🏟️ Club modifié :", updatedClubData);
    setEditClubModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#14482F] relative">
      {/* Fond radial décoratif */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Bonjour {data.firstname} 👋🏼
          </h1>
          <p className="text-sm text-white/70">
            Bienvenue sur votre espace personnel. Gérez votre compte, vos clubs
            et vos abonnements SimplyFoot.
          </p>
        </div>

        {/* ===== MES INFORMATIONS ===== */}
        <section className="mb-8 rounded-3xl border border-[#29be4f]/20 bg-gradient-to-br from-[#1e3b2d] to-[#163224] p-6 shadow-lg backdrop-blur-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#29be4f] text-[#14482F] shadow-md ring-2 ring-[#29be4f]/40">
                <User2 className="h-8 w-8" />
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#1e3b2d]" />
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2">
                Mes informations
              </h2>
              <p className="mt-1 text-xl font-extrabold text-white leading-tight">
                {data.firstname} {data.lastname}
              </p>
              <p className="text-sm text-[#F8E9CA]/60">{data.email}</p>
            </div>
          </div>

          <button
            onClick={() => setEditUserModalOpen(true)}
            title="Modifier mes informations"
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-[#29be4f]/50 bg-[#29be4f]/10 px-5 py-2 text-sm font-semibold text-[#29be4f] hover:bg-[#29be4f]/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </button>
        </section>

        <button
          onClick={() => setAddClubModalOpen(true)}
          title="Ajouter un club"
          className="cursor-pointer inline-flex items-center justify-center mb-4 gap-2 rounded-full border border-[#29be4f]/50 bg-[#29be4f]/10 px-5 py-2 text-sm font-semibold text-[#29be4f] hover:bg-[#29be4f]/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Ajouter un club
        </button>

        {/* ===== MON CLUB ===== */}
        <section className="mb-10 rounded-3xl border border-[#29be4f]/20 bg-gradient-to-br from-[#1e3b2d] to-[#163224] p-6 shadow-lg backdrop-blur-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#29be4f] text-[#14482F] shadow-md ring-2 ring-[#29be4f]/40">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2">
                Mon club
              </h2>

              {clubs.length > 1 ? (
                <select
                  className="mt-1 rounded-lg border border-[#29be4f]/30 bg-[#1d3e2e] px-3 py-2 text-sm text-[#F8E9CA] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
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
                  {clubs[0]?.club_name ?? data.club ?? "Aucun club actif"}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setEditClubModalOpen(true)}
              title="Modifier le club"
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-[#29be4f]/50 bg-[#29be4f]/10 px-5 py-2 text-sm font-semibold text-[#29be4f] hover:bg-[#29be4f]/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              <Pencil className="h-4 w-4" />
              Modifier
            </button>
          </div>
        </section>

        {/* ===== ABONNEMENT / COMMANDES / ACCÈS ===== */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#29be4f]/20 bg-[#232729] p-6 text-white">
            <div className="mb-3 flex items-center gap-2">
              <Crown className="h-5 w-5 text-[#29be4f]" />
              <span className="text-sm font-bold text-[#F8E9CA]/70 uppercase tracking-wide">
                Mon abonnement
              </span>
              <span
                className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${sub.active
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
                  }`}
              >
                {sub.active ? "Actif" : "Inactif"}
              </span>
            </div>

            <div className="text-2xl font-extrabold">{sub.plan}</div>
            <div className="mt-1 text-sm text-white/80">
              Du <strong>{formatDate(sub.start)}</strong> au{" "}
              <strong>{formatDate(sub.end)}</strong>
            </div>

            <div className="mt-5">
              <RingCountdown start={sub.start} end={sub.end} />
            </div>

            {sub.seats && (
              <div className="mt-6">
                <SeatUsage used={sub.seats.used} quota={sub.seats.quota} />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#29be4f]/20 bg-[#F8E9CA] p-6">
            <div className="mb-3 flex items-center gap-2 text-[#14482F]">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wide">Mes commandes</span>
            </div>
            <div className="text-4xl font-extrabold text-[#14482F]">
              {data.orders.length}
            </div>
            <div className="text-sm text-[#14482F]/80">
              Dernier achat :{" "}
              <strong>
                {lastOrderDate ? formatDate(lastOrderDate) : "—"}
              </strong>
            </div>
          </div>

          <div className="rounded-2xl border border-[#29be4f]/20 bg-[#1d3e2e]/70 p-6 text-white">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#29be4f]" />
              <span className="text-sm font-bold uppercase tracking-wide">Accès & statut</span>
            </div>

            <div className="text-3xl font-extrabold">
              {sub.active ? "Accès actif" : "Accès suspendu"}
            </div>
            <p className="mt-2 text-sm text-white/80">
              {sub.active
                ? "Profitez de toutes les fonctionnalités SimplyFoot."
                : "Renouvelez pour réactiver votre accès."}
            </p>
          </div>
        </section>

        <OrdersTable orders={data.orders} />

        {/* ===== SUPPORT ===== */}
        <section className="mt-8 rounded-2xl border border-[#29be4f]/20 bg-[#14482F] p-6 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="text-lg font-extrabold">
              Besoin d’aide, d’une facture ou d’un support ?
            </div>
            <div className="sm:ml-auto text-[#29be4f]">
              Contactez l’équipe SimplyFoot.
            </div>
            <a
              href="mailto:contact@simplyfoot.fr"
              className="inline-flex items-center justify-center rounded-xl bg-[#29be4f] px-5 py-2 font-extrabold text-[#14482F] hover:bg-[#63f286]"
            >
              Nous écrire
            </a>
          </div>
        </section>
      </div>

      {/* ===== MODALES ===== */}
      <EditUserModal
        isOpen={editUserModalOpen}
        onClose={() => setEditUserModalOpen(false)}
        onSave={handleEditUser}
        userData={userData}
      />

      <EditClubModal
        isOpen={editClubModalOpen}
        onClose={() => setEditClubModalOpen(false)}
        clubId={selectedClub ?? clubs[0]?.club_id ?? ""}
        clubData={{
          name: "",
          address: undefined,
          postal_code: undefined,
          city: undefined,
          country: undefined,
          phone_number: undefined,
          email: undefined,
          siret_number: undefined,
          siren_number: undefined,
          website: undefined,
          webshop: undefined,
        }}
        onSave={handleEditClub}
      />

      <AddClubModal
        isOpen={addClubModalOpen}
        onClose={() => setAddClubModalOpen(false)}
        onSave={handleAddClub}
      />
    </main>
  );
}
