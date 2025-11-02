// /lib/stripe/config.ts

export const PRICE_IDS = {
  // 🟢 MINI CLUB (1 à 30 licenciés)
  mini_monthly: "price_1SIxRS2SVyYOVwm9aZLgOj0w", // 4,99€/mois
  mini_yearly: "price_1SIxRS2SVyYOVwm9Yr2EB66K",  // 53,89€/an

  // 🟡 LOCAL CLUB (31 à 75 licenciés)
  local_monthly: "price_1SIxSl2SVyYOVwm9l7hxV1tI", // 9,99€/mois
  local_yearly: "price_1SIxSk2SVyYOVwm9OfcvCMNO",  // 107,89€/an

  // 💚 RÉGIONAL CLUB (76 à 150 licenciés)
  regional_monthly: "price_1SIxTw2SVyYOVwm9SaVGJcAG", // 14,99€/mois
  regional_yearly: "price_1SIxTw2SVyYOVwm9vBaxGGNe",  // 161,89€/an

  // 💙 LARGE CLUB (151 à 300 licenciés)
  large_monthly: "price_1SIxV52SVyYOVwm938iZ3PZ7", // 19,99€/mois
  large_yearly: "price_1SIxV52SVyYOVwm9QXt1H9uC",  // 215,89€/an

  // 💎 MAX CLUB (301 à 500 licenciés)
  max_monthly: "price_1SIxVv2SVyYOVwm9swGT5O6f", // 29,99€/mois
  max_yearly: "price_1SIxVc2SVyYOVwm9t7tKcozO",  // 323,89€/an
} as const;

export const PLANS_DETAILS = {
  mini: {
    name: "Mini Club",
    monthly: 4.99,
    yearly: 53.89,
    description: "Tout SimplyFoot pour bien démarrer",
  },
  local: {
    name: "Local Club",
    monthly: 9.99,
    yearly: 107.89,
    description: "Impliquer tout le club et les familles",
  },
  regional: {
    name: "Régional Club",
    monthly: 14.99,
    yearly: 161.89,
    description: "La performance au cœur du projet",
  },
  grand: {
    name: "Grand Club",
    monthly: 19.99,
    yearly: 215.89,
    description: "Gestion fluide pour effectif XXL",
  },
  maxi: {
    name: "Maxi Club",
    monthly: 29.99,
    yearly: 323.89,
    description: "La référence, sans compromis",
  },
} as const;
