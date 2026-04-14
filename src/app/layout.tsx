import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from 'components/platform/Header';
import Footer from 'components/platform/Footer';
import { ScrollProgress } from 'components/platform/ScrollProgress';
import { BrandBodySync } from 'components/platform/BrandBodySync';
import { SmoothScroll } from 'components/platform/SmoothScroll';
import { SiteChrome } from 'components/platform/SiteChrome';
import { SimmoChat } from 'components/shared/SimmoChat';
import { getDictionary } from 'lib/i18n/getDictionary';
import { company } from 'lib/config/company';
import { siteConfig } from 'lib/config/site';
import { generateBrandCSS } from 'lib/config/brand-tokens';
import { getBrandConfig, DEFAULT_BRAND } from 'lib/config/brands';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

/**
 * Police display pour les titres héro et grands formats.
 * Space Grotesk — géométrique avec une légère personnalité angulaire,
 * intemporelle, premium, et distincte d'Inter pour les grandes tailles.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const defaultTheme = getBrandConfig(DEFAULT_BRAND).theme;

export const viewport: Viewport = {
  themeColor: defaultTheme.semantic.bg,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Simply — La plateforme de gestion pour clubs amateurs',
    template: '%s | Simply',
  },
  description:
    'Simply simplifie la gestion des clubs de sport amateur : football, rugby, handball. Calendrier, compositions, statistiques et communication.',
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: 'Simply — La plateforme de gestion pour clubs amateurs',
    description:
      'Simplifiez la gestion de votre club amateur : matchs, entraînements, joueurs et communication centralisée.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Simply' }],
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simply — La plateforme de gestion pour clubs amateurs',
    description: 'Simply est la plateforme qui facilite la vie des clubs de sport amateurs.',
    images: ['/og.jpg'],
  },
  manifest: '/manifest.json',
};

/** CSS des tokens de marque genere depuis la config TypeScript (source unique) */
const brandCSS = generateBrandCSS();

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const commonDict = await getDictionary('fr', 'common');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: commonDict.platform.tagline,
    email: company.email,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=61580681960537',
      'https://www.linkedin.com/in/simply-foot-40a883372/',
      'https://www.instagram.com/simply.foot/',
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Tokens de marque generes depuis TypeScript — source unique de verite */}
        <style dangerouslySetInnerHTML={{ __html: brandCSS }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className={`${inter.className} min-h-dvh flex flex-col bg-[var(--brand-bg)] text-white antialiased`}
      >
        <SiteChrome>
          <div aria-hidden="true" className="fixed inset-0 -z-10 bg-[var(--brand-bg)]" />
          <BrandBodySync />
          <SmoothScroll />
          <ScrollProgress />
          <Navbar locale="fr" />
        </SiteChrome>

        <main id="main-content" className="flex-grow w-full pt-20 lg:pt-24">
          {children}
        </main>

        <SiteChrome>
          <Footer dict={commonDict.footer} />
        </SiteChrome>

        <SimmoChat />
      </body>
    </html>
  );
}
