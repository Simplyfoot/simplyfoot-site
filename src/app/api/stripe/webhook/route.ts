import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Signature invalide :", err.message);
      return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
    }
    console.error("❌ Erreur inconnue lors de la vérification de signature :", err);
    return new NextResponse("Webhook error: Unknown error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail =
        session.customer_email ??
        session.customer_details?.email ??
        "Email non renseigné";

      console.log("✅ Nouveau paiement réussi :", customerEmail);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log("❌ Paiement échoué :", invoice.id);
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("🔁 Abonnement mis à jour :", subscription.id);
      break;
    }

    default:
      console.log(`ℹ️ Événement non géré : ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
