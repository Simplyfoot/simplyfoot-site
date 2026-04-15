import type { BrandConfig } from '../config/brands';

export const footConfig: BrandConfig = {
  id: 'foot',
  name: 'SimplyFoot',
  suffix: 'Foot',
  sport: 'football',
  slug: 'foot',
  domain: 'simplyfoot.fr',
  federation: 'FFF',
  theme: {
    primary: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#1B5E20', // reference — vert identitaire SimplyFoot
      600: '#2E7D32',
      700: '#1B5E20',
      800: '#14482F',
      900: '#0D3B12',
      950: '#071f09',
    },
    accent: {
      50: '#e6fce9',
      100: '#b8f5c1',
      200: '#8bee9a',
      300: '#63f286',
      400: '#3de86a',
      500: '#29be4f', // reference — vert CTA vif
      600: '#22a344',
      700: '#1b8838',
      800: '#146d2d',
      900: '#0d5222',
      950: '#073717',
    },
    semantic: {
      bg: '#F8E9CA', // beige Simply — fond principal
      bgAlt: '#F0DDB4', // beige fonce — sections alternees
      surface: '#FFF5E4', // creme clair — cartes
      cta: '#29be4f', // accent.500 — vert CTA
      ctaHover: '#22a344', // accent.600 — hover plus fonce
      ctaText: '#FFFFFF', // blanc sur CTA vert — contraste 4.6:1
      border: '#E0D0B0', // beige bordure
      ring: 'rgba(41, 190, 79, 0.4)',
      text: '#1A1814', // noir chaud — texte principal sur beige
      textMuted: '#6B5D4B', // taupe fonce — texte secondaire (ratio 5.8:1 sur #F8E9CA)
    },
  },
  meta: {
    title: 'SimplyFoot — Gestion de club de football amateur',
    titleTemplate: '%s | SimplyFoot',
    description:
      'Gerez votre club de football amateur comme un pro avec SimplyFoot : calendrier, compositions, statistiques, communication et documents en ligne.',
    ogImage: '/images/foot/og.jpg',
    twitterHandle: '@simplyfoot',
  },
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61580681960537',
    linkedin: 'https://www.linkedin.com/in/simply-foot-40a883372/',
    instagram: 'https://www.instagram.com/simply.foot/',
  },
  appLinks: {
    googlePlay: '',
    appStore: '',
  },
  i18nNamespace: 'foot',
};
