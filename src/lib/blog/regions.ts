export interface Region {
  name: string;
  slug: string;
  departments: string[];
}

export const regions: Region[] = [
  { name: 'Auvergne-Rhône-Alpes', slug: 'auvergne-rhone-alpes', departments: ['Ain', 'Allier', 'Ardèche', 'Cantal', 'Drôme', 'Isère', 'Loire', 'Haute-Loire', 'Puy-de-Dôme', 'Rhône', 'Savoie', 'Haute-Savoie'] },
  { name: 'Bourgogne-Franche-Comté', slug: 'bourgogne-franche-comte', departments: ["Côte-d'Or", 'Doubs', 'Jura', 'Nièvre', 'Haute-Saône', 'Saône-et-Loire', 'Yonne', 'Territoire de Belfort'] },
  { name: 'Bretagne', slug: 'bretagne', departments: ["Côtes-d'Armor", 'Finistère', 'Ille-et-Vilaine', 'Morbihan'] },
  { name: 'Centre-Val de Loire', slug: 'centre-val-de-loire', departments: ['Cher', 'Eure-et-Loir', 'Indre', 'Indre-et-Loire', 'Loir-et-Cher', 'Loiret'] },
  { name: 'Grand Est', slug: 'grand-est', departments: ['Ardennes', 'Aube', 'Marne', 'Haute-Marne', 'Meurthe-et-Moselle', 'Meuse', 'Moselle', 'Bas-Rhin', 'Haut-Rhin', 'Vosges'] },
  { name: 'Hauts-de-France', slug: 'hauts-de-france', departments: ['Aisne', 'Nord', 'Oise', 'Pas-de-Calais', 'Somme'] },
  { name: 'Île-de-France', slug: 'ile-de-france', departments: ['Paris', 'Seine-et-Marne', 'Yvelines', 'Essonne', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne', "Val-d'Oise"] },
  { name: 'Normandie', slug: 'normandie', departments: ['Calvados', 'Eure', 'Manche', 'Orne', 'Seine-Maritime'] },
  { name: 'Nouvelle-Aquitaine', slug: 'nouvelle-aquitaine', departments: ['Charente', 'Charente-Maritime', 'Corrèze', 'Creuse', 'Dordogne', 'Gironde', 'Landes', 'Lot-et-Garonne', 'Pyrénées-Atlantiques', 'Deux-Sèvres', 'Vienne', 'Haute-Vienne'] },
  { name: 'Occitanie', slug: 'occitanie', departments: ['Ariège', 'Aude', 'Aveyron', 'Gard', 'Haute-Garonne', 'Gers', 'Hérault', 'Lot', 'Lozère', 'Hautes-Pyrénées', 'Pyrénées-Orientales', 'Tarn', 'Tarn-et-Garonne'] },
  { name: 'Pays de la Loire', slug: 'pays-de-la-loire', departments: ['Loire-Atlantique', 'Maine-et-Loire', 'Mayenne', 'Sarthe', 'Vendée'] },
  { name: "Provence-Alpes-Côte d'Azur", slug: 'provence-alpes-cote-dazur', departments: ['Alpes-de-Haute-Provence', 'Hautes-Alpes', 'Alpes-Maritimes', 'Bouches-du-Rhône', 'Var', 'Vaucluse'] },
  { name: 'Corse', slug: 'corse', departments: ['Corse-du-Sud', 'Haute-Corse'] },
];
