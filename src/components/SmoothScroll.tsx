import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      // Smooth anche su touch (iPhone incluso)
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchInertiaExponent: 1.7,
      wheelMultiplier: 1,
      // Gli anchor link (#contatti, #metodo…) scorrono fluidi invece di saltare
      anchors: { offset: -90 },
    });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
