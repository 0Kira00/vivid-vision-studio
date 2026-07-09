import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Search as SearchIcon, Camera, Globe, Calendar, Navigation, Info, Sparkles } from "lucide-react";

type Business = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  ours?: boolean;
};

type Query = {
  city: string;
  service: string;
  businesses: Business[];
  clientName: string;
};

const queries: Query[] = [
  {
    city: "Torino",
    service: "dentisti",
    clientName: "Sabione & Di Bella Dentisti Associati",
    businesses: [
      { name: "Sabione & Di Bella Dentisti Associati", address: "Via Giuseppe Luigi Passalacqua, 3", phone: "011 046 4049", hours: "Apre gio alle ore 08", ours: true },
      { name: "Studio Odontoiatrico Del Malvò", address: "C.so Vittorio Emanuele II, 202", phone: "011 026 3339", hours: "Apre gio alle ore 09" },
      { name: "Studio Dentistico Fusaro", address: "C.so Francesco Ferrucci, 77/10", phone: "011 385 0917", hours: "Apre gio alle ore 08:30" },
      { name: "Centro Odontoiatrico Torinese", address: "Via Cernaia, 24", phone: "011 562 1180", hours: "Apre gio alle ore 09" },
    ],
  },
  {
    city: "Milano",
    service: "parrucchieri",
    clientName: "Studio Piega — Brera",
    businesses: [
      { name: "Studio Piega — Brera", address: "Via Solferino, 14", phone: "02 876 4210", hours: "Apre gio alle ore 09", ours: true },
      { name: "Hair Concept Milano", address: "Corso Como, 9", phone: "02 655 2210", hours: "Apre gio alle ore 10" },
      { name: "Le Forbici d'Oro", address: "Via Torino, 51", phone: "02 866 7412", hours: "Apre gio alle ore 09:30" },
      { name: "Coiffeur Rossi", address: "Viale Monza, 88", phone: "02 289 3315", hours: "Apre gio alle ore 10" },
    ],
  },
  {
    city: "Bologna",
    service: "ristorante pesce",
    clientName: "Osteria del Porto",
    businesses: [
      { name: "Osteria del Porto", address: "Via del Pratello, 42", phone: "051 232 118", hours: "Apre oggi alle ore 19", ours: true },
      { name: "Trattoria Marina", address: "Via Ugo Bassi, 19", phone: "051 445 2130", hours: "Apre oggi alle ore 19:30" },
      { name: "Il Timone", address: "Via San Vitale, 61", phone: "051 227 890", hours: "Apre oggi alle ore 20" },
      { name: "Pescheria Da Aldo", address: "Via Zamboni, 34", phone: "051 331 4478", hours: "Apre oggi alle ore 19" },
    ],
  },
  {
    city: "Firenze",
    service: "personal trainer",
    clientName: "Forma Studio Oltrarno",
    businesses: [
      { name: "Forma Studio Oltrarno", address: "Via de' Serragli, 71", phone: "055 213 6624", hours: "Apre alle ore 07", ours: true },
      { name: "Fit Lab Firenze", address: "Viale Amendola, 12", phone: "055 246 8890", hours: "Apre alle ore 07:30" },
      { name: "Studio Muscle & Mind", address: "Via de' Neri, 8", phone: "055 214 2201", hours: "Apre alle ore 08" },
      { name: "Coach Toscana", address: "Via Palazzuolo, 15", phone: "055 289 1176", hours: "Apre alle ore 07" },
    ],
  },
];

const TYPE_SPEED = 65;
const DELETE_SPEED = 28;
const PAUSE_FULL = 6800;
const PAUSE_EMPTY = 320;

function useTypewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    const target = `${queries[index].city.toLowerCase()} ${queries[index].service}`;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < target.length) {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        t = setTimeout(() => setPhase("deleting"), PAUSE_FULL);
      }
    } else if (text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED);
    } else {
      t = setTimeout(() => {
        setIndex((i) => (i + 1) % queries.length);
        setPhase("typing");
      }, PAUSE_EMPTY);
    }
    return () => clearTimeout(t);
  }, [text, phase, index]);

  return { text, index };
}

