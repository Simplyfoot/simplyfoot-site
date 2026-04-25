import { z } from 'zod';

/**
 * Schéma Zod du formulaire de contact `/foot/contact`.
 *
 * Les `values` des selects (`role`, `clubSize`, `subject`) sont des codes
 * stables (français/internes) — les labels sont localisés côté UI via
 * `next-intl`. Garde le contrat sérialisable et indépendant de la locale,
 * pour permettre une intégration backend simple plus tard
 * (POST /api/contact, file webhook, etc.).
 */
export const ROLE_VALUES = ['president', 'coach', 'benevole', 'joueur', 'parent', 'autre'] as const;
export const CLUB_SIZE_VALUES = [
    '1-50',
    '51-100',
    '101-250',
    '251-500',
    '500+',
    'pas-de-club',
] as const;
export const SUBJECT_VALUES = [
    'pilote',
    'demo',
    'offres',
    'bug',
    'suggestion',
    'partenariat',
    'presse',
    'autre',
] as const;

export type ContactRole = (typeof ROLE_VALUES)[number];
export type ContactClubSize = (typeof CLUB_SIZE_VALUES)[number];
export type ContactSubject = (typeof SUBJECT_VALUES)[number];

/**
 * Construit le schéma avec des messages d'erreur localisés. Les messages
 * sont passés depuis le composant qui consomme `next-intl` — le schéma
 * lui-même reste sans dépendance i18n directe (pour pouvoir être réutilisé
 * côté serveur quand l'API sera branchée).
 */
export interface ContactSchemaMessages {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageTooShort: string;
    consentRequired: string;
}

export function buildContactSchema(messages: ContactSchemaMessages) {
    return z.object({
        name: z.string().trim().min(2, messages.nameRequired),
        email: z.string().trim().min(1, messages.emailRequired).email(messages.emailInvalid),
        phone: z.string().trim().max(30).optional().or(z.literal('')),
        clubName: z.string().trim().max(120).optional().or(z.literal('')),
        role: z.enum(ROLE_VALUES),
        clubSize: z.enum(CLUB_SIZE_VALUES),
        subject: z.enum(SUBJECT_VALUES),
        message: z.string().trim().min(20, messages.messageTooShort).max(4000),
        consent: z.literal(true, { message: messages.consentRequired }),
        // Honeypot — anti-bot naïf, doit rester vide.
        website: z.string().max(0).optional(),
    });
}

export type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;
