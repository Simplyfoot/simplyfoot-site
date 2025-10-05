// app/cgu/page.tsx (ou équivalent)
export default function Page() {
  return (
    <main id="top" className="mx-auto max-w-4xl px-6 py-20">
      {/* Hero */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
          SimplyFoot • CGU
          <span className="mx-1 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          Version 2025-10-05
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Conditions Générales d’Utilisation
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          Application web & mobile de gestion des clubs de football amateurs.
        </p>
      </header>

      {/* Cartouche d’infos */}
      <section className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Éditeur</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              SimplyFoot SAS – Capital : 2000 € – Siège : 60 rue François 1er 75008 Paris – RCS : 814 428 785 – SIREN : 991 139 171 – N° TVA : FR89991139171
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Contacts</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              Support : <a className="underline decoration-emerald-300 underline-offset-4" href="mailto:support@simplyfoot.app">contact@simplyfoot.fr</a><br />
              DPO : <a className="underline decoration-emerald-300 underline-offset-4" href="mailto:dpo@simplyfoot.app">dpo@simplyfoot.app</a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Hébergeur</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">[Français - OVH] </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Service</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">« SimplyFoot » (le « Service »)</dd>
          </div>
        </dl>
      </section>

      {/* Corps des CGU */}
      <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Si tu n'utilises pas @tailwindcss/typography, retire "prose ..." dessous */}
        <div className="prose prose-zinc max-w-none whitespace-pre-line dark:prose-invert">
{`SimplyFoot – Conditions Générales d’Utilisation (CGU)

Version : 2025-10-05
Éditeur : [Dénomination sociale] [forme : SAS] – Capital : [•] € – Siège : [•] – RCS : [•] – SIREN : [•] – N° TVA : [•]
Contact support : [support@simplyfoot.app] – DPO : [dpo@simplyfoot.app]
Hébergeur : [•] (situé dans l’UE)
Service : application web & mobile de gestion de clubs de football amateurs « SimplyFoot » (le « Service »).

1. Objet et hiérarchie contractuelle

Les présentes CGU encadrent l’accès et l’usage du Service par l’ensemble des utilisateurs. Elles forment, avec les Conditions Générales de Vente (CGV), la Politique de confidentialité, la Politique Cookies et, le cas échéant, les Conditions Spécifiques Modules (cf. § 20) et l’Accord de Sous-traitance RGPD (Annexe A), l’ensemble contractuel applicable (l’« Accord »). En cas de conflit, l’ordre de priorité est : (1) Conditions Spécifiques modules, (2) CGV, (3) CGU, (4) Politique de confidentialité, (5) Politique Cookies.

2. Définitions clés

Club : personne morale (association/entreprise) souscrivant une offre.
Administrateur Club : utilisateur mandaté par le Club pour créer/configurer le compte Club, gérer les droits et la facturation.
Coach : utilisateur désigné par le Club pour gérer équipes, convocations, évaluations.
Parent/Joueur : utilisateur final lié à une équipe.
Utilisateur : toute personne accédant au Service.
Données Club : données importées ou générées par/au nom du Club (dont données personnelles).
Sous-traitant : SimplyFoot au sens de l’art. 28 RGPD pour les traitements réalisés pour le compte des Clubs.

3. Acceptation

La création d’un compte ou l’utilisation du Service emporte acceptation sans réserve des CGU par l’Utilisateur et, pour les Clubs, par leur représentant dûment habilité. Les CGU sont accessibles à tout moment depuis l’application et le site.

4. Comptes & sécurité

4.1 Création : l’Administrateur Club fournit des informations exactes et à jour. Les comptes Parent/Joueur sont créés via des invitations ou codes fournis par le Club.
4.2 Identifiants : strictement personnels. L’Utilisateur veille à la confidentialité et notifie immédiatement toute suspicion d’accès non autorisé.
4.3 Vérifications : SimplyFoot peut demander des justificatifs (ex. mandat du président, identité) en cas de doute légitime.
4.4 Âge minimum : l’ouverture d’un compte par un mineur requiert l’autorisation et la gestion par un parent/tuteur conformément au § 10 (minors & consentement).

5. Licence d’utilisation

Sous réserve du paiement applicable (cf. CGV), SimplyFoot concède au Club et à ses Utilisateurs une licence limitée, non exclusive, non transférable et révocable d’accès et d’usage du Service, pour les seuls besoins internes du Club. Toute autre exploitation (location, prêt, revente, ingénierie inverse hors exceptions légales) est interdite.

6. Règles d’usage acceptable

Sont notamment interdits : (i) toute atteinte aux lois, aux droits de tiers (image, propriété intellectuelle, données), (ii) le contournement de mesures de sécurité, (iii) le spam, scraping massif, surcharge anormale, (iv) la publication de contenus haineux, violents, pornographiques, discriminatoires, ou portant atteinte aux mineurs, (v) l’utilisation du Service pour organiser des activités illicites. SimplyFoot peut retirer/suspendre tout contenu ou accès en cas de violation manifeste.

7. Contenus et droits concédés par les Utilisateurs

Les Utilisateurs conservent leurs droits sur les contenus qu’ils publient (ex. photos d’équipe). En publiant, ils concèdent au Club et à SimplyFoot une licence mondiale, non exclusive, gratuite pour héberger, afficher et traiter ces contenus aux seules fins de fourniture du Service. Le Club garantit qu’il détient les autorisations nécessaires (droit à l’image, autorisation parentale le cas échéant) et s’engage à retirer tout contenu litigieux sur demande fondée.

8. Propriété intellectuelle de SimplyFoot

Le Service (logiciels, bases de données, visuels, marques, documents, APIs) demeure la propriété exclusive de SimplyFoot et/ou de ses concédants. Aucun droit autre que la licence d’usage n’est accordé. Les retours et suggestions d’amélioration peuvent être librement utilisés par SimplyFoot sans obligation.

9. Confidentialité

Les Parties s’engagent à préserver la confidentialité des informations non publiques reçues de l’autre Partie dans le cadre du Service (plans d’équipes, stratégies sportives, données commerciales), à ne les utiliser qu’aux fins du présent Accord et à les protéger avec un soin raisonnable.

10. Protection des données personnelles (RGPD)

10.1 Rôles : pour les Données Club (joueurs, parents, encadrants), le Club est Responsable de traitement ; SimplyFoot agit en Sous-traitant. Pour certaines données nécessaires au fonctionnement (comptes administrateurs, logs techniques, analytics), SimplyFoot peut agir en Responsable de traitement ; voir Politique de confidentialité.
10.2 Accord de sous-traitance : les obligations RGPD détaillées (instructions, sécurité, notification de violation, assistance aux droits, audits, sous-traitants, transferts hors UE, fin de contrat) sont précisées en Annexe A.
10.3 Mineurs : le Club s’assure d’un fondement légal approprié, notamment consentement du titulaire de l’autorité parentale pour l’utilisation d’images ou données sensibles (santé/bobo, contre-indications), et d’une minimisation stricte.
10.4 Sécurité : mesures techniques et organisationnelles proportionnées (chiffrement au repos/en transit, journalisation, contrôle d’accès, sauvegardes).
10.5 Données sensibles : par défaut, SimplyFoot n’exige aucun renseignement médical. Toute saisie facultative (ex. “blessure”, “contre-indication”) doit être strictement nécessaire et paramétrable par le Club.
10.6 Durées de conservation : comptes inactifs > [•] mois → suppression/archivage ; logs [•] mois ; sauvegardes chiffrées [•] jours.
10.7 Transferts : pas de transfert hors UE/EEE sans garanties adéquates (clauses types, localisation UE, etc.).
10.8 Contact DPO : [dpo@simplyfoot.app].

11. Disponibilité, maintenance, évolutions

Objectif de disponibilité : 99,5 %/mois hors fenêtres de maintenance planifiées. Maintenance avec préavis raisonnable (sauf urgence). Des versions bêta peuvent être proposées « en l’état », sans engagement de pérennité. Le périmètre des fonctionnalités peut évoluer afin d’améliorer le Service.

12. Support

Support via [support@simplyfoot.app]. Délais cibles : Standard : J+1 ouvré, Critique : 4 heures ouvrées. Les clubs des offres supérieures peuvent bénéficier de canaux prioritaires (cf. CGV/SLA – Annexe B).

13. Services tiers

Certaines fonctions reposent sur des prestataires tiers (ex. paiement, envoi d’e-mails/SMS, hébergement). Leur utilisation est régie par leurs propres conditions. SimplyFoot ne peut être tenue responsable des indisponibilités imputables à ces services.

14. Tarifs

Les modalités de prix, d’abonnement et de facturation relèvent des CGV. Des frais additionnels peuvent s’appliquer pour des modules optionnels (ex. Paiements/« Buvette », Billetterie).

15. Suspension

SimplyFoot peut suspendre tout ou partie de l’accès : (i) en cas de manquement grave, (ii) de risques de sécurité, (iii) de non-paiement, après notification préalable raisonnable lorsque la situation le permet.

16. Durée – résiliation

Les CGU s’appliquent pendant toute la durée d’utilisation du Service. Le Club peut mettre fin à l’abonnement selon les conditions prévues aux CGV. En cas de résiliation, voir § 17 Réversibilité.

17. Réversibilité et restitution des Données

Pendant 30 jours à compter de la résiliation, le Club peut exporter ses Données via les outils disponibles ou en demander la restitution dans un format standard (frais éventuels si assistance spécifique). À l’issue de ce délai, les Données sont supprimées/anonymisées des systèmes actifs et des sauvegardes au fil de leur cycle d’expiration.

18. Garantie – responsabilité

Le Service est fourni en l’état et selon les standards de l’art. SimplyFoot ne garantit pas l’absence d’anomalies ni l’adéquation à un besoin particulier. Responsabilité limitée : tous chefs de préjudice confondus, au montant total des sommes perçues des 12 derniers mois pour le Club concerné. Exclusions : pertes indirectes (chiffre d’affaires, image, données non sauvegardées par le Club). Rien n’exclut les responsabilités qui ne peuvent l’être par la loi.

19. Force majeure

Aucune Partie n’est responsable d’un manquement dû à un événement imprévisible et irrésistible (ex. panne réseau majeure, catastrophe naturelle, décision administrative), la Partie affectée notifiant l’autre sans délai.

20. Conditions spécifiques Modules (exemples)

20.1 Module Paiements / « Buvette » & Billetterie : opéré via un prestataire de paiement agréé. Des frais de passerelle et éventuellement une commission plateforme [• %] s’appliquent (cf. CGV). Conformité LCB-FT/KYC requise.
20.2 Module Messagerie : contenu modéré a posteriori ; signalement intégré ; interdiction de messages non sollicités.
20.3 Module Médical (si activé) : champs facultatifs, accès restreint, journalisation ; aucune décision automatisée à effet juridique.

21. Modifications des CGU

SimplyFoot peut modifier les CGU pour tenir compte des évolutions légales/techniques. En cas de changement substantiel, information préalable et, le cas échéant, recueil d’acceptation. La poursuite de l’usage vaut acceptation.

22. Droit applicable – litiges – médiation

Droit français. Tentative de résolution amiable préalable. Consommateurs : possibilité de recourir gratuitement au médiateur de la consommation [à compléter]. Compétence : tribunaux du ressort du siège social de SimplyFoot, sous réserve de dispositions impératives contraires.

23. Mentions légales & contact

Mentions légales complètes disponibles sur le site. Contact : [contact@simplyfoot.fr].`}
        </div>
      </article>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span
          className="inline-flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          title="Bouton d’exemple. Pour le rendre interactif, passe en Client Component."
        >
          Télécharger en PDF (désactivé)
        </span>
        <a
          href="#top"
          className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Haut de page
        </a>
      </div>
    </main>
  );
}

