import { Billing } from "app/_types/Order";
import { supabase } from "lib/supabaseClient";

export async function handleSubscribe(
  planKey: string,
  billing: Billing,
  email: string,
  club_id: string
) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/inscription";
      return;
    }

    console.log("🧾 Envoi checkout:", {
      planKey,
      billing,
      email,
      club_id,
      user_id: user.id,
    });

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planKey: planKey.toUpperCase(),
        email,
        billing,
        club_id,
        user_id: user.id,
      }),
    });

    const { url, error } = await res.json();
    if (error) throw new Error(error);

    window.location.href = url;
  } catch (err) {
    console.error("Erreur abonnement :", err);
    alert("Une erreur est survenue lors de la création de la session Stripe.");
  }
}
