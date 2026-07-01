import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroDesktop from "@/assets/hero-desktop.mp4.asset.json";
import heroMobile from "@/assets/hero-mobile.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  {
    n: "01",
    title: "Siti web che convertono",
    body: "Veloci, eleganti, costruiti per trasformare un visitatore in una prenotazione. Niente template, niente compromessi.",
  },
  {
    n: "02",
    title: "Scheda Google ottimizzata",
    body: "La tua scheda Business Profile diventa il tuo miglior commerciale: aggiornata, completa, scelta.",
  },
  {
    n: "03",
    title: "Primi su Google nella tua zona",
    body: "SEO locale fatta come si deve. Ti facciamo trovare da chi sta cercando proprio te, adesso.",
  },
  {
    n: "04",
    title: "Recensioni che pesano davvero",
    body: "Strategie etiche per raccogliere recensioni vere dai tuoi clienti più felici. Senza scorciatoie.",
  },
  {
    n: "05",
    title: "Foto professionali",
    body: "Servizio fotografico dedicato al tuo studio. La prima impressione passa dagli occhi.",
  },
  {
    n: "06",
    title: "Autorità del brand",
    body: "Logo, palette, copy. Costruiamo l'identità che ti fa sembrare il punto di riferimento del settore.",
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
    a: "Dipende dal progetto, ma partiamo da un'offerta trasparente: nessun costo nascosto, nessun canone forzato. Ne parliamo in una call gratuita.",
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
    <div className="min-h-screen bg-background text-ink font-sans">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
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
          <span className="font-display text-lg tracking-tight">Visibilia</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          <a href="#cosa-facciamo" className="transition hover:text-ink">Cosa facciamo</a>
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
    <section id="top" className="relative pt-20 md:pt-24">
      {/* Video frame */}
      <div className="mx-auto w-[min(96%,1400px)]">
        <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
          {/* Aspect ratio wrapper: mobile 3:4, desktop 16:9 */}
          <div className="relative aspect-[3/4] w-full md:aspect-[16/9]">
            {/* Desktop video */}
            <video
              className="absolute inset-0 hidden h-full w-full object-cover md:block"
              src={heroDesktop.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            {/* Mobile video */}
            <video
              className="absolute inset-0 block h-full w-full object-cover md:hidden"
              src={heroMobile.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            {/* Dim overlay for readability */}
            <div className="pointer-events-none absolute inset-0 bg-black/25" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

            {/* Text overlay */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12 lg:p-16">
              <div className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur-md md:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
                Agenzia digitale per chi vuole farsi notare
              </div>

              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(2.4rem,7vw,6.5rem)] font-normal leading-[0.98] text-white">
                  Siamo il motivo{" "}
                  <em className="italic font-normal opacity-95">
                    per cui ti scelgono
                  </em>{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 px-3 text-ink">su Google</span>
                    <span
                      aria-hidden
                      className="absolute inset-0 -skew-y-2 rounded-full bg-lime"
                    />
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
                  Costruiamo siti web, schede Google e identità digitali per
                  professionisti che hanno smesso di essere{" "}
                  <em className="italic">"il secondo risultato"</em>. Più clic,
                  più chiamate, più clienti — senza compromessi.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#contatti"
                    className="group inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-medium text-ink shadow-[0_10px_30px_-10px_var(--lime-deep)] transition hover:bg-lime-deep"
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

        {/* Result cards */}
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
          <ResultCard
            icon="↗"
            label="Risultato reale"
            headline="+312% chiamate"
            note="parrucchiere a Milano · 90 giorni"
          />
          <ResultCard
            icon="★"
            label="Risultato reale"
            headline="4,9 · 187 recensioni"
            note="da 12 recensioni in 6 mesi"
          />
          <ResultCard
            icon="◎"
            label="Risultato reale"
            headline="1° su Google Maps"
            note="zona di competenza"
          />
        </div>
      </div>
    </section>
  );
}

function ResultCard({
  icon,
  label,
  headline,
  note,
}: {
  icon: string;
  label: string;
  headline: string;
  note: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-5 shadow-[0_10px_40px_-25px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-soft">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-lime text-ink">
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-3 font-display text-2xl leading-tight md:text-3xl">
        {headline}
      </div>
      <div className="mt-1.5 text-sm text-muted-foreground">{note}</div>
    </div>
  );
}

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="mt-20 border-y border-border bg-surface py-5 md:mt-28">
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl md:text-3xl">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-ink-soft">
              {item}
              <span className="text-lime-deep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="cosa-facciamo" className="mx-auto w-[min(96%,1180px)] py-24 md:py-32">
      <SectionLabel>/ 01 — Cosa facciamo</SectionLabel>
      <h2 className="mt-5 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.02]">
        Tutto ciò che serve per{" "}
        <em className="italic">essere scelto</em> prima degli altri.
      </h2>
      <p className="mt-5 max-w-xl text-lg text-ink-soft">
        Lavoriamo con un'idea sola in testa: rendere la tua attività la più
        visibile, la più credibile, la più cliccata della zona.
      </p>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.n} {...s} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-lime-deep/40 hover:shadow-[0_25px_60px_-30px_rgba(0,0,0,0.35)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lime opacity-0 blur-3xl transition duration-500 group-hover:opacity-60"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">{n}</span>
        <span className="h-8 w-8 rounded-full border border-border transition group-hover:rotate-45 group-hover:border-ink" />
      </div>
      <h3 className="mt-6 font-display text-2xl leading-snug">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{body}</p>
    </article>
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

function Faq({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number | null;
  setOpenFaq: (n: number | null) => void;
}) {
  return (
    <section id="faq" className="mx-auto w-[min(96%,1180px)] py-24 md:py-32">
      <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">
        <div>
          <SectionLabel>/ 02 — FAQ</SectionLabel>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.02]">
            Domande <em className="italic">che ci fanno</em> sempre.
          </h2>
          <p className="mt-5 text-ink-soft">
            Se ne hai altre, scrivici. Rispondiamo entro 24 ore — di solito
            molto prima.
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
                    <span className="font-display text-xl md:text-2xl">{f.q}</span>
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
    <section id="contatti" className="mx-auto w-[min(96%,1180px)] pb-24 pt-8">
      <div className="relative overflow-hidden rounded-[32px] bg-ink p-8 text-background md:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime opacity-30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-lime-deep opacity-20 blur-3xl"
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            / 03 — Parliamone
          </div>

          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] font-normal leading-[1.02]">
            Diventiamo <em className="italic">il tuo</em> vantaggio{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-ink">ingiusto</span>
              <span aria-hidden className="absolute inset-0 -skew-y-2 rounded-full bg-lime" />
            </span>
            .
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-white/70">Chiamata conoscitiva · gratuita</p>
              <div className="mt-4 space-y-3">
                <a
                  href="mailto:ciao@visibilia.studio"
                  className="block font-display text-2xl underline-offset-4 hover:underline md:text-3xl"
                >
                  ciao@visibilia.studio
                </a>
                <a
                  href="tel:+390000000000"
                  className="block font-display text-2xl text-white/80 underline-offset-4 hover:underline md:text-3xl"
                >
                  +39 000 000 0000
                </a>
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
            >
              <input
                placeholder="Nome e cognome"
                className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none"
              />
              <input
                placeholder="Attività / categoria"
                className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none"
              />
              <textarea
                rows={3}
                placeholder="Cosa vuoi ottenere?"
                className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none"
              />
              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-medium text-ink transition hover:bg-lime-deep"
              >
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
      <div className="mx-auto flex w-[min(96%,1180px)] flex-col items-start justify-between gap-4 py-8 text-sm text-ink-soft md:flex-row md:items-center">
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
