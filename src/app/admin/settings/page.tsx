export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>

      <div className="rounded-xl border border-white/6 bg-[var(--admin-surface)] p-5 space-y-4">
        <h3 className="text-sm font-bold text-white/70 uppercase tracking-wide">Compte administrateur</h3>
        <div>
          <label htmlFor="settings-name" className="text-xs font-medium text-white/50 uppercase tracking-wide mb-1.5 block">Nom</label>
          <input id="settings-name" type="text" className="admin-input" defaultValue="Admin Simply" />
        </div>
        <div>
          <label htmlFor="settings-email" className="text-xs font-medium text-white/50 uppercase tracking-wide mb-1.5 block">Email</label>
          <input id="settings-email" type="email" className="admin-input" defaultValue="admin@simply.fr" disabled />
        </div>
        <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[var(--admin-bg)] hover:bg-white/90 transition-colors cursor-pointer">
          Enregistrer
        </button>
      </div>

      <div className="rounded-xl border border-white/6 bg-[var(--admin-surface)] p-5 space-y-4">
        <h3 className="text-sm font-bold text-white/70 uppercase tracking-wide">Plateforme</h3>
        <p className="text-sm text-white/40">
          Version : Simply v1.0.0<br />
          Next.js 15.3.4 • React 19 • TypeScript<br />
          Dernière mise à jour : 14 avril 2025
        </p>
      </div>
    </div>
  );
}
