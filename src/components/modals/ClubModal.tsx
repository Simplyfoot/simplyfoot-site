"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Club } from "app/_types/Club";
import { Clipboard, Check } from "lucide-react";
import { addClub, updateClub } from "lib/supabaseQueries";

export type ClubModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  onClose: () => void;
  clubId?: string | null;
  clubData?: Club | null;
  userId?: string;
  onSave: (club: Club) => void;
};

export default function ClubModal({
  isOpen,
  mode,
  onClose,
  clubId,
  clubData,
  userId,
  onSave,
}: ClubModalProps) {
  const [form, setForm] = useState<Club>({
    id: clubId ?? "",
    created_by: clubData?.created_by ?? "",
    code: clubData?.code ?? null,
    name: clubData?.name ?? "",
    address: clubData?.address ?? null,
    postal_code: clubData?.postal_code ?? null,
    city: clubData?.city ?? null,
    country: clubData?.country ?? "France",
    phone_number: clubData?.phone_number ?? null,
    email: clubData?.email ?? null,
    company_name: clubData?.company_name ?? null,
    siret_number: clubData?.siret_number ?? null,
    siren_number: clubData?.siren_number ?? null,
    vat_number: clubData?.vat_number ?? null,
    website: clubData?.website ?? null,
    webshop: clubData?.webshop ?? null,
    required_registration_fields: clubData?.required_registration_fields ?? null,
    created_at: clubData?.created_at ?? new Date().toISOString(),
    updated_at: clubData?.updated_at ?? new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (clubData) setForm((prev) => ({ ...prev, ...clubData }));
  }, [clubData]);

  if (!isOpen) return null;

  const handleChange = <K extends keyof Club>(field: K, value: Club[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (mode === "edit") setHasChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (mode === "add") {
        if (!userId) throw new Error("User ID requis pour la création du club");
        result = await addClub(userId, form);
      } else if (mode === "edit" && clubId) {
        result = await updateClub(clubId, form);
      }

      if (result) onSave(result);
      onClose();
    } catch (err) {
      console.error("❌ Erreur lors de la sauvegarde du club :", err);
      alert("Erreur lors de l’enregistrement du club.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-extrabold text-[#14482F] mb-4 text-center">
          {mode === "add" ? "Ajouter un club" : `Modifier le club : ${form.name ?? ""}`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom + code club */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Nom du club <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ex : Olympique du Café du Coin"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>

            {mode === "edit" && (
              <div>
                <label className="block text-sm font-semibold text-[#14482F] items-center justify-between">
                  <span>Code du club</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={form.code ?? ""}
                    disabled
                    placeholder="Code généré automatiquement"
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pr-10 text-sm 
                    text-[#16a34a] placeholder-gray-400 cursor-not-allowed"
                  />
                  {form.code && (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(form.code as string);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#29be4f]"
                      title="Copier le code"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-[#29be4f]" />
                      ) : (
                        <Clipboard className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">Adresse</label>
            <input
              type="text"
              value={form.address ?? ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="10 rue du Stade"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
              text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
          </div>

          {/* Code postal / Ville */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Code postal</label>
              <input
                type="text"
                value={form.postal_code ?? ""}
                onChange={(e) => handleChange("postal_code", e.target.value)}
                placeholder="83000"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Ville</label>
              <input
                type="text"
                value={form.city ?? ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Trifouillis-les-Buts"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
          </div>

          {/* Pays */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">Pays</label>
            <input
              type="text"
              value={form.country ?? ""}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="France"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
              text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
          </div>

          {/* Téléphone / Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Téléphone</label>
              <input
                type="text"
                value={form.phone_number ?? ""}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                placeholder="06 12 34 56 78"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Email du club</label>
              <input
                type="email"
                value={form.email ?? ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="contact@monclub.fr"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
          </div>

          {/* SIRET / SIREN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">SIREN</label>
              <input
                type="text"
                value={form.siren_number ?? ""}
                onChange={(e) => handleChange("siren_number", e.target.value)}
                placeholder="123 456 789"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">SIRET</label>
              <input
                type="text"
                value={form.siret_number ?? ""}
                onChange={(e) => handleChange("siret_number", e.target.value)}
                placeholder="123 456 789 00012"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
          </div>

          {/* Sites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Site web</label>
              <input
                type="url"
                value={form.website ?? ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://www.monclub.fr"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Boutique</label>
              <input
                type="url"
                value={form.webshop ?? ""}
                onChange={(e) => handleChange("webshop", e.target.value)}
                placeholder="https://shop.monclub.fr"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                text-[#14482F] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={
                loading ||
                (mode === "add" && !form.name.trim()) ||
                (mode === "edit" && !hasChanged)
              }
              className="cursor-pointer px-5 py-2 rounded-lg bg-[#29be4f] text-[#14482F] font-extrabold 
              hover:bg-[#63f286] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Enregistrement..."
                : mode === "add"
                ? "Ajouter le club"
                : "Enregistrer"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
