import Link from 'next/link';
import { buildPlatformMetadata } from 'lib/seo/metadata';

export const metadata = buildPlatformMetadata({
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation de la plateforme Simply. Lisez nos CGU avant d'utiliser nos services.",
  path: '/cgu',
});

export default function CguPage() {
  return (
    <div id="top" className="mx-auto max-w-4xl px-6 py-20">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
          SimplyFoot • CGU
          <span className="mx-1 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          Mis à jour le 13-10-2025
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Conditions Générales d’Utilisation
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          Application web & mobile de gestion des clubs de football amateurs.
        </p>
      </header>

      <section className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Éditeur</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              SimplyFoot — SAS
              <br />
              Capital social : 2 000 €<br />
              RCS : 991 139 171 R.C.S Paris
              <br />
              N° TVA : FR 89 991139171
              <br />
              Siège social : 60 rue François 1er, 75008 Paris
            </dd>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Contacts</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              Support :{' '}
              <a
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
                href="mailto:contact@simplyfoot.fr"
              >
                contact@simplyfoot.fr
              </a>
              <br />
              DPO :{' '}
              <a
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
                href="mailto:contact@simplyfoot.fr"
              >
                contact@simplyfoot.fr
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Hébergeur</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              OVH SAS — 2 rue Kellermann, 59100 Roubaix, France
              <br />
              Tél :{' '}
              <a
                href="tel:+33972101007"
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
              >
                +33 (0)9 72 10 10 07
              </a>{' '}
              —{' '}
              <a
                href="https://www.ovhcloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
              >
                www.ovhcloud.com
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Service</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              « SimplyFoot » (le « Service »)
            </dd>
          </div>
        </dl>
      </section>

      <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="legal prose prose-zinc max-w-none dark:prose-invert">
          <h2>1. Objet et hiérarchie contractuelle</h2>
          <p>
            Les présentes CGU encadrent l’accès et l’usage du Service par l’ensemble des
            utilisateurs. Elles s’appliquent avec les CGV, la Politique de confidentialité, la
            Politique Cookies et, le cas échéant, des conditions spécifiques de modules. En cas de
            conflit&nbsp;: (1) Conditions spécifiques, (2) CGV, (3) CGU, (4) Politique de
            confidentialité, (5) Cookies.
          </p>

          <h2>2. Définitions</h2>
          <ul>
            <li>
              <strong>Club</strong> : personne morale souscrivant une offre.
            </li>
            <li>
              <strong>Administrateur Club</strong> : crée/configure le compte Club et gère droits &
              facturation.
            </li>
            <li>
              <strong>Coach</strong> : gère équipes, convocations, évaluations.
            </li>
            <li>
              <strong>Parent/Joueur</strong> : utilisateur final lié à une équipe.
            </li>
            <li>
              <strong>Données Club</strong> : données importées/générées pour le compte du Club.
            </li>
            <li>
              <strong>SimplyFoot</strong> : sous-traitant art. 28 RGPD pour les traitements des
              Clubs.
            </li>
          </ul>

          <h2>3. Acceptation</h2>
          <p>
            La création d’un compte ou l’utilisation du Service vaut acceptation sans réserve des
            CGU par l’Utilisateur et, pour les Clubs, par leur représentant habilité.
          </p>

          <h2>4. Comptes & sécurité</h2>
          <ol>
            <li>Création : informations exactes et à jour ; invitations pour Parent/Joueur.</li>
            <li>
              Identifiants : strictement personnels ; le titulaire notifie tout accès suspect.
            </li>
            <li>Vérifications : justificatifs possibles en cas de doute légitime.</li>
            <li>Âge : compte mineur géré/autorisé par un parent/tuteur.</li>
          </ol>

          <h2>5. Licence d’utilisation</h2>
          <p>
            Licence limitée, non exclusive et révocable pour les besoins internes du Club. Toute
            autre exploitation (revente, prêt, contournement, reverse engineering hors exceptions)
            est interdite.
          </p>

          <h2>6. Règles d’usage acceptable</h2>
          <p>
            Interdits : atteintes aux lois/droits, contournement sécurité, spam/scraping/surcharge,
            contenus haineux/violents/pornographiques/discriminatoires, usage illicite. SimplyFoot
            peut retirer/suspendre en cas de violation manifeste.
          </p>

          <h2>7. Contenus publiés</h2>
          <p>
            Les Utilisateurs conservent leurs droits. Ils concèdent au Club et à SimplyFoot une
            licence non exclusive et gratuite pour héberger/afficher/traiter les contenus afin de
            fournir le Service. Le Club garantit les autorisations (droit à l’image, autorisation
            parentale).
          </p>

          <h2>8. Propriété intellectuelle de SimplyFoot</h2>
          <p>
            Le Service (logiciels, bases, visuels, marques, docs, APIs) reste la propriété de
            SimplyFoot et/ou de ses concédants. Les suggestions peuvent être librement utilisées.
          </p>

          <h2>9. Confidentialité</h2>
          <p>
            Les Parties protègent les informations non publiques reçues, ne les utilisent qu’aux
            fins du présent Accord et les sécurisent raisonnablement.
          </p>

          <h2>10. Protection des données (RGPD)</h2>
          <ul>
            <li>
              <strong>Rôles</strong> : Club responsable de traitement ; SimplyFoot sous-traitant.
              Certaines données techniques/comptes admin peuvent relever de SimplyFoot responsable.
            </li>
            <li>
              <strong>Sous-traitance</strong> : sécurité, notification, assistance droits, audits,
              sous-traitants, transferts, fin de contrat (cf. annexe de sous-traitance).
            </li>
            <li>
              <strong>Mineurs</strong> : consentement/autorisation parentale si requis ;
              minimisation.
            </li>
            <li>
              <strong>Sécurité</strong> : chiffrement en transit/au repos, contrôle d’accès,
              sauvegardes.
            </li>
            <li>
              <strong>Conservation</strong> : comptes inactifs, logs, sauvegardes selon durées
              paramétrées.
            </li>
            <li>
              <strong>Transferts</strong> : pas de transfert hors UE/EEE sans garanties adéquates.
            </li>
            <li>
              <strong>Contact DPO</strong> :{' '}
              <a
                href="mailto:contact@simplyfoot.fr"
                className="text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                contact@simplyfoot.fr
              </a>
              .
            </li>
          </ul>

          <h2>11. Disponibilité, maintenance, évolutions</h2>
          <p>
            Objectif de disponibilité 99,5&nbsp;%/mois (hors maintenances planifiées). Les
            fonctionnalités peuvent évoluer pour améliorer le Service.
          </p>

          <h2>12. Support</h2>
          <p>
            Support via{' '}
            <a
              href="mailto:contact@simplyfoot.fr"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              contact@simplyfoot.fr
            </a>
            . Délais cibles : Standard J+1 ouvré ; Critique 4h ouvrées.
          </p>

          <h2>13. Services tiers</h2>
          <p>
            Certaines fonctions reposent sur des prestataires tiers (paiement, e-mail/SMS,
            hébergement) soumis à leurs conditions. SimplyFoot n’est pas responsable de leurs
            indisponibilités.
          </p>

          <h2>14. Tarifs</h2>
          <p>
            Prix, abonnements et facturation selon les CGV. Frais éventuels pour modules optionnels
            (ex. paiements/billetterie).
          </p>

          <h2>15. Suspension</h2>
          <p>
            Possible en cas de manquement grave, risque de sécurité ou non-paiement (avec
            notification quand la situation le permet).
          </p>

          <h2>16. Durée – résiliation</h2>
          <p>
            Applicables pendant l’usage du Service. Fin selon CGV. Voir réversibilité ci-dessous.
          </p>

          <h2>17. Réversibilité & restitution</h2>
          <p>
            Pendant 30 jours après résiliation&nbsp;: export via outils ou restitution (format
            standard). Ensuite, suppression/anonymisation progressive (cycle de sauvegardes).
          </p>

          <h2>18. Garantie – responsabilité</h2>
          <p>
            Service fourni «&nbsp;en l’état&nbsp;». Responsabilité limitée au total versé les 12
            derniers mois (exclusions&nbsp;: pertes indirectes, image, données non sauvegardées).
          </p>

          <h2>19. Force majeure</h2>
          <p>
            Aucune Partie n’est responsable en cas d’événement imprévisible et irrésistible
            (catastrophe, panne majeure, décision administrative).
          </p>

          <h2>20. Conditions spécifiques Modules</h2>
          <ul>
            <li>
              <strong>Paiements/Billetterie</strong> : via prestataire agréé, commissions possibles,
              exigences KYC/LCB-FT.
            </li>
            <li>
              <strong>Messagerie</strong> : modération a posteriori, signalement, anti-spam.
            </li>
            <li>
              <strong>Médical (optionnel)</strong> : champs limités, accès restreint, non
              décisionnel.
            </li>
          </ul>

          <h2>21. Modifications des CGU</h2>
          <p>
            En cas d’évolution légale/technique, information préalable et, si nécessaire, recueil
            d’acceptation. Poursuite d’usage = acceptation.
          </p>

          <h2>22. Droit applicable – litiges – médiation</h2>
          <p>
            Droit français. Recherche amiable préalable. Consommateurs&nbsp;: médiation de la
            consommation (à compléter). Compétence&nbsp;: tribunaux du ressort du siège de
            SimplyFoot, sous réserve des règles impératives.
          </p>

          <h2>23. Mentions légales & contact</h2>
          <p>
            Les{' '}
            <Link
              href="/mentions-legales"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              mentions légales
            </Link>{' '}
            sont disponibles sur le site. Contact&nbsp;:{' '}
            <a
              href="mailto:contact@simplyfoot.fr"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              contact@simplyfoot.fr
            </a>
            .
          </p>

          <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} SimplyFoot – Tous droits réservés.
          </p>
        </div>
      </article>

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
    </div>
  );
}
