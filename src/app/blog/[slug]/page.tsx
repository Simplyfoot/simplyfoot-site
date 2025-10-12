// app/blog/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ============================================================================
   Données démo (remplace par tes vraies données / fetch DB)
   ============================================================================ */

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;          // mini-markdown (##, ###, -, ``` code ```…)
  date: string;             // ISO
  updated?: string;         // ISO
  cover?: string;           // /public path
  author?: { name: string; avatar?: string };
  tags?: string[];
};

const blogs: readonly BlogPost[] = [
  {
    slug: "comment-optimiser-la-gestion-du-club",
    title: "Comment optimiser la gestion de son club amateur ?",
    excerpt:
      "Automatisez convocations, feuilles de match et centralisez vos docs : gagnez du temps au quotidien.",
    content: `
## Optimiser la gestion de son club

Utilisez SimplyFoot pour automatiser vos convocations, générer vos feuilles de match, centraliser vos docs, etc.

- Planification rapide
- Scan & classement intelligent
- Statistiques avancées
- Communication parents/joueurs

### Pourquoi c'est clé ?

Parce que les bénévoles ont peu de temps : SimplyFoot réduit l'administratif pour se concentrer sur le terrain.
\`\`\`
Exemple pseudo:
convocations.auto(équipe).export("PDF")
\`\`\`
`,
    date: "2024-07-01",
    updated: "2024-07-10",
    cover: "/3.jpg",
    author: { name: "Équipe SimplyFoot" },
    tags: ["Organisation", "Conseils", "Productivité"],
  },
  {
    slug: "7-astuces-pour-parents",
    title: "7 astuces pour mieux communiquer avec les parents de joueurs",
    excerpt:
      "Fluidifiez les échanges grâce aux notifications ciblées, validations d'absence et fiches santé.",
    content: `
## Communication club/familles

Simplifiez la communication et créez un vrai lien grâce à la messagerie, notifications et modules familles de SimplyFoot.

- Notifications personnalisées
- Validation d’absence
- Fiches santé intégrées

### Astuces rapides

- Définissez une charte de communication
- Centralisez les infos pour éviter les doublons
- Utilisez les messages ciblés par équipe
`,
    date: "2024-06-22",
    cover: "/3.jpg",
    author: { name: "Équipe SimplyFoot" },
    tags: ["Parents", "Communication"],
  },
].sort((a, b) => +new Date(b.date) - +new Date(a.date));

/* ============================================================================
   Helpers UI / SEO
   ============================================================================ */

