import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Play, ChevronLeft, ChevronRight, Calendar, Euro, Bike } from "lucide-react";
import { DentalGoogleCard, type CardBadge } from "@/components/DentalGoogleCard";
import { PhoneFrame } from "@/components/PhoneFrame";
import dental1 from "@/assets/dental-1.jpg";
import dental2 from "@/assets/dental-2.jpg";
import dental3 from "@/assets/dental-3.jpg";
import law1 from "@/assets/law-1.jpg";
import law2 from "@/assets/law-2.jpg";
import law3 from "@/assets/law-3.jpg";
import salon1 from "@/assets/site3-after.jpg";
import rest1 from "@/assets/rest-1.jpg";
import rest2 from "@/assets/rest-2.jpg";
import rest3 from "@/assets/rest-3.jpg";
import handLeft from "@/assets/hand-photo-left.png";
import handRight from "@/assets/hand-photo-right.png";

type ProfessionId = "dentista" | "avvocato" | "parrucchiere" | "ristorante";

type Business = {
  name: string;
  category: string;
  address: string;
  website: string;
  photos: string[];
  reviewBefore: string;
  reviewAfter: string;
  reviewerBefore: string;
  reviewerAfter: string;
  hoursBefore: string;
  hoursAfter: string;
  openAfter: boolean;
  badges: CardBadge[];
};

const PROFESSIONS: {
  id: ProfessionId;
  label: string;
  emoji: string;
  question: string;
  business: Business;
}[] = [
  {
    id: "dentista",
    label: "Dentista",
    emoji: "🦷",
    question: "A chi affideresti il tuo sorriso?",
    business: {
      name: "Studio Dentistico Colombo",
      category: "Studio dentistico",
      address: "Via Manzoni 24, Milano",
      website: "www.studiocolombo-dentista.it",
      photos: [dental1, dental2, dental3],
      reviewBefore: "Impossibile capire gli orari, chiamato ma nessuno risponde.",
      reviewAfter: "Prenotato online in 30 secondi, staff professionale e ambiente moderno.",
      reviewerBefore: "Marco T.",
      reviewerAfter: "Laura M.",
      hoursBefore: "Orari non disponibili",
      hoursAfter: "Chiude alle 19:00",
      openAfter: true,
      badges: [
        { icon: Calendar, label: "Prenota", sub: "Online 24/7", bg: "#1a73e8" },
        { icon: Euro, label: "Tariffario", sub: "Trasparente", bg: "#22c55e" },
      ],
    },
  },
  {
    id: "avvocato",
    label: "Avvocato",
    emoji: "⚖️",
    question: "A chi ti affideresti per un consiglio legale?",
    business: {
      name: "Studio Legale Bianchi & Associati",
      category: "Avvocato civilista",
      address: "Corso Vittorio Emanuele 45, Torino",
      website: "www.studiobianchi-legale.it",
      photos: [law1, law2, law3],
      reviewBefore: "Non risponde alle mail, difficile fissare un appuntamento.",
      reviewAfter: "Consulenza chiara fin dal primo contatto, preventivo trasparente.",
      reviewerBefore: "Davide R.",
      reviewerAfter: "Chiara V.",
      hoursBefore: "Orari non disponibili",
      hoursAfter: "Chiude alle 18:30",
      openAfter: true,
      badges: [
        { icon: Calendar, label: "Consulenza", sub: "Prenota online", bg: "#1a73e8" },
        { icon: Euro, label: "Preventivo", sub: "Gratuito", bg: "#22c55e" },
      ],
    },
  },
  {
    id: "parrucchiere",
    label: "Parrucchiere",
    emoji: "✂️",
    question: "Da chi andresti a tagliarti i capelli?",
    business: {
      name: "Brera13 Milano",
      category: "Parrucchiere specialista",
      address: "Via Roma 88, Milano",
      website: "www.brera13milano.com",
      photos: [salon1, salon1, salon1],
      reviewBefore: "Sito inesistente, ho dovuto chiamare più volte per un orario.",
      reviewAfter: "Prenotazione online comoda, foto vere del salone, personale gentile.",
      reviewerBefore: "Giulia P.",
      reviewerAfter: "Elena F.",
      hoursBefore: "Orari non disponibili",
      hoursAfter: "Apre lun alle ore 10",
      openAfter: false,
      badges: [
        { icon: Calendar, label: "Prenota", sub: "Scegli il servizio", bg: "#1a73e8" },
      ],
    },
  },
  {
    id: "ristorante",
    label: "Ristorante",
    emoji: "🍝",
    question: "Che ristorante vorresti provare?",
    business: {
      name: "Trattoria da Marco",
      category: "Ristorante italiano",
      address: "Via Torino 12, Milano",
      website: "www.trattoriadamarco.it",
      photos: [rest1, rest2, rest3],
      reviewBefore: "Nessuna foto del locale, menù non trovato online.",
      reviewAfter: "Ordinato con Deliveroo in pochi click, cibo arrivato caldo e puntuale.",
      reviewerBefore: "Sara N.",
      reviewerAfter: "Alessandro B.",
      hoursBefore: "Orari non disponibili",
      hoursAfter: "Chiude alle 23:00",
      openAfter: true,
      badges: [
        { icon: Bike, label: "Ordina con Deliveroo", sub: "Consegna in 30 min", bg: "#00ccbc" },
      ],
    },
  },
];

