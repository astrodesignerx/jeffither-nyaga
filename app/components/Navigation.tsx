"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { siteData } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleScroll = useCallback(() => {
    const introExists = !!document.getElementById("intro-section");
    const pastIntro = introExists
      ? window.scrollY > window.innerHeight * 0.85
      : true;
    setVisible(pastIntro);

    const pastHero = window.scrollY > window.innerHeight * 1.3;
    setScrolled(pastHero);

    if (pastIntro) {
      const sections = siteData.navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (!el) return;

    const lenis = (window as { __lenis?: { scrollTo: (t: Element | string | number, o?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: visible ? "auto" : "none" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-divider"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-8 h-[72px]">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="text-foreground text-lg font-semibold tracking-[0.12em] font-[family-name:var(--font-poppins)]"
          >
            {siteData.monogram}
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              {siteData.navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative text-[12px] tracking-[0.12em] uppercase transition-colors duration-300 font-[family-name:var(--font-dm-mono)] ${
                      isActive
                        ? "text-[#45B6D1]"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#45B6D1]"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground p-1"
              aria-label="Toggle menu"
            >
              <IconMenu2 size={24} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center gap-10"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-8 text-foreground p-1"
              aria-label="Close menu"
            >
              <IconX size={28} strokeWidth={1.5} />
            </button>

            {siteData.navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="text-3xl font-semibold text-foreground hover:text-[#45B6D1] transition-colors duration-300 font-[family-name:var(--font-poppins)] uppercase tracking-[0.05em]"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