const HOST =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.simplyfoot.fr";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return {};

  const title = post.title;
  const description =
    post.excerpt || post.content.replace(/\s+/g, " ").slice(0, 160);
  const url = `${HOST}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: post.cover
        ? [{ url: post.cover, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

const readingTime = (text: string) => {
  const words = text.replace(/[\n\r]/g, " ").split(/\s+/).filter(Boolean)
    .length;
  const min = Math.max(1, Math.round(words / 200));
  return `${min} min de lecture`;
};

/* ============================================================================
   Mini-parseur Markdown + Table des matières (sans dépendances)
   ============================================================================ */

type TocItem = { id: string; text: string; level: 2 | 3 };
type RenderResult = { nodes: React.ReactNode[]; toc: TocItem[] };

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderMarkdown(md: string): RenderResult {
  const lines = md.replace(/\r\n?/g, "\n").trim().split("\n");
  const out: React.ReactNode[] = [];
  const toc: TocItem[] = [];

  let ul: string[] = [];
  let inCode = false;
  let codeBuffer: string[] = [];

  const flushUl = () => {
    if (!ul.length) return;
    out.push(
      <ul key={`ul-${out.length}`} className="list-disc pl-6 space-y-1">
        {ul.map((t, i) => (
          <li key={i}>{inline(t)}</li>
        ))}
      </ul>
    );
    ul = [];
  };

  const flushCode = () => {
    if (!codeBuffer.length) return;
    out.push(
      <pre
        key={`pre-${out.length}`}
        className="rounded-xl bg-[#0f172a] text-white text-sm p-4 overflow-x-auto"
      >
        <code>{codeBuffer.join("\n")}</code>
      </pre>
    );
    codeBuffer = [];
  };

  const inline = (s: string) => {
    // liens [texte](url)
    const parts: React.ReactNode[] = [];
    let rest = s;
    const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;
    while (linkRe.test(rest)) {
      const m = rest.match(linkRe)!;
      const [all, text, url] = m;
      const before = rest.slice(0, m.index);
      if (before) parts.push(before);
      parts.push(
        <a
          key={`${text}-${url}-${parts.length}`}
          href={url}
          className="underline decoration-[#5BE37D] hover:text-[#5BE37D]"
          target={/^https?:\/\//.test(url) ? "_blank" : undefined}
          rel="noopener"
        >
          {text}
        </a>
      );
      rest = rest.slice(m.index! + all.length);
    }
    if (rest) parts.push(rest);
    return parts.length ? parts : s;
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();

    // blocs code
    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true;
      } else {
        inCode = false;
        flushCode();
      }
      return;
    }
    if (inCode) {
      codeBuffer.push(raw);
      return;
    }

    if (!line) {
      flushUl();
      out.push(<div key={`br-${i}`} className="h-3" />);
      return;
    }

    if (line.startsWith("### ")) {
      flushUl();
      const text = line.replace(/^###\s*/, "");
      const id = slugify(text);
      toc.push({ id, text, level: 3 });
      out.push(
        <h3
          key={`h3-${i}`}
          id={id}
          className="text-xl font-bold text-[#175438] mt-6 mb-2 scroll-mt-24"
        >
          {text}
        </h3>
      );
      return;
    }

    if (line.startsWith("## ")) {
      flushUl();
      const text = line.replace(/^##\s*/, "");
      const id = slugify(text);
      toc.push({ id, text, level: 2 });
      out.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="text-2xl md:text-3xl font-extrabold text-[#175438] mt-8 mb-3 scroll-mt-24"
        >
          {text}
        </h2>
      );
      return;
    }

    if (line.startsWith("- ")) {
      ul.push(line.replace(/^- /, ""));
      return;
    }

    flushUl();
    out.push(
      <p key={`p-${i}`} className="text-[#232729] leading-relaxed">
        {inline(line)}
      </p>
    );
  });

  flushUl();
  flushCode();
  return { nodes: out, toc };
}

/* ============================================================================
   Page
   ============================================================================ */

export default async function BlogArticle(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const { nodes, toc } = renderMarkdown(post.content);
  const idx = blogs.findIndex((b) => b.slug === post.slug);
  const prev = blogs[idx - 1];
  const next = blogs[idx + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: post.author?.name ?? "SimplyFoot",
    image: post.cover ? `${HOST}${post.cover}` : undefined,
    url: `${HOST}/blog/${post.slug}`,
    keywords: post.tags?.join(", "),
    description: post.excerpt,
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fil d’Ariane */}
      <nav className="text-sm text-[#F8E9CA]/80 mb-4">
        <Link href="/" className="hover:text-white">Accueil</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-white">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{post.title}</span>
      </nav>

      {/* En-tête */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#5BE37D] drop-shadow">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[#F8E9CA]">
          <span>{fmt(post.date)}</span>
          <span>•</span>
          <span>{readingTime(post.content)}</span>
          {post.updated && (
            <>
              <span>•</span>
              <span>MAJ&nbsp;: {fmt(post.updated)}</span>
            </>
          )}
          {post.author?.name && (
            <>
              <span>•</span>
              <span>Auteur&nbsp;: {post.author.name}</span>
            </>
          )}
        </div>
        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#5BE37D]/30 bg-[#1d3e2e]/50 px-3 py-1 text-xs font-semibold text-[#F8E9CA]"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {/* Visuel + mise en page 2 colonnes : TOC + article */}
      {post.cover && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-[#5BE37D]/20 shadow">
          <Image
            src={post.cover}
            alt={post.title}
            width={1600}
            height={900}
            className="h-72 w-full object-cover"
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
        {/* TOC */}
        {toc.length ? (
          <aside className="lg:sticky lg:top-24 h-max rounded-2xl border border-[#5BE37D]/20 bg-[#1d3e2e]/40 p-4">
            <div className="text-[#5BE37D] font-bold mb-2">Sommaire</div>
            <ul className="space-y-1 text-sm text-[#F8E9CA]">
              {toc.map((i) => (
                <li key={i.id} className={i.level === 3 ? "ml-3" : ""}>
                  <a
                    href={`#${i.id}`}
                    className="hover:text-white"
                  >
                    {i.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : (
          <div className="hidden lg:block" />
        )}

        {/* Article */}
        <article className="prose prose-lg max-w-none prose-headings:text-[#175438] prose-li:marker:text-[#5BE37D] prose-a:text-[#175438]">
          {nodes}
        </article>
      </div>

      {/* Navigation précédente / suivante */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group rounded-2xl border border-[#5BE37D]/20 bg-[#1d3e2e]/40 p-5 hover:border-[#5BE37D]/40 transition"
          >
            <div className="text-xs text-[#F8E9CA]/80">Article précédent</div>
            <div className="mt-1 font-bold text-white group-hover:text-[#5BE37D]">
              {prev.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group rounded-2xl border border-[#5BE37D]/20 bg-[#1d3e2e]/40 p-5 text-right hover:border-[#5BE37D]/40 transition"
          >
            <div className="text-xs text-[#F8E9CA]/80">Article suivant</div>
            <div className="mt-1 font-bold text-white group-hover:text-[#5BE37D]">
              {next.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* CTA retour / partage simple */}
      <div className="mt-10 flex flex-wrap gap-4 justify-between items-center">
        <Link
          href="/blog"
          className="rounded-xl border border-[#5BE37D]/30 bg-[#1d3e2e]/50 px-4 py-2 text-sm text-[#F8E9CA] hover:text-white"
        >
          ← Revenir au blog
        </Link>
        <div className="text-sm text-[#F8E9CA]">
          Partager :
          <a
            className="ml-2 underline hover:text-white"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title
            )}&url=${encodeURIComponent(`${HOST}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener"
          >
            X/Twitter
          </a>
          <span className="mx-2">•</span>
          <a
            className="underline hover:text-white"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              `${HOST}/blog/${post.slug}`
            )}`}
            target="_blank"
            rel="noopener"
          >
            Facebook
          </a>
          <span className="mx-2">•</span>
          <a
            className="underline hover:text-white"
            href={`mailto:?subject=${encodeURIComponent(
              post.title
            )}&body=${encodeURIComponent(`${HOST}/blog/${post.slug}`)}`}
          >
            Email
          </a>
        </div>
      </div>
    </main>
  );
}
