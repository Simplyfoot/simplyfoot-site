import type { BrandSlug } from '~types/brand.types';
import type { FaqCategory } from '~types/faq.types';

/**
 * Topologie de la FAQ : uniquement les ids, l'ordre, les icônes et la forme
 * des réponses (combien de paragraphes / de puces). Les textes vivent
 * exclusivement dans `src/messages/{fr,en,es}.json` sous le namespace `FAQ`.
 *
 * Pour ajouter un item spécifique à une marque, renseigner le champ `brands`
 * sur l'item ou la catégorie. Omis = visible sur toutes les marques.
 */
export const FAQ_CATEGORIES: readonly FaqCategory[] = [
    {
        id: 'signup',
        icon: 'UserPlus',
        items: [
            { id: 'create-account', blocks: [{ kind: 'paragraph' }] },
            { id: 'google-login', blocks: [{ kind: 'paragraph' }] },
            {
                id: 'join-club',
                blocks: [{ kind: 'paragraph' }, { kind: 'list', count: 3 }],
            },
            { id: 'club-code', blocks: [{ kind: 'paragraph' }] },
            { id: 'team-code', blocks: [{ kind: 'paragraph' }] },
            { id: 'multi-role', blocks: [{ kind: 'paragraph' }] },
            { id: 'switch-profiles', blocks: [{ kind: 'paragraph' }] },
            { id: 'edit-profile', blocks: [{ kind: 'paragraph' }] },
            { id: 'change-password', blocks: [{ kind: 'paragraph' }] },
            { id: 'change-club', blocks: [{ kind: 'paragraph' }] },
            { id: 'deactivate-account', blocks: [{ kind: 'paragraph' }] },
        ],
    },
    {
        id: 'separated-parents',
        icon: 'Users',
        items: [
            { id: 'avoid-duplicates', blocks: [{ kind: 'paragraph' }] },
            { id: 'share-credentials', blocks: [{ kind: 'paragraph' }] },
            { id: 'generate-link-code', blocks: [{ kind: 'paragraph' }] },
        ],
    },
    {
        id: 'coach-teams',
        icon: 'ClipboardList',
        items: [
            { id: 'create-team', blocks: [{ kind: 'paragraph' }] },
            { id: 'share-team-code', blocks: [{ kind: 'paragraph' }] },
            { id: 'second-coach', blocks: [{ kind: 'paragraph' }] },
            { id: 'player-profiles', blocks: [{ kind: 'paragraph' }] },
        ],
    },
    {
        id: 'coach-events',
        icon: 'CalendarPlus',
        items: [
            { id: 'create-event', blocks: [{ kind: 'paragraph' }] },
            { id: 'club-wide-event', blocks: [{ kind: 'paragraph' }] },
            { id: 'event-vs-callup', blocks: [{ kind: 'paragraph' }] },
            { id: 'recurring-training', blocks: [{ kind: 'paragraph' }] },
            { id: 'edit-event', blocks: [{ kind: 'paragraph' }] },
            { id: 'cancel-event', blocks: [{ kind: 'paragraph' }] },
            { id: 'send-callups', blocks: [{ kind: 'paragraph' }] },
            {
                id: 'track-responses',
                blocks: [{ kind: 'paragraph' }, { kind: 'list', count: 3 }],
            },
            { id: 'answer-for-player', blocks: [{ kind: 'paragraph' }] },
            { id: 'car-icon', blocks: [{ kind: 'paragraph' }] },
        ],
    },
    {
        id: 'player',
        icon: 'User',
        items: [
            { id: 'upcoming-events', blocks: [{ kind: 'paragraph' }] },
            { id: 'respond-to-callup', blocks: [{ kind: 'paragraph' }] },
            { id: 'edit-response', blocks: [{ kind: 'paragraph' }] },
            { id: 'transport', blocks: [{ kind: 'paragraph' }] },
        ],
    },
    {
        id: 'calendar',
        icon: 'Calendar',
        items: [
            { id: 'calendar-how-it-works', blocks: [{ kind: 'paragraph' }] },
            { id: 'calendar-all-roles', blocks: [{ kind: 'paragraph' }] },
        ],
    },
    {
        id: 'notifications-messaging',
        icon: 'Bell',
        items: [
            { id: 'bell', blocks: [{ kind: 'paragraph' }] },
            { id: 'coach-notifications', blocks: [{ kind: 'paragraph' }] },
            { id: 'player-notifications', blocks: [{ kind: 'paragraph' }] },
            { id: 'messaging-location', blocks: [{ kind: 'paragraph' }] },
            { id: 'coach-conversations', blocks: [{ kind: 'list', count: 3 }] },
            { id: 'player-conversations', blocks: [{ kind: 'list', count: 3 }] },
            { id: 'messaging-identify', blocks: [{ kind: 'paragraph' }] },
            { id: 'messaging-photos', blocks: [{ kind: 'paragraph' }] },
        ],
    },
    {
        id: 'upcoming',
        icon: 'Rocket',
        items: [
            {
                id: 'upcoming-features',
                blocks: [{ kind: 'paragraph' }, { kind: 'list', count: 6 }],
            },
            { id: 'update-frequency', blocks: [{ kind: 'paragraph' }] },
        ],
    },
    {
        id: 'contact',
        icon: 'Mail',
        items: [
            {
                id: 'contact-team',
                blocks: [{ kind: 'paragraph' }, { kind: 'list', count: 2 }],
            },
        ],
    },
];

function isItemVisibleForBrand(
    brands: readonly BrandSlug[] | undefined,
    brand: BrandSlug,
): boolean {
    return brands === undefined || brands.includes(brand);
}

/**
 * Filtre la topologie pour une marque : retire les items marqués pour
 * d'autres marques, puis retire les catégories vides.
 */
export function getFaqForBrand(brand: BrandSlug): readonly FaqCategory[] {
    const result: FaqCategory[] = [];

    for (const category of FAQ_CATEGORIES) {
        if (!isItemVisibleForBrand(category.brands, brand)) {
            continue;
        }

        const items = category.items.filter((item) => isItemVisibleForBrand(item.brands, brand));
        if (items.length === 0) {
            continue;
        }

        result.push({ ...category, items });
    }

    return result;
}
