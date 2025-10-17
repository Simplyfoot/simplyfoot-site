"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-start pt-16 pb-12 bg-[#14482F] text-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl bg-white p-10 max-w-md shadow-lg"
            >
                <CheckCircle className="h-16 w-16 text-[#29be4f] mx-auto mb-4" />
                <h1 className="text-3xl font-extrabold text-[#14482F] mb-2">
                    Paiement confirmé 🎉
                </h1>
                <p className="text-[#232729]/80 mb-6">
                    Votre abonnement SimplyFoot est actif.
                    Vous pouvez dès maintenant profiter de toutes les fonctionnalités !
                </p>
                <Link
                    href="/dashboard"
                    className="inline-block rounded-xl bg-[#29be4f] px-6 py-3 font-extrabold text-[#14482F] hover:bg-[#63f286]"
                >
                    Accéder à mon espace
                </Link>
            </motion.div>
        </main>
    );
}
