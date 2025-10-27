import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET() {
  const customerId = "cus_XXX"; // à remplacer par le vrai ID Stripe du client
  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  });
  return NextResponse.redirect(portal.url);
}
