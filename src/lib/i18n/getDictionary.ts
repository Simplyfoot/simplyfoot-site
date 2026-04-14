import 'server-only';

type Section = 'common' | 'foot' | 'rugby' | 'handball';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = Record<string, any>;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  'fr:common': () => import('../../locales/fr/common.json').then((m) => m.default),
  'fr:foot': () => import('../../locales/fr/foot.json').then((m) => m.default),
  'fr:rugby': () => import('../../locales/fr/rugby.json').then((m) => m.default),
  'fr:handball': () => import('../../locales/fr/handball.json').then((m) => m.default),
};

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
