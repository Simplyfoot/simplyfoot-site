import type { DifferentiationPoint, FeaturesPhase, FeaturesStat } from '~types/features.types';

/**
 * Configuration du contenu de la page `/foot/features`. Source de vérité
 * unique : la structure de la timeline, les chiffres-clés et les points de
 * différenciation. Les libellés textuels vivent dans les messages i18n
 * (namespace `Features`), seules les clés d'id sont ici.
 */

/** Chiffres-clés affichés dans la section "Solution globale". */
export const FEATURES_STATS: readonly FeaturesStat[] = [
    { id: 'oneApp', target: 1 },
    { id: 'updateCadence', target: 15, suffix: ' j' },
    { id: 'rolesSupported', target: 4 },
    { id: 'builtWith', target: 100, suffix: ' %' },
];

/** Chiffres-clés "preuve sociale" (effet terrain). Séparés des stats promesse. */
export const PROOF_STATS: readonly FeaturesStat[] = [
    { id: 'clubsCount', target: 10 },
    { id: 'licensees', target: 820 },
    { id: 'events', target: 340 },
    { id: 'updates', target: 12 },
];

/** Problèmes universels du quotidien amateur — section d'empathie. */
export const PROBLEM_ITEMS = [
    { id: 'parents', icon: 'MessageSquareDashed' },
    { id: 'scattered', icon: 'LayoutDashboard' },
    { id: 'sheet', icon: 'FileWarning' },
    { id: 'address', icon: 'MapPinOff' },
    { id: 'stats', icon: 'Calculator' },
    { id: 'money', icon: 'Wallet' },
] as const;

/** Les 4 profils utilisateurs pour le sélecteur premium. */
export const PROFILE_IDS = ['president', 'coach', 'player', 'parent'] as const;
export type ProfileId = (typeof PROFILE_IDS)[number];

/** Mockups réels disponibles — Parent n'a pas de mockup dédié (illustration à la place). */
export const PROFILE_MOCKUPS: Record<ProfileId, string | null> = {
    president: '/images/Accueil President.png',
    coach: '/images/Accueil Coach.png',
    player: '/images/Accueil Joueur.png',
    parent: null,
};

/** Pose SIMO affichée dans chaque profil (donne une vie différente à chaque rôle). */
export const PROFILE_SIMO_POSE: Record<ProfileId, 'default' | 'running'> = {
    president: 'default',
    coach: 'running',
    player: 'running',
    parent: 'default',
};

export type FeatureBadge = 'live' | 'soon' | 'signature' | 'innovation' | 'priority';

export interface FeatureGridItem {
    id: string;
    icon: string;
    badge: FeatureBadge;
    highlight?: boolean;
}

/** 10 fonctionnalités signatures de la grille phares. */
export const FEATURE_GRID: readonly FeatureGridItem[] = [
    { id: 'management', icon: 'Building2', badge: 'live' },
    { id: 'events', icon: 'CalendarCheck', badge: 'live' },
    { id: 'dashboard', icon: 'LineChart', badge: 'soon' },
    { id: 'lineups', icon: 'LayoutGrid', badge: 'soon', highlight: true },
    { id: 'messaging', icon: 'MessageCircle', badge: 'live' },
    { id: 'documents', icon: 'FolderTree', badge: 'soon' },
    { id: 'passport', icon: 'IdCard', badge: 'soon' },
    { id: 'cards', icon: 'Layers', badge: 'innovation', highlight: true },
    { id: 'gamification', icon: 'Sparkles', badge: 'signature', highlight: true },
    { id: 'revenue', icon: 'Coins', badge: 'priority', highlight: true },
];

/** Témoignages de clubs pilotes — placeholders réalistes pour la section preuve sociale. */
export const TESTIMONIAL_IDS = ['louannec', 'perros', 'trebeurden'] as const;

/** Clés des questions FAQ landing — ordre = ordre d'affichage. */
export const LANDING_FAQ_KEYS = [
    'price',
    'seniors',
    'data',
    'migration',
    'offline',
    'idea',
    'revenue',
] as const;

