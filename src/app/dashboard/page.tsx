import UserDashboard from "./UserDashboard";

export const metadata = {
  title: "Tableau de bord SimplyFoot",
  description:
    "Accédez à votre tableau de bord SimplyFoot pour gérer votre club, vos abonnements et vos commandes.",
  alternates: { canonical: "https://www.simplyfoot.fr/dashboard" },
  openGraph: {
    title: "Tableau de bord SimplyFoot",
    description:
      "Simplifiez la gestion de votre club de football amateur avec SimplyFoot.",
    url: "https://www.simplyfoot.fr/dashboard",
    siteName: "SimplyFoot",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <UserDashboard />;
}
