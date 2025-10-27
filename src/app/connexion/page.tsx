import ConnexionClient from "./ConnexionClient";

export const metadata = {
  title: "Connexion à l’espace club SimplyFoot",
  description:
    "Connectez-vous à votre espace SimplyFoot pour gérer votre club, vos équipes et vos abonnements en toute simplicité.",
  alternates: { canonical: "https://www.simplyfoot.fr/connexion" },
  openGraph: {
    title: "Connexion à l’espace club SimplyFoot",
    description:
      "Accédez à votre tableau de bord SimplyFoot et simplifiez la gestion de votre club de football amateur.",
    url: "https://www.simplyfoot.fr/connexion",
    siteName: "SimplyFoot",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.simplyfoot.fr/og.jpg",
        width: 1200,
        height: 630,
        alt: "Connexion à l’espace club SimplyFoot",
      },
    ],
  },
};

export default function Page() {
  return <ConnexionClient />;
}
