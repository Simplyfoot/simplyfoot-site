import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminBlogEditPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog" className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">Modifier l&apos;article</h1>
      </div>
      <div className="rounded-xl border border-white/6 bg-[var(--admin-surface)] p-6 space-y-5">
        <div>
          <label className="text-xs font-medium text-white/50 uppercase tracking-wide mb-1.5 block">Titre</label>
          <input type="text" className="admin-input" defaultValue="Article exemple" />
        </div>
        <div>
          <label className="text-xs font-medium text-white/50 uppercase tracking-wide mb-1.5 block">Contenu</label>
          <textarea className="admin-input min-h-[250px]" defaultValue="Contenu de l'article..." />
        </div>
        <div className="flex gap-3 pt-4 border-t border-white/6">
          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[var(--admin-bg)] hover:bg-white/90 transition-colors cursor-pointer">
            Enregistrer
          </button>
          <Link href="/admin/blog" className="rounded-lg px-5 py-2.5 text-sm font-medium text-white/40 hover:text-white transition-colors">
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}
