'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { getBrandConfig } from 'lib/config/brands';

const USERS = [
  { id: 'u1', name: 'Marc Durand', email: 'marc@fcgardanne.fr', role: 'Président', club: 'FC Gardanne', sport: 'foot', status: 'active', lastLogin: '2025-04-14' },
  { id: 'u2', name: 'Sophie Martin', email: 'sophie@fcgardanne.fr', role: 'Coach', club: 'FC Gardanne', sport: 'foot', status: 'active', lastLogin: '2025-04-13' },
  { id: 'u3', name: 'Pierre Lefèvre', email: 'pierre@asmartigues.fr', role: 'Président', club: 'AS Martigues', sport: 'foot', status: 'active', lastLogin: '2025-04-12' },
  { id: 'u4', name: 'Jean-Paul Rousseau', email: 'jp@rcbeziers.fr', role: 'Président', club: 'RC Béziers', sport: 'rugby', status: 'active', lastLogin: '2025-04-14' },
  { id: 'u5', name: 'Nathalie Petit', email: 'nathalie@rcbeziers.fr', role: 'Coach', club: 'RC Béziers', sport: 'rugby', status: 'active', lastLogin: '2025-04-11' },
  { id: 'u6', name: 'Julien Bonnet', email: 'julien@uspau.fr', role: 'Joueur', club: 'US Pau', sport: 'rugby', status: 'blocked', lastLogin: '2025-03-15' },
  { id: 'u7', name: 'Claire Moreau', email: 'claire@mhb.fr', role: 'Manager', club: 'MHB Amateur', sport: 'handball', status: 'active', lastLogin: '2025-04-14' },
  { id: 'u8', name: 'Thomas Girard', email: 'thomas@hbcstrasbourg.fr', role: 'Coach', club: 'HBC Strasbourg', sport: 'handball', status: 'active', lastLogin: '2025-04-10' },
];

const BRAND_COLORS: Record<string, string> = {
  foot: getBrandConfig('foot').theme.primary[500],
  rugby: getBrandConfig('rugby').theme.primary[500],
  handball: getBrandConfig('handball').theme.primary[500],
};
const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-400/15 text-emerald-400',
  blocked: 'bg-red-400/15 text-red-400',
  pending: 'bg-amber-400/15 text-amber-400',
};

export default function AdminUsersPage() {
  const [filter, setFilter] = useState('');
  const [sportFilter, setSportFilter] = useState('');

  const filtered = useMemo(() => {
    return USERS.filter((u) => {
      if (sportFilter && u.sport !== sportFilter) return false;
      if (filter && !u.name.toLowerCase().includes(filter.toLowerCase()) && !u.email.toLowerCase().includes(filter.toLowerCase())) return false;
      return true;
    });
  }, [filter, sportFilter]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>

      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="Rechercher..." value={filter} onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg bg-[var(--admin-surface)] border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none" />
        <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)}
          className="rounded-lg bg-[var(--admin-surface)] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none">
          <option value="">Tous sports</option>
          <option value="foot">Football</option>
          <option value="rugby">Rugby</option>
          <option value="handball">Handball</option>
        </select>
      </div>

      <div className="rounded-xl border border-white/6 bg-[var(--admin-surface)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/6 text-white/40 text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-medium">Utilisateur</th>
              <th className="text-left px-4 py-3 font-medium">Rôle</th>
              <th className="text-left px-4 py-3 font-medium">Club</th>
              <th className="text-left px-4 py-3 font-medium">Sport</th>
              <th className="text-left px-4 py-3 font-medium">Statut</th>
              <th className="text-left px-4 py-3 font-medium">Dernière connexion</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {u.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white font-medium">{u.name}</div>
                      <div className="text-xs text-white/40">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-white/60">{u.role}</td>
                <td className="px-4 py-3 text-white/60">{u.club}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: `${BRAND_COLORS[u.sport]}30`, color: BRAND_COLORS[u.sport] }}>
                    {u.sport}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[u.status]}`}>
                    {u.status === 'active' ? 'Actif' : 'Bloqué'}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/40 text-xs">{u.lastLogin}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/users/${u.id}`} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors inline-flex">
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
