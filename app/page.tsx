"use client";

import { useState, useRef } from "react";
import { IntroSection } from "./components/IntroSection";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ResumeSection } from "./components/ResumeSection";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const dismissed = useRef(false);

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
