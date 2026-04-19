import { notFound } from 'next/navigation';

/**
 * Catch-all inside the foot segment. Ensures any unmatched path under /foot/*
 * triggers the foot-scoped not-found.tsx (rendered inside the foot layout,
 * so Header + Footer + brand colors stay on screen).
 *
 * Without this, Next.js falls back to the parent [locale]/not-found.tsx,
 * which links back to the landing page instead of the brand home.
 */
export default function FootCatchAll() {
    notFound();
}
