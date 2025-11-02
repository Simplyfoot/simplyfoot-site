"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";
import { Subscription } from "app/_types/Subscription";
import { Order, statusEnum } from "app/_types/Order";

export function useSubscriptionData(clubId: string | null) {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!clubId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // === Récupérer la dernière souscription liée au club ===
                const { data: subLink, error: linkError } = await supabase
                    .from("club_subscriptions")
                    .select("subscription_id")
                    .eq("club_id", clubId)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .single();

                if (linkError || !subLink) {
                    console.warn("⚠️ Aucune souscription trouvée pour ce club.");
                    setSubscription(null);
                    setOrders([]);
                    setLoading(false);
                    return;
                }

                // === Récupérer les détails de la souscription ===
                const { data: subData, error: subError } = await supabase
                    .from("subscriptions")
                    .select("plan, start_date, end_date")
                    .eq("id", subLink.subscription_id)
                    .single();

                if (subError || !subData) throw subError;

                // === Calculer le temps restant ===
                const now = new Date();
                const start = new Date(subData.start_date);
                const end = new Date(subData.end_date);

                const totalDays = Math.ceil(
                    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                );
                const remainingDays = Math.max(
                    0,
                    Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                );
                const progress = Math.min(
                    100,
                    ((totalDays - remainingDays) / totalDays) * 100
                );

                setSubscription({
                    plan: subData.plan,
                    start: subData.start_date,
                    end: subData.end_date,
                    active: remainingDays > 0,
                    remainingDays,
                    progress,
                });

                // === (optionnel) Récupérer les commandes du club ===
                const { data: ordersData } = await supabase
                    .from("subscriptions")
                    .select("id, start_date, plan, updated_at")
                    .eq("id", subLink.subscription_id);

                const formattedOrders =
                    ordersData?.map((order) => ({
                        id: order.id,
                        date: order.start_date,
                        amount: 99.99,
                        plan: order.plan,
                        status: statusEnum.Paid,
                    })) ?? [];

                setOrders(formattedOrders);
            } catch (err) {
                console.error("❌ Erreur chargement abonnement :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clubId]);

    return { subscription, orders, loading };
}
