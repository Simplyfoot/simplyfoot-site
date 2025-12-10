"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { updateUser } from "lib/supabaseQueries";
import { User } from "app/_types/User";
import ConfirmModal from "./ConfirmModal";
import { DangerZone } from "components/DangerZone";
import { Info } from "lucide-react";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (form: User) => Promise<void> | void;
  onDelete?: () => void;
  userData: User & { id?: string };
};

export default function EditUserModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  userData,
}: EditUserModalProps) {
  const [form, setForm] = useState<User>(userData);
  const [loading, setLoading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 🧠 Synchronise les données si la modale s’ouvre
  useEffect(() => {
    if (isOpen) {
      setForm(userData);
      setHasChanged(false);
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  // 🔹 Gère la modification des champs
  const handleChange = <K extends keyof User>(field: K, value: User[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHasChanged(true);
  };

  // 🔹 Gère la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanged || !userData.id) return;

    setLoading(true);

    try {
      const res = await updateUser(userData.id, form);

      if (res.success) {
        alert("✅ Profil mis à jour avec succès !");
        await onSave(form);
        onClose();
      } else {
        switch (res.error) {
          case "invalid_email":
            alert("⚠️ Adresse e-mail invalide. Vérifie le format.");
            break;
          case "email_already_used":
            alert("⚠️ Cette adresse e-mail est déjà utilisée par un autre compte.");
            break;
          case "cooldown":
            alert("⏳ Patiente quelques secondes avant de réessayer.");
            break;
          case "db_error":
            alert("❌ Erreur lors de la mise à jour du profil.");
            break;
          default:
            alert("❌ Une erreur inattendue est survenue.");
            console.error(res.details || res);
            break;
        }
      }
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la mise à jour de votre compte.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Rendu JSX
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-extrabold text-[#14482F] mb-4 text-center">
          Modifier mes informations
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom / Prénom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                placeholder="Dupont"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] 
                  placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
                placeholder="Camille"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] 
                  placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
          </div>

          {/* Date de naissance / Genre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Date de naissance
              </label>
              <input
                type="date"
                value={form.birth_date ? form.birth_date.split("T")[0] : ""}
                onChange={(e) => handleChange("birth_date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] 
                  focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Genre
              </label>
              <select
                value={form.gender ?? ""}
                onChange={(e) => handleChange("gender", e.target.value as User["gender"])}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] 
                  focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
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
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] 
                    placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="relative">
              <label className="text-sm font-semibold text-[#14482F] flex items-center">
                Email
                <div className="relative group ml-1 cursor-help">
                  <Info className="h-4 w-4 text-[#29be4f]" />
                  <span
                    className="absolute left-8/2 top-full z-10 mt-1 hidden w-60 -translate-x-1/2 rounded-lg 
                     bg-[#14482F] px-3 py-2 text-xs text-white shadow-lg group-hover:block"
                  >
                    Pour changer votre e-mail, merci de contacter le support SimplyFoot.
                  </span>
                </div>
              </label>

              <input
                type="email"
                value={form.email ?? ""}
                placeholder="adresse@email.com"
                disabled
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm 
                 text-[#14482F] placeholder-gray-400 cursor-not-allowed"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">
                Téléphone
              </label>
              <input
                type="tel"
                value={form.phone_number ?? ""}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                placeholder="06 12 34 56 78"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] 
                 placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
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
              disabled={loading || !hasChanged}
              className="cursor-pointer px-5 py-2 rounded-lg bg-[#29be4f] text-[#14482F] font-extrabold 
                hover:bg-[#63f286] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>

          <DangerZone
            title="Supprimer mon compte"
            message="Toutes vos données seront supprimées de façon permanente."
            onDelete={() => setShowDeleteConfirm(true)}
          />

          <ConfirmModal
            isOpen={showDeleteConfirm}
            title="Confirmer la suppression"
            message="Souhaitez-vous vraiment supprimer votre compte ? Cette action est irréversible."
            confirmLabel="Oui, supprimer mon compte"
            confirmTone="danger"
            onConfirm={onDelete ?? (() => { })}
            onClose={() => setShowDeleteConfirm(false)}
          />
        </form>
      </motion.div>
    </div>
  );
}
