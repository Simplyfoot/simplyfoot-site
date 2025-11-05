"use client";
import { FileDown } from "lucide-react";
import { badgeStatus, EUR, formatDate } from "lib/utils";
import { Order } from "app/_types/Order";

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return (
      <section
        id="orders"
        className="mt-10 rounded-2xl border border-[#29be4f]/20 bg-white/95 p-6 text-center text-[#14482F]"
      >
        <h2 className="mb-2 text-xl font-extrabold">Historique de mes achats</h2>
        <p className="text-sm text-[#14482F]/70">
          Aucune commande enregistrée pour le moment.
        </p>
      </section>
    );
  }

  return (
    <section
      id="orders"
      className="mt-10 rounded-2xl border border-[#29be4f]/20 bg-white/95 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-[#14482F]">
        Historique de mes achats
      </h2>
        <span className="text-xs text-[#14482F]/60">
        {orders.length} commande{orders.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-[#14482F]">
          <thead className="bg-[#F8E9CA]/60">
            <tr>
              <th className="px-4 py-2 text-left font-bold">N° Commande</th>
              <th className="px-4 py-2 text-left font-bold">Date</th>
              <th className="px-4 py-2 text-left font-bold">Montant</th>
              <th className="px-4 py-2 text-left font-bold">Offre</th>
              <th className="px-4 py-2 text-left font-bold">Statut</th>
              <th className="px-4 py-2 text-left font-bold">Facture</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-200 hover:bg-[#F8E9CA]/30 transition-colors"
              >
                <td className="px-4 py-2 font-mono text-xs text-[#14482F]/80">
                  {order.id}
                </td>
                <td className="px-4 py-2">{formatDate(order.date)}</td>
                <td className="px-4 py-2 font-bold">{EUR.format(order.amount)}</td>
                <td className="px-4 py-2">{order.plan}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${badgeStatus(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {order.invoice ? (
                    <a
                      href={order.invoice}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#14482F] underline underline-offset-2 hover:text-[#29be4f] transition-colors"
                    >
                      <FileDown className="h-4 w-4" />
                      Télécharger
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
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
