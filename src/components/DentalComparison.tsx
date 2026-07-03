import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Play } from "lucide-react";
import { DentalGoogleCard } from "@/components/DentalGoogleCard";
import { PhoneFrame } from "@/components/PhoneFrame";
import dental1 from "@/assets/dental-1.jpg";
import dental2 from "@/assets/dental-2.jpg";
import dental3 from "@/assets/dental-3.jpg";

export function DentalComparison() {
  const [flipped, setFlipped] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

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
      colors: ["#c9f26a", "#8fbf3f", "#101014", "#ffffff"],
    });
    setTimeout(() => setCelebrated(false), 2500);
  };
  const reset = () => setFlipped(false);

  const business = {
    name: "Studio Dentistico Ferrari",
    category: "Studio dentistico",
    address: "Via Manzoni 24, Milano",
    photos: [dental1, dental2, dental3],
    reviewBefore: "Impossibile capire gli orari, chiamato ma nessuno risponde.",
    reviewAfter: "Prenotato online in 30 secondi, staff professionale e ambiente moderno.",
  };

  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-2 lg:gap-6">
      {/* Non ottimizzata (wrong) */}
      <div className="flex flex-col items-center [zoom:0.55] sm:[zoom:0.75] md:[zoom:1]">
        <div className="mb-4 text-center">
          <span className="rounded-full bg-red-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-600">
            Concorrente
          </span>
        </div>

        <div className="relative w-[320px] max-w-full" style={{ perspective: "1600px" }}>
          <motion.div
            className="relative"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div style={{ backfaceVisibility: "hidden" }}>
              <button
                onClick={handleWrong}
                className="block w-full cursor-pointer text-left transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <PhoneFrame>
                  <DentalGoogleCard variant="before" {...business} />
                </PhoneFrame>
              </button>
            </div>

            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="relative mx-auto w-[320px] max-w-full">
                <div className="relative rounded-[44px] bg-ink p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]">
                  <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
                  <div className="flex aspect-[9/17] flex-col items-center justify-center overflow-hidden rounded-[36px] bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-lime/10 backdrop-blur-md ring-1 ring-lime/30 transition-transform hover:scale-110">
                      <Play className="h-8 w-8 fill-lime text-lime" />
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
            </div>
          </motion.div>
        </div>
        <p className="mt-4 text-xs text-ink-soft">Tocca per scoprire perché</p>
      </div>

      {/* Ottimizzata (right) */}
      <div ref={successRef} className="flex flex-col items-center [zoom:0.55] sm:[zoom:0.75] md:[zoom:1]">
        <div className="mb-4 text-center">
          <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
            Ottimizzata da noi
          </span>
        </div>
        <div className="relative">
          <button
            onClick={handleRight}
            className="block cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <PhoneFrame>
              <DentalGoogleCard variant="after" {...business} />
            </PhoneFrame>
          </button>

          <AnimatePresence>
            {celebrated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <div className="grid h-24 w-24 place-items-center rounded-full bg-lime shadow-[0_0_60px_var(--lime)]">
                  <Check className="h-12 w-12 text-ink" strokeWidth={3} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-4 text-xs font-medium text-lime-deep">Scelta giusta ✓</p>
      </div>
    </div>
  );
}
