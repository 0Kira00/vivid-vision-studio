import { Search as SearchIcon, Check } from "lucide-react";

const results = [
  { letter: "TU", name: "Il tuo bar", meta: '4,9 ★ (231) · Aperto ora · "il migliore della zona"', ours: true, rank: "1°" },
  { letter: "B", name: "Caffè Centrale", meta: "4,2 ★ (67)" },
  { letter: "C", name: "Bar Sport", meta: "3,8 ★ (29)" },
];

const bullets = [
  "Scheda Google ottimizzata e curata ogni mese",
  "Recensioni vere raccolte in automatico",
  "Sito veloce che trasforma visite in chiamate",
];

export function SearchBoost() {
  return (
    <section id="ricerche" className="relative mx-auto w-[min(96%,1280px)] py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-deep">
            Ogni ricerca, una vetrina
          </p>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.03]">
            Nel momento esatto in cui un cliente digita, il primo nome è{" "}
            <span className="font-serif-i">il tuo.</span>
          </h2>
          <p className="mt-6 max-w-lg text-ink-soft">
            Ogni giorno migliaia di persone della tua zona cercano quello che offri.
            Il nostro lavoro è farti trovare lì: primo, con le stelle giuste e un sito
            che convince.
          </p>
          <ul className="mt-8 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium md:text-base">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Google search mock */}
        <div className="rounded-3xl border border-border bg-surface p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] md:p-6">
          {/* search bar */}
          <div className="flex items-center gap-3 rounded-2xl bg-background px-4 py-3.5 shadow-sm md:px-5 md:py-4">
            <span className="font-display text-lg text-ink">G</span>
            <span className="flex-1 text-[15px] text-ink md:text-base">
              bar torino
              <span className="ml-0.5 inline-block h-[1.1em] w-px translate-y-[0.15em] animate-pulse bg-ink/70 align-middle" />
            </span>
            <SearchIcon className="h-4 w-4 text-lime-deep" />
          </div>

          {/* results */}
          <div className="mt-3 space-y-2.5">
            {results.map((r) => (
              <div
                key={r.name}
                className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition ${
                  r.ours
                    ? "border-2 border-lime-deep bg-lime-soft/40"
                    : "border border-border bg-background"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                    r.ours ? "bg-ink text-lime" : "bg-muted text-ink-soft"
                  }`}
                >
                  {r.letter}
                </span>
                <div className="min-w-0 flex-1">
                  <div className={`font-display text-lg leading-tight ${r.ours ? "text-ink" : "text-ink-soft"}`}>
                    {r.name}
                  </div>
                  <div className={`mt-0.5 truncate text-[13px] ${r.ours ? "text-ink-soft" : "text-muted-foreground"}`}>
                    {r.meta}
                  </div>
                </div>
                {r.rank && (
                  <span className="shrink-0 rounded-full bg-lime px-3 py-1 text-sm font-bold text-ink">
                    {r.rank}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
