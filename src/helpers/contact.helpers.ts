import { z } from 'zod';

import {
    type ClubSize,
    CONTACT_COMMON_FIELDS_AFTER,
    CONTACT_COMMON_FIELDS_BEFORE,
    CONTACT_TOPICS_CONFIG,
    type ContactField,
    type ContactTopic,
    getTopicConfig,
} from '@/config/contact.config';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

// Re-exports pour conserver l'API publique attendue par les consommateurs.
export {
    CLUB_SIZES,
    type ClubSize,
    CONTACT_TOPICS,
    type ContactTopic,
} from '@/config/contact.config';

/**
 * Libellés FR utilisés UNIQUEMENT dans les emails internes envoyés à l'équipe
 * SIMPLY (jamais affichés sur le site public). Centralisés ici pour garder la
 * config purement structurelle.
 */
const TOPIC_EMAIL_LABELS: Readonly<Record<ContactTopic, string>> = {
    'join-pilot': 'Programme pilote',
    'request-demo': 'Démo',
    'pricing-question': 'Offres',
    'report-bug': 'Bug',
    suggestion: 'Suggestion',
    partnership: 'Partenariat',
    press: 'Presse',
    other: 'Autre',
};

/** Libellé court par champ (clé = `i18nKey` du champ dans la config). */
const FIELD_EMAIL_LABELS: Readonly<Record<string, string>> = {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    message: 'Message',
    club: 'Club',
    clubSize: 'Taille du club',
    role: 'Rôle',
    mediaRole: 'Fonction',
    preferredSlot: 'Créneau préféré',
    bugPage: 'Page concernée',
    bugSteps: 'Étapes pour reproduire',
    organization: 'Organisation',
    organizationWebsite: 'Site web',
    media: 'Média',
    customSubject: 'Sujet précisé',
};

/** Libellé d'une option de select dans l'email (par i18nKey du champ). */
const SELECT_OPTION_EMAIL_LABELS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
    clubSize: {
        '1-50': '1 – 50 licenciés',
        '51-100': '51 – 100 licenciés',
        '101-250': '101 – 250 licenciés',
        '251-500': '251 – 500 licenciés',
        '500+': '500+ licenciés',
        'no-club': 'Pas encore de club',
    } satisfies Record<ClubSize, string>,
};

/** Résumé court par sujet → injecté dans l'objet de l'email. */
const SUMMARY_BY_TOPIC: Readonly<Record<ContactTopic, (payload: ContactPayload) => string>> = {
    'join-pilot': (payload) => `Candidature pilote – ${readString(payload, 'club')}`,
    'request-demo': (payload) => `Demande de démo – ${readString(payload, 'club')}`,
    'pricing-question': (payload) => `Question offres – ${readString(payload, 'role')}`,
    'report-bug': (payload) => `Bug sur ${readString(payload, 'bugPage')}`,
    suggestion: () => 'Nouvelle suggestion',
    partnership: (payload) => `Proposition – ${readString(payload, 'organization')}`,
    press: (payload) => `Demande presse – ${readString(payload, 'media')}`,
    other: (payload) => readString(payload, 'customSubject'),
};

const baseShape = {
    brand: z.enum(['foot', 'rugby', 'handball'] as [BrandSlug, ...BrandSlug[]]),
    // Honeypot — doit rester vide pour les humains.
    website: z.string().max(0).optional(),
} as const;

function buildFieldZod(field: ContactField): z.ZodTypeAny {
    const { kind, required } = field;

    switch (kind.type) {
        case 'text':
        case 'textarea': {
            let schema = z.string().trim();
            if (kind.min !== undefined) {
                schema = schema.min(kind.min);
            }
            if (kind.max !== undefined) {
                schema = schema.max(kind.max);
            }
            if (required) {
                return schema;
            }
            return schema.optional().or(z.literal(''));
        }

        case 'email': {
            const schema = z.string().trim().email();
            if (required) {
                return schema;
            }
            return schema.optional().or(z.literal(''));
        }

        case 'tel': {
            let schema = z.string().trim();
            if (kind.max !== undefined) {
                schema = schema.max(kind.max);
            }
            if (required) {
                return schema;
            }
            return schema.optional().or(z.literal(''));
        }

        case 'url': {
            const schema = z.string().trim().url();
            if (required) {
                return schema;
            }
            return schema.optional().or(z.literal(''));
        }

        case 'select': {
            const [first, ...rest] = kind.options;
            if (first === undefined) {
                throw new Error(`Field ${field.name} declared as select with no options`);
            }
            return z.enum([first, ...rest] as [string, ...string[]]);
        }
    }
}

