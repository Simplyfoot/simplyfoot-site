"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { updateUser } from "lib/supabaseQueries";
import { User } from "app/_types/User";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (form: User) => Promise<void> | void;
  userData: User & { id?: string };
};

export default function EditUserModal({
  isOpen,
  onClose,
  onSave,
  userData,
}: EditUserModalProps) {
  const [form, setForm] = useState<User>(userData);
  const [loading, setLoading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(userData);
      setHasChanged(false);
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleChange = <K extends keyof User>(field: K, value: User[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHasChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanged || !userData.id) return;

    setLoading(true);
    try {
      await updateUser(userData.id, form);
      await onSave(form);
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la mise à jour de votre compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-extrabold text-[#14482F] mb-4 text-center">
          Modifier mes informations
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Nom <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
                required
              />
            </div>
            {/* Prénom */}
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Prénom <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
                required
              />
            </div>
          </div>


          {/* Date de naissance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Date de naissance</label>
              <input
                type="date"
                value={form.birth_date ? form.birth_date.split("T")[0] : ""}
                onChange={(e) => handleChange("birth_date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Genre</label>
              <select
                value={form.gender ?? ""}
                onChange={(e) => handleChange("gender", e.target.value as any)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              >
                <option value="">— Sélectionner —</option>
                <option value="MALE">Homme</option>
                <option value="FEMALE">Femme</option>
                <option value="OTHER">Autre</option>
              </select>

              {form.gender === "OTHER" && (
                <input
                  type="text"
                  value={form.gender_other_label ?? ""}
                  onChange={(e) => handleChange("gender_other_label", e.target.value)}
                  placeholder="Précisez"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
                />
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              required
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">Téléphone</label>
            <input
              type="tel"
              value={form.phone_number ?? ""}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              placeholder="06 12 34 56 78"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
          </div>

          {/* Boutons */}
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
              disabled={loading || !hasChanged}
              className="cursor-pointer px-5 py-2 rounded-lg bg-[#29be4f] text-[#14482F] font-extrabold hover:bg-[#63f286] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
