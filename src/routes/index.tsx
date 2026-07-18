import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroDesktop from "@/assets/hero-desktop.mp4";
import heroMobile from "@/assets/hero-mobile.mp4";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import site1Before from "@/assets/site1-before.jpg";
import site1After from "@/assets/site1-after.jpg";
import { Calendar, Tag, Search } from "lucide-react";
import { ProfessionCompare } from "@/components/ProfessionCompare";
import { SearchBoost } from "@/components/SearchBoost";
import { ServicesBento } from "@/components/ServicesBento";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visibilia — Agenzia digitale: siti web e SEO locale che ti fanno scegliere su Google" },
      {
        name: "description",
        content:
          "Realizziamo siti web, schede Google Business ottimizzate e strategie SEO locali per professionisti. Più visibilità, più chiamate, più clienti. Preventivo gratuito.",
      },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      // Preload the correct hero poster so the first paint has no empty frame.
      { rel: "preload", as: "image", href: "/hero-mobile-poster.jpg", media: "(max-width: 767px)" },
      { rel: "preload", as: "image", href: "/hero-desktop-poster.jpg", media: "(min-width: 768px)" },
    ],
  }),
  component: Index,
});

const methodSteps = [
  {
    n: "1",
    title: "Analisi gratuita",
    body: "Guardiamo come appari su Google oggi: sito, scheda, recensioni, concorrenti.",
    meta: "30 minuti · senza impegno",
  },
  {
    n: "2",
    title: "Fondamenta",
    body: "Sito veloce e scheda Google ottimizzata: le basi su cui Google ti premia.",
    meta: "settimane 1–4",
  },
  {
    n: "3",
    title: "Spinta",
    body: "Recensioni vere, contenuti locali, foto professionali. La posizione sale.",
    meta: "mesi 2–5",
  },
  {
    n: "4",
    title: "Dominio",
    body: "Primo nella tua zona. Report mensile con numeri veri: chiamate, visite, richieste.",
    meta: "dal mese 6 · si mantiene",
  },
];

const faqs = [
  {
    q: "Quanto tempo serve per vedere i primi risultati?",
    a: "I primi segnali (impression, clic, chiamate) arrivano entro 2–4 settimane. Per un posizionamento locale stabile, contiamo tra i 60 e i 90 giorni.",
  },
  {
    q: "Lavorate solo con parrucchieri?",
    a: "No. Lavoriamo con qualsiasi attività locale che voglia farsi scegliere: estetiste, ristoranti, studi professionali, palestre, negozi di quartiere.",
  },
  {
    q: "Quanto costa un sito fatto da voi?",
    a: "Dipende dal progetto, ma partiamo da un'offerta trasparente: nessun costo nascosto, nessun canone forzato.",
  },
  {
    q: "Le recensioni sono vere?",
    a: "Sempre. Usiamo strategie etiche per invitare i tuoi clienti reali a lasciare la loro esperienza. Nessun bot, nessuna scorciatoia.",
  },
  {
    q: "Cosa succede se non sono soddisfatto?",
    a: "Ci sediamo, capiamo cosa non funziona e lo sistemiamo. Il nostro lavoro esiste solo se ti porta risultati concreti.",
  },
];

const marqueeItems = [
  "Realizzato in Italia 🇮🇹",
  "Oltre 80 clienti soddisfatti 👥",
  "Oltre 250 recensioni verificate ⭐️",
  "Supporto rapido e dedicato ⚡",
  "Soluzioni personalizzate per ogni attività 🎯",
  "Report mensile dritto nella tua mail 📬",
  "Sempre reperibili, quando ti serve 📞",
  "Primi su Google. Punto. 📍",
];

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document
      .querySelector<HTMLElement>("[data-lovable-blank-page-placeholder]")
      ?.remove();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-ink font-sans">
        <Nav />
        <Hero />
        <Method />
        <Marquee />
        <ServicesBento />
        <PrimaDopo />
        <SearchBoost />
        <MilionDollar />
        <Faq openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <Contact />
        <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header
      className="fixed left-1/2 z-50 w-[min(96%,1180px)] -translate-x-1/2"
      style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <nav className="flex items-center justify-between rounded-full border border-border/70 bg-surface/65 px-4 py-2.5 backdrop-blur-xl shadow-[0_4px_30px_-15px_rgba(0,0,0,0.15)]">
        <a href="#top" className="flex items-center gap-2 pl-2">
          <span className="h-2.5 w-2.5 rounded-full bg-lime-deep shadow-[0_0_20px_var(--lime)]" />
          <span className="font-display text-lg">Visibilia</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          <a href="#cosa-facciamo" className="transition hover:text-ink">Cosa facciamo</a>
          <a href="#prima-dopo" className="transition hover:text-ink">Prima & Dopo</a>
          <a href="#faq" className="transition hover:text-ink">FAQ</a>
          <a href="#contatti" className="transition hover:text-ink">Contatti</a>
        </div>
        <a
          href="#contatti"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-background transition hover:bg-ink/85"
        >
          Parliamone <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  );
}

