import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const { subscriptionId } = await req.json();

        if (!subscriptionId) {
            return NextResponse.json({ error: "Subscription ID manquant" }, { status: 400 });
        }

        await stripe.subscriptions.cancel(subscriptionId);

        const { error: dbError } = await supabase
            .from("subscriptions")
            .update({ active: false })
            .eq("stripe_subscription_id", subscriptionId);

        if (dbError) {
            console.error("❌ Erreur désactivation Supabase:", dbError);
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        console.log(`✅ Abonnement ${subscriptionId} annulé avec succès`);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("❌ Erreur API annulation abonnement:", err);
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        );
    }
}
