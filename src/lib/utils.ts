/** Format une date ISO au format français */
export function formatDate(iso: string, withYear = true) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: withYear ? "numeric" : undefined,
  });
}

/** Calcule la différence entre maintenant et une date future */
export function diffParts(toIso: string) {
  const now = Date.now();
  const end = new Date(toIso).getTime();
  let diff = Math.max(0, end - now);
  const days = Math.floor(diff / 86_400_000);
  diff -= days * 86_400_000;
  const hours = Math.floor(diff / 3_600_000);
  diff -= hours * 3_600_000;
  const mins = Math.floor(diff / 60_000);
  const expired = end <= now;
  return { days, hours, mins, expired };
}

/** Retourne un pourcentage de progression entre deux dates */
export function betweenProgress(startIso: string, endIso: string) {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  const now = Date.now();
  if (now <= start) return 0;
  if (now >= end) return 100;
  return Math.round(((now - start) / (end - start)) * 100);
}

/** Retourne les classes Tailwind selon le statut d'une commande */
export function badgeStatus(status: "Payé" | "En attente" | "Échoué") {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold";
  if (status === "Payé") return `${base} bg-emerald-100 text-emerald-700`;
  if (status === "En attente") return `${base} bg-amber-100 text-amber-700`;
  return `${base} bg-rose-100 text-rose-700`;
}

/** Formatteur de montants en euros */
export const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});
