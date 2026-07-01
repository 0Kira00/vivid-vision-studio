import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroDesktop from "@/assets/hero-desktop.mp4";
import heroMobile from "@/assets/hero-mobile.mp4";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  {
    n: "01",
    title: "Siti web che convertono",
    body: "Veloci, eleganti, costruiti per trasformare un visitatore in una prenotazione.",
    tags: ["Design", "Sviluppo", "Copy"],
  },
  {
    n: "02",
    title: "Scheda Google ottimizzata",
    body: "La tua scheda Business Profile diventa il tuo miglior commerciale.",
    tags: ["GBP", "Foto", "Categorie"],
  },
  {
    n: "03",
    title: "Primi su Google nella tua zona",
    body: "SEO locale fatta come si deve. Ti facciamo trovare da chi cerca proprio te.",
    tags: ["SEO locale", "Maps", "Keyword"],
  },
  {
    n: "04",
    title: "Recensioni che pesano davvero",
    body: "Strategie etiche per raccogliere recensioni vere dai tuoi clienti più felici.",
    tags: ["Automazioni", "QR", "Etica"],
  },
  {
    n: "05",
    title: "Foto professionali",
    body: "Servizio fotografico dedicato al tuo studio. La prima impressione passa dagli occhi.",
    tags: ["Shooting", "Editing"],
  },
  {
    n: "06",
    title: "Autorità del brand",
    body: "Logo, palette, copy. L'identità che ti fa sembrare il punto di riferimento del settore.",
    tags: ["Brand", "Voice", "Assets"],
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
  "Siti web su misura",
  "Google Business Profile",
  "SEO locale",
  "Identità visiva",
  "Foto professionali",
  "Recensioni reali",
  "Campagne ADS",
  "Automazioni",
];

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document
      .querySelector<HTMLElement>("[data-lovable-blank-page-placeholder]")
      ?.remove();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-ink font-sans">
      {/* Ambient green blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-24 h-[420px] w-[420px] rounded-full bg-lime opacity-40 blur-[120px]" />
        <div className="absolute top-[35%] -right-32 h-[520px] w-[520px] rounded-full bg-lime-deep opacity-25 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-lime-soft opacity-50 blur-[130px]" />
      </div>

      <Nav />
      <Hero />
      <ResultsStrip />
      <Marquee />
      <Services />
      <PrimaDopo />
      <MilionDollar />
      <Faq openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-3 left-1/2 z-50 w-[min(96%,1180px)] -translate-x-1/2">
      <nav className="flex items-center justify-between rounded-full border border-border/70 bg-surface/80 px-4 py-2.5 backdrop-blur-xl shadow-[0_4px_30px_-15px_rgba(0,0,0,0.15)]">
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

function Hero() {
  return (
    <section id="top" className="relative">
      {/* Full-bleed video, rounded only on the BOTTOM, no side padding */}
      <div className="relative overflow-hidden rounded-b-[28px] md:rounded-b-[48px]">
        <div className="relative aspect-[3/4] w-full md:aspect-[16/9]">
          <video
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            src={heroDesktop}
            autoPlay muted loop playsInline preload="auto"
          />
          <video
            className="absolute inset-0 block h-full w-full object-cover md:hidden"
            src={heroMobile}
            autoPlay muted loop playsInline preload="auto"
          />

          {/* Subtle dim so text stays legible */}
          <div className="pointer-events-none absolute inset-0 bg-black/25" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

          {/* Nav spacer + text overlay */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6 pt-24 md:p-14 md:pt-28 lg:p-20 lg:pt-32">
            <div className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur-md md:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
              Agenzia digitale per chi vuole farsi notare
            </div>

            <div className="max-w-5xl">
              <h1 className="font-display text-[clamp(2.6rem,7.5vw,7rem)] leading-[0.95] text-white">
                Siamo il motivo{" "}
                <span className="font-serif-i text-white/95">per cui ti scelgono</span>{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 px-3 text-ink">su Google</span>
                  <span aria-hidden className="absolute inset-0 -skew-y-2 rounded-full bg-lime" />
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
                Costruiamo siti, schede Google e identità digitali per chi ha smesso di essere{" "}
                <span className="font-serif-i">"il secondo risultato"</span>. Più clic, più chiamate, più clienti.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contatti"
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_var(--lime-deep)] transition hover:bg-lime-deep"
                >
                  Voglio essere il primo
                  <span className="transition group-hover:translate-x-0.5" aria-hidden>↗</span>
                </a>
                <a
                  href="#cosa-facciamo"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Scopri come lavoriamo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const results = [
  { icon: "↗", label: "Chiamate", headline: "+312%", note: "parrucchiere · Milano · 90 giorni" },
  { icon: "★", label: "Rating", headline: "4,9 / 5", note: "da 12 a 187 recensioni in 6 mesi" },
  { icon: "◎", label: "Google Maps", headline: "1° posto", note: "zona di competenza" },
  { icon: "◐", label: "Traffico", headline: "×4,8", note: "visite organiche · 4 mesi" },
];

function ResultsStrip() {
  return (
    <section className="mx-auto mt-8 w-[min(96%,1280px)] md:mt-12">
      {/* Mobile: horizontal snap-scroll. Desktop: 4-col grid. */}
      <div className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
        {results.map((r, i) => (
          <div
            key={i}
            className="group relative min-w-[240px] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[0_10px_40px_-25px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 md:min-w-0"
          >
            <div
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-lime opacity-30 blur-2xl transition group-hover:opacity-60"
            />
            <div className="relative flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-lime text-ink">
                {r.icon}
              </span>
              {r.label}
            </div>
            <div className="relative mt-3 font-display text-3xl leading-none tabular-nums">
              {r.headline}
            </div>
            <div className="relative mt-2 text-xs text-muted-foreground">{r.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="mt-20 border-y border-ink bg-ink py-5 md:mt-28">
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl md:text-3xl">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-white/85">
              {item}
              <span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- SERVICES: redesigned as bento + interactive list ---------- */

function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="cosa-facciamo" className="mx-auto w-[min(96%,1280px)] py-24 md:py-32">
      <div className="flex items-end justify-between gap-8">
        <div>
          <SectionLabel>/ 01 — Cosa facciamo</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            Tutto ciò che serve per{" "}
            <span className="font-serif-i">essere scelto</span> prima degli altri.
          </h2>
        </div>
        <div className="hidden max-w-xs text-sm text-ink-soft md:block">
          Sei leve, un unico obiettivo: renderti la scelta più ovvia della tua zona.
        </div>
      </div>

      {/* Interactive list + preview panel */}
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        {/* LEFT: list */}
        <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <li key={s.n}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative flex w-full items-center gap-5 px-6 py-5 text-left transition ${
                    isActive ? "bg-lime-soft/60" : "hover:bg-muted/60"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold transition ${
                      isActive ? "bg-ink text-lime" : "bg-muted text-ink-soft"
                    }`}
                  >
                    {s.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg md:text-xl">{s.title}</span>
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${
                      isActive
                        ? "border-lime-deep bg-lime text-ink rotate-45"
                        : "border-border text-ink-soft"
                    }`}
                    aria-hidden
                  >
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* RIGHT: preview panel */}
        <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-background md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime opacity-25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime-deep opacity-20 blur-3xl"
          />

          <div key={active} className="rise-in relative">
            <div className="text-xs uppercase tracking-[0.16em] text-lime">
              Servizio {services[active].n}
            </div>
            <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              {services[active].title}
            </h3>
            <p className="mt-4 max-w-md text-base text-white/75">
              {services[active].body}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {services[active].tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              <MiniStat k="Progetti" v="120+" />
              <MiniStat k="Città" v="34" />
              <MiniStat k="Rating medio" v="4,9" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-lime">{v}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/60">{k}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
      <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
      {children}
    </div>
  );
}

/* ---------- PRIMA & DOPO — interactive slider ---------- */

function PrimaDopo() {
  const [pos, setPos] = useState(52);
  const wrap = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(6, Math.min(94, p)));
  };

  return (
    <section id="prima-dopo" className="mx-auto w-[min(96%,1280px)] py-24 md:py-32">
      <SectionLabel>/ 02 — Prima & Dopo</SectionLabel>
      <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
          Stessa attività.{" "}
          <span className="font-serif-i">Un altro mondo</span> su Google.
        </h2>
        <p className="max-w-sm text-ink-soft">
          Trascina la maniglia per vedere il cambio: scheda vuota, foto sbiadite, zero
          recensioni → un profilo che vende da solo.
        </p>
      </div>

      <div
        ref={wrap}
        className="relative mt-10 aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* AFTER (background — full) */}
        <FakeGoogleCard variant="after" />

        {/* BEFORE (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <FakeGoogleCard variant="before" />
        </div>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-[2px] bg-lime shadow-[0_0_20px_var(--lime)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-lime bg-ink text-lime shadow-xl">
            ⇔
          </div>
        </div>

        {/* Labels */}
        <span className="absolute left-4 top-4 z-30 rounded-full bg-ink/85 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/90 backdrop-blur">
          Prima
        </span>
        <span className="absolute right-4 top-4 z-30 rounded-full bg-lime px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-ink">
          Dopo
        </span>
      </div>
    </section>
  );
}

function FakeGoogleCard({ variant }: { variant: "before" | "after" }) {
  const before = variant === "before";
  return (
    <div
      className={`absolute inset-0 flex flex-col ${
        before ? "bg-[oklch(0.94_0.005_95)]" : "bg-white"
      }`}
    >
      {/* Fake cover */}
      <div
        className={`relative h-1/2 w-full ${
          before
            ? "bg-gradient-to-br from-[oklch(0.75_0.02_95)] to-[oklch(0.55_0.02_95)] grayscale"
            : "bg-gradient-to-br from-lime-soft via-lime to-lime-deep"
        }`}
      >
        <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:14px_14px]" />
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-8">
        <div>
          <div className="font-display text-lg md:text-2xl">Studio Bellezza · Milano</div>
          <div className="mt-1 flex items-center gap-2 text-sm">
            {before ? (
              <>
                <span className="text-ink-soft">—</span>
                <span className="text-ink-soft">Nessuna recensione</span>
              </>
            ) : (
              <>
                <span className="font-semibold text-ink">4,9</span>
                <span className="text-lime-deep">★★★★★</span>
                <span className="text-ink-soft">· 187 recensioni</span>
              </>
            )}
          </div>
          <div className="mt-3 text-xs text-ink-soft md:text-sm">
            {before
              ? "Parrucchiere · Chiuso · Nessun sito web"
              : "Parrucchiere · Aperto · Aggiornato oggi"}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Chiamate", "Ricerche", "Sito"].map((k, i) => (
            <div
              key={k}
              className={`rounded-xl border p-3 text-center ${
                before
                  ? "border-border bg-muted/40 text-ink-soft"
                  : "border-lime-deep/30 bg-lime-soft/50"
              }`}
            >
              <div className="font-display text-lg md:text-xl">
                {before ? "3" : i === 0 ? "412" : i === 1 ? "2,1K" : "890"}
              </div>
              <div className="text-[10px] uppercase tracking-wider">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- LA DOMANDA DA UN MILIONE ---------- */

function MilionDollar() {
  const [pick, setPick] = useState<"a" | "b" | null>(null);

  return (
    <section className="mx-auto w-[min(96%,1280px)] py-24 md:py-32">
      <SectionLabel>/ 03 — La domanda da un milione</SectionLabel>
      <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
        <span className="font-serif-i">Da chi</span> andresti?
      </h2>
      <p className="mt-4 max-w-xl text-ink-soft">
        Sei a Milano, cerchi "parrucchiere vicino a me". Ecco i primi due risultati.
        Scegli tu.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <ChoiceCard
          side="a"
          picked={pick === "a"}
          onPick={() => setPick("a")}
          title="Salone Rossi"
          meta="Nessuna recensione · 0 foto · sito rotto"
          points={[
            "Numero di telefono errato",
            "Orari non aggiornati",
            "Ultima recensione: mai",
          ]}
          score="1,2"
          scoreLabel="Fiducia percepita"
        />
        <ChoiceCard
          side="b"
          picked={pick === "b"}
          onPick={() => setPick("b")}
          highlight
          title="Studio Bellezza"
          meta="4,9 · 187 recensioni · 62 foto"
          points={[
            "Foto professionali dello staff",
            "Risposte a tutte le recensioni",
            "Prenotazione in 1 clic",
          ]}
          score="9,7"
          scoreLabel="Fiducia percepita"
        />
      </div>

      <div
        className={`mt-8 overflow-hidden rounded-2xl border transition-all duration-500 ${
          pick
            ? "border-lime-deep bg-lime-soft/60 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        {pick && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">
                Il 96% delle persone sceglie come te
              </div>
              <div className="mt-1 font-display text-xl">
                {pick === "b"
                  ? "Ecco perché la tua scheda Google conta più del tuo biglietto da visita."
                  : "Domanda: la tua scheda oggi assomiglia più al Salone Rossi o allo Studio Bellezza?"}
              </div>
            </div>
            <a
              href="#contatti"
              className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-background transition hover:bg-ink/85"
            >
              Fai la scelta giusta →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function ChoiceCard({
  side,
  title,
  meta,
  points,
  score,
  scoreLabel,
  highlight,
  picked,
  onPick,
}: {
  side: "a" | "b";
  title: string;
  meta: string;
  points: string[];
  score: string;
  scoreLabel: string;
  highlight?: boolean;
  picked: boolean;
  onPick: () => void;
}) {
  return (
    <button
      onClick={onPick}
      className={`group relative overflow-hidden rounded-3xl border p-7 text-left transition duration-300 hover:-translate-y-1 ${
        picked
          ? "border-lime-deep shadow-[0_25px_60px_-30px_var(--lime-deep)]"
          : "border-border"
      } ${highlight ? "bg-card" : "bg-muted/40"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
          Opzione {side.toUpperCase()}
        </span>
        {highlight && (
          <span className="rounded-full bg-lime px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
            Consigliato dagli utenti
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-3xl">{title}</h3>
      <div className="mt-1 text-sm text-ink-soft">{meta}</div>

      <ul className="mt-6 space-y-2 text-sm">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                highlight ? "bg-lime-deep" : "bg-ink/40"
              }`}
            />
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-end justify-between border-t border-border pt-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {scoreLabel}
          </div>
          <div className="font-display text-4xl tabular-nums">
            {score}<span className="text-lg text-ink-soft">/10</span>
          </div>
        </div>
        <span
          className={`grid h-11 w-11 place-items-center rounded-full border transition ${
            picked
              ? "border-lime-deep bg-lime text-ink"
              : "border-border text-ink-soft group-hover:border-ink"
          }`}
        >
          {picked ? "✓" : "→"}
        </span>
      </div>
    </button>
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
  return (
    <section id="faq" className="mx-auto w-[min(96%,1280px)] py-24 md:py-32">
      <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">
        <div>
          <SectionLabel>/ 04 — FAQ</SectionLabel>
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
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-2xl pl-9 text-ink-soft">{f.a}</p>
                  </div>
                </div>
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
    <section id="contatti" className="mx-auto w-[min(96%,1280px)] pb-24 pt-8">
      <div className="relative overflow-hidden rounded-[32px] bg-ink p-8 text-background md:p-16">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime opacity-30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-lime-deep opacity-20 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            / 05 — Parliamone
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
