"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { siteData } from "@/lib/data";

export function About() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max(1 - rect.top / vh, 0), 1);
      const pg = Math.min(Math.max((p - 0.15) / 0.85, 0), 1);
      glow.style.opacity = String(pg);
      glow.style.transform = `scale(${0.3 + pg * 1.5})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleScrollDown = () => {
    const resume = document.querySelector("#resume");
    if (!resume) return;

    const lenis = (window as { __lenis?: { scrollTo: (t: Element | string | number, o?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(resume, { duration: 1.8 });
    } else {
      resume.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[100dvh] bg-background flex flex-col justify-center py-24 px-8 overflow-hidden"
    >
      {/* Radial cyan glow — behind image, intensifies with scroll */}
      <div
        ref={glowRef}
        className="absolute right-0 bottom-0 pointer-events-none z-[1]"
        style={{
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(ellipse 60% 60% at 60% 100%, rgba(69,182,209,0.4) 0%, rgba(69,182,209,0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0,
          transform: "scale(0.3)",
          transformOrigin: "bottom right",
          willChange: "transform, opacity",
        }}
      />
      <motion.img
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        src="/portrait.png"
        alt=""
        className="absolute right-0 -bottom-12 w-[45%] h-full object-contain object-bottom z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-[2]" />

      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24 items-center my-auto translate-y-[50px]">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-foreground leading-[1.1] font-[family-name:var(--font-poppins)] uppercase tracking-[-0.01em] mb-6"
            >
              ABOUT
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[18px] text-muted leading-[1.8] max-w-[560px] font-[family-name:var(--font-inter)]">
                {siteData.bio}
              </p>
              <p className="text-[14px] text-muted/60 mt-3 font-[family-name:var(--font-inter)]">
                Based in {siteData.contact.address}
              </p>
            </motion.div>
          </div>

          <div />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] tracking-[0.15em] uppercase text-muted font-[family-name:var(--font-dm-mono)] mt-auto pb-12 translate-y-[100px]"
        >
          {siteData.tagline}
        </motion.p>
      </div>

      {/* Scroll cue — centered, click to scroll */}
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