export function ProfessionCompare() {
  const [active, setActive] = useState<ProfessionId>("dentista");
  const [flipped, setFlipped] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const profession = PROFESSIONS.find((p) => p.id === active)!;

  const handleWrong = () => setFlipped(true);
  const handleRight = () => {
    if (celebrated) return;
    setCelebrated(true);
    const rect = successRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
      : { x: 0.5, y: 0.5 };
    confetti({
      particleCount: 120,
      spread: 90,
      origin,
      colors: ["#0071e3", "#22c55e", "#fbbc04", "#e879f9"],
    });
    setTimeout(() => setCelebrated(false), 2500);
  };
  const reset = () => setFlipped(false);

  const currentIndex = PROFESSIONS.findIndex((p) => p.id === active);

  const selectProfession = (id: ProfessionId) => {
    setActive(id);
    setFlipped(false);
    setCelebrated(false);
  };

  const step = (dir: 1 | -1) => {
    const next = (currentIndex + dir + PROFESSIONS.length) % PROFESSIONS.length;
    selectProfession(PROFESSIONS[next].id);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => step(-1)}
          aria-label="Professionista precedente"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card shadow-sm transition-all hover:-translate-x-0.5 hover:shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="relative min-w-[220px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={profession.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 text-base font-semibold text-ink md:text-lg"
            >
              <span className="text-xl">{profession.emoji}</span>
              {profession.label}
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => step(1)}
          aria-label="Professionista successivo"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card shadow-sm transition-all hover:translate-x-0.5 hover:shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <h3 className="mt-6 text-center font-display text-2xl leading-tight md:text-3xl">
        {profession.question}
      </h3>

      <div key={profession.id} className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-2 lg:gap-6">
        {/* Non ottimizzata (wrong) */}
        <div className="flex flex-col items-center [zoom:0.55] sm:[zoom:0.75] md:[zoom:1]">
          <div className="mb-4 text-center">
            <span className="rounded-full bg-red-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-600">
              Concorrente
            </span>
          </div>

          <div className="relative w-[320px] max-w-full">
            <img
              src={handLeft}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[222%] max-w-none -translate-x-[60%] -translate-y-[45%] select-none"
            />
            <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
              {[
                { label: "Nessun sito", top: "top-12", delay: "0.2s" },
                { label: "Orari mancanti", top: "top-1/2", delay: "0.5s" },
                { label: "Poche recensioni", top: "bottom-16", delay: "0.8s" },
              ].map((c) => (
                <span
                  key={c.label}
                  className={`callout-pop absolute -left-3 ${c.top} inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-red-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-red-600 shadow-lg`}
                  style={{ animationDelay: c.delay }}
                >
                  <span aria-hidden>✕</span>
                  {c.label}
                </span>
              ))}
            </div>
            <div className="relative z-10">
              <button
                onClick={handleWrong}
                className="block w-full cursor-pointer text-left transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <PhoneFrame>
                  <DentalGoogleCard
                    variant="before"
                    businessName={profession.business.name}
                    category={profession.business.category}
                    address={profession.business.address}
                    website={profession.business.website}
                    photos={profession.business.photos}
                    reviewSnippet={{ before: profession.business.reviewBefore, after: profession.business.reviewAfter }}
                    reviewerBefore={profession.business.reviewerBefore}
                    reviewerAfter={profession.business.reviewerAfter}
                    hoursBefore={profession.business.hoursBefore}
                    hoursAfter={profession.business.hoursAfter}
                    openAfter={profession.business.openAfter}
                    badges={profession.business.badges}
                  />
                </PhoneFrame>
              </button>

              <AnimatePresence>
                {flipped && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 z-20"
                  >
                    <div className="relative mx-auto h-full w-[320px] max-w-full">
                      <div className="relative flex h-full flex-col rounded-[44px] bg-ink p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]">
                        <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
                        <div className="flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[36px] bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
                          <div className="grid h-20 w-20 place-items-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-transform hover:scale-110">
                            <Play className="h-8 w-8 fill-white text-white" />
                          </div>
                          <div className="mt-6 px-8 text-center">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                              Video Spiegazione
                            </div>
                            <h3 className="mt-2 text-lg font-semibold text-white">
                              Perché non funziona
                            </h3>
                            <p className="mt-2 text-xs text-white/50">
                              Ti spieghiamo in 60 secondi cosa manca a questa scheda.
                            </p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); reset(); }}
                            className="mt-8 rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10"
                          >
                            ← Torna alla scheda
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-soft">Tocca per scoprire perché</p>
        </div>

        {/* Ottimizzata (right) */}
        <div ref={successRef} className="flex flex-col items-center [zoom:0.55] sm:[zoom:0.75] md:[zoom:1]">
          <div className="mb-4 text-center">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
              Ottimizzata da noi
            </span>
          </div>
          <div className="relative">
            <img
              src={handRight}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[218%] max-w-none -translate-x-[39%] -translate-y-[45%] select-none"
            />
            <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
              {[
                { label: "SEO migliorata", top: "top-12", delay: "0.35s" },
                { label: "Prenotazioni online", top: "top-1/2", delay: "0.65s" },
                { label: "Foto professionali", top: "bottom-16", delay: "0.95s" },
              ].map((c) => (
                <span
                  key={c.label}
                  className={`callout-pop absolute -right-3 ${c.top} inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-lime px-3 py-1.5 text-[11px] font-semibold text-ink shadow-lg`}
                  style={{ animationDelay: c.delay }}
                >
                  <span aria-hidden>↗</span>
                  {c.label}
                </span>
              ))}
            </div>
            <button
              onClick={handleRight}
              className="relative z-10 block w-full cursor-pointer text-left transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <PhoneFrame>
                <DentalGoogleCard
                  variant="after"
                  businessName={profession.business.name}
                  category={profession.business.category}
                  address={profession.business.address}
                  website={profession.business.website}
                  photos={profession.business.photos}
                  reviewSnippet={{ before: profession.business.reviewBefore, after: profession.business.reviewAfter }}
                  reviewerBefore={profession.business.reviewerBefore}
                  reviewerAfter={profession.business.reviewerAfter}
                  hoursBefore={profession.business.hoursBefore}
                  hoursAfter={profession.business.hoursAfter}
                  openAfter={profession.business.openAfter}
                  badges={profession.business.badges}
                />
              </PhoneFrame>
            </button>

            <AnimatePresence>
              {celebrated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
                >
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-emerald-500 shadow-[0_0_60px_rgba(34,197,94,0.8)]">
                    <Check className="h-12 w-12 text-white" strokeWidth={3} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="mt-4 text-xs font-medium text-emerald-600">Scelta giusta ✓</p>
        </div>
      </div>
    </div>
  );
}
