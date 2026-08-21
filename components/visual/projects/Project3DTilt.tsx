"use client";

import type * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface Project3DTiltProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  children: React.ReactNode;
}

export function Project3DTilt({
  as: Component = "article",
  maxTilt = 4.5,
  perspective = 1100,
  scale = 1.01,
  className,
  children,
  style,
  ...props
}: Project3DTiltProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement | null>(null);
  const rafId = useRef<number | null>(null);

  const currentRotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  const animate = useCallback(() => {
    if (!cardRef.current) return;

    const damping = 0.16;
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * damping;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * damping;

    const { x, y } = currentRotation.current;
    const activeScale = isHovered.current ? scale : 1;

    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg) scale3d(${activeScale}, ${activeScale}, 1)`;

    const diff = Math.hypot(targetRotation.current.x - x, targetRotation.current.y - y);

    if (isHovered.current || diff > 0.02) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      currentRotation.current = { x: 0, y: 0 };
      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      rafId.current = null;
    }
  }, [perspective, scale]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    targetRotation.current = {
      x: -normY * maxTilt,
      y: normX * maxTilt,
    };

    card.style.setProperty("--tilt-mouse-x", `${x.toFixed(1)}px`);
    card.style.setProperty("--tilt-mouse-y", `${y.toFixed(1)}px`);
    card.style.setProperty("--tilt-sheen-opacity", "0.35");

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  const handlePointerEnter = () => {
    if (prefersReducedMotion) return;
    isHovered.current = true;
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    targetRotation.current = { x: 0, y: 0 };

    if (cardRef.current) {
      cardRef.current.style.setProperty("--tilt-sheen-opacity", "0");
    }

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <Component
      ref={cardRef}
      className={cn("project-3d-tilt-wrapper relative transition-[box-shadow,border-color] duration-300", className)}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={
        {
          willChange: "transform",
          transformStyle: "preserve-3d",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Dynamic Specular Holographic Sheen Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 360px at var(--tilt-mouse-x, 50%) var(--tilt-mouse-y, 50%), rgba(255, 106, 61, 0.16), transparent 75%)`,
          opacity: "var(--tilt-sheen-opacity, 0)",
        }}
      />
      {children}
    </Component>
  );
}
