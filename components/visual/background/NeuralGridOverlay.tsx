"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function NeuralGridOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const handlePointerMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      overlay.style.setProperty("--cursor-x", `${x}px`);
      overlay.style.setProperty("--cursor-y", `${y}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle 500px at var(--cursor-x, 50vw) var(--cursor-y, 50vh), rgba(255, 77, 15, 0.035), transparent 70%),
          linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 72px 72px, 72px 72px",
      }}
    />
  );
}
