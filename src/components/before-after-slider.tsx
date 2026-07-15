import { useCallback, useRef, useState, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(x);
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 select-none md:aspect-[2/1]"
      onMouseDown={(e) => {
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      <img
        src={afterSrc}
        alt={afterAlt}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          loading="lazy"
        />
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-background md:text-xs">
        Prima
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-lime px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink md:text-xs">
        Dopo
      </span>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 -translate-x-1/2"
        style={{ left: `${pos}%` }}
      >
        <div className="h-full w-[2px] bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
        <button
          type="button"
          aria-label="Trascina per confrontare"
          className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime text-ink shadow-lg ring-4 ring-white/40 transition active:scale-95"
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging(true);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setDragging(true);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 6-6 6 6 6" />
            <path d="m15 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
