"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown } from "lucide-react";

export function DangerZone({ onDelete, title, message }: { onDelete: () => void, title: string, message: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-8 rounded-lg border border-neutral-200 bg-neutral-50/70 px-4 py-3">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex cursor-pointer w-full items-center justify-between text-left text-xs font-medium text-neutral-700 hover:text-neutral-900"
            >
                <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-neutral-700" />
                    {title}
                </div>
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 border-t border-neutral-200 pt-3 text-center">
                            <p className="text-xs text-neutral-500 mb-3">
                                {message}
                            </p>
                            <button
                                type="button"
                                onClick={onDelete}
                                className="rounded-md border cursor-pointer border-red-200 bg-transparent px-4 py-1.5 text-xs font-semibold text-red-500
                           hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                {title}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
