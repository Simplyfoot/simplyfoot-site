import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Liste d'index `[0, 1, …, n-1]`. Pratique pour itérer sur un nombre fixe
 * d'items dont le contenu vient d'une source hors-tableau (ex. clés i18n
 * numériques `items.0.title`, `items.1.title` …).
 */
export function range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
}
