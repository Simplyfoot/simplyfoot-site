'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';

const CLUBS = [
  { id: 'c1', name: 'FC Gardanne', sport: 'foot', city: 'Gardanne', licencies: 210, equipes: 12, plan: 'regional', status: 'active', createdAt: '2024-01-15' },
  { id: 'c2', name: 'AS Martigues', sport: 'foot', city: 'Martigues', licencies: 85, equipes: 5, plan: 'local', status: 'active', createdAt: '2024-03-20' },
  { id: 'c3', name: 'ES Septèmes', sport: 'foot', city: 'Septèmes', licencies: 45, equipes: 3, plan: 'mini', status: 'active', createdAt: '2024-06-10' },
  { id: 'c4', name: 'RC Béziers', sport: 'rugby', city: 'Béziers', licencies: 180, equipes: 8, plan: 'regional', status: 'active', createdAt: '2023-09-05' },
  { id: 'c5', name: 'US Pau', sport: 'rugby', city: 'Pau', licencies: 150, equipes: 7, plan: 'local', status: 'active', createdAt: '2024-02-12' },
  { id: 'c6', name: 'RC Tyrosse', sport: 'rugby', city: 'Tyrosse', licencies: 95, equipes: 4, plan: 'local', status: 'blocked', createdAt: '2024-05-18' },
  { id: 'c7', name: 'MHB Amateur', sport: 'handball', city: 'Montpellier', licencies: 150, equipes: 6, plan: 'regional', status: 'active', createdAt: '2024-04-01' },
  { id: 'c8', name: 'HBC Strasbourg', sport: 'handball', city: 'Strasbourg', licencies: 120, equipes: 5, plan: 'local', status: 'active', createdAt: '2024-07-22' },
  { id: 'c9', name: 'HB Nîmes', sport: 'handball', city: 'Nîmes', licencies: 60, equipes: 3, plan: 'mini', status: 'pending', createdAt: '2025-01-10' },
  { id: 'c10', name: 'FC Rennes Amateur', sport: 'foot', city: 'Rennes', licencies: 170, equipes: 9, plan: 'regional', status: 'active', createdAt: '2023-11-01' },
];

const BRAND_COLORS: Record<string, string> = { foot: '#1B5E20', rugby: '#8B1A1A', handball: '#1A237E' };
const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-400/15 text-emerald-400',
  blocked: 'bg-red-400/15 text-red-400',
  pending: 'bg-amber-400/15 text-amber-400',
  suspended: 'bg-white/10 text-white/40',
};

export default function AdminClubsPage() {
  const [filter, setFilter] = useState('');
  const [sportFilter, setSportFilter] = useState('');

  const filtered = useMemo(() => {
    return CLUBS.filter((c) => {
      if (sportFilter && c.sport !== sportFilter) return false;
      if (filter && !c.name.toLowerCase().includes(filter.toLowerCase())) return false;
      return true;
    });
  }, [filter, sportFilter]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des clubs</h1>

      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="Rechercher..." value={filter} onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg bg-[#111113] border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none" />
        <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)}
          className="rounded-lg bg-[#111113] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none">
          <option value="">Tous sports</option>
          <option value="foot">Football</option>
          <option value="rugby">Rugby</option>
          <option value="handball">Handball</option>
        </select>
      </div>

      <div className="rounded-xl border border-white/6 bg-[#111113] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/6 text-white/40 text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-medium">Club</th>
              <th className="text-left px-4 py-3 font-medium">Sport</th>
              <th className="text-right px-4 py-3 font-medium">Licenciés</th>
              <th className="text-right px-4 py-3 font-medium">Équipes</th>
              <th className="text-left px-4 py-3 font-medium">Plan</th>
              <th className="text-left px-4 py-3 font-medium">Statut</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-3">
                  <div className="text-white font-medium">{c.name}</div>
                  <div className="text-xs text-white/40">{c.city}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: `${BRAND_COLORS[c.sport]}30`, color: BRAND_COLORS[c.sport] }}>
                    {c.sport}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-white/60 tabular-nums">{c.licencies}</td>
                <td className="px-4 py-3 text-right text-white/60 tabular-nums">{c.equipes}</td>
                <td className="px-4 py-3 text-white/60 capitalize">{c.plan}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[c.status]}`}>
                    {c.status === 'active' ? 'Actif' : c.status === 'blocked' ? 'Bloqué' : 'En attente'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/clubs/${c.id}`} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors inline-flex">
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
