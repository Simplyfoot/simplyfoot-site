export default function CgvPage() {
  return (
    <main id="top" className="mx-auto max-w-4xl px-6 py-20">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
          SimplyFoot • CGV
          <span className="mx-1 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          Mis à jour le 13-10-2025
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Conditions Générales de Vente
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          Conditions applicables à la souscription et à l’utilisation des offres payantes de SimplyFoot.
        </p>
      </header>

      <section className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Éditeur</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              SimplyFoot — SAS<br />
              Capital social : 2 000 €<br />
              RCS : 991 139 171 R.C.S Paris<br />
              N° TVA : FR 89 991139171<br />
              Siège social : 60 rue François 1er, 75008 Paris
            </dd>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Contacts</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              Support & DPO :{" "}
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
              OVH SAS — 2 rue Kellermann, 59100 Roubaix, France<br />
              Tél :{" "}
              <a
                href="tel:+33972101007"
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
              >
                +33 (0)9 72 10 10 07
              </a>{" "}
              —{" "}
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
              « SimplyFoot » (solution SaaS pour la gestion des clubs de football amateurs)
            </dd>
          </div>
        </dl>
      </section>

      <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="legal prose prose-zinc max-w-none dark:prose-invert">
          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les modalités
            de commercialisation, de facturation et d’utilisation des services payants proposés par
            SimplyFoot, en complément des Conditions Générales d’Utilisation (CGU).
          </p>

          <h2>2. Champ d’application</h2>
          <p>
            Les CGV s’appliquent à toute souscription d’un abonnement ou d’un module payant sur
            l’application ou le site <strong>www.simplyfoot.fr</strong>, par tout club, association
            ou organisation cliente (ci-après le «&nbsp;Client&nbsp;»).
          </p>

          <h2>3. Offres et souscriptions</h2>
          <p>
            Les tarifs et fonctionnalités de chaque formule sont présentés sur le site au moment de
            la souscription. Le Client reconnaît avoir pris connaissance de l’offre choisie avant la
            validation. Toute souscription vaut acceptation sans réserve des présentes CGV.
          </p>

          <h2>4. Prix et facturation</h2>
          <ul>
            <li>
              Les prix sont indiqués en euros TTC et peuvent être modifiés à tout moment, sous
              réserve d’information préalable du Client.
            </li>
            <li>
              La facturation s’effectue selon la périodicité choisie (mensuelle ou annuelle). Toute
              période entamée est due intégralement.
            </li>
            <li>
              SimplyFoot transmet les factures par voie électronique à l’adresse fournie par le
              Client.
            </li>
          </ul>

          <h2>5. Modalités de paiement</h2>
          <p>
            Les paiements sont réalisés via des prestataires tiers sécurisés (ex. Stripe, PayPal,
            etc.). SimplyFoot ne stocke aucune donnée bancaire. En cas d’échec de paiement, le
            service pourra être suspendu jusqu’à régularisation.
          </p>

          <h2>6. Durée et renouvellement</h2>
          <p>
            Les abonnements sont conclus pour la durée choisie lors de la commande. Ils sont
            renouvelés automatiquement à l’échéance, sauf résiliation par le Client avant la date de
            reconduction.
          </p>

          <h2>7. Droit de rétractation</h2>
          <p>
            Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne
            s’applique pas aux services numériques pleinement exécutés avant la fin du délai de 14
            jours. Le Client professionnel renonce expressément à ce droit en accédant au Service dès
            la souscription.
          </p>

          <h2>8. Résiliation</h2>
          <p>
            Le Client peut résilier son abonnement à tout moment depuis son espace compte. La
            résiliation prend effet à la fin de la période en cours. Aucune restitution prorata
            temporis ne sera effectuée.
          </p>

          <h2>9. Suspension ou résiliation par SimplyFoot</h2>
          <p>
            SimplyFoot se réserve le droit de suspendre ou résilier un compte en cas de non-paiement,
            de manquement grave aux CGV/CGU, ou de tentative de fraude. Une notification préalable
            est adressée au Client sauf urgence manifeste.
          </p>

          <h2>10. Responsabilité</h2>
          <p>
            SimplyFoot met en œuvre tous les moyens nécessaires au bon fonctionnement du Service,
            sans obligation de résultat. En cas de préjudice direct prouvé, la responsabilité totale
            de SimplyFoot est limitée au montant payé par le Client au cours des 12 derniers mois.
          </p>

          <h2>11. Propriété intellectuelle</h2>
          <p>
            Les outils, interfaces, bases de données, visuels et codes sources du Service demeurent
            la propriété exclusive de SimplyFoot. Le Client obtient une licence d’usage non exclusive
            et non transférable pour la durée de l’abonnement.
          </p>

          <h2>12. Protection des données</h2>
          <p>
            Les données collectées pour la facturation et la gestion client sont traitées conformément
            au <a href="/confidentialite" className="text-emerald-700 dark:text-emerald-400 hover:underline">
              RGPD
            </a> et à la Politique de confidentialité. Le Client dispose d’un droit d’accès,
            de rectification et de suppression de ses données.
          </p>

          <h2>13. Force majeure</h2>
          <p>
            Aucune Partie ne pourra être tenue responsable en cas d’événement imprévisible et
            irrésistible empêchant l’exécution du contrat (panne réseau, incendie, décision
            administrative, catastrophe naturelle, etc.).
          </p>

          <h2>14. Modifications</h2>
          <p>
            SimplyFoot se réserve le droit de modifier les présentes CGV. Toute modification sera
            notifiée au Client par email ou via le tableau de bord avant son entrée en vigueur.
          </p>

          <h2>15. Droit applicable et litiges</h2>
          <p>
            Les présentes CGV sont régies par le droit français. En cas de litige, les parties
            rechercheront une solution amiable avant toute action judiciaire. À défaut,
            compétence exclusive est attribuée aux tribunaux du ressort du siège social de
            SimplyFoot.
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
    </main>
  );
}
