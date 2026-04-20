import type { Club } from '@/types/blog';

/**
 * ~40 amateur football clubs distributed across PACA, Occitanie, Bretagne, IDF.
 * Mock data — swap to DB in production. IDs are stable slugs usable as URL params.
 */
export const CLUBS: readonly Club[] = [
    // PACA — 13 Bouches-du-Rhône
    { id: 'fc-gardanne', name: 'FC Gardanne', department: '13', region: 'paca' },
    { id: 'us-martigues-amateur', name: 'US Martigues Amateur', department: '13', region: 'paca' },
    { id: 'sc-salon-de-provence', name: 'SC Salon-de-Provence', department: '13', region: 'paca' },
    { id: 'es-berre', name: 'ES Berre', department: '13', region: 'paca' },
    { id: 'marignane-gignac-cb', name: 'Marignane-Gignac CB', department: '13', region: 'paca' },
    { id: 'us-endoume', name: 'US Endoume', department: '13', region: 'paca' },
    // PACA — 83 Var
    { id: 'us-la-cadiere', name: 'US La Cadière', department: '83', region: 'paca' },
    { id: 'us-ollioules', name: 'US Ollioulaise', department: '83', region: 'paca' },
    { id: 'ussm', name: 'US Saint-Mandrier', department: '83', region: 'paca' },
    { id: 'js-beaussetanne', name: 'JS Beaussetanne', department: '83', region: 'paca' },
    { id: 'fc-carnoules', name: 'Carnoules FC', department: '83', region: 'paca' },
    // PACA — 06 Alpes-Maritimes
    { id: 'rc-grasse', name: 'RC Grasse', department: '06', region: 'paca' },
    { id: 'cavigal-nice', name: 'Cavigal Nice Sports', department: '06', region: 'paca' },

    // Occitanie — 31 Haute-Garonne
    { id: 'toulouse-rodeo', name: 'Toulouse Rodéo FC', department: '31', region: 'occ' },
    { id: 'blagnac-fc', name: 'Blagnac FC', department: '31', region: 'occ' },
    { id: 'colomiers-fc', name: 'Colomiers FC', department: '31', region: 'occ' },
    // Occitanie — 34 Hérault
    { id: 'fc-seteois', name: 'FC Sètois', department: '34', region: 'occ' },
    { id: 'as-beziers', name: 'AS Béziers', department: '34', region: 'occ' },
    { id: 'montpellier-arceaux', name: 'Montpellier Arceaux', department: '34', region: 'occ' },
    // Occitanie — 66 / 30
    { id: 'canet-roussillon', name: 'Canet Roussillon FC', department: '66', region: 'occ' },
    { id: 'nimes-olympique-b', name: 'Nîmes Olympique B', department: '30', region: 'occ' },

    // Bretagne — 35 Ille-et-Vilaine
    { id: 'stade-rennais-b', name: 'Stade Rennais B', department: '35', region: 'bre' },
    { id: 'us-liffre', name: 'US Liffré', department: '35', region: 'bre' },
    { id: 'as-vern', name: 'AS Vern', department: '35', region: 'bre' },
    // Bretagne — 29 Finistère
    { id: 'stade-brestois-b', name: 'Stade Brestois B', department: '29', region: 'bre' },
    { id: 'quimper-kerfeunteun', name: 'Quimper Kerfeunteun FC', department: '29', region: 'bre' },
    { id: 'us-concarneau-b', name: 'US Concarneau B', department: '29', region: 'bre' },
    // Bretagne — 56 / 22
    { id: 'vannes-oc', name: 'Vannes OC Amateur', department: '56', region: 'bre' },
    { id: 'ea-guingamp-b', name: 'EA Guingamp B', department: '22', region: 'bre' },
    { id: 'saint-brieuc-fc', name: 'Saint-Brieuc FC', department: '22', region: 'bre' },

    // IDF — 75 / 92 / 93 / 94
    { id: 'paris-fc-amateur', name: 'Paris FC Amateur', department: '75', region: 'idf' },
    { id: 'red-star-93-b', name: 'Red Star 93 B', department: '93', region: 'idf' },
    { id: 'us-torcy', name: 'US Torcy', department: '77', region: 'idf' },
    { id: 'linas-montlhery', name: 'Linas-Montlhéry USLM', department: '91', region: 'idf' },
    { id: 'fc-montfermeil', name: 'FC Montfermeil', department: '93', region: 'idf' },
    { id: 'creteil-lusitanos-b', name: 'Créteil Lusitanos B', department: '94', region: 'idf' },
    { id: 'poissy-as', name: 'AS Poissy', department: '78', region: 'idf' },
    { id: 'meaux-academie', name: 'Meaux Académie', department: '77', region: 'idf' },
    { id: 'racing-colombes-92', name: 'Racing Colombes 92', department: '92', region: 'idf' },
    { id: 'villepinte-fc', name: 'Villepinte FC', department: '93', region: 'idf' },
    { id: 'livry-gargan-fc', name: 'Livry-Gargan FC', department: '93', region: 'idf' },

    // Autres régions — couverture minimale
    { id: 'trelissac-fc', name: 'Trélissac FC', department: '33', region: 'naq' },
    { id: 'fc-limonest', name: 'FC Limonest', department: '69', region: 'ara' },
];

export function getClubById(id: string): Club | undefined {
    return CLUBS.find((c) => c.id === id);
}

export function searchClubs(query: string, limit = 8): readonly Club[] {
    const needle = query.trim().toLowerCase();
    if (!needle) {
        return CLUBS.slice(0, limit);
    }
    return CLUBS.filter((c) => c.name.toLowerCase().includes(needle)).slice(0, limit);
}
