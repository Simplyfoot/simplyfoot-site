'use client';

import Link from 'next/link';
import { ArrowLeft, Ban, KeyRound, Trash2 } from 'lucide-react';

export default function AdminUserDetailPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">Marc Durand</h1>
        <span className="rounded-full bg-emerald-400/15 text-emerald-400 px-2.5 py-0.5 text-xs font-medium">Actif</span>
      </div>

      <div className="rounded-xl border border-white/6 bg-[#111113] p-5 space-y-4">
        <h3 className="text-sm font-bold text-white/70 uppercase tracking-wide">Profil</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-white/40">Email</dt><dd className="text-white">marc@fcgardanne.fr</dd></div>
          <div className="flex justify-between"><dt className="text-white/40">Rôle</dt><dd className="text-white">Président</dd></div>
          <div className="flex justify-between"><dt className="text-white/40">Club</dt><dd><Link href="/admin/clubs/c1" className="text-white hover:underline">FC Gardanne</Link></dd></div>
          <div className="flex justify-between"><dt className="text-white/40">Sport</dt><dd className="text-white">Football</dd></div>
          <div className="flex justify-between"><dt className="text-white/40">Inscrit le</dt><dd className="text-white">15 janvier 2024</dd></div>
          <div className="flex justify-between"><dt className="text-white/40">Dernière connexion</dt><dd className="text-white">14 avril 2025</dd></div>
        </dl>
      </div>

      <div className="flex gap-3">
        <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-colors cursor-pointer">
          <KeyRound className="h-4 w-4" /> Réinitialiser le MDP
        </button>
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
