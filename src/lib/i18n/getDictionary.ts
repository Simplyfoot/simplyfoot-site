import "server-only";

export const getDictionary = async (locale: string, section: string = "common") => {
  const dictionaries: Record<string, () => Promise<any>> = {
    "fr:common": () => import("../../locales/fr/common.json").then((m) => m.default),
    "en:common": () => import("../../locales/en/common.json").then((m) => m.default),
    "fr:navbar": () => import("../../locales/fr/navbar.json").then((m) => m.default),
    "en:navbar": () => import("../../locales/en/navbar.json").then((m) => m.default),
  };

  const key = `${locale}:${section}`;
  return dictionaries[key]?.() || dictionaries["fr:common"]();
};
