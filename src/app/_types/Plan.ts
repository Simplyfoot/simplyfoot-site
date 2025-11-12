export enum PlanEnum {
    LITTLE = "LITTLE",
    LOCAL = "LOCAL",
    REGIONAL = "REGIONAL",
    LARGE = "LARGE",
    MAX = "MAX",
    DISTRICT = "DISTRICT",
}

export type Plan = {
    key: PlanEnum;
    nom: string;
    couleur: string;
    cible: string;
    monthly: number | null;
    sousTitre: string;
    points: string[];
    bonus: string;
    badge?: string;
    ctaLabel: string;
};