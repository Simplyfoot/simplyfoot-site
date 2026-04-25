import { ContactChannels } from './ContactChannels';
import { ContactFormSection } from './ContactFormSection';
import { ContactHero } from './ContactHero';
import { ContactMiniFaq } from './ContactMiniFaq';
import { ContactSocials } from './ContactSocials';
import { ContactWhatsApp } from './ContactWhatsApp';

/**
 * Orchestrateur de la page `/foot/contact`. Six sections dans un ordre
 * pensé conversion : on présente la promesse (Hero), on offre le choix
 * (Channels), on insiste sur le canal "nouveau" qui débloque le plus de
 * réponses (WhatsApp), on accueille la demande structurée (FormSection),
 * on prolonge la relation (Socials) et on ferme par un dernier filet
 * (MiniFaq + Simmo) pour ceux qui hésitent encore.
 */
export function ContactContent() {
    return (
        <>
            <ContactHero />
            <ContactChannels />
            <ContactWhatsApp />
            <ContactFormSection />
            <ContactSocials />
            <ContactMiniFaq />
        </>
    );
}
