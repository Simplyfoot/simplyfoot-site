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
      bg: '#380E0B',    // primary.900
      bgAlt: '#1C0705', // primary.950
      surface: '#501510',
      cta: '#D4A66A',        // accent.400 — sable doré
      ctaHover: '#EBBF72',   // accent.300
      ctaText: '#380E0B',    // 8.1:1 ✅ sur cta
      border: 'rgba(212, 166, 106, 0.2)',
      ring: 'rgba(212, 166, 106, 0.4)',
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
