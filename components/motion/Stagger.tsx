"use client";

import type * as React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "./use-reduced-motion";
import { type RevealVariant } from "./Reveal";
import { cn } from "@/lib/utils";

interface StaggerContextValue {
  isRevealed: boolean;
  step: number;
  initialDelay: number;
  duration: number;
  variant: RevealVariant;
}

const StaggerContext = createContext<StaggerContextValue>({
  isRevealed: false,
  step: 80,
  initialDelay: 0,
  duration: 500,
  variant: "fade-up",
});

export interface StaggerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  step?: number;
  initialDelay?: number;
  duration?: number;
  variant?: RevealVariant;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  children: React.ReactNode;
}

export function Stagger({
  as: Component = "div",
  step = 80,
  initialDelay = 0,
  duration = 500,
  variant = "fade-up",
  threshold = 0.02,
  rootMargin = "0px 0px -10px 0px",
  once = true,
  className,
  children,
  ...props
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    if (typeof window !== "undefined") {
      const rect = container.getBoundingClientRect();
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
            observer.unobserve(container);
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

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, rootMargin, once]);

  return (
    <StaggerContext.Provider
      value={{ isRevealed, step, initialDelay, duration, variant }}
    >
      <Component
        ref={containerRef}
        className={cn("motion-stagger-container", className)}
        data-revealed={isRevealed ? "true" : "false"}
        {...props}
      >
        {children}
      </Component>
    </StaggerContext.Provider>
  );
}

export interface StaggerItemProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  index: number;
  variant?: RevealVariant;
  duration?: number;
  distance?: number;
  children: React.ReactNode;
}

export function StaggerItem({
  as: Component = "div",
  index,
  variant,
  duration,
  distance = 20,
  className,
  style,
  children,
  ...props
}: StaggerItemProps) {
  const context = useContext(StaggerContext);
  const activeVariant = variant ?? context.variant;
  const activeDuration = duration ?? context.duration;
  const delay = context.initialDelay + index * context.step;

  const itemStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${activeDuration}ms`,
    "--reveal-distance": `${distance}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <Component
      data-reveal={activeVariant}
      data-revealed={context.isRevealed ? "true" : "false"}
      className={cn("motion-reveal motion-stagger-item", className)}
      style={itemStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
