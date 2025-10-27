"use client";
import { Order } from "app/_types/Order";
import { badgeStatus, EUR, formatDate } from "lib/utils";
import { FileDown } from "lucide-react";

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <section id="orders" className="mt-10 rounded-2xl border border-[#29be4f]/20 bg-white/95 p-6">
      <h2 className="mb-4 text-xl font-extrabold text-[#14482F]">Historique de mes achats</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-[#14482F]">
          <thead className="bg-[#F8E9CA]/60">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-bold">N° Commande</th>
              <th className="px-4 py-2 text-left text-sm font-bold">Date</th>
              <th className="px-4 py-2 text-left text-sm font-bold">Montant</th>
              <th className="px-4 py-2 text-left text-sm font-bold">Offre</th>
              <th className="px-4 py-2 text-left text-sm font-bold">Statut</th>
              <th className="px-4 py-2 text-left text-sm font-bold">Facture</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-gray-100">
                <td className="px-4 py-2 font-mono">{o.id}</td>
                <td className="px-4 py-2">{formatDate(o.date)}</td>
                <td className="px-4 py-2 font-bold">{EUR.format(o.amount)}</td>
                <td className="px-4 py-2">{o.plan}</td>
                <td className="px-4 py-2">
                  <span className={badgeStatus(o.status)}>{o.status}</span>
                </td>
                <td className="px-4 py-2">
                  {o.invoiceUrl ? (
                    <a
                      href={o.invoiceUrl}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#14482F] underline"
                    >
                      <FileDown className="h-4 w-4" />
                      Télécharger
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
