"use client";

import { motion } from "framer-motion";

type ClubSelectModalProps = {
    clubs: { id: string; name: string }[];
    selectedClub: string | null;
    setSelectedClub: (id: string | null) => void;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ClubSelectModal({
    clubs,
    selectedClub,
    setSelectedClub,
    onCancel,
    onConfirm,
}: ClubSelectModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-6 w-96 shadow-lg text-center"
            >
                <h3 className="text-xl font-extrabold text-[#14482F] mb-4">
                    Choisissez un club à abonner
                </h3>
                <ul className="space-y-2 mb-6">
                    {clubs.map((c) => (
                        <li key={c.id}>
                            <button
                                onClick={() => setSelectedClub(c.id)}
                                className={`w-full cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold ${selectedClub === c.id
                                        ? "bg-[#29be4f] text-[#14482F] border-[#29be4f]"
                                        : "border-gray-300 text-[#14482F] hover:bg-gray-100"
                                    }`}
                            >
                                {c.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer text-sm font-semibold text-gray-500 hover:text-gray-700"
                    >
                        Annuler
                    </button>
                    <button
                        disabled={!selectedClub}
                        onClick={onConfirm}
                        className="cursor-pointer rounded-lg bg-[#29be4f] px-5 py-2 text-sm font-extrabold text-[#14482F] hover:bg-[#63f286] disabled:opacity-60"
                    >
                        Continuer
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
