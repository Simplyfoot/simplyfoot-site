import Link from 'next/link';
import { ArrowLeft, Ban, Trash2 } from 'lucide-react';

export default function AdminClubDetailPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/clubs" className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">FC Gardanne</h1>
        <span className="rounded-full bg-emerald-400/15 text-emerald-400 px-2.5 py-0.5 text-xs font-medium">Actif</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/6 bg-[var(--admin-surface)] p-5 space-y-4">
          <h3 className="text-sm font-bold text-white/70 uppercase tracking-wide">Informations</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-white/40">Sport</dt><dd className="text-white">Football</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">Ville</dt><dd className="text-white">Gardanne (13)</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">Président</dt><dd className="text-white">Marc Durand</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">Email</dt><dd className="text-white">contact@fcgardanne.fr</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">Plan</dt><dd className="text-white">Régional</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">Inscrit le</dt><dd className="text-white">15 janvier 2024</dd></div>
          </dl>
        </div>

        <div className="rounded-xl border border-white/6 bg-[var(--admin-surface)] p-5 space-y-4">
          <h3 className="text-sm font-bold text-white/70 uppercase tracking-wide">Statistiques</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-white/40">Licenciés</dt><dd className="text-white font-bold text-lg">210</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">Équipes</dt><dd className="text-white font-bold text-lg">12</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">Dernière activité</dt><dd className="text-white">Aujourd&apos;hui</dd></div>
          </dl>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer">
          <Ban className="h-4 w-4" /> Bloquer
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer">
          <Trash2 className="h-4 w-4" /> Supprimer
        </button>
      </div>
    </div>
  );
}
