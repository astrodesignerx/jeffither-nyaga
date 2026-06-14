# Ripple Grid Effect

A flowing animated grid with a mouse-following ripple distortion — built for Next.js 16+ (App Router), React 19, Tailwind CSS v4, and TypeScript.

The effect renders a cyan wireframe grid across a section. Horizontal and vertical lines flow in opposite directions. A radial mask follows the cursor. Within the mask radius, the grid is displaced by an SVG `feTurbulence` + `feDisplacementMap` filter — creating an organic ripple/lens warp centered on the mouse.

---

## 1. CSS Keyframes

Add these to your `globals.css` (or any CSS file loaded globally):

```css
@keyframes grid-flow-h {
  0%   { background-position: 0px 0px; }
  100% { background-position: 120px 0px; }
}

@keyframes grid-flow-v {
  0%   { background-position: 0px 0px; }
  100% { background-position: 0px 100px; }
}
```

- `grid-flow-h` shifts the horizontal-line layer right by one cell width (120px).
- `grid-flow-v` shifts the vertical-line layer down by one cell height (100px).
- If you change `backgroundSize`, update the end values to match.

---

## 2. SVG Filter (once per page, placed anywhere in the DOM)

```tsx
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
```

**Important**: The `id="ripple-distort"` must match the `url(#ripple-distort)` in the ripple layer's filter style. Keep the `<svg>` invisible with `width="0" height="0"`.

---

## 3. Mouse Tracking Hook

Place this inside the same client component that renders the grid (or extract it as a custom hook):

```tsx
const sectionRef = useRef<HTMLElement>(null);
const rippleRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const section = sectionRef.current;
  const ripple = rippleRef.current;
  if (!section || !ripple) return;

  let mx = 0, my = 0;    // raw mouse (target)
  let cx = 0, cy = 0;    // smoothed cursor (current)

  const onMove = (e: MouseEvent) => {
    const rect = section.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
  };

  const animate = () => {
    cx += (mx - cx) * 0.08;  // lerp factor — lower = smoother trailing
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
```

**What it does**: Listens for `mousemove` on the window, calculates pixel coordinates relative to the section, then smoothly lerps the CSS custom properties `--mx` / `--my` on the ripple wrapper. The ripple mask uses these variables to position the distortion circle.

---

## 4. Grid Component

A self-contained component that renders everything — filter, base grid, flowing lines, and mouse ripple:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function RippleGrid() {
  const rippleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ripple = rippleRef.current;
    if (!section || !ripple) return;

    let mx = 0, my = 0;
    let cx = 0, cy = 0;

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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-[#111215] overflow-hidden"
    >
      {/* SVG filter — invisible, defines the distortion */}
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

      {/* === BASE GRID (static, no distortion) === */}

      {/* Combined horizontal + vertical, vignette mask */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(69,182,209,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(69,182,209,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "120px 100px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)",
        }}
      />

      {/* Flowing horizontal lines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(69,182,209,0.12) 1px, transparent 1px)",
          backgroundSize: "120px 100px",
          animation: "grid-flow-h 20s linear infinite",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 60%)",
          opacity: 0.5,
        }}
      />

      {/* Flowing vertical lines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(69,182,209,0.12) 1px, transparent 1px)",
          backgroundSize: "120px 100px",
          animation: "grid-flow-v 24s linear infinite",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 60%)",
          opacity: 0.5,
        }}
      />

      {/* === RIPPLE LAYER (distorted, only visible around mouse) === */}
      <div
        ref={rippleRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          filter: "url(#ripple-distort)",
          maskImage:
            "radial-gradient(circle 280px at var(--mx, 50%) var(--my, 50%), black 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 280px at var(--mx, 50%) var(--my, 50%), black 25%, transparent 100%)",
          opacity: 0.85,
        }}
      >
        {/* Static grid inside ripple */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(69,182,209,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(69,182,209,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "120px 100px",
          }}
        />
        {/* Flowing horizontal inside ripple */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(69,182,209,0.22) 1px, transparent 1px)",
            backgroundSize: "120px 100px",
            animation: "grid-flow-h 20s linear infinite",
            opacity: 0.7,
          }}
        />
        {/* Flowing vertical inside ripple */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(69,182,209,0.22) 1px, transparent 1px)",
            backgroundSize: "120px 100px",
            animation: "grid-flow-v 24s linear infinite",
            opacity: 0.7,
          }}
        />
      </div>
    </section>
  );
}
```

---

## 5. Usage

Drop the component anywhere in your page:

```tsx
import { RippleGrid } from "@/components/RippleGrid";

export default function Page() {
  return (
    <main>
      <RippleGrid />
      {/* other sections */}
    </main>
  );
}
```

Make sure the CSS keyframes (Section 1) are in your `globals.css`.

---

## 6. Customization

All values are inline styles — tweak directly in the component props or create a config object.

| Property | Default | Where | Notes |
|---|---|---|---|
| **Cell size** (w × h) | `120px × 100px` | `backgroundSize` on all grid divs | Must match `grid-flow-*` keyframe end values |
| **Line color** | `rgba(69,182,209,…)` | `linear-gradient` stops | Change the RGBA values for a different accent |
| **Base grid opacity** | `0.06` (static), `0.12` (flowing) | `rgba(..., <opacity>)` | Higher = more visible grid |
| **Ripple radius** | `280px` | `circle 280px` in `maskImage` | How far the distortion extends from cursor |
| **Ripple fade** | `black 25% → transparent 100%` | mask gradient stops | `25%` = hard edge, `0%` = soft gradient |
| **Distortion scale** | `55` | `feDisplacementMap scale` | Higher = more warping inside ripple |
| **Turbulence baseFrequency** | `0.02 0.03` | `feTurbulence` attribute | Higher = finer noise, more chaotic warp |
| **Turbulence oscillation** | `14s` between frequency values | `<animate dur>` | Speed of the organic noise change |
| **Flow speed (horizontal)** | `20s` | `animation: grid-flow-h 20s` | One full cell-width cycle |
| **Flow speed (vertical)** | `24s` | `animation: grid-flow-v 24s` | One full cell-height cycle |
| **Mouse lerp** | `0.08` | `cx += (mx - cx) * 0.08` | Lower = more trailing lag, higher = tighter follow |
| **Background** | `#111215` | section `bg-[#111215]` | Section background color |
| **Vignette** | Ellipse at 50% 40% | `maskImage` radial-gradient | Controls where grid fades at edges |

---

## 7. Reduced Motion

The effect is purely decorative. For `prefers-reduced-motion`, stop the flowing and ripple animations:

```css
@media (prefers-reduced-motion: reduce) {
  [style*="grid-flow-h"],
  [style*="grid-flow-v"] {
    animation: none !important;
  }
  [style*="ripple-distort"] {
    filter: none !important;
  }
}
```

Or use the existing `@media (prefers-reduced-motion: reduce)` block in your `globals.css` with `animation-duration: 0.01ms !important` which already covers the inline flowing lines.

---

## 8. Performance Notes

- The mouse tracking uses `requestAnimationFrame` + `CSS custom properties` — never touches React state, zero re-renders.
- The SVG filter runs on the GPU for the ripple layer only; the base grid is pure CSS gradients (no filter).
- Each flowing layer is a single `<div>` with a `background-image` repeating pattern — no DOM nodes per line.
- The `maskImage` + `radial-gradient` is hardware-accelerated in all modern browsers.
