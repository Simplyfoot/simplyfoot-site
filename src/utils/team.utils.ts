import type { BrandSlug } from '~types/brand.types';

export interface TeamMember {
    /** Identifiant stable utilisé comme clé i18n pour le rôle. */
    id: string;
    name: string;
    /** Chemin public de la photo. `null` si la photo n'est pas encore disponible. */
    photo: string | null;
    /** URL LinkedIn du membre. `null` si non renseignée. */
    linkedin: string | null;
}

const FOOT_TEAM: ReadonlyArray<TeamMember> = [
    {
        id: 'jeremy',
        name: 'Jérémy Baruc',
        photo: null,
        linkedin: 'https://www.linkedin.com/in/jeremy-baruc-90abb0146/',
    },
    {
        id: 'romain',
        name: 'Romain Pennacchio',
        photo: '/brands/common/Romain.png',
        linkedin: 'https://www.linkedin.com/in/romain-pennacchio-89142b161/',
    },
    {
        id: 'jean',
        name: 'Jean Carboni',
        photo: '/brands/common/Jean.png',
        linkedin: 'https://www.linkedin.com/in/jean-carboni-35621a122/',
    },
    {
        id: 'vanessa',
        name: 'Vanessa Rolland',
        photo: '/brands/common/Vanessa.jpeg',
        linkedin: 'https://www.linkedin.com/in/vanessa-rolland/',
    },
    {
        id: 'damien',
        name: 'Damien Alfaia',
        photo: null,
        linkedin: 'https://www.linkedin.com/in/damien-alfaia-bb0aa0186/',
    },
];

export const BRAND_TEAMS: Record<BrandSlug, ReadonlyArray<TeamMember>> = {
    foot: FOOT_TEAM,
    rugby: [],
    handball: [],
};
