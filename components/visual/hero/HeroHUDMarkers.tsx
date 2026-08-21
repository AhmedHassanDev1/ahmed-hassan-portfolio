"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function HeroHUDMarkers() {
  const prefersReducedMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 16;
      const normY = (e.clientY / window.innerHeight - 0.5) * 16;
      setCoords({ x: normX, y: normY });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block select-none overflow-hidden"
    >
      {/* Floating HUD Chip 1 - Top Right Data Stream */}
      <div
        className="absolute right-[12%] top-[22%] flex items-center gap-2.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-coords.x * 0.7}px, ${-coords.y * 0.7}px, 0)`,
        }}
      >
        <span className="size-1.5 animate-ping rounded-full bg-primary motion-reduce:animate-none" />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/70">
          SYS.TENSOR // VEC:1536
        </span>
      </div>

      {/* Floating HUD Chip 2 - Bottom Left Coordinate Anchor */}
      <div
        className="absolute bottom-[28%] left-[8%] flex items-center gap-2 rounded-md border border-white/10 bg-black/35 px-2.5 py-1 backdrop-blur-md transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${coords.x * 0.9}px, ${coords.y * 0.9}px, 0)`,
        }}
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary/90">
          NODE.ACTIVE [60FPS]
        </span>
      </div>
    </div>
  );
}
