/**
 * Source de vérité unique pour la STRUCTURE du formulaire de contact.
 *
 * Ce fichier décrit uniquement :
 * - quels sujets existent
 * - quels champs apparaissent pour chaque sujet, leur type, leurs contraintes
 *   et leurs clés i18n (label/placeholder/help/options).
 *
 * Tout ce qui concerne le rendu de l'email envoyé à l'équipe (libellés FR,
 * objets d'email, libellés des options de select pour le mail) vit dans
 * `src/helpers/contact.helpers.ts`.
 *
 * Ajouter un sujet = ajouter une entrée dans `CONTACT_TOPICS_CONFIG`
 * + les clés i18n correspondantes dans `Contact.form.topics` et `Contact.form.fields`
 * + (si pertinent) un libellé d'email dans `contact.helpers.ts`.
 */

export const CONTACT_TOPICS = [
    'request-demo',
    'join-pilot',
    'pricing-question',
    'report-bug',
    'suggestion',
    'partnership',
    'press',
    'other',
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const CLUB_SIZES = ['1-50', '51-100', '101-250', '251-500', '500+', 'no-club'] as const;

export type ClubSize = (typeof CLUB_SIZES)[number];

export type ContactFieldKind =
    | { type: 'text'; min?: number; max?: number }
    | { type: 'email' }
    | { type: 'tel'; max?: number }
    | { type: 'url' }
    | { type: 'textarea'; min?: number; max?: number; rows?: number }
    | { type: 'select'; options: ReadonlyArray<string> };

export interface ContactField {
    /** Clé du champ dans le payload (ex. 'club'). */
    name: string;
    /** Sous-clé sous `Contact.form.fields.<i18nKey>` (label, placeholder, help, options). */
    i18nKey: string;
    required: boolean;
    autoComplete?: string;
    /** Indication d'agencement dans la grille md:grid-cols-2 (défaut: 1). */
    colSpan?: 1 | 2;
    kind: ContactFieldKind;
}

/**
 * Champs présents pour TOUS les sujets, rendus AVANT les champs spécifiques.
 * L'ordre détermine l'ordre de rendu dans le formulaire.
 */
export const CONTACT_COMMON_FIELDS_BEFORE: ReadonlyArray<ContactField> = [
    {
        name: 'firstName',
        i18nKey: 'firstName',
        required: true,
        autoComplete: 'given-name',
        kind: { type: 'text', min: 2, max: 60 },
    },
    {
        name: 'lastName',
        i18nKey: 'lastName',
        required: true,
        autoComplete: 'family-name',
        kind: { type: 'text', min: 2, max: 60 },
    },
    {
        name: 'email',
        i18nKey: 'email',
        required: true,
        autoComplete: 'email',
        kind: { type: 'email' },
    },
    {
        name: 'phone',
        i18nKey: 'phone',
        required: false,
        autoComplete: 'tel',
        kind: { type: 'tel', max: 30 },
    },
];

/**
 * Champs communs rendus APRÈS les champs spécifiques au sujet (le `message`
 * vient toujours en dernier pour laisser à l'utilisateur le contexte adéquat).
 */
export const CONTACT_COMMON_FIELDS_AFTER: ReadonlyArray<ContactField> = [
    {
        name: 'message',
        i18nKey: 'message',
        required: true,
        colSpan: 2,
        kind: { type: 'textarea', min: 20, max: 5000, rows: 6 },
    },
];

const CLUB_FIELD_REQUIRED: ContactField = {
    name: 'club',
    i18nKey: 'club',
    required: true,
    kind: { type: 'text', min: 2, max: 100 },
};

const CLUB_FIELD_OPTIONAL: ContactField = {
    name: 'club',
    i18nKey: 'club',
    required: false,
    kind: { type: 'text', max: 100 },
};

const CLUB_SIZE_FIELD: ContactField = {
    name: 'clubSize',
    i18nKey: 'clubSize',
    required: true,
    kind: { type: 'select', options: CLUB_SIZES },
};

const ROLE_FIELD: ContactField = {
    name: 'role',
    i18nKey: 'role',
    required: true,
    colSpan: 2,
    kind: { type: 'text', min: 2, max: 80 },
};

export interface ContactTopicConfig {
    id: ContactTopic;
    /** Champs additionnels propres au sujet (s'ajoutent aux champs communs). */
    fields: ReadonlyArray<ContactField>;
    /**
     * Noms de champs communs (BEFORE ou AFTER) à NE PAS rendre pour ce sujet.
     * Utile quand un champ commun fait doublon avec un champ spécifique
     * (ex. `message` redondant avec `bugSteps` pour un signalement de bug).
     */
    excludeCommonFields?: ReadonlyArray<string>;
}

export const CONTACT_TOPICS_CONFIG: ReadonlyArray<ContactTopicConfig> = [
    {
        id: 'join-pilot',
        fields: [CLUB_FIELD_REQUIRED, CLUB_SIZE_FIELD, ROLE_FIELD],
    },
    {
        id: 'request-demo',
        fields: [
            CLUB_FIELD_REQUIRED,
            CLUB_SIZE_FIELD,
            ROLE_FIELD,
            {
                name: 'preferredSlot',
                i18nKey: 'preferredSlot',
                required: false,
                colSpan: 2,
                kind: { type: 'text', max: 200 },
            },
        ],
    },
    {
        id: 'pricing-question',
        fields: [CLUB_FIELD_OPTIONAL, CLUB_SIZE_FIELD, ROLE_FIELD],
    },
    {
        id: 'report-bug',
        // `bugSteps` recouvre déjà le besoin du `message` commun.
        excludeCommonFields: ['message'],
        fields: [
            {
                name: 'bugPage',
                i18nKey: 'bugPage',
                required: true,
                colSpan: 2,
                kind: { type: 'text', min: 2, max: 200 },
            },
            {
                name: 'bugSteps',
                i18nKey: 'bugSteps',
                required: true,
                colSpan: 2,
                kind: { type: 'textarea', min: 20, max: 3000, rows: 6 },
            },
        ],
    },
    {
        id: 'suggestion',
        fields: [],
    },
    {
        id: 'partnership',
        fields: [
            {
                name: 'organization',
                i18nKey: 'organization',
                required: true,
                kind: { type: 'text', min: 2, max: 120 },
            },
            {
                name: 'organizationWebsite',
                i18nKey: 'organizationWebsite',
                required: false,
                kind: { type: 'url' },
            },
        ],
    },
    {
        id: 'press',
        fields: [
            {
                name: 'media',
                i18nKey: 'media',
                required: true,
                kind: { type: 'text', min: 2, max: 120 },
            },
            {
                // Réutilise la clé `role` côté payload mais une i18n distincte
                // (libellé différent dans le contexte presse).
                name: 'role',
                i18nKey: 'mediaRole',
                required: true,
                kind: { type: 'text', min: 2, max: 80 },
            },
        ],
    },
    {
        id: 'other',
        fields: [
            {
                name: 'customSubject',
                i18nKey: 'customSubject',
                required: true,
                colSpan: 2,
                kind: { type: 'text', min: 3, max: 120 },
            },
        ],
    },
];

const TOPIC_INDEX: Readonly<Record<ContactTopic, ContactTopicConfig>> = Object.fromEntries(
    CONTACT_TOPICS_CONFIG.map((config) => [config.id, config]),
) as Record<ContactTopic, ContactTopicConfig>;

export function getTopicConfig(topic: ContactTopic): ContactTopicConfig {
    return TOPIC_INDEX[topic];
}

/**
 * Liste de tous les noms de champs déclarés (communs + spécifiques par sujet).
 * Utilisé pour construire les valeurs par défaut du formulaire RHF.
 */
export function getAllFieldNames(): ReadonlyArray<string> {
    const names = new Set<string>();
    for (const field of CONTACT_COMMON_FIELDS_BEFORE) {
        names.add(field.name);
    }
    for (const field of CONTACT_COMMON_FIELDS_AFTER) {
        names.add(field.name);
    }
    for (const config of CONTACT_TOPICS_CONFIG) {
        for (const field of config.fields) {
            names.add(field.name);
        }
    }
    return Array.from(names);
}
