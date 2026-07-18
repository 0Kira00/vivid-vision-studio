import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Stethoscope,
  Scale,
  UtensilsCrossed,
  Scissors,
  Building2,
  Car,
} from "lucide-react";
import site1After from "@/assets/site1-after.jpg";
import site2After from "@/assets/site2-after.jpg";
import site3After from "@/assets/site3-after.jpg";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/lavori")({
  head: () => ({
    meta: [
      { title: "I nostri lavori — Siti web per dentisti, avvocati, ristoranti e altro | Visibilia" },
      {
        name: "description",
        content: "Scopri i siti web che abbiamo realizzato per dentisti, avvocati, ristoranti di lusso, parrucchieri, architetti e concessionari auto.",
      },
      { property: "og:title", content: "I nostri lavori — Visibilia" },
      {
        property: "og:description",
        content: "Siti web realizzati per professionisti di ogni settore: dentisti, avvocati, ristoranti, parrucchieri, architetti, concessionari.",
      },
      { property: "og:url", content: `${SITE_URL}/lavori` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/lavori` }],
  }),
  component: Lavori,
});

type Work = {
  category: string;
  client: string;
  icon: typeof Stethoscope;
  image?: string;
};

const works: Work[] = [
  { category: "Dentista", client: "Studio Dentistico Bianchi", icon: Stethoscope, image: site2After },
  { category: "Avvocato", client: "Studio Legale Associato", icon: Scale },
  { category: "Ristorante di Lusso", client: "Trattoria da Marco", icon: UtensilsCrossed, image: site1After },
  { category: "Parrucchiere", client: "Chic'a Hair Studio", icon: Scissors, image: site3After },
  { category: "Architetti", client: "Studio di Architettura", icon: Building2 },
  { category: "Concessionario Auto", client: "Autosalone Premium", icon: Car },
];

function Lavori() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-ink font-sans">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-24 h-[420px] w-[420px] rounded-full bg-lime opacity-40 blur-[120px]" />
        <div className="absolute top-[35%] -right-32 h-[520px] w-[520px] rounded-full bg-lime-deep opacity-25 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-lime-soft opacity-50 blur-[130px]" />
      </div>

      <header className="fixed top-3 left-1/2 z-50 w-[min(96%,1180px)] -translate-x-1/2">
        <nav className="flex items-center justify-between rounded-full border border-border/70 bg-surface/80 px-4 py-2.5 backdrop-blur-xl shadow-[0_4px_30px_-15px_rgba(0,0,0,0.15)]">
          <Link to="/" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5)] transition hover:bg-ink/85">
            <span aria-hidden className="text-base transition group-hover:-translate-x-0.5">←</span> Torna al sito
          </Link>
          <Link to="/" className="flex items-center gap-2 pr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-lime-deep shadow-[0_0_20px_var(--lime)]" />
            <span className="font-display text-lg">Visibilia</span>
          </Link>
        </nav>
      </header>

      <section className="mx-auto w-[min(96%,1280px)] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
            I nostri lavori
          </div>
          <h1 className="mx-auto mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]">
            Attività diverse.{" "}
            <span className="font-serif-i">Stesso risultato</span>: scelti su Google.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-ink-soft">
            Ogni settore ha le sue regole. I nostri siti sono costruiti su misura per
            farti sembrare il punto di riferimento della tua zona.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[min(96%,1280px)] pb-24 md:pb-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <div
              key={w.category}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_60px_-40px_rgba(0,0,0,0.3)] transition hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {w.image ? (
                  <img
                    src={w.image}
                    alt={`Sito web per ${w.client}, categoria ${w.category}, realizzato da Visibilia`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lime-soft via-lime to-lime-deep">
                    <w.icon className="h-14 w-14 text-ink/70" strokeWidth={1.25} />
                  </div>
                )}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                  <w.icon className="h-3 w-3" />
                  {w.category}
                </div>
              </div>
              <div className="p-5">
                <div className="font-display text-xl">{w.client}</div>
                <p className="mt-1 text-sm text-ink-soft">
                  {w.image ? "Progetto realizzato da Visibilia" : "Esempio · presto online"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-ink p-10 text-center text-background md:p-14">
          <h2 className="font-display text-3xl md:text-4xl">
            Vuoi il tuo settore <span className="font-serif-i">qui sopra</span>?
          </h2>
          <p className="max-w-md text-white/70">
            Parliamone: scopriamo insieme cosa serve alla tua attività per farsi
            scegliere su Google.
          </p>
          <a
            href="/#contatti"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_var(--lime-deep)] transition hover:bg-lime-deep"
          >
            Parliamone <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-[min(96%,1280px)] flex-col items-start justify-between gap-4 py-8 text-sm text-ink-soft md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime-deep" />
            <span className="font-display text-base text-ink">Visibilia</span>
            <span className="opacity-60">· Agenzia digitale</span>
          </div>
          <div>© {new Date().getFullYear()} — Fatto con cura in Italia.</div>
        </div>
      </footer>
    </div>
  );
}
