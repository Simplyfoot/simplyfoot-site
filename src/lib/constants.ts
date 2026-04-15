/**
 * Constantes globales du projet Simply.
 * Les constantes specifiques a un module restent dans leur fichier.
 */

// ── Simo (assistant IA) ──────────────────────────────────────
/** Nombre max de messages conserves dans le sessionStorage */
export const SIMO_MAX_HISTORY = 50;
/** Nombre de messages envoyes a l'API Anthropic (limite les tokens) */
export const SIMO_API_CONTEXT_SIZE = 10;
/** Delai avant l'apparition de la bulle de bienvenue (ms) */
export const SIMO_GREETING_DELAY_MS = 3000;

// ── UI / Scroll ──────────────────────────────────────────────
/** Seuil de scroll (px) pour activer le style sticky du header */
export const HEADER_SCROLL_THRESHOLD = 80;
/** Delai de debounce pour la recherche FAQ (ms) */
export const SEARCH_DEBOUNCE_MS = 200;
/** Seuil de largeur (px) pour detecter le mobile */
export const MOBILE_BREAKPOINT = 768;

// ── Blog ─────────────────────────────────────────────────────
/** Nombre d'articles par page dans le blog */
export const BLOG_ARTICLES_PER_PAGE = 12;
/** Nombre de temoignages affiches sur la landing */
export const TESTIMONIALS_DISPLAY_COUNT = 2;
