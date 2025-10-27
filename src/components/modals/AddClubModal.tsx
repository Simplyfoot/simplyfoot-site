"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type AddClubModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clubData: {
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
  }) => void;
};

export default function AddClubModal({ isOpen, onClose, onSave }: AddClubModalProps) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    postal_code: "",
    city: "",
    country: "France",
    phone_number: "",
    email: "",
    siret_number: "",
    siren_number: "",
    website: "",
    webshop: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-extrabold text-[#14482F] mb-4 text-center">
          Ajouter un club
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom du club */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">
              Nom du club <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Ex : FC Provence, AS Toulon, US Marseille..."
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">Adresse</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Rue, numéro, bâtiment..."
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
          </div>

          {/* Code postal / Ville */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Code postal</label>
              <input
                type="text"
                value={form.postal_code}
                onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
                placeholder="Ex : 13008"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Ville</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Ex : Marseille"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
          </div>

          {/* Pays */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">Pays</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder="France"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Téléphone</label>
              <input
                type="tel"
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                placeholder="06 12 34 56 78"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">Email du club</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="contact@monclub.fr"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
          </div>

          {/* SIRET / SIREN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">SIRET</label>
              <input
                type="text"
                value={form.siret_number}
                onChange={(e) => setForm({ ...form, siret_number: e.target.value })}
                placeholder="123 456 789 00012"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#14482F]">SIREN</label>
              <input
                type="text"
                value={form.siren_number}
                onChange={(e) => setForm({ ...form, siren_number: e.target.value })}
                placeholder="123 456 789"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
              />
            </div>
          </div>

          {/* Site web */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">Site web</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://monclub.fr"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
          </div>

          {/* Boutique en ligne */}
          <div>
            <label className="block text-sm font-semibold text-[#14482F]">Boutique en ligne</label>
            <input
              type="url"
              value={form.webshop}
              onChange={(e) => setForm({ ...form, webshop: e.target.value })}
              placeholder="https://shop.monclub.fr"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#14482F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#29be4f]"
            />
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
              className="cursor-pointer px-5 py-2 rounded-lg bg-[#29be4f] text-[#14482F] font-extrabold hover:bg-[#63f286]"
            >
              Ajouter le club
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
