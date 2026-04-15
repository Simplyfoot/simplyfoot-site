'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Star, Pencil, Trash2 } from 'lucide-react';

const ARTICLES = [
  { id: '1', title: 'Nouvelles règles 2025-2026', brand: 'foot', category: 'Réglementation', status: 'published', boosted: true, views: 1250, publishedAt: '2025-07-15' },
  { id: '2', title: 'FC Gardanne digitalise sa gestion', brand: 'foot', category: 'Témoignages', status: 'published', boosted: false, views: 890, publishedAt: '2025-06-20' },
  { id: '3', title: 'Calendrier fédéral disponible', brand: 'rugby', category: 'Actualités', status: 'published', boosted: true, views: 1580, publishedAt: '2025-07-01' },
  { id: '4', title: 'AS Béziers passe à SimplyRugby', brand: 'rugby', category: 'Témoignages', status: 'published', boosted: false, views: 720, publishedAt: '2025-06-12' },
  { id: '5', title: 'Créneaux gymnase : négocier', brand: 'handball', category: 'Conseils', status: 'draft', boosted: false, views: 0, publishedAt: '' },
  { id: '6', title: 'Stats avancées par joueur', brand: 'handball', category: 'Mises à jour', status: 'published', boosted: false, views: 430, publishedAt: '2025-05-15' },
];

const BRAND_COLORS: Record<string, string> = { foot: '#1B5E20', rugby: '#8B1A1A', handball: '#1A237E' };
const STATUS_STYLES: Record<string, string> = {
  published: 'bg-emerald-400/15 text-emerald-400',
  draft: 'bg-white/10 text-white/50',
  archived: 'bg-amber-400/15 text-amber-400',
};

export default function AdminBlogPage() {
  const [filter, setFilter] = useState('');
  const [sportFilter, setSportFilter] = useState('');

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      if (sportFilter && a.brand !== sportFilter) return false;
      if (filter && !a.title.toLowerCase().includes(filter.toLowerCase())) return false;
      return true;
    });
  }, [filter, sportFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion du blog</h1>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[var(--admin-bg)] hover:bg-white/90 transition-colors">
          <Plus className="h-4 w-4" /> Nouvel article
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="text" placeholder="Rechercher..."
          value={filter} onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg bg-[var(--admin-surface)] border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
        />
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
              <th className="text-left px-4 py-3 font-medium">Titre</th>
              <th className="text-left px-4 py-3 font-medium">Sport</th>
              <th className="text-left px-4 py-3 font-medium">Catégorie</th>
              <th className="text-left px-4 py-3 font-medium">Statut</th>
              <th className="text-center px-4 py-3 font-medium">Boost</th>
              <th className="text-right px-4 py-3 font-medium">Vues</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 text-white font-medium max-w-[250px] truncate">{a.title}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: `${BRAND_COLORS[a.brand]}30`, color: BRAND_COLORS[a.brand] }}>
                    {a.brand}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/60">{a.category}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[a.status]}`}>
                    {a.status === 'published' ? 'Publié' : a.status === 'draft' ? 'Brouillon' : 'Archivé'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <Star className={`h-4 w-4 mx-auto ${a.boosted ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                </td>
                <td className="px-4 py-3 text-right text-white/50 tabular-nums">{a.views.toLocaleString('fr-FR')}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/blog/${a.id}/edit`} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    <button className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
