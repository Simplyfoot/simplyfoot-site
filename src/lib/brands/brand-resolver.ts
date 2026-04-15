/**
 * Extract brand slug from a pathname.
 * Matches /foot, /rugby, /handball at the start of the path.
 */
export function extractBrandFromPathname(pathname: string): string | null {
  const match = pathname.match(/^\/(foot|rugby|handball)/);
  return match ? match[1] : null;
}