const RANK_STEPS = [3, 2, 1, 0];
const STEP_MS = 1500;
const MONTH_LABELS = ["Mese 1", "Mese 2", "Mese 4", "Mese 6"];

function useRankStep(resetKey: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    const id = setInterval(() => {
      setStep((s) => (s < RANK_STEPS.length - 1 ? s + 1 : s));
    }, STEP_MS);
    return () => clearInterval(id);
  }, [resetKey]);
  return step;
}

function orderForStep(q: Query, step: number): Business[] {
  const clientPos = RANK_STEPS[step];
  const others = q.businesses.filter((b) => !b.ours);
  const client = q.businesses.find((b) => b.ours)!;
  const result: Business[] = [];
  let oi = 0;
  for (let i = 0; i < q.businesses.length; i++) {
    if (i === clientPos) result.push(client);
    else result.push(others[oi++]);
  }
  return result;
}

function GoogleLogo() {
  return (
    <span className="font-google select-none text-[22px] font-medium leading-none tracking-tight md:text-[26px]">
      <span style={{ color: "var(--google-blue)" }}>G</span>
      <span style={{ color: "var(--google-red)" }}>o</span>
      <span style={{ color: "var(--google-yellow)" }}>o</span>
      <span style={{ color: "var(--google-blue)" }}>g</span>
      <span style={{ color: "var(--google-green)" }}>l</span>
      <span style={{ color: "var(--google-red)" }}>e</span>
    </span>
  );
}

const PIN_COLORS = ["#ea4335", "#1a73e8", "#34a853", "#fbbc04"];

