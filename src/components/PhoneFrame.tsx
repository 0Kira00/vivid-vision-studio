import type { ReactNode } from "react";

export function PhoneFrame({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="relative mx-auto w-[320px] max-w-full">
      <div
        className={`relative rounded-[44px] p-2 ${
          dark ? "bg-white/10" : "bg-ink"
        } shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]`}
      >
        <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[36px]">{children}</div>
      </div>
    </div>
  );
}
