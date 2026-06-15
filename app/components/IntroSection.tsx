"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";

export function IntroSection({ onDismiss }: { onDismiss?: () => void }) {
  const [showName, setShowName] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setShowName(true), 1000);
    const t2 = setTimeout(() => setShowAction(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const ripple = rippleRef.current;
    if (!section || !ripple) return;

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const animate = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      ripple.style.setProperty("--mx", `${cx}px`);
      ripple.style.setProperty("--my", `${cy}px`);
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    const id = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const rect = section.getBoundingClientRect();
    const scrolled = -rect.top;
    const sectionHeight = rect.height;
    const maxScroll = sectionHeight * 0.75;
    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

    glow.style.opacity = String(progress);
    glow.style.transform = `scale(${0.05 + progress * 3})`;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = () => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const lenis = (window as { __lenis?: { scrollTo: (t: Element | string | number, o?: { duration?: number; immediate?: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(hero, { duration: 1.8 });
    } else {
      hero.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      onDismiss?.();
      setTimeout(() => {
        const lenis = (window as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }
      }, 50);
    }, 2000);
  };

  return (
    <section
      id="intro-section"
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-background overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background image at 4% opacity — slow zoom */}
      <img
        src="/hero-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
        style={{ animation: "breathe-zoom 30s ease-in-out infinite" }}
      />

      {/* Pulsating mesh — light reflections */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 20%, rgba(69,182,209,0.12) 0%, transparent 60%)",
          animation: "mesh-drift-1 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 35% at 70% 50%, rgba(69,182,209,0.1) 0%, transparent 55%)",
          animation: "mesh-drift-2 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 35% 45% at 50% 80%, rgba(69,182,209,0.08) 0%, transparent 50%)",
          animation: "mesh-drift-3 20s ease-in-out infinite",
        }}
      />

      {/* SVG filter for ripple distort */}
      <svg width="0" height="0" className="absolute">
        <filter id="ripple-distort" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.03"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.02 0.03;0.025 0.035;0.02 0.03"
              dur="14s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="55"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Base grid — clean, no filter */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(69,182,209,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(69,182,209,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "120px 100px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(69,182,209,0.12) 1px, transparent 1px)",
          backgroundSize: "120px 100px",
          animation: "grid-flow-h 20s linear infinite",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 60%)",
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(69,182,209,0.12) 1px, transparent 1px)",
          backgroundSize: "120px 100px",
          animation: "grid-flow-v 24s linear infinite",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 60%)",
          opacity: 0.5,
        }}
      />

      {/* Ripple grid — heavily distorted, only visible around mouse */}
      <div
        ref={rippleRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          filter: "url(#ripple-distort)",
          maskImage: "radial-gradient(circle 280px at var(--mx, 50%) var(--my, 50%), black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 280px at var(--mx, 50%) var(--my, 50%), black 25%, transparent 100%)",
          opacity: 0.85,
        }}
      >
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(69,182,209,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(69,182,209,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "120px 100px",
          }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(69,182,209,0.22) 1px, transparent 1px)",
            backgroundSize: "120px 100px",
            animation: "grid-flow-h 20s linear infinite",
            opacity: 0.7,
          }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(69,182,209,0.22) 1px, transparent 1px)",
            backgroundSize: "120px 100px",
            animation: "grid-flow-v 24s linear infinite",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Dark vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, rgba(17,18,21,0.85) 100%)",
        }}
      />

      {/* Cyan gaussian glow — from bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[2] pointer-events-none">
        <div
          ref={glowRef}
          style={{
            width: "120vw",
            height: "120vw",
            background:
              "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(69,182,209,0.8) 0%, rgba(69,182,209,0.4) 30%, transparent 60%)",
            filter: "blur(60px)",
            opacity: 0,
            transform: "scale(0.05)",
            transformOrigin: "bottom center",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence>
          {showName && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="text-[clamp(1.5rem,6vw,2.5rem)] font-bold text-muted tracking-[0.12em] uppercase font-[family-name:var(--font-poppins)] whitespace-normal md:whitespace-nowrap text-center">
                Jeffither Nyaga
              </h1>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#45B6D1] mt-2 font-[family-name:var(--font-dm-mono)]">
                Portfolio
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-12 z-10">
        <AnimatePresence>
          {showAction && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleClick}
              className="flex flex-col items-center gap-1.5 text-[#45B6D1] group cursor-pointer float-loop"
            >
              <span className="text-[10px] tracking-[0.25em] uppercase font-[family-name:var(--font-dm-mono)]">
                Know More
              </span>
              <IconChevronDown size={20} strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
