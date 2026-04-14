import { buildPlatformMetadata } from 'lib/seo/metadata';

export const metadata = buildPlatformMetadata({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et gestion des cookies de la plateforme Simply. Vos données sont protégées.',
  path: '/confidentialite',
});

export default function PrivacyPage() {
  return (
    <div id="top" className="mx-auto max-w-4xl px-6 py-20">
      {/* Hero */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
          SimplyFoot • Confidentialité & Cookies
          <span className="mx-1 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          Mis à jour le 13-10-2025
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Politique de confidentialité & gestion des cookies
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          SimplyFoot accorde une grande importance à la protection de vos données personnelles et à
          la transparence sur leur utilisation.
        </p>
      </header>

      {/* Cartouche d’infos */}
      <section className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">
              Responsable du traitement
            </dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              SimplyFoot — SAS
              <br />
              Capital social : 2 000 €<br />
              RCS : 991 139 171 R.C.S Paris
              <br />
              Siège social : 60 rue François 1er, 75008 Paris
            </dd>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Contacts</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              Support & DPO :{' '}
              <a
                href="mailto:contact@simplyfoot.fr"
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
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
              « SimplyFoot » (application web & mobile de gestion des clubs de football amateurs)
            </dd>
          </div>
        </dl>
      </section>

      {/* Corps du texte */}
      <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="legal prose prose-zinc max-w-none dark:prose-invert">
          <h2>1. Finalités du traitement</h2>
          <p>
            SimplyFoot collecte et traite des données personnelles dans le cadre de la gestion des
            comptes utilisateurs, du fonctionnement des services (gestion d’équipe, messagerie,
            statistiques, facturation) et du support client.
          </p>

          <h2>2. Données collectées</h2>
          <p>
            Les données traitées concernent&nbsp;: identité, coordonnées, rôle dans le club,
            activité sportive, statistiques, et données techniques de connexion. Aucune donnée
            sensible (santé, religion, opinions) n’est collectée sans consentement explicite.
          </p>

          <h2>3. Base légale</h2>
          <p>
            Le traitement repose sur&nbsp;: (a) l’exécution d’un contrat (utilisation du Service),
            (b) le consentement (newsletter, cookies), et (c) l’intérêt légitime de SimplyFoot
            (amélioration du Service, sécurité, prévention de la fraude).
          </p>

          <h2>4. Destinataires</h2>
          <p>
            Les données sont destinées à SimplyFoot et à ses sous-traitants techniques (hébergeur,
            prestataires d’e-mails, paiement sécurisé). Aucune donnée n’est vendue à des tiers.
          </p>

          <h2>5. Durée de conservation</h2>
          <p>
            Les données sont conservées le temps nécessaire à la fourniture du Service, puis
            supprimées ou anonymisées après 24 mois d’inactivité, sauf obligation légale contraire.
          </p>

          <h2>6. Sécurité</h2>
          <p>
            SimplyFoot met en œuvre des mesures de sécurité adaptées : chiffrement des données,
            sauvegardes, journalisation, contrôle d’accès et audits réguliers.
          </p>

          <h2>7. Vos droits</h2>
          <ul>
            <li>Droit d’accès, de rectification et de suppression</li>
            <li>Droit à la portabilité</li>
            <li>Droit d’opposition et de limitation</li>
            <li>Droit de définir le sort de vos données après décès</li>
          </ul>
          <p>
            Pour exercer vos droits, contactez-nous à{' '}
            <a
              href="mailto:contact@simplyfoot.fr"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              contact@simplyfoot.fr
            </a>
            .
          </p>

          <h2>8. Transferts hors UE</h2>
          <p>
            SimplyFoot héberge et traite toutes les données au sein de l’Union Européenne. Aucun
            transfert hors UE n’est effectué sans garanties adéquates (clauses types, sous-traitants
            conformes au RGPD).
          </p>

          {/* ANCRE pour #cookies */}
          <h2 id="cookies" className="scroll-mt-24">
            9. Gestion des cookies
          </h2>
          <p>
            Lors de votre navigation sur le site ou l’application, des cookies peuvent être déposés
            sur votre appareil afin d’assurer le bon fonctionnement du site, mesurer la
            fréquentation et améliorer votre expérience utilisateur.
          </p>

          <h3>Cookies nécessaires</h3>
          <p>
            Ces cookies garantissent le bon fonctionnement du site (authentification, langue,
            sécurité). Ils ne nécessitent pas de consentement.
          </p>

          <h3>Cookies analytiques</h3>
          <p>
            SimplyFoot utilise des outils d’analyse anonymisés (par ex. Matomo, Plausible) afin
            d’évaluer la fréquentation et l’usage du site. Vous pouvez refuser ces cookies via le
            bandeau de consentement.
          </p>

          <h3>Gestion du consentement</h3>
          <p>
            Lors de votre première visite, un bandeau vous permet d’accepter ou refuser les cookies
            non essentiels. Vous pouvez modifier vos préférences à tout moment en cliquant sur le
            lien{' '}
            <a href="#cookies" className="text-emerald-700 dark:text-emerald-400 hover:underline">
              Gestion des cookies
            </a>
            .
          </p>

          <h2>10. Modifications</h2>
          <p>
            SimplyFoot peut mettre à jour la présente politique à tout moment. La date de dernière
            mise à jour figure en haut de la page.
          </p>

          <h2>11. Réclamations</h2>
          <p>
            En cas de désaccord sur le traitement de vos données, vous pouvez saisir la{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              CNIL (Commission Nationale de l’Informatique et des Libertés)
            </a>
            .
          </p>

          <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} SimplyFoot – Tous droits réservés.
          </p>
        </div>
      </article>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
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
