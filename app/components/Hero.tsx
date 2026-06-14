"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { IconBrandLinkedin, IconBrandX, IconChevronDown } from "@tabler/icons-react";
import { siteData } from "@/lib/data";

export function Hero() {
  const jeff = "JEFFITHER".split("");
  const nyaga = "NYAGA".split("");
  const spotlightRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotlightRef.current;
    if (!spot) return;

    const onMove = (e: MouseEvent) => {
      const rect = spot.getBoundingClientRect();
      spot.style.setProperty("--sx", `${e.clientX - rect.left}px`);
      spot.style.setProperty("--sy", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const img = tiltRef.current;
    if (!img) return;

    let tx = 0;
    let cx = 0;

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 10;
    };

    const animate = () => {
      cx += (tx - cx) * 0.04;
      img.style.transform = `translateX(${cx}px) translateY(280px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    const id = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  const handleScrollDown = () => {
    const about = document.querySelector("#about");
    if (!about) return;

    const lenis = (window as { __lenis?: { scrollTo: (t: Element | string | number, o?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(about, { duration: 1.8 });
    } else {
      about.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] bg-background overflow-hidden px-8"
    >
      {/* Cyan breathing radial gradient — behind everything */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "100vw",
          height: "100vw",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(69,182,209,0.15) 0%, rgba(69,182,209,0.05) 40%, transparent 70%)",
          filter: "blur(80px)",
          animation: "breathe-glow 8s ease-in-out infinite",
        }}
      />

      {/* Name — landscape, behind image, base layer 20% opacity */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10">
        <h1 className="flex flex-col items-center text-center font-bold leading-[0.8] font-[family-name:var(--font-poppins)] text-foreground tracking-[-0.03em] uppercase">
          <span className="flex text-[clamp(4rem,16vw,16rem)]">
            {jeff.map((char, i) => (
              <motion.span
                key={`j-${i}`}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="flex text-[clamp(5.5rem,22vw,22rem)]">
            {nyaga.map((char, i) => (
              <motion.span
                key={`n-${i}`}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>
      </div>

      {/* Name — spotlight layer 60% opacity, radial mask */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 flex items-center justify-center z-0 opacity-60"
        style={{
          maskImage: "radial-gradient(circle 350px at var(--sx, 50%) var(--sy, 50%), black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 350px at var(--sx, 50%) var(--sy, 50%), black 20%, transparent 100%)",
        }}
      >
        <h1 className="flex flex-col items-center text-center font-bold leading-[0.8] font-[family-name:var(--font-poppins)] text-foreground tracking-[-0.03em] uppercase">
          <span className="flex text-[clamp(4rem,16vw,16rem)]">
            {jeff.map((char, i) => (
              <motion.span
                key={`js-${i}`}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="flex text-[clamp(5.5rem,22vw,22rem)]">
            {nyaga.map((char, i) => (
              <motion.span
                key={`ns-${i}`}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>
      </div>

      {/* Image — bottom aligned, over text, breathe float + parallax */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[1] w-auto h-[120%]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
          style={{ animation: "hero-float 5s ease-in-out 1.1s infinite" }}
        >
          <div ref={tiltRef} className="h-full">
            <img
              src="/hero-portrait.png"
              alt=""
              className="h-full w-auto max-w-none object-contain object-bottom"
            />
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay — hides bottom cut-off */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-background via-background/85 to-transparent z-[2]" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="flex flex-col items-center justify-end pb-20 px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12px] text-muted mt-2 max-w-[500px] text-center leading-[1.7] font-[family-name:var(--font-inter)]"
          >
            Legal matters often arrive at life&apos;s most critical moments. Every client deserves clear guidance, sound judgment, and committed representation. I provide strategic legal counsel grounded in diligence, integrity, and a deep understanding of the law.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-5 mt-6"
          >
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3 border border-[#45B6D1] text-[#45B6D1] text-[12px] tracking-[0.15em] uppercase font-[family-name:var(--font-dm-mono)] rounded-sm transition-all duration-300 hover:bg-[#45B6D1] hover:text-background"
            >
              About
            </a>
          </motion.div>
        </div>
      </div>

      {/* Social icons */}
      <div className="absolute bottom-8 left-8 flex items-center gap-5 z-10">
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          href={siteData.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-[#45B6D1] transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <IconBrandLinkedin size={18} strokeWidth={1.5} />
        </motion.a>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          href={siteData.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-[#45B6D1] transition-colors duration-300"
          aria-label="Twitter / X"
        >
          <IconBrandX size={18} strokeWidth={1.5} />
        </motion.a>
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
