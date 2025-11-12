"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";
import { Subscription } from "app/_types/Subscription";
import { Order, StatusEnum } from "app/_types/Order";

export function useSubscriptionData(clubId: string | null) {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!clubId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // === 1️⃣ Récupérer la dernière souscription liée au club ===
                const { data: subLink, error: linkError } = await supabase
                    .from("club_subscriptions")
                    .select("subscription_id")
                    .eq("club_id", clubId)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .single();

                if (linkError || !subLink) {
                    setSubscription(null);
                    setOrders([]);
                    setLoading(false);
                    return;
                }

                // === 2️⃣ Détails de la souscription ===
                const { data: subData, error: subError } = await supabase
                    .from("subscriptions")
                    .select("plan, start_date, end_date, stripe_subscription_id")
                    .eq("id", subLink.subscription_id)
                    .single();

                if (subError || !subData) throw subError;

                const now = new Date();
                const start = new Date(subData.start_date);
                const end = new Date(subData.end_date);
                const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                const remainingDays = Math.max(
                    0,
                    Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                );
                const progress = Math.min(100, ((totalDays - remainingDays) / totalDays) * 100);

                setSubscription({
                    plan: subData.plan,
                    start: subData.start_date,
                    end: subData.end_date,
                    active: remainingDays > 0,
                    remainingDays,
                    progress,
                });

                // === 3️⃣ Récupérer les factures Stripe liées à cette souscription ===
                const res = await fetch("/api/stripe/invoices", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        stripeSubscriptionId: subData.stripe_subscription_id,
                    }),
                });

                const json = await res.json();

                // === 4️⃣ Formater les factures pour l’affichage ===
                const formattedOrders: Order[] =
                    json?.invoices?.map((invoice: any) => ({
                        id: invoice.id,
                        date: invoice.date,
                        amount: invoice.amount,
                        plan: invoice.plan,
                        status:
                            invoice.status === "paid"
                                ? StatusEnum.Paid
                                : StatusEnum.Pending,
                        pdf: invoice.pdf,
                    })) ?? [];

                setOrders(formattedOrders);
            } catch (err) {
                console.error("❌ Erreur chargement abonnement :", err);
                setSubscription(null);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clubId]);

    return { subscription, orders, loading };
}
