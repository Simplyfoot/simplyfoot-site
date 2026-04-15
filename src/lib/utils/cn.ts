import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne et deduplique les classes CSS Tailwind via clsx + tailwind-merge.
 * @param inputs - Classes CSS a combiner (chaines, tableaux, objets conditionnels)
 * @returns Chaine de classes CSS fusionnee et optimisee
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
