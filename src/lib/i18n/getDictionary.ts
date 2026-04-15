import 'server-only';

type Section = 'common' | 'foot' | 'rugby' | 'handball';

// i18n dictionaries are deeply nested heterogeneous JSON;
// consumers access properties dynamically (dict.hero.title).
// Proper typing requires generating types from JSON schemas (future improvement).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = Record<string, any>;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  'fr:common': () => import('../../locales/fr/common.json').then((m) => m.default),
  'fr:foot': () => import('../../locales/fr/foot.json').then((m) => m.default),
  'fr:rugby': () => import('../../locales/fr/rugby.json').then((m) => m.default),
  'fr:handball': () => import('../../locales/fr/handball.json').then((m) => m.default),
};

/**
 * Charge un dictionnaire i18n pour une locale et une section donnees.
 * Retourne le dictionnaire commun francais par defaut si la cle est introuvable.
 * @param locale - Langue cible ('fr' ou 'en')
 * @param section - Section du dictionnaire (common, foot, rugby, handball)
 * @returns Le dictionnaire de traductions
 */
export async function getDictionary(
  locale: 'fr' | 'en' = 'fr',
  section: Section = 'common',
): Promise<Dictionary> {
  const key = `${locale}:${section}`;
  return dictionaries[key]?.() ?? dictionaries['fr:common']();
}

/**
 * Get the brand-specific dictionary for a given brand ID.
 */
export async function getBrandDictionary(
  brandId: 'foot' | 'rugby' | 'handball',
  locale: 'fr' | 'en' = 'fr',
): Promise<Dictionary> {
  return getDictionary(locale, brandId);
}

/**
 * Get both common and brand dictionaries merged.
 */
export async function getFullDictionary(
  brandId: 'foot' | 'rugby' | 'handball',
  locale: 'fr' | 'en' = 'fr',
): Promise<{ common: Dictionary; brand: Dictionary }> {
  const [common, brand] = await Promise.all([
    getDictionary(locale, 'common'),
    getDictionary(locale, brandId),
  ]);
  return { common, brand };
}
