"use client";

import { useEffect, useRef } from "react";
import { siteData } from "@/lib/data";

export function Footer() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotlightRef.current;
    if (!spot) return;

    const onMove = (e: MouseEvent) => {
      const rect = spot.getBoundingClientRect();
      spot.style.setProperty("--fx", `${e.clientX - rect.left}px`);
      spot.style.setProperty("--fy", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <footer className="bg-background py-40 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 flex flex-col items-center gap-12">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <p className="text-[12px] text-muted font-[family-name:var(--font-dm-mono)] tracking-[0.08em] uppercase">
            {siteData.monogram} &copy; {new Date().getFullYear()}
          </p>
          <p className="text-[12px] text-muted font-[family-name:var(--font-dm-mono)] tracking-[0.08em] uppercase">
            Advocate
          </p>
        </div>

        <div className="w-full border-t border-divider" />

        {/* Name with spotlight — contained in relative wrapper */}
        <div className="relative w-full flex justify-center">
          {/* Base layer */}
          <h2 className="text-[clamp(2.5rem,8vw,10rem)] font-bold leading-[0.85] text-[#45B6D1] uppercase tracking-[-0.03em] font-[family-name:var(--font-poppins)] whitespace-normal md:whitespace-nowrap opacity-10">
            JEFFITHER NYAGA
          </h2>
          {/* Spotlight layer */}
          <div
            ref={spotlightRef}
            className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
            style={{
              maskImage: "radial-gradient(circle 500px at var(--fx, 50%) var(--fy, 50%), black 20%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle 500px at var(--fx, 50%) var(--fy, 50%), black 20%, transparent 100%)",
            }}
          >
            <h2 className="text-[clamp(2.5rem,8vw,10rem)] font-bold leading-[0.85] text-[#45B6D1] uppercase tracking-[-0.03em] font-[family-name:var(--font-poppins)] whitespace-normal md:whitespace-nowrap">
              JEFFITHER NYAGA
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
