'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { regions } from 'lib/blog/regions';

export default function AdminBlogNewPage() {
  const [brand, setBrand] = useState('foot');
  const [region, setRegion] = useState('');
  const selectedRegion = regions.find((r) => r.slug === region);

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog" className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">Nouvel article</h1>
      </div>

      <div className="space-y-5 rounded-xl border border-white/6 bg-[#111113] p-6">
        <Field label="Titre">
          <input type="text" className="admin-input" placeholder="Titre de l'article" />
        </Field>
        <Field label="Sport">
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="admin-input">
            <option value="foot">SimplyFoot</option>
            <option value="rugby">SimplyRugby</option>
            <option value="handball">SimplyHandball</option>
          </select>
        </Field>
        <Field label="Catégorie">
          <select className="admin-input">
            <option>Actualités</option>
            <option>Réglementation</option>
            <option>Conseils clubs</option>
            <option>Témoignages</option>
            <option>Mises à jour</option>
            <option>Événements</option>
          </select>
        </Field>
        <Field label="Extrait">
          <textarea className="admin-input min-h-[80px]" placeholder="Résumé de l'article (200 car. max)" maxLength={200} />
        </Field>
        <Field label="Contenu">
          <textarea className="admin-input min-h-[250px]" placeholder="Contenu de l'article..." />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Région">
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="admin-input">
              <option value="">Sélectionner</option>
              {regions.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}
            </select>
          </Field>
          <Field label="Département">
            <select className="admin-input" disabled={!region}>
              <option value="">Sélectionner</option>
              {selectedRegion?.departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/6">
          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#09090B] hover:bg-white/90 transition-colors cursor-pointer">
            Publier
          </button>
          <button className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-colors cursor-pointer">
            Enregistrer comme brouillon
          </button>
          <Link href="/admin/blog" className="rounded-lg px-5 py-2.5 text-sm font-medium text-white/40 hover:text-white transition-colors">
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-white/50 uppercase tracking-wide mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
