"use client";

import { useState, useRef, useEffect } from "react";
import { IntroSection } from "./components/IntroSection";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ResumeSection } from "./components/ResumeSection";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const dismissed = useRef(false);

  useEffect(() => {
    if (!showIntro) return;

    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.95 && !dismissed.current) {
          dismissed.current = true;
          setShowIntro(false);
          setTimeout(() => {
            const lenis = (window as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
            if (lenis) lenis.scrollTo(0, { immediate: true });
            else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          }, 100);
        }
      },
      { threshold: [0.95] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [showIntro]);

  const handleDismiss = () => {
    if (!dismissed.current) {
      dismissed.current = true;
      setShowIntro(false);
    }
  };

  return (
    <main>
      {showIntro && <IntroSection onDismiss={handleDismiss} />}
      <Hero />
      <About />
      <ResumeSection />
      <Testimonials />
      <Contact />
    </main>
  );
}
