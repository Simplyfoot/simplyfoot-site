import { footConfig } from '../brands/foot.config';
import { rugbyConfig } from '../brands/rugby.config';
import { handballConfig } from '../brands/handball.config';

export type BrandId = 'foot' | 'rugby' | 'handball';

/**
 * Palette de couleur complete — 11 nuances de 50 a 950.
 * Suit la convention Tailwind (50 = le plus clair, 950 = le plus fonce).
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // valeur de reference
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Theme de marque — SOURCE UNIQUE DE VERITE pour toutes les couleurs.
 *
 * Chaque marque definit 2 palettes completes (primary, accent)
 * + des tokens semantiques qui pointent vers des nuances specifiques.
 *
 * Les CSS custom properties sont generees depuis ces valeurs.
 * Aucune couleur de marque ne doit etre definie ailleurs.
 */
export interface BrandTheme {
  /** Palette principale — couleur identitaire de la marque (vert foot, bleu rugby, orange handball) */
  primary: ColorScale;
  /** Palette accent — couleur d'action/CTA */
  accent: ColorScale;

  /**
   * Tokens semantiques — raccourcis vers les nuances les plus utilisees.
   * Permettent de changer le mapping sans toucher aux composants.
   */
  semantic: {
    /** Fond principal des pages marque */
    bg: string;
    /** Fond alternatif (footer, sections alternees) */
    bgAlt: string;
    /** Surface de carte sur fond sombre */
    surface: string;
    /** Couleur CTA principale (boutons, liens d'action) */
    cta: string;
    /** Hover du CTA */
    ctaHover: string;
    /** Texte sur CTA — doit garantir contraste >= 4.5:1 */
    ctaText: string;
    /** Bordures subtiles */
    border: string;
    /** Ring de focus */
    ring: string;
  };
}

export interface BrandMeta {
  title: string;
  titleTemplate: string;
  description: string;
  ogImage: string;
  twitterHandle: string;
}

export interface BrandSocials {
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}

export interface BrandAppLinks {
  googlePlay?: string;
  appStore?: string;
}

export interface BrandConfig {
  id: BrandId;
  name: string;
  suffix: string;
  sport: string;
  slug: string;
  domain: string;
  federation: string;
  theme: BrandTheme;
  meta: BrandMeta;
  socials: BrandSocials;
  appLinks: BrandAppLinks;
  i18nNamespace: string;
}

export const BRAND_IDS: readonly BrandId[] = ['foot', 'rugby', 'handball'] as const;

export const DEFAULT_BRAND: BrandId = 'foot';

const BRANDS: Record<BrandId, BrandConfig> = {
  foot: footConfig,
  rugby: rugbyConfig,
  handball: handballConfig,
};

/**
 * Recupere la configuration d'une marque par son identifiant.
 * Retourne la marque par defaut (foot) si l'identifiant est invalide.
 * @param id - Identifiant de la marque (foot, rugby, handball)
 * @returns La configuration complete de la marque
 */
export function getBrandConfig(id: string): BrandConfig {
  if (id in BRANDS) return BRANDS[id as BrandId];
  return BRANDS[DEFAULT_BRAND];
}

/**
 * Type guard qui verifie si une chaine correspond a un identifiant de marque valide.
 * @param id - Chaine a verifier
 * @returns `true` si l'identifiant est un BrandId valide
 */
export function isValidBrand(id: string): id is BrandId {
  return BRAND_IDS.includes(id as BrandId);
}

/**
 * Retourne la liste de toutes les configurations de marques disponibles.
 * @returns Tableau de BrandConfig pour chaque marque (foot, rugby, handball)
 */
export function getAllBrands(): BrandConfig[] {
  return BRAND_IDS.map((id) => BRANDS[id]);
}
