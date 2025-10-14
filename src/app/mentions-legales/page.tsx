export default function LegalNoticesPage() {
  return (
    <main id="top" className="mx-auto max-w-4xl px-6 py-20">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
          SimplyFoot • Mentions légales
          <span className="mx-1 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          Mis à jour le 13-10-2025
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Mentions légales
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          Informations légales relatives à la société éditrice du site SimplyFoot.fr et à son hébergeur.
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
              Support :{" "}
              <a
                href="mailto:contact@simplyfoot.fr"
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
              >
                contact@simplyfoot.fr
              </a>
              <br />
              Téléphone :{" "}
              <a
                href="tel:+33682845641"
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
              >
                +33 6 82 84 56 41
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Hébergeur</dt>
            <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
              OVH SAS<br />
              Siège social : 2 rue Kellermann – 59100 Roubaix – France<br />
              Téléphone :{" "}
              <a
                href="tel:+33972101007"
                className="text-emerald-300 decoration-emerald-300 hover:text-emerald-700 hover:underline underline-offset-4 dark:hover:text-emerald-300"
              >
                +33 (0)9 72 10 10 07
              </a>
              <br />
              Site web :{" "}
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

      <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="legal prose prose-zinc max-w-none dark:prose-invert">
          <h2>1. Présentation du site</h2>
          <p>
            Le site <strong>www.simplyfoot.fr</strong> est édité par la société <strong>SimplyFoot SAS</strong>, au capital social de 2 000 €, immatriculée au RCS de Paris sous le numéro 991 139 171, dont le siège social est situé au 60 rue François 1er, 75008 Paris.
          </p>

          <h2>2. Objet</h2>
          <p>
            Les présentes mentions légales ont pour objet de définir les modalités de mise à
            disposition des informations et services proposés sur le site www.simplyfoot.fr et d’en
            informer les utilisateurs.
          </p>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L’ensemble des éléments présents sur le site (textes, images, graphismes, logo,
            structure, code, etc.) sont la propriété exclusive de SimplyFoot, sauf mention contraire.
            Toute reproduction, représentation, modification, publication ou adaptation, totale ou
            partielle, de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite
            sans autorisation écrite préalable de SimplyFoot.
          </p>

          <h2>4. Responsabilité</h2>
          <p>
            SimplyFoot s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées
            sur son site. Toutefois, la société ne saurait être tenue responsable d’erreurs,
            d’omissions ou d’une indisponibilité du service. L’utilisateur reconnaît utiliser le site
            sous sa responsabilité exclusive.
          </p>

          <h2>5. Données personnelles</h2>
          <p>
            SimplyFoot s’engage à ce que la collecte et le traitement de vos données soient
            conformes au <strong>Règlement Général sur la Protection des Données (RGPD)</strong> et
            à la <strong>loi Informatique et Libertés</strong>. Pour plus d’informations, consultez
            notre{" "}
            <a
              href="/confidentialite"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Politique de confidentialité
            </a>{" "}
            et notre{" "}
            <a
              href="/confidentialite#cookies"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Politique de gestion des cookies
            </a>
            .
          </p>

          <h2>6. Liens hypertextes</h2>
          <p>
            Le site SimplyFoot peut contenir des liens vers d’autres sites. SimplyFoot n’exerce
            aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur
            contenu ou à leurs pratiques en matière de protection des données personnelles.
          </p>

          <h2>7. Droit applicable</h2>
          <p>
            Le présent site est régi par le droit français. En cas de litige, et à défaut de solution
            amiable, compétence exclusive est attribuée aux tribunaux du ressort de Paris.
          </p>

          <h2>8. Contact</h2>
          <p>
            Pour toute question, remarque ou réclamation, vous pouvez nous contacter :
            <br />
            • Par téléphone :{" "}
            <a
              href="tel:+33682845641"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              +33 6 82 84 56 41
            </a>
            <br />
            • Par email :{" "}
            <a
              href="mailto:contact@simplyfoot.fr"
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              contact@simplyfoot.fr
            </a>
            <br />
            • Par courrier : SimplyFoot SAS, 60 rue François 1er, 75008 Paris
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
