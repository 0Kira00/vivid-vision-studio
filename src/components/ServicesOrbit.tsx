import { useEffect, useState } from "react";
import { Globe, MapPin, Star, Camera } from "lucide-react";

const orbit = [
  { icon: Globe, label: "Sito web", color: "bg-google-blue text-white", benefit: "Più clienti" },
  { icon: MapPin, label: "Google Business", color: "bg-google-red text-white", benefit: "Più ricerche" },
  { icon: Star, label: "Più recensioni", color: "bg-google-yellow text-ink", benefit: "Più fiducia" },
  { icon: Camera, label: "Foto professionali", color: "bg-ink text-background", benefit: "Più autorità" },
];

export function ServicesOrbit() {
  const [active, setActive] = useState(0);

  // cycle the benefit tooltip through the services
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % orbit.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="cosa-facciamo" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto w-[min(96%,1180px)]">
        <div className="mb-4 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
            / 01 — I nostri servizi
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            La tua attività al <span className="font-serif-i text-lime-deep">centro</span>.
            Tutto il resto lavora per te.
          </h2>
        </div>

        {/* Orbit — same layout on every screen size */}
        <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-md lg:max-w-xl">
          {/* rings */}
          <div className="absolute inset-6 rounded-full border border-dashed border-border sm:inset-8" />
          <div className="absolute inset-20 rounded-full border border-dashed border-border sm:inset-24" />

          {/* center */}
          <div className="rise-in absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-ink text-center text-background shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] sm:h-32 sm:w-32">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-background/60 sm:text-xs">La tua</p>
                <p className="font-display text-base sm:text-lg">Attività</p>
              </div>
            </div>
          </div>

          {/* orbiting services */}
          {orbit.map((o, i) => {
            const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
            const r = 42;
            const x = 50 + Math.cos(angle) * r;
            const y = 50 + Math.sin(angle) * r;
            const isActive = active === i;
            return (
              <div
                key={o.label}
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${0.15 + i * 0.1}s` }}
                className="rise-in absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative flex flex-col items-center gap-1.5 sm:gap-2"
                >
                  {/* benefit tooltip — appears when active */}
                  <span
                    className={`absolute -top-9 z-30 whitespace-nowrap rounded-full bg-lime px-3 py-1 text-[11px] font-bold text-ink shadow-lg transition-all duration-300 sm:-top-10 sm:text-xs ${
                      isActive ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-1.5 scale-90 opacity-0"
                    }`}
                  >
                    {o.benefit}
                    <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-lime" />
                  </span>

                  <div
                    className={`grid h-12 w-12 place-items-center rounded-2xl shadow-[0_15px_35px_-15px_rgba(0,0,0,0.4)] transition-transform duration-300 sm:h-16 sm:w-16 ${o.color} ${
                      isActive ? "scale-110 ring-4 ring-lime/60" : ""
                    }`}
                  >
                    <o.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>
                  <div className="rounded-full border border-border bg-card px-2.5 py-0.5 text-center sm:px-3 sm:py-1">
                    <p className="whitespace-nowrap text-[10px] font-semibold text-ink sm:text-xs">{o.label}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-sm text-ink-soft md:mt-10 md:text-base">
          Tutto incluso, <span className="font-semibold text-ink">in un unico abbonamento.</span>
        </p>
      </div>
    </section>
  );
}
