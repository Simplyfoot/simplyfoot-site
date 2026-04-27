import type { FounderConfig } from '~types/about.types';

/**
 * Topologie de la page "À propos" — uniquement ids, ordre, gradients et
 * chemins de photos. Tous les textes (noms, rôles, citations, paragraphes)
 * sont dans `src/messages/{fr,en,es}.json` sous le namespace `About`.
 *
 * Ajout d'un cofondateur : éditer ce tableau + ajouter les clés i18n
 * correspondantes (`About.team.<id>.{name,role,spirit}`).
 */
export const FOUNDERS: readonly FounderConfig[] = [
    {
        id: 'romain',
        initials: 'RP',
        gradient: 'from-[#7A9E8A] via-[#567E66] to-[#3D5C4A]',
        photo: '/images/Romain.png',
    },
    {
        id: 'jean',
        initials: 'JC',
        gradient: 'from-[#6E9080] to-[#3D5C4A]',
        photo: '/images/Jean.png',
    },
    { id: 'jeremy', initials: 'JB', gradient: 'from-[#7A9E8A] to-[#567E66]' },
    { id: 'vanessa', initials: 'VR', gradient: 'from-[#A0C1AF] to-[#567E66]' },
    { id: 'damien', initials: 'DA', gradient: 'from-[#567E66] to-[#1A2E22]' },
];
