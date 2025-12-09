import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { PlanEnum } from "app/_types/Plan";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type ExistingSubscription = {
  subscriptions: {
    id: string;
    end_date: string;
  };
};

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown signature error";
    console.error("❌ Webhook signature invalid:", msg);
    return new NextResponse(`Webhook error: ${msg}`, { status: 400 });
  }

  // Ajout d'un log général pour chaque événement reçu
  console.log(`🔔 Stripe webhook reçu: ${event.type}`);
  try {
    switch (event.type) {
      // ==========================================================
      // 🧾 ABONNEMENT CRÉÉ / MIS À JOUR
      // ==========================================================
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;

        // Log complet des métadonnées reçues
        console.log("📦 Subscription metadata:", sub.metadata);

        const club_id = (sub.metadata?.club_id || "").trim();
        const planKey = (sub.metadata?.planKey || "").trim().toUpperCase() as PlanEnum;
        const billing = (sub.metadata?.billing || "").trim();

        if (!club_id) {
          console.warn("⚠️ club_id manquant dans metadata — abonnement ignoré");
          break;
        }

        if (!Object.values(PlanEnum).includes(planKey)) {
          console.warn("⚠️ planKey invalide dans metadata — abonnement ignoré:", planKey);
          break;
        }


        // === DATES ===
        const startTimestamp =
          sub.current_period_start || sub.start_date || Math.floor(Date.now() / 1000);
        let endTimestamp = sub.current_period_end;
        const interval = sub.items?.data?.[0]?.plan?.interval;
        if (!endTimestamp) {
          if (interval === "year") endTimestamp = startTimestamp + 365 * 24 * 3600;
          else if (interval === "month") endTimestamp = startTimestamp + 30 * 24 * 3600;
          else endTimestamp = startTimestamp + 30 * 24 * 3600;
        }
        const start = new Date(startTimestamp * 1000);
        let end = new Date(endTimestamp * 1000);

        // === VÉRIFIE SI LE CLUB A DÉJÀ EU UNE SOUSCRIPTION ===
        const { data: previousSubs, error: prevErr } = await supabaseAdmin
          .from("club_subscriptions")
          .select("id")
          .eq("club_id", club_id)
          .limit(1);
        if (prevErr) console.error("Erreur vérif souscription club:", prevErr);

        // Si le club n'a jamais eu de souscription et que l'abonnement est mensuel, accorde 1 mois gratuit
        let finalStart = new Date(start);
        let finalEnd = new Date(end);
        if ((!previousSubs || previousSubs.length === 0) && interval === "month") {
          finalEnd = new Date(finalEnd.getTime() + 30 * 24 * 3600 * 1000);
          console.log("✅ Mois gratuit accordé au club pour la première souscription mensuelle");
        }
        // Si le club a déjà eu une souscription ou que l'abonnement est annuel, pas de mois gratuit

        // === VÉRIFIE SI UN ABONNEMENT EXISTE DÉJÀ (pour décaler si chevauchement) ===
        const { data: existingSubs, error: checkErr } = await supabaseAdmin
          .from("club_subscriptions")
          .select(`subscriptions!inner(id, end_date)`)
          .eq("club_id", club_id)
          .order("created_at", { ascending: false })
          .limit(1)
          .returns<ExistingSubscription[]>();
        if (checkErr) console.error("Erreur vérif abonnement existant:", checkErr);
        if (existingSubs && existingSubs.length > 0) {
          const lastEndDate = new Date(existingSubs[0].subscriptions.end_date);
          if (lastEndDate > new Date()) {
            // 🔹 chevauchement → décale à la suite
            finalStart = new Date(lastEndDate.getTime() + 24 * 3600 * 1000);
            const durationMs = finalEnd.getTime() - finalStart.getTime();
            finalEnd = new Date(finalStart.getTime() + durationMs);
            console.log(
              `↪️ Abonnement décalé après le précédent (${lastEndDate
                .toISOString()
                .slice(0, 10)})`
            );
          }
        }

        // === INSERTION ABONNEMENT ===
        console.log("🔗 Insertion abonnement:", {
          plan: planKey,
          start_date: finalStart.toISOString().slice(0, 10),
          end_date: finalEnd.toISOString().slice(0, 10),
            stripe_subscription_id: sub.id,
        });
          const { data: subRow, error: subErr } = await supabaseAdmin
            .from("subscriptions")
            .insert({
              plan: planKey,
              start_date: finalStart.toISOString().slice(0, 10),
              end_date: finalEnd.toISOString().slice(0, 10),
              stripe_subscription_id: sub.id,
            })
            .select()
            .single();

        if (subErr || !subRow) {
          console.error("❌ insert SUBSCRIPTIONS error:", subErr);
          break;
        }

        // === LIEN CLUB → ABONNEMENT ===
        console.log("🔗 Lien club → abonnement:", {
          club_id,
          subscription_id: subRow.id,
        });
        const { error: linkErr } = await supabaseAdmin
          .from("club_subscriptions")
          .insert({
            club_id,
            subscription_id: subRow.id,
          });

        if (linkErr)
          console.error("❌ insert CLUB_SUBSCRIPTIONS error:", linkErr);
        else
          console.log(`✅ Abonnement ${planKey} lié au club ${club_id} (${billing})`);
        break;
      }

      // ==========================================================
      // 🧾 FACTURE PAYÉE / GÉNÉRÉE
      // ==========================================================
      case "invoice.paid":
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        const stripeInvoiceId = invoice.id;
        const hostedInvoiceUrl = invoice.hosted_invoice_url;
        const invoicePdf = invoice.invoice_pdf;
        const amountPaid = (invoice.amount_paid ?? 0) / 100;
        const customerEmail = invoice.customer_email ?? "";
        const subscriptionId = invoice.subscription as string;
        const created = new Date((invoice.created ?? Date.now()) * 1000).toISOString();

        let planKey: string | null = null;
        try {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          planKey = sub.metadata?.planKey?.toUpperCase() ?? null;
        } catch {
          console.warn("⚠️ Impossible de récupérer la subscription Stripe :", subscriptionId);
        }

        const { error: insertErr } = await supabaseAdmin
          .from("orders")
          .insert({
            stripe_invoice_id: stripeInvoiceId,
            invoice_url: hostedInvoiceUrl ?? invoicePdf ?? null,
            amount: amountPaid,
            plan: planKey,
            status: "Payé",
            date: created,
            email: customerEmail,
          })
          .select()
          .single();

        if (insertErr) console.error("❌ Erreur insert order:", insertErr);
        else console.log(`✅ Facture enregistrée pour ${customerEmail}`);
        break;
      }

      // ==========================================================
      // 💳 CHECKOUT TERMINÉ
      // ==========================================================
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("ℹ️ checkout.session.completed:", session.id);
        break;
      }

      // ==========================================================
      // ❌ PAIEMENT ÉCHOUÉ
      // ==========================================================
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("❌ Paiement échoué:", invoice.id);
        break;
      }

      default:
        console.log(`ℹ️ Event ignoré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Webhook handling error:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 200 });
  }
}
