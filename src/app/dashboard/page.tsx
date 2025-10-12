"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  User2,
  CreditCard,
  FileDown,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
  Calendar,
  Crown,
} from "lucide-react";

/* =========================================================================
   Types
   ========================================================================= */
type Order = {
  id: string;
  date: string; // ISO
  amount: number;
  plan: string;
  status: "Payé" | "En attente" | "Échoué";
  invoiceUrl?: string;
};

type Subscription = {
  plan: string;
  start: string; // ISO
  end: string; // ISO
  active: boolean;
  seats?: { used: number; quota: number };
  renewsAutomatically?: boolean;
  nextInvoice?: { date: string; amount: number } | null;
};

type Dashboard = {
  name: string;
  email: string;
  club: string;
  subscription: Subscription;
  orders: Order[];
  lastLogin?: string;
};

/* =========================================================================
   Helpers
   ========================================================================= */
const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

function formatDate(iso: string, withYear = true) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: withYear ? "numeric" : undefined,
  });
}

function diffParts(toIso: string) {
  const now = new Date().getTime();
  const end = new Date(toIso).getTime();
  let diff = Math.max(0, end - now);

  const days = Math.floor(diff / 86_400_000);
  diff -= days * 86_400_000;
  const hours = Math.floor(diff / 3_600_000);
  diff -= hours * 3_600_000;
  const mins = Math.floor(diff / 60_000);
  diff -= mins * 60_000;
  const secs = Math.floor(diff / 1_000);

  return { days, hours, mins, secs, expired: end <= now };
}

function betweenProgress(startIso: string, endIso: string) {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  const now = Date.now();
  if (now <= start) return 0;
  if (now >= end) return 100;
  return Math.round(((now - start) / (end - start)) * 100);
}

function badgeStatus(status: Order["status"]) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold";
  if (status === "Payé") return `${base} bg-emerald-100 text-emerald-700`;
  if (status === "En attente") return `${base} bg-amber-100 text-amber-700`;
  return `${base} bg-rose-100 text-rose-700`;
}

/* =========================================================================
   MOCK (remplace par l'appel API)
   ========================================================================= */
const MOCK: Dashboard = {
  name: "Romain Pennacchio",
  email: "romain@mail.com",
  club: "AS Toulon",
  subscription: {
    plan: "Maxi Club",
    start: "2024-07-01T00:00:00Z",
    end: "2025-07-01T00:00:00Z",
    active: true,
    seats: { used: 284, quota: 500 },
    renewsAutomatically: true,
    nextInvoice: { date: "2025-07-01T00:00:00Z", amount: 99.99 },
  },
  orders: [
    {
      id: "CMD202407012350",
      date: "2024-07-01T10:12:00Z",
      amount: 99.99,
      plan: "Maxi Club",
      status: "Payé",
      invoiceUrl: "/api/invoices/CMD202407012350",
    },
    {
      id: "CMD202307011144",
      date: "2023-07-01T09:41:00Z",
      amount: 99.99,
      plan: "Maxi Club",
      status: "Payé",
      invoiceUrl: "/api/invoices/CMD202307011144",
    },
  ],
  lastLogin: new Date().toISOString(),
};

/* =========================================================================
   Hook data – prêt pour brancher ton backend
   ========================================================================= */
function useDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // Quand ton backend est prêt :
        // const res = await fetch("/api/dashboard", { cache: "no-store" });
        // const json: Dashboard = await res.json();
        const json = MOCK; // fallback pour dev
        if (mounted) setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
}

/* =========================================================================
   Composants UI
   ========================================================================= */
function RingCountdown({
  start,
  end,
  label = "Temps restant",
}: {
  start: string;
  end: string;
  label?: string;
}) {
  // on ne lit pas la valeur : un simple tick pour re-render
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, mins, expired } = diffParts(end);
  const pct = betweenProgress(start, end);
  const ring = `conic-gradient(#5BE37D ${pct * 3.6}deg, rgba(255,255,255,0.08) 0)`;

  return (
    <div className="flex items-center gap-4" aria-live="polite">
      <div className="h-16 w-16 rounded-full grid place-items-center" style={{ background: ring }}>
        <div className="h-12 w-12 rounded-full bg-[#14482F] grid place-items-center text-white text-xs font-bold">
          {expired ? "0j" : `${days}j`}
        </div>
      </div>
      <div className="text-sm">
        <div className="text-white/80">{label}</div>
        <div className="font-extrabold text-[#5BE37D]">
          {expired ? "Expiré" : `${days}j ${hours}h ${mins}m`}
        </div>
        <div className="text-[11px] text-white/60">
          Fin le {formatDate(end)} • Avancement {pct}%
        </div>
      </div>
    </div>
  );
}

