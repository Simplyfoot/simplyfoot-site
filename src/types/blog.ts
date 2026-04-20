import type { BrandSlug } from '@/lib/brand';

/** The 6 editorial categories that organise every article. */
export type BlogCategory =
    | 'resultats'
    | 'actualites'
    | 'mises-a-jour'
    | 'guides'
    | 'temoignages'
    | 'reglementation';

/** 13 French regions + Corsica (slugs, stable for filters and URL params). */
export type FrenchRegion =
    | 'idf'
    | 'hdf'
    | 'ge'
    | 'bfc'
    | 'pdl'
    | 'bre'
    | 'cvl'
    | 'nor'
    | 'ara'
    | 'paca'
    | 'occ'
    | 'naq'
    | 'cor';

/**
 * A French département, bound to a region. Code is the official INSEE 2-char code.
 */
export interface Department {
    code: string;
    name: string;
    region: FrenchRegion;
}

/** A local amateur football club referenced by articles. */
export interface Club {
    id: string;
    name: string;
    department: string;
    region: FrenchRegion;
}

/* ═══════════════════════════════════════════════════════════════
 * Article content blocks — typed discriminated union.
 *
 * Rendered by <ArticleBlockRenderer> via exhaustive switch. Adding
 * a new block type here forces the renderer to handle it (tsc error
 * if missing case), which is the whole point.
 * ═══════════════════════════════════════════════════════════════ */

export interface HeadingBlock {
    type: 'heading';
    level: 2 | 3;
    text: string;
}

export interface ParagraphBlock {
    type: 'paragraph';
    text: string;
}

export interface QuoteBlock {
    type: 'quote';
    text: string;
    author?: string;
}

export interface ListBlock {
    type: 'list';
    ordered?: boolean;
    items: readonly string[];
}

export interface ImageBlock {
    type: 'image';
    src: string;
    alt: string;
    caption?: string;
}

export interface DividerBlock {
    type: 'divider';
}

export type ArticleBlock =
    | HeadingBlock
    | ParagraphBlock
    | QuoteBlock
    | ListBlock
    | ImageBlock
    | DividerBlock;

/* ═══════════════════════════════════════════════════════════════
 * Match result data (category: 'resultats')
 * ═══════════════════════════════════════════════════════════════ */

export type MatchEventType = 'goal' | 'card-yellow' | 'card-red' | 'substitution';

export interface MatchEvent {
    minute: number;
    type: MatchEventType;
    team: 'home' | 'away';
    player: string;
}

export interface MatchData {
    competition: string;
    /** ISO date (YYYY-MM-DD). */
    date: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    stadium: string;
    events: readonly MatchEvent[];
}

/* ═══════════════════════════════════════════════════════════════
 * Product changelog data (category: 'mises-a-jour')
 * ═══════════════════════════════════════════════════════════════ */

export type ChangelogEntryType = 'feature' | 'improvement' | 'fix' | 'breaking';

export interface ChangelogEntry {
    type: ChangelogEntryType;
    text: string;
}

export interface ChangelogData {
    version: string;
    /** ISO date (YYYY-MM-DD). */
    releaseDate: string;
    entries: readonly ChangelogEntry[];
}

/* ═══════════════════════════════════════════════════════════════
 * Article — the universal media unit.
 * ═══════════════════════════════════════════════════════════════ */

export interface BlogArticle {
    slug: string;
    brand: BrandSlug;
    category: BlogCategory;
    title: string;
    excerpt: string;
    content: readonly ArticleBlock[];
    author: string;
    /** ISO date (YYYY-MM-DD). Used for sort and display. */
    publishedAt: string;
    updatedAt?: string;
    readingMinutes: number;
    imageUrl?: string;
    imageAlt?: string;
    tags: readonly string[];
    clubIds?: readonly string[];
    region?: FrenchRegion;
    department?: string;
    /**
     * When true, the article appears in the hero. `pinnedOrder` controls
     * position (lowest first). Editorial control — no automatic pinning.
     */
    isPinned?: boolean;
    pinnedOrder?: number;
    /** View count used for the 'popular' sort. */
    views?: number;
    /** Only present on category='resultats'. */
    matchData?: MatchData;
    /** Only present on category='mises-a-jour'. */
    changelog?: ChangelogData;
}

/* ═══════════════════════════════════════════════════════════════
 * Service-layer types
 * ═══════════════════════════════════════════════════════════════ */

export type BlogSort = 'recent' | 'popular';

export interface BlogFilters {
    brand: BrandSlug;
    category?: BlogCategory;
    region?: FrenchRegion;
    department?: string;
    clubId?: string;
    query?: string;
    sort?: BlogSort;
    page?: number;
    perPage?: number;
}

export interface PaginatedResult<T> {
    items: readonly T[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}
