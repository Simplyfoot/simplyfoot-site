import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "lib/supabaseClient";

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
    console.error("❌ Signature invalide :", err);
    return new NextResponse("Webhook error", { status: 400 });
  }

  try {
    switch (event.type) {
      /* =====================================================
         ✅ PAIEMENT TERMINÉ → Crée un abonnement en base
      ====================================================== */
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const stripeSubscriptionId = session.subscription as string;
        const planKey = session.metadata?.planKey;
        const clubId = session.metadata?.club_id;

        if (!stripeSubscriptionId || !planKey || !clubId) {
          console.warn("⚠️ Données manquantes dans metadata :", {
            stripeSubscriptionId,
            planKey,
            clubId,
          });
          break;
        }

        // Récupère les dates depuis Stripe
        const stripeSub = await stripe.subscriptions.retrieve(stripeSubscriptionId);

        const startDate = new Date(stripeSub.current_period_start * 1000)
          .toISOString()
          .slice(0, 10);
        const endDate = new Date(stripeSub.current_period_end * 1000)
          .toISOString()
          .slice(0, 10);

        // Insère dans la table SUBSCRIPTIONS (le code est auto-généré)
        const { data: sub, error: subError } = await supabase
          .from("subscriptions")
          .insert([
            {
              stripe_subscription_id: stripeSubscriptionId,
              plan: planKey,
              start_date: startDate,
              end_date: endDate,
            },
          ])
          .select()
          .single();

        if (subError) {
          console.error("❌ Erreur insertion abonnement :", subError);
          break;
        }

        // Lie le club à l’abonnement
        const { error: linkError } = await supabase
          .from("club_subscriptions")
          .insert([{ club_id: clubId, subscription_id: sub.id }]);

        if (linkError) {
          console.error("❌ Erreur liaison club/abonnement :", linkError);
        } else {
          console.log(`✅ Abonnement ${planKey} ajouté pour le club ${clubId}`);
        }

        break;
      }

      /* =====================================================
         🔁 MISE À JOUR DE L’ABONNEMENT
      ====================================================== */
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;

        const { error } = await supabase
          .from("subscriptions")
          .update({
            end_date: new Date(sub.current_period_end * 1000)
              .toISOString()
              .slice(0, 10),
          })
          .eq("stripe_subscription_id", sub.id);

        if (error)
          console.error("❌ Erreur mise à jour abonnement :", error);
        else
          console.log(`🔁 Abonnement ${sub.id} mis à jour.`);
        break;
      }

      /* =====================================================
         ❌ PAIEMENT ÉCHOUÉ
      ====================================================== */
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("❌ Paiement échoué :", invoice.id);
        break;
      }

      default:
        console.log(`ℹ️ Événement non géré : ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("💥 Erreur webhook :", err);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
