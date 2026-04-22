import type { AboutShape, AboutStat, FounderConfig, PilotClubConfig } from '~types/about.types';

/**
 * Topologie de la page "À propos" — uniquement ids, ordre, compteurs et
 * gradients visuels. Tous les textes (noms, rôles, citations, paragraphes)
 * sont dans `src/messages/{fr,en,es}.json` sous le namespace `About`.
 *
 * Si on veut ajouter un cofondateur ou un club pilote : éditer ce fichier
 * + ajouter les clés i18n correspondantes.
 */

/** 5 cofondateurs dans l'ordre d'affichage. Tous au même rang éditorial. */
export const FOUNDERS: readonly FounderConfig[] = [
    { id: 'romain', initials: 'RP', gradient: 'from-[#7A9E8A] via-[#567E66] to-[#3D5C4A]' },
    { id: 'jean', initials: 'JC', gradient: 'from-[#6E9080] to-[#3D5C4A]' },
    { id: 'jeremy', initials: 'JB', gradient: 'from-[#7A9E8A] to-[#567E66]' },
    { id: 'vanessa', initials: 'VR', gradient: 'from-[#A0C1AF] to-[#567E66]' },
    { id: 'damien', initials: 'DA', gradient: 'from-[#567E66] to-[#1A2E22]' },
];

/** 10 clubs pilotes. Logo optionnel — fallback typo si manquant. */
export const PILOT_CLUBS: readonly PilotClubConfig[] = [
    { id: 'gardanne' },
    { id: 'liffre' },
    { id: 'toulouse-rodeo' },
    { id: 'blagnac' },
    { id: 'rennes-b' },
    { id: 'martigues' },
    { id: 'berre' },
    { id: 'salon' },
    { id: 'grasse' },
    { id: 'nice' },
];

/** Structure globale de la page — utilisée par les composants pour itérer. */
export const ABOUT_SHAPE: AboutShape = {
    foundersOrder: FOUNDERS.map((f) => f.id),
    pilotClubs: PILOT_CLUBS,
    act1ParagraphCount: 5,
    manifestoLineCount: 5,
    quoteCount: 4,
    promiseCount: 3,
};

/**
 * 3 statistiques de l'acte 2. Les labels sont dans les messages
 * (`About.act2.stats.<key>`). Les chiffres sont éditoriaux, pas scrappés —
 * source: Fédération Française de Football, données publiques 2024.
 */
export const ABOUT_STATS: readonly AboutStat[] = [
    { labelKey: 'licensees', target: 2_000_000 },
    { labelKey: 'clubs', target: 15_000 },
    { labelKey: 'dedicatedTools', target: 0 },
];
