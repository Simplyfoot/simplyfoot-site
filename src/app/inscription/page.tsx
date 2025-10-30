"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";
import { addClub } from "lib/supabaseQueries";

export default function InscriptionPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    type: "",
    clubName: "",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    tel: "",
    siret: "",
    siren: "",
    address: "",
    city: "",
    postalCode: "",
    cgu: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Mise à jour des champs
  const update = (k: keyof typeof form, v: typeof form[typeof k]) =>
    setForm((f) => ({ ...f, [k]: v }));

  // 🔹 Validation basique côté front
  const validate = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Merci de remplir tous les champs obligatoires.");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return false;
    }
    if (!form.cgu) {
      setError("Vous devez accepter les CGU.");
      return false;
    }
    return true;
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);

    try {
      // 1️⃣ Création du compte Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            account_type: form.type,
            club_name: form.clubName,
            first_name: form.firstName,
            last_name: form.lastName,
            phone: form.tel,
          },
        },
      });

      if (signUpError) {
        setError("Erreur lors de la création du compte : " + signUpError.message);
        setLoading(false);
        return;
      }

      const userId = signUpData.user?.id;
      if (!userId) {
        setError("Erreur : aucun utilisateur créé.");
        setLoading(false);
        return;
      }

      // 2️⃣ Création du profil utilisateur
      const { error: insertError } = await supabase.from("users").insert({
        id: userId,
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.tel || null,
        is_active: true,
        is_child: false,
      });

      if (insertError) {
        setError("Compte créé, mais l’ajout du profil utilisateur a échoué.");
        setLoading(false);
        return;
      }

      if (insertError) {
        console.error("❌ Erreur ajout user:", insertError);
        setError("Compte créé, mais l’ajout du profil utilisateur a échoué.");
        setLoading(false);
        return;
      }

      // 3️⃣ Création du rôle admin lié à cet utilisateur
      const { data: admin, error: adminError } = await supabase
        .from("admins")
        .insert([{ user_id: userId }])
        .select()
        .single();

      if (adminError || !admin) {
        console.error("❌ Erreur création admin:", adminError);
        setError("Erreur lors de la création du rôle administrateur.");
        setLoading(false);
        return;
      }

      // 4️⃣ Création du club et association au président
      try {
        await addClub(userId, {
          name: form.clubName,
          address: form.address || null,
          postal_code: form.postalCode || null,
          city: form.city || null,
          country: "France",
          phone_number: form.tel || null,
          email: form.email,
          siret_number: form.siret || null,
          siren_number: form.siren || null,
          id: "",
          created_by: "",
          code: null,
          created_at: "",
          updated_at: ""
        });
      } catch (clubErr) {
        console.error("❌ Erreur création club:", clubErr);
        setError("Le compte a été créé mais le club n’a pas pu être ajouté.");
        setLoading(false);
        return;
      }

      // 5️⃣ Redirection vers le tableau de bord
      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Erreur inattendue:", err);
      setError("Erreur inattendue lors de l’inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#14482F] flex flex-col items-center justify-center py-10">
      <div className="bg-white/95 rounded-2xl shadow-2xl px-6 py-10 max-w-xl w-full border border-[#29be4f]/10">
        <h1 className="text-3xl font-bold mb-6 text-[#14482F] text-center">
          Rejoignez la communauté <span className="text-[#29be4f]">SimplyFoot</span> !
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Type de compte */}
          <label className="font-semibold text-[#14482F]">
            Vous êtes : <span className="text-red-500">*</span>
            <select
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              value={form.type}
              required
              onChange={(e) => update("type", e.target.value)}
            >
              <option value="">Sélectionnez...</option>
              <option value="club">Un club de football affilié (FFF, Futsal...)</option>
              <option value="association">Une association ou amicale sportive</option>
            </select>
          </label>

          {/* Nom du club */}
          <label className="font-semibold text-[#14482F]">
            {form.type === "club"
              ? "Nom du Club "
              : "Nom de l’association / amicale "}
            <span className="text-red-500">*</span>
            <input
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              type="text"
              required
              value={form.clubName}
              onChange={(e) => update("clubName", e.target.value)}
              placeholder={
                form.type === "association"
                  ? "Ex : Amicale des parents, Les Pitchouns..."
                  : "Ex : FC Provence, US Marseille..."
              }
            />
          </label>

          {/* Nom / Prénom */}
          <div className="flex gap-3">
            <label className="font-semibold text-[#14482F] flex-1">
              Nom du responsable <span className="text-red-500">*</span>
              <input
                className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
                type="text"
                required
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder="Nom"
              />
            </label>
            <label className="font-semibold text-[#14482F] flex-1">
              Prénom du responsable <span className="text-red-500">*</span>
              <input
                className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
                type="text"
                required
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder="Prénom"
              />
            </label>
          </div>

          {/* Email */}
          <label className="font-semibold text-[#14482F]">
            Email <span className="text-red-500">*</span>
            <input
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="adresse@email.com"
            />
          </label>

          {/* Mot de passe + Confirmation avec œils 👁️ */}
          <div className="flex gap-3">
            {/* Mot de passe */}
            <div className="font-semibold text-[#14482F] flex-1 relative">
              Mot de passe <span className="text-red-500">*</span>
              <input
                className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100 pr-10"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-[#14482F]"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 mt-1 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 mt-1 cursor-pointer" />
                )}
              </button>
            </div>

            {/* Confirmation */}
            <div className="font-semibold text-[#14482F] flex-1 relative">
              Confirmation <span className="text-red-500">*</span>
              <input
                className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100 pr-10"
                type={showConfirm ? "text" : "password"}
                required
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-[#14482F]"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5 mt-1 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 mt-1 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          {/* Téléphone */}
          <label className="font-semibold text-[#14482F]">
            Téléphone (optionnel)
            <input
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              type="tel"
              value={form.tel}
              onChange={(e) => update("tel", e.target.value)}
              placeholder="06 12 34 56 78"
            />
          </label>

          {/* CGU */}
          <label className="flex items-center gap-2 pt-4 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={form.cgu}
              onChange={(e) => update("cgu", e.target.checked)}
              className="accent-[#29be4f] w-5 h-5 cursor-pointer"
            />
            <span className="text-[#14482F] text-sm">
              J’ai lu et j’accepte les{" "}
              <a href="/cgu" target="_blank" className="underline hover:text-[#29be4f]">
                conditions générales
              </a>
            </span>
          </label>

          {/* Message d'erreur */}
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}

          {/* Bouton d’inscription */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 px-8 py-3 rounded-lg font-bold text-lg shadow cursor-pointer transition ${loading
                ? "bg-gray-400 cursor-not-allowed text-[#14482F]"
                : "bg-[#29be4f] hover:bg-[#68FB7A] text-[#14482F]"
              }`}
          >
            {loading ? "Création du compte..." : "Créer mon compte"}
          </button>
        </form>

        <p className="text-center text-[#14482F] mt-6">
          Déjà inscrit ?{" "}
          <a href="/connexion" className="underline font-bold hover:text-[#29be4f]">
            Me connecter
          </a>
        </p>
      </div>
    </main>
  );
}
