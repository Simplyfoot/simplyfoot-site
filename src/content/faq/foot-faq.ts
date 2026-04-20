import type { FaqCategory, FaqInlineToken } from '@/types/faq';

/* ───────────── Helper builders (keep the data readable) ───────────── */

/** Plain text token. */
const t = (value: string): FaqInlineToken => ({ type: 'text', value });
/** Bold text token (wraps <strong>). */
const b = (value: string): FaqInlineToken => ({ type: 'strong', value });
/** Clickable email link (mailto:). */
const mail = (address: string): FaqInlineToken => ({ type: 'email', address });
/** Clickable phone link (tel:). Pass the raw display label. */
const phone = (number: string): FaqInlineToken => ({ type: 'phone', number });

/**
 * SimplyFoot FAQ — 9 categories, every question/answer copied verbatim from
 * the official FAQ.pdf. Bold emphasis matches the source; the category nav
 * and search operate on this data only.
 *
 * Swap with a DB by editing this file; everything else uses the typed shape.
 */
export const FAQ_CATEGORIES: readonly FaqCategory[] = [
    /* ═══════ 1. Inscription & Compte (11) ═══════ */
    {
        id: 'inscription',
        icon: 'UserPlus',
        title: 'Inscription & Compte',
        items: [
            {
                id: 'creer-compte',
                question: 'Comment créer mon compte SimplyFoot ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Renseignez votre adresse e-mail ainsi qu'un mot de passe, puis cliquez sur ",
                            ),
                            b("« S'inscrire »"),
                            t('. Vous pouvez également vous inscrire via votre compte '),
                            b('Google'),
                            t(' ou '),
                            b('Apple'),
                            t('.'),
                        ],
                    },
                ],
            },
            {
                id: 'connexion-google',
                question: 'La connexion via Google ne fonctionne pas, que faire ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Pour vous inscrire via Google, il est nécessaire que '),
                            b('Chrome'),
                            t(
                                ' soit défini comme navigateur par défaut sur votre téléphone. Si un autre navigateur est utilisé (par exemple Opera ou Samsung Internet), la connexion Google peut échouer. Vous pouvez dans ce cas vous inscrire classiquement avec un e-mail et un mot de passe.',
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'rejoindre-club',
                question: 'Comment rejoindre mon club ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                'Après la création de votre compte, vous pouvez rejoindre un club de trois manières :',
                            ),
                        ],
                    },
                    {
                        type: 'list',
                        items: [
                            [
                                b('En tant que joueur ou coach'),
                                t(
                                    ' : saisissez le code club fourni par le président (ou par SimplyFoot pour les clubs pilotes).',
                                ),
                            ],
                            [
                                b('En tant que représentant légal'),
                                t(
                                    ' : renseignez vos informations puis le code équipe fourni par le coach, ainsi que les informations de votre enfant.',
                                ),
                            ],
                            [b('Les deux'), t(' : combinez les deux démarches.')],
                        ],
                    },
                ],
            },
            {
                id: 'code-club',
                question: 'Où trouver le code club ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Le code club est fourni par le '),
                            b('président du club'),
                            t(
                                ". Pour les clubs pilotes, ce code est communiqué directement par l'équipe SimplyFoot.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'code-equipe',
                question: 'Où trouver le code équipe ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Le code équipe est visible sur l'étiquette de l'équipe dans le tableau de bord du coach. Le coach peut le copier en un clic et vous le transmettre.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'multi-role',
                question: 'Puis-je être à la fois coach, joueur et parent ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Oui. SimplyFoot gère le '),
                            b('multi-rôle'),
                            t(
                                ". Vous pouvez être coach, joueur, parent d'un enfant joueur, et basculer entre vos différents profils en un clic, sans vous déconnecter.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'basculer-profils',
                question: 'Comment basculer entre mes différents profils ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "En haut de l'écran, à côté de votre photo de profil, cliquez sur le logo à droite. Vous verrez alors tous vos rôles et pourrez switcher entre eux instantanément.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'modifier-infos',
                question: 'Comment modifier mes informations personnelles ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Cliquez sur la '),
                            b('roue crantée'),
                            t(' en haut à droite, puis sur '),
                            b('« Informations personnelles »'),
                            t(
                                '. Vous pouvez modifier votre nom, date de naissance, e-mail, ajouter une photo de profil, ou gérer le profil de votre enfant.',
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'modifier-mdp',
                question: 'Comment modifier mon mot de passe ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Cliquez sur la '),
                            b('roue crantée'),
                            t(' en haut à droite, puis sur '),
                            b('« Modifier votre mot de passe »'),
                            t('.'),
                        ],
                    },
                ],
            },
            {
                id: 'changer-club',
                question: 'Comment changer de club ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Dans les paramètres, cliquez sur '),
                            b('« Gérer vos rôles »'),
                            t(
                                ". Vous pouvez quitter votre rôle actuel à tout moment, puis rejoindre un nouveau club à l'aide du code club correspondant.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'desactiver-compte',
                question: 'Comment désactiver mon compte ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Rendez-vous dans les paramètres, puis dans '),
                            b('« Informations personnelles »'),
                            t(
                                ". En bas de cette page, vous trouverez l'option pour désactiver votre compte.",
                            ),
                        ],
                    },
                ],
            },
        ],
    },

    /* ═══════ 2. Parents séparés (3) ═══════ */
    {
        id: 'parents',
        icon: 'Users',
        title: 'Parents séparés',
        items: [
            {
                id: 'eviter-doublons',
                question: 'Nous sommes parents séparés, comment éviter les doublons ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Un des parents inscrit l'enfant normalement. Le coach génère ensuite un ",
                            ),
                            b('code de rattachement'),
                            t(
                                ' spécifique à cet enfant depuis sa fiche. Ce code est transmis au second parent, qui lors de son inscription clique sur ',
                            ),
                            b('« Lier un enfant »'),
                            t(
                                ' et saisit le code. Le second parent est alors rattaché automatiquement, sans créer de doublon.',
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'partage-credentials',
                question: 'Devons-nous partager un e-mail ou un mot de passe ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Non. Chaque parent dispose de son propre compte indépendant. Aucun partage d'identifiants n'est nécessaire.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'generer-rattachement',
                question: 'Où le coach génère-t-il le code de rattachement ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t("Le coach accède à la fiche du joueur via l'onglet "),
                            b('« Équipes »'),
                            t(', puis clique sur le joueur concerné. Un bouton '),
                            b('« Générer un code »'),
                            t(
                                ' est disponible dans la section « Code de rattachement ». Ce code est à usage unique.',
                            ),
                        ],
                    },
                ],
            },
        ],
    },

    /* ═══════ 3. Coach — Gestion des équipes (4) ═══════ */
    {
        id: 'coach-equipes',
        icon: 'ClipboardList',
        title: 'Coach — Gestion des équipes',
        items: [
            {
                id: 'creer-equipe',
                question: 'Comment créer une équipe ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Depuis votre tableau de bord, cliquez sur '),
                            b('« Créer une équipe »'),
                            t(
                                '. Renseignez un nom ou surnom (Groupe 1, Équipe A…), sélectionnez la catégorie et le genre, puis validez. Un code équipe sera automatiquement généré.',
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'transmettre-code-equipe',
                question: 'Comment transmettre le code équipe ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Le code équipe apparaît sur l'étiquette de votre équipe dans le tableau de bord. Cliquez dessus pour le copier, puis transmettez-le aux joueurs ou parents concernés.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'second-coach',
                question: 'Comment rejoindre une équipe en tant que second coach ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Cliquez sur '),
                            b('« Créer une équipe »'),
                            t(", puis en bas de l'écran, sélectionnez "),
                            b('« Rejoindre une équipe en tant que coach »'),
                            t('. Saisissez le code équipe fourni par le coach principal.'),
                        ],
                    },
                ],
            },
            {
                id: 'fiches-joueurs',
                question: 'Comment accéder aux fiches de mes joueurs ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t("Cliquez sur l'onglet "),
                            b('« Équipes »'),
                            t(
                                ", puis sur le joueur souhaité. Vous accédez à ses informations personnelles et aux coordonnées de ses représentants légaux. En touchant l'adresse e-mail, l'application propose d'envoyer un e-mail. En touchant le numéro de téléphone, celui-ci se compose automatiquement.",
                            ),
                        ],
                    },
                ],
            },
        ],
    },

    /* ═══════ 4. Coach — Événements & Convocations (10) ═══════ */
    {
        id: 'coach-evenements',
        icon: 'CalendarPlus',
        title: 'Coach — Événements & Convocations',
        items: [
            {
                id: 'creer-evenement',
                question: 'Comment créer un événement ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Cliquez sur le bouton '),
                            b('« + »'),
                            t(' ou sur '),
                            b('« Créer un événement »'),
                            t(
                                ". Renseignez le titre, l'équipe concernée, le type de rencontre, la date et l'heure de début et de fin.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'evenement-club',
                question: 'Comment envoyer un événement à tout le club ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Lors de la création, sélectionnez '),
                            b('toutes les équipes du club'),
                            t(
                                ". L'événement sera envoyé à l'ensemble des membres. C'est idéal pour les repas de Noël, lotos, etc.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'evenement-vs-convocation',
                question: 'Quelle différence entre un événement classique et une convocation ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t("Si vous cochez l'option "),
                            b('« Convocation »'),
                            t(
                                ", seuls les joueurs que vous sélectionnerez verront cet événement et pourront y participer. Sans cette option (entraînement par exemple), toute l'équipe voit l'événement.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'entrainement-recurrent',
                question: 'Comment créer un entraînement récurrent ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Cochez '),
                            b('« Créer un événement récurrent »'),
                            t(
                                '. Sélectionnez le jour et les horaires (par exemple mardi de 17h30 à 19h30) sur une période donnée. Un événement sera automatiquement créé chaque semaine.',
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'modifier-evenement',
                question: 'Puis-je modifier un événement après sa création ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Oui. Cliquez sur l'événement pour accéder à sa fiche. Vous pouvez modifier tous les éléments à tout moment : lieu, adversaire, horaire, date, etc.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'annuler-evenement',
                question: 'Comment annuler un événement ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Vous pouvez annuler un événement à tout moment. Les joueurs verront toujours l'événement, mais avec la mention ",
                            ),
                            b('« Annulé »'),
                            t(' clairement affichée.'),
                        ],
                    },
                ],
            },
            {
                id: 'envoyer-convocations',
                question: 'Comment envoyer les convocations ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Cliquez sur le compteur de participations en haut à droite de l'événement. Depuis cet onglet, sélectionnez vos joueurs un par un ou tous à la fois, puis validez.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'suivi-reponses',
                question: 'Comment suivre les réponses des joueurs ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t("Dans l'onglet participations, vous voyez le décompte (par exemple "),
                            b('12/14'),
                            t(") et l'indicateur en face de chaque joueur :"),
                        ],
                    },
                    {
                        type: 'list',
                        items: [
                            [b('Coche verte'), t(' = présent')],
                            [b('Croix rouge'), t(' = absent')],
                            [
                                b('Petite voiture'),
                                t(' = se rend directement au stade de façon autonome'),
                            ],
                        ],
                    },
                ],
            },
            {
                id: 'repondre-pour-joueur',
                question: "Un joueur n'a pas accès à son téléphone, puis-je répondre pour lui ?",
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Oui. À droite de la barre de recherche, cliquez sur le '),
                            b('petit crayon'),
                            t(
                                " pour passer en mode modification. Vous pouvez alors valider la présence, l'absence, ou indiquer que le joueur se rend directement au stade.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'petite-voiture',
                question: "Que signifie l'icône « petite voiture » ?",
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Elle signifie que le joueur (ou son parent) se rend '),
                            b('directement au stade'),
                            t(
                                " par ses propres moyens, sans passer par le point de rendez-vous du groupe. Le coach sait ainsi qu'il ne doit pas l'attendre au départ.",
                            ),
                        ],
                    },
                ],
            },
        ],
    },

    /* ═══════ 5. Joueur (4) ═══════ */
    {
        id: 'joueur',
        icon: 'User',
        title: 'Joueur',
        items: [
            {
                id: 'prochains-evenements',
                question: 'Comment voir les prochains événements ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Sur votre page d'accueil, vous retrouvez les prochains événements ainsi que votre réponse pour chacun d'eux : présent, absent, ou non répondu.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'repondre-convocation',
                question: 'Comment répondre à une convocation ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t("Cliquez sur l'événement, puis en bas de la fiche, indiquez "),
                            b('« Présent »'),
                            t(' ou '),
                            b('« Absent »'),
                            t(
                                '. Vous pouvez également préciser si vous partez avec le groupe ou si vous vous rendez directement au stade.',
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'modifier-reponse',
                question: 'Puis-je modifier ma réponse après coup ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [t('Oui, vous pouvez modifier votre réponse à tout moment.')],
                    },
                ],
            },
            {
                id: 'transport',
                question: 'La fonctionnalité Transport est-elle disponible ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t("Non, la fonctionnalité Transport n'est "),
                            b('pas encore disponible'),
                            t('. Elle sera intégrée dans une prochaine mise à jour.'),
                        ],
                    },
                ],
            },
        ],
    },

    /* ═══════ 6. Calendrier (2) ═══════ */
    {
        id: 'calendrier',
        icon: 'Calendar',
        title: 'Calendrier',
        items: [
            {
                id: 'calendrier-fonctionne',
                question: 'Comment fonctionne le calendrier ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Le calendrier affiche l'ensemble des jours où un événement est programmé. Cliquez sur un jour pour voir les événements, puis cliquez sur un événement pour en consulter les détails.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'calendrier-tous-roles',
                question: 'Le calendrier affiche-t-il les événements de tous mes rôles ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                'Oui. Si vous êtes à la fois coach, joueur et parent, le calendrier regroupe ',
                            ),
                            b('tous vos événements'),
                            t(' au même endroit, quel que soit le rôle concerné.'),
                        ],
                    },
                ],
            },
        ],
    },

    /* ═══════ 7. Notifications & Messagerie (8) ═══════ */
    {
        id: 'notifications-messagerie',
        icon: 'Bell',
        title: 'Notifications & Messagerie',
        items: [
            {
                id: 'cloche',
                question: "À quoi sert la cloche en haut de l'écran ?",
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "La cloche fonctionne comme sur Facebook. Toutes les notifications (acceptation de convocation, modification d'événement, etc.) s'y affichent, en plus de la notification push sur votre téléphone.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'notifs-coach',
                question: 'Quelles notifications reçoit un coach ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "Le coach reçoit une notification lorsqu'un joueur accepte ou décline une convocation.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'notifs-joueur',
                question: 'Quelles notifications reçoit un joueur ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                'Le joueur reçoit une notification lorsque le coach crée, modifie ou annule un événement.',
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'messagerie-ou',
                question: 'Où se trouve la messagerie ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                "La messagerie se situe à côté de la cloche, en haut de votre écran. Cliquez sur l'icône en bas à droite pour créer un nouveau message.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'conversations-coach',
                question: 'Quelles conversations sont disponibles pour un coach ?',
                answer: [
                    {
                        type: 'list',
                        items: [
                            [
                                b('Conversation du club'),
                                t(' – Échangez avec les autres coachs et le président.'),
                            ],
                            [b('Coachs'), t(' – Envoyez un message privé à un coach du club.')],
                            [
                                b('Équipes'),
                                t(
                                    " – Discutez avec l'ensemble des joueurs et parents d'une équipe.",
                                ),
                            ],
                        ],
                    },
                ],
            },
            {
                id: 'conversations-joueur',
                question: 'Quelles conversations sont disponibles pour un joueur ?',
                answer: [
                    {
                        type: 'list',
                        items: [
                            [
                                b('Conversation du club'),
                                t(
                                    ' – En mode consultation uniquement (lecture des échanges du staff).',
                                ),
                            ],
                            [
                                b('Coachs'),
                                t(' – Envoyez un message privé au(x) coach(s) de votre équipe.'),
                            ],
                            [
                                b('Équipes'),
                                t(
                                    " – Discutez avec l'ensemble des joueurs et parents de votre équipe.",
                                ),
                            ],
                        ],
                    },
                ],
            },
            {
                id: 'messagerie-identifier',
                question: 'Comment savoir à qui je parle dans la messagerie ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t('Lorsque vous ouvrez une conversation, le '),
                            b('nom du parent'),
                            t(' ainsi que le '),
                            b("nom de l'enfant"),
                            t(
                                " sont affichés, ce qui vous permet d'identifier clairement votre interlocuteur. C'est également le cas dans la conversation de groupe.",
                            ),
                        ],
                    },
                ],
            },
            {
                id: 'messagerie-photos',
                question: 'Puis-je envoyer des photos ou des vidéos ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t("Non, l'envoi de photos et de vidéos n'est "),
                            b('pas encore disponible'),
                            t(
                                ' dans la messagerie. Cette fonctionnalité pourra être intégrée dans une prochaine mise à jour.',
                            ),
                        ],
                    },
                ],
            },
        ],
    },

    /* ═══════ 8. Fonctionnalités à venir (2) ═══════ */
    {
        id: 'a-venir',
        icon: 'Rocket',
        title: 'Fonctionnalités à venir',
        items: [
            {
                id: 'fonctions-a-venir',
                question: 'Quelles fonctionnalités ne sont pas encore disponibles ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                'Les fonctionnalités suivantes sont en cours de développement et seront déployées lors des prochaines mises à jour :',
                            ),
                        ],
                    },
                    {
                        type: 'list',
                        items: [
                            [t('Les données sportives')],
                            [t('Le module Transport')],
                            [t("L'envoi de photos et vidéos dans la messagerie")],
                            [t("La composition d'équipe")],
                            [t('Les évaluations')],
                            [t('Le Nutri-Scan')],
                        ],
                    },
                ],
            },
            {
                id: 'frequence-maj',
                question: 'À quelle fréquence les mises à jour sont-elles prévues ?',
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t("Les mises à jour seront très fréquentes, avec un rythme prévu d'"),
                            b('environ tous les 15 jours'),
                            t('.'),
                        ],
                    },
                ],
            },
        ],
    },

    /* ═══════ 9. Contact (1) ═══════ */
    {
        id: 'contact',
        icon: 'Mail',
        title: 'Contact',
        items: [
            {
                id: 'contact-simplyfoot',
                question: "Comment contacter l'équipe SimplyFoot ?",
                answer: [
                    {
                        type: 'paragraph',
                        tokens: [
                            t(
                                'Pour toute question, suggestion ou problème, vous pouvez nous contacter :',
                            ),
                        ],
                    },
                    {
                        type: 'list',
                        items: [[mail('contact@simplyfoot.fr')], [phone('06 99 94 88 66')]],
                    },
                ],
            },
        ],
    },
];