function Pin({ letter, highlight }: { letter: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm ${
        highlight ? "ring-2 ring-offset-2" : ""
      }`}
      style={{ background: highlight ? "var(--google-blue)" : PIN_COLORS[letter.charCodeAt(0) - 65] ?? "#ea4335" }}
    >
      {letter}
    </span>
  );
}

export function SearchBoost() {
  const { text, index } = useTypewriter();
  const step = useRankStep(index);
  const current = queries[index];
  const ordered = orderForStep(current, step);

  return (
    <section id="ricerche" className="relative mx-auto w-[min(96%,1280px)] py-20 md:py-24">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
        Come ti trovano su Google
      </div>
      <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
        Ogni giorno qualcuno cerca <span className="font-serif-i">esattamente</span> quello che offri.
      </h2>
      <p className="mt-5 max-w-xl text-ink-soft">
        Guarda come nel tempo la tua attività sale su Google — fino a diventare la prima che vedono.
      </p>

      {/* SERP card */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]">
        {/* Search bar */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-4 md:gap-4 md:px-8 md:py-6">
          <GoogleLogo />
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 shadow-sm md:gap-3 md:px-5 md:py-3">
            <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="flex-1 truncate font-google text-[14px] md:text-base">
              <span className="text-foreground">{text}</span>
              <span className="caret text-muted-foreground" />
            </div>
            <Mic className="h-4 w-4 shrink-0 text-google-blue" />
            <Camera className="hidden h-4 w-4 shrink-0 text-google-blue md:block" />
            <span className="mx-1 hidden h-5 w-px bg-border md:block" />
            <SearchIcon className="h-4 w-4 shrink-0 text-google-blue" />
          </div>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Map */}
          <div className="relative min-h-[300px] bg-map md:min-h-[520px]">
            <div className="absolute inset-0">
              {ordered.map((b, i) => {
                const positions = [
                  { top: "22%", left: "38%" },
                  { top: "44%", left: "62%" },
                  { top: "62%", left: "28%" },
                  { top: "74%", left: "70%" },
                ];
                const p = positions[i];
                return (
                  <motion.div
                    key={b.name}
                    layout
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
                    style={p}
                  >
                    {b.ours && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-1 rounded-full bg-google-blue px-2 py-0.5 text-[10px] font-medium text-white shadow"
                      >
                        Tu · {i + 1}°
                      </motion.span>
                    )}
                    <Pin letter={String.fromCharCode(65 + i)} highlight={b.ours} />
                  </motion.div>
                );
              })}
            </div>

            {/* Timeline overlay */}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur md:left-6 md:right-6 md:p-4">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-google-blue" />
                  Percorso su Google
                </span>
                <AnimatePresence mode="wait">
                  <motion.span key={step} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="font-medium text-foreground">
                    {MONTH_LABELS[step]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mt-2 flex gap-1.5">
                {RANK_STEPS.map((_, i) => (
                  <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                    <motion.div initial={{ width: 0 }} animate={{ width: i <= step ? "100%" : 0 }} transition={{ duration: 0.6 }} className="h-full bg-google-blue" />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Posizione media</span>
                <AnimatePresence mode="wait">
                  <motion.span key={`pos-${index}-${step}`} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} className="font-google text-sm font-semibold text-foreground">
                    {RANK_STEPS[step] + 1}° su Google
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="border-t border-border md:border-l md:border-t-0">
            <div className="flex items-center justify-between px-5 pb-2 pt-5 md:px-8 md:pt-7">
              <h3 className="font-google text-xl font-medium text-foreground">Sedi</h3>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>

            <ul className="divide-y divide-border">
              {ordered.map((b, i) => (
                <motion.li
                  layout
                  key={b.name}
                  transition={{ layout: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                  className={`relative px-5 py-4 md:px-8 md:py-5 ${b.ours ? "bg-google-blue/[0.05]" : ""}`}
                >
                  {b.ours && <span className="absolute inset-y-0 left-0 w-1 bg-google-blue" />}
                  <div className="flex items-start gap-3">
                    <Pin letter={String.fromCharCode(65 + i)} highlight={b.ours} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-google truncate text-[15px] font-medium text-foreground">{b.name}</span>
                        {b.ours && <span className="shrink-0 rounded-full bg-google-blue px-2 py-0.5 text-[10px] font-medium text-white">Il tuo studio</span>}
                      </div>
                      <div className="font-google mt-0.5 truncate text-[13px] text-muted-foreground">{b.address} · {b.phone}</div>
                      <div className="font-google mt-0.5 text-[13px]">
                        <span className="text-google-red">Chiuso</span> <span className="text-muted-foreground">· {b.hours}</span>
                      </div>
                    </div>
                    <div className="hidden shrink-0 items-center gap-4 md:flex">
                      <IconBtn icon={<Globe className="h-4 w-4" />} label="Sito web" />
                      <IconBtn icon={<Calendar className="h-4 w-4" />} label="Agenda" />
                      <IconBtn icon={<Navigation className="h-4 w-4" />} label="Indicazioni" filled />
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-4 text-center md:px-8">
              <button type="button" className="font-google rounded-full border border-border px-6 py-2 text-sm text-foreground transition-colors hover:bg-surface-2">
                Altre sedi ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* progress dots */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-sm text-ink-soft">
          Ricerca in corso: <span className="font-google text-foreground">{current.city.toLowerCase()} {current.service}</span>
        </div>
        <div className="flex gap-1.5">
          {queries.map((_, i) => (
            <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-google-blue" : "w-1.5 bg-border"}`} />
          ))}
        </div>
      </div>

      {/* Explanation grid */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { step: "Mese 1", title: "Scheda Google ottimizzata", desc: "Foto vere, orari, categorie, servizi, keyword locali. Google inizia a mostrarti alle persone giuste." },
          { step: "Mese 2 – 4", title: "Sito web veloce e su misura", desc: "Un sito che carica in un lampo, che convince, che Google premia. Le chiamate iniziano ad arrivare." },
          { step: "Mese 4 – 6", title: "Recensioni reali dei clienti", desc: "Sistema automatizzato per raccogliere recensioni vere. Il tuo rating sale, la tua posizione anche." },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="text-xs uppercase tracking-widest text-google-blue">{c.step}</div>
            <h4 className="mt-2 font-display text-2xl leading-tight">{c.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function IconBtn({ icon, label, filled }: { icon: React.ReactNode; label: string; filled?: boolean }) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${filled ? "bg-google-blue text-white" : "border border-google-blue/50 text-google-blue"}`}>
        {icon}
      </span>
      <span className="font-google text-[11px] font-medium text-google-blue">{label}</span>
    </span>
  );
}
