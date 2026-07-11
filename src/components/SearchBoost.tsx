import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, Check, MapPin, Star } from "lucide-react";

type Biz = { name: string; rating: string; reviews: string; ours?: boolean; x: number; y: number };
type Query = { text: string; businesses: Biz[] };

const queries: Query[] = [
  {
    text: "milano parrucchieri",
    businesses: [
      { name: "Studio Piega — Brera", rating: "4,9", reviews: "231", ours: true, x: 52, y: 34 },
      { name: "Hair Concept", rating: "4,3", reviews: "88", x: 24, y: 58 },
      { name: "Le Forbici d'Oro", rating: "4,1", reviews: "52", x: 72, y: 66 },
      { name: "Coiffeur Rossi", rating: "3,8", reviews: "40", x: 40, y: 78 },
    ],
  },
  {
    text: "aosta bar",
    businesses: [
      { name: "Il tuo bar", rating: "4,9", reviews: "206", ours: true, x: 46, y: 40 },
      { name: "Caffè Nazionale", rating: "4,4", reviews: "997", x: 68, y: 30 },
      { name: "Palais Ansermin", rating: "4,4", reviews: "756", x: 30, y: 62 },
      { name: "Sport caffè", rating: "3,9", reviews: "29", x: 58, y: 74 },
    ],
  },
  {
    text: "torino dentisti",
    businesses: [
      { name: "Studio Sorriso", rating: "4,9", reviews: "184", ours: true, x: 40, y: 32 },
      { name: "Odontoiatrico Del Malvò", rating: "4,3", reviews: "120", x: 66, y: 52 },
      { name: "Studio Fusaro", rating: "4,2", reviews: "77", x: 26, y: 66 },
      { name: "Centro Torinese", rating: "3,9", reviews: "41", x: 60, y: 80 },
    ],
  },
];

const RANK_STEPS = [3, 2, 1, 0]; // client index in the list: 4° → 1°
const bullets = [
  "Scheda Google ottimizzata e curata ogni mese",
  "Recensioni vere raccolte in automatico",
  "Sito veloce che trasforma visite in chiamate",
];

/** ordered list for a step: client sits at position RANK_STEPS[step] */
function orderFor(q: Query, step: number): Biz[] {
  const client = q.businesses.find((b) => b.ours)!;
  const others = q.businesses.filter((b) => !b.ours);
  const pos = RANK_STEPS[step];
  const out: Biz[] = [];
  let oi = 0;
  for (let i = 0; i < q.businesses.length; i++) out.push(i === pos ? client : others[oi++]);
  return out;
}

export function SearchBoost() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(0);

  // typewriter + query rotation
  useEffect(() => {
    const target = queries[qi].text;
    let t: ReturnType<typeof setTimeout>;
    if (typed.length < target.length) {
      t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 70);
    } else {
      t = setTimeout(() => {
        setTyped("");
        setStep(0);
        setQi((i) => (i + 1) % queries.length);
      }, 5200);
    }
    return () => clearTimeout(t);
  }, [typed, qi]);

  // rank climbing while query fully typed
  useEffect(() => {
    if (typed !== queries[qi].text) return;
    const id = setInterval(() => setStep((s) => (s < RANK_STEPS.length - 1 ? s + 1 : s)), 1100);
    return () => clearInterval(id);
  }, [typed, qi]);

  const q = queries[qi];
  const ordered = orderFor(q, step);
  const clientRank = ordered.findIndex((b) => b.ours) + 1;

  return (
    <section id="ricerche" className="relative mx-auto w-[min(96%,1280px)] py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left copy */}
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
            Il nostro lavoro è farti salire fino al primo posto — con le stelle giuste
            e un sito che convince.
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

        {/* Right: animated Google mock */}
        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)]">
          {/* search bar */}
          <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3.5 md:px-5">
            <span className="font-display text-lg text-ink">G</span>
            <div className="flex-1 truncate text-[15px] text-ink md:text-base">
              {typed}
              <span className="ml-0.5 inline-block h-[1.05em] w-px translate-y-[0.15em] animate-pulse bg-ink/70 align-middle" />
            </div>
            <SearchIcon className="h-4 w-4 text-lime-deep" />
          </div>

          {/* dark map */}
          <div className="relative h-52 w-full overflow-hidden bg-[#17263a] md:h-60">
            {/* streets */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(115deg, transparent 47%, #24405f 47% 50%, transparent 50%), linear-gradient(35deg, transparent 60%, #24405f 60% 62%, transparent 62%), linear-gradient(80deg, transparent 28%, #1e344d 28% 30%, transparent 30%), linear-gradient(160deg, transparent 70%, #1e344d 70% 72%, transparent 72%)",
              }}
            />
            {q.businesses.map((b) => {
              const isClient = !!b.ours;
              return (
                <motion.div
                  key={b.name}
                  animate={{ left: `${b.x}%`, top: `${b.y}%`, scale: isClient ? 1.12 : 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ zIndex: isClient ? 20 : 10 }}
                >
                  <div
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-md ${
                      isClient ? "bg-lime text-ink ring-2 ring-white" : "bg-[#e8734a] text-white"
                    }`}
                  >
                    <Star className={`h-3 w-3 ${isClient ? "fill-ink" : "fill-white"}`} />
                    {b.rating}
                  </div>
                  <div className={`mx-auto h-2 w-2 rotate-45 ${isClient ? "bg-lime" : "bg-[#e8734a]"}`} />
                </motion.div>
              );
            })}
            {/* rank pill */}
            <div className="absolute right-3 top-3 z-30 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-ink shadow backdrop-blur">
              Tu · <span className="text-lime-deep">{clientRank}°</span> su Google
            </div>
          </div>

          {/* results list */}
          <div className="divide-y divide-border">
            {ordered.map((b, i) => (
              <motion.div
                layout
                key={b.name}
                transition={{ layout: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                className={`flex items-center gap-3 px-4 py-3 md:px-5 ${b.ours ? "bg-lime-soft/40" : "bg-background"}`}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold ${b.ours ? "bg-ink text-lime" : "bg-muted text-ink-soft"}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`truncate font-display text-[15px] ${b.ours ? "text-ink" : "text-ink-soft"}`}>{b.name}</span>
                    {b.ours && <span className="shrink-0 rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold text-ink">Il tuo</span>}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[12px] text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {b.rating} ★ ({b.reviews})
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
