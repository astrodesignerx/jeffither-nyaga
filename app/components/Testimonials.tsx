"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";

const QUOTE =
  "The law is ultimately about people. Behind every file, dispute, contract, or claim is a person seeking certainty, protection, or resolution. My role is to help provide it.";

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteMarkRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const attributionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const chars = QUOTE.split("");

  useEffect(() => {
    const section = sectionRef.current;
    const quoteMark = quoteMarkRef.current;
    const attribution = attributionRef.current;
    const glow = glowRef.current;
    if (!section) return;

    const spans = charRefs.current;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max(1 - rect.top / window.innerHeight, 0), 1);
      const pt = Math.min(Math.max((p - 0.4) / 0.6, 0), 1);
      const pg = Math.min(Math.max((p - 0.3) / 0.7, 0), 1);

      if (glow) {
        glow.style.opacity = String(pg);
        glow.style.transform = `translate(-50%, 0) scale(${0.3 + pg * 1.2})`;
      }

      if (quoteMark) {
        quoteMark.style.opacity = String(0.1 + Math.min(pt * 4, 1) * 0.9);
      }

      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        if (!span) continue;
        const threshold = i / spans.length;
        const buffer = 1 / spans.length;
        const t = Math.min(Math.max((pt - threshold) / buffer, 0), 1);
        span.style.opacity = String(0.1 + t * 0.9);
      }

      if (attribution) {
        attribution.style.opacity = String(
          0.1 + Math.min(Math.max(pt - 0.85, 0) / 0.15, 1) * 0.9
        );
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setCharRef = (i: number) => (el: HTMLSpanElement | null) => {
    charRefs.current[i] = el;
  };

  const handleScrollDown = () => {
    const contact = document.querySelector("#contact");
    if (!contact) return;
    const lenis = (window as { __lenis?: { scrollTo: (t: Element | string | number, o?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(contact, { duration: 1.8 });
    } else {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-40 px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#45B6D1]/[0.02]" />

      {/* Radial cyan glow — intensifies with scroll */}
      <div
        ref={glowRef}
        className="absolute bottom-0 left-1/2 pointer-events-none z-0"
        style={{
          width: "80vw",
          height: "80vw",
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(69,182,209,0.25) 0%, rgba(69,182,209,0.08) 40%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0,
          transform: "translate(-50%, 0) scale(0.3)",
          transformOrigin: "bottom center",
          willChange: "transform, opacity",
        }}
      />

      <div className="relative max-w-[800px] mx-auto text-center">
        <span
          ref={quoteMarkRef}
          className="block text-[clamp(5rem,10vw,8rem)] leading-none text-[#45B6D1] font-[family-name:var(--font-poppins)] select-none"
          style={{ opacity: 0.1 }}
        >
          &ldquo;
        </span>

        <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-light text-foreground leading-[1.5] font-[family-name:var(--font-poppins)]">
          {chars.map((char, i) => (
            <span
              key={i}
              ref={setCharRef(i)}
              style={{ opacity: 0.1 }}
            >
              {char}
            </span>
          ))}
        </p>

        <div ref={attributionRef} className="mt-12" style={{ opacity: 0.1 }}>
          <div className="w-8 h-px bg-[#45B6D1]/40 mx-auto mb-4" />
          <p className="text-[13px] text-muted font-[family-name:var(--font-inter)]">
            Jeffither Nyaga
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconChevronDown size={20} strokeWidth={1.5} className="text-[#45B6D1]/40" />
        </motion.div>
      </button>
    </section>
  );
}
