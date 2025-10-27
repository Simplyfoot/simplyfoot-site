"use client";
import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";
import { Dashboard } from "app/_types/Dashboard";

export function useDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error || !userData?.user) {
          setData(null);
          setLoading(false);
          return;
        }

        const meta = userData.user.user_metadata ?? {};
        const email = userData.user.email ?? "—";

        setData({
          firstname: meta.prenomResponsable ?? "Prénom",
          lastname: meta.nomResponsable ?? "Nom",
          email,
          club: meta.nomClub ?? "Mon club",
          subscription: {
            plan: "Maxi Club",
            start: "2024-07-01T00:00:00Z",
            end: "2026-07-01T00:00:00Z",
            active: true,
            seats: { used: 284, quota: 500 },
            renewsAutomatically: true,
            nextInvoice: { date: "2025-07-01T00:00:00Z", amount: 99.99 },
          },
          orders: [
            {
              id: "CMD202407012350",
              date: "2024-07-01T10:12:00Z",
              amount: 99.99,
              plan: "Maxi Club",
              status: "Payé",
              invoiceUrl: "/api/invoices/CMD202407012350",
            },
          ],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading };
}