/** Timeline — trois phases, chaque catégorie pointant vers son bloc i18n. */
export const FEATURES_TIMELINE: readonly FeaturesPhase[] = [
    {
        id: 'now',
        categories: [
            {
                id: 'interface',
                icon: 'Sparkles',
                roles: ['club', 'coach', 'player', 'parent'],
                bulletCount: 4,
            },
            {
                id: 'profiles',
                icon: 'UsersRound',
                roles: ['club', 'coach', 'player', 'parent'],
                bulletCount: 5,
            },
            {
                id: 'events',
                icon: 'CalendarCheck',
                roles: ['coach', 'club', 'parent'],
                bulletCount: 6,
            },
            {
                id: 'messaging',
                icon: 'MessageCircle',
                roles: ['club', 'coach', 'player', 'parent'],
                bulletCount: 4,
            },
            {
                id: 'personal',
                icon: 'IdCard',
                roles: ['club', 'coach', 'player', 'parent'],
                bulletCount: 1,
            },
            {
                id: 'calendar',
                icon: 'CalendarDays',
                roles: ['club', 'coach', 'player', 'parent'],
                bulletCount: 2,
            },
        ],
    },
    {
        id: 'soon',
        categories: [
            {
                id: 'president',
                icon: 'Crown',
                roles: ['club'],
                bulletCount: 1,
            },
            {
                id: 'coachEnhanced',
                icon: 'Megaphone',
                roles: ['coach'],
                bulletCount: 5,
            },
            {
                id: 'player',
                icon: 'User',
                roles: ['player', 'parent'],
                bulletCount: 2,
            },
            {
                id: 'coachDashboard',
                icon: 'LineChart',
                roles: ['coach'],
                bulletCount: 2,
            },
        ],
    },
    {
        id: 'later',
        categories: [
            {
                id: 'coachAdvanced',
                icon: 'ClipboardList',
                roles: ['coach'],
                bulletCount: 5,
            },
            {
                id: 'playerEnriched',
                icon: 'Star',
                roles: ['player', 'parent'],
                bulletCount: 5,
            },
            {
                id: 'cards',
                icon: 'Layers',
                roles: ['player', 'club', 'parent'],
                bulletCount: 5,
                highlight: 'signature',
            },
            {
                id: 'documents',
                icon: 'FolderTree',
                roles: ['club', 'parent'],
                bulletCount: 3,
            },
            {
                id: 'staff',
                icon: 'Building2',
                roles: ['club'],
                bulletCount: 2,
            },
            {
                id: 'monetization',
                icon: 'Coins',
                roles: ['club'],
                bulletCount: 4,
                highlight: 'strategic',
            },
        ],
    },
];

/** Les 5 piliers de différenciation. */
export const DIFFERENTIATION_POINTS: readonly DifferentiationPoint[] = [
    { id: 'football', icon: 'Target' },
    { id: 'experience', icon: 'Sparkles' },
    { id: 'human', icon: 'Heart' },
    { id: 'economic', icon: 'Coins' },
    { id: 'ambition', icon: 'Rocket' },
];

/**
 * Épiphanie fixe du cycle de MAJ. À partir de cette date, une MAJ est
 * publiée tous les `UPDATE_CYCLE_DAYS` jours. Si on dépasse la date, le
 * compteur se reverrouille automatiquement sur la prochaine échéance.
 */
export const UPDATE_CYCLE_EPOCH = new Date('2026-04-15T00:00:00Z');
export const UPDATE_CYCLE_DAYS = 15;

/** Nombre de jours entiers restants avant la prochaine MAJ (minimum 1). */
export function daysUntilNextUpdate(now: Date = new Date()): number {
    const oneDay = 1000 * 60 * 60 * 24;
    const elapsedDays = Math.floor((now.getTime() - UPDATE_CYCLE_EPOCH.getTime()) / oneDay);
    const remainder = ((elapsedDays % UPDATE_CYCLE_DAYS) + UPDATE_CYCLE_DAYS) % UPDATE_CYCLE_DAYS;
    const remaining = UPDATE_CYCLE_DAYS - remainder;
    return remaining === 0 ? UPDATE_CYCLE_DAYS : remaining;
}
