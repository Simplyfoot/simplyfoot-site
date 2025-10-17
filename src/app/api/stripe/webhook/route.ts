import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-09-30.clover",
});

// Clé secrète du webhook depuis le dashboard Stripe (⚠️ pas la clé API !)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    } catch (err: any) {
        console.error("❌ Signature invalide :", err.message);
        return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
    }

    // 👉 Ici, on traite les événements importants
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const customerEmail =
                session.customer_email ||
                (session.customer_details && session.customer_details.email) ||
                "Email non renseigné";
            console.log("✅ Nouveau paiement réussi :", customerEmail);
            break;
        }
        case "invoice.payment_failed":
            console.log("❌ Paiement échoué :", event.data.object);
            break;

        case "customer.subscription.updated":
        case "customer.subscription.created":
            console.log("🔁 Abonnement mis à jour :", event.data.object);
            // ➜ Met à jour le statut dans ta base
            break;
    }

    return NextResponse.json({ received: true });
}
