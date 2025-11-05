import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
    try {
        const { stripeCustomerId } = await req.json();

        if (!stripeCustomerId) {
            return NextResponse.json({ error: "Missing Stripe customer ID" }, { status: 400 });
        }

        // Récupère les 10 dernières factures de ce client
        const invoices = await stripe.invoices.list({
            customer: stripeCustomerId,
            limit: 10,
        });

        const formatted = invoices.data.map((invoice) => ({
            id: invoice.id,
            date: invoice.created ? new Date(invoice.created * 1000).toISOString() : null,
            amount: invoice.amount_paid ? invoice.amount_paid / 100 : 0,
            status: invoice.status,
            pdf: invoice.invoice_pdf ?? null,
            plan: invoice.lines.data[0]?.price?.nickname ?? "—",
        }));

        return NextResponse.json({ invoices: formatted });
    } catch (err) {
        console.error("❌ Erreur récupération factures:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
