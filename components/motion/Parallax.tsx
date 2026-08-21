"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "./use-reduced-motion";
import { cn } from "@/lib/utils";

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  direction?: "up" | "down";
  disabled?: boolean;
  children: React.ReactNode;
}

export function Parallax({
  speed = 0.08,
  direction = "up",
  disabled = false,
  className,
  children,
  style,
  ...props
}: ParallaxProps) {
  const prefersReducedMotion = useReducedMotion();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (disabled || prefersReducedMotion) return;
    if (typeof window === "undefined") return;

    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = window.requestAnimationFrame(() => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight && rect.bottom > 0) {
          const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
          const offset = (scrollProgress - 0.5) * speed * 100;
          const translateY = direction === "up" ? -offset : offset;
          element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
        }

        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed, direction, disabled, prefersReducedMotion]);

  return (
    <div
      ref={elementRef}
      className={cn("motion-parallax-wrapper", className)}
      style={{ willChange: "transform", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
