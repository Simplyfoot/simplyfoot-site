interface FallbackRule {
  keywords: string[];
  response: string;
}

const fallbackRules: FallbackRule[] = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'hey', 'coucou', 'bonsoir'],
    response: "Salut ! \uD83D\uDC19 Je suis Simmo. Je peux t'aider \u00e0 d\u00e9couvrir Simply et trouver la solution parfaite pour ton club. Qu'est-ce qui t'int\u00e9resse ?",
  },
  {
    keywords: ['prix', 'co\u00fbt', 'tarif', 'combien', 'gratuit', 'abonnement', 'payer'],
    response: "Nos tarifs d\u00e9pendent de la taille de ton club ! De 4,99\u20ac/mois pour les petits clubs \u00e0 24,99\u20ac/mois pour les grands. Et le premier mois est gratuit \uD83C\uDF81 [D\u00e9couvre nos offres](/foot/offres)",
  },
  {
    keywords: ['foot', 'football'],
    response: "SimplyFoot est fait pour toi ! \u26BD Gestion d'effectifs, convocations automatiques, calendrier de saison... [D\u00e9couvrir SimplyFoot](/foot)",
  },
  {
    keywords: ['rugby'],
    response: "SimplyRugby va muscler la gestion de ton club ! \uD83C\uDFC9 Composition du XV, gestion des cat\u00e9gories, tournois... [D\u00e9couvrir SimplyRugby](/rugby)",
  },
  {
    keywords: ['hand', 'handball'],
    response: "SimplyHandball est l\u00e0 pour ton club ! \uD83E\uDD3E Gestion des cr\u00e9neaux gymnase, composition en 7... [D\u00e9couvrir SimplyHandball](/handball)",
  },
  {
    keywords: ['fonctionnalit\u00e9', 'fonction', 'outil', 'feature', 'quoi', 'comment \u00e7a marche'],
    response: "Simply offre plein d'outils \uD83D\uDC19 : gestion des effectifs, convocations automatiques, calendrier, communication club, documents, statistiques. Tout est inclus ! Quel sport t'int\u00e9resse ?",
  },
  {
    keywords: ['d\u00e9mo', 'demo', 'essai', 'essayer', 'tester', 'test'],
    response: "Super id\u00e9e ! \uD83C\uDF89 Tu peux essayer gratuitement pendant 1 mois, sans engagement. [Demander une d\u00e9mo](/contact)",
  },
  {
    keywords: ['contact', 'aide', 'support', 'probl\u00e8me', 'question'],
    response: "Notre \u00e9quipe r\u00e9pond en moins de 24h ! \uD83D\uDCAC [Contactez-nous](/contact)",
  },
  {
    keywords: ['merci', 'super', 'parfait', 'g\u00e9nial', 'top'],
    response: "Avec plaisir ! \uD83D\uDC19 N'h\u00e9site pas si tu as d'autres questions. Je suis l\u00e0 !",
  },
];

const defaultFallback = "Je suis encore en apprentissage sur ce sujet \uD83D\uDC19 Pour une r\u00e9ponse d\u00e9taill\u00e9e, visite notre [page contact](/contact) ou explore les pages de ton sport !";

/**
 * Retourne une reponse pre-programmee lorsque l'API Anthropic est indisponible.
 * Cherche des mots-cles dans le message utilisateur pour fournir une reponse pertinente.
 * @param userMessage - Message de l'utilisateur a analyser
 * @returns Reponse de repli correspondante ou message par defaut
 */
export function getFallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const rule of fallbackRules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return defaultFallback;
}
