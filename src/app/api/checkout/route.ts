import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PRICE_IDS } from "lib/stripe/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

type CheckoutBody = {
  planKey: keyof typeof PRICE_IDS;
  email: string;
  billing: "monthly" | "yearly";
};

export async function POST(req: Request) {
  try {
    const { planKey, email, billing } = (await req.json()) as CheckoutBody;

    const key = `${planKey}_${billing}` as keyof typeof PRICE_IDS;
    const priceId = PRICE_IDS[key];

    if (!priceId) {
      return NextResponse.json(
        { error: "Plan inconnu ou invalide" },
        { status: 400 }
      );
    }

    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { planKey }, // utile pour le dashboard
        subscription_data: { trial_period_days: 30 },
        success_url: `${process.env.NEXT_PUBLIC_URL}/paiement/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/paiement/cancel`,
      });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erreur Stripe:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("Erreur inconnue Stripe:", err);
    return NextResponse.json({ error: "Erreur serveur inconnue" }, { status: 500 });
  }
}
