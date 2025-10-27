"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react"; // 👈 import des icônes Lucide

const AUTH_KEY = "sf_auth";

export default function ConnexionClient() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // 👈 état pour afficher/masquer le mot de passe
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            localStorage.setItem(AUTH_KEY, JSON.stringify(data.session));
            router.push("/dashboard");
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError("Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="w-full min-h-[60vh] bg-[#14482F] flex flex-col items-center justify-start pt-10 lg:pt-16">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm bg-white/95 p-8 rounded-2xl shadow-md"
            >
                <h1 className="text-xl font-bold mb-6 text-[#14482F] text-center">
                    Connexion à l’espace club
                </h1>

                {/* Email */}
                <label className="block mb-4">
                    <span className="text-sm text-gray-700">Email</span>
                    <input
                        type="email"
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
                        required
                    />
                </label>

                {/* Mot de passe + icône œil */}
                <label className="block mb-6 relative">
                    <span className="text-sm text-gray-700">Mot de passe</span>
                    <input
                        type={showPassword ? "text" : "password"} // 👈 toggle ici
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[33px] text-gray-500 hover:text-[#14482F] transition"
                        tabIndex={-1}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 mt-1 cursor-pointer" />
                        ) : (
                            <Eye className="h-5 w-5 mt-1 cursor-pointer" />
                        )}
                    </button>
                </label>

                {/* Erreur */}
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                {/* Bouton Connexion */}
                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full rounded-md bg-[#29be4f] py-2 font-bold text-[#14482F] hover:bg-[#45e066] disabled:opacity-60"
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>

                {/* Lien inscription */}
                <p className="text-center text-[#14482F] mt-6">
                    Pas encore de compte ?{" "}
                    <a
                        href="/inscription"
                        className="underline font-bold hover:text-[#29be4f]"
                    >
                        S'inscrire
                    </a>
                </p>
            </form>
        </main>
    );
}
