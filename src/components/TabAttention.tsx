import { useEffect, useRef } from "react";

export function TabAttention({ awayTitle = "Torna qui ;)" }: { awayTitle?: string }) {
  const originalTitle = useRef("");

  useEffect(() => {
    originalTitle.current = document.title;
    const handleVisibility = () => {
      if (document.hidden) {
        originalTitle.current = document.title;
        document.title = awayTitle;
      } else {
        document.title = originalTitle.current;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [awayTitle]);

  return null;
}
