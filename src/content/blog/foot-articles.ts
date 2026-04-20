import type { BlogArticle } from '@/types/blog';

/**
 * 24 mock articles for SimplyFoot. Balanced across categories and regions.
 * Swap with DB in production by editing `src/lib/blog/service.ts` only.
 * Slugs are stable, SEO-friendly, and shared across locales.
 */
export const FOOT_ARTICLES: readonly BlogArticle[] = [
    /* ─────────────── RESULTATS (6) ─────────────── */
    {
        slug: 'fc-gardanne-us-martigues-district13-j8',
        brand: 'foot',
        category: 'resultats',
        title: 'FC Gardanne 2-1 US Martigues — Les verts arrachent les trois points',
        excerpt:
            "Dans un match tendu de la 8ᵉ journée, le FC Gardanne s'impose à domicile grâce à un doublé de Dupont et un but contre son camp.",
        content: [
            {
                type: 'paragraph',
                text: 'Il aura fallu attendre la 67ᵉ minute et une reprise de Silva contre son camp pour que le FC Gardanne prenne définitivement les devants dans cette rencontre accrochée du District 13.',
            },
            {
                type: 'paragraph',
                text: "Dupont, capitaine et métronome du milieu, avait ouvert le score de la tête à la 23ᵉ, avant que Martin n'égalise juste avant la pause d'une frappe des 20 mètres.",
            },
            { type: 'heading', level: 2, text: 'Le tournant du match' },
            {
                type: 'paragraph',
                text: "Entré en jeu à l'heure de jeu, le jeune Aznar a dynamité le couloir droit visiteur. C'est son centre qui provoque le but contre son camp décisif.",
            },
            {
                type: 'quote',
                text: "On savait que ce serait serré, mais les gamins n'ont rien lâché. C'est une victoire d'équipe.",
                author: 'Karim Belkacem, coach du FC Gardanne',
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-15',
        readingMinutes: 3,
        tags: ['district-13', 'journée-8', 'gardanne'],
        clubIds: ['fc-gardanne', 'us-martigues-amateur'],
        region: 'paca',
        department: '13',
        isPinned: true,
        pinnedOrder: 1,
        views: 1240,
        matchData: {
            competition: 'District 13 — Journée 8',
            date: '2025-03-15',
            homeTeam: 'FC Gardanne',
            awayTeam: 'US Martigues',
            homeScore: 2,
            awayScore: 1,
            stadium: 'Stade Fred Aubert',
            events: [
                { minute: 23, type: 'goal', team: 'home', player: 'Dupont' },
                { minute: 45, type: 'goal', team: 'away', player: 'Martin' },
                { minute: 67, type: 'goal', team: 'home', player: 'Silva (c.s.c.)' },
            ],
        },
    },
    {
        slug: 'es-berre-sc-salon-derby',
        brand: 'foot',
        category: 'resultats',
        title: 'ES Berre 0-0 SC Salon — Derby fermé, personne ne cède',
        excerpt:
            'Un derby étouffant et tactique entre Berre et Salon, conclu sur un score vierge malgré quatre grosses occasions.',
        content: [
            {
                type: 'paragraph',
                text: 'Dans une ambiance de derby, les deux équipes ont livré une bataille physique où aucune ne voulait prendre de risque. Le point du match nul partage la logique.',
            },
            {
                type: 'paragraph',
                text: "Côté Berrois, le gardien Laurent a réalisé deux arrêts décisifs en première mi-temps. Pour Salon, la frappe de Dos Santos à la 78ᵉ s'écrase sur la transversale.",
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-15',
        readingMinutes: 2,
        tags: ['district-13', 'derby'],
        clubIds: ['es-berre', 'sc-salon-de-provence'],
        region: 'paca',
        department: '13',
        views: 890,
        matchData: {
            competition: 'District 13 — Journée 8',
            date: '2025-03-15',
            homeTeam: 'ES Berre',
            awayTeam: 'SC Salon',
            homeScore: 0,
            awayScore: 0,
            stadium: 'Stade Municipal de Berre',
            events: [],
        },
    },
    {
        slug: 'toulouse-rodeo-blagnac-3-2',
        brand: 'foot',
        category: 'resultats',
        title: 'Toulouse Rodéo 3-2 Blagnac FC — Remontada en fin de match',
        excerpt:
            'Menés 2-0 à la mi-temps, les Rodéos signent une remontada héroïque en cinq minutes pour valider les points du derby.',
        content: [
            {
                type: 'paragraph',
                text: 'Rarement un derby Haute-Garonne aura connu un tel scénario. Blagnac maîtrisait son sujet, menant 2-0 à la pause grâce à Meziane et Bouba.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Cinq minutes de folie',
            },
            {
                type: 'paragraph',
                text: "Tout s'est joué entre la 78ᵉ et la 83ᵉ minute. Réduction du score par Carvalho sur corner, égalisation de Mendy d'une bicyclette, puis but de la victoire signé Traoré d'un lob limpide.",
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-14',
        readingMinutes: 3,
        tags: ['occitanie', 'district-31', 'derby'],
        clubIds: ['toulouse-rodeo', 'blagnac-fc'],
        region: 'occ',
        department: '31',
        views: 1580,
        matchData: {
            competition: 'Régional 2 Occitanie — Journée 18',
            date: '2025-03-14',
            homeTeam: 'Toulouse Rodéo',
            awayTeam: 'Blagnac FC',
            homeScore: 3,
            awayScore: 2,
            stadium: 'Stade Ernest-Argelès',
            events: [
                { minute: 22, type: 'goal', team: 'away', player: 'Meziane' },
                { minute: 41, type: 'goal', team: 'away', player: 'Bouba' },
                { minute: 78, type: 'goal', team: 'home', player: 'Carvalho' },
                { minute: 80, type: 'goal', team: 'home', player: 'Mendy' },
                { minute: 83, type: 'goal', team: 'home', player: 'Traoré' },
            ],
        },
    },
    {
        slug: 'stade-rennais-b-liffre-4-0',
        brand: 'foot',
        category: 'resultats',
        title: 'Stade Rennais B 4-0 US Liffré — Démonstration des rouges et noirs',
        excerpt:
            'La réserve rennaise déroule face à Liffré et conforte sa place dans la course à la montée en N3.',
        content: [
            {
                type: 'paragraph',
                text: 'Porté par un Kaboré étincelant (doublé), le Stade Rennais B a étouffé Liffré dès les premières minutes. À 2-0 à la pause, le match était plié.',
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-14',
        readingMinutes: 2,
        tags: ['bretagne', 'r1', 'rennes'],
        clubIds: ['stade-rennais-b', 'us-liffre'],
        region: 'bre',
        department: '35',
        views: 720,
        matchData: {
            competition: 'R1 Bretagne — Journée 16',
            date: '2025-03-14',
            homeTeam: 'Stade Rennais B',
            awayTeam: 'US Liffré',
            homeScore: 4,
            awayScore: 0,
            stadium: "Centre d'entraînement Henri-Guérin",
            events: [
                { minute: 14, type: 'goal', team: 'home', player: 'Kaboré' },
                { minute: 38, type: 'goal', team: 'home', player: 'Lemoine' },
                { minute: 64, type: 'goal', team: 'home', player: 'Kaboré' },
                { minute: 88, type: 'goal', team: 'home', player: 'Boissier' },
            ],
        },
    },
    {
        slug: 'red-star-93-montfermeil-2-2',
        brand: 'foot',
        category: 'resultats',
        title: 'Red Star 93 B 2-2 FC Montfermeil — Un point pour chacun',
        excerpt:
            'Le Red Star B et Montfermeil se quittent dos à dos après un match débridé et offensif.',
        content: [
            {
                type: 'paragraph',
                text: "Deux fois menés, les Audoniens ont chaque fois recollé au score grâce à la justesse de leur n°10 Camara, auteur d'un doublé.",
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-13',
        readingMinutes: 2,
        tags: ['idf', 'seine-saint-denis', 'r1'],
        clubIds: ['red-star-93-b', 'fc-montfermeil'],
        region: 'idf',
        department: '93',
        views: 640,
        matchData: {
            competition: 'R1 Île-de-France — Journée 17',
            date: '2025-03-13',
            homeTeam: 'Red Star 93 B',
            awayTeam: 'FC Montfermeil',
            homeScore: 2,
            awayScore: 2,
            stadium: 'Stade Bauer',
            events: [
                { minute: 12, type: 'goal', team: 'away', player: 'Diouf' },
                { minute: 34, type: 'goal', team: 'home', player: 'Camara' },
                { minute: 56, type: 'goal', team: 'away', player: 'Soumaré' },
                { minute: 71, type: 'goal', team: 'home', player: 'Camara' },
            ],
        },
    },
    {
        slug: 'cavigal-nice-grasse-1-3',
        brand: 'foot',
        category: 'resultats',
        title: 'Cavigal Nice 1-3 RC Grasse — Grasse fait le break en tête',
        excerpt:
            "Le RC Grasse prend trois longueurs d'avance en tête de son groupe après une victoire solide à Nice.",
        content: [
            {
                type: 'paragraph',
                text: 'Efficaces et réalistes, les Grassois ont validé le script de leur coach avec trois buts sur leurs quatre premières occasions.',
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-13',
        readingMinutes: 2,
        tags: ['paca', '06', 'r2'],
        clubIds: ['cavigal-nice', 'rc-grasse'],
        region: 'paca',
        department: '06',
        views: 510,
        matchData: {
            competition: 'R2 PACA — Journée 18',
            date: '2025-03-13',
            homeTeam: 'Cavigal Nice',
            awayTeam: 'RC Grasse',
            homeScore: 1,
            awayScore: 3,
            stadium: 'Stade Charles-Ehrmann',
            events: [
                { minute: 8, type: 'goal', team: 'away', player: 'Berthelot' },
                { minute: 33, type: 'goal', team: 'away', player: 'Roux' },
                { minute: 55, type: 'goal', team: 'home', player: 'Benali' },
                { minute: 82, type: 'goal', team: 'away', player: 'Berthelot' },
            ],
        },
    },

    /* ─────────────── ACTUALITES (6) ─────────────── */
    {
        slug: 'ffft-lance-campagne-arbitres-benevoles',
        brand: 'foot',
        category: 'actualites',
        title: 'La FFF lance une grande campagne pour recruter 5 000 arbitres amateurs',
        excerpt:
            "Face à la pénurie, la FFF annonce un plan national de formation et de revalorisation de l'arbitrage amateur.",
        content: [
            {
                type: 'paragraph',
                text: "La Fédération Française de Football a officialisé ce week-end un plan ambitieux : recruter 5 000 nouveaux arbitres d'ici 2026, avec formation gratuite et accompagnement renforcé.",
            },
            {
                type: 'paragraph',
                text: 'Le plan comprend une indemnisation revue à la hausse pour les matchs de district, une protection juridique renforcée et un parcours de formation en ligne.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Les clubs appelés à jouer un rôle',
            },
            {
                type: 'paragraph',
                text: "Chaque club sera invité à présenter au moins un candidat arbitre par saison. Un dispositif d'incitation financière est prévu pour les clubs exemplaires.",
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-12',
        readingMinutes: 4,
        tags: ['arbitrage', 'fff', 'formation'],
        isPinned: true,
        pinnedOrder: 2,
        views: 2100,
    },
    {
        slug: 'licence-unique-benevoles-u13',
        brand: 'foot',
        category: 'actualites',
        title: 'Licence unique éducateurs U13 : ce qui change en mars',
        excerpt:
            'La licence jeunes éducateurs U13 évolue pour faciliter la mutualisation entre clubs dans les petits villages.',
        content: [
            {
                type: 'paragraph',
                text: 'Le dispositif, déjà testé en Nouvelle-Aquitaine et en Bretagne, est désormais généralisé au niveau national.',
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-10',
        readingMinutes: 3,
        tags: ['u13', 'licence', 'formation'],
        region: 'bre',
        views: 680,
    },
    {
        slug: 'district-herault-nouvelle-formule-coupe',
        brand: 'foot',
        category: 'actualites',
        title: 'District Hérault : nouvelle formule pour la Coupe Escande',
        excerpt:
            "Le District de l'Hérault modifie la formule de sa coupe régionale pour la saison 2025-2026.",
        content: [
            {
                type: 'paragraph',
                text: 'Fini les matchs aller-retour en phase de poules : la nouvelle formule privilégie des matchs à élimination directe dès le premier tour.',
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-08',
        readingMinutes: 2,
        tags: ['hérault', 'coupe', 'occitanie'],
        region: 'occ',
        department: '34',
        views: 410,
    },
    {
        slug: 'bretagne-tournoi-u11-saint-brieuc',
        brand: 'foot',
        category: 'actualites',
        title: 'Saint-Brieuc accueille 96 équipes U11 pour son tournoi de Pâques',
        excerpt:
            'La 18ᵉ édition du tournoi U11 de Saint-Brieuc bat un record de participation avec 96 équipes inscrites.',
        content: [
            {
                type: 'paragraph',
                text: 'Du 18 au 21 avril, le stade Fred Aubert accueillera 96 formations venues de toute la Bretagne et du Grand Ouest.',
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-07',
        readingMinutes: 2,
        tags: ['bretagne', 'u11', 'tournoi'],
        clubIds: ['saint-brieuc-fc'],
        region: 'bre',
        department: '22',
        views: 520,
    },
    {
        slug: 'idf-subventions-vestiaires-2025',
        brand: 'foot',
        category: 'actualites',
        title: 'Île-de-France : 3 M€ de subventions régionales pour les vestiaires',
        excerpt:
            "La Région IDF débloque trois millions d'euros pour la rénovation des vestiaires de clubs amateurs en 2025.",
        content: [
            {
                type: 'paragraph',
                text: "Les clubs ont jusqu'au 30 juin pour déposer leur dossier. Les subventions couvrent jusqu'à 50% du montant des travaux.",
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-05',
        readingMinutes: 3,
        tags: ['idf', 'subventions', 'infrastructure'],
        region: 'idf',
        views: 980,
    },
    {
        slug: 'paca-jeu-dirigeants-masterclass',
        brand: 'foot',
        category: 'actualites',
        title: 'Masterclass dirigeants : la Ligue PACA ouvre ses portes à Marseille',
        excerpt:
            'Une journée de formation entièrement gratuite pour les présidents et dirigeants de clubs amateurs le 30 mars.',
        content: [
            {
                type: 'paragraph',
                text: "Au programme : gestion comptable, droit associatif, communication digitale. Inscriptions ouvertes jusqu'au 25 mars.",
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-04',
        readingMinutes: 2,
        tags: ['paca', 'formation', 'dirigeants'],
        region: 'paca',
        views: 340,
    },

    /* ─────────────── MISES A JOUR (4) ─────────────── */
    {
        slug: 'simplyfoot-v2-4-compositions-drag-drop',
        brand: 'foot',
        category: 'mises-a-jour',
        title: 'SimplyFoot 2.4 — Composition drag & drop et stats joueur',
        excerpt:
            'La v2.4 de SimplyFoot débarque avec la composition drag & drop tant attendue et les statistiques individuelles.',
        content: [
            {
                type: 'paragraph',
                text: 'Pensée pour accélérer le travail des coachs, la nouvelle composition permet de placer vos joueurs en un glisser-déposer sur un terrain interactif.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Statistiques par joueur',
            },
            {
                type: 'paragraph',
                text: 'Buts, passes décisives, cartons, temps de jeu : chaque joueur dispose désormais de sa fiche individuelle automatiquement mise à jour après les matchs.',
            },
        ],
        author: 'Équipe produit SimplyFoot',
        publishedAt: '2025-03-15',
        readingMinutes: 3,
        tags: ['produit', 'v2.4', 'composition'],
        isPinned: true,
        pinnedOrder: 3,
        views: 1450,
        changelog: {
            version: 'v2.4',
            releaseDate: '2025-03-15',
            entries: [
                { type: 'feature', text: 'Composition drag & drop sur terrain interactif' },
                {
                    type: 'feature',
                    text: 'Statistiques individuelles par joueur (buts, passes, cartons, temps de jeu)',
                },
                {
                    type: 'improvement',
                    text: 'Vitesse de chargement des convocations multipliée par 2',
                },
                {
                    type: 'fix',
                    text: 'Notifications iOS qui ne se déclenchaient pas après mise en veille',
                },
            ],
        },
    },
    {
        slug: 'simplyfoot-v2-3-messagerie-equipe',
        brand: 'foot',
        category: 'mises-a-jour',
        title: 'SimplyFoot 2.3 — Messagerie équipe et feuille de match simplifiée',
        excerpt:
            'La v2.3 introduit la messagerie dédiée à chaque équipe et simplifie la rédaction des feuilles de match.',
        content: [
            {
                type: 'paragraph',
                text: 'Chaque équipe dispose désormais de son propre fil de discussion, séparé du fil club général.',
            },
        ],
        author: 'Équipe produit SimplyFoot',
        publishedAt: '2025-02-20',
        readingMinutes: 2,
        tags: ['produit', 'v2.3', 'messagerie'],
        views: 920,
        changelog: {
            version: 'v2.3',
            releaseDate: '2025-02-20',
            entries: [
                { type: 'feature', text: 'Messagerie dédiée par équipe' },
                { type: 'feature', text: 'Feuille de match simplifiée avec pré-remplissage' },
                { type: 'improvement', text: 'Meilleure gestion des rôles multi-équipes' },
                { type: 'fix', text: 'Export PDF corrompu dans certains navigateurs' },
            ],
        },
    },
    {
        slug: 'simplyfoot-v2-2-multi-saisons',
        brand: 'foot',
        category: 'mises-a-jour',
        title: 'SimplyFoot 2.2 — Multi-saisons et archivage',
        excerpt:
            'Gérez désormais plusieurs saisons en parallèle et consultez les archives de votre club sur 3 ans.',
        content: [
            {
                type: 'paragraph',
                text: 'Les présidents peuvent créer, archiver et comparer les saisons sans perdre aucune donnée historique.',
            },
        ],
        author: 'Équipe produit SimplyFoot',
        publishedAt: '2025-01-25',
        readingMinutes: 2,
        tags: ['produit', 'v2.2', 'saisons'],
        views: 640,
        changelog: {
            version: 'v2.2',
            releaseDate: '2025-01-25',
            entries: [
                { type: 'feature', text: 'Gestion multi-saisons avec basculement 1-clic' },
                { type: 'feature', text: 'Archivage automatique des saisons terminées' },
                {
                    type: 'breaking',
                    text: "Ancien format d'export saison — migration auto, mais revérifiez vos fichiers",
                },
            ],
        },
    },
    {
        slug: 'simplyfoot-v2-1-convocations-sms',
        brand: 'foot',
        category: 'mises-a-jour',
        title: 'SimplyFoot 2.1 — Convocations par SMS et rappels automatiques',
        excerpt:
            'Envoyez vos convocations par SMS (et plus seulement e-mail) et programmez des rappels automatiques 24h avant.',
        content: [
            {
                type: 'paragraph',
                text: "Sur demande massive des coachs, nous déployons l'envoi SMS et les rappels automatiques J-1.",
            },
        ],
        author: 'Équipe produit SimplyFoot',
        publishedAt: '2025-01-08',
        readingMinutes: 2,
        tags: ['produit', 'v2.1', 'convocations'],
        views: 780,
        changelog: {
            version: 'v2.1',
            releaseDate: '2025-01-08',
            entries: [
                { type: 'feature', text: 'Envoi des convocations par SMS' },
                { type: 'feature', text: 'Rappels automatiques 24h avant le match' },
                {
                    type: 'improvement',
                    text: 'Amélioration du temps de réponse du dashboard coach',
                },
            ],
        },
    },

    /* ─────────────── GUIDES (4) ─────────────── */
    {
        slug: 'guide-organiser-tournoi-jeunes-club-amateur',
        brand: 'foot',
        category: 'guides',
        title: 'Organiser un tournoi jeunes en club amateur : le guide complet',
        excerpt:
            "De la logistique aux partenariats en passant par la sécurité, tout ce qu'il faut savoir pour réussir son tournoi de jeunes.",
        content: [
            {
                type: 'heading',
                level: 2,
                text: 'Les 6 mois avant : poser les fondations',
            },
            {
                type: 'paragraph',
                text: 'Réservez les terrains, déclarez votre événement au District, constituez une commission tournoi avec au moins 5 bénévoles référents.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Les 3 mois avant : recrutement et partenariats',
            },
            {
                type: 'list',
                items: [
                    'Lancer les invitations clubs (visez 30 équipes minimum)',
                    'Contacter les partenaires locaux (boulangerie, supermarché, mairie)',
                    'Prévoir la buvette et la restauration',
                    'Réserver les arbitres auprès du District',
                ],
            },
            {
                type: 'paragraph',
                text: "Le jour J, prévoyez un référent par terrain et un PC central pour gérer les aléas. Les bons tournois sont ceux qu'on n'a pas besoin de piloter en urgence.",
            },
        ],
        author: 'Équipe SimplyFoot',
        publishedAt: '2025-02-28',
        readingMinutes: 8,
        tags: ['guide', 'tournoi', 'jeunes'],
        views: 1820,
    },
    {
        slug: 'guide-budget-club-amateur-200-licencies',
        brand: 'foot',
        category: 'guides',
        title: 'Construire un budget pour un club de 200 licenciés',
        excerpt:
            'Modèle budgétaire réaliste pour un club amateur : recettes, dépenses, provisions. Avec chiffres concrets.',
        content: [
            {
                type: 'paragraph',
                text: 'Un club de 200 licenciés représente un budget annuel moyen de 45 000 € à 60 000 € selon la taille des infrastructures.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Recettes principales',
            },
            {
                type: 'list',
                items: [
                    'Cotisations licenciés : 60 à 70 % du budget',
                    'Subventions mairie + région : 15 à 20 %',
                    'Sponsoring et partenariats : 10 à 15 %',
                    'Buvette et manifestations : 5 à 10 %',
                ],
            },
        ],
        author: 'Équipe SimplyFoot',
        publishedAt: '2025-02-18',
        readingMinutes: 10,
        tags: ['budget', 'gestion', 'président'],
        views: 2450,
    },
    {
        slug: 'guide-recruter-benevoles-club-rural',
        brand: 'foot',
        category: 'guides',
        title: 'Recruter des bénévoles en club rural : 7 leviers qui marchent',
        excerpt:
            'La pénurie de bénévoles frappe partout. 7 techniques éprouvées pour remobiliser parents et anciens joueurs.',
        content: [
            {
                type: 'paragraph',
                text: 'Le bénévolat ne se décrète pas, il se cultive. Voici les approches qui portent leurs fruits dans les clubs ruraux.',
            },
            {
                type: 'list',
                ordered: true,
                items: [
                    'Proposer des missions courtes et cadrées (1 samedi/mois)',
                    'Transformer les parents accompagnateurs en référents',
                    'Former et valoriser (diplômes fédéraux gratuits)',
                    'Créer un groupe WhatsApp bénévoles actif',
                    'Organiser une soirée remerciements annuelle',
                    'Confier des responsabilités claires aux anciens joueurs',
                    'Communiquer publiquement les succès des bénévoles',
                ],
            },
        ],
        author: 'Équipe SimplyFoot',
        publishedAt: '2025-02-05',
        readingMinutes: 6,
        tags: ['bénévoles', 'rural', 'gestion'],
        views: 1540,
    },
    {
        slug: 'guide-plan-entrainement-u13-hiver',
        brand: 'foot',
        category: 'guides',
        title: "Plan d'entraînement U13 hiver : 8 séances clés-en-main",
        excerpt:
            '8 séances progressives pour préparer vos U13 à la reprise de mars sans passer des heures à préparer.',
        content: [
            {
                type: 'paragraph',
                text: 'Chaque séance dure 1h15 et articule échauffement, jeu technique, situation tactique et match à thème.',
            },
        ],
        author: 'Équipe SimplyFoot',
        publishedAt: '2025-01-15',
        readingMinutes: 7,
        tags: ['u13', 'entraînement', 'coach'],
        views: 2180,
    },

    /* ─────────────── TEMOIGNAGES (2) ─────────────── */
    {
        slug: 'temoignage-fc-gardanne-presidente-simplyfoot',
        brand: 'foot',
        category: 'temoignages',
        title: '"Avant SimplyFoot, je passais mes dimanches sur Excel"',
        excerpt:
            'Isabelle Meyer, présidente du FC Gardanne, raconte comment SimplyFoot a transformé la gestion de son club de 380 licenciés.',
        content: [
            {
                type: 'quote',
                text: "Je passais littéralement tous mes dimanches après-midi à mettre à jour des tableurs Excel. Maintenant, tout se fait tout seul. J'ai récupéré ma vie de famille.",
                author: 'Isabelle Meyer, présidente FC Gardanne',
            },
            {
                type: 'paragraph',
                text: "Avec 380 licenciés répartis sur 22 équipes, le FC Gardanne figure parmi les plus gros clubs du 13. L'arrivée de SimplyFoot en 2024 a fluidifié tout le pilotage club.",
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-02-25',
        readingMinutes: 4,
        tags: ['témoignage', 'paca', 'président'],
        clubIds: ['fc-gardanne'],
        region: 'paca',
        department: '13',
        views: 1120,
    },
    {
        slug: 'temoignage-us-liffre-coach-u15',
        brand: 'foot',
        category: 'temoignages',
        title: '"La compo drag & drop, c\'est un gain de 30 minutes par match"',
        excerpt:
            "Nicolas Tanguy, coach U15 de l'US Liffré, partage son retour sur les nouveaux outils de composition.",
        content: [
            {
                type: 'paragraph',
                text: 'Ancien éducateur fédéral, Nicolas préparait ses compositions au tableau, puis les photographiait pour les envoyer sur WhatsApp. Un temps perdu considérable.',
            },
            {
                type: 'quote',
                text: "Trente minutes par match, ça fait une heure par week-end. Sur une saison, c'est l'équivalent d'une mi-temps en plus à regarder jouer mes joueurs.",
                author: 'Nicolas Tanguy, coach US Liffré U15',
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-02-10',
        readingMinutes: 3,
        tags: ['témoignage', 'bretagne', 'coach'],
        clubIds: ['us-liffre'],
        region: 'bre',
        department: '35',
        views: 860,
    },

    /* ─────────────── REGLEMENTATION (2) ─────────────── */
    {
        slug: 'reglementation-nouveau-protocole-commotions-2025',
        brand: 'foot',
        category: 'reglementation',
        title: 'Protocole commotions 2025 : ce que les clubs doivent savoir',
        excerpt:
            'La FFF renforce le protocole commotions pour la saison 2025-2026. Retrait immédiat, délai de reprise, formation obligatoire.',
        content: [
            {
                type: 'paragraph',
                text: "La FFF s'aligne sur les recommandations de la FIFA avec un protocole renforcé à partir de juillet 2025.",
            },
            {
                type: 'heading',
                level: 2,
                text: 'Les 3 règles critiques',
            },
            {
                type: 'list',
                ordered: true,
                items: [
                    'Retrait immédiat et définitif du joueur en cas de suspicion de commotion',
                    'Délai minimum de reprise de 6 jours avec certificat médical',
                    "Formation d'au moins un référent commotions par club (gratuite en ligne)",
                ],
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-03-01',
        readingMinutes: 5,
        tags: ['commotions', 'fff', 'sécurité'],
        views: 1680,
    },
    {
        slug: 'reglementation-mutations-2025-2026-calendrier',
        brand: 'foot',
        category: 'reglementation',
        title: 'Mutations 2025-2026 : calendrier, plafonds et exceptions',
        excerpt:
            "Le calendrier officiel des mutations de la saison 2025-2026, avec les nouveaux plafonds d'indemnités et les cas particuliers.",
        content: [
            {
                type: 'paragraph',
                text: "La période de mutations s'ouvre le 1er juin 2025 et se termine le 15 juillet pour la première fenêtre.",
            },
        ],
        author: 'Rédaction SimplyFoot',
        publishedAt: '2025-02-15',
        readingMinutes: 4,
        tags: ['mutations', 'calendrier', 'licence'],
        views: 940,
    },
];
