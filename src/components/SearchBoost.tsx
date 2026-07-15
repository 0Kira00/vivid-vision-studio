import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mic, Camera, Search, X, Star, Sparkles, TrendingUp } from "lucide-react";

const CITY = "torino";
const PROFESSION = "dentista";

const competitors = [
  { letter: "A", name: "Studio Dentistico Rossi", meta: "★ 4.3 · Via Garibaldi", top: "26%", left: "62%" },
  { letter: "B", name: "Dental Clinic Nord", meta: "★ 4.1 · Corso Francia", top: "58%", left: "72%" },
];

const steps = [
  { icon: Search, title: "Il cliente digita", body: "«dentista torino» — la ricerca che fa davvero girare il tuo settore.", color: "text-google-blue", bg: "bg-google-blue/10" },
  { icon: TrendingUp, title: "Tu sali in classifica", body: "Ottimizziamo scheda, recensioni e citazioni: entri nei primi 3.", color: "text-google-green", bg: "bg-google-green/10" },
  { icon: Sparkles, title: "Arrivano chiamate", body: "Più visibilità = più contatti diretti, senza pagare per click.", color: "text-google-red", bg: "bg-google-red/10" },
];

export function SearchBoost() {
  return (
    <section id="ricerche" className="relative overflow-hidden bg-muted/40 py-20 md:py-28">
      <div className="mx-auto w-[min(96%,1180px)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
          {/* Demo */}
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-google-blue" />
              Ogni ricerca, una vetrina
            </span>
            <LocalPackDemo />
          </div>

          {/* Explanation */}
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1.05]">
              Come funziona, <span className="font-serif-i text-lime-deep">passo per passo.</span>
            </h2>
            <p className="mt-4 max-w-lg text-ink-soft">
              Il 76% delle ricerche locali si trasforma in una visita o una chiamata entro 24 ore.
              Ecco perché essere nei primi 3 risultati vale più di qualsiasi campagna a pagamento.
            </p>

            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.15, duration: 0.5 }}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${s.bg}`}>
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      <span className="mr-2 font-mono text-xs text-ink-soft">0{i + 1}</span>
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

          </div>
        </div>
      </div>
    </section>
  );
}

function LocalPackDemo() {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const full = `${PROFESSION} ${CITY}`;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(iv);
        setTimeout(() => setPhase(1), 400);
        setTimeout(() => setPhase(2), 1400);
      }
    }, 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]">
      {/* Search bar */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <GoogleLogo className="h-6" />
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
          <Search className="h-4 w-4 text-ink-soft" />
          <span className="flex-1 truncate text-sm text-ink">
            {typed}
            <span className="ml-0.5 inline-block h-4 w-[1.5px] animate-caret bg-ink align-middle" />
          </span>
          {typed && <X className="h-4 w-4 text-ink-soft" />}
          <Mic className="h-4 w-4 text-google-blue" />
          <Camera className="h-4 w-4 text-google-blue" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Map */}
        <div className="relative mb-4 h-44 overflow-hidden rounded-2xl bg-[#e8eef4] sm:h-52">
          <MapGrid />

          {competitors.map((b, i) => (
            <motion.div
              key={b.letter}
              initial={{ y: -40, opacity: 0 }}
              animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.15 * i, type: "spring", stiffness: 260, damping: 18 }}
              style={{ top: b.top, left: b.left }}
              className="absolute -translate-x-1/2 -translate-y-full"
            >
              <Pin letter={b.letter} />
            </motion.div>
          ))}

          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.4 }}
            animate={phase >= 2 ? { y: 0, opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 }}
            style={{ top: "48%", left: "42%" }}
            className="absolute -translate-x-1/2 -translate-y-full"
          >
            <span className="absolute inset-x-0 -bottom-1 mx-auto h-7 w-7 rounded-full bg-google-red/40 animate-ping-slow" />
            <Pin letter="1" highlight big />
            {phase >= 2 && (
              <>
                <Sparkles className="absolute -right-4 -top-3 h-3.5 w-3.5 text-google-yellow animate-sparkle" />
                <Sparkles className="absolute -left-4 top-1 h-3 w-3 text-google-blue animate-sparkle" style={{ animationDelay: "0.4s" }} />
                <Sparkles className="absolute -right-2 top-3 h-2.5 w-2.5 text-google-green animate-sparkle" style={{ animationDelay: "0.9s" }} />
              </>
            )}
          </motion.div>
        </div>

        {/* Results list */}
        <ul className="space-y-2">
          <motion.li
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.1 }}
            className="relative flex items-center gap-3 rounded-xl border border-google-green/30 bg-google-green/5 px-3 py-2.5"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-google-red text-xs font-semibold text-white">1</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">
                La Tua Attività
                <span className="ml-2 rounded-full bg-google-green/15 px-1.5 py-0.5 align-middle text-[10px] font-medium text-google-green">↑ Con noi</span>
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
                <Star className="h-3 w-3 fill-google-yellow text-google-yellow" /> 4.9 · Aperto ora
              </p>
            </div>
            {phase >= 2 && <Sparkles className="h-4 w-4 shrink-0 text-google-yellow animate-sparkle" />}
          </motion.li>

          {competitors.map((b, i) => (
            <motion.li
              key={b.letter}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-google-red/80 text-xs font-semibold text-white">{b.letter}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-ink">{b.name}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{b.meta}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Pin({ letter, highlight, big }: { letter: string; highlight?: boolean; big?: boolean }) {
  return (
    <svg viewBox="0 0 24 32" className={`${big ? "h-11" : "h-8"} w-auto drop-shadow-md`}>
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z" fill={highlight ? "oklch(0.62 0.22 27)" : "oklch(0.55 0.18 25 / 0.75)"} />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter">{letter}</text>
    </svg>
  );
}

function MapGrid() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="lp-streets" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M0 40h80M40 0v80" stroke="white" strokeWidth="8" opacity="0.9" />
        </pattern>
      </defs>
      <rect width="800" height="400" fill="#e8eef4" />
      <rect width="800" height="400" fill="url(#lp-streets)" />
      <path d="M0 200 Q 200 180 400 210 T 800 220" stroke="#c9d6e2" strokeWidth="22" fill="none" />
      <path d="M300 0 Q 320 200 340 400" stroke="#c9d6e2" strokeWidth="18" fill="none" />
      <circle cx="150" cy="120" r="60" fill="#d9e6d2" opacity="0.6" />
      <circle cx="640" cy="300" r="80" fill="#d9e6d2" opacity="0.5" />
    </svg>
  );
}

function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 272 92" className={`${className} w-auto`} aria-hidden>
      <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
      <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
      <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
    </svg>
  );
}
