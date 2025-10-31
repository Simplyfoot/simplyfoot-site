"use client";

import { motion } from "framer-motion";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel,
  confirmTone = "danger",
  onConfirm,
  onClose,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmTone?: "danger" | "default";
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const confirmClasses =
    confirmTone === "danger"
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "bg-[#29be4f] hover:bg-[#63f286] text-[#14482F]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-xl font-extrabold text-[#14482F] mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-5">{message}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-800">
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`cursor-pointer px-5 py-2 rounded-lg font-bold ${confirmClasses}`}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