function HeroVideo() {
  // One video only: the right file for the device, chosen after mount.
  // Poster <img> renders on the server so the very first paint is already frame 0 —
  // no flash of a late frame, no double download of both mp4s.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  return (
    <>
      <img
        src="/hero-desktop-poster.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />
      <img
        src="/hero-mobile-poster.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 block h-full w-full object-cover md:hidden"
      />
      {isMobile !== null && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={isMobile ? heroMobile : heroDesktop}
          poster={isMobile ? "/hero-mobile-poster.jpg" : "/hero-desktop-poster.jpg"}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      {/* Full-bleed video, rounded only on the BOTTOM, no side padding */}
      <div className="relative overflow-hidden rounded-b-[28px] md:rounded-b-[48px]">
        <div className="relative aspect-[3/4] w-full md:aspect-[16/9]">
          <HeroVideo />

          {/* Subtle dim so text stays legible */}
          <div className="pointer-events-none absolute inset-0 bg-black/25" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

          {/* Nav spacer + text overlay */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-10 md:p-14 lg:p-20">
            <div className="max-w-5xl">
              <h1 className="font-display text-[clamp(2.6rem,7.5vw,7rem)] leading-[0.95] text-white">
                Siamo il motivo
                <br />
                <span className="font-serif-i text-white/95">per cui ti scelgono</span>
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 px-3 text-ink">su Google</span>
                  <span aria-hidden className="absolute inset-0 -skew-y-2 rounded-full bg-lime" />
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
                Costruiamo siti, schede Google e identità digitali per chi ha smesso di essere{" "}
                <span className="font-serif-i whitespace-nowrap">"il secondo risultato"</span>. Più clic, più
                chiamate, più clienti.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contatti"
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_var(--lime-deep)] transition hover:bg-lime-deep"
                >
                  Voglio essere il primo
                  <span className="transition group-hover:translate-x-0.5" aria-hidden>↗</span>
                </a>
                <Link
                  to="/lavori"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  I nostri progetti
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  // Due copie identiche, spaziatura interna agli item: il loop a -50% riparte
  // esattamente dove finisce la prima copia — niente flicker.
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="mt-12 border-y border-ink bg-ink py-4 md:mt-16 md:py-5">
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max whitespace-nowrap font-display text-lg md:text-3xl">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center text-white/85">
              <span className="px-4 md:px-6">{item}</span>
              <span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- IL METODO — timeline centrale con pallini, card alternate ---------- */

function Method() {
  return (
    <section id="metodo" className="relative bg-muted/40 pt-16 pb-10 md:pt-24 md:pb-14">
      <div className="mx-auto w-[min(96%,1280px)]">
        <SectionLabel>/ 01 — Come lavoriamo</SectionLabel>
        <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
          Niente fumo. <span className="font-serif-i">Quattro passi</span>, sempre gli stessi.
        </h2>

        <div className="relative mx-auto mt-12 max-w-4xl md:mt-16">
          {/* Linea verticale: a sinistra su mobile, centrale su desktop */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="space-y-8 md:space-y-12">
            {methodSteps.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={s.n} className="relative">
                  {/* pallino sulla linea */}
                  <span
                    aria-hidden
                    className="absolute left-[7px] top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-lime-deep ring-4 ring-background md:left-1/2 md:top-2.5"
                  />
                  <div className="pl-8 md:grid md:grid-cols-2 md:items-start md:gap-16 md:pl-0">
                    {/* pillola con numero e tempi */}
                    <div className={`md:flex ${flip ? "md:order-2 md:justify-start" : "md:justify-end"}`}>
                      <span className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                        {s.n} · {s.meta}
                      </span>
                    </div>
                    {/* titolo + card */}
                    <div className={`mt-3 md:mt-0 ${flip ? "md:order-1 md:text-right" : ""}`}>
                      <h3 className="font-display text-xl md:text-2xl">{s.title}</h3>
                      <div
                        className={`mt-3 rounded-2xl border border-border bg-card p-4 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.35)] md:p-5 ${
                          flip ? "md:ml-auto" : ""
                        } md:max-w-md`}
                      >
                        <p className="text-sm leading-relaxed text-ink-soft md:text-base">{s.body}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink-soft ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
      {children}
    </div>
  );
}

/* ---------- PRIMA & DOPO — interactive slider ---------- */

const primaDopoHighlights = [
  { icon: Calendar, label: "Prenotazione online" },
  { icon: Tag, label: "Prezzi sempre visibili" },
  { icon: Search, label: "+180% chiamate da Google" },
];

function PrimaDopo() {
  return (
    <section id="prima-dopo" className="relative bg-muted/40 pt-12 pb-20 md:pt-16 md:pb-24">
      <div className="mx-auto w-[min(96%,1280px)]">
      <SectionLabel>/ 03 — Prima & Dopo</SectionLabel>
      <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]">
        Stessa attività.{" "}
        <span className="font-serif-i">Un altro mondo</span>{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2 text-ink">su Google</span>
          <span aria-hidden className="absolute inset-0 -skew-y-1 rounded-full bg-lime" />
        </span>.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center text-ink-soft">
        Trascina la maniglia per vedere il cambio: sito vecchio, foto sbiadite → un
        design che vende da solo.
      </p>

      <div className="mt-12 grid gap-8 md:mt-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] md:p-4">
          <div className="group relative">
            <BeforeAfterSlider
              beforeSrc={site1Before}
              afterSrc={site1After}
              beforeAlt="Sito prima del restyling"
              afterAlt="Sito dopo il restyling"
            />
          </div>

          <div className="mt-4 flex flex-col items-center gap-5 px-2">
            <p className="text-center text-xs text-ink-soft md:text-sm">
              Trascina il cursore centrale · lo stesso brand, un nuovo motore di crescita
            </p>
            <Link
              to="/lavori"
              id="lavori-cta"
              className="animate-cta-bounce inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-base font-semibold text-ink shadow-[0_14px_35px_-10px_var(--lime-deep)] transition hover:bg-lime-deep md:px-6 md:py-3 md:text-sm"
            >
              Visualizza tutti i nostri lavori
              <span aria-hidden>→</span>
            </Link>
          </div>

        </div>

        {/* "Cosa cambia" — solo desktop */}
        <div className="hidden flex-col justify-between rounded-3xl bg-ink p-8 text-background lg:flex xl:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-lime">Cosa cambia</p>
            <h3 className="mt-3 font-display text-3xl leading-tight">
              Non un sito più bello. <span className="font-serif-i">Un sito che lavora.</span>
            </h3>

            <ul className="mt-8 space-y-4">
              {primaDopoHighlights.map((h) => (
                <li
                  key={h.label}
                  className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                    <h.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm md:text-base">{h.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#contatti"
            className="mt-8 inline-flex items-center justify-between gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-lime-deep"
          >
            Voglio un sito così
            <span>→</span>
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ---------- LA DOMANDA DA UN MILIONE ---------- */

function MilionDollar() {
  return (
    <section className="relative bg-muted/40 py-16 md:py-24">
      <div className="mx-auto w-[min(96%,1280px)]">
      <SectionLabel>/ 05 — La domanda da un milione</SectionLabel>
      <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
        <span className="font-serif-i">Da chi</span>{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2 text-ink">andresti</span>
          <span aria-hidden className="absolute inset-0 -skew-y-1 rounded-full bg-lime" />
        </span>?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-ink-soft">
        Bastano 3 secondi perché un cliente decida chi chiamare e chi ignorare.
        In quei 3 secondi, la tua scheda deve distinguersi dalla concorrenza.
      </p>

      <div className="mt-12 md:mt-16">
        <ProfessionCompare />
      </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function Faq({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number | null;
  setOpenFaq: (n: number | null) => void;
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="relative pt-20 pb-8 md:pt-24 md:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto grid w-[min(96%,1280px)] gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">
        <div>
          <SectionLabel align="left">/ 06 — FAQ</SectionLabel>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
            Domande <span className="font-serif-i">che ci fanno</span> sempre.
          </h2>
          <p className="mt-5 text-ink-soft">
            Se ne hai altre, scrivici. Rispondiamo entro 24 ore — di solito prima.
          </p>
        </div>

        <ul className="divide-y divide-border border-t border-b border-border">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <li key={i}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition hover:text-ink"
                  aria-expanded={open}
                >
                  <span className="flex items-baseline gap-5">
                    <span className="text-xs tabular-nums text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg md:text-xl">{f.q}</span>
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition ${
                      open ? "rotate-45 bg-lime border-lime-deep" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="max-w-2xl pb-6 pl-9 text-ink-soft">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contatti" className="mx-auto w-[min(96%,1280px)] pb-24 pt-0">
      <div className="relative overflow-hidden rounded-[32px] bg-ink p-8 text-background md:p-16">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime opacity-30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-lime-deep opacity-20 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Parliamone
          </div>

          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] leading-[1.02]">
            Diventiamo <span className="font-serif-i">il tuo</span> vantaggio{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-ink">ingiusto</span>
              <span aria-hidden className="absolute inset-0 -skew-y-2 rounded-full bg-lime" />
            </span>.
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-white/70">Chiamata conoscitiva · gratuita</p>
              <div className="mt-4 space-y-3">
                <a href="mailto:ciao@visibilia.studio" className="block font-display text-2xl underline-offset-4 hover:underline md:text-3xl">
                  ciao@visibilia.studio
                </a>
                <a href="tel:+390000000000" className="block font-display text-2xl text-white/80 underline-offset-4 hover:underline md:text-3xl">
                  +39 000 000 0000
                </a>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <input placeholder="Nome e cognome" className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none" />
              <input type="email" placeholder="Email" className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none" />
              <input placeholder="Attività / categoria" className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none" />
              <textarea rows={3} placeholder="Cosa vuoi ottenere?" className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none" />
              <button type="submit" className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-lime-deep">
                Invia richiesta <span aria-hidden>↗</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
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
  );
}
