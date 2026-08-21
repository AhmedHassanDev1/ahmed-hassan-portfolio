"use client";

import type * as React from "react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "./use-reduced-motion";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "reveal";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  children?: React.ReactNode;
}

export function Reveal({
  as: Component = "div",
  variant = "fade-up",
  delay = 0,
  duration = 500,
  distance = 20,
  threshold = 0.02,
  rootMargin = "0px 0px -10px 0px",
  once = true,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    if (typeof window !== "undefined") {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsRevealed(true);
        if (once) return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, rootMargin, once]);

  const customStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-distance": `${distance}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <Component
      ref={elementRef}
      data-reveal={variant}
      data-revealed={isRevealed ? "true" : "false"}
      className={cn("motion-reveal", className)}
      style={customStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
