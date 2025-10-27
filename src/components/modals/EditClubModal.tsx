"use client";

import { motion } from "framer-motion";
import { updateClub } from "lib/supabaseQueries";
import { useState } from "react";

export type ClubData = {
  name: string;
  address?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  phone_number?: string;
  email?: string;
  siret_number?: string;
  siren_number?: string;
  website?: string;
  webshop?: string;
};

export type EditClubModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clubId: string;
  clubData: ClubData;
  onSave: (updatedClubData: ClubData) => void;
};

export default function EditClubModal({
  isOpen,
  onClose,
  clubId,
  clubData,
  onSave,
}: EditClubModalProps) {
  const [form, setForm] = useState<ClubData>(clubData);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = <K extends keyof ClubData>(field: K, value: ClubData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateClub(clubId, form);
      onSave(form);
      alert("✅ Informations du club mises à jour !");
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la mise à jour du club.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-extrabold text-[#14482F] mb-4">
          Modifier le club
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom du club */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">
              Nom du club *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ex : FC Provence"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              required
            />
          </div>

          {/* Adresse / Code postal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Adresse
              </label>
              <input
                type="text"
                value={form.address ?? ""}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="12 rue du Stade"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Code postal
              </label>
              <input
                type="text"
                value={form.postal_code ?? ""}
                onChange={(e) => handleChange("postal_code", e.target.value)}
                placeholder="75001"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Ville / Pays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Ville
              </label>
              <input
                type="text"
                value={form.city ?? ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Marseille"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Pays
              </label>
              <input
                type="text"
                value={form.country ?? ""}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="France"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Téléphone / Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Téléphone
              </label>
              <input
                type="text"
                value={form.phone_number ?? ""}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                placeholder="06 12 34 56 78"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Email du club
              </label>
              <input
                type="email"
                value={form.email ?? ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="contact@club.fr"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* SIRET / Site web */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Numéro SIRET
              </label>
              <input
                type="text"
                value={form.siret_number ?? ""}
                onChange={(e) => handleChange("siret_number", e.target.value)}
                placeholder="123 456 789 00012"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Site web
              </label>
              <input
                type="url"
                value={form.website ?? ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://monclub.fr"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer px-5 py-2 rounded-lg bg-[#29be4f] text-[#14482F] font-extrabold hover:bg-[#63f286] disabled:opacity-60"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