function SeatUsage({ used, quota }: { used: number; quota: number }) {
  const pct = Math.min(100, Math.round((used / quota) * 100));
  const bar = pct < 70 ? "bg-emerald-500" : pct < 90 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-white/70">
        <span>Licenciés</span>
        <span>
          {used} / {quota} ({pct}%)
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className={`h-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
      {pct >= 90 && (
        <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-300">
          <AlertTriangle className="h-3.5 w-3.5" />
          Presque au quota – pensez à mettre à jour votre plan.
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#5BE37D]/20 bg-white/5 p-6">
      <div className="mb-4 h-4 w-24 rounded bg-white/20" />
      <div className="mb-2 h-6 w-40 rounded bg-white/30" />
      <div className="h-3 w-56 rounded bg-white/10" />
    </div>
  );
}

/* =========================================================================
   Page
   ========================================================================= */
export default function UserDashboard() {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#14482F]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </main>
    );
  }
  if (!data) return null;

  const { subscription: sub } = data;
  const lastOrderDate = data.orders[0]?.date;

  return (
    <main className="min-h-screen bg-[#14482F]">
      {/* halo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* HEADER */}
        <header className="mb-8 rounded-3xl border border-[#5BE37D]/20 bg-[#1d3e2e]/70 p-6 backdrop-blur">
          <div className="flex flex-wrap items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[#5BE37D] text-[#14482F] shadow">
              <User2 className="h-7 w-7" />
            </div>
            <div className="mr-auto">
              <div className="text-xl font-extrabold text-white">{data.name}</div>
              <div className="text-sm text-white/70">{data.email}</div>
              <div className="text-sm font-semibold text-[#5BE37D]">{data.club}</div>
            </div>

            <a
              href="/offres"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5BE37D] px-4 py-2 font-extrabold text-[#14482F] shadow hover:bg-[#63f286]"
            >
              Changer de plan <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/api/billing-portal"
              className="inline-flex items-center gap-2 rounded-xl border border-[#5BE37D]/40 px-4 py-2 font-semibold text-[#F8E9CA] hover:border-[#5BE37D] hover:text-white"
            >
              <CreditCard className="h-4 w-4" /> Gérer la facturation
            </a>
          </div>
        </header>

        {/* CARDS GRID */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Abonnement */}
          <div className="rounded-2xl border border-[#5BE37D]/20 bg-[#232729] p-6 text-white">
            <div className="mb-3 flex items-center gap-2">
              <Crown className="h-5 w-5 text-[#5BE37D]" />
              <span className="font-bold">Mon abonnement</span>
              <span
                className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  sub.active ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                }`}
              >
                {sub.active ? "Actif" : "Inactif"}
              </span>
            </div>

            <div className="text-2xl font-extrabold">{sub.plan}</div>
            <div className="mt-1 text-sm text-white/80">
              Du <strong>{formatDate(sub.start)}</strong> au <strong>{formatDate(sub.end)}</strong>
            </div>

            <div className="mt-5">
              <RingCountdown start={sub.start} end={sub.end} />
            </div>

            {sub.seats && (
              <div className="mt-6">
                <SeatUsage used={sub.seats.used} quota={sub.seats.quota} />
              </div>
            )}

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a href="/offres" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15">
                Augmenter le quota
              </a>
              <a
                href="/api/billing-portal"
                className="rounded-lg border border-[#5BE37D]/30 px-4 py-2 text-sm font-semibold hover:border-[#5BE37D]"
              >
                Voir mes moyens de paiement
              </a>
            </div>

            {sub.nextInvoice && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#14482F] px-3 py-2 text-sm">
                <Calendar className="h-4 w-4 text-[#5BE37D]" />
                Prochaine facture le <strong className="ml-1">{formatDate(sub.nextInvoice.date)}</strong> —{" "}
                <strong>{EUR.format(sub.nextInvoice.amount)}</strong>
              </div>
            )}
          </div>

          {/* Commandes */}
          <div className="rounded-2xl border border-[#5BE37D]/20 bg-[#F8E9CA] p-6">
            <div className="mb-3 flex items-center gap-2 text-[#14482F]">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-bold">Mes commandes</span>
            </div>

            <div className="text-4xl font-extrabold text-[#14482F]">{data.orders.length}</div>
            <div className="text-sm text-[#14482F]/80">
              Dernier achat : <strong>{lastOrderDate ? formatDate(lastOrderDate) : "—"}</strong>
            </div>

            <div className="mt-4 space-y-2">
              {data.orders.slice(0, 3).map((o) => (
                <div key={o.id} className="rounded-lg bg-white/70 px-3 py-2 text-sm text-[#14482F] shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono">{o.id}</span>
                    <span className={badgeStatus(o.status)}>{o.status}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-[#14482F]/80">
                    <span>
                      {formatDate(o.date)} • {o.plan}
                    </span>
                    <span className="font-bold">{EUR.format(o.amount)}</span>
                  </div>
                  {o.invoiceUrl && (
                    <a href={o.invoiceUrl} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#14482F] underline">
                      <FileDown className="h-3.5 w-3.5" />
                      Télécharger la facture
                    </a>
                  )}
                </div>
              ))}
            </div>

            <a href="#orders" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#14482F] underline">
              Voir l’historique complet <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Accès / Sécurité */}
          <div className="rounded-2xl border border-[#5BE37D]/20 bg-[#1d3e2e]/70 p-6 text-white">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#5BE37D]" />
              <span className="font-bold">Accès & statut</span>
            </div>

            <div className="text-3xl font-extrabold">{sub.active ? "Accès actif" : "Accès suspendu"}</div>
            <p className="mt-2 text-sm text-white/80">
              {sub.active ? "Profitez de toutes les fonctionnalités SimplyFoot." : "Renouvelez pour réactiver votre accès."}
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a
                href="/security"
                className="rounded-lg border border-[#5BE37D]/30 px-4 py-2 text-sm font-semibold hover:border-[#5BE37D]"
              >
                Gérer la sécurité du compte
              </a>
              {!sub.active && (
                <a className="rounded-lg bg-[#5BE37D] px-4 py-2 text-sm font-extrabold text-[#14482F] hover:bg-[#63f286]" href="/offres">
                  Renouveler maintenant
                </a>
              )}
            </div>
          </div>
        </section>

        {/* TABLE COMMANDES */}
        <section id="orders" className="mt-10 rounded-2xl border border-[#5BE37D]/20 bg-white/95 p-6">
          <h2 className="mb-4 text-xl font-extrabold text-[#14482F]">Historique de mes achats</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-[#14482F]">
              <thead className="bg-[#F8E9CA]/60">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-bold">N° Commande</th>
                  <th className="px-4 py-2 text-left text-sm font-bold">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-bold">Montant</th>
                  <th className="px-4 py-2 text-left text-sm font-bold">Offre</th>
                  <th className="px-4 py-2 text-left text-sm font-bold">Statut</th>
                  <th className="px-4 py-2 text-left text-sm font-bold">Facture</th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((o) => (
                  <tr key={o.id} className="border-t border-gray-100">
                    <td className="px-4 py-2 font-mono">{o.id}</td>
                    <td className="px-4 py-2">{formatDate(o.date)}</td>
                    <td className="px-4 py-2 font-bold">{EUR.format(o.amount)}</td>
                    <td className="px-4 py-2">{o.plan}</td>
                    <td className="px-4 py-2">
                      <span className={badgeStatus(o.status)}>{o.status}</span>
                    </td>
                    <td className="px-4 py-2">
                      {o.invoiceUrl ? (
                        <a href={o.invoiceUrl} className="inline-flex items-center gap-1 text-sm font-semibold text-[#14482F] underline">
                          <FileDown className="h-4 w-4" />
                          Télécharger
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SUPPORT */}
        <section className="mt-8 rounded-2xl border border-[#5BE37D]/20 bg-[#14482F] p-6 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="text-lg font-extrabold">Besoin d’aide, d’une facture ou d’un support ?</div>
            <div className="sm:ml-auto text-[#5BE37D]">Contactez l’équipe SimplyFoot.</div>
            <a
              href="mailto:contact@simplyfoot.com"
              className="inline-flex items-center justify-center rounded-xl bg-[#5BE37D] px-5 py-2 font-extrabold text-[#14482F] hover:bg-[#63f286]"
            >
              Nous écrire
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

