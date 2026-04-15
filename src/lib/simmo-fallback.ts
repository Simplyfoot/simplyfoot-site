interface FallbackRule {
  keywords: string[];
  response: string;
}

const fallbackRules: FallbackRule[] = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'hey', 'coucou', 'bonsoir'],
    response: "Salut ! \uD83D\uDC19 Je suis Simo. Je peux t'aider \u00e0 d\u00e9couvrir Simply et trouver la solution parfaite pour ton club. Qu'est-ce qui t'int\u00e9resse ?",
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
  {
    keywords: ['inscription', 'inscrire', 'cr\u00e9er un compte', 'compte', 'register'],
    response: "Pour cr\u00e9er ton compte, renseigne ton e-mail et un mot de passe puis clique sur \u00ab S'inscrire \u00bb. Tu peux aussi t'inscrire via Google ou Apple \uD83D\uDC19 Ensuite, rejoins ton club avec le code club donn\u00e9 par ton pr\u00e9sident. [Voir la FAQ](/foot/faq)",
  },
  {
    keywords: ['code club', 'rejoindre club', 'rejoindre mon club'],
    response: "Le code club est fourni par le pr\u00e9sident de ton club. Une fois que tu l'as, entre-le dans l'app pour rejoindre le club. Si tu es parent, tu auras besoin du code \u00e9quipe donn\u00e9 par le coach \uD83D\uDC19 [Voir la FAQ](/foot/faq#inscription)",
  },
  {
    keywords: ['code \u00e9quipe', 'code equipe'],
    response: "Le code \u00e9quipe est visible sur l'\u00e9tiquette de l'\u00e9quipe dans le tableau de bord du coach. Il peut le copier en un clic et te l'envoyer \uD83D\uDC19",
  },
  {
    keywords: ['convocation', 'convoquer', 'pr\u00e9sent', 'absent'],
    response: "Pour r\u00e9pondre \u00e0 une convocation, clique sur l'\u00e9v\u00e9nement puis indique \u00ab Pr\u00e9sent \u00bb ou \u00ab Absent \u00bb en bas de la fiche. Tu peux modifier ta r\u00e9ponse \u00e0 tout moment \uD83D\uDC19",
  },
  {
    keywords: ['parent', 'parents s\u00e9par\u00e9s', 'doublon', 'lier enfant'],
    response: "Pour les parents s\u00e9par\u00e9s : un parent inscrit l'enfant, puis le coach g\u00e9n\u00e8re un code de rattachement. Le second parent utilise \u00ab Lier un enfant \u00bb avec ce code. Chaque parent garde son propre compte \uD83D\uDC19 [Plus de d\u00e9tails](/foot/faq#parents)",
  },
  {
    keywords: ['notification', 'notif', 'cloche'],
    response: "La cloche en haut de l'\u00e9cran affiche toutes tes notifications dans l'app, en plus des notifications push sur ton t\u00e9l\u00e9phone \uD83D\uDC19",
  },
  {
    keywords: ['messagerie', 'message', 'envoyer message'],
    response: "La messagerie est \u00e0 c\u00f4t\u00e9 de la cloche, en haut de ton \u00e9cran. Coach : club, coachs, \u00e9quipes. Joueur : consultation club, coach, \u00e9quipe \uD83D\uDC19",
  },
  {
    keywords: ['calendrier'],
    response: "Le calendrier regroupe tous tes \u00e9v\u00e9nements, quel que soit ton r\u00f4le : coach, joueur ou parent. Clique sur un jour pour voir les d\u00e9tails \uD83D\uDC19",
  },
  {
    keywords: ['transport', 'voiture', 'stade'],
    response: "L'ic\u00f4ne petite voiture signifie que le joueur se rend directement au stade par ses propres moyens. Le module Transport complet arrive bient\u00f4t \uD83D\uDC19",
  },
  {
    keywords: ['mise \u00e0 jour', 'update', 'nouveaut\u00e9', 'bient\u00f4t', '\u00e0 venir'],
    response: "Plein de nouveaut\u00e9s arrivent : donn\u00e9es sportives, Transport, photos/vid\u00e9os, composition d'\u00e9quipe, \u00e9valuations et Nutri-Scan \uD83D\uDC19\uD83D\uDE80 Mises \u00e0 jour toutes les 2 semaines.",
  },
  {
    keywords: ['faq', 'question fr\u00e9quente'],
    response: "Tu as une question ? Consulte notre [FAQ compl\u00e8te](/foot/faq) ou pose-moi directement ta question ici \uD83D\uDC19",
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
