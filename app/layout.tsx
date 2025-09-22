// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ⬇️ importe bien ton composant existant
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#14482F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "SimplyFoot – Gestion de club & d’équipe", template: "%s | SimplyFoot" },
  description:
    "Gérez votre club amateur comme un pro : calendrier, compositions, statistiques, documents, IA… SimplyFoot simplifie la vie des clubs.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    siteName: "SimplyFoot",
    title: "SimplyFoot – Gestion de club & d’équipe",
    description: "Gérez calendrier, compositions, statistiques, documents, messages et plus encore.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "SimplyFoot" }],
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@simplyfoot",
    title: "SimplyFoot – Gestion de club & d’équipe",
    description: "Gérez votre club amateur comme un pro.",
    images: ["/og.jpg"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={`${inter.className} min-h-dvh bg-[#14482F] text-white antialiased`}>
        {/* Fond pour éviter la barre noire */}
        <div aria-hidden className="fixed inset-0 -z-10 bg-[#14482F]" />
        {/* ⬇️ utilise bien <Navbar /> */}
        <Navbar />
        <main id="main-content" className="w-full pt-20 lg:pt-24">{children}</main>
      </body>
    </html>
  );
}
