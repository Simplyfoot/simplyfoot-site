'use client';

import { Building, Users, CreditCard, TrendingUp } from 'lucide-react';
import { StatCard } from 'components/admin/StatCard';

const STATS = {
  totalClubs: 487, totalLicencies: 24350, activeSubscriptions: 312, revenueMonth: 4280,
  newClubsThisMonth: 12, newLicenciesThisMonth: 840,
  clubsBySport: { foot: 245, rugby: 142, handball: 100 },
  licenciesBySport: { foot: 13200, rugby: 7850, handball: 3300 },
  topRegions: [
    { region: "Provence-Alpes-Côte d'Azur", clubs: 78, licencies: 4200 },
    { region: 'Occitanie', clubs: 65, licencies: 3500 },
    { region: 'Île-de-France', clubs: 58, licencies: 3100 },
    { region: 'Nouvelle-Aquitaine', clubs: 52, licencies: 2800 },
    { region: 'Auvergne-Rhône-Alpes', clubs: 48, licencies: 2600 },
  ],
  recentActivity: [
    { action: 'Nouveau club inscrit', target: 'FC Gardanne', time: 'il y a 2h' },
    { action: 'Article publié', target: 'Nouvelles règles 2025-2026', time: 'il y a 5h' },
    { action: 'Club bloqué', target: 'AS Exemple', time: 'il y a 8h' },
    { action: 'Nouveau club inscrit', target: 'RC Béziers', time: 'il y a 1 jour' },
    { action: 'Article boosté', target: 'Calendrier fédéral', time: 'il y a 1 jour' },
    { action: 'Utilisateur créé', target: 'Jean Dupont', time: 'il y a 2 jours' },
  ],
};

const SPORT_COLORS = { foot: '#1B5E20', rugby: '#8B1A1A', handball: '#1A237E' };

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Building} title="Clubs inscrits" value={STATS.totalClubs.toLocaleString('fr-FR')} trend={`+${STATS.newClubsThisMonth} ce mois`} trendUp />
        <StatCard icon={Users} title="Licenciés total" value={STATS.totalLicencies.toLocaleString('fr-FR')} trend={`+${STATS.newLicenciesThisMonth} ce mois`} trendUp />
        <StatCard icon={CreditCard} title="Abonnements actifs" value={STATS.activeSubscriptions.toLocaleString('fr-FR')} trend="+8 ce mois" trendUp />
        <StatCard icon={TrendingUp} title="Revenu mensuel" value={`${STATS.revenueMonth.toLocaleString('fr-FR')} €`} trend="+15% vs mois dernier" trendUp />
      </div>

      {/* Sport breakdown */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {(['foot', 'rugby', 'handball'] as const).map((sport) => (
          <div
            key={sport}
            className="rounded-xl border border-white/6 bg-[#111113] p-5"
            style={{ borderLeftColor: SPORT_COLORS[sport], borderLeftWidth: 3 }}
          >
            <h3 className="text-sm font-bold" style={{ color: SPORT_COLORS[sport] }}>
              Simply{sport.charAt(0).toUpperCase() + sport.slice(1)}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/40">Clubs</p>
                <p className="text-lg font-bold">{STATS.clubsBySport[sport]}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Licenciés</p>
                <p className="text-lg font-bold">{STATS.licenciesBySport[sport].toLocaleString('fr-FR')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns: Top regions + Recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top regions */}
        <div className="rounded-xl border border-white/6 bg-[#111113] p-5">
          <h3 className="text-sm font-bold text-white mb-4">Top régions</h3>
          <div className="space-y-3">
            {STATS.topRegions.map((r, i) => (
              <div key={r.region} className="flex items-center gap-3">
                <span className="text-xs text-white/30 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{r.region}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-white/30"
                      style={{ width: `${(r.clubs / STATS.topRegions[0].clubs) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-white/50 tabular-nums">{r.clubs} clubs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-white/6 bg-[#111113] p-5">
          <h3 className="text-sm font-bold text-white mb-4">Activité récente</h3>
          <div className="space-y-3">
            {STATS.recentActivity.map((log, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-white/20 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-white/70">{log.action}</span>{' '}
                  <span className="text-white font-medium">{log.target}</span>
                </div>
                <span className="text-xs text-white/30 shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
