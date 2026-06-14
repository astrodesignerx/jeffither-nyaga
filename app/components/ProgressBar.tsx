"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function ProgressBar({
  name,
  level,
}: {
  name: string;
  level: number;
}) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setWidth(level);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setTimeout(() => setWidth(level), 100);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [level, reduce]);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] text-muted font-medium font-[family-name:var(--font-inter)]">
          {name}
        </span>
        <span className="text-[11px] text-[#45B6D1] font-[family-name:var(--font-dm-mono)]">
          {level}%
        </span>
      </div>
      <div className="relative h-[2px] bg-[#ffffff]/10 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[#45B6D1] rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${width}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_6px_rgba(69,182,209,0.5)] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ left: `calc(${width}% - 3px)` }}
        />
      </div>
    </div>
  );
}
