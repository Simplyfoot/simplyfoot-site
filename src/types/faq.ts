/**
 * Inline tokens composable inside a paragraph or a list item.
 * Adding a new variant forces the renderer to handle it (exhaustive switch).
 */
export type FaqInlineToken =
    | { type: 'text'; value: string }
    | { type: 'strong'; value: string }
    | { type: 'email'; address: string; label?: string }
    | { type: 'phone'; number: string; label?: string };

/** Block-level pieces of a single FAQ answer. */
export type FaqBlock =
    | { type: 'paragraph'; tokens: readonly FaqInlineToken[] }
    | { type: 'list'; items: readonly (readonly FaqInlineToken[])[] };

export interface FaqItem {
    /** Stable slug, unique within the whole FAQ (used for anchors). */
    id: string;
    question: string;
    answer: readonly FaqBlock[];
}

/** Lucide icon names used in the category nav — keep the set narrow. */
export type FaqCategoryIcon =
    | 'UserPlus'
    | 'Users'
    | 'ClipboardList'
    | 'CalendarPlus'
    | 'User'
    | 'Calendar'
    | 'Bell'
    | 'Rocket'
    | 'Mail';

export interface FaqCategory {
    /** Anchor slug (also used in `#` URL fragment if needed). */
    id: string;
    icon: FaqCategoryIcon;
    title: string;
    items: readonly FaqItem[];
}
