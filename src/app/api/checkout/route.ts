import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PRICE_IDS } from "lib/stripe/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

type CheckoutBody = {
  planKey: keyof typeof PRICE_IDS;        // ex: 'LOCAL' | 'LITTLE' ...
  email: string;
  billing: "monthly" | "yearly";          // mensuel / annuel
  club_id: string;                        // 👈 à envoyer
  user_id: string;                        // 👈 à envoyer
};

export async function POST(req: Request) {
  try {
    const { planKey, email, billing, club_id, user_id } = (await req.json()) as CheckoutBody;

    const key = `${planKey}_${billing}`.toLowerCase() as keyof typeof PRICE_IDS;
    const priceId = PRICE_IDS[key];
    if (!priceId) {
      return NextResponse.json({ error: "Plan inconnu ou invalide" }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      // 👇 On met les métadonnées sur la session (utile au besoin)
      metadata: { planKey, billing, club_id, user_id },
      // 👇 Et SURTOUT sur l'abonnement (ce sont ces events que ton webhook reçoit)
      subscription_data: {
        trial_period_days: 30,
        metadata: { planKey, billing, club_id, user_id },
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/paiement/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/paiement/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur serveur inconnue";
    console.error("Erreur Stripe:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
