import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Header";
import Footer from "components/layout/Footer";
import { AuthProvider } from "lib/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#14482F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.simplyfoot.fr"),
  title: { default: "SimplyFoot – Gestion de club & d’équipe", template: "%s | SimplyFoot" },
  description:
    "Gérez votre club de football amateur comme un pro avec SimplyFoot : calendrier, compositions, statistiques, communication et documents en ligne.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    siteName: "SimplyFoot",
    title: "SimplyFoot – Gestion de club & d’équipe",
    description:
      "Simplifiez la gestion de votre club amateur : matchs, entraînements, joueurs et communication centralisée.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "SimplyFoot" }],
    url: "https://www.simplyfoot.fr",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@simplyfoot",
    title: "SimplyFoot – Gestion de club & d’équipe",
    description:
      "SimplyFoot est l’application qui facilite la vie des clubs de football amateurs.",
    images: ["/og.jpg"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SimplyFoot",
    legalName: "SimplyFoot SAS",
    url: "https://www.simplyfoot.fr",
    logo: "https://www.simplyfoot.fr/logo.png",
    description:
      "SimplyFoot est une application web et mobile de gestion pour les clubs de football amateurs : équipes, matchs, calendriers, statistiques et communication.",
    email: "contact@simplyfoot.fr",
    telephone: "+33 6 82 84 56 41",
    address: {
      "@type": "PostalAddress",
      streetAddress: "60 rue François 1er",
      addressLocality: "Paris",
      postalCode: "75008",
      addressCountry: "FR",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61580681960537",
      "https://www.linkedin.com/in/simply-foot-40a883372/",
      "https://www.instagram.com/simply.foot/",
    ],
  };

  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={`${inter.className} min-h-dvh flex flex-col bg-[#14482F] text-white antialiased`}>
        <div aria-hidden className="fixed inset-0 -z-10 bg-[#14482F]" />
        <AuthProvider>
          <Navbar locale="fr" />

          <main id="main-content" className="flex-grow w-full pt-20 lg:pt-24">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
