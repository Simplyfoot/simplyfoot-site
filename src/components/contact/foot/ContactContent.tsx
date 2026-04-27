import { ContactForm } from './ContactForm';
import { ContactHero } from './ContactHero';

/**
 * Page contact — version sobre. Hero + formulaire détaillé, rien d'autre.
 * Le formulaire embarque sa propre validation Zod, ses messages d'erreur
 * localisés et un toast de confirmation : c'est lui qui fait le travail,
 * la page n'a pas besoin de l'entourer de canaux alternatifs ni de
 * coordonnées.
 *
 * Ancien flux (canaux, hotline WhatsApp, sidebar coordonnées, sociaux,
 * mini-FAQ, dialog Simmo) retiré volontairement — décision produit du
 * 2026-04-27 : revenir à l'essentiel tant que les canaux secondaires ne
 * sont pas tous opérationnels.
 */
export function ContactContent() {
    return (
        <>
            <ContactHero />
            <section
                aria-labelledby="contact-form-heading"
                className="bg-secondary-50 text-story-ink w-full scroll-mt-24"
            >
                <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 md:py-24">
                    <ContactForm />
                </div>
            </section>
        </>
    );
}
