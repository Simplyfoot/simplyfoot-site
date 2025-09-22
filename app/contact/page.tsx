"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = {
  nom: string;
  email: string;
  sujet: string;
  message: string;
  consent: boolean;
  website?: string; // honeypot anti-spam
};

const initial: FormState = {
  nom: "",
  email: "",
  sujet: "",
  message: "",
  consent: false,
  website: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "ko">(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const charCount = useMemo(() => form.message.trim().length, [form.message]);

  useEffect(() => {
    if (sent) {
      const t = setTimeout(() => setSent(null), 6000);
      return () => clearTimeout(t);
    }
  }, [sent]);

  // ✅ Handler générique, sans any
  const setField =
    <K extends keyof FormState>(name: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v =
        name === "consent"
          ? ((e.target as HTMLInputElement).checked as FormState[K])
          : (e.target.value as FormState[K]);
      setForm((f) => ({ ...f, [name]: v }));
    };

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = "Merci d’indiquer votre nom ou celui du club.";
    if (!emailRegex.test(form.email)) e.email = "Format d’email invalide.";
    if (!form.sujet.trim()) e.sujet = "Merci de préciser le sujet.";
    if (charCount < 10) e.message = "Votre message est un peu court.";
    if (!form.consent) e.consent = "Vous devez accepter la politique de confidentialité.";
    if (form.website && form.website.trim().length > 0) e.website = "Spam détecté.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      // 👉 Branche ici ton backend (ex: /api/contact)
      // const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      // if (!res.ok) throw new Error("send_failed");
      await new Promise((r) => setTimeout(r, 900)); // simulate
      setSent("ok");
      setForm(initial);
      formRef.current?.reset();
    } catch {
      setSent("ko");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-[#14482F]">
      {/* halo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Hero */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#5BE37D] drop-shadow">
            Contactez l’équipe SimplyFoot
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold text-[#D9C6A3]">
            Une question, une démo, un projet club&nbsp;? Nous répondons sous 24h ouvrées.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Infos */}
          <aside className="lg:col-span-2">
            <div className="rounded-3xl border border-[#5BE37D]/20 bg-[#1d3e2e]/70 p-6 text-white backdrop-blur">
              <h2 className="mb-4 text-xl font-extrabold">Parlons-en</h2>

              <InfoRow
                icon={<Mail className="h-5 w-5 text-[#5BE37D]" />}
                label="Email"
                value={
                  <a className="font-semibold hover:underline" href="mailto:contact@simplyfoot.com">
                    contact@simplyfoot.com
                  </a>
                }
              />
              <InfoRow
                icon={<Phone className="h-5 w-5 text-[#5BE37D]" />}
                label="Téléphone"
                value={
                  <a className="font-semibold hover:underline" href="tel:+33682845641">
                    +33&nbsp;6&nbsp;82&nbsp;84&nbsp;56&nbsp;41
                  </a>
                }
              />
              <InfoRow
                icon={<MapPin className="h-5 w-5 text-[#5BE37D]" />}
                label="Adresse"
                value={
                  <span className="font-semibold">
                    Paname boss<br />83200 Le Revest-les-Eaux, France
                  </span>
                }
              />

              <div className="mt-6 rounded-2xl border border-[#5BE37D]/20 bg-[#14482F]/50 p-4">
                <p className="text-sm text-[#D9C6A3]">
                  <strong className="text-white">Conseil personnalisé</strong> — Réservez un créneau
                  de 20 minutes pour découvrir SimplyFoot et vos besoins.
                </p>
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#5BE37D] px-4 py-2 font-extrabold text-[#14482F] hover:bg-[#63f286]"
                >
                  Prendre rendez-vous <Send className="h-4 w-4" />
                </a>
              </div>
            </div>
          </aside>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-[#5BE37D]/20 bg-[#F7F6F3] p-6 shadow"
            >
              <Field
                label="Nom / Club"
                error={errors.nom}
                input={
                  <input
                    name="nom"
                    autoComplete="name"
                    onChange={setField("nom")}
                    className="form-input"
                    placeholder="Votre nom ou celui du club"
                    required
                  />
                }
              />
              <Field
                label="Email"
                error={errors.email}
                input={
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={setField("email")}
                    className="form-input"
                    placeholder="adresse@email.com"
                    required
                  />
                }
              />
              <Field
                label="Sujet"
                error={errors.sujet}
                input={
                  <input
                    name="sujet"
                    onChange={setField("sujet")}
                    className="form-input"
                    placeholder="Sujet de votre demande"
                    required
                  />
                }
              />
              <Field
                label={
                  <div className="flex items-center justify-between">
                    <span>Message</span>
                    <span className="text-xs text-[#14482F]/60">{charCount}/1000</span>
                  </div>
                }
                error={errors.message}
                input={
                  <textarea
                    name="message"
                    onChange={setField("message")}
                    maxLength={1000}
                    className="form-textarea min-h-[120px]"
                    placeholder="Expliquez votre besoin (contexte, effectifs, objectifs)…"
                    required
                  />
                }
              />

              {/* Honeypot (ne pas afficher) */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Votre site web
                  <input name="website" onChange={setField("website")} />
                </label>
              </div>

              <label className="mt-3 flex items-start gap-3 text-sm text-[#14482F]">
                <input
                  name="consent"
                  type="checkbox"
                  onChange={setField("consent")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#5BE37D] focus:ring-[#5BE37D]"
                />
                <span>
                  J’accepte que SimplyFoot me contacte à propos de ma demande. Mes données
                  seront traitées conformément à la politique de confidentialité.
                </span>
              </label>
              {errors.consent && <p className="mt-1 text-sm font-semibold text-rose-700">{errors.consent}</p>}

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5BE37D] px-6 py-3 font-extrabold text-[#14482F] shadow hover:bg-[#63f286] disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  Envoyer
                </button>

                <a
                  href="mailto:contact@simplyfoot.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#5BE37D]/40 px-6 py-3 font-semibold text-[#14482F] hover:border-[#5BE37D]"
                >
                  Ou par email direct
                </a>
              </div>

              {/* Alerts */}
              {sent === "ok" && (
                <Alert
                  tone="success"
                  title="Message envoyé !"
                  text="Merci, votre demande a bien été transmise. Nous revenons vers vous très vite."
                />
              )}
              {sent === "ko" && (
                <Alert
                  tone="error"
                  title="Envoi impossible"
                  text="Désolé, un problème est survenu. Réessayez ou écrivez-nous à contact@simplyfoot.com."
                />
              )}
            </form>
          </div>
        </section>

        {/* Bloc équipe */}
        <section className="mt-12">
          <div className="rounded-3xl border border-[#5BE37D]/20 bg-white/95 p-6 text-center">
            <h3 className="text-2xl font-extrabold text-[#14482F]">Notre équipe à votre service</h3>
            <p className="mx-auto mt-2 max-w-2xl text-[#232729]">
              Des passionnés de terrain, dédiés à simplifier la vie des clubs amateurs.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-8">
              <TeamCard initials="RP" name="Romain Pennacchio" role="Fondateur – Associé" />
              <TeamCard initials="JB" name="Jérémy Baruc" role="Fondateur – Associé" />
            </div>
          </div>
        </section>
      </div>

      {/* utilitaires inputs */}
      <style jsx global>{`
        .form-input {
          @apply mt-2 w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-[#5BE37D];
        }
        .form-textarea {
          @apply mt-2 w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-[#5BE37D];
        }
      `}</style>
    </main>
  );
}

/* ====== composants ======= */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="mt-3 flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-wide text-[#D9C6A3]">{label}</div>
        <div className="text-base leading-6">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: React.ReactNode;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="mb-3 block font-semibold text-[#14482F]">
      {label}
      {input}
      {error && <span className="mt-1 block text-sm font-semibold text-rose-700">{error}</span>}
    </label>
  );
}

function Alert({
  tone,
  title,
  text,
}: {
  tone: "success" | "error";
  title: string;
  text: string;
}) {
  const isSuccess = tone === "success";
  return (
    <div
      role="status"
      className={`mt-5 flex items-start gap-3 rounded-xl p-3 ${
        isSuccess ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
      }`}
    >
      {isSuccess ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
      <div>
        <div className="font-bold">{title}</div>
        <div className="text-sm">{text}</div>
      </div>
    </div>
  );
}

function TeamCard({ initials, name, role }: { initials: string; name: string; role: string }) {
  return (
    <div className="flex w-[220px] flex-col items-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#5BE37D] text-2xl font-extrabold text-[#14482F] shadow">
        {initials}
      </div>
      <div className="mt-2 font-semibold text-[#14482F]">{name}</div>
      <div className="text-sm text-[#14482F]/60">{role}</div>
    </div>
  );
}

