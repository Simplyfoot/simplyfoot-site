export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
}

export const footFaq: FaqCategory[] = [
  {
    id: 'inscription',
    title: 'Inscription & Compte',
    icon: 'UserPlus',
    items: [
      {
        question: 'Comment cr\u00e9er mon compte SimplyFoot ?',
        answer: "Renseignez votre adresse e-mail ainsi qu'un mot de passe, puis cliquez sur \u00ab S'inscrire \u00bb. Vous pouvez \u00e9galement vous inscrire via votre compte Google ou Apple.",
      },
      {
        question: 'La connexion via Google ne fonctionne pas, que faire ?',
        answer: "Pour vous inscrire via Google, il est n\u00e9cessaire que Chrome soit d\u00e9fini comme navigateur par d\u00e9faut sur votre t\u00e9l\u00e9phone. Si un autre navigateur est utilis\u00e9 (par exemple Opera ou Samsung Internet), la connexion Google peut \u00e9chouer. Vous pouvez dans ce cas vous inscrire classiquement avec un e-mail et un mot de passe.",
      },
      {
        question: 'Comment rejoindre mon club ?',
        answer: "Apr\u00e8s la cr\u00e9ation de votre compte, vous pouvez rejoindre un club de trois mani\u00e8res :\n\u2022 En tant que joueur ou coach : saisissez le code club fourni par le pr\u00e9sident.\n\u2022 En tant que repr\u00e9sentant l\u00e9gal : renseignez vos informations puis le code \u00e9quipe fourni par le coach, ainsi que les informations de votre enfant.\n\u2022 Les deux : combinez les deux d\u00e9marches.",
      },
      {
        question: 'O\u00f9 trouver le code club ?',
        answer: "Le code club est fourni par le pr\u00e9sident du club. Pour les clubs pilotes, ce code est communiqu\u00e9 directement par l'\u00e9quipe SimplyFoot.",
      },
      {
        question: 'O\u00f9 trouver le code \u00e9quipe ?',
        answer: "Le code \u00e9quipe est visible sur l'\u00e9tiquette de l'\u00e9quipe dans le tableau de bord du coach. Le coach peut le copier en un clic et vous le transmettre.",
      },
      {
        question: 'Puis-je \u00eatre \u00e0 la fois coach, joueur et parent ?',
        answer: "Oui. SimplyFoot g\u00e8re le multi-r\u00f4le. Vous pouvez \u00eatre coach, joueur, parent d'un enfant joueur, et basculer entre vos diff\u00e9rents profils en un clic, sans vous d\u00e9connecter.",
      },
      {
        question: 'Comment basculer entre mes diff\u00e9rents profils ?',
        answer: "En haut de l'\u00e9cran, \u00e0 c\u00f4t\u00e9 de votre photo de profil, cliquez sur le logo \u00e0 droite. Vous verrez alors tous vos r\u00f4les et pourrez switcher entre eux instantan\u00e9ment.",
      },
      {
        question: 'Comment modifier mes informations personnelles ?',
        answer: "Cliquez sur la roue crant\u00e9e en haut \u00e0 droite, puis sur \u00ab Informations personnelles \u00bb. Vous pouvez modifier votre nom, date de naissance, e-mail, ajouter une photo de profil, ou g\u00e9rer le profil de votre enfant.",
      },
      {
        question: 'Comment modifier mon mot de passe ?',
        answer: "Cliquez sur la roue crant\u00e9e en haut \u00e0 droite, puis sur \u00ab Modifier votre mot de passe \u00bb.",
      },
      {
        question: 'Comment changer de club ?',
        answer: "Dans les param\u00e8tres, cliquez sur \u00ab G\u00e9rer vos r\u00f4les \u00bb. Vous pouvez quitter votre r\u00f4le actuel \u00e0 tout moment, puis rejoindre un nouveau club \u00e0 l'aide du code club correspondant.",
      },
      {
        question: 'Comment d\u00e9sactiver mon compte ?',
        answer: "Rendez-vous dans les param\u00e8tres, puis dans \u00ab Informations personnelles \u00bb. En bas de cette page, vous trouverez l'option pour d\u00e9sactiver votre compte.",
      },
    ],
  },
  {
    id: 'parents',
    title: 'Parents s\u00e9par\u00e9s',
    icon: 'Users',
    items: [
      {
        question: 'Nous sommes parents s\u00e9par\u00e9s, comment \u00e9viter les doublons ?',
        answer: "Un des parents inscrit l'enfant normalement. Le coach g\u00e9n\u00e8re ensuite un code de rattachement sp\u00e9cifique \u00e0 cet enfant depuis sa fiche. Ce code est transmis au second parent, qui lors de son inscription clique sur \u00ab Lier un enfant \u00bb et saisit le code. Le second parent est alors rattach\u00e9 automatiquement, sans cr\u00e9er de doublon.",
      },
      {
        question: 'Devons-nous partager un e-mail ou un mot de passe ?',
        answer: "Non. Chaque parent dispose de son propre compte ind\u00e9pendant. Aucun partage d'identifiants n'est n\u00e9cessaire.",
      },
      {
        question: 'O\u00f9 le coach g\u00e9n\u00e8re-t-il le code de rattachement ?',
        answer: "Le coach acc\u00e8de \u00e0 la fiche du joueur via l'onglet \u00ab \u00c9quipes \u00bb, puis clique sur le joueur concern\u00e9. Un bouton \u00ab G\u00e9n\u00e9rer un code \u00bb est disponible dans la section \u00ab Code de rattachement \u00bb. Ce code est \u00e0 usage unique.",
      },
    ],
  },
  {
    id: 'coach-equipes',
    title: 'Coach \u2013 Gestion des \u00e9quipes',
    icon: 'ClipboardList',
    items: [
      {
        question: 'Comment cr\u00e9er une \u00e9quipe ?',
        answer: "Depuis votre tableau de bord, cliquez sur \u00ab Cr\u00e9er une \u00e9quipe \u00bb. Renseignez un nom ou surnom (Groupe 1, \u00c9quipe A\u2026), s\u00e9lectionnez la cat\u00e9gorie et le genre, puis validez. Un code \u00e9quipe sera automatiquement g\u00e9n\u00e9r\u00e9.",
      },
      {
        question: 'Comment transmettre le code \u00e9quipe ?',
        answer: "Le code \u00e9quipe appara\u00eet sur l'\u00e9tiquette de votre \u00e9quipe dans le tableau de bord. Cliquez dessus pour le copier, puis transmettez-le aux joueurs ou parents concern\u00e9s.",
      },
      {
        question: 'Comment rejoindre une \u00e9quipe en tant que second coach ?',
        answer: "Cliquez sur \u00ab Cr\u00e9er une \u00e9quipe \u00bb, puis en bas de l'\u00e9cran, s\u00e9lectionnez \u00ab Rejoindre une \u00e9quipe en tant que coach \u00bb. Saisissez le code \u00e9quipe fourni par le coach principal.",
      },
      {
        question: 'Comment acc\u00e9der aux fiches de mes joueurs ?',
        answer: "Cliquez sur l'onglet \u00ab \u00c9quipes \u00bb, puis sur le joueur souhait\u00e9. Vous acc\u00e9dez \u00e0 ses informations personnelles et aux coordonn\u00e9es de ses repr\u00e9sentants l\u00e9gaux. En touchant l'adresse e-mail, l'application propose d'envoyer un e-mail. En touchant le num\u00e9ro de t\u00e9l\u00e9phone, celui-ci se compose automatiquement.",
      },
    ],
  },
  {
    id: 'coach-evenements',
    title: 'Coach \u2013 \u00c9v\u00e9nements & Convocations',
    icon: 'CalendarPlus',
    items: [
      {
        question: 'Comment cr\u00e9er un \u00e9v\u00e9nement ?',
        answer: "Cliquez sur le bouton \u00ab + \u00bb ou sur \u00ab Cr\u00e9er un \u00e9v\u00e9nement \u00bb. Renseignez le titre, l'\u00e9quipe concern\u00e9e, le type de rencontre, la date et l'heure de d\u00e9but et de fin.",
      },
      {
        question: "Comment envoyer un \u00e9v\u00e9nement \u00e0 tout le club ?",
        answer: "Lors de la cr\u00e9ation, s\u00e9lectionnez toutes les \u00e9quipes du club. L'\u00e9v\u00e9nement sera envoy\u00e9 \u00e0 l'ensemble des membres. C'est id\u00e9al pour les repas de No\u00ebl, lotos, etc.",
      },
      {
        question: "Quelle diff\u00e9rence entre un \u00e9v\u00e9nement classique et une convocation ?",
        answer: "Si vous cochez l'option \u00ab Convocation \u00bb, seuls les joueurs que vous s\u00e9lectionnerez verront cet \u00e9v\u00e9nement et pourront y participer. Sans cette option (entra\u00eenement par exemple), toute l'\u00e9quipe voit l'\u00e9v\u00e9nement.",
      },
      {
        question: "Comment cr\u00e9er un entra\u00eenement r\u00e9current ?",
        answer: "Cochez \u00ab Cr\u00e9er un \u00e9v\u00e9nement r\u00e9current \u00bb. S\u00e9lectionnez le jour et les horaires (par exemple mardi de 17h30 \u00e0 19h30) sur une p\u00e9riode donn\u00e9e. Un \u00e9v\u00e9nement sera automatiquement cr\u00e9\u00e9 chaque semaine.",
      },
      {
        question: "Puis-je modifier un \u00e9v\u00e9nement apr\u00e8s sa cr\u00e9ation ?",
        answer: "Oui. Cliquez sur l'\u00e9v\u00e9nement pour acc\u00e9der \u00e0 sa fiche. Vous pouvez modifier tous les \u00e9l\u00e9ments \u00e0 tout moment : lieu, adversaire, horaire, date, etc.",
      },
      {
        question: "Comment annuler un \u00e9v\u00e9nement ?",
        answer: "Vous pouvez annuler un \u00e9v\u00e9nement \u00e0 tout moment. Les joueurs verront toujours l'\u00e9v\u00e9nement, mais avec la mention \u00ab Annul\u00e9 \u00bb clairement affich\u00e9e.",
      },
      {
        question: 'Comment envoyer les convocations ?',
        answer: "Cliquez sur le compteur de participations en haut \u00e0 droite de l'\u00e9v\u00e9nement. Depuis cet onglet, s\u00e9lectionnez vos joueurs un par un ou tous \u00e0 la fois, puis validez.",
      },
      {
        question: 'Comment suivre les r\u00e9ponses des joueurs ?',
        answer: "Dans l'onglet participations, vous voyez le d\u00e9compte (par exemple 12/14) et l'indicateur en face de chaque joueur :\n\u2022 Coche verte = pr\u00e9sent\n\u2022 Croix rouge = absent\n\u2022 Petite voiture = se rend directement au stade de fa\u00e7on autonome.",
      },
      {
        question: "Un joueur n'a pas acc\u00e8s \u00e0 son t\u00e9l\u00e9phone, puis-je r\u00e9pondre pour lui ?",
        answer: "\u00c0 droite de la barre de recherche, cliquez sur le petit crayon pour passer en mode modification. Vous pouvez alors valider la pr\u00e9sence, l'absence, ou indiquer que le joueur se rend directement au stade.",
      },
      {
        question: "Que signifie l'ic\u00f4ne \u00ab petite voiture \u00bb ?",
        answer: "Elle signifie que le joueur (ou son parent) se rend directement au stade par ses propres moyens, sans passer par le point de rendez-vous du groupe. Le coach sait ainsi qu'il ne doit pas l'attendre au d\u00e9part.",
      },
    ],
  },
  {
    id: 'joueur',
    title: 'Joueur',
    icon: 'User',
    items: [
      {
        question: 'Comment voir les prochains \u00e9v\u00e9nements ?',
        answer: "Sur votre page d'accueil, vous retrouvez les prochains \u00e9v\u00e9nements ainsi que votre r\u00e9ponse pour chacun d'eux : pr\u00e9sent, absent, ou non r\u00e9pondu.",
      },
      {
        question: 'Comment r\u00e9pondre \u00e0 une convocation ?',
        answer: "Cliquez sur l'\u00e9v\u00e9nement, puis en bas de la fiche, indiquez \u00ab Pr\u00e9sent \u00bb ou \u00ab Absent \u00bb. Vous pouvez \u00e9galement pr\u00e9ciser si vous partez avec le groupe ou si vous vous rendez directement au stade.",
      },
      {
        question: 'Puis-je modifier ma r\u00e9ponse apr\u00e8s coup ?',
        answer: 'Oui, vous pouvez modifier votre r\u00e9ponse \u00e0 tout moment.',
      },
    ],
  },
  {
    id: 'calendrier',
    title: 'Calendrier',
    icon: 'Calendar',
    items: [
      {
        question: 'Comment fonctionne le calendrier ?',
        answer: "Le calendrier affiche l'ensemble des jours o\u00f9 un \u00e9v\u00e9nement est programm\u00e9. Cliquez sur un jour pour voir les \u00e9v\u00e9nements, puis cliquez sur un \u00e9v\u00e9nement pour en consulter les d\u00e9tails.",
      },
      {
        question: "Le calendrier affiche-t-il les \u00e9v\u00e9nements de tous mes r\u00f4les ?",
        answer: "Oui. Si vous \u00eates \u00e0 la fois coach, joueur et parent, le calendrier regroupe tous vos \u00e9v\u00e9nements au m\u00eame endroit, quel que soit le r\u00f4le concern\u00e9.",
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications & Messagerie',
    icon: 'Bell',
    items: [
      {
        question: "\u00c0 quoi sert la cloche en haut de l'\u00e9cran ?",
        answer: "La cloche fonctionne comme sur Facebook. Toutes les notifications (acceptation de convocation, modification d'\u00e9v\u00e9nement, etc.) s'y affichent, en plus de la notification push sur votre t\u00e9l\u00e9phone.",
      },
      {
        question: 'Quelles notifications re\u00e7oit un coach ?',
        answer: "Le coach re\u00e7oit une notification lorsqu'un joueur accepte ou d\u00e9cline une convocation.",
      },
      {
        question: 'Quelles notifications re\u00e7oit un joueur ?',
        answer: "Le joueur re\u00e7oit une notification lorsque le coach cr\u00e9e, modifie ou annule un \u00e9v\u00e9nement.",
      },
      {
        question: 'O\u00f9 se trouve la messagerie ?',
        answer: "La messagerie se situe \u00e0 c\u00f4t\u00e9 de la cloche, en haut de votre \u00e9cran. Cliquez sur l'ic\u00f4ne en bas \u00e0 droite pour cr\u00e9er un nouveau message.",
      },
      {
        question: 'Quelles conversations sont disponibles pour un coach ?',
        answer: "\u2022 Conversation du club \u2014 \u00c9changez avec les autres coachs et le pr\u00e9sident.\n\u2022 Coachs \u2014 Envoyez un message priv\u00e9 \u00e0 un coach du club.\n\u2022 \u00c9quipes \u2014 Discutez avec l'ensemble des joueurs et parents d'une \u00e9quipe.",
      },
      {
        question: 'Quelles conversations sont disponibles pour un joueur ?',
        answer: "\u2022 Conversation du club \u2014 En mode consultation uniquement.\n\u2022 Coachs \u2014 Envoyez un message priv\u00e9 au(x) coach(s) de votre \u00e9quipe.\n\u2022 \u00c9quipes \u2014 Discutez avec l'ensemble des joueurs et parents de votre \u00e9quipe.",
      },
    ],
  },
  {
    id: 'a-venir',
    title: 'Fonctionnalit\u00e9s \u00e0 venir',
    icon: 'Rocket',
    items: [
      {
        question: 'Quelles fonctionnalit\u00e9s ne sont pas encore disponibles ?',
        answer: "Les fonctionnalit\u00e9s suivantes sont en cours de d\u00e9veloppement :\n\u2022 Les donn\u00e9es sportives\n\u2022 Le module Transport\n\u2022 L'envoi de photos et vid\u00e9os dans la messagerie\n\u2022 La composition d'\u00e9quipe\n\u2022 Les \u00e9valuations\n\u2022 Le Nutri-Scan",
      },
      {
        question: '\u00c0 quelle fr\u00e9quence les mises \u00e0 jour sont-elles pr\u00e9vues ?',
        answer: "Les mises \u00e0 jour sont tr\u00e8s fr\u00e9quentes, avec un rythme d'environ tous les 15 jours.",
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: 'Mail',
    items: [
      {
        question: "Comment contacter l'\u00e9quipe SimplyFoot ?",
        answer: "Pour toute question, suggestion ou probl\u00e8me :\n\u2709 contact@simplyfoot.fr\n\u260e 06 99 94 88 66",
      },
    ],
  },
];
