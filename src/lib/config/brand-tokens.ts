import { getAllBrands, DEFAULT_BRAND } from './brands';
import type { BrandTheme, ColorScale } from './brands';

/**
 * Genere les CSS custom properties pour une palette complete (50-950).
 * Produit : --brand-primary-50, --brand-primary-100, ..., --brand-primary-950
 */
const SHADES: (keyof ColorScale)[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function scaleToCSS(prefix: string, scale: ColorScale): string {
  return SHADES.map((shade) => `  ${prefix}-${shade}: ${scale[shade]};`).join('\n');
}

/**
 * Mapping des tokens semantiques vers des noms de CSS custom properties.
 */
const SEMANTIC_TO_CSS: Record<keyof BrandTheme['semantic'], string> = {
  bg: '--brand-bg',
  bgAlt: '--brand-bg-alt',
  surface: '--brand-surface',
  cta: '--brand-cta',
  ctaHover: '--brand-cta-hover',
  ctaText: '--brand-cta-text',
  border: '--brand-border',
  ring: '--brand-ring',
  text: '--brand-text',
  textMuted: '--brand-text-muted',
};

function semanticToCSS(semantic: BrandTheme['semantic']): string {
  return (Object.keys(SEMANTIC_TO_CSS) as (keyof BrandTheme['semantic'])[])
    .map((key) => `  ${SEMANTIC_TO_CSS[key]}: ${semantic[key]};`)
    .join('\n');
}

function themeToCSS(theme: BrandTheme): string {
  return [
    '  /* Primary scale (50-950) */',
    scaleToCSS('--brand-primary', theme.primary),
    '',
    '  /* Accent scale (50-950) */',
    scaleToCSS('--brand-accent', theme.accent),
    '',
    '  /* Semantic tokens */',
    semanticToCSS(theme.semantic),
  ].join('\n');
}

/**
 * Genere le bloc CSS complet des variables de marque.
 * Injecte dans le <head> du root layout via une balise <style>.
 *
 * Produit :
 * - :root avec la marque par defaut (foot)
 * - [data-brand="foot|rugby|handball"] pour chaque marque
 *
 * Cela donne acces a :
 * - bg-[var(--brand-primary-500)] pour une nuance specifique
 * - bg-[var(--brand-cta)] pour le token semantique
 */
export function generateBrandCSS(): string {
  const brands = getAllBrands();
  const defaultBrand = brands.find((b) => b.id === DEFAULT_BRAND)!;

  const lines: string[] = [];

  lines.push(`:root {`);
  lines.push(themeToCSS(defaultBrand.theme));
  lines.push(`}`);
  lines.push('');

  for (const brand of brands) {
    lines.push(`[data-brand="${brand.id}"] {`);
    lines.push(themeToCSS(brand.theme));
    lines.push(`}`);
    lines.push('');
  }

  return lines.join('\n');
}
