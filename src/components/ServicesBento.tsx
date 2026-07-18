import { Camera, Globe, MapPin, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  number: string;
  title: string;
  description: string;
  metric: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    number: "01",
    title: "Sito web",
    description: "Costruiamo siti veloci, chiari e pronti a convertire visitatori in chiamate.",
    metric: "+180% chiamate",
    icon: Globe,
  },
  {
    number: "02",
    title: "Google Business",
    description: "Ottimizziamo la tua scheda per apparire primo su Google Maps e nelle ricerche locali.",
    metric: "1° in zona",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Foto professionali",
    description: "Scattiamo e selezioniamo le foto che fanno scegliere te al primo sguardo.",
    metric: "+45% clic",
    icon: Camera,
  },
  {
    number: "04",
    title: "Più recensioni",
    description: "Aumentiamo le recensioni positive con flussi semplici e rispettosi del cliente.",
    metric: "4,9 / 5",
    icon: Star,
  },
];

function CellHead({ s, onDark = false }: { s: Service; onDark?: boolean }) {
  return (
    <div className="mb-3 flex items-center gap-2.5 md:mb-4 md:gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink md:h-10 md:w-10">
        <s.icon className="h-4 w-4 md:h-5 md:w-5" />
      </span>
      <span className={`text-xs font-bold ${onDark ? "text-lime" : "text-ink-soft"}`}>
        {s.number}
      </span>
    </div>
  );
}

export function ServicesBento() {
  const [sito, google, foto, recensioni] = services;

  return (
    <section id="cosa-facciamo" className="relative py-16 md:py-20">
      <div className="mx-auto w-[min(96%,1280px)]">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
          / 02 — I nostri servizi
        </div>
        <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
          Quattro servizi.
          <br />
          <span className="font-serif-i">Un unico obiettivo:</span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 px-2 text-ink">renderti visibile.</span>
            <span aria-hidden className="absolute inset-0 -skew-y-1 rounded-full bg-lime" />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-ink-soft">
          Ogni cella ha un ruolo: sito, scheda Google, foto e recensioni lavorano insieme.
        </p>

        {/* 2 colonne anche su mobile — stessa resa "da iPad" ovunque */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {/* Grande — Sito web */}
          <div className="col-span-2 relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-5 md:min-h-[320px] md:p-10 lg:col-span-2">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.35),transparent_45%)]" />
            <div className="relative z-10">
              <CellHead s={sito} />
              <h3 className="mb-2 font-display text-2xl md:text-4xl">{sito.title}</h3>
              <p className="max-w-md text-sm text-ink-soft md:text-base">{sito.description}</p>
            </div>
            <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 md:mt-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border px-3 py-1 text-xs text-ink-soft">
                  Prenotazione online
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-ink-soft">
                  Prezzi visibili
                </span>
              </div>
              <span className="rounded-full bg-lime px-3.5 py-1.5 font-display text-base font-semibold text-ink md:text-xl">
                {sito.metric}
              </span>
            </div>
          </div>

          {/* Scura — Google Business */}
          <div className="relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-5 text-background md:min-h-[320px] md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(163,230,53,0.25),transparent_50%)]" />
            <div className="relative z-10">
              <CellHead s={google} onDark />
              <h3 className="mb-2 font-display text-lg md:text-2xl">{google.title}</h3>
              <p className="text-xs text-white/60 md:text-sm">{google.description}</p>
            </div>
            <div className="relative z-10 mt-5">
              <span className="font-display text-xl font-semibold text-lime md:text-3xl">
                {google.metric}
              </span>
            </div>
          </div>

          {/* Piccola — Foto */}
          <div className="h-full rounded-3xl border border-border bg-card p-5 md:p-8">
            <CellHead s={foto} />
            <h3 className="mb-2 font-display text-lg md:text-2xl">{foto.title}</h3>
            <p className="mb-4 text-xs text-ink-soft md:text-sm">{foto.description}</p>
            <span className="inline-block rounded-full bg-lime px-3 py-1 font-display text-sm font-semibold text-ink md:text-base">
              {foto.metric}
            </span>
          </div>

          {/* Piccola — Recensioni */}
          <div className="h-full rounded-3xl border border-border bg-card p-5 md:p-8">
            <CellHead s={recensioni} />
            <h3 className="mb-2 font-display text-lg md:text-2xl">{recensioni.title}</h3>
            <p className="mb-4 text-xs text-ink-soft md:text-sm">{recensioni.description}</p>
            <span className="inline-block rounded-full bg-lime px-3 py-1 font-display text-sm font-semibold text-ink md:text-base">
              {recensioni.metric}
            </span>
          </div>

          {/* Striscia lime — affianca "Recensioni" su mobile, cella singola su desktop */}
          <div className="flex h-full min-h-[110px] items-center justify-center rounded-3xl bg-lime p-5 text-ink md:p-8">
            <div className="text-center">
              <p className="mb-1 font-display text-xl font-semibold md:text-4xl">Tutto incluso</p>
              <p className="text-xs font-medium md:text-sm">in un unico abbonamento.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
