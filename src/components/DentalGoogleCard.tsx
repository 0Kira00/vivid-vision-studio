import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Clock, Globe, Bookmark, Navigation, Star, Calendar, Euro } from "lucide-react";

type Variant = "before" | "after";

interface GoogleCardProps {
  variant: Variant;
  businessName?: string;
  category?: string;
  address?: string;
  rating?: { before: number; after: number };
  reviews?: { before: number; after: number };
  photos?: string[];
  reviewSnippet?: { before: string; after: string };
  showBadges?: boolean;
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            className={`h-3 w-3 ${filled ? "fill-lime-deep text-lime-deep" : "fill-black/10 text-black/10"}`}
          />
        );
      })}
    </div>
  );
}

export function DentalGoogleCard({
  variant,
  businessName = "Studio Dentistico Ferrari",
  category = "Studio dentistico",
  address = "Via Manzoni 24, Milano",
  rating = { before: 3.1, after: 4.9 },
  reviews = { before: 8, after: 342 },
  photos = [],
  reviewSnippet = {
    before: "Impossibile capire gli orari, chiamato ma nessuno risponde.",
    after: "Prenotato online in 30 secondi, staff professionale e ambiente moderno.",
  },
  showBadges = true,
}: GoogleCardProps) {
  const isAfter = variant === "after";
  const link = "#1a73e8";

  return (
    <div className="relative w-full overflow-hidden rounded-[36px] bg-white shadow-2xl ring-1 ring-black/10">
      {/* Status bar mock */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-[#202124]">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-3 rounded-sm bg-current opacity-80" />
          <span className="h-2 w-1 rounded-sm bg-current opacity-80" />
          <span className="h-2 w-4 rounded-sm border border-current" />
        </span>
      </div>

      {/* Google search bar mock */}
      <div className="mx-3 mt-2 flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-xs text-[#70757a]">
        <span className="text-[10px]">G</span>
        <span className="truncate">{businessName.toLowerCase()}</span>
      </div>

      {/* Cover */}
      <div className="relative mt-3 h-40 mx-3 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          {isAfter && photos.length > 0 ? (
            <motion.div
              key="after-photos"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid h-full grid-cols-3 gap-0.5"
            >
              <img src={photos[0]} alt={`Foto studio ${businessName}`} className="col-span-2 h-full w-full object-cover" loading="lazy" />
              <div className="grid grid-rows-2 gap-0.5">
                <img src={photos[1] ?? photos[0]} alt={`Interno ${businessName}`} className="h-full w-full object-cover" loading="lazy" />
                <img src={photos[2] ?? photos[0]} alt={`Staff ${businessName}`} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="before-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#f1f3f4]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-black/5">
                <span className="text-lg text-[#70757a]">📷</span>
              </div>
              <span className="text-[10px] text-[#70757a]">Nessuna foto</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="px-5 pt-4">
        <h3 className="text-xl font-normal leading-tight text-[#202124]">{businessName}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs">
          <motion.span
            key={`r-${variant}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={isAfter ? "font-medium text-[#e37400]" : "text-[#70757a]"}
          >
            {(isAfter ? rating.after : rating.before).toFixed(1)}
          </motion.span>
          <Stars value={isAfter ? rating.after : rating.before} />
          <span style={{ color: link }}>
            ({isAfter ? reviews.after.toLocaleString() : reviews.before})
          </span>
        </div>
        <div className="mt-0.5 text-xs text-[#70757a]">{category}</div>
      </div>

      {/* Action row */}
      <div className="mx-5 mt-4 grid grid-cols-4 gap-1 border-y border-black/5 py-3">
        <AnimatePresence>
          {isAfter && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-lime">
                <Globe className="h-3.5 w-3.5 text-ink" />
              </div>
              <span className="text-[9px] font-medium text-ink">Sito</span>
            </motion.div>
          )}
        </AnimatePresence>
        {[
          { icon: Navigation, label: "Percorso" },
          { icon: Bookmark, label: "Salva" },
          { icon: Phone, label: "Chiama" },
        ].map((a) => (
          <div key={a.label} className="flex flex-col items-center gap-1">
            <div className="grid h-8 w-8 place-items-center rounded-full border border-black/10">
              <a.icon className="h-3.5 w-3.5" style={{ color: link }} />
            </div>
            <span className="text-[9px] font-medium" style={{ color: link }}>{a.label}</span>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="space-y-2.5 px-5 pt-3 text-xs">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#70757a]" />
          <span className="text-[#202124]">{address}</span>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#70757a]" />
          <span className="text-[#202124]">
            {isAfter ? (
              <><span className="font-medium text-lime-deep">Aperto</span> · Chiude alle 19:00</>
            ) : (
              <span className="text-[#70757a]">Orari non disponibili</span>
            )}
          </span>
        </div>
        <AnimatePresence>
          {isAfter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-start gap-3"
            >
              <Globe className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#70757a]" />
              <span style={{ color: link }}>www.studioferrari-dentista.it</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Badges */}
      <AnimatePresence>
        {isAfter && showBadges && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-5 mt-4 grid grid-cols-2 gap-2"
          >
            <div className="flex items-center gap-2 rounded-xl bg-black/[0.03] p-2.5">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-lime text-ink">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-[#202124]">Prenota</div>
                <div className="truncate text-[9px] text-[#70757a]">Online 24/7</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-black/[0.03] p-2.5">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-lime-deep text-ink">
                <Euro className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-[#202124]">Tariffario</div>
                <div className="truncate text-[9px] text-[#70757a]">Trasparente</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review snippet */}
      <div className="px-5 pt-4 pb-5">
        <div className="flex items-center gap-2 text-[10px] text-[#70757a]">
          <div className="h-5 w-5 rounded-full bg-black/10" />
          <span>{isAfter ? "Laura M." : "Utente"}</span>
          <Stars value={isAfter ? 5 : 2} />
        </div>
        <motion.p
          key={`snip-${variant}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1.5 text-[11px] leading-snug text-black/70"
        >
          "{isAfter ? reviewSnippet.after : reviewSnippet.before}"
        </motion.p>
      </div>
    </div>
  );
}
