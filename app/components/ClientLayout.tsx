"use client";

import { ThemeProvider } from "./ThemeProvider";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <Navigation />
        {children}
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  );
}
