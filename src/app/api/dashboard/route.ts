import { NextResponse } from "next/server";
import Stripe from "stripe";

// ⚙️ Utilise une version stable et bien supportée par le SDK Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET() {
  try {
    // 🧾 Récupère un client Stripe
    const customers = await stripe.customers.list({ limit: 1 });
    const customer = customers.data[0];
    if (!customer) {
      return NextResponse.json({ error: "Aucun client trouvé" }, { status: 404 });
    }

    // 🔍 Récupère l’abonnement actif
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      limit: 1,
      expand: [
        "data.latest_invoice.payment_intent",
        "data.items.data.price.product",
      ],
    });

    const sub = subscriptions.data[0] as Partial<Stripe.Subscription>;
    if (!sub) {
      return NextResponse.json({ error: "Aucun abonnement trouvé" }, { status: 404 });
    }

    // 🧾 Récupère les 5 dernières factures
    const invoices = await stripe.invoices.list({
      customer: customer.id,
      limit: 5,
    });

    // ✅ Sécurise les accès aux champs potentiellement optionnels
    const product = sub.items?.data?.[0]?.price?.product as
      | Stripe.Product
      | undefined;

    const endDate = sub.current_period_end
      ? new Date(sub.current_period_end * 1000).toISOString()
      : null;

    const startDate = sub.start_date
      ? new Date(sub.start_date * 1000).toISOString()
      : null;

    const nextInvoice = sub.latest_invoice
      ? {
          date: endDate ?? new Date().toISOString(),
          amount:
            sub.items?.data?.[0]?.price?.unit_amount != null
              ? sub.items.data[0].price.unit_amount / 100
              : 0,
        }
      : null;

    const dashboardData = {
      name: customer.name ?? "Club inconnu",
      email: customer.email ?? "—",
      club: customer.metadata?.club_name ?? "Nom de club non défini",
      subscription: {
        plan: product?.name ?? "Plan inconnu",
        start: startDate,
        end: endDate,
        active: sub.status === "active",
        renewsAutomatically: !sub.cancel_at_period_end,
        nextInvoice,
      },
      orders: invoices.data.map((invoice) => ({
        id: invoice.number ?? invoice.id,
        date: new Date(invoice.created * 1000).toISOString(),
        amount: invoice.amount_paid / 100,
        plan: invoice.lines.data[0]?.description ?? "Abonnement SimplyFoot",
        status: invoice.status === "paid" ? "Payé" : "En attente",
        invoiceUrl: invoice.hosted_invoice_url ?? undefined,
      })),
    };

    return NextResponse.json(dashboardData);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erreur dashboard Stripe:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("Erreur inconnue Stripe:", err);
    return NextResponse.json(
      { error: "Erreur serveur inconnue" },
      { status: 500 }
    );
  }
}
