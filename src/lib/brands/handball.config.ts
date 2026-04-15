import type { BrandConfig } from '../config/brands';

export const handballConfig: BrandConfig = {
  id: 'handball',
  name: 'SimplyHandball',
  suffix: 'Handball',
  sport: 'handball',
  slug: 'handball',
  domain: 'simplyhandball.fr',
  federation: 'FFHB',
  theme: {
    primary: {
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#4F46E5', // indigo identitaire SimplyHandball
      600: '#4338CA',
      700: '#3730A3',
      800: '#312E81',
      900: '#1E1B4B',
      950: '#13112E',
    },
    accent: {
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#1A237E', // bleu nuit — identite SimplyHandball
      600: '#151B6B',
      700: '#101458',
      800: '#0B0E45',
      900: '#070A33',
      950: '#040620',
    },
    semantic: {
      bg: '#F8E9CA', // beige Simply — fond principal
      bgAlt: '#F0DDB4', // beige fonce — sections alternees
      surface: '#FFF5E4', // creme clair — cartes
      cta: '#1A237E', // bleu nuit — CTA
      ctaHover: '#151B6B', // bleu plus fonce — hover
      ctaText: '#FFFFFF', // blanc sur CTA bleu — contraste 12:1
      border: '#E0D0B0', // beige bordure
      ring: 'rgba(26, 35, 126, 0.4)',
      text: '#1A1814', // noir chaud
      textMuted: '#6B5D4B', // taupe fonce (ratio 5.8:1)
    },
  },
  meta: {
    title: 'SimplyHandball — Gestion de club de handball amateur',
    titleTemplate: '%s | SimplyHandball',
    description:
      'Votre club merite la meme intensite dans sa gestion que sur le parquet. SimplyHandball centralise effectifs, calendrier et communication.',
    ogImage: '/images/handball/og.jpg',
    twitterHandle: '@simplyhandball',
  },
  socials: {},
  appLinks: {
    googlePlay: '',
    appStore: '',
  },
  i18nNamespace: 'handball',
};
