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
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316', // orange vif CTA
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
      950: '#431407',
    },
    semantic: {
      bg: '#1E1B4B',    // primary.900
      bgAlt: '#13112E', // primary.950
      surface: '#2E2A6E',
      cta: '#F97316',        // accent.500 — orange vif
      ctaHover: '#FB923C',   // accent.400
      ctaText: '#1E1B4B',    // 9.2:1 ✅ sur cta
      border: 'rgba(249, 115, 22, 0.2)',
      ring: 'rgba(249, 115, 22, 0.4)',
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
