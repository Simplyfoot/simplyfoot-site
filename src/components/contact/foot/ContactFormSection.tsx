import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';

/**
 * Section §4 — formulaire détaillé + sidebar infos pratiques. Layout
 * 2 colonnes desktop (form 2/3, sidebar 1/3 sticky), empilé mobile.
 *
 * L'ancre `#contact-form` est ciblée par la carte "Formulaire détaillé"
 * de `ContactChannels` (scroll smooth via le scroll-mt-* du wrapper).
 */
export function ContactFormSection() {
    return (
        <section
            id="contact-form"
            aria-labelledby="contact-form-heading"
            className="bg-secondary-50 text-story-ink w-full scroll-mt-24"
        >
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[2fr_1fr] lg:gap-14">
                <ContactForm />
                <ContactInfo />
            </div>
        </section>
    );
}
