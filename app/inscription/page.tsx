"use client";

import { useState } from "react";

export default function InscriptionClub() {
  const [form, setForm] = useState({
    type: "", // "club" | "association" | "particulier"
    nomClub: "",
    nomResponsable: "",
    email: "",
    password: "",
    confirmPassword: "",
    tel: "",
    siret: "",
    siren: "",
    adresse: "",
    ville: "",
    codePostal: "",
    cgu: false,
  });
  const [error, setError] = useState("");

  // Pour chaque champ, maj state
  const update = (k: keyof typeof form, v: typeof form[typeof k]) => setForm(f => ({ ...f, [k]: v }));

  // Validation (tu pourras l’améliorer/adapter backend)
  const validate = () => {
    if (!form.nomResponsable || !form.email || !form.password || !form.confirmPassword) {
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

  // Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    // Ici tu peux envoyer vers ton API, puis rediriger :
    window.location.href = "/dashboard";
  };

  return (
    <main className="w-full min-h-screen bg-[#14482F] flex flex-col items-center justify-center py-10">
      <div className="bg-white/95 rounded-2xl shadow-2xl px-6 py-10 max-w-xl w-full border border-[#5BE37D]/10">
        <h1 className="text-3xl font-bold mb-6 text-[#14482F] text-center">
          Inscription d’un club ou d’un particulier
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="font-semibold text-[#14482F]">
            Vous êtes :
            <select
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              value={form.type}
              required
              onChange={e => update("type", e.target.value)}
            >
              <option value="">Sélectionnez...</option>
              <option value="club">Un club affilié (FFF, Futsal...)</option>
              <option value="association">Une association / amicale</option>
              <option value="particulier">Un particulier (famille, auto-organisation)</option>
            </select>
          </label>
          <label className="font-semibold text-[#14482F]">
            Nom du club / association / groupe <span className="text-red-500">*</span>
            <input
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              type="text"
              required
              value={form.nomClub}
              onChange={e => update("nomClub", e.target.value)}
              placeholder="Ex : FC Provence, Amicale Toulon, Famille Durand..."
            />
          </label>
          <label className="font-semibold text-[#14482F]">
            Nom du responsable <span className="text-red-500">*</span>
            <input
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              type="text"
              required
              value={form.nomResponsable}
              onChange={e => update("nomResponsable", e.target.value)}
              placeholder="Nom Prénom"
            />
          </label>
          <label className="font-semibold text-[#14482F]">
            Email <span className="text-red-500">*</span>
            <input
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              type="email"
              required
              value={form.email}
              onChange={e => update("email", e.target.value)}
              placeholder="adresse@email.com"
            />
          </label>
          <div className="flex gap-3">
            <label className="font-semibold text-[#14482F] flex-1">
              Mot de passe <span className="text-red-500">*</span>
              <input
                className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
                type="password"
                required
                value={form.password}
                onChange={e => update("password", e.target.value)}
              />
            </label>
            <label className="font-semibold text-[#14482F] flex-1">
              Confirmation <span className="text-red-500">*</span>
              <input
                className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
                type="password"
                required
                value={form.confirmPassword}
                onChange={e => update("confirmPassword", e.target.value)}
              />
            </label>
          </div>
          <label className="font-semibold text-[#14482F]">
            Téléphone
            <input
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              type="tel"
              value={form.tel}
              onChange={e => update("tel", e.target.value)}
              placeholder="06 12 34 56 78"
            />
          </label>
          {(form.type === "club" || form.type === "association") && (
            <div className="flex gap-3">
              <label className="font-semibold text-[#14482F] flex-1">
                SIRET (optionnel)
                <input
                  className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
                  type="text"
                  value={form.siret}
                  onChange={e => update("siret", e.target.value)}
                  placeholder="14 chiffres"
                  pattern="[0-9]{14}"
                />
              </label>
              <label className="font-semibold text-[#14482F] flex-1">
                SIREN (optionnel)
                <input
                  className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
                  type="text"
                  value={form.siren}
                  onChange={e => update("siren", e.target.value)}
                  placeholder="9 chiffres"
                  pattern="[0-9]{9}"
                />
              </label>
            </div>
          )}
          <label className="font-semibold text-[#14482F]">
            Adresse (optionnel)
            <input
              className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
              type="text"
              value={form.adresse}
              onChange={e => update("adresse", e.target.value)}
              placeholder="Numéro et rue"
            />
          </label>
          <div className="flex gap-3">
            <label className="font-semibold text-[#14482F] flex-1">
              Ville (optionnel)
              <input
                className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
                type="text"
                value={form.ville}
                onChange={e => update("ville", e.target.value)}
              />
            </label>
            <label className="font-semibold text-[#14482F] flex-1">
              Code postal (optionnel)
              <input
                className="block mt-2 w-full px-3 py-2 rounded border border-gray-200 bg-gray-100"
                type="text"
                value={form.codePostal}
                onChange={e => update("codePostal", e.target.value)}
                pattern="[0-9]{5}"
              />
            </label>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              required
              checked={form.cgu}
              onChange={e => update("cgu", e.target.checked)}
              className="accent-[#5BE37D] w-5 h-5"
            />
            <span className="text-[#14482F]">
              J’ai lu et j’accepte les&nbsp;
              <a href="/cgu" target="_blank" className="underline hover:text-[#5BE37D]">conditions générales</a>
            </span>
          </label>
          {error && <div className="text-red-600 font-semibold">{error}</div>}
          <button
            type="submit"
            className="mt-4 px-8 py-3 rounded-lg font-bold bg-[#5BE37D] text-[#14482F] text-lg shadow hover:bg-[#68FB7A] transition"
          >
            Créer mon compte club
          </button>
        </form>
        <p className="text-center text-[#14482F] mt-6">
          Déjà inscrit ?{" "}
          <a href="/connexion" className="underline font-bold hover:text-[#5BE37D]">Me connecter</a>
        </p>
      </div>
    </main>
  );
}
