/**
 * Company information shared across the entire platform.
 * Extracted from the current Footer and Contact page hardcoded values.
 */
export const company = {
  name: 'Simply',
  legalName: 'SimplyFoot SAS',
  email: 'contact@simplyfoot.fr',
  phone: '+33 6 82 84 56 41',
  address: {
    street: '60 rue Francois 1er',
    city: 'Paris',
    postalCode: '75008',
    country: 'FR',
    full: '60 rue Francois 1er, 75008 Paris',
  },
  legal: {
    siret: '991 139 171',
    rcs: '991 139 171 R.C.S Paris',
    tva: 'FR 89 991139171',
    capitalSocial: '1 000',
  },
  calendlyUrl: 'https://calendly.com/',
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61580681960537',
    linkedin: 'https://www.linkedin.com/in/simply-foot-40a883372/',
    instagram: 'https://www.instagram.com/simply.foot/',
  },
} as const;
