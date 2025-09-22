"use client";
import { useState } from "react";

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      titre: "Bienvenue sur le blog SimplyFoot",
      resume: "Découvrez toutes les actus et conseils pour booster la gestion de votre club.",
      image: "/3.jpg",
      contenu: "Ceci est le premier article du blog. Restez connectés pour plus de contenu exclusif !",
    },
  ]);
  const [form, setForm] = useState({ titre: "", resume: "", image: "", contenu: "" });
  const [isCreating, setIsCreating] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBlogs([
      {
        ...form,
        id: Date.now(),
      },
      ...blogs,
    ]);
    setForm({ titre: "", resume: "", image: "", contenu: "" });
    setIsCreating(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#14482F] to-[#175438] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-extrabold text-[#5BE37D] mb-8">Publier un nouvel article</h1>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="mb-8 px-6 py-3 rounded-lg font-bold bg-[#5BE37D] text-[#14482F] hover:bg-[#68FB7A] shadow transition"
          >
            + Rédiger un article
          </button>
        )}
        {isCreating && (
          <form onSubmit={handleSubmit} className="mb-12 space-y-5">
            <input
              className="w-full rounded-xl border p-3"
              placeholder="Titre de l'article"
              value={form.titre}
              onChange={e => setForm(f => ({ ...f, titre: e.target.value }))}
              required
            />
            <input
              className="w-full rounded-xl border p-3"
              placeholder="Résumé"
              value={form.resume}
              onChange={e => setForm(f => ({ ...f, resume: e.target.value }))}
              required
            />
            <input
              className="w-full rounded-xl border p-3"
              placeholder="Lien image (ex : /3.jpg)"
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            />
            <textarea
              className="w-full rounded-xl border p-3 min-h-[120px]"
              placeholder="Contenu principal"
              value={form.contenu}
              onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))}
              required
            />
            <div className="flex gap-3">
              <button type="submit" className="px-8 py-2 rounded-lg font-bold bg-[#5BE37D] text-[#14482F] hover:bg-[#68FB7A] shadow">
                Publier
              </button>
              <button
                type="button"
                className="px-8 py-2 rounded-lg bg-gray-200 text-[#14482F] hover:bg-gray-300"
                onClick={() => setIsCreating(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        <h2 className="text-xl font-bold mb-3 text-[#14482F]">Aperçu blog</h2>
        <ul className="space-y-8">
          {blogs.map(blog => (
            <li key={blog.id} className="rounded-xl shadow border bg-[#F7F6F3] flex gap-5 p-5">
              <img src={blog.image || "/3.jpg"} alt={blog.titre} className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="font-bold text-lg text-[#14482F]">{blog.titre}</h3>
                <div className="text-[#175438] text-base mb-2">{blog.resume}</div>
                <div className="text-[#232729] text-sm">{blog.contenu.slice(0, 80)}...</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

