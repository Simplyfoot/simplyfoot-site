import type { BrandSlug } from '~types/brand.types';

/**
 * Noms d'icônes lucide-react utilisées dans la sidebar FAQ. Figer l'union
 * évite de typer en `string` et permet un mapping exhaustif côté rendu.
 */
export type FaqIcon =
    | 'UserPlus'
    | 'Users'
    | 'ClipboardList'
    | 'CalendarPlus'
    | 'User'
    | 'Calendar'
    | 'Bell'
    | 'Rocket'
    | 'Mail';

/**
 * Bloc atomique d'une réponse. `paragraph` = un seul texte enrichi.
 * `list` = N puces (chaque puce = une clé i18n séparée).
 */
export interface FaqBlock {
    kind: 'paragraph' | 'list';
    /** Nombre d'éléments pour `list` ; ignoré pour `paragraph`. */
    count?: number;
}

export interface FaqItem {
    id: string;
    blocks: readonly FaqBlock[];
    /** Marques où cet item est visible. Omis = toutes les marques. */
    brands?: readonly BrandSlug[];
}

export interface FaqCategory {
    id: string;
    icon: FaqIcon;
    items: readonly FaqItem[];
    /** Marques où cette catégorie est visible. Omis = toutes les marques. */
    brands?: readonly BrandSlug[];
}
