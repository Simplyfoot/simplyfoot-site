import type { Department, FrenchRegion } from '@/types/blog';

/** Canonical labels for the 13 French regions. */
export const REGION_LABELS: Record<FrenchRegion, string> = {
    idf: 'Île-de-France',
    hdf: 'Hauts-de-France',
    ge: 'Grand Est',
    bfc: 'Bourgogne-Franche-Comté',
    pdl: 'Pays de la Loire',
    bre: 'Bretagne',
    cvl: 'Centre-Val de Loire',
    nor: 'Normandie',
    ara: 'Auvergne-Rhône-Alpes',
    paca: "Provence-Alpes-Côte d'Azur",
    occ: 'Occitanie',
    naq: 'Nouvelle-Aquitaine',
    cor: 'Corse',
};

/**
 * Only the départements relevant to our mock clubs are listed below.
 * A full INSEE-wide list is unnecessary mock data — swap to an API in production.
 */
export const DEPARTMENTS: readonly Department[] = [
    // PACA
    { code: '13', name: 'Bouches-du-Rhône', region: 'paca' },
    { code: '83', name: 'Var', region: 'paca' },
    { code: '06', name: 'Alpes-Maritimes', region: 'paca' },
    { code: '84', name: 'Vaucluse', region: 'paca' },
    // Occitanie
    { code: '31', name: 'Haute-Garonne', region: 'occ' },
    { code: '34', name: 'Hérault', region: 'occ' },
    { code: '66', name: 'Pyrénées-Orientales', region: 'occ' },
    { code: '30', name: 'Gard', region: 'occ' },
    // Bretagne
    { code: '35', name: 'Ille-et-Vilaine', region: 'bre' },
    { code: '29', name: 'Finistère', region: 'bre' },
    { code: '56', name: 'Morbihan', region: 'bre' },
    { code: '22', name: "Côtes-d'Armor", region: 'bre' },
    // Île-de-France
    { code: '75', name: 'Paris', region: 'idf' },
    { code: '92', name: 'Hauts-de-Seine', region: 'idf' },
    { code: '93', name: 'Seine-Saint-Denis', region: 'idf' },
    { code: '94', name: 'Val-de-Marne', region: 'idf' },
    { code: '77', name: 'Seine-et-Marne', region: 'idf' },
    { code: '78', name: 'Yvelines', region: 'idf' },
    { code: '91', name: 'Essonne', region: 'idf' },
    { code: '95', name: "Val-d'Oise", region: 'idf' },
    // Nouvelle-Aquitaine
    { code: '33', name: 'Gironde', region: 'naq' },
    // Auvergne-Rhône-Alpes
    { code: '69', name: 'Rhône', region: 'ara' },
];

export function getDepartmentsForRegion(region: FrenchRegion): readonly Department[] {
    return DEPARTMENTS.filter((d) => d.region === region);
}