function buildTopicSchema(topic: ContactTopic): z.ZodObject<z.ZodRawShape> {
    const config = getTopicConfig(topic);
    const shape: Record<string, z.ZodTypeAny> = {
        ...baseShape,
        topic: z.literal(topic),
    };

    for (const field of [
        ...CONTACT_COMMON_FIELDS_BEFORE,
        ...config.fields,
        ...CONTACT_COMMON_FIELDS_AFTER,
    ]) {
        shape[field.name] = buildFieldZod(field);
    }

    return z.object(shape);
}

const variants = CONTACT_TOPICS_CONFIG.map((config) => buildTopicSchema(config.id));
const [firstVariant, ...otherVariants] = variants;
if (!firstVariant) {
    throw new Error('CONTACT_TOPICS_CONFIG must declare at least one topic');
}

/**
 * Forme typée garantie en sortie du parsing : permet aux consommateurs
 * (route API, helpers email) d'accéder aux champs sans cast.
 *
 * Les champs spécifiques aux sujets ne sont pas listés statiquement (ils
 * dépendent de la variante du discriminated union) ; ils restent accessibles
 * via l'index signature.
 */
export interface ContactPayload {
    brand: BrandSlug;
    topic: ContactTopic;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;
    website?: string;
    [key: string]: unknown;
}

// La validation runtime est garantie par `discriminatedUnion` ; la forme
// parsée est typée manuellement via `ContactPayload` (cast côté consumer).
export const contactSchema = z.discriminatedUnion('topic', [firstVariant, ...otherVariants] as [
    z.ZodObject<z.ZodRawShape>,
    ...z.ZodObject<z.ZodRawShape>[],
]);

export function formatSubject(payload: ContactPayload): string {
    const brandLabel = BRANDS[payload.brand].label;
    const topicLabel = TOPIC_EMAIL_LABELS[payload.topic];
    const detail = SUMMARY_BY_TOPIC[payload.topic](payload);

    return `[${brandLabel}][${topicLabel}] ${detail}`;
}

export function buildEmailHtml(payload: ContactPayload): string {
    const brandLabel = BRANDS[payload.brand].label;
    const topicLabel = TOPIC_EMAIL_LABELS[payload.topic];
    const fullName =
        `${readString(payload, 'firstName')} ${readString(payload, 'lastName')}`.trim();

    const rows: Array<[string, string]> = [
        ['Marque', brandLabel],
        ['Sujet', topicLabel],
        ['Nom', fullName],
        ['Email', readString(payload, 'email')],
    ];

    if (readString(payload, 'phone')) {
        rows.push(['Téléphone', readString(payload, 'phone')]);
    }

    const topicConfig = getTopicConfig(payload.topic);
    for (const field of topicConfig.fields) {
        const value = readString(payload, field.name);
        if (!value && !field.required) {
            continue;
        }
        rows.push([emailLabelFor(field), formatFieldValue(field, value)]);
    }

    const tableRows = rows
        .map(
            ([label, value]) =>
                `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;vertical-align:top;width:160px">${escapeHtml(label)}</td><td style="padding:8px 12px;vertical-align:top">${escapeHtml(value)}</td></tr>`,
        )
        .join('');

    return `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>${escapeHtml(formatSubject(payload))}</title></head>
<body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#111;background:#fff;padding:24px">
    <h1 style="margin:0 0 16px;font-size:20px">Nouveau message – ${escapeHtml(brandLabel)}</h1>
    <table style="border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e5e5e5;font-size:14px">
        ${tableRows}
    </table>
    <h2 style="margin:24px 0 8px;font-size:16px">Message</h2>
    <div style="white-space:pre-wrap;border-left:3px solid #2563eb;padding:12px 16px;background:#f9fafb;font-size:14px;line-height:1.6">${escapeHtml(readString(payload, 'message'))}</div>
    <p style="margin-top:24px;font-size:12px;color:#666">Reply-To configuré sur l'adresse de l'utilisateur. Headers : X-Simply-Brand=${escapeHtml(payload.brand)}, X-Simply-Topic=${escapeHtml(payload.topic)}.</p>
</body>
</html>`;
}

function readString(payload: ContactPayload, key: string): string {
    const value = payload[key];
    return typeof value === 'string' ? value : '';
}

function emailLabelFor(field: ContactField): string {
    return FIELD_EMAIL_LABELS[field.i18nKey] ?? field.i18nKey;
}

function formatFieldValue(field: ContactField, value: string): string {
    if (field.kind.type !== 'select') {
        return value;
    }
    return SELECT_OPTION_EMAIL_LABELS[field.i18nKey]?.[value] ?? value;
}

function escapeHtml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
