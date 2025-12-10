"use client";
import { useEffect, useState } from "react";
import { useAuth } from "lib/AuthProvider";
import { getUserProfile } from "lib/supabaseQueries";
import { Dashboard } from "app/_types/Dashboard";

export function useDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!user?.id) {
          setData(null);
          setLoading(false);
          return;
        }

        // Récupérer le profil complet depuis la DB
        const profile = await getUserProfile(user.id);

        setData({
          firstname: profile.firstname ?? "Prénom",
          lastname: profile.lastname ?? "Nom",
          email: user.email ?? "—",
          club: "Mon club", // TODO: récupérer depuis getActivePresidentClubs si besoin
          gender: profile.gender ?? null,
          subscription: {
            plan: "MAX" as const, // Specify a different type instead of any
            start: "2024-07-01T00:00:00Z",
            end: "2026-07-01T00:00:00Z",
            active: true,
            seats: { used: 284, quota: 500 },
            renewsAutomatically: true,
            nextInvoice: { date: "2025-07-01T00:00:00Z", amount: 99.99 },
          },
          orders: [], // TODO: récupérer depuis useSubscriptionData si besoin
        } as Dashboard);
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return { data, loading };
}
