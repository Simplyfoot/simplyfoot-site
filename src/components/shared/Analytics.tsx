import Script from 'next/script';

/**
 * Mesure d'audience Umami (auto-hébergé) — sans cookie, donc sans bandeau de
 * consentement RGPD/CNIL.
 *
 * Le tracking ne s'active que si les deux variables d'environnement sont
 * définies. En local (variables vides) le composant ne rend rien, ce qui évite
 * de polluer les statistiques avec le trafic de développement.
 *
 * - NEXT_PUBLIC_UMAMI_SRC        : URL du script de ton instance Umami
 *                                  (ex: https://stats.simplyfoot.app/script.js)
 * - NEXT_PUBLIC_UMAMI_WEBSITE_ID : identifiant du site créé dans Umami
 */
const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC;
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export function Analytics() {
    if (!UMAMI_SRC || !UMAMI_WEBSITE_ID) {
        return null;
    }

    return (
        <Script src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />
    );
}
