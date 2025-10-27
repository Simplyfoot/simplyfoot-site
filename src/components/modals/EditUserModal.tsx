"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (form: { firstname: string; lastname: string; email: string }) => Promise<void> | void;
  userData: { firstname: string; lastname: string; email: string };
};

export default function EditUserModal({ isOpen, onClose, onSave, userData }: EditUserModalProps) {
  const [form, setForm] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  // Réinitialiser les données quand la modale s’ouvre
  useEffect(() => {
    if (isOpen) {
      setForm(userData);
      setHasChanged(false);
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHasChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanged) return; // pas de requête inutile
    setLoading(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Une erreur est survenue lors de la mise à jour de votre compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 sm:px-0"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h2 className="text-xl font-extrabold text-[#14482F] mb-4 text-center">
          Modifier mes informations
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Prénom */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">
              Prénom
            </label>
            <input
              type="text"
              value={form.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              autoFocus
              required
            />
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">
              Nom
            </label>
            <input
              type="text"
              value={form.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              required
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
