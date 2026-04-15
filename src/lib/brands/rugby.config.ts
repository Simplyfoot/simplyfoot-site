import type { BrandConfig } from '../config/brands';

export const rugbyConfig: BrandConfig = {
  id: 'rugby',
  name: 'SimplyRugby',
  suffix: 'Rugby',
  sport: 'rugby',
  slug: 'rugby',
  domain: 'simplyrugby.fr',
  federation: 'FFR',
  theme: {
    primary: {
      50: '#FDF0ED',
      100: '#FAD5CE',
      200: '#F4A89A',
      300: '#EC7A69',
      400: '#D95444',
      500: '#A8332A', // terracotta identitaire SimplyRugby
      600: '#8B2620',
      700: '#701E19',
      800: '#541612',
      900: '#380E0B',
      950: '#1C0705',
    },
    accent: {
      50: '#FDF7EC',
      100: '#F9EACE',
      200: '#F3D4A0',
      300: '#EBBF72',
      400: '#D4A66A',
      500: '#C49030', // sable doré
      600: '#A87828',
      700: '#8B621F',
      800: '#6E4D17',
      900: '#50380F',
      950: '#342408',
    },
    semantic: {
      bg: '#F8E9CA', // beige Simply — fond principal
      bgAlt: '#F0DDB4', // beige fonce — sections alternees
      surface: '#FFF5E4', // creme clair — cartes
      cta: '#A8332A', // primary.500 — terracotta CTA
      ctaHover: '#8B2620', // primary.600 — hover
      ctaText: '#FFFFFF', // blanc sur CTA rouge — contraste 7.5:1
      border: '#E0D0B0', // beige bordure
      ring: 'rgba(168, 51, 42, 0.4)',
      text: '#1A1814', // noir chaud
      textMuted: '#6B5D4B', // taupe fonce (ratio 5.8:1)
    },
  },
  meta: {
    title: 'SimplyRugby — Gestion de club de rugby amateur',
    titleTemplate: '%s | SimplyRugby',
    description:
      'Gerez votre club de rugby comme un pack soude avec SimplyRugby : effectifs, calendrier, compositions, communication et documents.',
    ogImage: '/images/rugby/og.jpg',
    twitterHandle: '@simplyrugby',
  },
  socials: {},
  appLinks: {
    googlePlay: '',
    appStore: '',
  },
  i18nNamespace: 'rugby',
};
